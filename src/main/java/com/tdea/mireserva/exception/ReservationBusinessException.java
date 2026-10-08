package com.tdea.mireserva.exception;

/**
 * Thrown when a business rule of the reservation system is violated.
 */
public class ReservationBusinessException extends RuntimeException {

    /**
     * Creates an exception with the given message.
     *
     * @param message description of the business rule violation
     */
    public ReservationBusinessException(String message) {
        super(message);
    }
}
