package com.citasmedicas.medico;

import com.citasmedicas.especialidad.Especialidad;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    private String numeroColegiado;

    private String telefono;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "especialidad_id", nullable = false)
    private Especialidad especialidad;

    public Medico(String nombre, String apellido, String numeroColegiado, String telefono, String email,
                  Especialidad especialidad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroColegiado = numeroColegiado;
        this.telefono = telefono;
        this.email = email;
        this.especialidad = especialidad;
    }
}
