import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferquotComponent } from './offerquot.component';

describe('OfferquotComponent', () => {
  let component: OfferquotComponent;
  let fixture: ComponentFixture<OfferquotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferquotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferquotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
