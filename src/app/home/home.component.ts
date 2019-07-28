import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/_models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/_services/authentication.service';
import { UserService } from 'app/_services/user.service';
import { first } from 'rxjs/operators';
import { cartService } from 'app/_services/cart.service';
import { product } from 'app/_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input()product : product;
  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    show:boolean=false;
    hide:boolean=true;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,private _cartService : cartService) { 
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
    }
    

  ngOnInit() {
    //this.loadAllUsers();
    if (this.authenticationService.currentUserValue) { 
      this.show=false;
      this.hide=true; }
    else{
      this.show=true;
      this.hide=false;
      }
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}
AddProduct(_product : product) {
  _product.added = true;
  _product.user_id = this.currentUser.id;
  this
      ._cartService
      .addProduct(_product);
}

deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
        this.loadAllUsers()
    });
}
logOut(){
  this.authenticationService.logout();
}
private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;
    });
  }

}
