import prompt from 'prompt-sync';
import * as fs from 'fs';
import { log } from 'console';

let input = prompt();

//1) a)
class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[];

    constructor (_id: number, _nome: string, _email: string) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        this._postagens = [];
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get email(): string {
        return this._email;
    }
//1) c)
    get postagens(): Postagem[] {
        return this._postagens
    }
}
//1) b)
class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor (_id: number, _texto: string, _curtidas: number, _descurtidas: number, _data: Date, _perfil: Perfil) {
        this._id = _id;
        this._texto = _texto;
        this._curtidas = _curtidas;
        // this._curtidas = 0;
        this._descurtidas = _descurtidas;
        // this._descurtidas = 0;
        this._data = _data;
        // this._data = new Date;
        this._perfil = _perfil;
        // this._perfil = perfil;
    }

    get id(): number {
        return this._id;
    }

    get texto(): string {
        return this._texto;
    }

    get curtidas(): number {
        return this._curtidas;
    }

    get descurtidas(): number {
        return this._descurtidas;
    }

    get data(): Date {
        return this._data;
    }

    get perfil(): Perfil {
        return this._perfil;
    }
//2) a) i)
    curtir(): void {
        this._curtidas++
    }
//2) a) ii)  
    descurtir(): void {
        this._descurtidas++
    }
//2) a) iii) 
    ehPopular(): boolean {
        if(this._curtidas > (this._descurtidas / (50 / 100))) {
            return true
        } else {
            return false
        }
    }
}
//1) d)
class PostagemAvancada extends Postagem {
    //let PostagemAvancada: PostagemAvancada = new PostagemAvancada()
    private _hashtags: string[] = [];
    private _visualizacoesRestantes: number;

    constructor(_id: number, _texto: string, _curtidas: number, _descurtidas: number, _data: Date, _perfil: Perfil, _hashtags: string[], _visualizacoesRestantes: number) { 
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);

        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
    }

    get hashtag(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes(): number {
        return this._visualizacoesRestantes;
    }
//2) b) i)
    adicionarHashtag(hashtag: string): void {
       this._hashtags.push(hashtag)
    }
//2) b) ii)
    existeHashtag(hashtag: string): boolean {
        for (let hashtagConsultada of this._hashtags) {
            if (hashtagConsultada == hashtag) {
                return true
            } else {
                return false
            }
        }
    }
//2) b) iii)
    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes--
    }
}
class RepositorioDePerfis {
// 03) a)
    private _perfis: Perfil[] = []

    get perfis(): Perfil[] {
        return this._perfis;
    }
// 03) b)
    incluir(perfil: Perfil): void {
        this._perfis.push(perfil)
    }
// 03) c)
    consultar(id?: number, nome?: string, email?: string): Perfil | null {
        if (id != null || nome != null || email != null) {
            for (let perfil of this._perfis) {
                if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                   return perfil
                }
            }
        }
    }
}
class RepositorioDePostagens {
// 04) a)
    private _postagens: Postagem[] = []

    get postagens() {
        return this._postagens;
    }
// 04) b)
    incluir(postagem: Postagem): void {
        this._postagens.push(postagem)
    }
// 04) c)
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null {
        let postagensFiltradas: Postagem[] = []
        for (let postagemConsultada of this._postagens) {
            if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.perfil == perfil) {
                postagensFiltradas.push(postagemConsultada);
            }
        }
        return postagensFiltradas
    }
}
class RedeSocial {
//05) a)
    private _repPerfis: RepositorioDePerfis = new RepositorioDePerfis();
    private _repPostagens: RepositorioDePostagens = new RepositorioDePostagens();

    get repPerfis() {
        return this._repPerfis;
    }
    
    get repPostagens() {
        return this._repPostagens;
    }
//05) b) i)
    incluirPerfil(perfil: Perfil): void {
        if (this._repPerfis.perfis.length <= 0) {
            return this._repPerfis.incluir(perfil)
        }
    }
    
    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this._repPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {
        if(this._repPostagens.consultar(postagem.id, postagem.texto).length <= 0) {
            this._repPostagens.incluir(postagem);
        } else {
            for (let postagemConsultada of this._repPostagens.postagens) {
                if (postagem.id != null && postagem.texto != null && postagem.curtidas != null && postagem.descurtidas != null && postagem.data != null && postagem.perfil != null) {
                    if (postagemConsultada.id == postagem.id) {
                        this._repPostagens.incluir(postagem);
                    }
                } 
            }  
        }
    }

    consultarPostagens(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] | null {
        let postagemConsultada = this._repPostagens.consultar(id, texto, hashtag, perfil);
        return postagemConsultada
    }

    curtir(idPostagem: number) {
        let postagemProcurada = this._repPostagens.consultar(idPostagem);
        if(postagemProcurada) {
            postagemProcurada[0].curtir();
        }
    }

    descurtir(idPostagem: number) {
        let postagemProcurada = this._repPostagens.consultar(idPostagem);
        if (postagemProcurada) {
            postagemProcurada[0].descurtir();
        }
    }

    decrementarVisualizacoes(Postagem: PostagemAvancada): void {
        if(Postagem.visualizacoesRestantes > 0) {
            Postagem.decrementarVisualizacoes()
        }
    }
    /*
    exibirPostagensPorPerfil(id: number): Postagem[] {
        let postagensdoPerfil: Postagem[] = this._repPostagens.consultar(id, undefined, undefined, undefined)
        for (let postagem: PostagemAvancada of postagensdoPerfil) {
            this.decrementarVisualizacoes(postagem)
        }
    }
    */
}
class App {
    private _redeSocial: RedeSocial = new RedeSocial;
    private CAMINHO_ARQUIVO: string = "./backup.txt";

    exibirmenu(): void {
        let opcao: string = "";
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
                        '7 - Decrementar Visualizações\n' +
                        '8 - Exibir Postagens por Perfil\n' +
                        '9 - Exibir Postagens por Hashtag');
            opcao = input("Opção: ");
            switch (opcao) {
                case "1":
                    console.log("Incluir Perfil:" );
                    let idPerfil: number = parseInt(input("ID do Perfil: "));
                    let nomePerfil: string = input("Nome do Perfil: ");
                    let emailPerfil: string = input("Email do Perfil: ");
                    let novoperfil: Perfil = new Perfil(idPerfil, nomePerfil, emailPerfil);
                    this._redeSocial.incluirPerfil(novoperfil);
                    console.log(`Perfil ${novoperfil.nome} incluído com sucesso!`);
                    break;
                case "2":
                    console.log("2 - Consultar Perfil");
                    let idConsulta: number = Number(input("ID da Consulta: "));
                    let nomeConsulta: string = input("Nome da Consulta: ");
                    let emailConsulta: string = input("Email da Consulta: ");
                    let perfilConsultado = this._redeSocial.consultarPerfil(idConsulta, nomeConsulta, emailConsulta);
                    if(perfilConsultado != null) {
                        console.log(`Perfil com ID ${perfilConsultado.id}, nome ${perfilConsultado.nome} e email ${perfilConsultado.email} encontrado!`);
                    } else {
                        console.log(`Nenhum Perfil encontrado com o(s) parâmetro(s) fornecido(s), refaça a consulta!`);
                    }
                    break;
                case "3":
                    console.log("3 - Incluir Postagem");
                    let idPostagem: number = parseInt(input("ID da Postagem: "));
                    let textoPostagem: string = input("Texto da Postagem: ");
                    let nomeperfildaPostagem: string = input("Qual o nome do Perfil?: ");
                    let hashtagsdaPostagem: string = input("Escreva a(s) hashtags a serem cadastradas precedidas de #: ");
                    let arrayhashtagsdaPostagem: string[] = hashtagsdaPostagem.split(" #");
                    let visualizacoesdaPostagem: number = parseInt(input("Quantas visualizações: "))
                    let perfildaPostagem: Perfil = this._redeSocial.consultarPerfil(undefined, nomeperfildaPostagem, undefined);
                    let novaPostagem: PostagemAvancada = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfildaPostagem, arrayhashtagsdaPostagem, visualizacoesdaPostagem);
                    this._redeSocial.incluirPostagem(novaPostagem);
                    console.log(`Postagem do Perfil ${novaPostagem.perfil.nome} incluída com sucesso`);
                    break;
                case "4":
                    console.log("4 - Consultar Postagem");
                    let idPostagemConsultada: number = parseInt(input("ID da Postagem a ser consultada: "));
                    let textoPostagemConsultada: string = input("Texto da Postagem a ser consultada: ");
                    let hashtagPostagemConsultada: string = input("Hashtag da Postagem a ser consultada: ");
                    let nomePerfilPostagemConsultada: string = input("Nome do Perfil da Postagem a ser consultada: ");
                    let perfildaPostagemConsultada: Perfil = this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined);
                    let postagemConsultada = this._redeSocial.consultarPostagens(idPostagemConsultada, textoPostagemConsultada, hashtagPostagemConsultada, perfildaPostagemConsultada);
                    console.log(postagemConsultada);
                    break;
                case "5":
                    console.log("5 - Curtir Postagem");
                    let idCurtirPostagem: number = parseInt(input("ID da Postagem a ser curtida: "));
                    this._redeSocial.curtir(idCurtirPostagem);
                    console.log(`Postagem curtida ♥`);
                    break;

                case "6":
                    console.log("6 - Descurtir Postagem");
                    let idDescurtirPostagem: number = parseInt(input("ID da Postagem a ser descurtida: "));
                    this._redeSocial.descurtir(idDescurtirPostagem);
                    console.log(`Postagem descurtida ☹`);
                    break;
                case "7":
                    console.log("7 Exibir Postagens Por Perfil");
                    //let postagensPorPerfil:

                    break;
            }
            enter_para_continuar()
            limpar_tela()
        } while (opcao != "0");
            console.log('Até Logo!');
    }
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

function main() {
    let meuApp: App = new App()
    meuApp.exibirmenu()
}

main();

function limpar_tela(){
    console.clear()
}

function enter_para_continuar(){
    input('Press <enter> to continue ...')
    limpar_tela()
}