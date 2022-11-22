import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorRegistrationComponent } from './pages/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './pages/patient-registration/patient-registration.component';
import { LabRegistrationComponent } from './pages/lab-registration/lab-registration.component';
import { HomeComponent } from './pages/home/home.component';
import { PathologyComponent } from './pages/pathology/pathology.component';
import { PathologyHomeComponent } from './pages/pathology/pathology-home/pathology-home.component';
import { ViewPathologyComponent } from './pages/pathology/view-pathology/view-pathology.component';
import { RadiologyHomeComponent } from './pages/radiology/radiology-home/radiology-home.component';
import { ViewRadiologyComponent } from './pages/radiology/radiology-home/view-radiology/view-radiology.component';
import { RadiologyComponent } from './pages/radiology/radiology.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PharmacyRegistrationComponent } from './pages/pharmacy-registration/pharmacy-registration.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DoctorDetailsComponent } from './pages/doctor-details/doctor-details.component';
import { MainHomeComponent } from './pages/main-home/main-home.component';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        component: MainHomeComponent,
      },
      {
        path: 'register-doctor',
        component: DoctorRegistrationComponent,
      },
      {
        path: 'register-patient',
        component: PatientRegistrationComponent,
      },
      // {
      //   path: 'register-lab',
      //   component: LabRegistrationComponent,
      // },
      // {
      //   path: 'register-pharmacy',
      //   component: PharmacyRegistrationComponent,
      // },
      {
        path: 'doctor-list',
        component: DoctorListComponent,
      },
      {
        path: 'doctor-details/:full_name',
        component: DoctorDetailsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      // {
      //   path: 'pathology',
      //   component: PathologyComponent,
      //   children: [
      //     {
      //       redirectTo: 'pathology-home',
      //       path: '',
      //       pathMatch: 'full',
      //     },
      //     {
      //       path: 'pathology-home',
      //       component: PathologyHomeComponent,
      //     },
      //     {
      //       path: 'view-pathology',
      //       component: ViewPathologyComponent,
      //     },
      //   ],
      // },
      // {
      //   path: 'radiology',
      //   component: RadiologyComponent,
      //   children: [
      //     {
      //       redirectTo: 'radiology-home',
      //       path: '',
      //       pathMatch: 'full',
      //     },
      //     {
      //       path: 'radiology-home',
      //       component: RadiologyHomeComponent,
      //     },
      //     {
      //       path: 'view-radiology',
      //       component: ViewRadiologyComponent,
      //     },
      //   ],
      // },
    ],
  },

  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
  },
  {
    path: 'doctor-dashboard',
    loadChildren: () =>
      import('./doctor-dashboard/doctor-dashboard.module').then(
        (m) => m.DoctorDashboardModule
      ),
  },
  {
    path: 'patient-dashboard',
    loadChildren: () =>
      import('./patient-dashboard/patient-dashboard.module').then(
        (m) => m.PatientDashboardModule
      ),
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
