import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article } from '../_models/article';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  backendUrl: string = 'http://localhost:1234/';

  backendApi: string = this.backendUrl + 'frontpage';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBackendAPIPath(): string {
    return this.backendUrl;
  }

  async getArticle() {
    let articleList: Article[] = [];
    await fetch(this.backendApi).then((response) => {
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(articles => {
        articles.data.forEach((result) => {
          var entry = result.newArticle;
          articleList.push(new Article(entry.id, entry.title, entry.subtitle, entry.content, entry.imagepath));
        });
      });
    })
    return articleList;
  }

  addArticle(article: Article): Observable<Article>  {
    return this.http.post<Article>(this.backendApi, JSON.stringify(article), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.backendApi, JSON.stringify(article), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteArticle(articleId: string): Observable<string> {
    const url = `${this.backendApi}/${articleId}`;

    return this.http.delete<string>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted article id=${articleId}`)),
      catchError(this.handleError)
    );
  }

  postFile(fileToUpload: File): Observable<any>{
    const endpoint = `${this.backendApi}/file`;
    const formData: FormData = new FormData();
    formData.append('photo', fileToUpload);
    console.log(formData);
    return this.http.post(endpoint, formData).pipe(
      tap(data => { return data }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
