'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdegopzk';

export default function DemoRequest({ small = false }: { small?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function handleClose() {
    requestRef.current?.abort();
    requestRef.current = null;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    formRef.current?.reset();
    setStatus('idle');
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.target === event.currentTarget &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)
    ) {
      event.currentTarget.close();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return;

    const controller = new AbortController();
    requestRef.current = controller;
    setStatus('loading');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Formspree submission failed');
      if (controller.signal.aborted) return;

      setStatus('success');
      closeTimerRef.current = setTimeout(() => dialogRef.current?.close(), 3000);
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error('Demo request submission failed:', error);
        setStatus('error');
      }
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  return (
    <>
      <button type="button" className={`btn btn-red${small ? ' small' : ''}`} onClick={() => dialogRef.current?.showModal()}>
        Demander une démo
      </button>
      <dialog
        ref={dialogRef}
        className="demo-dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={handleBackdropClick}
        onClose={handleClose}
      >
        <div className="demo-modal">
          <button type="button" className="demo-close" aria-label="Fermer" onClick={() => dialogRef.current?.close()}>
            <span aria-hidden="true">&times;</span>
          </button>
          <p className="eyebrow">AmbuLink</p>
          <h2 id={titleId}>Demander une démo</h2>
          <p id={descriptionId} className="demo-intro">Parlez-nous de vos besoins et notre équipe vous contactera.</p>

          {status === 'success' ? (
            <p className="demo-success" role="status" lang="en">Thank you! Our team will contact you shortly.</p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="demo-form">
              <div className="demo-fields">
                <label>
                  <span>Nom complet <span aria-hidden="true">*</span></span>
                  <input name="name" autoComplete="name" required autoFocus />
                </label>
                <label>
                  <span>E-mail <span aria-hidden="true">*</span></span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label>
                  <span>Téléphone <span className="demo-optional">(facultatif)</span></span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>Société / clinique <span className="demo-optional">(facultatif)</span></span>
                  <input name="company" autoComplete="organization" />
                </label>
              </div>
              <label>
                <span>Message <span aria-hidden="true">*</span></span>
                <textarea name="message" rows={4} required />
              </label>
              {status === 'error' && (
                <p className="demo-error" role="alert">Une erreur s'est produite. Veuillez réessayer ou nous contacter par e-mail.</p>
              )}
              <button type="submit" className="btn btn-red demo-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
