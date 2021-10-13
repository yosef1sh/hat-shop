
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Prodect } from './prodect';


@Injectable({
  providedIn: 'root'
})
export class ProdectService{

  private dbPath = '/products';

  ProdectsRef: AngularFireList<Prodect>;

  constructor(private db: AngularFireDatabase) {
    this.ProdectsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Prodect> {
    return this.ProdectsRef;
  }

  create(Prodect: Prodect): any {
    return this.ProdectsRef.push(Prodect);
  }

  update(key: string, value: any): Promise<void> {
    return this.ProdectsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.ProdectsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.ProdectsRef.remove();
  }
}

