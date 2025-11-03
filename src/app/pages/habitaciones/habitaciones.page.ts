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


export class HabitacionesPage implements OnInit {
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

  /*load() {
    this.svc.getAll().subscribe({
      next: (list) => {
        this.misHabitaciones = list;
      },
      error: (err) => {
        console.error('Error al cargar habitaciones:', err);
      }
    });
  }*/

  reload(ev: CustomEvent) {
    this.load();
    setTimeout(() => (ev.target as any).complete(), 600);
  }

  ngOnInit() {
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

  /*remove(h: Habitacion, ev: Event) {
    ev.preventDefault(); ev.stopPropagation();
    if (!h.id) return;
    this.svc.delete(h.id).subscribe(() => {
      this.toastMsg.set('Producto eliminado');
      this.toastOpen.set(true);
      this.load();
    });
  }*/

  modificarHabitacion(habitacion: Habitacion) {
    this.ruta.navigate(['/habitaciones-form',habitacion.id]);
  }

}
