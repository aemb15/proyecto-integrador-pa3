import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonGrid, IonRow, IonItem, IonCol, IonLabel, IonList, IonNote, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ReservaService } from 'src/app/services/reserva';
import { Reserva } from 'src/app/models/reserva';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle, trash } from 'ionicons/icons';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { HabitacionService } from 'src/app/services/habitacion';
import { Habitacion } from 'src/app/models/habitacion';
addIcons({ addCircle, trash });

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonNote, IonList, IonLabel, IonItem, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink]
})

export class ReservasPage {
  private svc = inject(ReservaService);
  private habitacionSvc = inject(HabitacionService);

  reservas = signal<Reserva[]>([]);
  habitaciones = signal<Habitacion[]>([]);

  constructor() {
    this.loadHabitaciones();
    this.loadReservas();
  }

  // Cargar todas las habitaciones
  loadHabitaciones() {
    this.habitacionSvc.getAll().subscribe({
      next: (habs) => this.habitaciones.set(habs),
      error: (err) => console.error('Error al cargar habitaciones', err),
    });
  }

  // Cargar reservas
  loadReservas() {
    this.svc.getAll().subscribe({
      next: (reservas) => this.reservas.set(reservas),
      error: (err) => console.error(err),
    });
  }

  reload(ev: CustomEvent) {
    this.loadReservas();
    setTimeout(() => (ev.target as any).complete(), 600);
  }

  trackById = (_: number, reserva: Reserva) => reserva.id!;

  // Obtener nombre de la habitación a partir del ID
  getNombreHabitacion(habitacionId: string) {
    return this.habitaciones().find(h => h.id === habitacionId)?.nombre ?? 'Habitación desconocida';
  }

  remove(reserva: Reserva, ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();

    if (!reserva.id) return;

    if (confirm(`¿Deseas eliminar la reserva de ${reserva.nombreCliente}?`)) {
      this.svc.delete(reserva.id).subscribe({
        next: () => this.loadReservas(),
        error: (err) => console.error('Error al eliminar la reserva', err),
      });
    }
  }
}