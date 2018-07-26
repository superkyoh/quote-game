import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frase-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao = 'De qual filme ou série é essa frase?';

  public resposta = '';

  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;

  public perdeChance = false;

  public tentativas = 3;

  constructor() {
   this.atualizaRodada();
   }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value.trim();
  }

  public verificarResposta(): void {
    // verifica a resposta
    if (this.resposta.toLowerCase() === this.rodadaFrase.nomeFilme) {
      // incrementa
      this.rodada++;
      this.atualizaProgresso();
      this.atualizaRodada();
    } else {
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

    if (this.tentativas === -1) {
      alert('Perdeu! ;( Acho que é hora de começar a maratonar');
    }
  }

}
