package com.citasmedicas.especialidad;

import com.citasmedicas.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadService {

    private final EspecialidadRepository especialidadRepository;

    public EspecialidadService(EspecialidadRepository especialidadRepository) {
        this.especialidadRepository = especialidadRepository;
    }

    public List<Especialidad> findAll() {
        return especialidadRepository.findAll();
    }

    public Especialidad findById(Long id) {
        return especialidadRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forId("Especialidad", id));
    }

    public Especialidad save(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    public void deleteById(Long id) {
        Especialidad especialidad = findById(id);
        especialidadRepository.delete(especialidad);
    }
}
