import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Prayer } from '../models';
import { ApiResponse } from '../models/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // private REST_API_URL = 'https://angular-church-backend.vercel.app/api/search/prayers';
  private REST_API_URL = "http://localhost:3250/api/auth/search/prayers";
  private HTTP_HEADER = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',

    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http : HttpClient) { }

  getSearchResult(key:string , query:string):Observable<ApiResponse<any>> {
   return this.http.post<ApiResponse<any>>(`${this.REST_API_URL}/${key}`,query,this.HTTP_HEADER).pipe(
    tap( (searchResults) => console.log(`Search Results ${searchResults.data?.['result']}`)),
    catchError(err => this.handleErrors(err))
   );
  }

}
