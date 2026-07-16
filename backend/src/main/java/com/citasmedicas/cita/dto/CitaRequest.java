package com.citasmedicas.cita.dto;

import com.citasmedicas.cita.EstadoCita;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CitaRequest(
        @NotNull(message = "La fecha y hora son obligatorias") LocalDateTime fechaHora,
        @NotNull(message = "El estado es obligatorio") EstadoCita estado,
        String motivo,
        @NotNull(message = "El paciente es obligatorio") Long pacienteId,
        @NotNull(message = "El médico es obligatorio") Long medicoId
) {
}
