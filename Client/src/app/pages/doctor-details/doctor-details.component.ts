import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AllPurposeService } from 'src/services/allpurpose.service';
import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent implements OnInit, OnDestroy {
  DoctorName: any;
  PageTitle = 'MedImpact | ';
  DoctorDetails: any;
  DoctorDetailsLocalStorage: any;

  constructor(
    private _titleService: Title,
    private _ActivatedRouteService: ActivatedRoute,
    private _AllPurposeService: AllPurposeService,
    private _Service: Service,
    private _ModalService: ModalService,
    private _RouterService: Router,
    private _AuthService: AuthService
  ) {}

  ngOnInit() {
    //* Getting Doctor Name From Route Params
    this.DoctorName = this._ActivatedRouteService.snapshot.params;

    //* Setting Doctor Name In Page Title Dynamically
    this._titleService.setTitle(
      this.PageTitle + `${this.DoctorName.full_name}`
    );
    //* Getting Doctor Details From Subject
    this._AllPurposeService.DoctorsDetailsSubject.subscribe(
      async (data: any) => {
        this.DoctorDetails = data;
      }
    );
    //* Setting Doctor Details From Subject In LocalStorage To Keep Data On Page Load
    this.DoctorDetailsLocalStorage = localStorage.setItem(
      'tdd',
      JSON.stringify(this.DoctorDetails)
    );
  }

  BookAppointment(Data: any) {
    //* Auth Token Initialization
    let IsAuthenticated: boolean = this._AuthService.GetLocalLoginValue();
    //* Checking Before Booking Appointment User IsAuthenticated Or Not
    if (!IsAuthenticated) {
      this._ModalService.OpenAlertDialog('Not_Authenticated');
    } else {
      console.log(Data);
      this._ModalService.OpenDialog();
    }
  }

  ngOnDestroy(): void {
    //* Unsubscribing DoctorsDetailsSubject OnDestroy
    this._AllPurposeService.DoctorsDetailsSubject.unsubscribe;
    localStorage.removeItem('tdd');
  }
}
