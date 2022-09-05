import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap , catchError , of } from 'rxjs';
import { Role } from '../models/roles';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private REST_API_URL = 'http://localhost:3250/api/roles';

  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.REST_API_URL, this.HTTP_HEADER).pipe(
      tap(roles => console.log(`Roles list : ${JSON.stringify(roles)}`)),
      catchError(err => this.handleErrors(err))
      )
  }

  getRoleById(id:string) : Observable<Role>{
    return this.http.get<Role>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap(role => console.log(`Role selected : ${JSON.stringify(role)}`)),
      catchError(err => this.handleErrors(err))
      )
  }

  deleteRoleById(id:string) : Observable<Role> {
    return this.http.delete<Role>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedRole => console.log(`Deleted Role :- ${JSON.stringify(deletedRole)}`)),
      catchError(err => this.handleErrors(err))
    )
  }



}
