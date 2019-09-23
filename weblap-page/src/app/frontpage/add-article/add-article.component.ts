import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  private backendApi = 'http://localhost:1234/frontpage';
  popup_active: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  model = new Article('', '', '');

  ngOnInit() {
  }

  onSubmit() {
    this.addArticle(this.model).subscribe(article => {
      alert('fuck');
      console.log('added' + article);
    });
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.backendApi, article, this.httpOptions);
  }

  togglePopup() {
    return this.popup_active = !this.popup_active;
  }
}
