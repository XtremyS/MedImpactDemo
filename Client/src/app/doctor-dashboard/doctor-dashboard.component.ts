import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Service } from 'src/services/service.service';
import { ModalService } from 'src/services/modal.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  PageTitle = 'MedImpact | Doctor';
  CopyrightYear = new Date().getFullYear();
  ApiUserDetails: any;
  constructor(
    private _titleService: Title,
    private _Service: Service,
    private _ModalService: ModalService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    //* Setting Page Title Dynamically
    this._titleService.setTitle(this.PageTitle);
  }

  SideBar() {
    const Close = document.getElementById('sb-nav-fixed');
    Close!.classList.toggle('sb-sidenav-toggled');
  }
}
