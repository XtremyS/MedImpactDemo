import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from 'src/services/service.service';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  radioItems = ['Doctor', 'User'];
  model = { option: 'null' };
  LoginForm = new FormGroup({});
  IsLoggedIn = false;
  ApiUserDetails: any;
  IsLoginRadioBtnSelected: boolean = false;
  LocalStorageAuthToken = this._AuthService.GetLocalLoginValue();
  IsDocRouteVisible: boolean = false;
  IsAdminRouteVisible: boolean = false;
  IsPatientRouteVisible: boolean = false;

  //* Dashboard Routes
  AdminDashBoardRoute = 'admin-dashboard';
  DoctorDashBoardRoute = 'doctor-dashboard';
  PatientDashBoardRoute = 'patient-dashboard';

  constructor(
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _AuthService: AuthService,
    private _ModalService: ModalService
  ) {
    this.LoginForm = this._FormBuilder.group({
      login_email: '',
      login_password: '',
    });
  }
  ngOnInit() {
    //* Getting Their Ng Container Value True In LocalStorage On Component Load
    this.IsDocRouteVisible = JSON.parse(localStorage.getItem('ddr')!);
    this.IsAdminRouteVisible = JSON.parse(localStorage.getItem('adr')!);
    this.IsPatientRouteVisible = JSON.parse(localStorage.getItem('pdr')!);

    if (this.LocalStorageAuthToken) {
      this.IsLoggedIn = true;
    }
  }

  Login() {
    if (this.model.option == 'null') {
      //* Rendering Alert Div To Select Any Radio Btn To Login
      this.IsLoginRadioBtnSelected = true;
    } else {
      if (this.model.option == 'Doctor') {
        //* Doctor Login API called
        this._Service.DoctorLogin(this.LoginForm.value).subscribe((data) => {
          console.log(data.body.response);
          if (data.status == 200) {
            //* Setting True In LocalStorage To Doctor Dashboard Div
            localStorage.setItem('ddr', JSON.stringify(true));
            //* Login Alert Triggered
            this._ModalService.OpenAlertDialog('Authenticated');

            //* SETTING API RESPONSE FROM API IN GLOBAL VARIABLE
            this.ApiUserDetails = data.body.response;
            this.IsLoggedIn = true;

            this._AuthService.SetLocalLoginValue(this.IsLoggedIn);
            //* Reloading Page
            location.reload();
          }
        });
        this.LoginForm.patchValue({
          login_email: '',
          login_password: '',
        });
      } else if (this.model.option == 'User') {
        //* Patient Login API called
        this._Service.PatientLogin(this.LoginForm.value).subscribe((data) => {
          console.log(data.body.response);
          if (data.status == 200) {
            //* Setting True In LocalStorage To Patient Dashboard Div
            localStorage.setItem('pdr', JSON.stringify(true));
            //* Login Alert Triggered
            this._ModalService.OpenAlertDialog('Authenticated');
            //* SETTING API RESPONSE FROM API IN GLOBAL VARIABLE
            this.ApiUserDetails = data.body.response;
            this.IsLoggedIn = true;

            //* SETTING JWT TOKEN IN LOCAL STORAGE
            this._AuthService.SetLocalLoginValue(this.IsLoggedIn);
            //* Reloading Page
            location.reload();
          }
        });
        this.LoginForm.patchValue({
          login_email: '',
          login_password: '',
        });
        // } else if (this.model.option == 'Lab') {
        //   //* Lab Login API called
        //   this._Service.LabLogin(this.LoginForm.value).subscribe((data) => {
        //     console.log(data.body.response);
        //     if (data.status == 200) {
        //       //* Login Alert Triggered
        //       this._ModalService.OpenAlertDialog('Authenticated');
        //       //* SETTING API RESPONSE FROM API IN GLOBAL VARIABLE
        //       this.ApiUserDetails = data.body.response;
        //       this.IsLoggedIn = true;
        //       //* GETTING LAST AUTH TOKEN OF USER FROM API AND SETTING IT IN LOCAL STORAGE
        //       let AuthToken =
        //         this.ApiUserDetails.tokens[this.ApiUserDetails.tokens.length - 1]
        //           .token;
        //       this._AuthService.SetLocalAuthToken(AuthToken);
        //       //* Reloading Page
        //       location.reload();
        //     }
        //   });
        //   this.LoginForm.patchValue({
        //     login_email: '',
        //     login_password: '',
        //   });
        // } else if (this.model.option == 'Pharmacy') {
        //   //* Pharmacy Login API called
        //   this._Service.PharmacyLogin(this.LoginForm.value).subscribe((data) => {
        //     console.log(data.body.response);
        //     if (data.status == 200) {
        //       this._ModalService.OpenAlertDialog('Authenticated');
        //       //* SETTING API RESPONSE FROM API IN GLOBAL VARIABLE
        //       this.ApiUserDetails = data.body.response;
        //       this.IsLoggedIn = true;
        //       //* GETTING LAST AUTH TOKEN OF USER FROM API AND SETTING IT IN LOCAL STORAGE
        //       let AuthToken =
        //         this.ApiUserDetails.tokens[this.ApiUserDetails.tokens.length - 1]
        //           .token;
        //       this._AuthService.SetLocalAuthToken(AuthToken);
        //       //* Reloading Page
        //       location.reload();
        //     }
        //   });
        //   this.LoginForm.patchValue({
        //     login_email: '',
        //     login_password: '',
        //   });
        //   console.log(this.LoginForm.value);
      }
    }
  }
  Logout() {
    //* Logout API called
    this._Service.LogOut(this.LoginForm.value).subscribe((data) => {
      this.ApiUserDetails = data;

      //* Logout Message
      if (data.message == 'Logout Successfully!') {
        this._ModalService.OpenAlertDialog('Logout');
        this.IsLoggedIn = false;
        this._AuthService.RemoveLocalAuthToken();
        location.reload();
      }
    });
  }
}
