package com.citasmedicas.hospital;

import com.citasmedicas.hospital.dto.HospitalRequest;
import com.citasmedicas.hospital.dto.HospitalResponse;

public class HospitalMapper {

    private HospitalMapper() {
    }

    public static Hospital toEntity(HospitalRequest request) {
        return new Hospital(request.nombre(), request.direccion(), request.ciudad(), request.telefono(),
                request.email());
    }

    public static void updateEntity(Hospital hospital, HospitalRequest request) {
        hospital.setNombre(request.nombre());
        hospital.setDireccion(request.direccion());
        hospital.setCiudad(request.ciudad());
        hospital.setTelefono(request.telefono());
        hospital.setEmail(request.email());
    }

    public static HospitalResponse toResponse(Hospital hospital) {
        return new HospitalResponse(
                hospital.getId(),
                hospital.getNombre(),
                hospital.getDireccion(),
                hospital.getCiudad(),
                hospital.getTelefono(),
                hospital.getEmail()
        );
    }
}
