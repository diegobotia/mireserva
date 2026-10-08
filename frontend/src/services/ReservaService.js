import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const RESERVATIONS_PATH = '/reservas';

/**
 * HTTP client for the reservation API.
 */
class ReservaService {
  /**
   * Returns every reservation stored in the backend.
   *
   * @returns {Promise<Array<{
   *   id: number,
   *   customerName: string,
   *   date: string,
   *   time: string,
   *   service: string,
   *   reservationStatus: string
   * }>>} the reservation list
   */
  async findAll() {
    const response = await apiClient.get(RESERVATIONS_PATH);
    return response.data;
  }

  /**
   * Creates a reservation.
   *
   * @param {{ customerName: string, date: string, time: string, service: string }} reservation reservation data
   * @returns {Promise<{
   *   id: number,
   *   customerName: string,
   *   date: string,
   *   time: string,
   *   service: string,
   *   reservationStatus: string
   * }>} the created reservation
   */
  async create(reservation) {
    const response = await apiClient.post(RESERVATIONS_PATH, reservation);
    return response.data;
  }

  /**
   * Cancels a reservation by its identifier.
   *
   * @param {number} id reservation identifier
   * @returns {Promise<{
   *   id: number,
   *   customerName: string,
   *   date: string,
   *   time: string,
   *   service: string,
   *   reservationStatus: string
   * }>} the cancelled reservation
   */
  async cancel(id) {
    const response = await apiClient.delete(`${RESERVATIONS_PATH}/${id}`);
    return response.data;
  }
}

export default new ReservaService();
