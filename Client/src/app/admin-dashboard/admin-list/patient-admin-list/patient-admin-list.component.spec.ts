import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAdminListComponent } from './patient-admin-list.component';

describe('PatientAdminListComponent', () => {
  let component: PatientAdminListComponent;
  let fixture: ComponentFixture<PatientAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
