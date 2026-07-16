package com.citasmedicas.medico;

import com.citasmedicas.common.exception.ResourceNotFoundException;
import com.citasmedicas.especialidad.Especialidad;
import com.citasmedicas.especialidad.EspecialidadService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final EspecialidadService especialidadService;

    public MedicoService(MedicoRepository medicoRepository, EspecialidadService especialidadService) {
        this.medicoRepository = medicoRepository;
        this.especialidadService = especialidadService;
    }

    public List<Medico> findAll() {
        return medicoRepository.findAll();
    }

    public Medico findById(Long id) {
        return medicoRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forId("Médico", id));
    }

    public Especialidad resolveEspecialidad(Long especialidadId) {
        return especialidadService.findById(especialidadId);
    }

    public Medico save(Medico medico) {
        return medicoRepository.save(medico);
    }

    public void deleteById(Long id) {
        Medico medico = findById(id);
        medicoRepository.delete(medico);
    }
}
