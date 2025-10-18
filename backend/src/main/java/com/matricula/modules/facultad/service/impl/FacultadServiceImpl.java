package com.matricula.modules.facultad.service.impl;

import com.matricula.exception.NotFoundException;
import com.matricula.modules.facultad.dto.FacultadDTO;
import com.matricula.modules.facultad.model.Facultad;
import com.matricula.modules.facultad.repository.FacultadRepository;
import com.matricula.modules.facultad.service.FacultadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacultadServiceImpl implements FacultadService {

    private final FacultadRepository repository;

    @Override
    public List<FacultadDTO> findAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public FacultadDTO findById(Integer id) {
        Facultad fac = repository.findById(id).orElseThrow(() -> new NotFoundException("Facultad no encontrada"));
        return toDTO(fac);
    }

    @Override
    public FacultadDTO create(FacultadDTO dto) {
        Facultad fac = toEntity(dto);
        fac.setFacultadId(null);
        return toDTO(repository.save(fac));
    }

    @Override
    public FacultadDTO update(Integer id, FacultadDTO dto) {
        Facultad existing = repository.findById(id).orElseThrow(() -> new NotFoundException("Facultad no encontrada"));
        existing.setNombre(dto.getNombre());
        existing.setDescripcion(dto.getDescripcion());
        existing.setUbicacion(dto.getUbicacion());
        existing.setDecano(dto.getDecano());
        existing.setActivo(dto.getActivo());
        return toDTO(repository.save(existing));
    }

    @Override
    public void delete(Integer id) {
        Facultad existing = repository.findById(id).orElseThrow(() -> new NotFoundException("Facultad no encontrada"));
        repository.delete(existing);
    }

    private FacultadDTO toDTO(Facultad fac) {
        FacultadDTO dto = new FacultadDTO();
        dto.setFacultadId(fac.getFacultadId());
        dto.setNombre(fac.getNombre());
        dto.setDescripcion(fac.getDescripcion());
        dto.setUbicacion(fac.getUbicacion());
        dto.setDecano(fac.getDecano());
        dto.setActivo(fac.getActivo());
        return dto;
    }

    private Facultad toEntity(FacultadDTO dto) {
        return Facultad.builder()
                .facultadId(dto.getFacultadId())
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .ubicacion(dto.getUbicacion())
                .decano(dto.getDecano())
                .activo(dto.getActivo())
                .build();
    }
}
