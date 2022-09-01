import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Prayer } from '../models';
import { SearchQuery } from '../models/search-query';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class PrayerSearchService {

  private REST_API_URL = 'http://localhost:3250/api/search/prayers';
  private HTTP_HEADER = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http : HttpClient) { }

  getSearchResult(body:SearchQuery<any>):Observable<any> {
   return this.http.post<any>(this.REST_API_URL,body,this.HTTP_HEADER).pipe(
    tap( (searchResults:any) => console.log(`Search Results ${JSON.stringify(searchResults)}`)),
    catchError(err => this.handleErrors(err))
   );
  }

}
