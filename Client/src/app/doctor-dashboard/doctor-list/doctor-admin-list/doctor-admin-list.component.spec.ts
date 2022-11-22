import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminListComponent } from './doctor-admin-list.component';

describe('DoctorAdminListComponent', () => {
  let component: DoctorAdminListComponent;
  let fixture: ComponentFixture<DoctorAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
