import prompt from 'prompt-sync';
import * as fs from 'fs';
import { log } from 'console';

let input = prompt();

class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[] = [];

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

    get postagens(): Postagem[] {
        return this._postagens
    }

    incluirPostagem(postagem: Postagem): void {
        this._postagens.push(postagem);
    }
}

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

    curtir(): void {
        this._curtidas++
    }

    descurtir(): void {
        this._descurtidas++
    }

    ehPopular(): boolean {
        if(this._curtidas > (this._descurtidas / (50 / 100))) {
            return true
        } else {
            return false
        }
    }
}

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

    adicionarHashtag(hashtag: string): void {
       this._hashtags.push(hashtag);
    }

    existeHashtag(hashtag: string): boolean {
        for (let hashtagConsultada of this._hashtags) {
            if (hashtagConsultada == hashtag) {
                return true;
            } else {
                return false;
            }
        }
    }

    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes--;
    }
}

interface IRepositorioDePerfis {
    perfis: Perfil[];
    incluir(perfil: Perfil): void;
    consultar(id?: number, nome?: string, email?: string): Perfil; // | null;
    // obterArraydePerfis(): Perfil[];
}

class RepositorioDePerfisArray implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];

    get perfis(): Perfil[] {
        return this._perfis;
    }

    incluir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }

    consultar(id?: number, nome?: string, email?: string): Perfil {
        let perfilConsultado!: Perfil;
    
        for (let perfil of this._perfis) {
            if(perfil.id == id || perfil.nome == nome || perfil.email == email) {
                perfilConsultado = perfil;
                break;
            }
        }
        return perfilConsultado;
    }
    /*
    obterArraydePerfis(): Perfil[] {
        return this._perfis;
    }
    */
}

class Nodo {
    perfil: Perfil;
    proximo: Nodo | null;

    constructor (perfil: Perfil) {
        this.perfil = perfil;
        this.proximo = null;
    }
}

class RepositorioDePerfisLista implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];
    private cabeca: Nodo | null;

    get perfis(): Perfil[] {
        return this._perfis;
    }

    constructor() {
        this.cabeca = null;
    }
    /*
    obterArraydePerfis(): Perfil[] {
        const arrayPerfis: Perfil[] = [];
        let atual: Nodo | null = this.cabeca;

        while (atual !== null) {
            arrayPerfis.push(atual.perfil);
            atual = atual.proximo;
        }

        return arrayPerfis;
    }
    */
    incluir(perfil: Perfil): void {
        const novoNodo = new Nodo(perfil);

        if (this.cabeca == null) {
            this.cabeca = novoNodo;
        } else {
            let atual = this.cabeca;

            while (atual.proximo != null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNodo;
        }
    }

    consultar(id?: number, nome?: string, email?: string): Perfil {
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

interface IRepositorioDePostagens {
    postagens: Postagem[];
    incluir(postagem: Postagem): void;
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null; 
    // obterArrayDePostagens(): Postagem[];
}

class RepositorioDePostagensArray implements IRepositorioDePostagens {
    private _postagens: Postagem[] = [];
    
    get postagens(): Postagem[] {
        return this._postagens;
    }

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
    }

    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null {
        let postagensFiltradas: Postagem[] = []
        for (let postagemConsultada of this._postagens) {
            if(postagemConsultada instanceof PostagemAvancada) {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.existeHashtag(hashtag) || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            } else if (postagemConsultada instanceof Postagem) {
                if (postagemConsultada.id == id || postagemConsultada.texto == texto || postagemConsultada.perfil == perfil) {
                    postagensFiltradas.push(postagemConsultada);
                }
            }
        }
        return postagensFiltradas
    }
    /*
    obterArrayDePostagens(): Postagem[] {
        return this._postagens;
    }
    */
}

class NodoPostagem {
    postagem: Postagem;
    proximo: NodoPostagem | null;

    constructor(postagem: Postagem) {
        this.postagem = postagem;
        this.proximo = null;
    }
}

class RepositorioDePostagensLista implements IRepositorioDePostagens {
    private _postagens: Postagem[] = [];
    private cabeca: NodoPostagem | null;

    get postagens(): Postagem[] {
        return this._postagens;
    }

    constructor() {
        this.cabeca = null;
    }

    incluir(postagem: Postagem): void {
        const novoNodo = new NodoPostagem(postagem);

        if (this.cabeca === null) {
            this.cabeca = novoNodo;
        } else {
            let atual: NodoPostagem | null = this.cabeca;

            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNodo;
        }
    }

    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] | null {
        let postagensFiltradas: Postagem[] = [];
        let atual: NodoPostagem | null = this.cabeca;

        while (atual !== null) {
            const postagemAtual = atual.postagem;

            if (
                postagemAtual.id === id ||
                postagemAtual.texto === texto ||
                (postagemAtual instanceof PostagemAvancada && postagemAtual.existeHashtag(hashtag)) ||
                postagemAtual.perfil === perfil
            ) {
                postagensFiltradas.push(postagemAtual);
            }
            atual = atual.proximo;
        }
        return postagensFiltradas.length > 0 ? postagensFiltradas : null;
    }
    /*
    obterArrayDePostagens(): Postagem[] {
        const arrayPostagens: Postagem[] = [];
        let atual: NodoPostagem | null = this.cabeca;

        while (atual !== null) {
            arrayPostagens.push(atual.postagem);
            atual = atual.proximo;
        }

        return arrayPostagens;
    }
    */
}
class RedeSocial {

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
    

    incluirPerfil(perfil: Perfil): void {
        if (this._repPerfis.consultar(perfil.id, perfil.nome, perfil.email)) {
            throw new PerfilJaCadastrado();
        }
        return this._repPerfis.incluir(perfil);
    }
    
    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this._repPerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {
        return this._repPostagens.incluir(postagem);
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
                    postagensFiltradas.push(post)
                };
            };
        });
        return postagensFiltradas;
    }
}
class App {
    private _redeSocial: RedeSocial; 
    private CAMINHO_ARQUIVO_PERFIS: string = "../backup_perfis.txt";
    private CAMINHO_ARQUIVO_POSTAGENS: string = "../backup_postagens.txt";

    constructor(private mecanismoPersistencia: number) {
        try{
            if (mecanismoPersistencia == 1) {
                this._redeSocial = new RedeSocial(new RepositorioDePerfisArray(), new RepositorioDePostagensArray());
            } else if (mecanismoPersistencia == 2) {
                this._redeSocial = new RedeSocial(new RepositorioDePerfisLista(), new RepositorioDePostagensLista());
            }
        } catch(error: any) {
            if (error instanceof OpcaoInvalida) {
                console.log(error.message);
            }
        }
        this.carregarPerfisDeArquivo();
        this.carregarPostagensDeArquivo();
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
            try{
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
            } catch (error: any) {
                if (error instanceof AplicacaoError) {
                    console.log(error.message);
                }
            }
            enter_para_continuar()
            limpar_tela()
        } while (opcao != "0");
            console.log("Iniciado o processo de gravação dos Perfis em arquivo.");
            this.salvarPerfisEmArquivo()
            console.log("Gravação de Perfis finalizada com sucesso!")
            console.log("")
            console.log("Iniciado o processo de gravação das Postagens em arquivo.")
            this.salvarPostagensEmArquivo()
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
        console.log(`Exibindo Postagem de ID { ${post.id} }:`)
        console.log(`Escrita por ${post.perfil.nome} em ${post.data.toISOString()}`)
        console.log(post.texto)
        console.log(`${post.curtidas} curtidas - ${post.descurtidas} descurtidas`)
        if (post instanceof PostagemAvancada) {
            let hashtagString = ""
            post.hashtag.forEach((hashtag) => {
                hashtagString+= '#' + hashtag + " "
            })
            console.log(`Hashtags: ${hashtagString}`)
            post.decrementarVisualizacoes()
            console.log(`${post.visualizacoesRestantes} visualizações restantes.`)
        }
    }
    
    public incluirPerfil() {
        console.log("Incluir Perfil:" );
        let idPerfil: number;
        do {
            idPerfil = parseInt(input("ID do Perfil: "));
        } while (isNaN(idPerfil));

        let nomePerfil: string;
        do {
            nomePerfil = input("Nome do Perfil: ");
        } while (nomePerfil == "" || nomePerfil == " " || /^\D+$/.test(nomePerfil) == false);

        let emailPerfil: string;
        do {
            emailPerfil = input("Email do Perfil: ");
        } while(emailPerfil == "" || emailPerfil == " " || !emailPerfil.includes("@"));
        let novoperfil: Perfil = new Perfil(idPerfil, nomePerfil, emailPerfil);
        this._redeSocial.incluirPerfil(novoperfil);
        console.log(`Perfil { ${novoperfil.nome} } incluído com sucesso!`);
    }

    public consultarPerfil() {
        console.log("2 - Consultar Perfil");
        let perfilConsultado = this.pedirPerfil();
        if(perfilConsultado != null) {
            console.log(`Perfil com ID { ${perfilConsultado.id} }, nome { ${perfilConsultado.nome} } e email { ${perfilConsultado.email} } encontrado!`);
        } else {
            console.log(`Nenhum Perfil encontrado com o(s) parâmetro(s) fornecido(s), refaça a consulta!`);
        }
    }

    public incluirPostagem() {
        console.log("3 - Incluir Postagem");
        let idPostagem: number = parseInt(input("ID da Postagem: "));
        let textoPostagem: string = input("Texto da Postagem: ");
        let nomePerfilDaPostagem: string = input("Qual o nome do Perfil?: ");
        let perfilDaPostagem = this.validarPerfil(nomePerfilDaPostagem);
        let hashtagsDaPostagem: string = input("Escreva a(s) hashtags a serem cadastradas precedidas de #. Deixe um espaço entre as hashtags: ");
        let arrayHashtagsDaPostagem: string[] = hashtagsDaPostagem.replace(/^#/, "").split("#");
        arrayHashtagsDaPostagem = arrayHashtagsDaPostagem.map(hashtag => hashtag.trim());
        let avancada = arrayHashtagsDaPostagem.some(hashtag => hashtag !== '');
        //let avancada = arrayHashtagsDaPostagem.length > 0
        let novaPostagem;
        if (avancada) { // Verificando se tem hashtag na postagem
            novaPostagem = new PostagemAvancada(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem, arrayHashtagsDaPostagem, 2);    
        } else {
            novaPostagem = new Postagem(idPostagem, textoPostagem, 0, 0, new Date(), perfilDaPostagem);    
        }
        this._redeSocial.incluirPostagem(novaPostagem);
        console.log(`Postagem com ID { ${novaPostagem.id} } incluida ao Perfil { ${novaPostagem.perfil.nome} }.`);
    }

    public validarPerfil (nomePerfilDaPostagem: string): Perfil | null {
        let perfilDaPostagem: Perfil = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        while(perfilDaPostagem == undefined) {
            nomePerfilDaPostagem = input("Digite um nome de Perfil existente: ");
            perfilDaPostagem = this._redeSocial.consultarPerfil(undefined, nomePerfilDaPostagem, undefined);
        }
        return perfilDaPostagem;
    }

    public consultarPostagem() {
        console.log("4 - Consultar Postagem");
        let idPostagemConsultada: number = parseInt(input("ID da Postagem a ser consultada: "));
        let textoPostagemConsultada: string = input("Texto da Postagem a ser consultada: ");
        let hashtagPostagemConsultada: string = input("Hashtag da Postagem a ser consultada: ");
        let nomePerfilPostagemConsultada: string = input("Nome do Perfil da Postagem a ser consultada: ");
        let perfildaPostagemConsultada: Perfil = this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined);
        let postagemConsultada = this._redeSocial.consultarPostagens(idPostagemConsultada, textoPostagemConsultada, hashtagPostagemConsultada, perfildaPostagemConsultada);
        console.log(postagemConsultada);
        console.log(this._redeSocial.consultarPerfil(undefined, nomePerfilPostagemConsultada, undefined));
    }

    public curtirPostagem() {
        console.log("5 - Curtir Postagem");
        let idCurtirPostagem: number = parseInt(input("ID da Postagem a ser curtida: "));
        this._redeSocial.curtir(idCurtirPostagem);
        console.log(`Postagem curtida ♥`);
    }

    public descurtirPostagem() {
        console.log("6 - Descurtir Postagem");
        let idDescurtirPostagem: number = parseInt(input("ID da Postagem a ser descurtida: "));
        this._redeSocial.descurtir(idDescurtirPostagem);
        console.log(`Postagem descurtida ☹`);
    }

    public exibirPostagensPorPerfil() {
        console.log("7 - Exibir Postagens Por Perfil");
        //Pedir perfil para o usuário
        let perfilDesejado = this.pedirPerfil();
        if (perfilDesejado != null) {
            let idPerfilDesejado = perfilDesejado.id;
            let postagensDoPerfilDesejado = this._redeSocial.obterPostagensPorPerfil(idPerfilDesejado);
            postagensDoPerfilDesejado.forEach((post) => {
                this.exibirPostagem(post);
            })
        }
    }

    public exibirPostagensPorHashtag() {
        console.log("8 - Exibir Postagens Por Hashtag");
        // Pedir hashtag para o usuário
        let hashtagDesejada: string = input("Digite a hashtag desejada com #: ").replace(/^#/, "")
        let postagens = this._redeSocial.obterPostagensPorHashtag(hashtagDesejada)
        postagens.forEach((post) => {
            this.exibirPostagem(post);
            console.log()
        });
    }

    public salvarPerfisEmArquivo(): void {
        
        let stringPerfis: string = "";
        let perfisASeremSalvos = this._redeSocial.repPerfis.perfis;
        for (let perfil of perfisASeremSalvos) {
            if (perfil) {
                stringPerfis += `${perfil.id}#${perfil.nome}#${perfil.email}\n`
            }
        }
        fs.writeFileSync(this.CAMINHO_ARQUIVO_PERFIS, stringPerfis, 'utf-8');
    }

    public carregarPerfisDeArquivo(): void {
        let conteudoArquivoPerfis: string[] = fs.readFileSync(this.CAMINHO_ARQUIVO_PERFIS, 'utf-8').split("\n");

        if (conteudoArquivoPerfis.length > 0 && conteudoArquivoPerfis[0].trim() == "") {
            conteudoArquivoPerfis.shift();
        }

        for(let i = 0; i < conteudoArquivoPerfis.length; i++) {
            let perfilCadastrado = conteudoArquivoPerfis[i].split("#");
    
            if (perfilCadastrado.length === 3) { // Certifique-se de que há três partes no perfil
                let novoPerfil = new Perfil(Number(perfilCadastrado[0]), perfilCadastrado[1], perfilCadastrado[2]);
                this._redeSocial.repPerfis.perfis.push(novoPerfil);
            }
        }
    }

    public salvarPostagensEmArquivo(): void {
        let stringPostagens: string = "";
    
        for (let postagem of this._redeSocial.repPostagens.postagens) {
            if (postagem instanceof PostagemAvancada) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data.toISOString()}#${postagem.perfil.id}#${postagem.hashtag.join("#")}#${postagem.visualizacoesRestantes}\n`;
            } else if (postagem instanceof Postagem) {
                stringPostagens += `${postagem.id}#${postagem.texto}#${postagem.curtidas}#${postagem.descurtidas}#${postagem.data.toISOString()}#${postagem.perfil.id}\n`;
            }
        }
    
        fs.writeFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, stringPostagens, 'utf-8');
    }
    
    public carregarPostagensDeArquivo(): void {
        let conteudoArquivoPostagens: string[] = fs.readFileSync(this.CAMINHO_ARQUIVO_POSTAGENS, 'utf-8').split("\n");
    
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
                    } else {
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
    constructor (message: string) {
        super(message);
    }
}

class PerfilInexistente extends AplicacaoError {
    constructor (message: string = 'Perfil nao existe com o parametro informado') {
        super(message);
    }
}

class PerfilJaCadastrado extends AplicacaoError {
    constructor (message: string = 'ID Perfil ja cadastrado.') {
        super(message);
    }
}

class PostagemJaCadastrada extends AplicacaoError {
    constructor (message: string = 'ID Postagem ja cadastrada.') {
        super(message);
    }
}

class PostagemInexistente extends AplicacaoError {
    constructor (message: string = 'Postagem inexistente com o parametro informado.') {
        super(message);
    }
}

class OpcaoInvalida extends AplicacaoError {
    constructor (message: string = 'Escolha uma opcao valida.') {
        super(message);
    }
}

function main() {
    console.log('1 - Array\n' + 
                '2 - Lista Encadeada');
    let mecanismoPersistencia = Number(input('Escolher mecanismo de persitencia do App: '))
    while (mecanismoPersistencia < 0 || mecanismoPersistencia > 2) {
        mecanismoPersistencia = Number(input('Escolha um numero valido: '))
    }
    let meuApp = new App(mecanismoPersistencia);
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