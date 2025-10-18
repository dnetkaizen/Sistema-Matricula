package com.matricula.modules.facultad.controller;

import com.matricula.modules.facultad.dto.FacultadDTO;
import com.matricula.modules.facultad.service.FacultadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/facultades")
@RequiredArgsConstructor
@Validated
public class FacultadController {

    private final FacultadService service;

    @GetMapping
    public ResponseEntity<List<FacultadDTO>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultadDTO> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<FacultadDTO> create(@Valid @RequestBody FacultadDTO dto) {
        FacultadDTO created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/facultades/" + created.getFacultadId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultadDTO> update(@PathVariable Integer id, @Valid @RequestBody FacultadDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
