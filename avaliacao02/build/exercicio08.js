"use strict";
// q1. Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com códigos seus ou pesquisados na internet.
class Produto {
    constructor(nome, estoque) {
        this._nome = nome;
        this._estoque = estoque;
    }
    get estoque() {
        return this._estoque;
    }
    // 1 - Desconsiderar operação
    adicionarAoCarrinho(quantidade) {
        if (quantidade > 0 && quantidade <= this._estoque) {
            console.log(`Quantidade ${quantidade} do produto ${this._nome} adicionada ao carrinho de compras `);
            this._estoque -= quantidade;
        }
    }
    definirPreco(preco) {
        this._preco = preco;
    }
    // 2 - Exibir mensagem de erro
    calcularValorEmEstoque() {
        if (this._estoque > 0) {
            this._estoque * this._preco;
        }
        else {
            console.log(`Sem produto no estoque`);
        }
    }
    // 3 - Retornar um código de erro
    disponivelEmEstoque(quantidadeDesejada) {
        if (quantidadeDesejada > 0 && quantidadeDesejada <= this._estoque) {
            console.log(`Produto disponivel em Estoque.`);
            return true;
        }
        else {
            return false;
        }
    }
}
/*
const notebook = new Produto("Notebook", 5);

notebook.adicionarAoCarrinho(6);
*/
/*
q2. Explique por que cada um dos 3 métodos acima possui limitações de uso.

    R: Os 3 tratamentos de erro listados na questao 01 possuem diversas limitacoes. O ato de desconsiderar a operacao faz com que o usuario do sistema nao saiba se aquela acao foi efetuada. Utilizar console.log para explicar o erro, como eh o caso do 2o tratamento pode ser desconsiderado por algumas interfaces graficas, pois o console.log trata de uma execucao via terminal. Por fim, no 3o tratamento trata de um retorno que, em determinadas situacoes em que o sistema espera uma resposta, pode gerar interpretacoes dubias.
*/
/*
q3. Implemente como nos slides o lançamento da exceção no método sacar e realize um teste para saques que deixariam o saldo negativo.
    
    R: Aqui embaixo eh a representacao do que foi modificado no arquivo banco.ts
  
    sacar(valor: number): void {
        try {
            if (this._saldo >= valor) {
                this._saldo = this._saldo - valor;
            } else {
                throw new Error(`Saldo insuficiente para realizar o saque solicitado.`);
            }
        } catch (e: any) {
            console.error(`Erro ao sacar: ${e.message}`)
        };
    }
    */
/*
q4. Crie duas contas e teste o método transferir de modo que a conta a ser debitada não possua saldo suficiente. Explique o que ocorreu.
    
    R: No teste em questao, considerando que o metodo transferir utiliza do metodo sacar para que a acao seja feita de forma exitosa, e esta foi implementada uma excecao para impedir saque quando o valor a ser sacado eh maior que o saldo da conta, a transferencia nao foi concretizada, apresentando erro e mantendo os saldos das duas contas inalteradas, conforme demonstrado a seguir:

    Antes da operacao:
    ContaDebitada 001 - 100.00
    ContaCreditada 002 - 0.00

    Tentativa de transferir 150.00 da conta 001 para conta 002

    Depois da operacao:
    Erro ao sacar: Saldo insuficiente para realizar o saque solicitado.
    ContaDebitada 001 - 100.00
    ContaCreditada 002 - 0.00
*/
/*
q5. Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco. Chame o método transferir novamente passando um valor que lance a exceção na classe conta. Você considera que o lançamento da exceção foi “propagado” para o método conta.transferir(), banco.transferir() e o método transferir do script app? Como você avalia a confiabilidade dessa implementação.

    R:Instanciando a classe Banco e criando 2 contas bancarias, conforme demonstrado abaixo, pode-se observar que a excecao foi propagada tanto para o metodo conta.transferir(), metodo banco.transferir, quanto para o metodo transferir do app.ts. Avalio essa implementacao com uma certa confiabilidade, garantir que, o que depende do metodo sacar, esta protegido da transferencia ser concretizada, embora nao garanta que o sistema nao va "quebrar".

    let Itau: Banco = new Banco ();
    Itau.inserir(new Conta("001", 100));
    Itau.inserir(new Conta("002", 0));
    Itau.transferir("002", "001", 150);
    console.log(Itau.consultar("001"));
    console.log(Itau.consultar("002"));

    Resultado:
    Erro ao sacar: Saldo insuficiente para realizar o saque solicitado.
    Conta { _numero: '001', _saldo: 100 }
    Conta { _numero: '002', _saldo: 0 }
*/
/*
q6. Lance um erro no construtor e nos métodos sacar e depositar para que, caso o valor passado seja menor que zero uma exceção seja lançada. Reexecute os testes da questão  anterior com valores que “passem” pelo saldo insuficiente, e teste também a chamada dos métodos passando como parâmetro valores < 0.
*/ 
//# sourceMappingURL=exercicio08.js.map