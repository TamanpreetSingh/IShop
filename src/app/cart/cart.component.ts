import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { cartService } from 'app/_services/cart.service';
import { product } from 'app/_models/product';
import { CartState } from 'app/_models/CartState';
import { Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  show:boolean=false;
  hide:boolean=true;
  flag:boolean=false;
  products:product[];
  loaded : boolean = true
  private subscription : Subscription;
  URL:string;
  sum:number;
  i:number;
  counterValue = 1;
  minValue = 0;
  maxValue = 100;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,private _cartService : cartService,private Http:HttpClient) {
      this.URL ='./assets/product.json';
     }
     

  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      this.show=false;
      this.hide=true; }
      else{
      this.show=true;
      this.hide=false;
      }
      this.products=this._cartService.getAllProducts();
      if(this.products.length == 0){
        this.flag=true;
      }else{
        this.sum=0;
        for(this.i=0;this.i<this.products.length;this.i++){
          this.sum=this.sum+Number(this.products[this.i].price);
        }
      }
      //this.subscription = this._cartService.CartState
      //.subscribe((state : CartState) => {
        //  this.products = state.products;
          //console.log(this.products);
      //});
    //if(this._cartState){
      //this._products=this._cartService.getAllProducts();
    //}
    
  }
  //ngOnDestroy() {
    //this.subscription.unsubscribe();
//}

AddProduct(_product : product) {
  _product.added = true;
  
  this
      ._cartService
      .addProduct(_product);
      
}
  removeProduct(_product : product){
    this._cartService.removeProduct(_product.bookID);
    location.reload();
  }
  signin(){ 
    this.router.navigate(['signin']); 
  }
  addQuantity(_product:product,_quantity:any){
    this._cartService.addQuantity(_product,Number(_quantity));
  }
  increase(_product:product,_quantity:any) {
    this.counterValue++;
    this._cartService.addQuantity(_product,Number(this.counterValue));
    
  }

  decrease(_product:product,_quantity:any) {
    if(this.counterValue<2){
      return
    }
    this.counterValue--;
    this._cartService.addQuantity(_product,Number(this.counterValue));
    
  }
}
