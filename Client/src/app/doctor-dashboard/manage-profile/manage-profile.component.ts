import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AllPurposeService } from 'src/services/allpurpose.service';
import { AuthService } from 'src/services/auth.service';
import { ModalService } from 'src/services/modal.service';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent implements OnInit {
  DoctorProfileData: any = {};
  Images: any;
  IsUploadBtnVisible: boolean = false;

  RadioValueSunday: number;
  RadioValueMonday: number;
  RadioValueTuesday: number;
  RadioValueWednesday: number;
  RadioValueThursday: number;
  RadioValueFriday: number;
  RadioValueSaturday: number;

  EditWorkingWeeksDiv: boolean = false;

  constructor(
    private _Service: Service,
    private _AuthService: AuthService,
    private _ModalService: ModalService,
    private _RouterService: Router,
    private _titleService: Title,
    private _AllPurposeService: AllPurposeService
  ) {}

  ngOnInit(): void {
    //* Doctor Data API Call
    this._Service.GetUserData().subscribe(async (res) => {
      if (res.status == 200) {
        this.DoctorProfileData = res.body;
      }
    });
  }

  EditWorkingWeeks() {
    //* Switching Week Days Editing Div
    this.EditWorkingWeeksDiv = !this.EditWorkingWeeksDiv;
  }

  UpdateAvailability(_Id: any) {
    //* Converting Radio Btns Strings Value Into Number
    let ConvertedRadioValueSunday = +this.RadioValueSunday;
    let ConvertedRadioValueMonday = +this.RadioValueMonday;
    let ConvertedRadioValueTuesday = +this.RadioValueTuesday;
    let ConvertedRadioValueWednesday = +this.RadioValueWednesday;
    let ConvertedRadioValueThursday = +this.RadioValueThursday;
    let ConvertedRadioValueFriday = +this.RadioValueFriday;
    let ConvertedRadioValueSaturday = +this.RadioValueSaturday;

    //* Creating Object To Send Data To Backend
    let AvailabilityObj = {
      _id: _Id,
      week_day1: 'Sun',
      week_day1_status: ConvertedRadioValueSunday,
      week_day2: 'Mon',
      week_day2_status: ConvertedRadioValueMonday,
      week_day3: 'Tue',
      week_day3_status: ConvertedRadioValueTuesday,
      week_day4: 'Wed',
      week_day4_status: ConvertedRadioValueWednesday,
      week_day5: 'Thu',
      week_day5_status: ConvertedRadioValueThursday,
      week_day6: 'Fri',
      week_day6_status: ConvertedRadioValueFriday,
      week_day7: 'Sat',
      week_day7_status: ConvertedRadioValueSaturday,
    };
    //* Sending Data To Backend
    this._Service
      .UpdateDoctorAvailability(AvailabilityObj)
      .subscribe(async (res) => {
        if (res.status == 200) {
          this._ModalService.OpenAlertDialog('Availability Updated');
        }
      });
  }
  GetImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Images = file;
      if (this.Images.type != '') {
        this.IsUploadBtnVisible = true;
      }
    }
  }
  UploadDocument() {
    this._ModalService.OpenAlertDialog('Verification Request Sent');
    this.IsUploadBtnVisible = false;
  }
}
