import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable , tap , of , catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import {ApiResponse} from '../models/apiResponse'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private REST_API_URL = "https://angular-church-backend.vercel.app/api/auth";
  private REST_API_URL = "http://localhost:3250/api/auth";
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'withCredentials': 'true'
    })
  }

  constructor(private http : HttpClient) { }

  signUp(body:Partial<User>) : Observable<ApiResponse<Partial<User>>> {
    return this.http.post<ApiResponse<User>>(`${this.REST_API_URL}/signup`, body , this.HTTP_HEADER).pipe(
      tap((signedInMessage:ApiResponse<Partial<User>>) => console.log(signedInMessage.message)),
      catchError(err => throwError(() =>  err  ))
    )
  }

  signIn(body:Partial<User>) : Observable<ApiResponse>{
    return this.http.post<ApiResponse<User>>(`${this.REST_API_URL}/signin` , body , this.HTTP_HEADER).pipe(
      tap((loggedInMessage: ApiResponse) => console.log(loggedInMessage.message)),
      catchError(err => throwError(() =>  err ))
    )
  }
}

