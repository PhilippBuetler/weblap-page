import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Spende } from 'src/app/_models/spende';
import { Article } from 'src/app/_models/article';
import { TransactionService } from 'src/app/_services/transaction.service';

@Component({
  selector: 'app-spenden-popup',
  templateUrl: './spenden-popup.component.html',
  styleUrls: ['./spenden-popup.component.css']
})
export class SpendenPopupComponent implements OnInit {
  @Output() notifyParent = new EventEmitter<string>();

  model = new Spende('', '', '', '','');

  constructor(private transactionService: TransactionService ) { }

  ngOnInit() {
  }

  toggleSpendenPopup() {
    let userPopup = document.getElementById('spendenpopup');
    userPopup.classList.toggle("is-active");
  }

  addDonationToDb() {
    alert("Jetzt (kommt) die Umleitung auf den externen Payment Servic!");
    this.transactionService
      .addTransaction(this.model)
      .subscribe(() => this.notifyParent.emit("done"));
  }

  setSpendenModel(articleToDonate: Article, userId: string) {
    this.model.projectName = articleToDonate.title;
    this.model.projectId = articleToDonate.id;
    this.model.spenderId = userId;
  }

}
