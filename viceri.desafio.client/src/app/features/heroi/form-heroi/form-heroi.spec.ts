import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeroi } from './form-heroi';

describe('FormHeroi', () => {
  let component: FormHeroi;
  let fixture: ComponentFixture<FormHeroi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeroi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHeroi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
