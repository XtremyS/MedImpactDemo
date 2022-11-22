import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPathologyComponent } from './view-pathology.component';

describe('ViewPathologyComponent', () => {
  let component: ViewPathologyComponent;
  let fixture: ComponentFixture<ViewPathologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPathologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPathologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
