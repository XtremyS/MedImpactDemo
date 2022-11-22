import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-dialog-box',
  templateUrl: './alert-dialog-box.component.html',
  styleUrls: ['./alert-dialog-box.component.scss'],
})
export class AlertDialogBoxComponent implements OnInit {
  LoginSuccess: boolean = false;
  LoginFailure: boolean = false;
  Logout: boolean = false;
  BookingRequest: boolean = false;
  RegisteredSuccess: boolean = false;
  AvailabilityUpdated: boolean = false;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
  ngOnInit(): void {
    console.log(this.data, 'DATA FROM INPUT ALERT');

    if (this.data == 'Not_Authenticated') {
      this.LoginFailure = true;
    } else if (this.data == 'Authenticated') {
      this.LoginSuccess = true;
    } else if (this.data == 'Logout') {
      this.Logout = true;
    } else if (this.data == 'booking_request_success') {
      this.BookingRequest = true;
    } else if (this.data == 'Registered Successfully') {
      this.RegisteredSuccess = true;
    } else if (this.data == 'Availability Updated') {
      this.AvailabilityUpdated = true;
    }
  }
}
