import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartState } from 'app/_models/CartState';
import { product } from 'app/_models/product';

const url = './assets/product.json'

let _products = JSON.parse(localStorage.getItem('products')) || [];
let _productsWithQuantity = JSON.parse(localStorage.getItem('productsWithQuantity')) || [];
let _filterproducts = JSON.parse(localStorage.getItem('filterproducts')) || [];

@Injectable({
  providedIn: 'root'
})
export class cartService {
  constructor(private httpclient : HttpClient) {}
  _removedProduct : product
  private cartSubject = new Subject<CartState>();
    products : product[]=[];
    id: any;
    CartState = this.cartSubject.asObservable();
    addProduct(_product:any) {
      console.log('in service');
      _products.push(_product);
      this.id=_product.id;
      localStorage.setItem('products', JSON.stringify(_products));
      //_filterproducts = _products
      //localStorage.setItem('filterproducts', JSON.stringify(_filterproducts));
      this.cartSubject.next(<CartState>{loaded: true, products:  this.products,id: this.id });
    }
    removeProduct(id:number) {
      this._removedProduct=_products.filter((_item) =>  _item.bookID == id )
      _filterproducts.push(this._removedProduct[0])
      localStorage.setItem('filterproducts', JSON.stringify(_filterproducts));
      _products = _products.filter((_item) =>  _item.bookID !== id )
      localStorage.setItem('products', JSON.stringify(_products));
      //_filterproducts = _filterproducts.filter((_item) =>  _item.id !== id )
      this.cartSubject.next(<CartState>{loaded: false , products:  this.products});
    }

    addQuantity(_product:any , _quantity:any){
      _product.quantity=_quantity;
      _productsWithQuantity.push(_product);
      localStorage.setItem('productsWithQuantity', JSON.stringify(_productsWithQuantity));
    }

  getAllProducts():any{
   return _products;
 }
 getAllProductsWithQuantity():any{
  return _productsWithQuantity;
}

}