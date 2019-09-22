import { Component, OnInit } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  backendApi: string = 'http://localhost:1234/frontpage';

  constructor() {
  }

  public articles: Article[] = [];
  title: string;
  subtitle: string;
  content: string;

  ngOnInit() {
    //this.getArticle().then(this.displayArticles);

    this.getArticle().then((data) => {
      console.log(data);
      data.forEach((result) => {
        var entry = result.newArticle;
        this.articles.push(new Article(entry.title, entry.subtitle, entry.content));
      });
    });
  }

  async getArticle() {
    let response = await fetch(this.backendApi);
    console.log(response);
    return await response.json();
  }

  displayArticles(results)  {
    console.log(results);
    results.forEach((result) =>{
      console.log(result.newArticle.title);
      this.title = result.newArticle.title;
   });
  }
}
