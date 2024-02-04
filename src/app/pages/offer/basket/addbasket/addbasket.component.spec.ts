import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbasketComponent } from './addbasket.component';

describe('AddbasketComponent', () => {
  let component: AddbasketComponent;
  let fixture: ComponentFixture<AddbasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
