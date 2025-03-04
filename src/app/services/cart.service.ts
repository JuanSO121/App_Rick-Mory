import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]); // Estado del carrito
  cart$ = this.cart.asObservable(); // Observable para escuchar cambios

  getCart() {
    return this.cart.value; // Retorna el estado actual del carrito
  }

  addToCart(episode: any) {
    const currentCart = this.cart.value;
    
    // Si el episodio no tiene `image_url`, se asigna una imagen por defecto
    const updatedEpisode = {
      ...episode,
      image_url: episode.image_url || 'https://cdn.forbes.com.mx/2023/08/Rick-and-Morty.webp'
    };
  
    this.cart.next([...currentCart, updatedEpisode]); // Agregar y actualizar
  }
  

  removeFromCart(id: number) {
    const updatedCart = this.cart.value.filter((ep) => ep.id !== id);
    this.cart.next(updatedCart);
  }

  clearCart() {
    console.log('Limpiando carrito...');
    this.cart.next([]); // Vaciar carrito y emitir cambio
    console.log('Carrito después de limpiar:', this.cart.value);
  }
}
