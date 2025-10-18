package com.matricula.modules.carrera.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CarreraDTO {
    private Integer carreraId;

    @NotNull(message = "La facultad es obligatoria")
    private Integer facultadId;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre debe tener máximo 100 caracteres")
    private String nombre;

    private String descripcion;

    @NotNull(message = "La duración es obligatoria")
    @Positive(message = "La duración debe ser positiva")
    private Integer duracionSemestres;

    @Size(max = 100, message = "El título otorgado debe tener máximo 100 caracteres")
    private String tituloOtorgado;

    private Boolean activo = Boolean.TRUE;
}
