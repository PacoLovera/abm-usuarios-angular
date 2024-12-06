package com.induccionlovera.abm_usuarios.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.induccionlovera.abm_usuarios.dto.UsuarioDTO;
import com.induccionlovera.abm_usuarios.enums.MotivoBloqueo;
import com.induccionlovera.abm_usuarios.model.Usuario;
import com.induccionlovera.abm_usuarios.service.UsuarioService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @PostMapping
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody @Valid UsuarioDTO usuarioDTO) {
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody @Valid UsuarioDTO usuarioDTO) {
        Usuario usuarioActualizado = usuarioService.actualizarUsuario(id, usuarioDTO);
        
        return ResponseEntity.status(HttpStatus.OK).body(usuarioActualizado);
    }

    // Listar usuarios 
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Bloquear un usuario
    @PatchMapping("/{id}/bloquear")
    public ResponseEntity<Usuario> bloquearUsuario(
            @PathVariable Long id,
            @RequestParam MotivoBloqueo motivo) {
        Usuario usuarioBloqueado = usuarioService.bloquearUsuario(id, motivo);
        return ResponseEntity.ok(usuarioBloqueado);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.ok("Usuario eliminado");
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerUsuario(id);
        return ResponseEntity.ok(usuario);
    }
}
