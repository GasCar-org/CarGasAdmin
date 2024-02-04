import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsManageComponent } from './points-manage.component';

describe('PointsManageComponent', () => {
  let component: PointsManageComponent;
  let fixture: ComponentFixture<PointsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
