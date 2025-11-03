import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);
  private base = `${environment.backendUrl}/reservas`;

  getAll(): Observable<Reserva[]> { 
    return this.http.get<Reserva[]>(this.base); 
  }
  getById(id: string): Observable<Reserva> { 
    return this.http.get<Reserva>(`${this.base}/${id}`); 
  }
  create(body: Reserva): Observable<Reserva> { 
    console.log(this.http.post<Reserva>(this.base, body));
    return this.http.post<Reserva>(this.base, body); 
  }
  update(id: string, body: Reserva): Observable<Reserva> { 
    return this.http.put<Reserva>(`${this.base}/${id}`, body); 
  }
  delete(id: string): Observable<void> { 
    return this.http.delete<void>(`${this.base}/${id}`); 
  }
}


