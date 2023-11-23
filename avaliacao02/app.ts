import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";


let input = prompt();
let b: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
                '4 - Depositar       5 - Excluir               6 - Transferir\n' +
                '7 - Totalizações' +
                '0 - Sair\n');
    opcao = input("Opção:");
    switch (opcao) {
        case "1":
            inserir();
            break
        case "2":
            consultar();
            break
        case "4": 
            depositar();            
        //...
    }
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");


function inserir(): void {
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

function consultar() {
    console.log("\Consultar conta\n");
    let numero: string = input('Digite o número da conta:');
    let conta: Conta = b.consultar(numero)

    exibirConta(conta.numero)
}
function depositar() {
    console.log("\Depositar em conta\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    b.depositar(numero, valor);
    exibirConta(numero)
}