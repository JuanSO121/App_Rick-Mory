import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart$ = new BehaviorSubject<any[]>([]);
  cart$ = this._cart$.asObservable();
  private _storage: Storage | null = null;  // 👈 Variable para el Storage

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    this._storage = await this.storage.create();
    const savedFavorites = await this._storage.get('favorites');
    this._cart$.next(savedFavorites || []);
  }

  async addToCart(episode: any) {
    const currentFavorites = this._cart$.getValue();
    const updatedFavorites = [...currentFavorites, episode];
    this._cart$.next(updatedFavorites);
    await this._storage?.set('favorites', updatedFavorites);
  }

  async removeFromCart(id: number) {
    const updatedFavorites = this._cart$.getValue().filter(fav => fav.id !== id);
    this._cart$.next(updatedFavorites);
    await this._storage?.set('favorites', updatedFavorites);
  }

  async clearCart() {
    this._cart$.next([]);
    await this._storage?.remove('favorites');
  }
}
