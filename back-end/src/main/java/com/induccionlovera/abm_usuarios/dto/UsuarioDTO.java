package com.induccionlovera.abm_usuarios.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class UsuarioDTO {
	
	@NotNull
    private String nombre;
	@NotNull
    private String apellido;
	@NotNull
    private String nombreUsuario;
	@NotNull
    private String password;
}
