import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunckOrderComponent } from './tunck-order.component';

describe('TunckOrderComponent', () => {
  let component: TunckOrderComponent;
  let fixture: ComponentFixture<TunckOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunckOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunckOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
