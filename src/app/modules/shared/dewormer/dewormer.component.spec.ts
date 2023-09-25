import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DewormerComponent } from './dewormer.component';

describe('DewormerComponent', () => {
  let component: DewormerComponent;
  let fixture: ComponentFixture<DewormerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DewormerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DewormerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
