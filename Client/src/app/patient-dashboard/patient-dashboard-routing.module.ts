import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { PatientDashboardHomeComponent } from './patient-dashboard-home/patient-dashboard-home.component';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { YourAppointmentsComponent } from './your-appointments/your-appointments.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
    children: [
      // {
      //   path: 'admin-list',
      //   loadChildren: () =>
      //     import('../admin-dashboard/admin-list/admin-list.module').then(
      //       (m) => m.AdminListModule
      //     ),
      // },
      {
        redirectTo: 'patient-dashboard-home',
        path: '',
        pathMatch: 'full',
      },
      {
        path: 'patient-dashboard-home',
        component: PatientDashboardHomeComponent,
      },
      {
        path: 'your-appointments',
        component: YourAppointmentsComponent,
      },
      {
        path: 'manage-profile',
        component: ManageProfileComponent,
      },
      // {
      //   path: 'admin-transaction-details',
      //   component: DoctorTransactionDetailsComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorDashboardRoutingModule {}
