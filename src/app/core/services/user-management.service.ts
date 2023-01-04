import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap , catchError , of } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private REST_API_URL = 'https://angular-church-backend.vercel.app/api/users'
  // private REST_API_URL = "http://localhost:3250/api/users";
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http : HttpClient) { }

  getAllUsers() : Observable<ApiResponse<User[]>>{
    return this.http.get<ApiResponse<User[]>>(`${this.REST_API_URL}`, this.HTTP_HEADER).pipe(
      tap(users => console.log(users.message)),
      catchError(err => this.handleErrors(err))
      )
  }

  getUserById(id:string) : Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap(user => console.log(user.message)),
      catchError(err => this.handleErrors(err))
      )
  }

  editUserById(id:string , body:Partial<User>) : Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.REST_API_URL}/${id}`, body , this.HTTP_HEADER).pipe(
      tap(editedUser => console.log(editedUser.message)),
      catchError(err => this.handleErrors(err))
    )
  }

  deleteUserById(id:string) : Observable<ApiResponse<User>> {
    return this.http.delete<ApiResponse<User[]>>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedUser => console.log(deletedUser.message)),
      catchError(err => this.handleErrors(err))
    )
  }

  changeUserPassword( id:string , password:string) : Observable<ApiResponse>{
    return this.http.patch<ApiResponse>(`${this.REST_API_URL}/${id}/changePassword` , password, this.HTTP_HEADER).pipe(
      tap((password) => console.log(password.message)),
      catchError(err => this.handleErrors(err))
    )
  }


}
