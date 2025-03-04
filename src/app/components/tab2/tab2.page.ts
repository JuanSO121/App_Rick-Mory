import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';
import { PersonajeModalComponent } from 'src/app/components/personaje-modal/personaje-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  characters: any[] = [];
  loading = false;

  constructor(private rickMortyService: RickyMortyServiceService) {}

  ngOnInit() {
    this.loadCharacters();
    this.rickMortyService.logAllEpisodes();
  }

  loadCharacters() {
    this.loading = true;
    this.rickMortyService.getPersonajes().subscribe((data) => {
      this.characters = data;
      this.loading = false;
    });
  }

  loadMore(event: any) {
    this.rickMortyService.getPersonajes().subscribe((data) => {
      this.characters = [...this.characters, ...data];
      event.target.complete();
    });
  }
}
