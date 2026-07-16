package com.citasmedicas.paciente.dto;

import java.time.LocalDate;

public record PacienteResponse(
        Long id,
        String nombre,
        String apellido,
        String documentoIdentidad,
        LocalDate fechaNacimiento,
        String telefono,
        String email,
        String direccion
) {
}
