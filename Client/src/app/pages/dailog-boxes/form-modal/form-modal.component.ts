import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Service } from 'src/services/service.service';
import { AllPurposeService } from 'src/services/allpurpose.service';
import { ModalService } from 'src/services/modal.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  AppointmentsForm = new FormGroup({});
  DoctorData: any;
  LoggedInUserData: any;

  constructor(
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _AllPurposeService: AllPurposeService,
    private _ModalService: ModalService,
    public FormDialogBox: MatDialogRef<FormModalComponent>
  ) {}
  ngOnInit(): void {
    this._Service.GetUserData().subscribe(async (res) => {
      if (res.status == 200) {
        this.LoggedInUserData = res.body;

        //* Patching The Api User Data Into Form
        this.AppointmentsForm.patchValue({
          patients_name: this.LoggedInUserData.full_name,
          patients_age: this.LoggedInUserData.age,
          patients_phone: this.LoggedInUserData.phone,
          patients_id: this.LoggedInUserData._id,
        });
      }
    });

    //* Getting Doctor Id From DocList Component On Click Of Book Now BTN
    this._AllPurposeService.DoctorsDetailsSubject.subscribe(async (data) => {
      this.DoctorData = data;
    });

    //* Input Data From Form
    this.AppointmentsForm = this._FormBuilder.group({
      _id: this.DoctorData._id,
      patients_id: this.AppointmentsForm.value.patients_id,
      patients_name: this.AppointmentsForm.value.patients_name,
      patients_age: this.AppointmentsForm.value.patients_age,
      patients_phone: this.AppointmentsForm.value.patients_phone,
      visiting_reason: this.AppointmentsForm.value.visiting_reason,
      appointment_date: this.AppointmentsForm.value.appointment_date,

      //* Sending Selected Doctor Data To Append This Data In Patients Schema
      doctor_full_name: this.DoctorData.full_name,
      doctor_education: this.DoctorData.education,
      doctor_img: this.DoctorData.img,
      doctor_specialty: this.DoctorData.specialty,
      doctor_age: this.DoctorData.age,
      doctor_isVerified: this.DoctorData.isVerified,
      doctor_SuperExperienced: this.DoctorData.SuperExperienced,
      doctor_clinic_address: this.DoctorData.clinic_address,
      doctor_city: this.DoctorData.city,
      doctor_state: this.DoctorData.state,
      doctor_country: this.DoctorData.country,
      doctor_appointment_date: null,
    });
  }
  SubmitForm() {
    //* Patching The Api Doctor Appointment Date Into Form
    this.AppointmentsForm.patchValue({
      doctor_appointment_date: this.AppointmentsForm.value.appointment_date,
    });

    //* Book Appointment API called
    this._Service
      .BookDocAppointment(this.AppointmentsForm.value)
      .subscribe(async (data) => {
        if (data.status == 201) {
          //* Opening Alert Modal WIth This Method
          this._ModalService.OpenAlertDialog('booking_request_success');
          //* Closing Form Dialog Box With This Method
          this.FormDialogBox.close();
        }
      });

    console.log(this.AppointmentsForm.value);
  }
}
