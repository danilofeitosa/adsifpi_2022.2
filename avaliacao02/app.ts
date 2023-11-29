import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";

let input = prompt();
let b: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar     2 - Consultar saldo     3 - Sacar\n' +
                '4 - Depositar     5 - Excluir             6 - Transferir\n' +
                '7 - Render Juros' +
                '0 - Sair\n');
    opcao = input("Opção:");
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
        //...
    }
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");


function cadastrar(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta:');

    let conta: Conta;
    conta = new Conta(numero, 0);
    b.inserir(conta);
    exibirConta(numero);
}

function exibirConta(numero: String): void {
    console.log(`Número: ${b.consultar(numero).numero} - Saldo: ${b.consultar(numero).saldo}`);
}

function consultar(): void {
    console.log("\nConsultar conta\n");
    let numero: string = input('Digite o número da conta:');
    let conta: Conta = b.consultar(numero)

    exibirConta(conta.numero)
}

function sacar(): void {
    let numero: string = input('Digite o numero da conta: ');
    let valor: number = parseFloat(input('Digite o valor: '));
    b.sacar(numero, valor);
    exibirConta(numero);
}

function depositar(): void {
    console.log("\nDepositar em conta\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    b.depositar(numero, valor);
    exibirConta(numero);
}

function excluir(): void {
    console.log("\nExcluir conta\n");
    let numero: string = input("Digite o numero da conta: ");
    b.excluir(numero);
}

function transferir(): void {
    console.log("\nTransferir valor\n")
    let contaDebitada: string = input('Digite a conta a ser debitada: ');
    let contaCreditada: string = input('Digite a conta a ser creditada: ');
    let valor: number = parseFloat(input('Digite o valor:'));
    b.transferir(contaCreditada, contaDebitada, valor);
    exibirConta(contaDebitada);
    exibirConta(contaCreditada);
}

function renderJuros(): void {
    console.log("\nRender Juros\n");
    let numero: string = input("Digite o numero da conta: ")
    b.renderJuros(numero);
}