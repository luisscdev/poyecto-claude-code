package com.citasmedicas.cita;

import com.citasmedicas.cita.dto.CitaRequest;
import com.citasmedicas.cita.dto.CitaResponse;
import com.citasmedicas.medico.Medico;
import com.citasmedicas.medico.MedicoMapper;
import com.citasmedicas.paciente.Paciente;
import com.citasmedicas.paciente.PacienteMapper;

public class CitaMapper {

    private CitaMapper() {
    }

    public static Cita toEntity(CitaRequest request, Paciente paciente, Medico medico) {
        return new Cita(request.fechaHora(), request.estado(), request.motivo(), paciente, medico);
    }

    public static void updateEntity(Cita cita, CitaRequest request, Paciente paciente, Medico medico) {
        cita.setFechaHora(request.fechaHora());
        cita.setEstado(request.estado());
        cita.setMotivo(request.motivo());
        cita.setPaciente(paciente);
        cita.setMedico(medico);
    }

    public static CitaResponse toResponse(Cita cita) {
        return new CitaResponse(
                cita.getId(),
                cita.getFechaHora(),
                cita.getEstado(),
                cita.getMotivo(),
                PacienteMapper.toResponse(cita.getPaciente()),
                MedicoMapper.toResponse(cita.getMedico())
        );
    }
}
