import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'reservas',
    pathMatch: 'full',
  },
  {
    path: 'reserva-form',
    loadComponent: () => import('./pages/reserva-form/reserva-form.page').then( m => m.ReservaFormPage)
  },
  {
    path: 'reserva-form/:id',
    loadComponent: () => import('./pages/reserva-form/reserva-form.page').then( m => m.ReservaFormPage)
  },
  {
    path: 'reservas',
    loadComponent: () => import('./pages/reservas/reservas.page').then( m => m.ReservasPage)
  },
  {
    path: 'reservas/:id',
    loadComponent: () => import('./pages/reservas/reservas.page').then( m => m.ReservasPage)
  },
  {
    path: 'reservas/new',
    loadComponent: () => import('./pages/reserva-form/reserva-form.page').then( m => m.ReservaFormPage)
  },
  {
    path: 'habitaciones/new',
    loadComponent: () => import('./pages/habitaciones-form/habitaciones-form.page').then( m => m.HabitacionesFormPage)
  },
  {
    path: 'habitaciones-form',
    loadComponent: () => import('./pages/habitaciones-form/habitaciones-form.page').then( m => m.HabitacionesFormPage)
  },
  {
    path: 'habitaciones',
    loadComponent: () => import('./pages/habitaciones/habitaciones.page').then( m => m.HabitacionesPage)
  },
  {
    path: 'habitaciones-form/:id',
    loadComponent: () => import('./pages/habitaciones-form/habitaciones-form.page').then( m => m.HabitacionesFormPage)
  },
];
