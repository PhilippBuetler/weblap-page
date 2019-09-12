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
  toggleMenu() {
    return this.menu_active = !this.menu_active;
  }
}
