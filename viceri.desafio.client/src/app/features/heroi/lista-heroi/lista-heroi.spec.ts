import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHeroi } from './lista-heroi';

describe('ListaHeroi', () => {
  let component: ListaHeroi;
  let fixture: ComponentFixture<ListaHeroi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHeroi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHeroi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
