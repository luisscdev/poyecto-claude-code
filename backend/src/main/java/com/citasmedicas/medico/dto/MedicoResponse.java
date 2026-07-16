package com.citasmedicas.medico.dto;

import com.citasmedicas.especialidad.dto.EspecialidadResponse;

public record MedicoResponse(
        Long id,
        String nombre,
        String apellido,
        String numeroColegiado,
        String telefono,
        String email,
        EspecialidadResponse especialidad
) {
}
