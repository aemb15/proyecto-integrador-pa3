import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonRefresherContent, IonRefresher, IonLabel, IonNote, IonItem, IonList, IonCard, IonGrid, IonRow, IonCol, IonFab, IonFabButton, IonToast } from '@ionic/angular/standalone';
import { Habitacion } from 'src/app/models/habitacion';
import { Router, RouterLink } from '@angular/router';
import { HabitacionService } from 'src/app/services/habitacion';

import { addIcons } from 'ionicons';
import { addCircle, logoIonic, trash } from 'ionicons/icons';




@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
  standalone: true,
  imports: [IonToast, IonFabButton, IonFab, IonCol, IonRow, IonGrid, IonCard, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    RouterLink, IonRefresher, IonRefresherContent]
})


/*export class HabitacionesPage implements OnInit {
  private svc = inject(HabitacionService);
  misHabitaciones: Habitacion[] = [];
  //misHabitaciones = signal<Habitacion[]>([]);
  toastOpen = signal(false);
  toastMsg = signal('');

  constructor(private service: HabitacionService,private ruta:Router) {
      addIcons({ addCircle});
      this.load();
  }

  load() { this.svc.getAll().subscribe(list => this.misHabitaciones = list); }


  reload(ev: CustomEvent) {
    this.load();
    setTimeout(() => (ev.target as any).complete(), 600);
  }

  ngOnInit() {
    this.load();
    this.service.getAll().subscribe((habitaciones:Habitacion[])=>{
      this.misHabitaciones = habitaciones;
    })
  }


  eliminarHabitacion(habitacion: Habitacion) {
    this.service.delete(habitacion.id!).subscribe({
      next: () => {
        this.misHabitaciones = this.misHabitaciones.filter(h => h.id !== habitacion.id);
      }
    })
  }


  modificarHabitacion(habitacion: Habitacion) {
    this.ruta.navigate(['/habitaciones-form',habitacion.id]);
  }

}*/

export class HabitacionesPage implements OnInit {
  private svc = inject(HabitacionService);
  private ruta = inject(Router);

  misHabitaciones: Habitacion[] = [];
  toastOpen = signal(false);
  toastMsg = signal('');

  constructor() {
    addIcons({ addCircle });
  }

  ngOnInit() {
    this.load(); //ahora solo se llama aquí (no en constructor)
  }

  // Carga todas las habitaciones
  load() {
    this.svc.getAll().subscribe({
      next: list => this.misHabitaciones = list,
      error: err => console.error('Error al cargar habitaciones:', err)
    });
  }

  // Recarga desde el refresher (pull-to-refresh)
  reload(ev: CustomEvent) {
    this.svc.getAll().subscribe({
      next: list => {
        this.misHabitaciones = list;
        (ev.target as HTMLIonRefresherElement).complete();
      },
      error: err => {
        console.error('Error al recargar habitaciones:', err);
        (ev.target as HTMLIonRefresherElement).complete();
      }
    });
  }

  // Eliminar habitación y recargar lista
  eliminarHabitacion(habitacion: Habitacion) {
    if (!habitacion.id) return;

    this.svc.delete(habitacion.id).subscribe({
      next: () => {
        this.toastMsg.set(`Habitación "${habitacion.nombre}" eliminada`);
        this.toastOpen.set(true);
        this.load(); // recarga la lista desde el servidor
      },
      error: err => console.error('Error al eliminar habitación:', err)
    });
  }

  // Navegar al formulario de edición
  modificarHabitacion(habitacion: Habitacion) {
    this.ruta.navigate(['/habitaciones-form', habitacion.id]);
  }
}

