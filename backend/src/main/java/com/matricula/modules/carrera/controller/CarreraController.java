package com.matricula.modules.carrera.controller;

import com.matricula.modules.carrera.dto.CarreraDTO;
import com.matricula.modules.carrera.service.CarreraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/carreras")
@RequiredArgsConstructor
@Validated
public class CarreraController {

    private final CarreraService service;

    @GetMapping
    public ResponseEntity<List<CarreraDTO>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarreraDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/facultad/{facultadId}")
    public ResponseEntity<List<CarreraDTO>> getByFacultad(@PathVariable Integer facultadId) {
        return ResponseEntity.ok(service.findByFacultad(facultadId));
    }

    @PostMapping
    public ResponseEntity<CarreraDTO> create(@Valid @RequestBody CarreraDTO dto) {
        CarreraDTO created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/carreras/" + created.getCarreraId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarreraDTO> update(@PathVariable Integer id, @Valid @RequestBody CarreraDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
