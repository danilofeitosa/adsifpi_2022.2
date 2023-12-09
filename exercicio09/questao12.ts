import prompt from 'prompt-sync';
import * as fs from 'fs';
import { log } from 'console';

let input = prompt();

//1) a)
class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[] = [];

    constructor (_id: number, _nome: string, _email: string) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        //this._postagens = [];
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
        this._descurtidas = _descurtidas;
        this._data = _data;
        this._perfil = _perfil;
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
       this._hashtags.push(hashtag);
    }
//2) b) ii)
    existeHashtag(hashtag: string): boolean {
        for (let hashtagConsultada of this._hashtags) {
            if (hashtagConsultada == hashtag) {
                return true;
            } else {
                return false;
            }
        }
    }
//2) b) iii)
    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes--;
    }
}

interface IRepositorioDePerfis {
    incluir(perfil: Perfil): void;
    consultar(id: number, nome: string, email: string): Perfil; // | null;
}

class RepositorioDePerfisArray implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];

    incluir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }

    consultar(id: number, nome: string, email: string): Perfil {
        let perfilConsultado!: Perfil;
        for (let perfil of this._perfis) {
            if(perfil.id == id) {
                perfilConsultado = perfil;
                break;
            }
        }
        return perfilConsultado;
    }
}
/*
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
        return null;
    }
}
*/
interface IRepositorioDePostagens {
    incluir(postagem: Postagem): void;
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null; 
}

class RepositorioDePostagensArray implements IRepositorioDePostagens {
    private _postagens: Postagem[] = [];
    
    get postagens(): Postagem[] {
        return this._postagens;
    }

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
        postagem.perfil.postagens.push(postagem);
        console.log("Certo")
        /*
        if (perfilAssociado && perfilAssociado.postagens) {
            perfilAssociado.postagens.push(postagem);
        } else {
            console.error("O objeto 'perfilAssociado' ou 'postagens' é indefinido.");
        }
        */
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
//05) a)
    private _repPerfis: IRepositorioDePerfis; /*= new RepositorioDePerfis();*/
    private _repPostagens: IRepositorioDePostagens; /*= new RepositorioDePostagens();*/

    constructor(repositorioDePerfis: IRepositorioDePerfis, repositorioDePostagens: IRepositorioDePostagens) {
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
    incluirPerfil(perfil: Perfil): void {
        if(this._repPerfis.consultar(perfil.id, perfil.nome, perfil.email)) {
            throw new Error("Perfil ja cadastrado.");
        }
        return this._repPerfis.incluir(perfil);
    }
    
    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this._repPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {
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
    
    obterPostagensPorPerfil(id: number): Postagem[] {
        let postagensdoPerfil: Postagem[] = this._repPostagens.consultar(id, undefined, undefined, undefined);
        //Verificar se pode ser exibida
        let postagensFiltradas = postagensdoPerfil.filter((post) => {
            if(post instanceof PostagemAvancada) {
                return post.visualizacoesRestantes > 0;
            }
            return true;
        });
        return postagensFiltradas;
    }

    obterPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        // Obter postagens com a hashtag
        let postagens = this.repPostagens.consultar(undefined, undefined, hashtag, undefined);
        // Verificar se pode ser exibida
        let postagensFiltradas: PostagemAvancada[] = [];
        postagens.forEach((post) => {
            if(post instanceof PostagemAvancada) {
                if(post.visualizacoesRestantes > 0) {
                    postagensFiltradas.push(post);
                };
            };
        });
        return postagensFiltradas;
    }
}
class App {
    private _redeSocial: RedeSocial = new RedeSocial(new RepositorioDePerfisArray(), new RepositorioDePostagensArray());
    private CAMINHO_ARQUIVO_PERFIS: string = "../backup_perfis.txt";
    private CAMINHO_ARQUIVO_POSTAGENS: string = "../backup_postagens.txt";

    constructor() {
        //this.carregarPerfisDeArquivo();
        // this.carregarPostagensDeArquivo();
    }

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
                        '7 - Exibir Postagens por Perfil\n' +
                        '8 - Exibir Postagens por Hashtag');
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
                    let perfilConsultado = this.pedirPerfil();
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
                    let hashtagsdaPostagem: string = input("Escreva a(s) hashtags a serem cadastradas precedidas de #. Deixe um espaço entre as hashtags: ");
                    let arrayhashtagsdaPostagem: string[] = hashtagsdaPostagem.replace("#", "").split(" ");
                    let perfildaPostagem: Perfil = this._redeSocial.consultarPerfil(undefined, nomeperfildaPostagem, undefined);
                    let avancada = arrayhashtagsdaPostagem.length > 0
                    let novaPostagem;
                    if (avancada) { // Verificando se tem hashtag na postagem
                        novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfildaPostagem, arrayhashtagsdaPostagem, 2);    
                    } else {
                        novaPostagem = new Postagem(idPostagem, textoPostagem, 0, 0, new Date(), perfildaPostagem);    
                    }
                    this._redeSocial.incluirPostagem(novaPostagem);
                    //console.log(`Postagem do Perfil ${novaPostagem.perfil.nome} incluída com sucesso`);
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
                    })
                    break;
                case "8":
                    console.log("8 - Exibir Postagens Por Hashtag");
                    // Pedir hashtag para o usuário
                    let hashtagDesejada: string = input("Digite a hashtag desejada com #: ").replace("#", "")
                    let postagens = this._redeSocial.obterPostagensPorHashtag(hashtagDesejada)
                    postagens.forEach((post) => {
                        this.exibirPostagem(post);
                    });
                    break;
            }
            enter_para_continuar()
            limpar_tela()
        } while (opcao != "0");
            console.log("Iniciado o processo de gravação dos Perfis em arquivo.");
            let animacao = ""
            for (let i: number = 0; i < 5; i++) {
                let hifen = "."
                animacao += hifen
                console.log(animacao)
            }
            //this.salvarPerfisEmArquivo()
            console.log("Gravação de Perfis finalizada com sucesso!")
            console.log("")
            console.log("Iniciado o processo de gravação das Postagens em arquivo.")
            let animacao2 = ""
            for (let i: number = 0; i < 5; i++) {
                let hifen = "."
                animacao2 += hifen
                console.log(animacao2)
            }
            //this.salvarPostagensEmArquivo()
            console.log('Gravação finalizada com sucesso. Até a próxima! :D');
    }

    public pedirPerfil() {
        let idConsulta: number = Number(input("ID do Perfil: "));
        let nomeConsulta: string = input("Nome do Perfil: ");
        let emailConsulta: string = input("Email do Perfil: ");
        let perfilConsultado = this._redeSocial.consultarPerfil(idConsulta, nomeConsulta, emailConsulta);
        return perfilConsultado
    }

    public exibirPostagem(post: Postagem) {
        console.log(`Exibindo Postagem de ID ${post.id}`)
        console.log(`Escrita por ${post.perfil.nome} em ${post.data.toISOString()}`)
        console.log(post.texto)
        console.log(`${post.curtidas} curtidas - ${post.descurtidas} descurtidas`)
        if (post instanceof PostagemAvancada) {
            let hashtagString = ""
            post.hashtag.forEach((hashtag) => {
                hashtagString+= hashtag + " "
            })
            console.log(`Hashtags: ${hashtagString}`)
            post.decrementarVisualizacoes()
            console.log(`${post.visualizacoesRestantes} visualizações restantes.`)
        }
    }
    /*
    // Salvando os Perfis no arquivo ../backup_perfis.txt na ordem: id, nome, email e postagens.
    public salvarPerfisEmArquivo(): void {
        let stringPerfis: string = "";
        let perfisASeremSalvos = this._redeSocial.repPerfis.perfis;
        for (let perfil of perfisASeremSalvos) {
            if (perfil) {
                stringPerfis += `${perfil.id}#${perfil.nome}#${perfil.email}\n`
            }
        }
        // Pela redundância, achei melhor não salvar postagens aqui. Na hora da inicialização tentarei vincular as postagens aos seus respectivos perfis.
        fs.writeFileSync(this.CAMINHO_ARQUIVO_PERFIS, stringPerfis, 'utf-8');
    }
    // Salvando as Postagens no arquivo ../backup_postagens.txt na ordem: id, texto, curtidas, descurtidas, data, perfil, hashtags e visualizaçõesrestantes (estes 2 últimos em caso de postagens avançadas)
    */
    /*
    public salvarPostagensEmArquivo(): void {
        let stringPostagens: string = "";
        let postagensASeremSalvas = this._redeSocial.repPostagens.postagens;
        for (let postagem of postagensASeremSalvas) {
            if (postagem instanceof PostagemAvancada) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data}#${postagem.perfil.id}#${postagem.hashtag}#${postagem.visualizacoesRestantes}\n`
            } else {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data}${postagem.perfil.id}#\n`
            }
        }
        // Pela redundância, achei melhor não salvar postagens aqui. Na hora da inicialização irei vincular as postagens aos seus respectivos perfis.
        fs.writeFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, stringPostagens, 'utf-8');
    }
*//*
    public carregarPerfisDeArquivo(): void {
        let perfis: Perfil[] = []
        let conteudoArquivoPerfis: string[] = fs.readFileSync(this.CAMINHO_ARQUIVO_PERFIS, 'utf-8').split("\n");
        if (conteudoArquivoPerfis.length > 0 && conteudoArquivoPerfis[0].trim() == "") {
            conteudoArquivoPerfis.shift();
        }
        // Fiz esse IF para quando o arquivo de texto estiver vazio, ele ignorar a primeira linha vazia.
        let perfilCadastrado: string[] = []
        for(let i = 0; i < conteudoArquivoPerfis.length; i++) {
                perfilCadastrado = conteudoArquivoPerfis[i].split("#")
                let novoPerfil = new Perfil(Number(perfilCadastrado[0]), perfilCadastrado[1], perfilCadastrado[2])
                perfis[i] = novoPerfil
                this._redeSocial.repPerfis.perfis.push(perfis[i])
        }
    }
*//*
    public carregarPostagensDeArquivo(): void {
        let postagens: Postagem[] = []
        let conteudoArquivoPostagens: string[] = fs.readFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, 'utf-8').split("\n");
        if (conteudoArquivoPostagens.length > 0 && conteudoArquivoPostagens[0].trim() == "") {
            conteudoArquivoPostagens.shift();
        }
        // Fiz esse IF para quando o arquivo de texto estiver vazio, ele ignorar a primeira linha vazia.
        let postagemCadastrada: string[] = []
        for(let i = 0; i < conteudoArquivoPostagens.length; i++) {
            postagemCadastrada = conteudoArquivoPostagens[i].split("#")
            if (postagemCadastrada instanceof PostagemAvancada) {
                let novaPostagem = new PostagemAvancada(Number(postagemCadastrada[0]), postagemCadastrada[1], Number(postagemCadastrada[2]), Number(postagemCadastrada[3]), new Date(postagemCadastrada[4]), new Perfil(Number(postagemCadastrada[5][0]), postagemCadastrada[5][1], postagemCadastrada[5][2]), postagemCadastrada[6].split("") /* Como fazer para criar o array de hashtags no carregamento do arquivo? Substituir (postagemCadastrada[6].split("")) pela resposta *//*, Number(postagemCadastrada[7]))
                postagens[i] = novaPostagem
                this._redeSocial.repPostagens.postagens.push(postagens[i])
            } else {
                let novaPostagem = new Postagem(Number(postagemCadastrada[0]), postagemCadastrada[1], Number(postagemCadastrada[2]), Number(postagemCadastrada[3]), new Date(postagemCadastrada[4]), new Perfil(Number(postagemCadastrada[5][0]), postagemCadastrada[5][1], postagemCadastrada[5][2]))
                postagens[i] = novaPostagem
                this._redeSocial.repPostagens.postagens.push(postagens[i])
            }    
        }
    }*/
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