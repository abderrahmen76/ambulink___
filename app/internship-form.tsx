'use client';

import { useState } from 'react';
import { getCvExtension, MAX_CV_SIZE } from './cv-upload';

interface InternshipFormProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: string[];
}

async function getFormspreeError(response: Response): Promise<string> {
  const fallback = `Formspree a refusé la candidature (code ${response.status}). Veuillez vérifier vos informations et réessayer.`;
  if (!response.headers.get('content-type')?.includes('application/json')) return fallback;

  try {
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('errors' in data) || !Array.isArray(data.errors)) return fallback;
    const messages = data.errors
      .map((item: unknown) =>
        typeof item === 'object' && item !== null && 'message' in item && typeof item.message === 'string'
          ? item.message
          : ''
      )
      .filter(Boolean);
    return messages.length ? `Formspree : ${messages.join(' ')}` : fallback;
  } catch (error) {
    console.error('Unable to read Formspree error response:', error);
    return fallback;
  }
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      if (file.size > MAX_CV_SIZE) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
        e.currentTarget.value = '';
        alert('Fichier trop volumineux. Taille maximale : 4 Mo.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formElement = e.currentTarget;
      const cvFile = (formElement.querySelector('input[name="cv"]') as HTMLInputElement)?.files?.[0];
      
      console.log('=== FORM SUBMISSION START ===');

      // Check file size if file exists
      if (cvFile && cvFile.size > MAX_CV_SIZE) {
        setSubmitStatus('error');
        alert('Fichier trop volumineux. Taille maximale : 4 Mo.');
        setIsSubmitting(false);
        return;
      }

      if (cvFile && !getCvExtension(cvFile.name)) {
        setSubmitStatus('error');
        alert('Formats acceptés : PDF, DOC et DOCX.');
        return;
      }

      let uploadedPath = '';

      if (cvFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('cv', cvFile);

        try {
          const uploadResponse = await fetch('/api/upload-cv', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`CV upload returned status ${uploadResponse.status}`);
          }

          const uploadResult = await uploadResponse.json();
          if (typeof uploadResult.pathname !== 'string' || !uploadResult.pathname) {
            throw new Error('CV upload returned an invalid response');
          }
          uploadedPath = uploadResult.pathname;
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          setErrorMessage('Impossible de sauvegarder le CV. Veuillez réessayer ou envoyer votre CV à ambulink.contact@gmail.com.');
          setSubmitStatus('error');
          return;
        }
      }

      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('project1', formData.project1);
      formDataToSend.append('project2', formData.project2);
      formDataToSend.append('project3', formData.project3);

      // Add message with file info
      if (uploadedPath) {
        formDataToSend.append('message', `CV sauvegardé dans Vercel Blob (stockage privé)\nChemin : ${uploadedPath}\n\nCandidat : ${formData.firstName} ${formData.lastName}\nEmail : ${formData.email}`);
      } else {
        formDataToSend.append('message', `Candidat : ${formData.firstName} ${formData.lastName}\nEmail : ${formData.email}\n\nAucun CV fourni`);
      }

      console.log('Sending form to Formspree...');
      const response = await fetch('https://formspree.io/f/mjywgpao', {
        method: 'POST',
        body: formDataToSend,
        headers: { Accept: 'application/json' },
      });

      console.log('Response status:', response.status);

      if (response.ok || response.status === 201) {
        console.log('SUCCESS! Form submitted successfully');
        console.log('=== FORM SUBMISSION END ===');
        
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
        setErrorMessage(await getFormspreeError(response));
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setErrorMessage('Impossible d’envoyer la candidature. Vérifiez votre connexion et réessayez.');
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
              <div style={{ marginBottom: '12px' }}>✓ Candidature reçue avec succès !</div>
              <div style={{ fontSize: '14px', color: '#0e8a5f', fontWeight: '500' }}>
                Nous vous contacterons bientôt.
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-message error" role="alert">
              ✗ {errorMessage || 'Une erreur s’est produite. Veuillez vérifier votre candidature et réessayer.'}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              <label htmlFor="cv">📎 Joindre votre CV (PDF, DOC, DOCX)</label>
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <small style={{ color: '#4A5878', fontSize: '13px', marginTop: '4px' }}>
                PDF, DOC ou DOCX, 4 Mo maximum. Votre CV sera sauvegardé dans un stockage privé.
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
