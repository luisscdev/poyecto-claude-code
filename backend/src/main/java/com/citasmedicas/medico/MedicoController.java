package com.citasmedicas.medico;

import com.citasmedicas.especialidad.Especialidad;
import com.citasmedicas.medico.dto.MedicoRequest;
import com.citasmedicas.medico.dto.MedicoResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping
    public List<MedicoResponse> findAll() {
        return medicoService.findAll().stream()
                .map(MedicoMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public MedicoResponse findById(@PathVariable Long id) {
        return MedicoMapper.toResponse(medicoService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MedicoResponse create(@Valid @RequestBody MedicoRequest request) {
        Especialidad especialidad = medicoService.resolveEspecialidad(request.especialidadId());
        Medico medico = MedicoMapper.toEntity(request, especialidad);
        return MedicoMapper.toResponse(medicoService.save(medico));
    }

    @PutMapping("/{id}")
    public MedicoResponse update(@PathVariable Long id, @Valid @RequestBody MedicoRequest request) {
        Medico medico = medicoService.findById(id);
        Especialidad especialidad = medicoService.resolveEspecialidad(request.especialidadId());
        MedicoMapper.updateEntity(medico, request, especialidad);
        return MedicoMapper.toResponse(medicoService.save(medico));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        medicoService.deleteById(id);
    }
}
