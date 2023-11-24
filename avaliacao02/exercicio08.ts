// q1. Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com códigos seus ou pesquisados na internet.

    class Produto {
        private _nome: string;
        private _estoque: number;
        private _preco: number;

        constructor (nome: string, estoque: number) {
            this._nome = nome;
            this._estoque = estoque;
        }

        get estoque () {
            return this._estoque;
        }
    // 1 - Desconsiderar operação
        adicionarAoCarrinho (quantidade: number): void {
            if (quantidade > 0 && quantidade <= this._estoque) {
                console.log(`Quantidade ${quantidade} do produto ${this._nome} adicionada ao carrinho de compras `);
                this._estoque -= quantidade;
            }
        }

        definirPreco(preco: number) {
            this._preco = preco;
        }
    // 2 - Exibir mensagem de erro
        calcularValorEmEstoque (): void {
            if (this._estoque > 0) {
            this._estoque * this._preco;
            } else {
                console.log(`Sem produto no estoque`);
            }
        }
    // 3 - Retornar um código de erro
        disponivelEmEstoque (quantidadeDesejada: number): boolean {
            if (quantidadeDesejada > 0 && quantidadeDesejada <= this._estoque) {
                console.log(`Produto disponivel em Estoque.`);
                return true;
            } else {
                return false;
            }
        }
    }
    /*
    const notebook = new Produto("Notebook", 5);

    notebook.adicionarAoCarrinho(6);
    */

// q2. Explique por que cada um dos 3 métodos acima possui limitações de uso.

    // R: Os 3 tratamentos de erro listados na questao 01 possuem diversas limitacoes. O ato de desconsiderar a operacao faz com que o usuario do sistema nao saiba se aquela acao foi efetuada. Utilizar console.log para explicar o erro, como eh o caso do 2o tratamento pode ser desconsiderado por algumas interfaces graficas, pois o console.log trata de uma execucao via terminal. Por fim, no 3o tratamento trata de um retorno que, em determinadas situacoes em que o sistema espera uma resposta, pode gerar interpretacoes dubias.

// q3. Implemente como nos slides o lançamento da exceção no método sacar e realize um teste para saques que deixariam o saldo negativo.

    /*
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

// q4. Crie duas contas e teste o método transferir de modo que a conta a ser debitada não possua saldo suficiente. Explique o que ocorreu.
    /*
    R. No teste em questao, quando tentei realizar uma transferencia no valor de 150.00, embora o metodo sacar, que esta sendo chamado dentro de transferir, teria impedido o saque da ContaDebitada e informado o saldo insuficiente (tratamento de erro try catch), o metodo transferir ainda acresceu o saldo na ContaCredita, como discriminado a seguir:

    Antes da operacao:
    ContaDebitada 001 - 100.00
    ContaCreditada 002 - 0.00

    Depois da operacao:
    ContaDebitada 001 - 100.00
    ContaCreditada 002 - 150.00
    */

// q5. Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco. Chame o método transferir novamente passando um valor que lance a exceção na classe conta. Você considera que o lançamento da exceção foi “propagado” para o método conta.transferir(), banco.transferir() e o método transferir do script app? Como você avalia a confiabilidade dessa implementação.