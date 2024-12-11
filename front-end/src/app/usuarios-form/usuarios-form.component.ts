import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService, Usuario } from '../service/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
  imports: [ReactiveFormsModule]
})
export class UsuariosFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  isEditMode = false;
  @Input() userId?: number;
  @Output() guardarEvent = new EventEmitter<Usuario>();

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario reactivo
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    if(this.userId){
      this.isEditMode = true;
      this.cargarUsuario(this.userId);
    }
    
  }

  cargarUsuario(id: number): void {
    this.usuarioService.obtenerUsuario(id).subscribe(usuario => {
      this.usuarioForm.patchValue(usuario); // Carga los valores al formulario
    });
  }

  guardar(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioData: Partial<Usuario> = this.usuarioForm.value;

    if (this.isEditMode && this.userId) {
      this.usuarioService.actualizarUsuario(this.userId, usuarioData).subscribe((usuario) => {
        this.guardarEvent.emit(usuario)
      });
    } else {
      this.usuarioService.crearUsuario(usuarioData).subscribe((usuario) => {
        this.guardarEvent.emit(usuario)
      });
    }
  }
}
