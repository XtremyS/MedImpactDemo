import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-pharmacy-registration',
  templateUrl: './pharmacy-registration.component.html',
  styleUrls: ['./pharmacy-registration.component.scss'],
})
export class PharmacyRegistrationComponent implements OnInit {
  PharmacyForm = new FormGroup({});
  ImgFormData = new FormData();
  Images: any;
  PageTitle = 'Book My Health | Pathologies';

  constructor(
    private Route: Router,
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
    this.PharmacyForm = this._FormBuilder.group({
      pharmacy_name: '',
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
    this._Service
      .RegisterPharmacy(this.PharmacyForm.value)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
