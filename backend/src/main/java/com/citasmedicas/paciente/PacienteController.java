package com.citasmedicas.paciente;

import com.citasmedicas.paciente.dto.PacienteRequest;
import com.citasmedicas.paciente.dto.PacienteResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public List<PacienteResponse> findAll() {
        return pacienteService.findAll().stream()
                .map(PacienteMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public PacienteResponse findById(@PathVariable Long id) {
        return PacienteMapper.toResponse(pacienteService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PacienteResponse create(@Valid @RequestBody PacienteRequest request) {
        Paciente paciente = PacienteMapper.toEntity(request);
        return PacienteMapper.toResponse(pacienteService.save(paciente));
    }

    @PutMapping("/{id}")
    public PacienteResponse update(@PathVariable Long id, @Valid @RequestBody PacienteRequest request) {
        Paciente paciente = pacienteService.findById(id);
        PacienteMapper.updateEntity(paciente, request);
        return PacienteMapper.toResponse(pacienteService.save(paciente));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        pacienteService.deleteById(id);
    }
}
