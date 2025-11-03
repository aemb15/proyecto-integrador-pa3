import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitacion } from '../models/habitacion';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  private http = inject(HttpClient);
  private base = `${environment.backendUrl}/habitaciones`;

   getAll(): Observable<Habitacion[]> {
    //TODO: Implementar método para obtener todos los productos
    return this.http.get<Habitacion[]>(this.base);
  }
  getById(id: string): Observable<Habitacion> {
    //TODO: Implementar método para obtener un producto por ID
    return this.http.get<Habitacion>(`${this.base}/${id}`);
  }
  create(body: Habitacion): Observable<Habitacion> {
     //TODO: Implementar método para crear un nuevo producto
     console.log(this.http.post<Habitacion>(this.base, body));
    return this.http.post<Habitacion>(this.base, body);
  
  }
  update(id: string, body: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.base}/${id}`, body);
  }
  delete(id: string): Observable<void> {
    //TODO: Implementar método para eliminar un producto por ID
    return this.http.delete<void>(`${this.base}/${id}`);
  }
  
}
