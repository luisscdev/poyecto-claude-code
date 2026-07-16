package com.citasmedicas.cita;

import com.citasmedicas.cita.dto.CitaRequest;
import com.citasmedicas.cita.dto.CitaResponse;
import com.citasmedicas.medico.Medico;
import com.citasmedicas.paciente.Paciente;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    private final CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @GetMapping
    public List<CitaResponse> findAll() {
        return citaService.findAll().stream()
                .map(CitaMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public CitaResponse findById(@PathVariable Long id) {
        return CitaMapper.toResponse(citaService.findById(id));
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<CitaResponse> findByPaciente(@PathVariable Long pacienteId) {
        return citaService.findByPacienteId(pacienteId).stream()
                .map(CitaMapper::toResponse)
                .toList();
    }

    @GetMapping("/medico/{medicoId}")
    public List<CitaResponse> findByMedico(@PathVariable Long medicoId) {
        return citaService.findByMedicoId(medicoId).stream()
                .map(CitaMapper::toResponse)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CitaResponse create(@Valid @RequestBody CitaRequest request) {
        Paciente paciente = citaService.resolvePaciente(request.pacienteId());
        Medico medico = citaService.resolveMedico(request.medicoId());
        Cita cita = CitaMapper.toEntity(request, paciente, medico);
        return CitaMapper.toResponse(citaService.save(cita));
    }

    @PutMapping("/{id}")
    public CitaResponse update(@PathVariable Long id, @Valid @RequestBody CitaRequest request) {
        Cita cita = citaService.findById(id);
        Paciente paciente = citaService.resolvePaciente(request.pacienteId());
        Medico medico = citaService.resolveMedico(request.medicoId());
        CitaMapper.updateEntity(cita, request, paciente, medico);
        return CitaMapper.toResponse(citaService.save(cita));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        citaService.deleteById(id);
    }
}
