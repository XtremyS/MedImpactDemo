import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  PageTitle = 'MedImpact | Contact Us';
  constructor(private _titleService: Title) {}
  ngOnInit(): void {
    this._titleService.setTitle(this.PageTitle);
  }
}
