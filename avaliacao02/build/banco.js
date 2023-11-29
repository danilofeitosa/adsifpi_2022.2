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
exports.ContaImposto = exports.Poupanca = exports.Conta = exports.Banco = void 0;
const fs = __importStar(require("fs"));
class Conta {
    constructor(numero, saldoInicial) {
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    // Questao 03
    sacar(valor) {
        if (this._saldo < valor) {
            throw new Error(`Saldo insuficiente para realizar o saque solicitado.`);
        }
        this._saldo = this._saldo - valor;
    }
    depositar(valor) {
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
    sacar(valor) {
        let valorDesconto = this.saldo * this._taxaDesconto / 100;
        super.sacar(valor + valorDesconto);
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
    inserir(conta) {
        let contaConsultada = this.consultar(conta.numero);
        if (contaConsultada == null) {
            this.contas.push(conta);
        }
        else {
            console.log(`Conta ${conta.numero} já cadastrada`);
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
        return contaConsultada;
    }
    consultarPorIndice(numero) {
        let indice = -1;
        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
        }
        return indice;
    }
    alterar(conta) {
        let indice = this.consultarPorIndice(conta.numero);
        if (indice != -1) {
            this.contas[indice] = conta;
        }
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
    depositar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.depositar(valor);
        }
    }
    sacar(numero, valor) {
        let contaConsultada = this.consultar(numero);
        if (contaConsultada != null) {
            contaConsultada.sacar(valor);
        }
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
            // (conta as Poupanca).renderJuros();
            //(<Poupanca> conta).renderJuros()
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
        //const linhas: string[] = arquivo.split('\n');
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
// Questao 05
let Itau = new Banco();
Itau.inserir(new Conta("001", 100));
Itau.inserir(new Conta("002", 0));
Itau.transferir("002", "001", 150);
console.log(Itau.consultar("001"));
console.log(Itau.consultar("002"));
//# sourceMappingURL=banco.js.map