package com.tdea.mireserva.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * JPA entity that represents a reservation in the system.
 */
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "reservation_date", nullable = false)
    private LocalDate date;

    @Column(name = "reservation_time", nullable = false)
    private LocalTime time;

    @Column(name = "service", nullable = false)
    private String service;

    @Enumerated(EnumType.STRING)
    @Column(name = "reservation_status", nullable = false)
    private ReservationStatus reservationStatus;

    /**
     * Creates an empty reservation. Required by JPA.
     */
    public Reservation() {
    }

    /**
     * Creates a reservation with the given attributes.
     *
     * @param customerName name of the customer
     * @param date reservation date
     * @param time reservation time
     * @param service service being reserved
     * @param reservationStatus current status of the reservation
     */
    public Reservation(String customerName, LocalDate date, LocalTime time, String service,
            ReservationStatus reservationStatus) {
        this.customerName = customerName;
        this.date = date;
        this.time = time;
        this.service = service;
        this.reservationStatus = reservationStatus;
    }

    /**
     * Returns the reservation identifier.
     *
     * @return the primary key, or {@code null} if not persisted yet
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the reservation identifier.
     *
     * @param id the primary key
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the customer name.
     *
     * @return the customer name
     */
    public String getCustomerName() {
        return customerName;
    }

    /**
     * Sets the customer name.
     *
     * @param customerName the customer name
     */
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    /**
     * Returns the reservation date.
     *
     * @return the reservation date
     */
    public LocalDate getDate() {
        return date;
    }

    /**
     * Sets the reservation date.
     *
     * @param date the reservation date
     */
    public void setDate(LocalDate date) {
        this.date = date;
    }

    /**
     * Returns the reservation time.
     *
     * @return the reservation time
     */
    public LocalTime getTime() {
        return time;
    }

    /**
     * Sets the reservation time.
     *
     * @param time the reservation time
     */
    public void setTime(LocalTime time) {
        this.time = time;
    }

    /**
     * Returns the reserved service.
     *
     * @return the service name
     */
    public String getService() {
        return service;
    }

    /**
     * Sets the reserved service.
     *
     * @param service the service name
     */
    public void setService(String service) {
        this.service = service;
    }

    /**
     * Returns the reservation status.
     *
     * @return the current {@link ReservationStatus}
     */
    public ReservationStatus getReservationStatus() {
        return reservationStatus;
    }

    /**
     * Sets the reservation status.
     *
     * @param reservationStatus the new status
     */
    public void setReservationStatus(ReservationStatus reservationStatus) {
        this.reservationStatus = reservationStatus;
    }
}
