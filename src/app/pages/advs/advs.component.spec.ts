import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvsComponent } from './advs.component';

describe('AdvsComponent', () => {
  let component: AdvsComponent;
  let fixture: ComponentFixture<AdvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
