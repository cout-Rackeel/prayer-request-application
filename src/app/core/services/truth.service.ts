import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap , catchError, of, Observable} from 'rxjs';
import { Truth } from '../models/truth';

@Injectable({
  providedIn: 'root'
})
export class TruthService {

  private REST_API_URL = 'http://localhost:3250/api/truth';
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'withCredentials': 'true'
    })
  }

  constructor(private http : HttpClient) { }

  getAllTruth() : Observable<Truth[]>{
    return this.http.get<Truth[]>(this.REST_API_URL , this.HTTP_HEADER).pipe(
      tap( truth => console.log(`Truth obtained :- ${JSON.stringify(truth)}`)),

      catchError(err => of([]))
    )
  }
}
