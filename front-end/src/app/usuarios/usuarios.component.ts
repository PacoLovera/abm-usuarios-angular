import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../service/usuario.service';
import { UsuariosFormComponent } from '../usuarios-form/usuarios-form.component';
import { BloquearUsuarioComponent } from '../bloquear-usuario/bloquear-usuario.component';

@Component({
  selector: 'app-usuarios',
  imports: [UsuariosFormComponent, BloquearUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  mostrarFormulario = false;
  mostrarFormularioBloqueo = false;
  usuarioSeleccionado: any = null;

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.usuarioSeleccionado = null;
  }

  editarUsuario(usuario: any): void {
    this.mostrarFormulario = true;
    this.usuarioSeleccionado = usuario.id; // Copia del usuario para editar
  }

  bloquearUsuario(usuario: any): void {
    this.mostrarFormularioBloqueo = true;
    this.usuarioSeleccionado = usuario.id
  }

  eliminarUsuario(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter((u) => u.id !== id);
    });
  }

  guardarUsuario(usuario: any): void {
    if (this.usuarioSeleccionado) {
      // Actualizar usuario existente
      const index = this.usuarios.findIndex((u) => u.id === usuario.id);
      this.usuarios[index] = usuario;
    } else {
      // Agregar nuevo usuario
      usuario.id = this.usuarios.length + 1;
      usuario.estado = 'ACTIVO';
      this.usuarios.push(usuario);
    }
    this.cerrarFormulario();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.usuarioSeleccionado = null;
  }
  
}
