import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap , catchError, of, Observable} from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { Truth } from '../models/truth';

@Injectable({
  providedIn: 'root'
})
export class TruthService {

  // private REST_API_URL = 'https://angular-church-backend.vercel.app/api/truth';
  private REST_API_URL = "http://localhost:3250/api/truth";
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    })
  }

  constructor(private http : HttpClient) { }

  getAllTruth() : Observable<ApiResponse<Truth[]>>{
    return this.http.get<ApiResponse<Truth[]>>(this.REST_API_URL , this.HTTP_HEADER).pipe(
      tap(truth => console.log(truth.message) ),

      catchError(err => of())
    )
  }
}
