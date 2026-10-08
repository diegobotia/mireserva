package com.tdea.mireserva.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tdea.mireserva.entity.Reservation;
import com.tdea.mireserva.entity.ReservationStatus;
import com.tdea.mireserva.exception.ReservationBusinessException;
import com.tdea.mireserva.repository.ReservationRepository;

/**
 * Application service that encapsulates the reservation business rules.
 */
@Service
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;

    /**
     * Creates the service with the required repository dependency.
     *
     * @param reservationRepository repository used to persist reservations
     */
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     * Returns all reservations stored in the system.
     *
     * @return list of all reservations; empty when none exist
     */
    @Transactional(readOnly = true)
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    /**
     * Creates a reservation only when no other reservation exists for the same date and time.
     *
     * @param reservation reservation data to persist
     * @return the persisted reservation
     * @throws ReservationBusinessException if a reservation already exists for that date and time
     */
    public Reservation create(Reservation reservation) {
        if (reservationRepository.existsByDateAndTime(reservation.getDate(), reservation.getTime())) {
            throw new ReservationBusinessException(
                    "A reservation already exists for the given date and time");
        }

        reservation.setReservationStatus(ReservationStatus.ACTIVA);
        return reservationRepository.save(reservation);
    }

    /**
     * Cancels an existing reservation identified by its id.
     *
     * @param id reservation identifier
     * @return the cancelled reservation
     * @throws ReservationBusinessException if the reservation does not exist or is already cancelled
     */
    public Reservation cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationBusinessException(
                        "Reservation not found with id: " + id));

        if (reservation.getReservationStatus() == ReservationStatus.CANCELADA) {
            throw new ReservationBusinessException(
                    "Reservation with id " + id + " is already cancelled");
        }

        reservation.setReservationStatus(ReservationStatus.CANCELADA);
        return reservationRepository.save(reservation);
    }
}
