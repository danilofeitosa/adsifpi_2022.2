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

    class Conta {
        private _numero: string;
        private _saldo: number;

        constructor(numero: string, saldoInicial: number) {
            this._numero = numero;
            if (saldoInicial < 0) {
                throw new Error("Saldo inicial não pode ser negativo.");
            }
            this._saldo = saldoInicial;
        }

        sacar(valor: number): void {
            if (valor < 0) {
                throw new Error("Valor a ser sacado nao pode ser negativo.")
            }
            if (this._saldo < valor) {
                throw new Error("Saldo insuficiente para realizar o saque solicitado.");
            }
                this._saldo = this._saldo - valor;
        }

        depositar(valor: number): void {
            if (valor < 0) {
                throw new Error("Valor a ser depositado nao pode ser negativo.")
            }
            this._saldo = this._saldo + valor;
        }
*/

/*
q7. Crie as classes AplicacaoError descendente de Error. Crie também classes ContaInexistenteError e SaldoInsuficienteError. Todas decendentes da classe AplicacaoError.

    class AplicacaoError extends Error {
        constructor(message: string) {
            super(message);
        }
    }

    class ContaInexistenteError extends AplicacaoError {
        constructor(message: string) {
            super(message);
        }
    }

    class SaldoInsuficienteError extends AplicacaoError {
        constructor(message: string) {
            super(message);
        }
    }
*/

/*
q8. Implemente na classe Banco os métodos consultar e consultarPorIndice para que, caso a conta procurada não seja encontrada, a exceção ContaInexistente seja lançada.
*/

/*
q9. Altere os métodos alterar, depositar, sacar, transferir, renderJuros removendo os “ifs/elses”, pois caso haja exceção no método consultar, os respectivos códigos não serão mais necessários.

    R: Coloquei os ifs como comentario em cada um dos metodos. No metodo transferir, eu havia feito na questao 5 o uso do try catch, mas eu vou retornar ao estado anterior. Ja no metodo renderJuros, o unico if eh validando se a conta eh poupanca e, no caso, a excecao no metodo consultar nao substitui essa validacao.
*/

/*
q.10. Crie uma exceção chamada ValorInvalidoError que herda de AplicacaoException e altere a classe Conta para que ao receber um crédito/depósito, caso o valor seja menor ou igual a zero, seja lançada a exceção ValorInvalidoError. Altere também o
construtor da classe Conta para que o saldo inicial seja atribuído utilizando o método depositar.

    class ValorInvalidoError extends AplicacaoError {
        constructor(message: string = "Valor invalido.") {
            super(message);
        }
    }

    depositar(valor: number): void {
		if (valor < 0) {
            throw new ValorInvalidoError("Valor nao pode ser menor ou igual a 0")
		}
		this._saldo = this._saldo + valor;
	}

    class Conta {
	private _numero: string;
	private _saldo: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		if (saldoInicial < 0) {
			throw new Error("Saldo inicial não pode ser negativo.");
		}
		this.depositar(saldoInicial);
	}
*/

/* 
q11. Você percebeu que o código que valida se o valor é menor ou igual a zero se repete nos métodos sacar e depositar? Refatore o código criando um método privado chamado validarValor onde um valor é passado como parâmetro e caso o mesmo seja menor ou igual a zero, seja lançada uma exceção. Altere também os métodos sacar e depositar para chamar esse método de validação em vez de cada um lançar a sua própria exceção, evitando assim a duplicação de código.

    R: Realmente ha uma redundancia nos tratamentos de erros da aplicacao.

    private validarValor(valor: number): void {
        if (valor <= 0) {
            throw new SaldoInsuficienteError("Valor invalido");
        }
    }

    sacar(valor: number): void {
		this.validarValor(valor);
        this._saldo = this._saldo - valor;
    }

    depositar(valor: number): void {
		this.validarValor(valor);
		this._saldo = this._saldo + valor;
	}
*/

/*
q12. Crie uma exceção chamada PoupancaInvalidaError que herda de AplicacaoError. Altere então o método render juros da classe Banco para que caso a conta não seja uma poupança, a exceção criada seja lançada.

    class PoupancaInvalidaError extends AplicacaoError {
        constructor(message: string = "A referida conta nao eh poupanca.") {
            super(message);
        }
}
*/

/*
q13. Crie uma validação para não cadastrar mais de uma conta com o mesmo número. Para isso, chame o método consultar no método inserir da classe banco. Apenas se a exceção do método consultar for lançada, você deve incluir a conta. Para isso, consulte a conta dentro de um try e o faça a inclusão no catch

    public inserir(conta: Conta): void {
		try {
			this.consultar(conta.numero);
		} catch(e: any) {
			if (e instanceof ContaInexistenteError) {
				this.contas.push(conta);
				console.log(`Conta ${conta.numero} já cadastrada`)
			}
	    }
    }
*/

/*
q14. Altere a aplicação “app.ts” para que tenha um tratamento de exceções no do {} while mostra a estrutura do slid “Aplicação Robusta”.
    
    do {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('1 - Cadastrar     2 - Consultar           3 - Sacar\n' +
                    '4 - Depositar     5 - Excluir             6 - Transferir\n' +
                    '7 - Render Juros  0 - Sair\n');
    
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
                //...
            }
        } catch (e: any) {
            if (e instanceof AplicacaoError) {
                console.log(e.message);
            }
        } finally {
            console.log("Erro no sistema. Contate o administrador.")
        }
        input("\nOperação finalizada. Digite <enter>");
    } while (opcao != "0");
    console.log("Aplicação encerrada");
*/

/*
q15. Crie exceções relacionadas a valores obtidos da entrada de dados que não sejam aceitáveis, como valores vazios, números inválidos etc. Na aplicação, trate todas as entradas de dados para que, caso o usuário infrinja regras de preenchimento, o
sistema lance e trate as exceções e informe que a entrada foi inválida. 
Nota: nenhuma das exceções lançadas por você ou pela aplicação deve “abortar” o programa. Elas devem ser obrigatoriamente tratadas.
*/
