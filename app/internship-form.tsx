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
    subject: subjects[0] || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formElement = e.currentTarget;
      const formDataToSend = new FormData(formElement);
      
      const response = await fetch('https://formspree.io/f/mjywgpao', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: subjects[0] || '',
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 1500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
              ✗ Une erreur s'est produite. Veuillez réessayer.
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
              <label htmlFor="subject">Sujet internship</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
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
