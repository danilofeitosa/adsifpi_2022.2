"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
//import * as fs from 'fs';
//import { log } from 'console';
let input = (0, prompt_sync_1.default)();
//1) a)
class Perfil {
    constructor(_id, _nome, _email) {
        this._postagens = [];
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        //this._postagens = []; Comentei para testar se essa linha ainda seria necessario
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
    constructor(_id, _texto, /*_curtidas: number, _descurtidas: number,*/ _data, _perfil) {
        this._curtidas = 0; //Como não irei mais pedir ao usuário, ele será inicializado com 0.
        this._descurtidas = 0; //Como não irei mais pedir ao usuário, ele será inicializado com 0.
        this._id = _id;
        this._texto = _texto;
        //this._curtidas = _curtidas;
        //this._descurtidas = _descurtidas;
        //Coloquei as curtidas e descutidas como comentário, pq estou em dúvida se eu preciso pedir ao usuário essa informação, ou seja, estar dentro do construtor!!!!
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
    constructor(_id, _texto, /*_curtidas: number, _descurtidas: number,*/ _data, _perfil, _hashtags /*, _visualizacoesRestantes: number*/) {
        super(_id, _texto, /*_curtidas, _descurtidas,*/ _data, _perfil);
        this._hashtags = [];
        this._visualizacoesRestantes = 10; //Como não irei mais pedir ao usuário, ele será inicializado com 10 por padrão da Rede Social.
        //Coloquei as curtidas e descutidas como comentário, pq estou em dúvida se eu preciso pedir ao usuário essa informação, ou seja, estar dentro do construtor!!!!
        this._hashtags = _hashtags;
        //this._visualizacoesRestantes = _visualizacoesRestantes;
        //O mesmo caso para visualizações restantes!
    }
    get hashtag() {
        return this._hashtags;
    }
    get visualizacoesRestantes() {
        return this._visualizacoesRestantes;
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
        this._visualizacoesRestantes--;
    }
}
class RepositorioDePerfis {
    constructor() {
        // 03) a)
        this._perfis = [];
    }
    get perfis() {
        return this._perfis;
    }
    // 03) b)
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    // 03) c)
    consultar(id, nome, email) {
        if (id != null || nome != null || email != null) {
            for (let perfil of this._perfis) {
                if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                    return perfil;
                }
            }
        }
        return null;
    }
}
class RepositorioDePostagens {
    constructor() {
        // 04) a)
        this._postagens = [];
    }
    get postagens() {
        return this._postagens;
    }
    // 04) b)
    incluir(postagem) {
        this._postagens.push(postagem);
        let novoperfil = new Perfil(postagem.id, postagem.perfil.nome, postagem.perfil.email);
        novoperfil.postagens.push(postagem);
        console.log(`Teste: ${novoperfil.postagens[0]}`); //R: Teste [object Object]
        //Estou tentando inserir essa postagem no array dentro da classe Perfil e não estou conseguindo!
    }
    // 04) c)
    consultar(id, texto, hashtag, perfil) {
        let postagensFiltradas = [];
        for (let postagemConsultada of this._postagens) {
            if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.perfil == perfil) {
                postagensFiltradas.push(postagemConsultada);
            }
        }
        return postagensFiltradas;
    }
}
class RedeSocial {
    constructor() {
        //05) a)
        this._repPerfis = new RepositorioDePerfis();
        this._repPostagens = new RepositorioDePostagens();
        /*
        exibirPostagensPorPerfil(id: number): Postagem[] {
            let postagensdoPerfil: Postagem[] = this._repPostagens.consultar(id, undefined, undefined, undefined)
            for (let postagem: PostagemAvancada of postagensdoPerfil) {
                this.decrementarVisualizacoes(postagem)
            }
        }
        */
    }
    get repPerfis() {
        return this._repPerfis;
    }
    get repPostagens() {
        return this._repPostagens;
    }
    //05) b) i)
    incluirPerfil(perfil) {
        if (this._repPerfis.perfis.length <= 0) {
            return this._repPerfis.incluir(perfil);
        }
    }
    consultarPerfil(id, nome, email) {
        return this._repPerfis.consultar(id, nome, email);
    }
    incluirPostagem(postagem) {
        if (this._repPostagens.consultar(postagem.id, postagem.texto).length <= 0) {
            this._repPostagens.incluir(postagem);
        }
        else {
            for (let postagemConsultada of this._repPostagens.postagens) {
                if (postagem.id != null && postagem.texto != null && postagem.curtidas != null && postagem.descurtidas != null && postagem.data != null && postagem.perfil != null) {
                    if (postagemConsultada.id == postagem.id) {
                        this._repPostagens.incluir(postagem);
                    }
                }
            }
        }
    }
    consultarPostagens(id, texto, hashtag, perfil) {
        let postagemConsultada = this._repPostagens.consultar(id, texto, hashtag, perfil);
        return postagemConsultada;
    }
    curtir(idPostagem) {
        let postagemProcurada = this._repPostagens.consultar(idPostagem);
        if (postagemProcurada) {
            postagemProcurada[0].curtir();
        }
    }
    descurtir(idPostagem) {
        let postagemProcurada = this._repPostagens.consultar(idPostagem);
        if (postagemProcurada) {
            postagemProcurada[0].descurtir();
        }
    }
    decrementarVisualizacoes(Postagem) {
        if (Postagem.visualizacoesRestantes > 0) {
            Postagem.decrementarVisualizacoes();
        }
    }
}
class App {
    constructor() {
        this._redeSocial = new RedeSocial;
        this.CAMINHO_ARQUIVO = "./backup.txt";
        /*
        salvarPerfisEmArquivo() {
            console.log("Iniciando a gravação em arquivo.")
            let stringRedeSocial: string = "";
            let linha: string = "";
    
            for (let perfil of this._redeSocial.repPerfis.perfis) {
                if(this._redeSocial.repPerfis.perfis.) {
    
                }
            }
        }
        */
    }
    exibirmenu() {
        let opcao = "";
        do {
            console.log('Rede Social - Flogão :D\n' +
                'Digite uma opção abaixo: ');
            console.log('0 - Sair\n' +
                '1 - Incluir Perfil\n' +
                '2 - Consultar Perfil\n' +
                '3 - Incluir Postagem\n' +
                '4 - Consultar Postagem\n' +
                '5 - Curtir\n' +
                '6 - Descutir\n' +
                '7 - Exibir Postagens Por Perfil\n' +
                //'7 - Decrementar Visualizações\n' +
                //Comentei pq esse método será chamado dentro de outro método e não diretamente pelo usuário
                '8 - Exibir Postagens por Perfil\n' +
                '9 - Exibir Postagens por Hashtag');
            opcao = input("Opção: ");
            switch (opcao) {
                case "1":
                    console.log("Incluir Perfil:");
                    let idPerfil = parseInt(input("ID do Perfil: "));
                    let nomePerfil = input("Nome do Perfil: ");
                    let emailPerfil = input("Email do Perfil: ");
                    let novoperfil = new Perfil(idPerfil, nomePerfil, emailPerfil);
                    this._redeSocial.incluirPerfil(novoperfil);
                    console.log(`Perfil ${novoperfil.nome} incluído com sucesso!`);
                    break;
                case "2":
                    console.log("2 - Consultar Perfil");
                    let idConsulta = Number(input("ID da Consulta: "));
                    let nomeConsulta = input("Nome da Consulta: ");
                    let emailConsulta = input("Email da Consulta: ");
                    let perfilConsultado = this._redeSocial.consultarPerfil(idConsulta, nomeConsulta, emailConsulta);
                    if (perfilConsultado != null) {
                        console.log(`Perfil com ID ${perfilConsultado.id}, nome ${perfilConsultado.nome} e email ${perfilConsultado.email} encontrado!`);
                    }
                    else {
                        console.log(`Nenhum Perfil encontrado com o(s) parâmetro(s) fornecido(s), refaça a consulta!`);
                    }
                    break;
                case "3":
                    console.log("3 - Incluir Postagem");
                    let idPostagem = parseInt(input("ID da Postagem: "));
                    let textoPostagem = input("Texto da Postagem: ");
                    let nomeperfildaPostagem = input("Qual o nome do Perfil?: ");
                    let hashtagsdaPostagem = input("Escreva a(s) hashtags a serem cadastradas precedidas de #.Deixe um espaço entre as hashtags: ");
                    let arrayhashtagsdaPostagem = hashtagsdaPostagem.split(" ");
                    //let visualizacoesdaPostagem: number = parseInt(input("Quantas visualizações: "))
                    let perfildaPostagem = this._redeSocial.consultarPerfil(undefined, nomeperfildaPostagem, undefined);
                    let novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, /*0, 0,*/ new Date(), perfildaPostagem, arrayhashtagsdaPostagem /*, visualizacoesdaPostagem*/);
                    //Coloquei as curtidas e descutidas e visualizaçõesdaPostagem como comentário, pq estou em dúvida se eu preciso pedir ao usuário essa informação, ou seja, estar dentro do construtor!!!!
                    this._redeSocial.incluirPostagem(novaPostagem);
                    console.log(`Postagem do Perfil ${novaPostagem.perfil.nome} incluída com sucesso`);
                    break;
                case "4":
                    console.log("4 - Consultar Postagem");
                    let idPostagemConsultada = parseInt(input("ID da Postagem a ser consultada: "));
                    let textoPostagemConsultada = input("Texto da Postagem a ser consultada: ");
                    let hashtagPostagemConsultada = input("Hashtag da Postagem a ser consultada: ");
                    let nomePerfilPostagemConsultada = input("Nome do Perfil da Postagem a ser consultada: ");
                    let perfildaPostagemConsultada = this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined);
                    let postagemConsultada = this._redeSocial.consultarPostagens(idPostagemConsultada, textoPostagemConsultada, hashtagPostagemConsultada, perfildaPostagemConsultada);
                    console.log(postagemConsultada);
                    break;
                case "5":
                    console.log("5 - Curtir Postagem");
                    let idCurtirPostagem = parseInt(input("ID da Postagem a ser curtida: "));
                    this._redeSocial.curtir(idCurtirPostagem);
                    console.log(`Postagem curtida ♥`);
                    break;
                case "6":
                    console.log("6 - Descurtir Postagem");
                    let idDescurtirPostagem = parseInt(input("ID da Postagem a ser descurtida: "));
                    this._redeSocial.descurtir(idDescurtirPostagem);
                    console.log(`Postagem descurtida ☹`);
                    break;
                case "7":
                    console.log("7 - Exibir Postagens Por Perfil");
                    //let postagensPorPerfil:
                    break;
            }
            enter_para_continuar();
            limpar_tela();
        } while (opcao != "0");
        console.log('Até Logo!');
    }
}
function main() {
    let meuApp = new App();
    meuApp.exibirmenu();
}
main();
function limpar_tela() {
    console.clear();
}
function enter_para_continuar() {
    input('Press <enter> to continue ...');
    limpar_tela();
}
//# sourceMappingURL=avaliacao01.js.map