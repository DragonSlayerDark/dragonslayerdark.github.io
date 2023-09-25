import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPetsComponent } from './header-pets.component';

describe('HeaderPetsComponent', () => {
  let component: HeaderPetsComponent;
  let fixture: ComponentFixture<HeaderPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
