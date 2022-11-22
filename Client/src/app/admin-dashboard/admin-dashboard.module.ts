import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';

@NgModule({
  declarations: [AdminDashboardComponent, AdminDashboardHomeComponent],
  imports: [CommonModule, AdminDashboardRoutingModule],
})
export class AdminDashboardModule {}
