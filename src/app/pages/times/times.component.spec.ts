import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { timesComponent } from './times.component';

describe('timesComponent', () => {
  let component: timesComponent;
  let fixture: ComponentFixture<timesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ timesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(timesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
