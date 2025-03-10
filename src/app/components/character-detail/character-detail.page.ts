import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: false,
})
export class CharacterDetailPage implements OnInit {
  character: any;
  episodes: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private rickyMortyService: RickyMortyServiceService
  ) {}

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    if (characterId) {
      this.loadCharacter(characterId);
    }
  }

  loadCharacter(id: string) {
    this.rickyMortyService.getCharacterById(id).subscribe({
      next: (data) => {
        this.character = data;
        this.loadEpisodes(data.episode); // ✅ Pasamos los episodios al componente
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadEpisodes(episodeUrls: string[]) {
    if (!episodeUrls || episodeUrls.length === 0) return;
    
    const episodeIds: string[] = episodeUrls
      .map(url => url.split('/').pop())
      .filter((id): id is string => !!id);

    if (episodeIds.length === 0) return;

    this.rickyMortyService.getEpisodesByIds(episodeIds).subscribe({
      next: (data) => (this.episodes = data),
      error: () => console.error('Error al cargar episodios'),
    });
  }
}
