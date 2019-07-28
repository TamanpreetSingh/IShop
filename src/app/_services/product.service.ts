import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from 'app/_models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products : Observable<product[]>;
  spin : boolean=true;
  product :product[]=[];
  userCart: product[]=[];
  userCart1: product[]=[];

  constructor() { }
  //searchProducts(start: string): Observable<any[]> {
    
    //return  this.db.collection('products' , ref =>ref.orderBy("name").startAt(start).endAt(start + "\uf8ff")).valueChanges();
   // return localStorage.getItem(this.products);

    //}
  //getProducts(): Observable<Product[]> {
  // this.spin = false;
  //  this.dataservice.spin.next(this.spin);
    
   //return this.db.collection('products' , ref =>ref.limit(6)).valueChanges();
   
    // return  this.db.collection('products').valueChanges();
    // return this.db.collection('products', ref => ref.where("category", '==', "electronics") ).valueChanges();

    //    }

  getCartProducts(): product[] {
    //this.dataservice.cartLength.next(this.userCart.length);
    // console.log(this.userCart.length);
  return this.userCart;
  }

  addToCart(id : number){
    //this.getProduct(id);
    //this.getProduct(id).subscribe( (data :Product[])=> {this.product = data
    ///console.log(this.product);
    //console.log(this.userCart.filter((product : Product) => product.id == id));
    //console.log(this.product[0]);

   //   if(this.userCart.filter((product : Product) => product.id === id).length==0)
     // {
       // this.userCart = this.userCart.concat(this.product[0]);
       // console.log(this.userCart);
         // }
      //else{
        //this.userCart1 = this.userCart.filter(product => product.id === id); 
        //this.product[0].quantity = this.userCart1[0].quantity += 1;
        //this.userCart = this.userCart.filter(product => product.id !== id); 
        //this.userCart = this.userCart.concat(this.product);

              
      //}
    //this.getCartProducts();
    
    //});
  }

  removeProduct(id: number){
    this.userCart = this.userCart.filter(product => product.id !== id); console.log(this.userCart)

  }

  //getCategoryProducts(category : string): Observable<any[]> {
          // return  this.db.collection('products').valueChanges();
         // return this.db.collection('products', ref => ref.where("category", '==', category) ).valueChanges();
      
    //          }

//  getProduct(id : number): Observable<Product[]> {

    //return this.db.collection('products', ref => ref.where('id', '==', id) ).valueChanges();
    // this.productDoc= this.db.doc('products/' + '2')
    // this.productDoc = this.db.doc('products/'+id);
    
    // this.product= this.productDoc.valueChanges();
    // console.log(this.productDoc);
    // return this.productDoc;
    
  //            }
}
