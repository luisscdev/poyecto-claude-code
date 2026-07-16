package com.citasmedicas.cita;

import com.citasmedicas.common.exception.ResourceNotFoundException;
import com.citasmedicas.medico.Medico;
import com.citasmedicas.medico.MedicoService;
import com.citasmedicas.paciente.Paciente;
import com.citasmedicas.paciente.PacienteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CitaService {

    private final CitaRepository citaRepository;
    private final PacienteService pacienteService;
    private final MedicoService medicoService;

    public CitaService(CitaRepository citaRepository, PacienteService pacienteService, MedicoService medicoService) {
        this.citaRepository = citaRepository;
        this.pacienteService = pacienteService;
        this.medicoService = medicoService;
    }

    public List<Cita> findAll() {
        return citaRepository.findAll();
    }

    public Cita findById(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forId("Cita", id));
    }

    public List<Cita> findByPacienteId(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId);
    }

    public List<Cita> findByMedicoId(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId);
    }

    public Paciente resolvePaciente(Long pacienteId) {
        return pacienteService.findById(pacienteId);
    }

    public Medico resolveMedico(Long medicoId) {
        return medicoService.findById(medicoId);
    }

    public Cita save(Cita cita) {
        return citaRepository.save(cita);
    }

    public void deleteById(Long id) {
        Cita cita = findById(id);
        citaRepository.delete(cita);
    }
}
