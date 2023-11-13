import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductService){

  }

  // When the component loads
  ngOnInit(): void {
    // Call the get then subscribe to it then assign the value to our property
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products)
    })
  }
}
