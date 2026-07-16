package com.citasmedicas.hospital;

import com.citasmedicas.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public List<Hospital> findAll() {
        return hospitalRepository.findAll();
    }

    public Hospital findById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.forId("Hospital", id));
    }

    public Hospital save(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public void deleteById(Long id) {
        Hospital hospital = findById(id);
        hospitalRepository.delete(hospital);
    }
}
