import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyunitsComponent } from './buyunits.component';

describe('BuyunitsComponent', () => {
  let component: BuyunitsComponent;
  let fixture: ComponentFixture<BuyunitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyunitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
