import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeroi } from '../models/heroi.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-heroi',
  imports: [DatePipe],
  templateUrl: './card-heroi.html',
  styleUrl: './card-heroi.css',
})
export class CardHeroi {
  @Input() heroi!: IHeroi;
  @Output() onDelete = new EventEmitter<number>();

  constructor(private router: Router) {}

  goToEditPage(id: number) {
    this.router.navigate(['/EditarHeroi', id]);
  }

  goToViewPage(id: number) {
    this.router.navigate(['/VerHeroi', id]);
  }

  excluirHeroi(id: number) {
    this.onDelete.emit(id);
  }
}
