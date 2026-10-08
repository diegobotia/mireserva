package com.tdea.mireserva.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.tdea.mireserva.entity.ReservationStatus;

/**
 * Response payload that represents a reservation.
 *
 * @param id reservation identifier
 * @param customerName name of the customer
 * @param date reservation date
 * @param time reservation time
 * @param service service being reserved
 * @param reservationStatus current status of the reservation
 */
public record ReservationResponse(
        Long id,
        String customerName,
        LocalDate date,
        LocalTime time,
        String service,
        ReservationStatus reservationStatus) {
}
