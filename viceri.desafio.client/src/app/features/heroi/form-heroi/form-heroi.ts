import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IHeroi } from '../models/heroi.model';
import { IPoderes } from '../models/poderes.model';
import { HeroiService } from '../services/heroi.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { GlobalService } from '../../../shared/services/global.service';

@Component({
  selector: 'app-form-heroi',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './form-heroi.html',
  styleUrl: './form-heroi.css',
})
export class FormHeroi implements OnInit{
  formulario!: FormGroup;
  formMode: string = '';
  heroiId!: number;
  dataHoje: Date = new Date();
  heroi!: IHeroi;
  $superpoderes!: Observable<IPoderes[]>;
  poderesSelecionados: IPoderes[] = [];

  constructor(private heroiService: HeroiService, 
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService) { }

  ngOnInit(): void {
    let url = this.route.snapshot.url;
    this.heroiId = Number(this.route.snapshot.paramMap.get('id'));

    this.verificarTipoForm(url);
    
    this.initForm();
    this.getPoderes();
  }

  initForm(){
    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required),
      nomeHeroi: new FormControl('', Validators.required),
      dataNascimento: new FormControl(null),
      altura: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2},\d{2}$/)]),
      peso: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,3},\d{2}$/)]),
    })
  }

  verificarTipoForm(url: UrlSegment[]){
    if(url.length > 0){
      const urlString = url[0].path;
      if(urlString.includes('VerHeroi')){
        this.formMode = 'view';
        this.setFormValue();
      }
      else if(urlString.includes('EditarHeroi')){
        this.formMode = 'edit';
        this.setFormValue();
      }
      else {
        this.formMode = 'create';
      }
    }
  }

  setFormValue(){
    this.heroiService.getHeroiById(this.heroiId).subscribe(
      {
        next: (response) => { 
          this.heroi = response.data;

          this.formulario.patchValue({
            nome: this.heroi.nome,
            nomeHeroi: this.heroi.nomeHeroi,
            dataNascimento: this.heroi.dataNascimento ? this.heroi.dataNascimento.toString().split('T')[0] : '',
            altura: this.heroi.altura.toString().replace('.', ','),
            peso: this.heroi.peso.toString().replace('.', ',')
          });
          this.poderesSelecionados = this.heroi.superpoderes;
        },
        error: (err) => {
          console.error('Erro ao carregar herói:', err);
          const message = err.error ? err.error : 'Erro ao carregar herói. Tente novamente.';
          this.globalService.showToast({message: message, type: 'error'});
          this.router.navigate(['/']);
        }
      }
    );
  }

  // Mascara para Altura: 00,00
  formatarAltura(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (valor.length > 4) {
      valor = valor.substring(0, 4); // Limita a 4 dígitos
    }
    
    // Adiciona a vírgula antes dos últimos 2 dígitos
    if (valor.length > 2) {
      valor = valor.replace(/(\d+)(\d{2})$/, '$1,$2');
    }
    
    event.target.value = valor;
    this.formulario.get('altura')?.setValue(valor, { emitEvent: false });
  }

  // Mascara para Peso: 000,00
  formatarPeso(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
    if (valor.length > 5) {
      valor = valor.substring(0, 5); // Limita a 5 dígitos
    }
    
    // Adiciona a vírgula antes dos últimos 2 dígitos
    if (valor.length > 2) {
      valor = valor.replace(/(\d+)(\d{2})$/, '$1,$2');
    }
    
    event.target.value = valor;
    this.formulario.get('peso')?.setValue(valor, { emitEvent: false });
  }

  getPoderes(){
    this.$superpoderes = this.heroiService.getAllPoderes()
      .pipe(map(response => response.data));
  }

  checkBoxClicked(poder: IPoderes){
    if(this.poderesSelecionados.some(p => p.id === poder.id)){
      this.poderesSelecionados = this.poderesSelecionados.filter(p => p.id !== poder.id);
      return;
    }
     
    this.poderesSelecionados.push(poder);
  }

  isPoderSelecionado(id: number): boolean {
    return this.poderesSelecionados.some(p => p.id === id);
  }

  salvarHeroi(){
    if(this.formulario.valid && this.poderesSelecionados.length > 0 && new Date(this.formulario.value.dataNascimento) <= this.dataHoje){
        const heroiData: IHeroi = {
        id: this.heroiId ? this.heroiId : 0,
        nome: this.formulario.value.nome,
        nomeHeroi: this.formulario.value.nomeHeroi,
        dataNascimento: this.formulario.value.dataNascimento,
        altura: parseFloat(this.formulario.value.altura.replace(',', '.')),
        peso: parseFloat(this.formulario.value.peso.replace(',', '.')),
        superpoderes: this.poderesSelecionados
      };

      if(this.formMode === 'create'){
        this.criarHeroi(heroiData);
      }
      else if(this.formMode === 'edit'){
        this.updateHeroi(heroiData);
      }
    }
    else {

      if(new Date(this.formulario.value.dataNascimento) > this.dataHoje){
        this.globalService.showToast({message: 'Data de nascimento inválida. Não pode ser futura.', type: 'error'});
        return;
      }

      this.globalService.showToast({message: 'Por favor, preencha todos os campos obrigatórios.', type: 'error'});
    }
  }

  criarHeroi(heroiData: IHeroi){
    this.heroiService.createHeroi(heroiData).subscribe(
      {
        next: () => {
          this.poderesSelecionados = [];
          this.formulario.reset();
          this.router.navigate(['/']);
          this.globalService.showToast({message: 'Herói criado com sucesso!', type: 'success'});
        },
        error: (err) => {
          console.error('Erro ao criar herói:', err);
          const message = err.error ? err.error : 'Erro ao criar herói. Tente novamente.';
          this.globalService.showToast({message: message, type: 'error'});
        }
      }
    );
  }

  updateHeroi(heroiData: IHeroi){
    this.heroiService.updateHeroi(heroiData).subscribe(
      {
        next: () => {
          this.poderesSelecionados = [];
          this.formulario.reset();
          this.router.navigate(['/']);
          this.globalService.showToast({message: 'Herói atualizado com sucesso!', type: 'success'});
        },  
        error: (err) => {
          console.error('Erro ao atualizar herói:', err);
          const message = err.error ? err.error : 'Erro ao atualizar herói. Tente novamente.';
          this.globalService.showToast({message: message, type: 'error'});
        }
      }
    );
  }
}