import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  episodes: any[] = [];
  expandedEpisodeId: number | null = null;
  loadingCharacters = false;
  charactersMap: { [key: number]: any[] } = {};
  favoriteEpisodes: any[] = [];
  next_URL: string | null = null;

  constructor(
    private rickyMortyService: RickyMortyServiceService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadEpisodes();
    this.cartService.cart$.subscribe(favorites => {
      this.favoriteEpisodes = favorites;
    });
  }

  private loadEpisodes() {
    this.rickyMortyService.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = [...this.episodes, ...data];
        this.next_URL = data.length > 0 ? data[0].next_url : null;
      },
      error: error => console.error('Error al obtener episodios:', error)
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

  loadMore(event: any) {
    if (!this.next_URL) {
      event.target.disabled = true;
      return;
    }

    this.rickyMortyService.getEpisodes(this.next_URL).subscribe({
      next: data => {
        this.episodes = [...this.episodes, ...data];
        this.next_URL = data.length > 0 ? data[0].next_url : null;
        event.target.complete();
      },
      error: () => event.target.complete()
    });
  }
}
