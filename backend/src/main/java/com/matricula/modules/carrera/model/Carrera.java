package com.matricula.modules.carrera.model;

import com.matricula.modules.facultad.model.Facultad;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "carrera")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Carrera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carrera_id")
    private Integer carreraId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "facultad_id", nullable = false, foreignKey = @ForeignKey(name = "fk_facultad"))
    private Facultad facultad;

    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "duracion_semestres", nullable = false)
    private Integer duracionSemestres;

    @Column(name = "titulo_otorgado", length = 100)
    private String tituloOtorgado;

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "activo")
    @Builder.Default
    private Boolean activo = Boolean.TRUE;
}
