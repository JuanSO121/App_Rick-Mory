import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';
import { CartService } from 'src/app/services/cart.service';
import { PersonajeModalComponent } from "../personaje-modal/personaje-modal.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
  imports: [PersonajeModalComponent,IonicModule, CommonModule]
  
})
export class EpisodesComponent implements OnInit {
  @Input() episodes: any[] = [];
  @Output() episodesLoaded = new EventEmitter<any[]>(); // Emitir episodios cargados
  
  expandedEpisodeId: number | null = null;
  loadingCharacters = false;
  charactersMap: { [key: number]: any[] } = {};
  favoriteEpisodes: any[] = [];
  
  constructor(
    private rickyMortyService: RickyMortyServiceService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(favorites => {
      this.favoriteEpisodes = favorites;
    });
  }

  toggleEpisode(episode: any) {
    this.expandedEpisodeId = this.expandedEpisodeId === episode.id ? null : episode.id;
    if (!this.charactersMap[episode.id]) {
      this.loadCharacters(episode);
    }
  }

  private loadCharacters(episode: any) {
    this.loadingCharacters = true;
    this.rickyMortyService.getCharactersFromEpisode(episode).subscribe({
      next: data => {
        this.charactersMap[episode.id] = data;
        this.loadingCharacters = false;
      },
      error: err => {
        console.error('Error al obtener personajes:', err);
        this.loadingCharacters = false;
      }
    });
  }

  toggleFavorite(episode: any, event: Event) {
    event.stopPropagation();
    this.isFavorite(episode) ? this.cartService.removeFromCart(episode.id) : this.cartService.addToCart(episode);
  }

  isFavorite(episode: any): boolean {
    return this.favoriteEpisodes.some(fav => fav.id === episode.id);
  }
}
