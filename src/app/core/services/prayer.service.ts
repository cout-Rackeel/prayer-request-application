import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prayer } from '../models';
import { tap , catchError , of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PrayerService {

  private REST_API_URL = 'http://localhost:3250/api/prayers';
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllPrayers(): Observable<Prayer[]>{
    return this.http.get<Prayer[]>(this.REST_API_URL,this.HTTP_HEADER).pipe(
      tap(prayers => console.log(`Prayers list : ${JSON.stringify(prayers)}`)),
      catchError(err => of([]))
      )

  }

  findPrayerRequest(id:string) : Observable<Prayer> {
    return this.http.get<Prayer>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      tap( selectedPrayer => console.log(`Selected prayer:- ${JSON.stringify(selectedPrayer)}`)),
      catchError(err => of(new Prayer))
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
      catchError(err => of(new Prayer))
    )
  }

  deletePrayerRequest(id:string) : Observable<Prayer> {
    return this.http.delete<Prayer>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      tap(deletedPrayer => console.log(`Deleted Prayer :- ${JSON.stringify(deletedPrayer)}`)),
      catchError(err => of(new Prayer))
    )
  }

}
