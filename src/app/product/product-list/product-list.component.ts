import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  filteredProducts: Product[] = []
  sortOrder: string = ""

  constructor(private productService: ProductService, private cartService: CartService, private snackbar: MatSnackBar) {

  }

  // When the component loads
  ngOnInit(): void {
    // Call the get then subscribe to it then assign the value to our property
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      console.log(this.products)
    })
  }
  // Function to add a product to the shopping cart
  addToCart(product: Product): void {
    // Call the addToCart method from the cartService
    this.cartService.addToCart(product).subscribe({
      // When the call is successful
      next: () => {
        // Display a snackbar notification for successful addition to the cart
        this.snackbar.open("Product added to cart!", "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  // Function to apply a filter based on user input
  applyFilter(event: Event): void {
    // Retrieve the search term from the input element
    let searchTerm = (event.target as HTMLInputElement).value;
    // Convert the search term to lowercase for case-insensitive comparison
    searchTerm = searchTerm.toLowerCase();

    // Filter products based on the search term
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );

    // Sort the filtered products based on the current sort order
    this.sortProducts(this.sortOrder);
  }

  // Function to sort products based on the specified sort order
  sortProducts(sortValue: string): void {
    // Update the sort order
    this.sortOrder = sortValue;

    // Perform sorting based on the selected sort order
    if (this.sortOrder === "priceLowHigh") {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === "priceHighLow") {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

}
