import { useEffect } from 'react';
import './Toast.css';

const AUTO_DISMISS_MS = 6000;

/**
 * Notificación flotante para mensajes de error u otros avisos.
 *
 * @param {{ message: string, variant?: 'error' | 'success', onClose: () => void }} props
 */
export function Toast({ message, variant = 'error', onClose }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`toast toast--${variant}`}
      role="alert"
      aria-live="assertive"
    >
      <p className="toast__message">{message}</p>
      <button
        type="button"
        className="toast__close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
}
