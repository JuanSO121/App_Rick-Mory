import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  episodes: any[] = [];
  next_URL: string | null = null;

  constructor(private rickyMortyService: RickyMortyServiceService) {}

  ngOnInit() {
    this.loadEpisodes();
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
