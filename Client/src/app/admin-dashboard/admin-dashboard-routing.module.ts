import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';
import { AdminTransactionDetailsComponent } from './admin-dashboard-home/admin-transaction-details/admin-transaction-details.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserPurchasingDetailsComponent } from './user-purchasing-details/user-purchasing-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'admin-list',
        loadChildren: () =>
          import('../admin-dashboard/admin-list/admin-list.module').then(
            (m) => m.AdminListModule
          ),
      },
      {
        redirectTo: 'admin-dashboard-home',
        path: '',
        pathMatch: 'full',
      },
      {
        path: 'admin-dashboard-home',
        component: AdminDashboardHomeComponent,
      },
      {
        path: 'admin-transaction-details',
        component: AdminTransactionDetailsComponent,
      },
      {
        path: 'medicines',
        component: MedicinesComponent,
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
export class AdminDashboardRoutingModule {}
