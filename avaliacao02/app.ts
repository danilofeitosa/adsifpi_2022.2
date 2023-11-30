import prompt from "prompt-sync";
import { Conta, Banco, AplicacaoError, Poupanca, ContaImposto } from "./banco";
import { Console } from "console";

let input = prompt();
let b: Banco = new Banco();
let opcao: string = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar     2 - Consultar           3 - Sacar\n' +
                '4 - Depositar     5 - Excluir             6 - Transferir\n' +
                '7 - Render Juros  8 - Debitar Juros       0 - Sair\n');

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
    } catch (error: any) {
        if (error instanceof AplicacaoError) {
            console.log(error.message);
        }
        /*
        if (error instanceof ValorInvalidoError) {
            console.log(error.message);
        }
        
        if(error instanceof Error) {
            console.log("Erro no sistema. Contate o administrador.")
        }
        */
    }
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");


function cadastrar(): void {
    console.log("\nCadastrar Conta\n");
    let numero: string = input('Digite o número da conta: ');
    console.log('Tipos de contas:\n' +
                '1 - C - CONTA CORRENTE\n' +
                '2 - CP - CONTA POUPANCA\n' +
                '3 - CI - CONTA IMPOSTO\n');
    let tipo: string = input('Digite o Tipo de conta a ser aberta: ')
    let conta: Conta;
    if(tipo == "1") {
        conta = new Conta(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Corrente: ")));
        b.inserir(conta);
        exibirConta(numero);
    } else if (tipo == "2") {
        conta = new Poupanca(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Poupanca: ")), 1.00);
        b.inserir(conta);
        exibirConta(numero);
    } else if (tipo == "3") {
        conta = new ContaImposto(numero, parseFloat(input("Digite o valor do primeiro deposito para a Conta Imposto: ")),0.38);
        b.inserir(conta);
        exibirConta(numero);
    } 
}

function exibirConta(numero: string): void {
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
    let numero: string = input("Digite o numero da conta: ");
    b.renderJuros(numero);
    exibirConta(numero);
}

function debitarDesconto(): void {
    console.log("\nDebitar Desconto\n");
    let numero: string = input("Digite o numero da conta: ");
    b.debitarDesconto(numero);
    exibirConta(numero);
}