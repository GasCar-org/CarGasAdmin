import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCommisionComponent } from './company-commision.component';

describe('CompanyCommisionComponent', () => {
  let component: CompanyCommisionComponent;
  let fixture: ComponentFixture<CompanyCommisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCommisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCommisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
