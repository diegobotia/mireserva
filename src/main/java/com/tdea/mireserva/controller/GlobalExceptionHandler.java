package com.tdea.mireserva.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.tdea.mireserva.dto.ErrorResponse;
import com.tdea.mireserva.exception.ReservationBusinessException;

/**
 * Centralized handler that maps business exceptions to HTTP responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles reservation business rule violations.
     *
     * @param exception the business rule violation
     * @return {@code 404 Not Found} when the reservation does not exist;
     *         {@code 409 Conflict} for other business rule violations
     */
    @ExceptionHandler(ReservationBusinessException.class)
    public ResponseEntity<ErrorResponse> handleReservationBusinessException(
            ReservationBusinessException exception) {
        HttpStatus status = exception.getMessage().toLowerCase().contains("not found")
                ? HttpStatus.NOT_FOUND
                : HttpStatus.CONFLICT;

        return ResponseEntity.status(status).body(new ErrorResponse(exception.getMessage()));
    }
}
