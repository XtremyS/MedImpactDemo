import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAdminListComponent } from './lab-admin-list.component';

describe('LabAdminListComponent', () => {
  let component: LabAdminListComponent;
  let fixture: ComponentFixture<LabAdminListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabAdminListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
