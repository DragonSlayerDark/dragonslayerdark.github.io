import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorderComponent } from './payorder.component';

describe('PayorderComponent', () => {
  let component: PayorderComponent;
  let fixture: ComponentFixture<PayorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
