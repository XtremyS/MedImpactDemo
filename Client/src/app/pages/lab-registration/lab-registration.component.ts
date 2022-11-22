import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/services/service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lab-registration',
  templateUrl: './lab-registration.component.html',
  styleUrls: ['./lab-registration.component.scss'],
})
export class LabRegistrationComponent implements OnInit {
  PageTitle = 'Book My Health | Register Lab';
  ImgFormData = new FormData();
  Images: any;
  LabForm = new FormGroup({});
  constructor(
    private Route: Router,
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
    this.LabForm = this._FormBuilder.group({
      lab_name: '',
      lab_type: 'Lab',
      phone: '',
      email: '',
      password: '',
      cpassword: '',
      country: '',
      city: '',
      state: '',
      address: '',
      img: '',
    });
  }

  GetImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Images = file;
      console.log(this.Images);
    }
  }
  async Register() {
    this.ImgFormData.append('img', this.Images);

    this._Service.RegisterLabs(this.LabForm.value).subscribe((data) => {
      console.log(data);
    });
    console.log(this.LabForm.value);
  }
}
