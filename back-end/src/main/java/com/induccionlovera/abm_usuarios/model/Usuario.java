package com.induccionlovera.abm_usuarios.model;

import java.time.LocalDateTime;

import com.induccionlovera.abm_usuarios.enums.EstadoUsuario;
import com.induccionlovera.abm_usuarios.enums.MotivoBloqueo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(unique = true, nullable = false)
    private String nombreUsuario;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Enumerated(EnumType.STRING)
    private EstadoUsuario estado;

    @Enumerated(EnumType.STRING)
    private MotivoBloqueo motivoBloqueo;
    
    public Usuario(String nombre, String apellido, String nombreUsuario, String password) {
    	this.nombre= nombre;
    	this.apellido= apellido;
    	this.nombreUsuario= nombreUsuario;
    	this.password= password;
    	this.estado= EstadoUsuario.ACTIVO;
    	this.fechaCreacion= LocalDateTime.now();
    }

}
