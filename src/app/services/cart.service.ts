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
    console.log('Antes de agregar:', this.cart.value); // Depuración
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, episode]); // Agregar y actualizar
    console.log('Después de agregar:', this.cart.value); // Depuración
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
