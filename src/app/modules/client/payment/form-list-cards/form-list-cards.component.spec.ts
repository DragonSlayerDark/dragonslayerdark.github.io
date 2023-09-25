import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListCardsComponent } from './form-list-cards.component';

describe('FormListCardsComponent', () => {
  let component: FormListCardsComponent;
  let fixture: ComponentFixture<FormListCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
