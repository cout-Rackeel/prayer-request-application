import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prayer } from '../models';
import { tap , catchError , of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PrayerService {

  private REST_API_URL = 'http://localhost:3250/api/prayers';
  private USER_REST_API_URL = 'http://localhost:3250/api/user/prayers'
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http: HttpClient) { }

  getAllPrayers(): Observable<Prayer[]>{
    return this.http.get<Prayer[]>(this.REST_API_URL, this.HTTP_HEADER).pipe(
      tap(prayers => console.log(`Prayers list : ${JSON.stringify(prayers)}`)),
      catchError(err => this.handleErrors(err))
      )

  }

  getUserPrayers(id:string) : Observable<Prayer[]>{
    return this.http.get<Prayer[]>(`${this.USER_REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap(prayers => console.log(`Prayers list : ${JSON.stringify(prayers)}`)),
      catchError(err => this.handleErrors(err))
      )
  }

  findPrayerRequest(id:string) : Observable<Prayer> {
    return this.http.get<Prayer>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap( selectedPrayer => console.log(`Selected prayer:- ${JSON.stringify(selectedPrayer)}`)),
      catchError(err => this.handleErrors(err))
    )
  }

  createPrayerRequest(body:Prayer) : Observable<Prayer> {
    return this.http.post<Prayer>(`${this.REST_API_URL}`,body ,this.HTTP_HEADER).pipe(
      tap(createdPrayer => console.log(`Created Prayer :- ${JSON.stringify(createdPrayer)}`)),
      catchError(err => of(new Prayer))
    )
  }

  editPrayerRequest(id:string , body:Prayer) : Observable<Prayer> {
    return this.http.patch<Prayer>(`${this.REST_API_URL}/${id}`, body , this.HTTP_HEADER).pipe(
      tap(editedPrayer => console.log(`Edited Prayer :- ${JSON.stringify(editedPrayer)}`)),
      catchError(err => this.handleErrors(err))
    )
  }

  deletePrayerRequest(id:string) : Observable<Prayer> {
    return this.http.delete<Prayer>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedPrayer => console.log(`Deleted Prayer :- ${JSON.stringify(deletedPrayer)}`)),
      catchError(err => this.handleErrors(err))
    )
  }

}
