import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  PageTitle = 'MedImpact | Error 404';

  constructor(private _titleService: Title) {}
  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
  }
}
