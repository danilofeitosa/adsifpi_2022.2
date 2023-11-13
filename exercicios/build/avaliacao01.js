"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
1. (0,5) Crie 3 classes conforme abaixo:
    a. Crie uma classe Perfil que tenha _id (number), _nome, e _email, atributos como privados e inicializados em um construtor. Adicione métodos get de leitura;
    b. Crie uma classe Postagem com _id (number), _texto, _curtidas (number), _descurtidas (number), _data e _perfil (classe Perfil criada anteriormente) como atributos privados, atributos inicializados no construtor e métodos de get de leitura;
    c. Adicione à classe Perfil um atributo privado chamado _postagens: Postagem[]
    d. Crie uma classe chamada PostagemAvancada que além dos atributos de postagem, possua mais dois atributos privados: um array de strings chamado _hashtags e um outro atributo chamado visualizacoesRestantes (number) que indica quantas vezes ela poderá ser exibida até expirar.
*/
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let opcao = '';
do {
    console.log('\nOrkut\nDigite uma opção: ');
    console.log('1 - Adicionar Hashtag\n' +
        '2 - Existe Hashtag\n');
    opcao = (0, prompt_sync_1.default)("Opção: ");
    switch (opcao) {
        case "1":
        case "2":
        case "3":
    }
    (0, prompt_sync_1.default)("\nOperação finalizada. Digite <Enter>");
} while (opcao != "0");
console.log('Até Logo!');
//1) a)
class Perfil {
    constructor(_id, _nome, _email, _postagens) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        this._postagens = _postagens;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    //1) c)
    get postagens() {
        return this._postagens;
    }
}
//1) b)
class Postagem {
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil) {
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _curtidas;
        this._descurtidas = _descurtidas;
        this._data = _data;
        this._perfil = _perfil;
    }
    get id() {
        return this._id;
    }
    get texto() {
        return this._texto;
    }
    get curtidas() {
        return this._curtidas;
    }
    get descurtidas() {
        return this._descurtidas;
    }
    get data() {
        return this._data;
    }
    get perfil() {
        return this._perfil;
    }
    //2) a) i)
    curtir() {
        this._curtidas++;
    }
    //2) a) ii)  
    descurtir() {
        this._descurtidas++;
    }
    //2) a) iii) 
    ehPopular() {
        if (this._curtidas > (this._descurtidas / (50 / 100))) {
            return true;
        }
        else {
            return false;
        }
    }
}
//1) d)
class PostagemAvancada extends Postagem {
    constructor(id, texto, curtidas, descurtidas, data, perfil, _hashtags, _visualizacoesRestantes) {
        super(id, texto, curtidas, descurtidas, data, perfil);
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
    }
    //2) b) i)
    adicionarHashtag(hashtag) {
        this._hashtags.push(hashtag);
    }
    //2) b) ii)
    existeHashtag(hashtag) {
        for (let hashtagConsultada of this._hashtags) {
            if (hashtagConsultada == hashtag) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    //2) b) iii)
    decrementarVisualizacoes() {
    }
}
/*
2. (1,5) Crie os seguintes métodos:
    a. Na classe Postagem:
        i. curtir(): void - incrementa em um o atributo curtidas;
        ii. descurtir(): void - incrementa em um o atributo _descurtidas;
        iii. ehPopular(): boolean - retorna true caso a quantidade de _curtidas seja 50% maior que a quantidade de _descurtidas.
    b. Na classe PostagemAvancada:
        i. adicionarHashtag(hashtag: string): void - adiciona uma string ao array de _hashtags;
        ii. existeHashtag(hashtag: string): boolean - retorna true caso a postagem tenha a hashtag e false caso contrário;
        iii. decrementarVisualizacoes(): void – decrementa em um a quantidade de vezes que a postagem foi visualizada.
*/ 
//# sourceMappingURL=avaliacao01.js.map