import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorDashboardHomeComponent } from './doctor-dashboard-home/doctor-dashboard-home.component';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserPurchasingDetailsComponent } from './user-purchasing-details/user-purchasing-details.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent,
    children: [
      // {
      //   path: 'admin-list',
      //   loadChildren: () =>
      //     import('../admin-dashboard/admin-list/admin-list.module').then(
      //       (m) => m.AdminListModule
      //     ),
      // },
      {
        redirectTo: 'doctor-dashboard-home',
        path: '',
        pathMatch: 'full',
      },
      {
        path: 'doctor-dashboard-home',
        component: DoctorDashboardHomeComponent,
      },
      // {
      //   path: 'admin-transaction-details',
      //   component: DoctorTransactionDetailsComponent,
      // },
      {
        path: 'manage-patients',
        component: ManagePatientsComponent,
      },
      {
        path: 'manage-profile',
        component: ManageProfileComponent,
      },
      { path: 'transaction', component: TransactionComponent },
      {
        path: 'user-purchasing-details',
        component: UserPurchasingDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorDashboardRoutingModule {}
