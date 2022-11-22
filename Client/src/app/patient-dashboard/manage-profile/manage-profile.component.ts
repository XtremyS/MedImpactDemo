import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent implements OnInit {
  RadioValueSunday: string;
  RadioValueMonday: string;
  RadioValueTuesday: string;
  RadioValueWednesday: string;
  RadioValueThursday: string;
  RadioValueFriday: string;
  RadioValueSaturday: string;

  constructor() {}

  ngOnInit(): void {}
}
