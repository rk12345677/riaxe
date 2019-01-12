import { Component, Input, OnInit, Renderer2 } from '@angular/core';

import { MySharedService } from '../shared.service';

@Component({
  selector: 'product-list-component',
  templateUrl: './product.component.html'
})
export class ProductListComponent implements OnInit {

  @Input() products: any = [];
  private singleProduct;
  private isAdded;

  constructor(
    private renderer: Renderer2,
    private mySharedService: MySharedService
  ) { }

  ngOnInit() {

    this.isAdded = new Array(this.products.length);
    this.isAdded.fill(false, 0, this.products.length);
    console.log('this.isAdded -> ', this.isAdded, this.products);

    this.mySharedService.getProducts().subscribe(data => {

      if (data && data.length > 0) {

      } else {
        this.products.map((item, index) => {
          this.isAdded[index] = false;
        });
      }

    });
  }

  
  // Add item in cart on Button click
  // ===============================

  addToCart(event, productId) {
    
    // If Item is already added then display alert message
    if (event.target.classList.contains('btn-success')) {
      alert('This product is already added into cart.');
      return false;
    }

    // Change button color to green
    this.products.map((item, index) => {
      if (item.id === productId) {
        this.isAdded[index] = true;
      }
    })

    this.singleProduct = this.products.filter(product => {
      return product.id === productId;
    });

    // this.cartItems.push(this.singleProduct[0]);

    this.mySharedService.addProductToCart(this.singleProduct[0]);
  }

}