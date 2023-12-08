"use strict";
class Perfil {
    constructor(id, nome, email) {
        this._id = id;
        this._nome = nome;
        this._email = email;
    }
    get id() {
        return this._id;
    }
}
class RepositorioPerfisArray {
    constructor() {
        this._perfis = [];
    }
    inserir(perfil) {
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
class Nodo {
    constructor(perfil) {
        this.perfil = perfil;
        this.proximo = null;
    }
}
class RepositorioListaDePerfis {
    constructor() {
        this.cabeca = null;
    }
    inserir(perfil) {
        const novoNodo = new Nodo(perfil);
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
    consultar(id, nome, email) {
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
    // private _repositorioDePostagens: IRepositorioDePostagens;
    constructor(repositorioDePerfis) {
        this._repositorioDePerfis = repositorioDePerfis;
    }
    inserir(perfil) {
        if (this._repositorioDePerfis.consultar(perfil.id, "nome", "e-mail")) {
            throw new Error("Perfil já cadastrado");
        }
        this._repositorioDePerfis.inserir(perfil);
    }
    consultar(id, nome, email) {
        return this._repositorioDePerfis.consultar(id, nome, email);
    }
}
class App {
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
let app = new App();
//# sourceMappingURL=duvidas_redesocial.js.map