import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllPurposeService {
  //* Getting DoctorDetails From Local Storage
  GetDocLocalData = localStorage.getItem('tdd');

  //* Converting That Data To JSON
  GetDocLocalDataPars = JSON.parse(this.GetDocLocalData!);

  //* Setting Converted Data To BehaviorSubject
  DoctorsDetailsSubject = new BehaviorSubject(this.GetDocLocalDataPars);
  constructor() {}
}
