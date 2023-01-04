import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap , catchError , of } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { Role } from '../models/roles';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private REST_API_URL = 'https://angular-church-backend.vercel.app/api/roles';
  // private REST_API_URL = "http://localhost:3250/api/roles";


  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<ApiResponse<Role[]>>{
    return this.http.get<ApiResponse<Role[]>>(this.REST_API_URL, this.HTTP_HEADER).pipe(
      tap(roles => console.log(roles.message)),
      catchError(err => this.handleErrors(err))
      )
  }

  getRoleById(id:string) : Observable<ApiResponse<Role>>{
    return this.http.get<ApiResponse<Role>>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap(role => console.log(role.message)),
      catchError(err => this.handleErrors(err))
      )
  }

  deleteRoleById(id:string) : Observable<ApiResponse<Role>> {
    return this.http.delete<ApiResponse<Role>>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedRole => console.log(deletedRole.message)),
      catchError(err => this.handleErrors(err))
    )
  }



}
