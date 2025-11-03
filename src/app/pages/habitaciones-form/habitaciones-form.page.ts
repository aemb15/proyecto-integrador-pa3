import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonLabel, IonButton, IonInput, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { HabitacionService } from 'src/app/services/habitacion';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from 'src/app/models/habitacion';

@Component({
  selector: 'app-habitaciones-form',
  templateUrl: './habitaciones-form.page.html',
  styleUrls: ['./habitaciones-form.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonLabel, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule]
})
export class HabitacionesFormPage {
  private fb = inject(FormBuilder);
  private svc = inject(HabitacionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = signal<string | null>(null);
  isEdit = computed(() => this.id() !== null);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    precioPorNoche: [0, [Validators.required, Validators.min(0)]],
    capacidad: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['']
  });
  
  constructor() { 
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(paramId);
      this.svc.getById(paramId).subscribe(h => this.form.patchValue(h));
    }
  }

  save() {
    const payload: Habitacion = this.form.getRawValue();
    if (this.isEdit()) {
      this.svc.update(this.id()!, payload).subscribe(() => this.router.navigate(['/habitaciones']));
    } else {
      this.svc.create(payload).subscribe(() => this.router.navigate(['/habitaciones']));
    }
  }

  cancel() { this.router.navigate(['/habitaciones']); }
}
