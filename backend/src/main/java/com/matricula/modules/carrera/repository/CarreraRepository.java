package com.matricula.modules.carrera.repository;

import com.matricula.modules.carrera.model.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarreraRepository extends JpaRepository<Carrera, Integer> {
    List<Carrera> findByFacultad_FacultadId(Integer facultadId);
}
