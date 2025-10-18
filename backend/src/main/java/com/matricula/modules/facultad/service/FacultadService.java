package com.matricula.modules.facultad.service;

import com.matricula.modules.facultad.dto.FacultadDTO;

import java.util.List;

public interface FacultadService {
    List<FacultadDTO> findAll();
    FacultadDTO findById(Integer id);
    FacultadDTO create(FacultadDTO dto);
    FacultadDTO update(Integer id, FacultadDTO dto);
    void delete(Integer id);
}
