import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  // Array to store cart items
  cartItems: Product[] = [];

  // Inject the CartService into the constructor
  constructor(private cartService: CartService) { }

  // Lifecycle hook: ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Call the getCartItems method from the CartService
    // Subscribe to the observable to receive the data asynchronously
    this.cartService.getCartItems().subscribe(data => {
      // Set the cartItems array to the data received from the service
      this.cartItems = data;
      console.log(this.cartItems)
    });
  }
}
