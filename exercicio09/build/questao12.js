"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
//1) a)
class Perfil {
    constructor(_id, _nome, _email) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        this._postagens = [];
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
    constructor(_id, _texto, _curtidas, _descurtidas, _data, _perfil, _hashtags, _visualizacoesRestantes) {
        super(_id, _texto, _curtidas, _descurtidas, _data, _perfil);
        this._hashtags = [];
        this._hashtags = _hashtags;
        this._visualizacoesRestantes = _visualizacoesRestantes;
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
class RepositorioDePerfisArray {
    constructor() {
        this._perfis = [];
    }
    incluir(perfil) {
        this._perfis.push(perfil);
    }
    consultar(id, nome, email) {
        let perfilConsultado;
        for (let perfil of this._perfis) {
            if (perfil.id == id) {
                perfilConsultado = perfil;
                break;
            }
        }
        return perfilConsultado;
    }
}
class RepositorioDePostagensArray {
    constructor() {
        this._postagens = [];
    }
    get postagens() {
        return this._postagens;
    }
    incluir(postagem) {
        this._postagens.push(postagem);
        let perfilAssociado = postagem.perfil;
        perfilAssociado.postagens.push(postagem);
    }
    // 04) c)
    consultar(id, texto, hashtag, perfil) {
        let postagensFiltradas = [];
        for (let postagemConsultada of this._postagens) {
            if (postagemConsultada instanceof PostagemAvancada) {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.existeHashtag(hashtag) || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            }
            else {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            }
        }
        return postagensFiltradas;
    }
}
/*
class RepositorioDePostagens {
// 04) a)
    private _postagens: Postagem[] = []

    get postagens() {
        return this._postagens;
    }
// 04) b)
    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
        let perfilAssociado = postagem.perfil;
        perfilAssociado.postagens.push(postagem);
    }
// 04) c)
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null {
        let postagensFiltradas: Postagem[] = []
        for (let postagemConsultada of this._postagens) {
            if(postagemConsultada instanceof PostagemAvancada) {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.existeHashtag(hashtag) || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            } else {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            }
        }
        return postagensFiltradas
    }
}
*/
class RedeSocial {
    constructor(repositorioDePerfis, repositorioDePostagens) {
        this._repPerfis = repositorioDePerfis;
        this._repPostagens = repositorioDePostagens;
    }
    get repPerfis() {
        return this._repPerfis;
    }
    get repPostagens() {
        return this._repPostagens;
    }
    //05) b) i)
    incluirPerfil(perfil) {
        if (this._repPerfis.consultar(perfil.id, perfil.nome, perfil.email)) {
            throw new Error("Perfil ja cadastrado.");
        }
        return this._repPerfis.incluir(perfil);
    }
    consultarPerfil(id, nome, email) {
        return this._repPerfis.consultar(id, nome, email);
    }
    incluirPostagem(postagem) {
        this._repPostagens.incluir(postagem);
        /*
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
        */
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
    obterPostagensPorPerfil(id) {
        let postagensdoPerfil = this._repPostagens.consultar(id, undefined, undefined, undefined);
        //Verificar se pode ser exibida
        let postagensFiltradas = postagensdoPerfil.filter((post) => {
            if (post instanceof PostagemAvancada) {
                return post.visualizacoesRestantes > 0;
            }
            return true;
        });
        return postagensFiltradas;
    }
    obterPostagensPorHashtag(hashtag) {
        // Obter postagens com a hashtag
        let postagens = this.repPostagens.consultar(undefined, undefined, hashtag, undefined);
        // Verificar se pode ser exibida
        let postagensFiltradas = [];
        postagens.forEach((post) => {
            if (post instanceof PostagemAvancada) {
                if (post.visualizacoesRestantes > 0) {
                    postagensFiltradas.push(post);
                }
                ;
            }
            ;
        });
        return postagensFiltradas;
    }
}
class App {
    constructor() {
        this._redeSocial = new RedeSocial(new RepositorioDePerfisArray(), new RepositorioDePostagensArray());
        this.CAMINHO_ARQUIVO_PERFIS = "../backup_perfis.txt";
        this.CAMINHO_ARQUIVO_POSTAGENS = "../backup_postagens.txt";
        //this.carregarPerfisDeArquivo();
        // this.carregarPostagensDeArquivo();
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
                '7 - Exibir Postagens por Perfil\n' +
                '8 - Exibir Postagens por Hashtag');
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
                    let perfilConsultado = this.pedirPerfil();
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
                    let hashtagsdaPostagem = input("Escreva a(s) hashtags a serem cadastradas precedidas de #. Deixe um espaço entre as hashtags: ");
                    let arrayhashtagsdaPostagem = hashtagsdaPostagem.replace("#", "").split(" ");
                    let perfildaPostagem = this._redeSocial.consultarPerfil(undefined, nomeperfildaPostagem, undefined);
                    let avancada = arrayhashtagsdaPostagem.length > 0;
                    let novaPostagem;
                    if (avancada) { // Verificando se tem hashtag na postagem
                        novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfildaPostagem, arrayhashtagsdaPostagem, 2);
                    }
                    else {
                        novaPostagem = new Postagem(idPostagem, textoPostagem, 0, 0, new Date(), perfildaPostagem);
                    }
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
                    //Pedir perfil para o usuário
                    let perfilDesejado = this.pedirPerfil();
                    if (perfilDesejado == null) {
                        break;
                    }
                    let idPerfilDesejado = perfilDesejado.id;
                    let postagensDoPerfilDesejado = this._redeSocial.obterPostagensPorPerfil(idPerfilDesejado);
                    postagensDoPerfilDesejado.forEach((post) => {
                        this.exibirPostagem(post);
                    });
                    break;
                case "8":
                    console.log("8 - Exibir Postagens Por Hashtag");
                    // Pedir hashtag para o usuário
                    let hashtagDesejada = input("Digite a hashtag desejada com #: ").replace("#", "");
                    let postagens = this._redeSocial.obterPostagensPorHashtag(hashtagDesejada);
                    postagens.forEach((post) => {
                        this.exibirPostagem(post);
                    });
                    break;
            }
            enter_para_continuar();
            limpar_tela();
        } while (opcao != "0");
        console.log("Iniciado o processo de gravação dos Perfis em arquivo.");
        let animacao = "";
        for (let i = 0; i < 5; i++) {
            let hifen = ".";
            animacao += hifen;
            console.log(animacao);
        }
        //this.salvarPerfisEmArquivo()
        console.log("Gravação de Perfis finalizada com sucesso!");
        console.log("");
        console.log("Iniciado o processo de gravação das Postagens em arquivo.");
        let animacao2 = "";
        for (let i = 0; i < 5; i++) {
            let hifen = ".";
            animacao2 += hifen;
            console.log(animacao2);
        }
        //this.salvarPostagensEmArquivo()
        console.log('Gravação finalizada com sucesso. Até a próxima! :D');
    }
    pedirPerfil() {
        let idConsulta = Number(input("ID do Perfil: "));
        let nomeConsulta = input("Nome do Perfil: ");
        let emailConsulta = input("Email do Perfil: ");
        let perfilConsultado = this._redeSocial.consultarPerfil(idConsulta, nomeConsulta, emailConsulta);
        return perfilConsultado;
    }
    exibirPostagem(post) {
        console.log(`Exibindo Postagem de ID ${post.id}`);
        console.log(`Escrita por ${post.perfil.nome} em ${post.data.toISOString()}`);
        console.log(post.texto);
        console.log(`${post.curtidas} curtidas - ${post.descurtidas} descurtidas`);
        if (post instanceof PostagemAvancada) {
            let hashtagString = "";
            post.hashtag.forEach((hashtag) => {
                hashtagString += hashtag + " ";
            });
            console.log(`Hashtags: ${hashtagString}`);
            post.decrementarVisualizacoes();
            console.log(`${post.visualizacoesRestantes} visualizações restantes.`);
        }
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
//# sourceMappingURL=questao12.js.map