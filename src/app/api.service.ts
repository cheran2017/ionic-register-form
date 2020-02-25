import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AddUser } from './add-user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://www.wagontechnologies.org/adcnews.php';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) { 

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("=======> I am from API Service===========>",error); // log to console instead
      return of(result as T);
    };
  }

  addUser(adduser: AddUser): Observable<AddUser> {
    return this.http.post<AddUser>(apiUrl, adduser, httpOptions).pipe(
      tap((res: AddUser) => console.log(res)),
      catchError(this.handleError<AddUser>('addUser'))
    );
  }
}
