package com.citasmedicas.paciente;

import com.citasmedicas.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> findAll() {
        return pacienteRepository.findAll();
    }

    public Paciente findById(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forId("Paciente", id));
    }

    public Paciente save(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void deleteById(Long id) {
        Paciente paciente = findById(id);
        pacienteRepository.delete(paciente);
    }
}
