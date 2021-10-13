import { CurrencyPipe } from "@angular/common";
import { render } from 'creditcardpayments/creditCardPayments';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  VERSION,
  ViewChildren
} from "@angular/core";
import { CartService } from 'src/app/model/cart.service';
import { Prodect } from 'src/app/model/prodect';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  [x: string]: any;
  @ViewChildren("subTotalWrap") subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing") subTotalItems_existing!: QueryList<ElementRef>;

  constructor(private cartService: CartService, private currencyPipe: CurrencyPipe) { }
  prodects: Prodect[] = []
  qty: number = 0
  amt: number = 0
  ngOnInit(): void {
    this.cartService.loadCart();
    this.initConfig();
    this.prodects = this.cartService.getItems();
  }
  removeFromCart(item: Prodect) {
    this.cartService.removeItem(item);
    this.prodects = this.cartService.getItems();
  }
  changeSubtotal(item: Prodect, index: number) {
    item.qtyTotal != undefined && (this.qty = item.qtyTotal)
    item.price != undefined && (this.amt = item.price)
    const subTotal = this.amt * this.qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, "USD");
    this.subTotalItems.toArray()[index].nativeElement.innerHTML = subTotal_converted
    console.log(this.subTotalItems)
    this.cartService.saveCart();
  }
  get total() {
    if(this.prodects.length!=0)
    {
    return this.prodects.reduce(
      (sum: any, x: any) => ({
        qtyTotal: 1,
        price: sum.price + x.qtyTotal * x.price
      }),
      { qtyTotal: 1, price: 0 }
    ).price;}
    else{.0}
  }
  clearCart(prodects: Prodect[]) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(prodects);
    this.prodects = [...this.cartService.getItems()];
  }
  name = 'Angular';

  public payPalConfig?: IPayPalConfig;
  showSuccess?: boolean;

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: '',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
  
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${this.total}`,

                }
             
            }],

            
          
        
      },

      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
  }


}
