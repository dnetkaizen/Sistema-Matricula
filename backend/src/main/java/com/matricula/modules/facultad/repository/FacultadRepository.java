package com.matricula.modules.facultad.repository;

import com.matricula.modules.facultad.model.Facultad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacultadRepository extends JpaRepository<Facultad, Integer> {
    Optional<Facultad> findByNombreIgnoreCase(String nombre);
}
