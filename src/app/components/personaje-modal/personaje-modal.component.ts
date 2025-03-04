import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { IonicModule, IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-personaje-modal',
  templateUrl: './personaje-modal.component.html',
  styleUrls: ['./personaje-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PersonajeModalComponent  {
  @Input() characters: any[] = [];
  @Input() loading: boolean = false;
}
