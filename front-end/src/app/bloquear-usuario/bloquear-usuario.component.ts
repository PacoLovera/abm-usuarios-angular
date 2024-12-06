import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-bloquear-usuario',
  templateUrl: './bloquear-usuario.component.html',
  styleUrls: ['./bloquear-usuario.component.css'],
  imports: [ReactiveFormsModule]
})
export class BloquearUsuarioComponent {
  @Input() userId!: number;
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

    this.usuarioService.bloquearUsuario(this.userId, motivo).subscribe(() => {
      alert('Usuario bloqueado con éxito');
    });
  }
}

