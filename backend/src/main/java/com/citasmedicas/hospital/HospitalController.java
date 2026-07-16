package com.citasmedicas.hospital;

import com.citasmedicas.hospital.dto.HospitalRequest;
import com.citasmedicas.hospital.dto.HospitalResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitales")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }


    @GetMapping
    public List<HospitalResponse> findAll() {
        return hospitalService.findAll().stream()
                .map(HospitalMapper::toResponse)
                .toList();
    }
    @GetMapping("/{id}")
    public HospitalResponse findById(@PathVariable Long id) {
        return HospitalMapper.toResponse(hospitalService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HospitalResponse create(@Valid @RequestBody HospitalRequest request) {
        Hospital hospital = HospitalMapper.toEntity(request);
        return HospitalMapper.toResponse(hospitalService.save(hospital));
    }

    @PutMapping("/{id}")
    public HospitalResponse update(@PathVariable Long id, @Valid @RequestBody HospitalRequest request) {
        Hospital hospital = hospitalService.findById(id);
        HospitalMapper.updateEntity(hospital, request);
        return HospitalMapper.toResponse(hospitalService.save(hospital));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        hospitalService.deleteById(id);
    }
}
