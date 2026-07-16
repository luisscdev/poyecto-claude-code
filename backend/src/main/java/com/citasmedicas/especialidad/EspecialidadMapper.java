package com.citasmedicas.especialidad;

import com.citasmedicas.especialidad.dto.EspecialidadRequest;
import com.citasmedicas.especialidad.dto.EspecialidadResponse;

public class EspecialidadMapper {

    private EspecialidadMapper() {
    }

    public static Especialidad toEntity(EspecialidadRequest request) {
        return new Especialidad(request.nombre(), request.descripcion());
    }

    public static void updateEntity(Especialidad especialidad, EspecialidadRequest request) {
        especialidad.setNombre(request.nombre());
        especialidad.setDescripcion(request.descripcion());
    }

    public static EspecialidadResponse toResponse(Especialidad especialidad) {
        return new EspecialidadResponse(
                especialidad.getId(),
                especialidad.getNombre(),
                especialidad.getDescripcion()
        );
    }
}
