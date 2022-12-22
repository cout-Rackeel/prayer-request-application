import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prayer } from '../models';
import { tap , catchError , of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { User } from '../models/user';
import { ApiResponse } from '../models/apiResponse';


@Injectable({
  providedIn: 'root'
})

export class PrayerService {

  private REST_API_URL = 'https://angular-church-backend.vercel.app/api/prayers';
  private USER_REST_API_URL = 'https://angular-church-backend.vercel.app/api/user'
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  private handleErrors(err: HttpErrorResponse): Observable<any> {
    return of(console.log(err));
  }

  constructor(private http: HttpClient, private storageService : SessionStorageService) { }
  user: Partial<User> = this.storageService.getUser();
  loggedIn : boolean = this.storageService.isLoggedIn();

  getAllPrayers(): Observable<ApiResponse<Prayer[]>>{
    return this.http.get<ApiResponse<Prayer[]>>(this.REST_API_URL, this.HTTP_HEADER).pipe(
      tap((prayers : ApiResponse<Prayer[]>) => {
        let prayersArr : Prayer[] =  (prayers.data?.['prayers']) as Prayer[]
        if(this.loggedIn){
          prayersArr.forEach((prayer: Prayer) =>{
          prayer.commitedToPray.forEach((user) => {
            if(user._id == this.user._id){
              prayer.status = true;
            }
          })
        })
        }

      }),
      catchError(err => this.handleErrors(err))
      )
  }

  getUserPrayers(id:string) : Observable<ApiResponse<Prayer[]>>{
    return this.http.get<ApiResponse<Prayer[]>>(`${this.USER_REST_API_URL}/${id}/prayers`, this.HTTP_HEADER).pipe(
      catchError(err => this.handleErrors(err))
      )
  }

  findPrayerRequest(id:string) : Observable<ApiResponse<Prayer>>{
    return this.http.get<ApiResponse<Prayer>>(`${this.REST_API_URL}/${id}`, this.HTTP_HEADER).pipe(
      catchError(err => this.handleErrors(err))
    )
  }

  createPrayerRequest(body:Prayer): Observable<ApiResponse<Prayer>> {
    return this.http.post<ApiResponse<Prayer>>(`${this.REST_API_URL}`,body ,this.HTTP_HEADER).pipe(
      catchError(err => this.handleErrors(err))
    )
  }

  editPrayerRequest(id:string , body:Prayer) : Observable<ApiResponse<Prayer>> {
    return this.http.patch<ApiResponse<Prayer>>(`${this.REST_API_URL}/${id}`, body , this.HTTP_HEADER).pipe(
      catchError(err => this.handleErrors(err))
    )
  }

  deletePrayerRequest(id:string) : Observable<ApiResponse<Prayer>> {
    return this.http.delete<ApiResponse<Prayer>>(`${this.REST_API_URL}/${id}` , this.HTTP_HEADER).pipe(
      catchError(err => this.handleErrors(err))
    )
  }

}
