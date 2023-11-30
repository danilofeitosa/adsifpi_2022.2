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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AplicacaoError = exports.ContaImposto = exports.Poupanca = exports.Conta = exports.Banco = void 0;
const fs = __importStar(require("fs"));
class Conta {
    constructor(numero, saldoInicial) {
        this._numero = numero;
        if (!ehNumerico(numero)) {
            throw new NumeroContaInvalidoError();
        }
        this._saldo = saldoInicial;
        if (saldoInicial < 0 || !ehNumerico(String(saldoInicial))) {
            throw new ValorInvalidoError();
        }
    }
    sacar(valor) {
        // Questao 06
        /*if (valor < 0) {
            throw new Error("Valor a ser sacado nao pode ser negativo.")
        }*/
        // Questao 11
        this.validarValor(valor);
        // Questao 03
        if (this._saldo < valor) {
            throw new Error("Saldo insuficiente para realizar a transacao.");
        }
        this._saldo = this._saldo - valor;
    }
    depositar(valor) {
        // Questao 06
        if (valor < 0) {
            //throw new Error("Valor a ser depositado nao pode ser negativo.")
            // Questao 10
            throw new ValorInvalidoError("Valor nao pode ser menor ou igual a 0");
        }
        // Questao 11
        this.validarValor(valor);
        this._saldo = this._saldo + valor;
    }
    consultar() {
        return this.saldo;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    /*
    obterSaldo(): number {
        return this.saldo;
    }
    */
    validarValor(valor) {
        if (valor <= 0) {
            throw new ValorInvalidoError("Valor invalido");
        }
    }
    get numero() {
        return this._numero;
    }
    get saldo() {
        return this._saldo;
    }
}
exports.Conta = Conta;
class Poupanca extends Conta {
    constructor(numero, saldo, taxaDeJuros) {
        super(numero, saldo);
        this._taxaDeJuros = taxaDeJuros;
    }
    renderJuros() {
        let juros = this.saldo * (this._taxaDeJuros / 100);
        this.depositar(juros);
    }
    get taxaDeJuros() {
        return this._taxaDeJuros;
    }
}
exports.Poupanca = Poupanca;
class ContaImposto extends Conta {
    constructor(numero, saldo, taxaDesconto) {
        super(numero, saldo);
        this._taxaDesconto = taxaDesconto;
    }
    debitarDesconto() {
        let valorDesconto = this.saldo * this._taxaDesconto / 100;
        this.sacar(valorDesconto);
    }
    get taxaDesconto() {
        return this._taxaDesconto;
    }
}
exports.ContaImposto = ContaImposto;
class Banco {
    constructor() {
        this.contas = [];
        this.CAMINHO_ARQUIVO = "./contas.txt";
    }
    // Questao 13
    inserir(conta) {
        try {
            this.consultar(conta.numero);
        }
        catch (error) {
            if (error instanceof ContaInexistenteError) {
                this.contas.push(conta);
                console.log(`Conta ${conta.numero} cadastrada com sucesso`);
            }
            else {
                throw error; // Precisa desse else aqui mesmo?
            }
        }
    }
    consultar(numero) {
        let contaConsultada;
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaConsultada = conta;
                break;
            }
        }
        if (!contaConsultada) {
            throw new ContaInexistenteError(`Conta ${numero} nao encontrada`);
        }
        return contaConsultada;
    }
    consultarPorIndice(numero) {
        let indice = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
            if (!indice) {
                throw new ContaInexistenteError("Indide de conta invalido.");
            }
        }
        return indice;
    }
    // Questao 09
    alterar(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        //if (indice != -1) {
        this.contas[indice] = conta;
        //}
    }
    excluir(numero) {
        let indice = this.consultarPorIndice(numero);
        if (indice != -1) {
            for (let i = indice; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    // Questao 09
    depositar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        //if (contaConsultada != null) {
        contaConsultada.depositar(valor);
        //}
    }
    // Questao 09
    sacar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        //if (contaConsultada != null) {
        contaConsultada.sacar(valor);
        //}
    }
    // Questao 05 - Incluindo o try catch no metodo transferir.
    transferir(numeroCredito, numeroDebito, valor) {
        try {
            let contaCredito = this.consultar(numeroCredito);
            let contaDebito = this.consultar(numeroDebito);
            if (contaDebito && contaCredito) {
                contaDebito.transferir(contaCredito, valor);
            }
        }
        catch (e) {
            console.log(`Erro ao sacar: ${e.message}`);
        }
    }
    getTotalDepositado() {
        // solução 1
        let totalDepositado = this.contas.reduce((totalAcumulado, conta) => {
            return totalAcumulado + conta.saldo;
        }, 0);
        return totalDepositado;
        /* solução 2
        let totalDepositado: number = 0
        this.contas.forEach(conta => totalDepositado += conta.saldo);

        return totalDepositado;
        */
    }
    renderJuros(numero) {
        let conta = this.consultar(numero);
        if (conta instanceof Poupanca) {
            conta.renderJuros();
        }
    }
    debitarDesconto(numero) {
        let conta = this.consultar(numero);
        if (conta instanceof ContaImposto) {
            conta.debitarDesconto();
        }
    }
    getTotalContas() {
        return this.contas.length;
    }
    getMediaDepositada() {
        return this.getTotalDepositado() / this.getTotalContas();
    }
    carregarDeArquivo() {
        const arquivo = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
        const linhas = arquivo.split('\r\n');
        console.log("Iniciando leitura de arquivo");
        for (let i = 0; i < linhas.length; i++) {
            let linhaConta = linhas[i].split(";");
            let conta;
            let tipo = linhaConta[2];
            if (tipo == 'C') {
                conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
            }
            else if (tipo == 'CP') {
                conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]), parseFloat(linhaConta[3]));
            }
            else if (tipo == 'CI') {
                conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]), parseFloat(linhaConta[3]));
            }
            this.inserir(conta);
            console.log(`Conta ${conta.numero} carregada`);
        }
        /*
                linhas.forEach(linha => {
                    let linhaConta: string[] = linha.split(";");
                    let conta!: Conta;
                    let tipo: string  = linhaConta[2];
                    if (tipo == 'C') {
                        conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
                    } else if (tipo == 'CP') {
                        conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
                    } else if (tipo == 'CI') {
                        conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
                    }
        
                    this.inserir(conta);
                    console.log(`Conta ${conta.numero} carregada`);
                    
        
        
                });*/
        console.log("fim do arquivo");
    }
    salvarEmArquivo() {
        console.log("Iniciando a gravação de contas em arquivo.");
        let stringContas = "";
        let linha = "";
        for (let conta of this.contas) {
            if (conta instanceof Poupanca) {
                linha = `${conta.numero};${conta.saldo};CP;${conta.taxaDeJuros}\r\n`;
            }
            else if ((conta instanceof ContaImposto)) {
                linha = `${conta.numero};${conta.saldo};CI;${conta.taxaDesconto}\r\n`;
            }
            else {
                linha = `${conta.numero};${conta.saldo};C\r\n`;
            }
            stringContas += linha;
        }
        //deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
        stringContas = stringContas.slice(0, stringContas.length - 2);
        fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo.");
    }
}
exports.Banco = Banco;
// Questao 07
class AplicacaoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AplicacaoError = AplicacaoError;
class ContaInexistenteError extends AplicacaoError {
    constructor(message = "Conta inexistente.") {
        super(message);
    }
}
class SaldoInsuficienteError extends AplicacaoError {
    constructor(message = "Saldo insuficiente.") {
        super(message);
    }
}
// Questao 10
class ValorInvalidoError extends AplicacaoError {
    constructor(message = "Valor invalido. Insira um valor aceito.") {
        super(message);
    }
}
// Questao 12
class PoupancaInvalidaError extends AplicacaoError {
    constructor(message = "A referida conta nao eh poupanca.") {
        super(message);
    }
}
class NumeroContaInvalidoError extends AplicacaoError {
    constructor(message = "Numero de conta invalido, insira valores numericos.") {
        super(message);
    }
}
function ehNumerico(numero) {
    return /^[0-9]+$/.test(numero);
}
//# sourceMappingURL=banco.js.map