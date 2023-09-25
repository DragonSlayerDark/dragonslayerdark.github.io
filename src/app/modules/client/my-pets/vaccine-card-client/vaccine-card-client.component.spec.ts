import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCardClientComponent } from './vaccine-card-client.component';

describe('VaccineCardClientComponent', () => {
  let component: VaccineCardClientComponent;
  let fixture: ComponentFixture<VaccineCardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineCardClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccineCardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
