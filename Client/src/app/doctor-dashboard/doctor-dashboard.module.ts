import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { DoctorDashboardHomeComponent } from './doctor-dashboard-home/doctor-dashboard-home.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorDashboardHomeComponent,
    ManagePatientsComponent,
    ManageProfileComponent,
  ],
  imports: [CommonModule, DoctorDashboardRoutingModule, FormsModule],
})
export class DoctorDashboardModule {
  constructor() {}
}
