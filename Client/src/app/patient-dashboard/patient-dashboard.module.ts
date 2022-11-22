import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardRoutingModule } from './patient-dashboard-routing.module';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { PatientDashboardHomeComponent } from './patient-dashboard-home/patient-dashboard-home.component';
import { YourAppointmentsComponent } from './your-appointments/your-appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientDashboardHomeComponent,
    YourAppointmentsComponent,
    ManageProfileComponent,
  ],
  imports: [CommonModule, DoctorDashboardRoutingModule, FormsModule],
})
export class PatientDashboardModule {
  constructor() {}
}
