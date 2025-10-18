package com.matricula.modules.carrera.service;

import com.matricula.modules.carrera.dto.CarreraDTO;

import java.util.List;

public interface CarreraService {
    List<CarreraDTO> findAll();
    CarreraDTO findById(Integer id);
    List<CarreraDTO> findByFacultad(Integer facultadId);
    CarreraDTO create(CarreraDTO dto);
    CarreraDTO update(Integer id, CarreraDTO dto);
    void delete(Integer id);
}
