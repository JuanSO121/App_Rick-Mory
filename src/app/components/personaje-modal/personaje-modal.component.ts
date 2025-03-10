import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-personaje-modal',
  templateUrl: './personaje-modal.component.html',
  styleUrls: ['./personaje-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PersonajeModalComponent {
  @Input() characters: any[] = [];
  @Input() loading: boolean = false;

  constructor(private router: Router) {}

  goToCharacterDetail(id: number) {
    this.router.navigate(['/character-detail', id]);
  }
}
