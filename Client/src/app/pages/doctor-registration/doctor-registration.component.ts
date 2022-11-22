import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Service } from 'src/services/service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss'],
})
export class DoctorRegistrationComponent implements OnInit {
  DoctorForm = new FormGroup({});
  PageTitle = 'MedImpact | Register Doctor';
  ImgFormData = new FormData();
  Images: any;

  //* EDUCATION FIELD INPUT VARIABLES
  @ViewChild('EducationInput') EducationInput: ElementRef<HTMLInputElement>;
  separatorKeysCodesEducation: number[] = [ENTER, COMMA];
  EducationFormControl = new FormControl('');
  FilterdEducationArray: Observable<string[]>;
  EducationValue: string[] = [];
  EducationSuggestionArray: string[] = [
    'MBBS',
    'TTBPS',
    'IMBS',
    'IIMBS',
    'IIIT',
  ];

  //* Specialty FIELD INPUT VARIABLES
  @ViewChild('SpecialtyInput') SpecialtyInput: ElementRef<HTMLInputElement>;
  separatorKeysCodesSpecialty: number[] = [ENTER, COMMA];
  SpecialtyFormControl = new FormControl('');
  FilteredSpecialtyArray: Observable<string[]>;
  SpecialtyValue: string[] = [];
  SpecialtySuggestionArray: string[] = [
    'NERROSURGOEN',
    'DENTIST',
    'CHARDIOLOSITS',
    'EYE',
    'ORTHOD',
  ];

  constructor(
    private _Route: Router,
    private _FormBuilder: FormBuilder,
    private _Service: Service,
    private _titleService: Title,
    private _ModalService: ModalService
  ) {
    //* EDUCATION FIELD FILTER LOGIC
    this.FilterdEducationArray = this.EducationFormControl.valueChanges.pipe(
      startWith(null),
      map((Data: string | null) =>
        Data
          ? this._FilterEducation(Data)
          : this.EducationSuggestionArray.slice()
      )
    );

    //* SPECIALITY FIELD FILTER LOGIC
    this.FilteredSpecialtyArray = this.SpecialtyFormControl.valueChanges.pipe(
      startWith(null),
      map((Data: string | null) =>
        Data
          ? this._FilterSpecialty(Data)
          : this.SpecialtySuggestionArray.slice()
      )
    );
  }

  //* EDUCATION FIELD FUNCTIONS
  AddEducation(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.EducationValue.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.EducationFormControl.setValue(null);
  }

  RemoveEducation(fruit: string): void {
    const index = this.EducationValue.indexOf(fruit);

    if (index >= 0) {
      this.EducationValue.splice(index, 1);
    }
  }

  SelectedEducation(event: MatAutocompleteSelectedEvent): void {
    this.EducationValue.push(event.option.viewValue);
    this.EducationInput.nativeElement.value = '';
    this.EducationFormControl.setValue(null);
  }

  private _FilterEducation(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.EducationSuggestionArray.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  //* Specialty FIELD FUNCTIONS
  AddSpecialty(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.SpecialtyValue.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.SpecialtyFormControl.setValue(null);
  }

  RemoveSpecialty(fruit: string): void {
    const index = this.SpecialtyValue.indexOf(fruit);

    if (index >= 0) {
      this.SpecialtyValue.splice(index, 1);
    }
  }

  SelectedSpecialty(event: MatAutocompleteSelectedEvent): void {
    this.SpecialtyValue.push(event.option.viewValue);
    this.SpecialtyInput.nativeElement.value = '';
    this.SpecialtyFormControl.setValue(null);
  }

  private _FilterSpecialty(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.SpecialtySuggestionArray.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit() {
    this._titleService.setTitle(this.PageTitle);
    this.DoctorForm = this._FormBuilder.group({
      gender: 'Gender',
      full_name: '',
      phone: '',
      age: '',
      education: '',
      specialty: '',
      clinic_address: '',
      city: '',
      state: '',
      country: '',
      email: '',
      password: '',
      cpassword: '',
      role: 'Doctor',
    });
  }

  async Register() {
    this.DoctorForm.patchValue({
      education: this.EducationValue,
      specialty: this.SpecialtyValue,
    });

    this._Service
      .RegisterDoctor(this.DoctorForm.value)
      .subscribe(async (res) => {
        if (res.status === 201) {
          //* If Doctor Register successfully Triggered Modal
          this._ModalService.OpenAlertDialog('Registered Successfully');

          //* Routing User To Home Page After 2 Second
          setTimeout(() => {
            this._Route.navigate(['/']);
          }, 2000);
        }
      });
  }
}
