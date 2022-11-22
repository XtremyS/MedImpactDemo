import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRadiologyComponent } from './view-radiology.component';

describe('ViewRadiologyComponent', () => {
  let component: ViewRadiologyComponent;
  let fixture: ComponentFixture<ViewRadiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRadiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRadiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
