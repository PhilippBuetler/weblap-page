import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Spende } from 'src/app/_models/spende';
import { Article } from 'src/app/_models/article';

@Component({
  selector: 'app-spenden-popup',
  templateUrl: './spenden-popup.component.html',
  styleUrls: ['./spenden-popup.component.css']
})
export class SpendenPopupComponent implements OnInit {
  @Output() notifyParent = new EventEmitter<string>();

  model = new Spende('', '', '', '');

  constructor() { }

  ngOnInit() {
  }

  toggleSpendenPopup() {
    let userPopup = document.getElementById('spendenpopup');
    userPopup.classList.toggle("is-active");
  }

  setSpendenModel(articleToDonate: Article) {
    this.model.projectName = articleToDonate.title;
    this.model.projectId = articleToDonate.id;
  }

}
