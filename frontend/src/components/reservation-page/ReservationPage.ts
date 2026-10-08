import { createElement, useEffect, useRef, useState } from 'react';

import reservaService from '../../services/ReservaService';
import templateSource from './ReservationPage.html?raw';
import './ReservationPage.css';

const ACTIVE_STATUS = 'ACTIVA';

interface Reservation {
  id: number;
  customerName: string;
  date: string;
  time: string;
  service: string;
  reservationStatus: string;
}

/**
 * Fills the reservation table template with the current rows and actions.
 *
 * @param host element that receives the rendered page
 * @param reservations reservations returned by the API
 * @param message status or error text shown above the table
 * @param onCancel callback invoked when the user cancels a reservation
 */
function renderReservationPage(
  host: HTMLElement,
  reservations: Reservation[],
  message: string,
  onCancel: (id: number) => void,
): void {
  const parsed = new DOMParser().parseFromString(templateSource, 'text/html');
  const view = parsed.body.firstElementChild;
  if (!(view instanceof HTMLElement)) {
    return;
  }

  const messageElement = view.querySelector<HTMLElement>('[data-role="message"]');
  if (messageElement) {
    messageElement.hidden = message.length === 0;
    messageElement.textContent = message;
  }

  const emptyElement = view.querySelector<HTMLElement>('[data-role="empty"]');
  const tableCard = view.querySelector<HTMLElement>('.reservation-table-card');
  const hasReservations = reservations.length > 0;
  if (emptyElement) {
    emptyElement.hidden = hasReservations || message.length > 0;
  }
  if (tableCard) {
    tableCard.hidden = !hasReservations;
  }

  const tbody = view.querySelector('tbody');
  const rowTemplate = view.querySelector<HTMLTemplateElement>('[data-role="row-template"]');
  if (tbody && rowTemplate) {
    const fragment = document.createDocumentFragment();
    for (const reservation of reservations) {
      const row = rowTemplate.content.firstElementChild?.cloneNode(true);
      if (!(row instanceof HTMLTableRowElement)) {
        continue;
      }

      setField(row, 'id', String(reservation.id));
      setField(row, 'customerName', reservation.customerName);
      setField(row, 'date', reservation.date);
      setField(row, 'time', reservation.time);
      setField(row, 'reservationStatus', reservation.reservationStatus);
      setField(row, 'service', reservation.service);
      row.dataset.status = reservation.reservationStatus;

      const cancelButton = row.querySelector<HTMLButtonElement>('[data-action="cancel"]');
      if (cancelButton) {
        cancelButton.disabled = reservation.reservationStatus !== ACTIVE_STATUS;
        cancelButton.addEventListener('click', () => onCancel(reservation.id));
      }

      fragment.append(row);
    }
    tbody.replaceChildren(fragment);
  }

  host.replaceChildren(view);
}

/**
 * Writes a reservation field into the matching cell.
 *
 * @param row table row being filled
 * @param field reservation property name
 * @param value text shown in the cell
 */
function setField(row: HTMLTableRowElement, field: string, value: string): void {
  const cell = row.querySelector(`[data-field="${field}"]`);
  if (cell) {
    cell.textContent = value;
    if (field === 'reservationStatus') {
      cell.setAttribute('data-status', value);
    }
  }
}

/**
 * Page that lists reservations and lets the user cancel an active one.
 *
 * @returns the reservation page view
 */
interface ReservationPageProps {
  refreshKey?: number;
}

export function ReservationPage({ refreshKey = 0 }: ReservationPageProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<(id: number) => void>(() => undefined);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState('Cargando reservas...');

  useEffect(() => {
    let active = true;

    reservaService
      .findAll()
      .then((data: Reservation[]) => {
        if (!active) {
          return;
        }
        setReservations(data);
        setMessage('');
      })
      .catch(() => {
        if (active) {
          setMessage('No se pudieron cargar las reservas.');
        }
      });

    return () => {
      active = false;
    };
  }, [refreshKey]);

  cancelRef.current = (id: number) => {
    setMessage('Cancelando reserva...');
    reservaService
      .cancel(id)
      .then(() => reservaService.findAll())
      .then((data: Reservation[]) => {
        setReservations(data);
        setMessage('');
      })
      .catch(() => {
        setMessage('No se pudo cancelar la reserva.');
      });
  };

  useEffect(() => {
    if (!hostRef.current) {
      return;
    }

    renderReservationPage(hostRef.current, reservations, message, (id) => {
      cancelRef.current(id);
    });
  }, [reservations, message]);

  return createElement('div', { ref: hostRef });
}
