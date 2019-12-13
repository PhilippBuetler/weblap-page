import { Component, OnInit } from '@angular/core';
import { Spender } from '../_models/spender';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  currentUser: Spender;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  get hasTransactions() {
    return this.currentUser && this.currentUser.transactionId;
  }

}
