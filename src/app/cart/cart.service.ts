import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Setting up are api
  private apiUrl = environment.apiUrl + "/cart"

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) { }

  // Add a product to the shopping cart
  // Takes a Product parameter and returns an Observable of type Product
  addToCart(product: Product): Observable<Product> {
    // Use HttpClient to send a POST request to the API
    // The API URL is specified in the service
    // The product data is included in the request body
    return this.http.post<Product>(this.apiUrl, product);
  }

   // Retrieve cart items from the API
  // Returns an Observable of an array of type Product
  getCartItems(): Observable<Product[]> {
    // Use HttpClient to send a GET request to the API
    // The API URL is specified in the service
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Clear the items in the shopping cart
  // Returns an Observable of type void
  clearCart(): Observable<void> {
    // Use HttpClient to send a DELETE request to the API
    // The API URL is specified in the service
    return this.http.delete<void>(this.apiUrl);
  }

  ngOnInit(): void {
  }
  
}
