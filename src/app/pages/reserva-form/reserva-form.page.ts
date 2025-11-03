import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonSelect, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonSelectOption, IonLabel, IonList, IonIcon, IonInput, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from 'src/app/models/habitacion';
import { HabitacionService } from 'src/app/services/habitacion';
import { ReservaService } from 'src/app/services/reserva';
import { Reserva } from 'src/app/models/reserva';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.page.html',
  styleUrls: ['./reserva-form.page.scss'],
  standalone: true,
  imports: [IonInput, IonSelect,IonList, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelectOption, FormsModule,ReactiveFormsModule]
})

export class ReservaFormPage implements OnInit {
  reservas: Reserva[] = [];
  private fb = inject(FormBuilder);
  private reservaSvc = inject(ReservaService);
  private habitacionSvc = inject(HabitacionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  habitaciones = signal<Habitacion[]>([]);
  reservaId: string | null = null;

  form = this.fb.nonNullable.group({
    habitacionId: ['', Validators.required],
    nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    estado: ['', Validators.required]
  });

  ngOnInit() {
    // Cargar habitaciones disponibles (si las usas en un select)
    this.habitacionSvc.getAll().subscribe(h => this.habitaciones.set(h));

    // Revisar si hay un ID en la URL (modo edición)
    this.reservaId = this.route.snapshot.paramMap.get('id');
    if (this.reservaId) {
      this.reservaSvc.getById(this.reservaId).subscribe({
        next: (reserva) => {
          this.form.patchValue({
            habitacionId: reserva.habitacionId,
            nombreCliente: reserva.nombreCliente,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            estado: reserva.estado
          });
        },
        error: () => this.mostrarMensaje('Error', 'No se pudo cargar la reserva')
      });
    }
  }

  async save() {
    if (this.form.invalid) {
      this.mostrarMensaje('Error', 'Complete todos los campos correctamente');
      return;
    }

    const { fechaInicio, fechaFin } = this.form.value;
    if (new Date(fechaInicio!) > new Date(fechaFin!)) {
      this.mostrarMensaje('Error', 'La fecha de inicio no puede ser mayor que la fecha de fin');
      return;
    }

    const payload: Reserva = this.form.getRawValue();

    if (this.reservaId) {
      // Modo edición
      this.reservaSvc.update(this.reservaId, payload).subscribe({
        next: () => {
          this.mostrarMensaje('Éxito', 'Reserva actualizada correctamente');
          this.router.navigate(['/reservas']);
        },
        error: () => this.mostrarMensaje('Error', 'No se pudo actualizar la reserva')
      });
    } else {
      // Modo creación
      this.reservaSvc.create(payload).subscribe({
        next: () => {
          this.mostrarMensaje('Éxito', 'Reserva registrada correctamente');
          this.router.navigate(['/reservas']);
        },
        error: () => this.mostrarMensaje('Error', 'No se pudo registrar la reserva')
      });
    }
  }

  cancel() {
    this.router.navigate(['/reservas']);
  }

  private async mostrarMensaje(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}