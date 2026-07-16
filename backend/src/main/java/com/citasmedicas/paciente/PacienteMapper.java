package com.citasmedicas.paciente;

import com.citasmedicas.paciente.dto.PacienteRequest;
import com.citasmedicas.paciente.dto.PacienteResponse;

public class PacienteMapper {

    private PacienteMapper() {
    }

    public static Paciente toEntity(PacienteRequest request) {
        return new Paciente(
                request.nombre(),
                request.apellido(),
                request.documentoIdentidad(),
                request.fechaNacimiento(),
                request.telefono(),
                request.email(),
                request.direccion()
        );
    }

    public static void updateEntity(Paciente paciente, PacienteRequest request) {
        paciente.setNombre(request.nombre());
        paciente.setApellido(request.apellido());
        paciente.setDocumentoIdentidad(request.documentoIdentidad());
        paciente.setFechaNacimiento(request.fechaNacimiento());
        paciente.setTelefono(request.telefono());
        paciente.setEmail(request.email());
        paciente.setDireccion(request.direccion());
    }

    public static PacienteResponse toResponse(Paciente paciente) {
        return new PacienteResponse(
                paciente.getId(),
                paciente.getNombre(),
                paciente.getApellido(),
                paciente.getDocumentoIdentidad(),
                paciente.getFechaNacimiento(),
                paciente.getTelefono(),
                paciente.getEmail(),
                paciente.getDireccion()
        );
    }
}
