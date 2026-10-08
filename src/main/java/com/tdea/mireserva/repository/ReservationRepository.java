package com.tdea.mireserva.repository;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tdea.mireserva.entity.Reservation;

/**
 * Spring Data JPA repository for {@link Reservation} persistence operations.
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * Checks whether a reservation already exists for the given date and time.
     *
     * @param date the reservation date
     * @param time the reservation time
     * @return {@code true} if a reservation exists for that date and time; {@code false} otherwise
     */
    boolean existsByDateAndTime(LocalDate date, LocalTime time);
}
