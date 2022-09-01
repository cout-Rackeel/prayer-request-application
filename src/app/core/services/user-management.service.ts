import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap , catchError , of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private REST_API_URL = 'http://localhost:3250/api/users/'
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.REST_API_URL}`, this.HTTP_HEADER).pipe(
      tap(users => console.log(`users list : ${JSON.stringify(users)}`)),
      catchError(err => this.handleErrors(err))
      )
  }

  getUserById(id:string) : Observable<User>{
    return this.http.get<User>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap(user => console.log(`User selected : ${JSON.stringify(user)}`)),
      catchError(err => this.handleErrors(err))
      )
  }

  editUserById (id:string , body:User) : Observable<User> {
    return this.http.patch<User>(`${this.REST_API_URL}/${id}`, body , this.HTTP_HEADER).pipe(
      tap(editedUser => console.log(`Edited User :- ${JSON.stringify(editedUser)}`)),
      catchError(err => this.handleErrors(err))
    )
  }

  deleteUserByID(id:string) : Observable<User> {
    return this.http.delete<User>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedUser => console.log(`Deleted User :- ${JSON.stringify(deletedUser)}`)),
      catchError(err => this.handleErrors(err))
    )
  }



}
