import { Component, OnInit } from '@angular/core';
import { Service } from 'src/services/service.service';

@Component({
  selector: 'app-radiology-home',
  templateUrl: './radiology-home.component.html',
  styleUrls: ['./radiology-home.component.scss'],
})
export class RadiologyHomeComponent implements OnInit {
  Radiology: any;
  LabDetails: any;

  constructor(private _Service: Service) {}
  ngOnInit(): void {
    this._Service.GetLabData().subscribe((_Res) => {
      console.log(_Res.data);
    });
  }
}
