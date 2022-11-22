import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListRoutingModule } from './admin-list-routing.module';
import { DoctorAdminListComponent } from './doctor-admin-list/doctor-admin-list.component';
import { PatientAdminListComponent } from './patient-admin-list/patient-admin-list.component';
import { LabAdminListComponent } from './lab-admin-list/lab-admin-list.component';

@NgModule({
  declarations: [
    DoctorAdminListComponent,
    PatientAdminListComponent,
    LabAdminListComponent,
  ],
  imports: [CommonModule, AdminListRoutingModule],
})
export class AdminListModule {
  constructor() {
    console.log('admin-list module loaded');
  }
}
