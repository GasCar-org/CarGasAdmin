import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermapComponent } from './ordermap.component';

describe('OrdermapComponent', () => {
  let component: OrdermapComponent;
  let fixture: ComponentFixture<OrdermapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdermapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
