import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];
  totalPrice: Subject<number>;
  totalQuantity: Subject<number>;

  constructor() {
    let sessionCartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    if (sessionCartItems === null) {
      this.cartItems = [];
      this.totalPrice = new BehaviorSubject<number>(0);
      this.totalQuantity = new BehaviorSubject<number>(0);
    } else {
      this.cartItems = sessionCartItems;
      this.totalPrice = new BehaviorSubject<number>(this.computeCartTotalPrice(this.cartItems));
      this.totalQuantity = new BehaviorSubject<number>(this.computeCartTotalQuantity(this.cartItems));
    }
  }

  addToCart(theCartItem: CartItem) {
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    }

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.updateCartTotals();
  }

  updateCartTotals() {

    let totalPriceValue: number = this.computeCartTotalPrice(this.cartItems);
    let totalQuantityValue: number = this.computeCartTotalQuantity(this.cartItems);

    // publish the new values to all subscribers.
    // every subscriber will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
    this.persistCartItems();
  }

  computeCartTotalPrice(cartItems: CartItem[]) : number {
     return cartItems.map(a => a.unitPrice * a.quantity).reduce((a,b) => a + b);
  }

  computeCartTotalQuantity(cartItems: CartItem[]) : number {
    return cartItems.map(a => a.quantity).reduce((a,b) => a + b);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}`
      +`unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);

    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('---');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.updateCartTotals();
    }
  }

  remove(theCartItem: CartItem) {

    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.updateCartTotals();
    }
  }

  persistCartItems(){
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
