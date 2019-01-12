import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../shared.service';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html'

})
export class CartComponent implements OnInit {

  private cartItems;
  private totalAmmount;

  constructor(
    private mySharedService: MySharedService
  ) { }

  ngOnInit() {

    this.mySharedService.getProducts().subscribe(data => {
      this.cartItems = data;

      this.totalAmmount = this.mySharedService.getTotalPrice();
    });

  }

  // Remove item from cart list
  removeItemFromCart(productId) {
    /* this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.mySharedService.setProducts(this.cartItems); */

    this.mySharedService.removeProductFromCart(productId);

  }

  emptyCart() {
    this.mySharedService.emptryCart();
  }

}