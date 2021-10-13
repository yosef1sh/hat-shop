
import { Component, Output, OnInit, NgZone } from '@angular/core';

import { map } from 'rxjs/operators';
import { CartService } from 'src/app/model/cart.service';
import { Prodect } from '../../model/prodect';
import { ProdectService } from '../../model/prodect.service';

@Component({
  selector: 'app-prodects',
  templateUrl: './prodects.component.html',
  styleUrls: ['./prodects.component.css']
})
export class ProdectsComponent implements OnInit{

   public prodectts:Prodect[]=[] ;
  constructor(private _ProdectService:ProdectService,private cartService: CartService,public ngZone: NgZone) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }
    retrieveTutorials(): void {
      this._ProdectService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.prodectts = data;
      });
  }

}

