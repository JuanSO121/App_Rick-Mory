import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
  standalone: false,
})
export class Tab6Page implements OnInit {
  favorites: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }
  

  removeFromFavorites(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearFavorites() {
    this.cartService.clearCart();
  }
}
