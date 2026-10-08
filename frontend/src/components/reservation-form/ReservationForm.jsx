import { useState } from 'react';
import axios from 'axios';

import { SERVICIOS_DISPONIBLES } from '../../constants/servicios';
import reservaService from '../../services/ReservaService';
import { Toast } from '../toast/Toast';
import './ReservationForm.css';

const INITIAL_VALUES = {
  nombreCliente: '',
  fecha: '',
  hora: '',
  servicio: '',
};

/**
 * @param {string} hora valor del input type="time" (HH:mm)
 * @returns {string} hora en formato compatible con LocalTime del backend
 */
function toApiTime(hora) {
  return hora.length === 5 ? `${hora}:00` : hora;
}

/**
 * Formulario reactivo (controlado) para crear una nueva reserva.
 *
 * @param {{ onSuccess?: () => void }} props
 */
export function ReservationForm({ onSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setFieldErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const validate = () => {
    const errors = {};

    if (!values.nombreCliente.trim()) {
      errors.nombreCliente = 'El nombre del cliente es obligatorio.';
    }
    if (!values.fecha) {
      errors.fecha = 'La fecha es obligatoria.';
    }
    if (!values.hora) {
      errors.hora = 'La hora es obligatoria.';
    }
    if (!values.servicio) {
      errors.servicio = 'Debe seleccionar un servicio.';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      await reservaService.create({
        customerName: values.nombreCliente.trim(),
        date: values.fecha,
        time: toApiTime(values.hora),
        service: values.servicio,
      });

      setValues(INITIAL_VALUES);
      setFieldErrors({});
      onSuccess?.();
    } catch (error) {
      let message = 'No se pudo guardar la reserva.';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }

      setToast({ variant: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="reservation-form-section" aria-labelledby="reservation-form-title">
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}

      <header className="reservation-form-section__header">
        <h2 id="reservation-form-title">Nueva reserva</h2>
        <p>Complete todos los campos para registrar una cita.</p>
      </header>

      <form className="reservation-form" onSubmit={handleSubmit} noValidate>
        <div className="reservation-form__field">
          <label htmlFor="nombreCliente">Nombre del cliente</label>
          <input
            id="nombreCliente"
            name="nombreCliente"
            type="text"
            value={values.nombreCliente}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.nombreCliente)}
            aria-describedby={
              fieldErrors.nombreCliente ? 'nombreCliente-error' : undefined
            }
          />
          {fieldErrors.nombreCliente && (
            <span id="nombreCliente-error" className="reservation-form__error" role="alert">
              {fieldErrors.nombreCliente}
            </span>
          )}
        </div>

        <div className="reservation-form__row">
          <div className="reservation-form__field">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              value={values.fecha}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.fecha)}
              aria-describedby={fieldErrors.fecha ? 'fecha-error' : undefined}
            />
            {fieldErrors.fecha && (
              <span id="fecha-error" className="reservation-form__error" role="alert">
                {fieldErrors.fecha}
              </span>
            )}
          </div>

          <div className="reservation-form__field">
            <label htmlFor="hora">Hora</label>
            <input
              id="hora"
              name="hora"
              type="time"
              value={values.hora}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.hora)}
              aria-describedby={fieldErrors.hora ? 'hora-error' : undefined}
            />
            {fieldErrors.hora && (
              <span id="hora-error" className="reservation-form__error" role="alert">
                {fieldErrors.hora}
              </span>
            )}
          </div>
        </div>

        <div className="reservation-form__field">
          <label htmlFor="servicio">Servicio</label>
          <select
            id="servicio"
            name="servicio"
            value={values.servicio}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.servicio)}
            aria-describedby={fieldErrors.servicio ? 'servicio-error' : undefined}
          >
            <option value="">Seleccione un servicio</option>
            {SERVICIOS_DISPONIBLES.map((servicio) => (
              <option key={servicio} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
          {fieldErrors.servicio && (
            <span id="servicio-error" className="reservation-form__error" role="alert">
              {fieldErrors.servicio}
            </span>
          )}
        </div>

        <button type="submit" className="reservation-form__submit" disabled={submitting}>
          {submitting ? 'Guardando…' : 'Crear reserva'}
        </button>
      </form>
    </section>
  );
}
