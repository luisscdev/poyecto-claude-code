package com.citasmedicas.dashboard;

import com.citasmedicas.cita.CitaRepository;
import com.citasmedicas.especialidad.EspecialidadRepository;
import com.citasmedicas.medico.MedicoRepository;
import com.citasmedicas.paciente.PacienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final EspecialidadRepository especialidadRepository;
    private final CitaRepository citaRepository;

    public DashboardController(PacienteRepository pacienteRepository, MedicoRepository medicoRepository,
                                EspecialidadRepository especialidadRepository, CitaRepository citaRepository) {
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.especialidadRepository = especialidadRepository;
        this.citaRepository = citaRepository;
    }

    @GetMapping("/summary")
    public DashboardSummary summary() {
        return new DashboardSummary(
                pacienteRepository.count(),
                medicoRepository.count(),
                especialidadRepository.count(),
                citaRepository.count()
        );
    }

    public record DashboardSummary(long pacientes, long medicos, long especialidades, long citas) {
    }
}
