import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.intrceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { RegisterComponent } from './register/register.component';
import { SliderComponent } from './slider/slider.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditPaymentComponent } from './credit-payment/credit-payment.component';
import { NetbankingComponent } from './netbanking/netbanking.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    SignInComponent,
    RegisterComponent,
    SliderComponent,
    MyaccountComponent,
    CheckoutComponent,
    CreditPaymentComponent,
    NetbankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
