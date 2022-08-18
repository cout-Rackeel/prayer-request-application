import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogLinkService {

  constructor() { }

  // Define behavioralSubject
  private _editSwitch = new BehaviorSubject<boolean>(false)

 // Set retrievedVal as observable
 private _editSwitch$ = this._editSwitch.asObservable();

  getEditSwitchVal() : Observable<boolean> {
    return this._editSwitch$;
  }

  setEditSwitchVal(latestVal: boolean){
    return this._editSwitch.next(latestVal);
  }



}
