import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/_services/authentication.service';
import { User } from 'app/_models/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-payment',
  templateUrl: './credit-payment.component.html',
  styleUrls: ['./credit-payment.component.scss']
})
export class CreditPaymentComponent implements OnInit {
  creditCardForm:FormGroup;
  submitted = false;
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService, private router: Router) { 
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
    this.creditCardForm = this.formBuilder.group({
      
      number: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }
  get f() { return this.creditCardForm.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.creditCardForm.invalid) {
      return;
  }
    alert("Your Order is Placed Successfully!")
    this.router.navigate(['/']);
  }

}
