import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  constructor(private navCtrl: NavController) {}

  public actionSheetButtons = [
    { text: 'Ver episodios', icon: 'tv-outline', data: { action: 'episodes' }, handler: () => this.goToTab(2) },
    { text: 'Ver personajes', icon: 'people-outline', data: { action: 'characters' }, handler: () => this.goToTab(3) },
    { text: 'Cerrar sesión', icon: 'log-out-outline', role: 'destructive', data: { action: 'logout' } },
    { text: 'Cancelar', role: 'cancel', data: { action: 'cancel' } },
  ];

  goToTab(tabIndex: number) {
    this.navCtrl.navigateRoot(`/tabs/tab${tabIndex}`);
  }
}
