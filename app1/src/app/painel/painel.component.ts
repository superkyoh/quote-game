import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao = 'Can you guess which netflix original said this? ';

  public resposta = '';

  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;

  public perdeChance = false;

  public tentativas = 3;

  @Output() public encerrarJogo = new EventEmitter();

  constructor() {
   this.atualizaRodada();
   }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value.trim();
  }

  public pularResposta(): void {
    this.rodada++;
    this.perdeVida();
    this.atualizaProgresso();
    if (this.rodada === 10) {
      this.encerrarJogo.emit('vitoria');
      this.atualizaProgresso();
    }
    this.atualizaRodada();
  }

  // public padronizarResposta(): string {
  //   this.resposta.toLowerCase().trim().replace(/  +/g, ' ');

  //   console.log(this.resposta);
  //   return this.resposta;
  // }

  public verificarResposta(): void {
    // verifica a resposta

    if (this.resposta.toLowerCase().replace(/  +/g, ' ') === this.rodadaFrase.nomeSerie) {

      if (this.resposta === 'sense 8') {
        this.resposta.replace(/  +/g, '');
      }

      // incrementa
      this.rodada++;
      this.atualizaProgresso();
      if (this.rodada === 10) {
        this.encerrarJogo.emit('vitoria');
        this.atualizaProgresso();
      }
      this.atualizaRodada();
    } else {
      this.atualizaProgresso();
      this.perdeVida();
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
     // limpa o textarea
     this.resposta = '';
  }

  public atualizaProgresso(): void {
    this.progresso = this.progresso + (100 / this.frases.length);
  }

  public perdeVida(): void {
    this.tentativas--;
    this.resposta = '';

    if (this.tentativas === 0) {
      this.encerrarJogo.emit('derrota');
    }
  }

}
