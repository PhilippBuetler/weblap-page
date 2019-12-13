import { Component } from '@angular/core';
import { Spender } from './_models/spender';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Role } from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu_active: boolean = false;
  title = 'weblap-page';
  currentUser: Spender;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public addArticle(): void {
    let articlePopup = document.getElementById('articlepopup');
    articlePopup.classList.add("is-active");
  }

  public addUser(): void {
    let userPopup = document.getElementById('userpopup');
    userPopup.classList.add("is-active");
  }

  public showLogin(): void {
    let loginPopup = document.getElementById('loginPopup');
    loginPopup.classList.add("is-active");
  }

  toggleMenu() {
    return this.menu_active = !this.menu_active;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
