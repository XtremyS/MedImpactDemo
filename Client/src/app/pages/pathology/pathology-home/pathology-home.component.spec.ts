import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologyHomeComponent } from './pathology-home.component';

describe('PathologyHomeComponent', () => {
  let component: PathologyHomeComponent;
  let fixture: ComponentFixture<PathologyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
