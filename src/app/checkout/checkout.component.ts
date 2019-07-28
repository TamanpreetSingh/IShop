import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { cartService } from 'app/_services/cart.service';
import { HttpClient } from '@angular/common/http';
import { product } from 'app/_models/product';
import { User } from 'app/_models/user';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkOutForm:FormGroup;
  products:product[];
  sum:number;
  i:number;
  currentUser: User;
  currentUserSubscription: Subscription;
  payment : String;
  submitted = false;
  quantity = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _cartService : cartService,private Http:HttpClient,private formBuilder: FormBuilder) {
      
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    if (this.authenticationService.currentUserValue == null) { 
      this.router.navigate(['/']); }
     }
     ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }
  ngOnInit() {
    this.checkOutForm = this.formBuilder.group({
      
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      pin: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      payment: this.payment,
      quantity:this.quantity
    });
    
     
    this.products=this._cartService.getAllProducts();
    this.sum=0;
    this.quantity=Number(this.checkOutForm.get('quantity').value)
        for(this.i=0;this.i<this.products.length;this.i++){
          this.sum=this.sum+(this.quantity*Number(this.products[this.i].price));
        }
  }
  get f() { return this.checkOutForm.controls; }
  onSubmit(){
    this.submitted = true;
    this.payment=this.checkOutForm.get('payment').value
    if (this.checkOutForm.invalid) {
      return;
  }
    if( this.payment== "credit"){
      this.router.navigate(['credit']);
    }
    else if( this.payment == "net"){
      this.router.navigate(['net']);
    }
    else if(this.payment == "COD"){
      alert("Your Order is Placed Successfully!")
      this.router.navigate(['/'])
    }
  }
  total(){
    this.quantity=Number(this.checkOutForm.get('quantity').value)
    for(this.i=0;this.i<this.products.length;this.i++){
      this.sum=(Number(this.quantity)*Number(this.products[this.i].price));
    }
  }

}
