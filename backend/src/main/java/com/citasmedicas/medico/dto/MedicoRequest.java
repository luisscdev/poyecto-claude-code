package com.citasmedicas.medico.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MedicoRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        @NotBlank(message = "El apellido es obligatorio") String apellido,
        @NotBlank(message = "El número de colegiado es obligatorio") String numeroColegiado,
        String telefono,
        @Email(message = "El email no es válido") String email,
        @NotNull(message = "La especialidad es obligatoria") Long especialidadId
) {
}
