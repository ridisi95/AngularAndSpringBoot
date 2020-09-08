import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number;
  totalQuantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );


    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  incrementQuantity(theCartItem: CartItem) {
    console.log("this.totalPrice: " + this.totalPrice);
    console.log("this.cartService.totalPrice: " + this.cartService.totalPrice);
    console.log("this.totalPrice: " + this.totalQuantity);
    console.log("this.cartService.totalPrice: " + this.cartService.totalQuantity);
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem)
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

}
