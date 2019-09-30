import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Role } from '../_models/role';
import { Article } from '../_models/article';
import { CommunicationService } from '../_services/communication.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  constructor(private communicationService: CommunicationService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public articles: Article[] = [];
  currentUser: User;
  title: string;
  subtitle: string;
  content: string;

  ngOnInit() {
    this.getArticle().then((response) => {
      this.articles = response;
    });
  }

  async getArticle() {
    return this.communicationService.getArticle();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  deleteArticle(id: string): void {
    this.communicationService.deleteArticle(id).subscribe(() => {
      this.getArticle().then((response) => {
        this.articles = response;
      });
    });
  }
}
