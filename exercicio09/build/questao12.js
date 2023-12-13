"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const fs = __importStar(require("fs"));
let input = (0, prompt_sync_1.default)();
class Perfil {
    constructor(_id, _nome, _email) {
        this._postagens = [];
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
    get postagens() {
        return this._postagens;
    }
    incluirPostagem(postagem) {
        this._postagens.push(postagem);
    }
}
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
    curtir() {
        this._curtidas++;
    }
    descurtir() {
        this._descurtidas++;
    }
    ehPopular() {
        if (this._curtidas > (this._descurtidas / (50 / 100))) {
            return true;
        }
        else {
            return false;
        }
    }
}
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
    adicionarHashtag(hashtag) {
        this._hashtags.push(hashtag);
    }
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
    decrementarVisualizacoes() {
        this._visualizacoesRestantes--;
    }
}
class RepositorioDePerfisArray {
    constructor() {
        this._perfis = [];
    }
    get perfis() {
        return this._perfis;
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
    get perfis() {
        return this._perfis;
    }
    constructor() {
        this._perfis = [];
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
    }
    consultar(id, texto, hashtag, perfil) {
        let postagensFiltradas = [];
        for (let postagemConsultada of this._postagens) {
            if (postagemConsultada instanceof PostagemAvancada) {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.existeHashtag(hashtag) || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            }
            else if (postagemConsultada instanceof Postagem) {
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
    get postagens() {
        return this._postagens;
    }
    constructor() {
        this._postagens = [];
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
        return this._repPostagens.incluir(postagem);
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
        this.carregarPerfisDeArquivo();
        this.carregarPostagensDeArquivo();
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
            }
            enter_para_continuar();
            limpar_tela();
        } while (opcao != "0");
        console.log("Iniciado o processo de gravação dos Perfis em arquivo.");
        this.salvarPerfisEmArquivo();
        console.log("Gravação de Perfis finalizada com sucesso!");
        console.log("");
        console.log("Iniciado o processo de gravação das Postagens em arquivo.");
        this.salvarPostagensEmArquivo();
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
        console.log(`Exibindo Postagem de ID { ${post.id} }:`);
        console.log(`Escrita por ${post.perfil.nome} em ${post.data.toISOString()}`);
        console.log(post.texto);
        console.log(`${post.curtidas} curtidas - ${post.descurtidas} descurtidas`);
        if (post instanceof PostagemAvancada) {
            let hashtagString = "";
            post.hashtag.forEach((hashtag) => {
                hashtagString += '#' + hashtag + " ";
            });
            console.log(`Hashtags: ${hashtagString}`);
            post.decrementarVisualizacoes();
            console.log(`${post.visualizacoesRestantes} visualizações restantes.`);
        }
    }
    incluirPerfil() {
        console.log("Incluir Perfil:");
        let idPerfil;
        do {
            idPerfil = parseInt(input("ID do Perfil: "));
        } while (isNaN(idPerfil));
        let nomePerfil;
        do {
            nomePerfil = input("Nome do Perfil: ");
        } while (nomePerfil == "" || nomePerfil == " " || /^\D+$/.test(nomePerfil) == false);
        let emailPerfil;
        do {
            emailPerfil = input("Email do Perfil: ");
        } while (emailPerfil == "" || emailPerfil == " " || !emailPerfil.includes("@"));
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
        let perfilDaPostagem = this.validarPerfil(nomePerfilDaPostagem);
        let hashtagsDaPostagem = input("Escreva a(s) hashtags a serem cadastradas precedidas de #. Deixe um espaço entre as hashtags: ");
        let arrayHashtagsDaPostagem = hashtagsDaPostagem.replace(/^#/, "").split("#");
        arrayHashtagsDaPostagem = arrayHashtagsDaPostagem.map(hashtag => hashtag.trim());
        let avancada = arrayHashtagsDaPostagem.some(hashtag => hashtag !== '');
        //let avancada = arrayHashtagsDaPostagem.length > 0
        let novaPostagem;
        if (avancada) { // Verificando se tem hashtag na postagem
            novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem, arrayHashtagsDaPostagem, 2);
        }
        else {
            novaPostagem = new Postagem(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem);
        }
        this._redeSocial.incluirPostagem(novaPostagem);
        console.log(`Postagem com ID { ${novaPostagem.id} } incluida ao Perfil { ${novaPostagem.perfil.nome} }.`);
    }
    validarPerfil(nomePerfilDaPostagem) {
        let perfilDaPostagem = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        while (perfilDaPostagem == undefined) {
            nomePerfilDaPostagem = input("Digite um nome de Perfil existente: ");
            perfilDaPostagem = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        }
        return perfilDaPostagem;
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
            console.log();
        });
    }
    salvarPerfisEmArquivo() {
        let stringPerfis = "";
        let perfisASeremSalvos = this._redeSocial.repPerfis.perfis;
        for (let perfil of perfisASeremSalvos) {
            if (perfil) {
                stringPerfis += `${perfil.id}#${perfil.nome}#${perfil.email}\n`;
            }
        }
        fs.writeFileSync(this.CAMINHO_ARQUIVO_PERFIS, stringPerfis, 'utf-8');
    }
    carregarPerfisDeArquivo() {
        let conteudoArquivoPerfis = fs.readFileSync(this.CAMINHO_ARQUIVO_PERFIS, 'utf-8').split("\n");
        if (conteudoArquivoPerfis.length > 0 && conteudoArquivoPerfis[0].trim() == "") {
            conteudoArquivoPerfis.shift();
        }
        for (let i = 0; i < conteudoArquivoPerfis.length; i++) {
            let perfilCadastrado = conteudoArquivoPerfis[i].split("#");
            if (perfilCadastrado.length === 3) { // Certifique-se de que há três partes no perfil
                let novoPerfil = new Perfil(Number(perfilCadastrado[0]), perfilCadastrado[1], perfilCadastrado[2]);
                this._redeSocial.repPerfis.perfis.push(novoPerfil);
            }
        }
    }
    salvarPostagensEmArquivo() {
        let stringPostagens = "";
        for (let postagem of this._redeSocial.repPostagens.postagens) {
            if (postagem instanceof PostagemAvancada) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data.toISOString()}#${postagem.perfil.id}#${postagem.hashtag.join("#")}#${postagem.visualizacoesRestantes}\n`;
            }
            else if (postagem instanceof Postagem) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data.toISOString()}#${postagem.perfil.id}\n`;
            }
        }
        fs.writeFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, stringPostagens, 'utf-8');
    }
    carregarPostagensDeArquivo() {
        let conteudoArquivoPostagens = fs.readFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, 'utf-8').split("\n");
        if (conteudoArquivoPostagens.length > 0 && conteudoArquivoPostagens[0].trim() == "") {
            conteudoArquivoPostagens.shift();
        }
        for (let i = 0; i < conteudoArquivoPostagens.length; i++) {
            let dadosPostagem = conteudoArquivoPostagens[i].split("#");
            if (dadosPostagem.length >= 6) { // Certifique-se de que há pelo menos seis partes na postagem
                let id = Number(dadosPostagem[0]);
                let texto = dadosPostagem[1];
                let curtidas = parseInt(dadosPostagem[2]) || 0; // Usar 0 se não puder converter para número
                let descurtidas = parseInt(dadosPostagem[3]) || 0;
                let data = new Date(dadosPostagem[4]);
                let perfilId = Number(dadosPostagem[5]);
                let perfil = this._redeSocial.repPerfis.consultar(perfilId);
                if (perfil) {
                    if (dadosPostagem.length > 6) { // Se houver hashtags
                        let hashtags = dadosPostagem.slice(6);
                        let visualizacoesRestantes = Number(hashtags.pop()) || 0; // Último elemento é visualizações
                        let novaPostagem = new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visualizacoesRestantes);
                        this._redeSocial.repPostagens.incluir(novaPostagem);
                        perfil.incluirPostagem(novaPostagem);
                    }
                    else {
                        let novaPostagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil);
                        this._redeSocial.repPostagens.incluir(novaPostagem);
                        perfil.incluirPostagem(novaPostagem);
                    }
                }
            }
        }
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