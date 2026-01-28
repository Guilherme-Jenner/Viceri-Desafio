import { Component, OnInit } from '@angular/core';
import { IHeroi } from '../models/heroi.model';
import { CardHeroi } from '../card-heroi/card-heroi';
import { RouterLink } from "@angular/router";
import { HeroiService } from '../services/heroi.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-lista-heroi',
  imports: [CardHeroi, RouterLink, AsyncPipe],
  templateUrl: './lista-heroi.html',
  styleUrl: './lista-heroi.css',
})
export class ListaHeroi implements OnInit{
  $herois!: Observable<IHeroi[]>

  constructor(private heroiService: HeroiService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.getAllHerois(); 
  }

  getAllHerois(): void {
    this.$herois = this.heroiService.getAllHerois()
      .pipe(map(response => response.data));
  }

  async deletarHeroi(id: number) {
    const confirmed = await this.globalService.showConfirmation({
      title: 'Excluir Herói',
      message: 'Tem certeza que deseja excluir este herói?'
    });

    if (!confirmed) return;

    this.heroiService.deleteHeroi(id).subscribe({
      next: () => {
        this.getAllHerois();
        this.globalService.showToast({ message: 'Herói excluído com sucesso!', type: 'success' });
      },
      error: (err) => {
        console.error('Erro ao excluir herói:', err);
        this.globalService.showToast({ message: 'Erro ao excluir herói. Tente novamente.', type: 'error' });
      }
    });
  }
}
