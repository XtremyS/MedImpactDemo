import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorRegistrationComponent } from './pages/doctor-registration/doctor-registration.component';
import { LabRegistrationComponent } from './pages/lab-registration/lab-registration.component';
import { PatientRegistrationComponent } from './pages/patient-registration/patient-registration.component';
import { PathologyComponent } from './pages/pathology/pathology.component';
import { ViewPathologyComponent } from './pages/pathology/view-pathology/view-pathology.component';
import { PathologyHomeComponent } from './pages/pathology/pathology-home/pathology-home.component';
import { RadiologyComponent } from './pages/radiology/radiology.component';
import { RadiologyHomeComponent } from './pages/radiology/radiology-home/radiology-home.component';
import { ViewRadiologyComponent } from './pages/radiology/radiology-home/view-radiology/view-radiology.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PharmacyRegistrationComponent } from './pages/pharmacy-registration/pharmacy-registration.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './pages/material-module/material-module.module';
import { FormModalComponent } from './pages/dailog-boxes/form-modal/form-modal.component';
import { AlertDialogBoxComponent } from './pages/dailog-boxes/alert-dialog-box/alert-dialog-box.component';
import { ProgressLoaderComponent } from './pages/dailog-boxes/progress-loader/progress-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DoctorRegistrationComponent,
    LabRegistrationComponent,
    PatientRegistrationComponent,
    PathologyComponent,
    ViewPathologyComponent,
    PathologyHomeComponent,
    RadiologyComponent,
    RadiologyHomeComponent,
    ViewRadiologyComponent,
    ErrorPageComponent,
    PharmacyRegistrationComponent,
    ContactUsComponent,
    AboutUsComponent,
    DoctorDetailsComponent,
    MainHomeComponent,
    DoctorListComponent,
    FormModalComponent,
    AlertDialogBoxComponent,
    ProgressLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
