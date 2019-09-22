import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu_active: boolean = false;
  title = 'weblap-page';
  constructor() { }

  public addArticle(): void {
    let articlePopup = document.getElementById('articlepopup');
    articlePopup.classList.add("is-active");
  }

  toggleMenu() {
    return this.menu_active = !this.menu_active;
  }
}
