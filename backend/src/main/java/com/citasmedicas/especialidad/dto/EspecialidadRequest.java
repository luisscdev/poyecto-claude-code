package com.citasmedicas.especialidad.dto;

import jakarta.validation.constraints.NotBlank;

public record EspecialidadRequest(
        @NotBlank(message = "El nombre es obligatorio") String nombre,
        String descripcion
) {
}
