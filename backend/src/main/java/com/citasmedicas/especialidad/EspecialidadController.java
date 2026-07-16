package com.citasmedicas.especialidad;

import com.citasmedicas.especialidad.dto.EspecialidadRequest;
import com.citasmedicas.especialidad.dto.EspecialidadResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }

    @GetMapping
    public List<EspecialidadResponse> findAll() {
        return especialidadService.findAll().stream()
                .map(EspecialidadMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public EspecialidadResponse findById(@PathVariable Long id) {
        return EspecialidadMapper.toResponse(especialidadService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EspecialidadResponse create(@Valid @RequestBody EspecialidadRequest request) {
        Especialidad especialidad = EspecialidadMapper.toEntity(request);
        return EspecialidadMapper.toResponse(especialidadService.save(especialidad));
    }

    @PutMapping("/{id}")
    public EspecialidadResponse update(@PathVariable Long id, @Valid @RequestBody EspecialidadRequest request) {
        Especialidad especialidad = especialidadService.findById(id);
        EspecialidadMapper.updateEntity(especialidad, request);
        return EspecialidadMapper.toResponse(especialidadService.save(especialidad));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        especialidadService.deleteById(id);
    }
}
