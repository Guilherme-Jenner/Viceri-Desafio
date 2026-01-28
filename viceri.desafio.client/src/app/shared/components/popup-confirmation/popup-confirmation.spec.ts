import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfirmation } from './popup-confirmation';

describe('PopupConfirmation', () => {
  let component: PopupConfirmation;
  let fixture: ComponentFixture<PopupConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
