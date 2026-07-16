package com.citasmedicas.hospital.dto;

public record HospitalResponse(
        Long id,
        String nombre,
        String direccion,
        String ciudad,
        String telefono,
        String email
) {
}
