import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AllPurposeService } from 'src/services/allpurpose.service';
import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.scss'],
})
export class YourAppointmentsComponent implements OnInit {
  PageTitle = 'MedImpact | Patients Manage Patients';
  YourAppointmentsArray: any[] = [];
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

    //* Booked Doctor By Patients API Called
    this._Service.GetPatientsBookedDocsData().subscribe(async (res: any) => {
      //* Checking Response
      if (res.status == 200) {
        this.YourAppointmentsArray = res.body.booked_doctors;
        console.log(this.YourAppointmentsArray);
      }
    });
  }
}
