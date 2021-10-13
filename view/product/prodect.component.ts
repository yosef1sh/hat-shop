import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/model/cart.service';
import { Prodect } from '../../model/prodect';

@Component({
  selector: 'app-prodect',
  templateUrl: './prodect.component.html',
  styleUrls: ['./prodect.component.css']
})
export class ProdectComponent implements OnInit {
  

  constructor( private cartService: CartService) { }
  cart:Prodect[]=[]
  @Input() prodee:Prodect={}
  ngOnInit(): void {
    console.log("hiii")
  }
  
  addToCart(item:Prodect) {

    if (!this.cartService.itemInCart(item)) {
      item.qtyTotal = 1;
    }
      this.cartService.addToCart(item);
      this.cartService.loadCart()
    }
  }



