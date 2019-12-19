import { Component, OnInit } from '@angular/core';
import { Spender } from '../_models/spender';
import { Spende } from '../_models/spende';
import { AuthenticationService } from '../_services/authentication.service';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  currentUser: Spender;
  public Spenden: Spende[] = [];

  constructor(private transactionService: TransactionService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log("called");
    this.getDonations().then((response) => {
      console.log(response);
      this.Spenden = response;
    });
  }

  async getDonations() {
    return this.transactionService.getTransactions();
  }

  get hasTransactions() {
    console.log(this.currentUser);
    return this.currentUser && this.currentUser.transactionId;
  }
}
