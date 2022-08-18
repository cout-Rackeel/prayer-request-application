import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable , tap , of , catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_URL = "http://localhost:3250/api/auth";
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
  })}

  constructor(private http : HttpClient) { }

  signUp(body:User) : Observable<User> | any {
    return this.http.post<User>(`${this.REST_API_URL}/signup`, body , this.HTTP_HEADER).pipe(
      tap(signedInMessage => console.log(`User successfully signed Up :- ${JSON.stringify(signedInMessage)}`)),
      catchError(err => throwError(() => err) )
    )
  }


  signIn(body:login) : Observable<any>{
    return this.http.post<any>(`${this.REST_API_URL}/signin` , body , this.HTTP_HEADER).pipe(
      tap(loggedInMessage => console.log(`User successfully logged In :- ${JSON.stringify(loggedInMessage)}`)),
      catchError(err => throwError(() => err))
    )
  }
}

