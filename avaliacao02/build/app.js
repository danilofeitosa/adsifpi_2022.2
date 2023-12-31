"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const banco_1 = require("./banco");
let input = (0, prompt_sync_1.default)();
let b = new banco_1.Banco();
let opcao = '';
do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar     2 - Consultar           3 - Sacar\n' +
        '4 - Depositar     5 - Excluir             6 - Transferir\n' +
        '7 - Render Juros  8 - Debitar Desconto    0 - Sair\n');
    opcao = input("Opção:");
    try {
        switch (opcao) {
            case "1":
                cadastrar();
                break;
            case "2":
                consultar();
                break;
            case "3":
                sacar();
                break;
            case "4":
                depositar();
                break;
            case "5":
                excluir();
                break;
            case "6":
                transferir();
                break;
            case "7":
                renderJuros();
                break;
            case "8":
                debitarDesconto();
                break;
            //...
        }
    }
    catch (error) {
        if (error instanceof banco_1.AplicacaoError) {
            console.log(error.message);
        }
    }
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");
function cadastrar() {
    console.log("\nCadastrar Conta\n");
    let numero = input('Digite o número da conta: ');
    console.log('Tipos de contas:\n' +
        '1 - C - CONTA CORRENTE\n' +
        '2 - CP - CONTA POUPANCA\n' +
        '3 - CI - CONTA IMPOSTO\n');
    let tipo = input('Digite o Tipo de conta a ser aberta: ');
    let conta;
    if (tipo == "1") {
        conta = new banco_1.Conta(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Corrente: ")));
        b.inserir(conta);
        exibirConta(numero);
    }
    else if (tipo == "2") {
        conta = new banco_1.Poupanca(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Poupanca: ")), 1.00);
        b.inserir(conta);
        exibirConta(numero);
    }
    else if (tipo == "3") {
        conta = new banco_1.ContaImposto(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Imposto: ")), 0.38);
        b.inserir(conta);
        exibirConta(numero);
    }
}
function exibirConta(numero) {
    console.log(`Número: ${b.consultar(numero).numero} - Saldo: ${b.consultar(numero).saldo}`);
}
function consultar() {
    console.log("\nConsultar conta\n");
    let numero = input('Digite o número da conta:');
    let conta = b.consultar(numero);
    exibirConta(conta.numero);
}
function sacar() {
    let numero = input('Digite o numero da conta: ');
    let valor = parseFloat(input('Digite o valor: '));
    b.sacar(numero, valor);
    exibirConta(numero);
}
function depositar() {
    console.log("\nDepositar em conta\n");
    let numero = input('Digite o número da conta:');
    let valor = parseFloat(input('Digite o valor:'));
    b.depositar(numero, valor);
    exibirConta(numero);
}
function excluir() {
    console.log("\nExcluir conta\n");
    let numero = input("Digite o numero da conta: ");
    b.excluir(numero);
}
function transferir() {
    console.log("\nTransferir valor\n");
    let contaDebitada = input('Digite a conta a ser debitada: ');
    let contaCreditada = input('Digite a conta a ser creditada: ');
    let valor = parseFloat(input('Digite o valor:'));
    b.transferir(contaCreditada, contaDebitada, valor);
    exibirConta(contaDebitada);
    exibirConta(contaCreditada);
}
function renderJuros() {
    console.log("\nRender Juros\n");
    let numero = input("Digite o numero da conta: ");
    b.renderJuros(numero);
    exibirConta(numero);
}
function debitarDesconto() {
    console.log("\nDebitar Desconto\n");
    let numero = input("Digite o numero da conta: ");
    b.debitarDesconto(numero);
    exibirConta(numero);
}
//# sourceMappingURL=app.js.map