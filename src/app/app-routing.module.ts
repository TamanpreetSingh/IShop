import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreditPaymentComponent } from './credit-payment/credit-payment.component';
import { NetbankingComponent } from './netbanking/netbanking.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
},
{
    path: 'cart',
    component: CartComponent
},
{
    path: 'signin',
    component: SignInComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'myaccount',
  component: MyaccountComponent
},
{
  path: 'checkout',
  component: CheckoutComponent
},
{
  path: 'credit',
  component: CreditPaymentComponent
},
{
  path: 'net',
  component: NetbankingComponent
},
{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
