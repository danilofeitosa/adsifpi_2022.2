class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;

    constructor(id: number, nome: string, email: string) {
        this._id = id;
        this._nome = nome;
        this._email = email;
    }

    get id(): number {
        return this._id;
    }
}

interface IRepositorioDePerfis {
    inserir(perfil: Perfil): void;
    consultar(id: number, nome: string, email: string): Perfil | null;
}

class RepositorioPerfisArray implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];

    inserir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }

    consultar(id: number, nome: string, email: string): Perfil | null{
        let perfilConsultado!: Perfil;
		for (let perfil of this._perfis) {
			if (perfil.id == id) {
				perfilConsultado = perfil;
				break;
			}
		}


		return perfilConsultado;
    }
}

class Nodo {
    perfil: Perfil;
    proximo: Nodo | null;

    constructor(perfil: Perfil) {
        this.perfil = perfil;
        this.proximo = null;
    }
}

class RepositorioListaDePerfis implements IRepositorioDePerfis {
    private cabeca: Nodo | null;

    constructor() {
        this.cabeca = null;
    }

    inserir(perfil: Perfil): void {
        const novoNodo = new Nodo(perfil);

        if (this.cabeca === null) {
            this.cabeca = novoNodo;
        } else {
            let atual = this.cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNodo;
        }
    }

    consultar(id: number, nome: string, email: string): Perfil | null {
        let atual = this.cabeca;

        while (atual !== null) {
            if (atual.perfil.id === id) {
                return atual.perfil;
            }
            atual = atual.proximo;
        }

        return null;
    }
}

class RedeSocial {
    private _repositorioDePerfis: IRepositorioDePerfis;
   // private _repositorioDePostagens: IRepositorioDePostagens;

    constructor(repositorioDePerfis: IRepositorioDePerfis) {
        this._repositorioDePerfis = repositorioDePerfis;
    }

    inserir(perfil: Perfil) {
        if (this._repositorioDePerfis.consultar(perfil.id, "nome", "e-mail") ){
            throw new Error("Perfil já cadastrado")
        }
        this._repositorioDePerfis.inserir(perfil);
    }

    consultar(id: number, nome: string, email: string): Perfil | null  {
        return this._repositorioDePerfis.consultar(id, nome, email);
    }
}


class App {
    private _redeSocial1: RedeSocial;
    private _redeSocial2: RedeSocial;

    constructor() {
        this._redeSocial1 = new RedeSocial(new RepositorioListaDePerfis());
        this._redeSocial2 = new RedeSocial(new RepositorioPerfisArray());
        //this._redeSocial3 = new RedeSocial(new RepositorioPerfisBD());


        this._redeSocial1.inserir(new Perfil(1, "ely", "ely@ely.com"));
        this._redeSocial2.inserir(new Perfil(2, "joao", "joao"));
        console.log(this._redeSocial1.consultar(1, "", ""));
        console.log(this._redeSocial2.consultar(2, "", ""));
        
    }
}

let app: App = new App();