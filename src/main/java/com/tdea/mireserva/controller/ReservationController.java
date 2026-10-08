package com.tdea.mireserva.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tdea.mireserva.dto.ReservationRequest;
import com.tdea.mireserva.dto.ReservationResponse;
import com.tdea.mireserva.entity.Reservation;
import com.tdea.mireserva.service.ReservationService;

/**
 * REST controller that exposes reservation endpoints.
 */
@RestController
@RequestMapping("/reservas")
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Creates the controller with the required service dependency.
     *
     * @param reservationService service used to apply reservation business rules
     */
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Lists all reservations.
     *
     * @return {@code 200 OK} with the list of reservations
     */
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> findAll() {
        List<ReservationResponse> responses = reservationService.findAll().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(responses);
    }

    /**
     * Creates a new reservation.
     *
     * @param request reservation data to create
     * @return {@code 201 Created} with the persisted reservation
     */
    @PostMapping
    public ResponseEntity<ReservationResponse> create(@RequestBody ReservationRequest request) {
        Reservation created = reservationService.create(toEntity(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(created));
    }

    /**
     * Cancels a reservation by its identifier.
     *
     * @param id reservation identifier
     * @return {@code 200 OK} with the cancelled reservation
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ReservationResponse> cancel(@PathVariable Long id) {
        Reservation cancelled = reservationService.cancel(id);
        return ResponseEntity.ok(toResponse(cancelled));
    }

    /**
     * Maps a request DTO to a new {@link Reservation} entity.
     *
     * @param request incoming reservation data
     * @return entity ready to be persisted
     */
    private Reservation toEntity(ReservationRequest request) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.customerName());
        reservation.setDate(request.date());
        reservation.setTime(request.time());
        reservation.setService(request.service());
        return reservation;
    }

    /**
     * Maps a {@link Reservation} entity to a response DTO.
     *
     * @param reservation persisted reservation
     * @return response representation of the reservation
     */
    private ReservationResponse toResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCustomerName(),
                reservation.getDate(),
                reservation.getTime(),
                reservation.getService(),
                reservation.getReservationStatus());
    }
}
