import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Service } from 'src/services/service.service';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss'],
})
export class PatientRegistrationComponent implements OnInit {
  PatientForm = new FormGroup({});
  ImgFormData = new FormData();
  Images: any;
  PageTitle = 'Book My Health | Register Patient';

  constructor(
    private _Route: Router,
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _titleService: Title,
    private _ModalService: ModalService
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
    this.PatientForm = this._FormBuilder.group({
      gender: 'Gender',
      full_name: '',
      phone: '',
      age: '',
      email: '',
      password: '',
      cpassword: '',
      role: 'Patient',
      img: '',
    });
  }

  //* Function To Get Image From User
  GetImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Images = file;
      console.log(this.Images);
    }
  }
  async Register() {
    this._Service
      .RegisterPatient(this.PatientForm.value)
      .subscribe(async (res) => {
        if (res.status === 201) {
          //* If User Register successfully Triggered Modal
          this._ModalService.OpenAlertDialog('Registered Successfully');

          //* Routing User To Home Page After 2 Second
          setTimeout(() => {
            this._Route.navigate(['/']);
          }, 2000);
        }
      });
  }
}
