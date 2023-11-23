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
class RedeSocial {
    constructor() {
        //05) a)
        this._repPerfis = new RepositorioDePerfis();
        this._repPostagens = new RepositorioDePostagens();
    }
    get repPerfis() {
        return this._repPerfis;
    }
    get repPostagens() {
        return this._repPostagens;
    }
    //05) b) i)
    incluirPerfil(perfil) {
        return this._repPerfis.incluir(perfil);
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
        this._redeSocial = new RedeSocial;
        this.CAMINHO_ARQUIVO_PERFIS = "../backup_perfis.txt";
        this.CAMINHO_ARQUIVO_POSTAGENS = "../backup_postagens.txt";
        this.carregarPerfisDeArquivo();
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
        this.salvarPerfisEmArquivo();
        console.log("Gravação de Perfis finalizada com sucesso!");
        console.log("");
        console.log("Iniciado o processo de gravação das Postagens em arquivo.");
        let animacao2 = "";
        for (let i = 0; i < 5; i++) {
            let hifen = ".";
            animacao2 += hifen;
            console.log(animacao2);
        }
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
    // Salvando os Perfis no arquivo ../backup_perfis.txt na ordem: id, nome, email e postagens.
    salvarPerfisEmArquivo() {
        let stringPerfis = "";
        let perfisASeremSalvos = this._redeSocial.repPerfis.perfis;
        for (let perfil of perfisASeremSalvos) {
            if (perfil) {
                stringPerfis += `${perfil.id}#${perfil.nome}#${perfil.email}\n`;
            }
        }
        // Pela redundância, achei melhor não salvar postagens aqui. Na hora da inicialização tentarei vincular as postagens aos seus respectivos perfis.
        fs.writeFileSync(this.CAMINHO_ARQUIVO_PERFIS, stringPerfis, 'utf-8');
    }
    // Salvando as Postagens no arquivo ../backup_postagens.txt na ordem: id, texto, curtidas, descurtidas, data, perfil, hashtags e visualizaçõesrestantes (estes 2 últimos em caso de postagens avançadas)
    salvarPostagensEmArquivo() {
        let stringPostagens = "";
        let postagensASeremSalvas = this._redeSocial.repPostagens.postagens;
        for (let postagem of postagensASeremSalvas) {
            if (postagem instanceof PostagemAvancada) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data}#${postagem.perfil.id}#${postagem.hashtag}#${postagem.visualizacoesRestantes}\n`;
            }
            else {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data}${postagem.perfil.id}#\n`;
            }
        }
        // Pela redundância, achei melhor não salvar postagens aqui. Na hora da inicialização irei vincular as postagens aos seus respectivos perfis.
        fs.writeFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, stringPostagens, 'utf-8');
    }
    carregarPerfisDeArquivo() {
        let perfis = [];
        let conteudoArquivoPerfis = fs.readFileSync(this.CAMINHO_ARQUIVO_PERFIS, 'utf-8').split("\n");
        if (conteudoArquivoPerfis.length > 0 && conteudoArquivoPerfis[0].trim() == "") {
            conteudoArquivoPerfis.shift();
        }
        // Fiz esse IF para quando o arquivo de texto estiver vazio, ele ignorar a primeira linha vazia.
        let perfilCadastrado = [];
        for (let i = 0; i < conteudoArquivoPerfis.length; i++) {
            perfilCadastrado = conteudoArquivoPerfis[i].split("#");
            let novoPerfil = new Perfil(Number(perfilCadastrado[0]), perfilCadastrado[1], perfilCadastrado[2]);
            perfis[i] = novoPerfil;
            this._redeSocial.repPerfis.perfis.push(perfis[i]);
        }
    }
    carregarPostagensDeArquivo() {
        let postagens = [];
        let conteudoArquivoPostagens = fs.readFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, 'utf-8').split("\n");
        if (conteudoArquivoPostagens.length > 0 && conteudoArquivoPostagens[0].trim() == "") {
            conteudoArquivoPostagens.shift();
        }
        // Fiz esse IF para quando o arquivo de texto estiver vazio, ele ignorar a primeira linha vazia.
        let postagemCadastrada = [];
        for (let i = 0; i < conteudoArquivoPostagens.length; i++) {
            postagemCadastrada = conteudoArquivoPostagens[i].split("#");
            if (postagemCadastrada instanceof PostagemAvancada) {
                let novaPostagem = new PostagemAvancada(Number(postagemCadastrada[0]), postagemCadastrada[1], Number(postagemCadastrada[2]), Number(postagemCadastrada[3]), new Date(postagemCadastrada[4]), new Perfil(Number(postagemCadastrada[5][0]), postagemCadastrada[5][1], postagemCadastrada[5][2]), postagemCadastrada[6].split("") /*Como fazer para criar o array de hashtags no carregamento do arquivo? Substituir (postagemCadastrada[6].split("")) pela resposta*/, Number(postagemCadastrada[7]));
                postagens[i] = novaPostagem;
                this._redeSocial.repPostagens.postagens.push(postagens[i]);
            }
            else {
                let novaPostagem = new Postagem(Number(postagemCadastrada[0]), postagemCadastrada[1], Number(postagemCadastrada[2]), Number(postagemCadastrada[3]), new Date(postagemCadastrada[4]), new Perfil(Number(postagemCadastrada[5][0]), postagemCadastrada[5][1], postagemCadastrada[5][2]));
                postagens[i] = novaPostagem;
                this._redeSocial.repPostagens.postagens.push(postagens[i]);
            }
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
//# sourceMappingURL=avaliacao01.js.map