import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { Subscription } from 'rxjs';
import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { product } from './_models/product';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    cart : product[];
    URL : string;
  title = 'IShop';
  constructor(private authenticationService: AuthenticationService,
    private userService: UserService, private route: ActivatedRoute,
    private router: Router,private Http : HttpClient) { 
      this.URL ='./assets/books.json';
      }
    
      
  ngOnInit() {
    if (this.authenticationService.currentUserValue) { 
      (document.querySelector(".profile") as HTMLElement).style.display="block";
      (document.querySelector(".login") as HTMLElement).style.display="none"
    }
    this.Http.get(this.URL)
            .subscribe(data => {
              this.cart = data as product[];
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          });
  }
logOut(){
  this.authenticationService.logout();
}

}
