import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AllPurposeService } from 'src/services/allpurpose.service';
import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss'],
})
export class ManagePatientsComponent implements OnInit {
  PageTitle = 'MedImpact | Admin Manage Patients';
  AppointmentsArray: any[] = [];
  DoctorId: any;
  BtnsIsVisible: boolean = true;
  DetailsObj: Object = {
    _id: undefined,
    appointment_status: undefined,
  };
  constructor(
    private _Service: Service,
    private _AuthService: AuthService,
    private _ModalService: ModalService,
    private _RouterService: Router,
    private _titleService: Title,
    private _AllPurposeService: AllPurposeService
  ) {}

  ngOnInit(): void {
    //* Setting Page Title Dynamically
    this._titleService.setTitle(this.PageTitle);

    //* Appointments API Called
    this._Service.GetAppointmentData().subscribe(async (res: any) => {
      if (res.status == 200) {
        this.AppointmentsArray = res.body.appointments;
        console.log(this.AppointmentsArray);
      }
    });
  }

  Approve(PatientsData: any, Status: string) {
    // console.log(Status);
    this.BtnsIsVisible = false;

    //* Sending Patients Data To Backend
    if (Status == 'Approved') {
      this.DetailsObj = {
        _id: PatientsData._id,
        appointment_status: 1,
        patients_id: PatientsData.patients_id,
      };
    }

    if (Status == 'Rejected') {
      this.DetailsObj = {
        _id: PatientsData._id,
        appointment_status: 0,
        patients_id: PatientsData.patients_id,
      };
    }

    //* Updating Patients Appointments Status API Called
    this._Service
      .UpdateAppointmentStatus(this.DetailsObj)
      .subscribe(async (res: any) => {
        if (res.status == 200) {
          this.BtnsIsVisible = false;
        }
        console.log(res, 'APPROVE RES');
      });
  }
}
