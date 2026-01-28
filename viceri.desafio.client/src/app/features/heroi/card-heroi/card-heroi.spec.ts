import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeroi } from './card-heroi';

describe('CardHeroi', () => {
  let component: CardHeroi;
  let fixture: ComponentFixture<CardHeroi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeroi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardHeroi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
