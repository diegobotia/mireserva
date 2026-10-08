package com.tdea.mireserva.dto;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Request payload used to create a reservation.
 *
 * @param customerName name of the customer
 * @param date reservation date
 * @param time reservation time
 * @param service service being reserved
 */
public record ReservationRequest(
        String customerName,
        LocalDate date,
        LocalTime time,
        String service) {
}
