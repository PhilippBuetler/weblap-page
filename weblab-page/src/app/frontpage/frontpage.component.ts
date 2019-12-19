import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Spender } from '../_models/spender';
import { Role } from '../_models/role';
import { Article } from '../_models/article';
import { CommunicationService } from '../_services/communication.service';
import { AddArticleComponent } from './add-article/add-article.component';
import { SpendenPopupComponent } from './spenden-popup/spenden-popup.component';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  @ViewChild(AddArticleComponent, { static: false }) child: AddArticleComponent;
  @ViewChild(SpendenPopupComponent, { static: false }) child2: SpendenPopupComponent;

  constructor(private communicationService: CommunicationService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public articles: Article[] = [];
  currentUser: Spender;
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

  eventFromChild(data) {
    this.child.togglePopup();
    this.getArticle().then((response) => {
      this.articles = response;
    });
  }

  eventFromChild2(data) {
    this.child2.toggleSpendenPopup();
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(":)");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.getArticle().then((response) => {
      this.articles = response;
    });
  }

  updateArticle(articleToUpdate: Article): void {
    this.child.setModel(articleToUpdate);
    this.child.togglePopup();
  }

  spenden(project: Article): void {
    this.child2.setSpendenModel(project, this.currentUser.id);
    this.child2.toggleSpendenPopup();
  }
}
