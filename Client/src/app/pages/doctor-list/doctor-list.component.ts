import { Component, OnInit } from '@angular/core';
import { Service } from 'src/services/service.service';
import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AllPurposeService } from 'src/services/allpurpose.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  PageTitle = 'MedImpact | Doctor Lists';
  DocArray: any;
  PatientData: any;
  Loading: boolean = false;

  constructor(
    private _Service: Service,
    private _AuthService: AuthService,
    private _ModalService: ModalService,
    private _RouterService: Router,
    private _titleService: Title,
    private _AllPurposeService: AllPurposeService
  ) {
    this.Loading = false;
  }

  ngOnInit(): void {
    //* Setting Page Title Dynamically
    this._titleService.setTitle(this.PageTitle);
    //* Getting All Doctors Data From API
    this._Service.GetDocData().subscribe((res) => {
      this.DocArray = res.body.data;
    });
  }

  BookAppointment(DoctorDetails: any) {
    //* Auth Token Initialization
    let IsAuthenticated: boolean = this._AuthService.GetLocalLoginValue();
    //* Checking Before Booking Appointment User IsAuthenticated Or Not
    if (!IsAuthenticated) {
      this._ModalService.OpenAlertDialog('Not_Authenticated');
    } else {
      console.log(DoctorDetails);

      //* Form Modal Open Method
      this._AllPurposeService.DoctorsDetailsSubject.next(DoctorDetails);
      this._ModalService.OpenDialog();
    }
  }

  ViewDoctorDetails(DoctorDetails: any) {
    //* Auth Token Initialization
    let IsAuthenticated: boolean = this._AuthService.GetLocalLoginValue();

    if (!IsAuthenticated) {
      this._ModalService.OpenAlertDialog('Not_Authenticated');
    } else {
      //* Navigating To Doc List Component With Full_Name As Route Params
      this._RouterService.navigate([
        `doctor-details/${DoctorDetails.full_name}`,
      ]);
      //* Sending Selected Doctor Data To DocDetails Component
      this._AllPurposeService.DoctorsDetailsSubject.next(DoctorDetails);
    }
  }
}
