import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  popup_active: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  togglePopup() {
    return this.popup_active = !this.popup_active;
  }
}
