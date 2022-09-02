import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Prayer } from '../models';
import { SearchQuery } from '../models/search-query';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private REST_API_URL = 'http://localhost:3250/api/search';
  private HTTP_HEADER = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers':'Content-Type, X-Auth-Token, Origin, Authorization'

    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http : HttpClient) { }

  getSearchResult(key:string , query:string):Observable<any> {
   return this.http.post<any>(`${this.REST_API_URL}/prayers/${key}`,query,this.HTTP_HEADER).pipe(
    tap( (searchResults:any) => console.log(`Search Results ${JSON.stringify(searchResults)}`)),
    catchError(err => this.handleErrors(err))
   );
  }

}
