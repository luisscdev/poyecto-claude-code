package com.citasmedicas.hospital.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record HospitalRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "La dirección es obligatoria") String direccion,
        @NotBlank(message = "La ciudad es obligatoria") String ciudad,
        String telefono,
        @Email(message = "El email no es válido") String email
) {
}
