import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonItem, IonTitle, IonMenu, IonToolbar, IonList, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonButtons, IonList, IonToolbar, IonTitle, IonItem, IonContent, IonHeader, IonApp, IonRouterOutlet, IonMenu, IonMenuButton, RouterLink],
})
export class AppComponent {
  constructor() {}
}
