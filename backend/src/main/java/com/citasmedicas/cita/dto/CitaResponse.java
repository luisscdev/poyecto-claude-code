package com.citasmedicas.cita.dto;

import com.citasmedicas.cita.EstadoCita;
import com.citasmedicas.medico.dto.MedicoResponse;
import com.citasmedicas.paciente.dto.PacienteResponse;

import java.time.LocalDateTime;

public record CitaResponse(
        Long id,
        LocalDateTime fechaHora,
        EstadoCita estado,
        String motivo,
        PacienteResponse paciente,
        MedicoResponse medico
) {
}
