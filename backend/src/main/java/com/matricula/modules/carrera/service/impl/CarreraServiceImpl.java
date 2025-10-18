package com.matricula.modules.carrera.service.impl;

import com.matricula.exception.NotFoundException;
import com.matricula.modules.carrera.dto.CarreraDTO;
import com.matricula.modules.carrera.model.Carrera;
import com.matricula.modules.carrera.repository.CarreraRepository;
import com.matricula.modules.carrera.service.CarreraService;
import com.matricula.modules.facultad.model.Facultad;
import com.matricula.modules.facultad.repository.FacultadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarreraServiceImpl implements CarreraService {

    private final CarreraRepository repository;
    private final FacultadRepository facultadRepository;

    @Override
    public List<CarreraDTO> findAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public CarreraDTO findById(Integer id) {
        Carrera car = repository.findById(id).orElseThrow(() -> new NotFoundException("Carrera no encontrada"));
        return toDTO(car);
    }

    @Override
    public List<CarreraDTO> findByFacultad(Integer facultadId) {
        return repository.findByFacultad_FacultadId(facultadId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public CarreraDTO create(CarreraDTO dto) {
        Facultad fac = facultadRepository.findById(dto.getFacultadId()).orElseThrow(() -> new NotFoundException("Facultad no encontrada"));
        Carrera entity = toEntity(dto);
        entity.setCarreraId(null);
        entity.setFacultad(fac);
        return toDTO(repository.save(entity));
    }

    @Override
    public CarreraDTO update(Integer id, CarreraDTO dto) {
        Carrera existing = repository.findById(id).orElseThrow(() -> new NotFoundException("Carrera no encontrada"));
        if (dto.getFacultadId() != null && (existing.getFacultad() == null || !dto.getFacultadId().equals(existing.getFacultad().getFacultadId()))) {
            Facultad fac = facultadRepository.findById(dto.getFacultadId()).orElseThrow(() -> new NotFoundException("Facultad no encontrada"));
            existing.setFacultad(fac);
        }
        existing.setNombre(dto.getNombre());
        existing.setDescripcion(dto.getDescripcion());
        existing.setDuracionSemestres(dto.getDuracionSemestres());
        existing.setTituloOtorgado(dto.getTituloOtorgado());
        existing.setActivo(dto.getActivo());
        return toDTO(repository.save(existing));
    }

    @Override
    public void delete(Integer id) {
        Carrera existing = repository.findById(id).orElseThrow(() -> new NotFoundException("Carrera no encontrada"));
        repository.delete(existing);
    }

    private CarreraDTO toDTO(Carrera car) {
        CarreraDTO dto = new CarreraDTO();
        dto.setCarreraId(car.getCarreraId());
        dto.setFacultadId(car.getFacultad() != null ? car.getFacultad().getFacultadId() : null);
        dto.setNombre(car.getNombre());
        dto.setDescripcion(car.getDescripcion());
        dto.setDuracionSemestres(car.getDuracionSemestres());
        dto.setTituloOtorgado(car.getTituloOtorgado());
        dto.setActivo(car.getActivo());
        return dto;
    }

    private Carrera toEntity(CarreraDTO dto) {
        Carrera entity = new Carrera();
        entity.setCarreraId(dto.getCarreraId());
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setDuracionSemestres(dto.getDuracionSemestres());
        entity.setTituloOtorgado(dto.getTituloOtorgado());
        entity.setActivo(dto.getActivo());
        return entity;
    }
}
