"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
let input = (0, prompt_sync_1.default)();
//1) a)
class Perfil {
    //private _postagens: Postagem[] = [];
    constructor(_id, _nome, _email) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        //this._postagens = [];
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
            if (perfil.id == id || perfil.nome == nome || perfil.email == email) {
                perfilConsultado = perfil;
                break;
            }
        }
        return perfilConsultado;
    }
}
class Nodo {
    constructor(perfil) {
        this.perfil = perfil;
        this.proximo = null;
    }
}
class RepositorioDePerfisLista {
    constructor() {
        this.cabeca = null;
    }
    incluir(perfil) {
        const novoNodo = new Nodo(perfil);
        if (this.cabeca == null) {
            this.cabeca = novoNodo;
        }
        else {
            let atual = this.cabeca;
            while (atual.proximo != null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNodo;
        }
    }
    consultar(id, nome, email) {
        let atual = this.cabeca;
        while (atual != null) {
            if (atual.perfil.id == id || atual.perfil.nome == nome || atual.perfil.email == email) {
                return atual.perfil;
            }
            atual = atual.proximo;
        }
        return null;
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
        // postagem.perfil.postagens.push(postagem);
        //console.log("Certo")
        /*
        if (perfilAssociado && perfilAssociado.postagens) {
            perfilAssociado.postagens.push(postagem);
        } else {
            console.error("O objeto 'perfilAssociado' ou 'postagens' é indefinido.");
        }
        */
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
class NodoPostagem {
    constructor(postagem) {
        this.postagem = postagem;
        this.proximo = null;
    }
}
class RepositorioDePostagensLista {
    constructor() {
        this.cabeca = null;
    }
    incluir(postagem) {
        const novoNodo = new NodoPostagem(postagem);
        if (this.cabeca === null) {
            this.cabeca = novoNodo;
        }
        else {
            let atual = this.cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNodo;
        }
    }
    consultar(id, texto, hashtag, perfil) {
        let postagensFiltradas = [];
        let atual = this.cabeca;
        while (atual !== null) {
            const postagemAtual = atual.postagem;
            if (postagemAtual.id === id ||
                postagemAtual.texto === texto ||
                (postagemAtual instanceof PostagemAvancada && postagemAtual.existeHashtag(hashtag)) ||
                postagemAtual.perfil === perfil) {
                postagensFiltradas.push(postagemAtual);
            }
            atual = atual.proximo;
        }
        return postagensFiltradas.length > 0 ? postagensFiltradas : null;
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
            throw new PerfilJaCadastrado();
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
    constructor(mecanismoPersistencia) {
        this.mecanismoPersistencia = mecanismoPersistencia;
        this.CAMINHO_ARQUIVO_PERFIS = "../backup_perfis.txt";
        this.CAMINHO_ARQUIVO_POSTAGENS = "../backup_postagens.txt";
        try {
            if (mecanismoPersistencia == 1) {
                this._redeSocial = new RedeSocial(new RepositorioDePerfisArray(), new RepositorioDePostagensArray());
            }
            else if (mecanismoPersistencia == 2) {
                this._redeSocial = new RedeSocial(new RepositorioDePerfisLista(), new RepositorioDePostagensLista());
            }
        }
        catch (error) {
            if (error instanceof OpcaoInvalida) {
                console.log(error.message);
            }
        }
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
            try {
                switch (opcao) {
                    case "1":
                        this.incluirPerfil();
                        break;
                    case "2":
                        this.consultarPerfil();
                        break;
                    case "3":
                        this.incluirPostagem();
                        break;
                    case "4":
                        this.consultarPostagem();
                        break;
                    case "5":
                        this.curtirPostagem();
                        break;
                    case "6":
                        this.descurtirPostagem();
                        break;
                    case "7":
                        this.exibirPostagensPorPerfil();
                        break;
                    case "8":
                        this.exibirPostagensPorHashtag();
                        break;
                }
            }
            catch (error) {
                if (error instanceof AplicacaoError) {
                    console.log(error.message);
                }
                /*
                if (error instanceof PerfilJaCadastrado) {
                    console.log(`ID ja cadastrado`)
                }
                */
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
    incluirPerfil() {
        console.log("Incluir Perfil:");
        let idPerfil = parseInt(input("ID do Perfil: "));
        let nomePerfil = input("Nome do Perfil: ");
        let emailPerfil = input("Email do Perfil: ");
        let novoperfil = new Perfil(idPerfil, nomePerfil, emailPerfil);
        this._redeSocial.incluirPerfil(novoperfil);
        console.log(`Perfil { ${novoperfil.nome} } incluído com sucesso!`);
    }
    consultarPerfil() {
        console.log("2 - Consultar Perfil");
        let perfilConsultado = this.pedirPerfil();
        if (perfilConsultado != null) {
            console.log(`Perfil com ID { ${perfilConsultado.id} }, nome { ${perfilConsultado.nome} } e email { ${perfilConsultado.email} } encontrado!`);
        }
        else {
            console.log(`Nenhum Perfil encontrado com o(s) parâmetro(s) fornecido(s), refaça a consulta!`);
        }
    }
    incluirPostagem() {
        console.log("3 - Incluir Postagem");
        let idPostagem = parseInt(input("ID da Postagem: "));
        let textoPostagem = input("Texto da Postagem: ");
        let nomePerfilDaPostagem = input("Qual o nome do Perfil?: ");
        let perfilDaPostagem = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        while (perfilDaPostagem == undefined) {
            nomePerfilDaPostagem = input("Digite um nome de Perfil existente: ");
            perfilDaPostagem = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        }
        let hashtagsDaPostagem = input("Escreva a(s) hashtags a serem cadastradas precedidas de #. Deixe um espaço entre as hashtags: ");
        let arrayHashtagsDaPostagem = hashtagsDaPostagem.replace(/^#/, "").split("#");
        arrayHashtagsDaPostagem = arrayHashtagsDaPostagem.map(hashtag => hashtag.trim());
        let avancada = arrayHashtagsDaPostagem.length > 0;
        let novaPostagem;
        if (avancada) { // Verificando se tem hashtag na postagem
            novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem, arrayHashtagsDaPostagem, 2);
        }
        else {
            novaPostagem = new Postagem(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem);
        }
        this._redeSocial.incluirPostagem(novaPostagem);
        //console.log(`Postagem do Perfil ${novaPostagem.perfil.nome} incluída com sucesso`);
    }
    consultarPostagem() {
        console.log("4 - Consultar Postagem");
        let idPostagemConsultada = parseInt(input("ID da Postagem a ser consultada: "));
        let textoPostagemConsultada = input("Texto da Postagem a ser consultada: ");
        let hashtagPostagemConsultada = input("Hashtag da Postagem a ser consultada: ");
        let nomePerfilPostagemConsultada = input("Nome do Perfil da Postagem a ser consultada: ");
        let perfildaPostagemConsultada = this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined);
        let postagemConsultada = this._redeSocial.consultarPostagens(idPostagemConsultada, textoPostagemConsultada, hashtagPostagemConsultada, perfildaPostagemConsultada);
        console.log(postagemConsultada);
        console.log(this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined));
    }
    curtirPostagem() {
        console.log("5 - Curtir Postagem");
        let idCurtirPostagem = parseInt(input("ID da Postagem a ser curtida: "));
        this._redeSocial.curtir(idCurtirPostagem);
        console.log(`Postagem curtida ♥`);
    }
    descurtirPostagem() {
        console.log("6 - Descurtir Postagem");
        let idDescurtirPostagem = parseInt(input("ID da Postagem a ser descurtida: "));
        this._redeSocial.descurtir(idDescurtirPostagem);
        console.log(`Postagem descurtida ☹`);
    }
    exibirPostagensPorPerfil() {
        console.log("7 - Exibir Postagens Por Perfil");
        //Pedir perfil para o usuário
        let perfilDesejado = this.pedirPerfil();
        if (perfilDesejado != null) {
            let idPerfilDesejado = perfilDesejado.id;
            let postagensDoPerfilDesejado = this._redeSocial.obterPostagensPorPerfil(idPerfilDesejado);
            postagensDoPerfilDesejado.forEach((post) => {
                this.exibirPostagem(post);
            });
        }
    }
    exibirPostagensPorHashtag() {
        console.log("8 - Exibir Postagens Por Hashtag");
        // Pedir hashtag para o usuário
        let hashtagDesejada = input("Digite a hashtag desejada com #: ").replace(/^#/, "");
        let postagens = this._redeSocial.obterPostagensPorHashtag(hashtagDesejada);
        postagens.forEach((post) => {
            this.exibirPostagem(post);
        });
    }
}
class AplicacaoError extends Error {
    constructor(message) {
        super(message);
    }
}
class PerfilInexistente extends AplicacaoError {
    constructor(message = 'Perfil nao existe com o parametro informado') {
        super(message);
    }
}
class PerfilJaCadastrado extends AplicacaoError {
    constructor(message = 'ID Perfil ja cadastrado.') {
        super(message);
    }
}
class PostagemJaCadastrada extends AplicacaoError {
    constructor(message = 'ID Postagem ja cadastrada.') {
        super(message);
    }
}
class PostagemInexistente extends AplicacaoError {
    constructor(message = 'Postagem inexistente com o parametro informado.') {
        super(message);
    }
}
class OpcaoInvalida extends AplicacaoError {
    constructor(message = 'Escolha uma opcao valida.') {
        super(message);
    }
}
function main() {
    console.log('1 - Array\n' +
        '2 - Lista Encadeada');
    let mecanismoPersistencia = Number(input('Escolher mecanismo de persitencia do App: '));
    while (mecanismoPersistencia < 0 || mecanismoPersistencia > 2) {
        mecanismoPersistencia = Number(input('Escolha um numero valido: '));
    }
    let meuApp = new App(mecanismoPersistencia);
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