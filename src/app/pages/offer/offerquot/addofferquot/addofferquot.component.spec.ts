import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddofferquotComponent } from './addofferquot.component';

describe('AddofferquotComponent', () => {
  let component: AddofferquotComponent;
  let fixture: ComponentFixture<AddofferquotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddofferquotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddofferquotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
