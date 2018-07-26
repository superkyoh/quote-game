export class Coracao {

    constructor(
        public cheio: boolean,
        public coracaoVazio = '/assets/coracao_vazio.png',
        public coracaoCheio = '/assets/coracao_cheio.png'
    ) {}

    public exibeCoracao(): string {
        if (this.cheio === true) {
            return this.coracaoCheio;
        } else {
            return this.coracaoVazio;
        }
    }
}
