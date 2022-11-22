import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorAdminListComponent } from './doctor-admin-list/doctor-admin-list.component';
import { PatientAdminListComponent } from './patient-admin-list/patient-admin-list.component';
import { LabAdminListComponent } from './lab-admin-list/lab-admin-list.component';

const routes: Routes = [
  { path: 'doctor-list', component: DoctorAdminListComponent },
  { path: 'patient-list', component: PatientAdminListComponent },
  { path: 'lab-list', component: LabAdminListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminListRoutingModule {}
