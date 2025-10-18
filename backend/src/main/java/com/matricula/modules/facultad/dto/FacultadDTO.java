package com.matricula.modules.facultad.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class FacultadDTO {
    private Integer facultadId;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre debe tener máximo 100 caracteres")
    private String nombre;

    private String descripcion;

    @Size(max = 100, message = "La ubicación debe tener máximo 100 caracteres")
    private String ubicacion;

    @Size(max = 100, message = "El decano debe tener máximo 100 caracteres")
    private String decano;

    private Boolean activo = Boolean.TRUE;
}
