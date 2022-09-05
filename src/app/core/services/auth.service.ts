import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable , tap , of , catchError, throwError } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_URL = "http://localhost:3250/api/auth";
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'withCredentials': 'true'
    })
  }

  constructor(private http : HttpClient) { }

  signUp(body:Partial<User>) : Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.REST_API_URL}/signup`, body , this.HTTP_HEADER).pipe(
      tap(signedInMessage => console.log(`User successfully signed Up :- ${JSON.stringify(signedInMessage)}`)),
      catchError(err => throwError(() =>  err  ))
    )
  }


  signIn(body:Partial<User>) : Observable<Partial<User>>{
    return this.http.post<Partial<User>>(`${this.REST_API_URL}/signin` , body , this.HTTP_HEADER).pipe(
      tap(loggedInMessage => console.log(`User successfully logged In :- ${JSON.stringify(loggedInMessage)}`)),
      catchError(err => throwError(() =>  err ))
    )
  }
}

