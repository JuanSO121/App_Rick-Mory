import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, forkJoin } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { URL_RM, URL_RM_EPISODE } from '../config/url.service';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyServiceService {
  private localEpisodesUrl = '/assets/episodes/filtered_episodes.json';
  private nextPageUrl: string | null = `${URL_RM}/character`;
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<any[]> {
    if (!this.nextPageUrl || this.isLoading.value) {
      return of([]); // Retorna un array vacío si ya no hay más páginas
    }
  
    this.isLoading.next(true);
  
    return this.http.get<{ results: any[], info: { next: string } }>(this.nextPageUrl).pipe(
      map(res => {
        this.nextPageUrl = res.info.next || null; // Si no hay más páginas, se deja en null
        return res.results;
      }),
      catchError(error => {
        console.error('Error al cargar personajes:', error);
        return of([]);
      }),
      finalize(() => this.isLoading.next(false))
    );
  }
  

  resetPagination() {
    this.nextPageUrl = `${URL_RM}/character`;
  }

  getEpisodes(url: string = URL_RM_EPISODE): Observable<any[]> {
    return forkJoin({
      apiEpisodes: this.http.get<{ info: any, results: any[] }>(url).pipe(
        map(res => ({
          next_url: res.info.next,
          episodes: res.results
        })),
        catchError(() => of({ next_url: null, episodes: [] }))
      ),
      localEpisodesData: this.http.get<{ episodes: any[] }>(this.localEpisodesUrl).pipe(
        catchError(() => of({ episodes: [] }))
      )
    }).pipe(
      map(({ apiEpisodes, localEpisodesData }) => {
        const localEpisodes = localEpisodesData.episodes;
        return apiEpisodes.episodes.map(apiEpisode => {
          const matchingEpisode = localEpisodes.find(ep => ep.id === apiEpisode.id);
          return {
            ...apiEpisode,
            next_url: apiEpisodes.next_url,
            image_url: matchingEpisode?.image || 'https://cdn.forbes.com.mx/2023/08/Rick-and-Morty.webp',
            overview: apiEpisode.overview || 'Descripción no disponible'
          };
        });
      })
    );
  }
  
  logAllEpisodes(url: string = URL_RM_EPISODE): void {
    this.http.get<{ info: { next: string }, results: any[] }>(url).pipe(
      map(res => {
        // Imprimir los nombres de los episodios de la página actual
        res.results.forEach(episode => console.log(episode.name,episode.id));
  
        // Si hay una página siguiente, hacer una llamada recursiva
        if (res.info.next) {
          this.logAllEpisodes(res.info.next);
        }
      }),
      catchError(error => {
        console.error('Error al obtener episodios:', error);
        return of([]);
      })
    ).subscribe();
  }
  

  getCharactersFromEpisode(episode: any): Observable<any[]> {
    const characterIds = episode.characters.map((url: string) => url.split('/').pop()).join(',');
    return this.http.get<any>(`${URL_RM}/character/${characterIds}`).pipe(
      map(data => (Array.isArray(data) ? data : [data])),
      catchError(error => {
        console.error('Error al obtener personajes:', error);
        return of([]);
      })
    );
  }
}
