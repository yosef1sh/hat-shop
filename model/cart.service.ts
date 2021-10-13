import { Injectable } from "@angular/core";
import { Prodect } from "./prodect";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor() {}

  items:Prodect[] = [];

  addToCart(addedItem:Prodect) {
    if (this.items.length==undefined) { this.items = [];
    }
    this.items.push(addedItem);
   this.saveCart();
    
  }

  getItems() {
    return this.items;
  } 

  loadCart(): void {
    
     this.items = JSON.parse(localStorage.getItem("cart_items")|| '{}') ;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items)||'{}'); 
  }

  clearCart(items:Prodect[]) {
    this.items = [];

    localStorage.removeItem("cart_items")
  }

  removeItem(item:Prodect) {
    const index = this.items.findIndex(o => o.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(item:Prodect): boolean {
    
   if (this.items.length==undefined) { this.items = [];
   }
    this.saveCart()
   return this.items.length>0 &&( this.items.findIndex(o => o.id === item.id) > -1)
  }
}
