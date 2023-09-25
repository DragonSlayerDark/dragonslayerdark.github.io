import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddressListComponent } from './form-address-list.component';

describe('FormAddressListComponent', () => {
  let component: FormAddressListComponent;
  let fixture: ComponentFixture<FormAddressListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddressListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
