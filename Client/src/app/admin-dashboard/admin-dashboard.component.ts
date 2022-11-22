import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  PageTitle = 'MedImpact | Admin';
  constructor(private _titleService: Title) {}
  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
  }

  SideBar() {
    const Close = document.getElementById('sb-nav-fixed');
    Close!.classList.toggle('sb-sidenav-toggled');
  }
}
