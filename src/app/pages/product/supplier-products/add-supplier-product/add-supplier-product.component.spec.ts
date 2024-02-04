import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierProductComponent } from './add-supplier-product.component';

describe('AddSupplierProductComponent', () => {
  let component: AddSupplierProductComponent;
  let fixture: ComponentFixture<AddSupplierProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
