package com.citasmedicas.config;

import com.citasmedicas.cita.Cita;
import com.citasmedicas.cita.CitaRepository;
import com.citasmedicas.cita.EstadoCita;
import com.citasmedicas.especialidad.Especialidad;
import com.citasmedicas.especialidad.EspecialidadRepository;
import com.citasmedicas.hospital.Hospital;
import com.citasmedicas.hospital.HospitalRepository;
import com.citasmedicas.medico.Medico;
import com.citasmedicas.medico.MedicoRepository;
import com.citasmedicas.paciente.Paciente;
import com.citasmedicas.paciente.PacienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final EspecialidadRepository especialidadRepository;
    private final HospitalRepository hospitalRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;
    private final CitaRepository citaRepository;

    public DataSeeder(EspecialidadRepository especialidadRepository, HospitalRepository hospitalRepository,
                       MedicoRepository medicoRepository, PacienteRepository pacienteRepository,
                       CitaRepository citaRepository) {
        this.especialidadRepository = especialidadRepository;
        this.hospitalRepository = hospitalRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
        this.citaRepository = citaRepository;
    }

    @Override
    public void run(String... args) {
        Especialidad cardiologia = especialidadRepository.save(
                new Especialidad("Cardiología", "Diagnóstico y tratamiento de enfermedades del corazón"));
        Especialidad pediatria = especialidadRepository.save(
                new Especialidad("Pediatría", "Atención médica de niños y adolescentes"));
        Especialidad dermatologia = especialidadRepository.save(
                new Especialidad("Dermatología", "Diagnóstico y tratamiento de enfermedades de la piel"));
        Especialidad traumatologia = especialidadRepository.save(
                new Especialidad("Traumatología", "Lesiones del sistema musculoesquelético"));

        hospitalRepository.saveAll(List.of(
                new Hospital("Hospital Metropolitano", "Av. Mariana de Jesús s/n, Quito", "Quito",
                        "022345678", "contacto@hospitalmetropolitano.com"),
                new Hospital("Hospital Vozandes", "Villalengua Oe2-37, Quito", "Quito",
                        "022997800", "info@hospitalvozandes.com"),
                new Hospital("Hospital Monte Sinaí", "Autopista Terminal Terrestre, Guayaquil", "Guayaquil",
                        "042000200", "contacto@hospitalmontesinai.org")
        ));

        Medico drPerez = medicoRepository.save(new Medico(
                "Carlos", "Pérez", "MED-1001", "0991234567", "carlos.perez@citasmedicas.com", cardiologia));
        Medico draGomez = medicoRepository.save(new Medico(
                "Ana", "Gómez", "MED-1002", "0987654321", "ana.gomez@citasmedicas.com", pediatria));
        Medico drRuiz = medicoRepository.save(new Medico(
                "Luis", "Ruiz", "MED-1003", "0976543210", "luis.ruiz@citasmedicas.com", dermatologia));
        Medico draTorres = medicoRepository.save(new Medico(
                "Maria", "Torres", "MED-1004", "0965432109", "maria.torres@citasmedicas.com", traumatologia));

        Paciente pJuan = pacienteRepository.save(new Paciente(
                "Juan", "Alvarado", "0102030405", LocalDate.of(1990, 5, 12),
                "0912345678", "juan.alvarado@example.com", "Av. Amazonas 123, Quito"));
        Paciente pMaria = pacienteRepository.save(new Paciente(
                "Maria", "Chuquimarca", "0203040506", LocalDate.of(1985, 8, 23),
                "0923456789", "maria.chuquimarca@example.com", "Calle Bolívar 456, Cuenca"));
        Paciente pPedro = pacienteRepository.save(new Paciente(
                "Pedro", "Suarez", "0304050607", LocalDate.of(2001, 1, 30),
                "0934567890", "pedro.suarez@example.com", "Av. 9 de Octubre 789, Guayaquil"));
        Paciente pLucia = pacienteRepository.save(new Paciente(
                "Lucia", "Vega", "0405060708", LocalDate.of(1978, 11, 3),
                "0945678901", "lucia.vega@example.com", "Calle Larga 321, Cuenca"));
        Paciente pSofia = pacienteRepository.save(new Paciente(
                "Sofia", "Ramirez", "0506070809", LocalDate.of(2015, 3, 17),
                "0956789012", "sofia.ramirez@example.com", "Av. Shyris 654, Quito"));

        citaRepository.saveAll(List.of(
                new Cita(LocalDateTime.now().minusDays(10).withHour(9).withMinute(0),
                        EstadoCita.COMPLETADA, "Control anual", pJuan, drPerez),
                new Cita(LocalDateTime.now().minusDays(3).withHour(11).withMinute(30),
                        EstadoCita.COMPLETADA, "Consulta dermatológica de rutina", pMaria, drRuiz),
                new Cita(LocalDateTime.now().plusDays(2).withHour(10).withMinute(0),
                        EstadoCita.CONFIRMADA, "Revisión post-operatoria", pPedro, draTorres),
                new Cita(LocalDateTime.now().plusDays(4).withHour(15).withMinute(0),
                        EstadoCita.PROGRAMADA, "Consulta pediátrica", pSofia, draGomez),
                new Cita(LocalDateTime.now().plusDays(1).withHour(8).withMinute(30),
                        EstadoCita.PROGRAMADA, "Chequeo cardiológico", pLucia, drPerez),
                new Cita(LocalDateTime.now().minusDays(20).withHour(16).withMinute(0),
                        EstadoCita.CANCELADA, "Consulta de seguimiento", pJuan, draTorres),
                new Cita(LocalDateTime.now().plusDays(7).withHour(9).withMinute(30),
                        EstadoCita.PROGRAMADA, "Evaluación de manchas en la piel", pMaria, drRuiz),
                new Cita(LocalDateTime.now().plusDays(5).withHour(13).withMinute(0),
                        EstadoCita.PROGRAMADA, "Control de crecimiento", pSofia, draGomez)
        ));

        log.info("Datos de ejemplo sembrados: {} especialidades, {} hospitales, {} médicos, {} pacientes, {} citas",
                especialidadRepository.count(), hospitalRepository.count(), medicoRepository.count(),
                pacienteRepository.count(), citaRepository.count());
    }
}
