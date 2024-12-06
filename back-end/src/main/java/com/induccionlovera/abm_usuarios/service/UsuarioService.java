package com.induccionlovera.abm_usuarios.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.induccionlovera.abm_usuarios.dto.UsuarioDTO;
import com.induccionlovera.abm_usuarios.enums.EstadoUsuario;
import com.induccionlovera.abm_usuarios.enums.MotivoBloqueo;
import com.induccionlovera.abm_usuarios.model.Usuario;
import com.induccionlovera.abm_usuarios.repository.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Usuario registrarUsuario(UsuarioDTO usuarioDTO) {
		Usuario usuario= new Usuario(usuarioDTO.getNombre(), usuarioDTO.getApellido(), usuarioDTO.getNombreUsuario(), usuarioDTO.getPassword());
		return usuarioRepository.save(usuario);
	}
	
	public Usuario actualizarUsuario (Long id, UsuarioDTO usuarioDTO) {
		Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
		if (!optionalUsuario.isPresent()) {
		      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id de usuario inválido");
		}
		Usuario usuario = optionalUsuario.get();
		if(!usuarioDTO.getApellido().isEmpty()) {
			usuario.setApellido(usuarioDTO.getApellido());
		}
		if(!usuarioDTO.getNombre().isEmpty()) {
			usuario.setNombre(usuarioDTO.getNombre());
		}
		if(!usuarioDTO.getNombreUsuario().isEmpty()) {
			usuario.setNombreUsuario(usuarioDTO.getNombreUsuario());
		}
		return usuarioRepository.save(usuario);
	}
	
	public Usuario bloquearUsuario(Long id, MotivoBloqueo motivoBloqueo) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id de usuario inválido"));

        if (usuario.getEstado() == EstadoUsuario.BLOQUEADO) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya está bloqueado");
        }

        usuario.setEstado(EstadoUsuario.BLOQUEADO);
        usuario.setMotivoBloqueo(motivoBloqueo);
        return usuarioRepository.save(usuario);
    }
	
	public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Id de usuario inválido");
        }
        usuarioRepository.deleteById(id);
    }
	
	public List<Usuario> listarUsuarios(){
		return usuarioRepository.findAll();
	}
	
	public Usuario obtenerUsuario(Long id) {
		return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id de usuario inválido"));
	}
	
	
}
