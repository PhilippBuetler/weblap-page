import { Component, OnInit } from '@angular/core';
import { Article } from './article';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  constructor(private communicationService: CommunicationService) {
  }

  public articles: Article[] = [];
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
}
