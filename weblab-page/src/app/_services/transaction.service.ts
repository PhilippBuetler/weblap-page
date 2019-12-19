import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Spende } from '../_models/spende';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  backendUrl: string = 'http://localhost:1234/';

  backendApi: string = this.backendUrl + 'transaction';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  async getTransactions() {
    let transactionList: Spende[] = [];
    await fetch(this.backendApi).then((response) => {
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(transactions => {
        transactions.data.forEach((result) => {
          console.log(result);
          var entry = result.newTransaction;
          transactionList.push(new Spende(entry.projectId, entry.projectName, entry.donation, entry.spenderId, entry.date));
        });
      });
    })
    return transactionList;
  }

  addTransaction(spende: Spende): Observable<Spende> {
    return this.http.post<Spende>(this.backendApi, JSON.stringify(spende), this.httpOptions).pipe(
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
