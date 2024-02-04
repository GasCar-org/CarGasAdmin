import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyoptionsComponent } from './buyoptions.component';

describe('BuyoptionsComponent', () => {
  let component: BuyoptionsComponent;
  let fixture: ComponentFixture<BuyoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
