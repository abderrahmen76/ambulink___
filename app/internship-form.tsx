'use client';

import { useState } from 'react';

interface InternshipFormProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: string[];
}

export default function InternshipForm({ isOpen, onClose, subjects }: InternshipFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project1: subjects[0] || '',
    project2: subjects[1] || '',
    project3: subjects[2] || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB limit
      if (file.size > maxSize) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
        e.currentTarget.value = '';
        alert('Fichier trop volumineux. Taille maximale: 5MB');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formElement = e.currentTarget;
      const cvFile = (formElement.querySelector('input[name="cv"]') as HTMLInputElement)?.files?.[0];
      
      // Validate file exists and size
      if (!cvFile) {
        setSubmitStatus('error');
        alert('Veuillez sélectionner un fichier CV');
        setIsSubmitting(false);
        return;
      }

      if (cvFile.size > 5 * 1024 * 1024) {
        setSubmitStatus('error');
        alert('Fichier trop volumineux. Taille maximale: 5MB');
        setIsSubmitting(false);
        return;
      }

      const formDataToSend = new FormData(formElement);
      
      console.log('=== FORM SUBMISSION START ===');
      console.log('Submitting form with fields:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1] instanceof File ? `File: ${(pair[1] as File).name} (${(pair[1] as File).size} bytes)` : pair[1]);
      }

      // Try with file first
      console.log('Attempting to send form WITH file to Formspree...');
      const response = await fetch('https://formspree.io/f/mjywgpao', {
        method: 'POST',
        body: formDataToSend,
      });

      let responseData: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log('First attempt - Response status:', response.status);
      console.log('First attempt - Response data:', responseData);

      if (response.ok) {
        console.log('SUCCESS! Form submitted with file');
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          project1: subjects[0] || '',
          project2: subjects[1] || '',
          project3: subjects[2] || '',
        });
        // Reset file input
        const fileInput = formElement.querySelector('input[name="cv"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 1500);
      } else {
        // If file upload fails, try again without the file and add a note
        console.warn('First attempt failed. Attempting fallback without file...');
        
        const formDataWithoutFile = new FormData();
        formDataWithoutFile.append('firstName', formData.firstName);
        formDataWithoutFile.append('lastName', formData.lastName);
        formDataWithoutFile.append('email', formData.email);
        formDataWithoutFile.append('project1', formData.project1);
        formDataWithoutFile.append('project2', formData.project2);
        formDataWithoutFile.append('project3', formData.project3);
        formDataWithoutFile.append('message', `CV filename: ${cvFile.name}\n\nNote: Veuillez envoyer votre CV directement à ambulink.contact@gmail.com en mentionnant votre email ${formData.email}`);

        console.log('Attempting to send form WITHOUT file...');
        const retryResponse = await fetch('https://formspree.io/f/mjywgpao', {
          method: 'POST',
          body: formDataWithoutFile,
        });

        let retryData: any;
        if (retryResponse.ok) {
          retryData = await retryResponse.json();
        } else {
          retryData = await retryResponse.text();
        }

        console.log('Retry response status:', retryResponse.status);
        console.log('Retry response data:', retryData);
        console.log('=== FORM SUBMISSION END ===');

        if (retryResponse.ok) {
          setSubmitStatus('success');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            project1: subjects[0] || '',
            project2: subjects[1] || '',
            project3: subjects[2] || '',
          });
          const fileInput = formElement.querySelector('input[name="cv"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          
          setTimeout(() => {
            onClose();
            setSubmitStatus('idle');
          }, 1500);
        } else {
          console.error('Form submission failed on retry:', retryData);
          console.error('Error details:', {
            status: retryResponse.status,
            statusText: retryResponse.statusText,
            data: retryData
          });
          alert(`Erreur Formspree (${retryResponse.status}): ${typeof retryData === 'string' ? retryData : JSON.stringify(retryData)}`);
          setSubmitStatus('error');
        }
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      alert(`Erreur: ${error?.message || 'Erreur inconnue'}`);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} aria-hidden="true" />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-content">
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Fermer le formulaire"
          >
            ✕
          </button>

          <h2 id="form-title">Candidature Internship</h2>
          <p className="modal-subtitle">Remplissez le formulaire pour postuler</p>

          {submitStatus === 'success' && (
            <div className="form-message success">
              ✓ Candidature envoyée avec succès !
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-message error">
              ✗ Une erreur s'est produite. Veuillez vérifier votre connexion internet et réessayez. Si le problème persiste, envoyez votre CV directement à ambulink.contact@gmail.com
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Jean"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Dupont"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="jean@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cv">Télécharger CV (PDF, DOC, DOCX - Max 5MB)</label>
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                disabled={isSubmitting}
              />
              <small style={{ color: '#4A5878', fontSize: '13px', marginTop: '4px' }}>
                Si le CV ne peut pas être envoyé via le formulaire, vous devrez l'envoyer par email à ambulink.contact@gmail.com
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="project1">1er choix de projet</label>
              <select
                id="project1"
                name="project1"
                value={formData.project1}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="project2">2ème choix de projet</label>
              <select
                id="project2"
                name="project2"
                value={formData.project2}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="project3">3ème choix de projet</label>
              <select
                id="project3"
                name="project3"
                value={formData.project3}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer candidature'}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(2, 27, 74, 0.6);
          z-index: 99;
          animation: fadeIn 0.2s ease-out;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .modal-content {
          background: white;
          border-radius: 22px;
          padding: 32px;
          position: relative;
          box-shadow: 0 20px 60px rgba(2, 27, 74, 0.25);
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: 0;
          font-size: 24px;
          color: #4A5878;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.15s, color 0.15s;
        }

        .modal-close:hover {
          background: #EEF3FF;
          color: #0B1B3D;
        }

        .modal h2 {
          margin: 0 0 8px;
          font-size: 24px;
          color: #0B1B3D;
        }

        .modal-subtitle {
          color: #4A5878;
          font-size: 15px;
          margin: 0 0 24px;
        }

        .form-message {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
        }

        .form-message.success {
          background: #e8f5e9;
          color: #0e8a5f;
        }

        .form-message.error {
          background: #ffebee;
          color: #d4140c;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #0B1B3D;
          font-size: 14px;
        }

        .form-group input,
        .form-group select {
          padding: 12px 16px;
          border: 1px solid #DCE3F0;
          border-radius: 12px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 16px;
          color: #0B1B3D;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .form-group input[type="file"] {
          padding: 10px;
          cursor: pointer;
        }

        .form-group input[type="file"]::file-selector-button {
          padding: 8px 16px;
          background: #1D55C9;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 12px;
          transition: background 0.15s;
        }

        .form-group input[type="file"]::file-selector-button:hover {
          background: #1547a3;
        }

        .form-group input[type="file"]:disabled::file-selector-button {
          background: #DCE3F0;
          cursor: not-allowed;
        }

        .form-group input::placeholder {
          color: #4A5878;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1D55C9;
          box-shadow: 0 0 0 3px rgba(29, 85, 201, 0.1);
        }

        .form-group input:disabled,
        .form-group select:disabled {
          background: #EEF3FF;
          cursor: not-allowed;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 640px) {
          .modal-content {
            padding: 24px;
          }

          .modal h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}
