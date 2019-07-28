import { Component, OnInit } from '@angular/core';
import { User } from 'app/_models/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/_services/authentication.service';
import { UserService } from 'app/_services/user.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,private authenticationService: AuthenticationService,
    private userService: UserService) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    }); 
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}

deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
    this.logOut();
    window.location.href='http://localhost:4200/home'; 
    this.router.navigate(['/']);
  });
}
logOut(){
  this.authenticationService.logout();
}
}
