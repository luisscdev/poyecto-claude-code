package com.citasmedicas.medico;

import com.citasmedicas.especialidad.Especialidad;
import com.citasmedicas.especialidad.EspecialidadMapper;
import com.citasmedicas.medico.dto.MedicoRequest;
import com.citasmedicas.medico.dto.MedicoResponse;

public class MedicoMapper {

    private MedicoMapper() {
    }

    public static Medico toEntity(MedicoRequest request, Especialidad especialidad) {
        return new Medico(
                request.nombre(),
                request.apellido(),
                request.numeroColegiado(),
                request.telefono(),
                request.email(),
                especialidad
        );
    }

    public static void updateEntity(Medico medico, MedicoRequest request, Especialidad especialidad) {
        medico.setNombre(request.nombre());
        medico.setApellido(request.apellido());
        medico.setNumeroColegiado(request.numeroColegiado());
        medico.setTelefono(request.telefono());
        medico.setEmail(request.email());
        medico.setEspecialidad(especialidad);
    }

    public static MedicoResponse toResponse(Medico medico) {
        return new MedicoResponse(
                medico.getId(),
                medico.getNombre(),
                medico.getApellido(),
                medico.getNumeroColegiado(),
                medico.getTelefono(),
                medico.getEmail(),
                EspecialidadMapper.toResponse(medico.getEspecialidad())
        );
    }
}
