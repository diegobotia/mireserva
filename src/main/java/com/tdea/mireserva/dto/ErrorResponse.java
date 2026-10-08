package com.tdea.mireserva.dto;

/**
 * Standard error payload returned by the API.
 *
 * @param message description of the error
 */
public record ErrorResponse(String message) {
}
