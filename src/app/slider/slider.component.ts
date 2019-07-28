import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { product } from 'app/_models/product';
import { ProductService } from 'app/_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cartService } from 'app/_services/cart.service';
import { AuthenticationService } from 'app/_services/authentication.service';
import { User } from 'app/_models/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartState } from 'app/_models/CartState';
import { ComponentLoader } from 'angular-bootstrap-md/lib/utils/component-loader/component-loader.class';
let _filterproducts = JSON.parse(localStorage.getItem('filterproducts')) || [];
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  products: product[];
  spin:boolean=true;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  URL : string;
  loaded : boolean = true
  const :any;
  _allcproduct : any;
  _allfilterproducts : any;
  isVisible  : boolean=true;
  private subscription : Subscription;
  

  constructor(private authenticationService: AuthenticationService,private service:ProductService,private route : ActivatedRoute,private _cartService : cartService,private Http:HttpClient,private router:Router) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.isVisible=false;
  });
  //this.URL ='./assets/product.json';
  this.URL='./assets/books.json';
    // this.route.data.subscribe(
    //   data => this.products = data['allproducts']
    // );
    // console.log(this.products);
    


   
    
  }

  // addPost() {
  //   this.db.collection('products').add({'name': 'macbook'});
  // }

  ngOnInit():void {
    
          this._allcproduct=this._cartService.getAllProducts();
          if(this._allcproduct.length !=0){
          this.initproducts( _filterproducts);
          }else{
            this.Http.get(this.URL)
            .subscribe(data => {
              this.products = data as product[];
              this.isVisible=false;
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          });
          }
  }
 
  AddProduct(_product : product) {
    if (this.authenticationService.currentUserValue) {
    _product.added = true;
    _product.quantity=1;
    //_product.user_id = this.currentUser.id;
    _filterproducts = this.products.filter((_item) =>  _item.bookID != _product.bookID )
    localStorage.setItem('filterproducts', JSON.stringify(_filterproducts));
    this.products=_filterproducts
    this
        ._cartService
        .addProduct(_product);
        alert("Item Added to Cart! Check Cart")
    }else{
      alert("Sign In to Add Items")
    }
  }
  initproducts(_product : any){
    this.products=_product;

  }
  Buy(){
    if (this.authenticationService.currentUserValue) {
    this.router.navigate(['credit']);
    }else{
      alert("Sign In to Buy Item")
    }
  }
}
