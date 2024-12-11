import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario, UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-bloquear-usuario',
  templateUrl: './bloquear-usuario.component.html',
  styleUrls: ['./bloquear-usuario.component.css'],
  imports: [ReactiveFormsModule]
})
export class BloquearUsuarioComponent {
  @Input() userId!: number;
  @Output() guardarEvent = new EventEmitter<Usuario>();
  bloqueoForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.bloqueoForm = this.fb.group({
      motivo: ['', Validators.required],
    });
  }

  bloquear(): void {
    if (this.bloqueoForm.invalid || !this.userId) {
      return;
    }

    const { motivo } = this.bloqueoForm.value;

    this.usuarioService.bloquearUsuario(this.userId, motivo).subscribe((usuario) => {
      this.guardarEvent.emit(usuario);
    });
  }
}

