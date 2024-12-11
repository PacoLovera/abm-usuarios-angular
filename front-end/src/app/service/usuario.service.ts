import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  password: string;
  estado: 'ACTIVO' | 'BLOQUEADO';
  motivoBloqueo?: 'DUPLICADO' | 'BAJA_ADMINISTRATIVA';
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/api/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  bloquearUsuario(id: number, motivo: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/bloquear?motivo=${motivo}`, {});
  }

  desbloquearUsuario(id: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/desbloquear`, {});
  }

  eliminarUsuario(id: number): Observable<String> {
    return this.http.delete<String>(`${this.apiUrl}/${id}`);
  }

  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

}
