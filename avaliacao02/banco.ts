import * as fs from 'fs';
class Conta {
	private _numero: string;
	private _saldo: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		if (!ehNumerico(numero)) {
			throw new NumeroContaInvalidoError();
		}

		this._saldo = saldoInicial;
		if (saldoInicial < 0 || !ehNumerico(String(saldoInicial))) {
			throw new ValorInvalidoError();
		}
	}

	sacar(valor: number): void {
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

	depositar(valor: number): void {
// Questao 06
		if (valor < 0) {
			//throw new Error("Valor a ser depositado nao pode ser negativo.")
// Questao 10
			throw new ValorInvalidoError("Valor nao pode ser menor ou igual a 0")
		}
// Questao 11
		this.validarValor(valor);
		this._saldo = this._saldo + valor;
	}

	consultar(): number {
		return this.saldo
	}

	transferir(contaDestino: Conta, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}
	/*
	obterSaldo(): number {
		return this.saldo;
	}
	*/

    private validarValor(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError("Valor invalido");
        }
	}

	get numero(): string {
		return this._numero;
	}

	get saldo(): number {
		return this._saldo;
	}
}
class Poupanca extends Conta {
	private _taxaDeJuros: number;

	constructor(numero: string, saldo: number, taxaDeJuros: number) {
		super(numero, saldo);
		this._taxaDeJuros = taxaDeJuros;
	}

	renderJuros(): void {
		let juros: number = this.saldo * (this._taxaDeJuros / 100);
		this.depositar(juros);
	}

	get taxaDeJuros(): number {
		return this._taxaDeJuros;
	}
}
class ContaImposto extends Conta {
	private _taxaDesconto: number;

	constructor(numero: string, saldo: number, taxaDesconto: number) {
		super(numero, saldo);
		this._taxaDesconto = taxaDesconto;
	}

	debitarDesconto(): void {
		let valorDesconto = this.saldo * this._taxaDesconto / 100;
		this.sacar(valorDesconto);
	}

	get taxaDesconto(): number {
		return this._taxaDesconto;
	}
}
class Banco {
	private contas: Conta[] = [];
	private CAMINHO_ARQUIVO: string = "./contas.txt";
// Questao 13
	public inserir(conta: Conta): void {
		try {
			this.consultar(conta.numero);
		} catch(error: any) {
			if (error instanceof ContaInexistenteError) {
				this.contas.push(conta);
				console.log(`Conta ${conta.numero} cadastrada com sucesso`)
			} else {
				throw error
			}
		}
	}

	public consultar(numero: string): Conta {
		let contaConsultada!: Conta;
		for (let conta of this.contas) {
			if (conta.numero == numero) {
				contaConsultada = conta;
				break;
			}
		}
		if(!contaConsultada){
			throw new ContaInexistenteError(`Conta ${numero} nao encontrada`);
		}
		return contaConsultada;
	}

	private consultarPorIndice(numero: string): number {
		let indice: number = -1;
		for (let i: number = 0; i < this.contas.length; i++) {
			if (this.contas[i].numero == numero) {
				indice = i;
				break;
			}
			if (!indice) {
				throw new ContaInexistenteError("Indide de conta invalido.")
			}
		}
		return indice;
	}
// Questao 09
	public alterar(conta: Conta): void {
		let indice: number = this.consultarPorIndice(conta.numero);
		//if (indice != -1) {
			this.contas[indice] = conta;
		//}
	}

	public excluir(numero: string): void {
		let indice: number = this.consultarPorIndice(numero);
		if (indice != -1) {
			for (let i: number = indice; i < this.contas.length; i++) {
				this.contas[i] = this.contas[i + 1];
			}

			this.contas.pop();
		}
	}
// Questao 09
	public depositar(numero: string, valor: number): void {
		let contaConsultada = this.consultar(numero);
		//if (contaConsultada != null) {
			contaConsultada.depositar(valor);
		//}
	}
// Questao 09
	public sacar(numero: string, valor: number): void {
		let contaConsultada = this.consultar(numero);
		//if (contaConsultada != null) {
			contaConsultada.sacar(valor);
		//}
	}
// Questao 05 - Incluindo o try catch no metodo transferir.
	public transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
		try{
			let contaCredito = this.consultar(numeroCredito);
			let contaDebito = this.consultar(numeroDebito);
			if (contaDebito && contaCredito) {
				contaDebito.transferir(contaCredito, valor);
			}
		} catch (e: any){
			console.log(`Erro ao sacar: ${e.message}`);
		}
	}

	public getTotalDepositado(): number {
		let totalDepositado =
			this.contas.reduce((totalAcumulado: number, conta: Conta) => {
				return totalAcumulado + conta.saldo;
			}, 0);

		return totalDepositado;
	}

	renderJuros(numero: string): void {
		let conta: Conta = this.consultar(numero);
		if (conta instanceof Poupanca) {
			conta.renderJuros();
		}
	}

	debitarDesconto(numero: string): void {
		let conta: Conta = this.consultar(numero);
		if (conta instanceof ContaImposto) {
			conta.debitarDesconto();
		}
	}

	public getTotalContas(): number {
		return this.contas.length;
	}

	public getMediaDepositada(): number {
		return this.getTotalDepositado() / this.getTotalContas();
	}

	public carregarDeArquivo() {
		const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
		const linhas: string[] = arquivo.split('\r\n');
		console.log("Iniciando leitura de arquivo");

		for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
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
		console.log("fim do arquivo")

	}

	public salvarEmArquivo() {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = "";
		let linha: string = "";

		for (let conta of this.contas) {
			if (conta instanceof Poupanca) {
				linha = `${conta.numero};${conta.saldo};CP;${conta.taxaDeJuros}\r\n`;
			} else if ((conta instanceof ContaImposto)) {
				linha = `${conta.numero};${conta.saldo};CI;${conta.taxaDesconto}\r\n`;
			} else {
				linha = `${conta.numero};${conta.saldo};C\r\n`;
			}

			stringContas += linha;
		}
		//deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
		stringContas = stringContas.slice(0,stringContas.length-2);

		fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas,'utf-8');
		console.log("Contas salvas em arquivo.")
	}

}
// Questao 07
class AplicacaoError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class ContaInexistenteError extends AplicacaoError {
	constructor(message: string = "Conta inexistente.") {
		super(message);
	}
}

class SaldoInsuficienteError extends AplicacaoError {
	constructor(message: string = "Saldo insuficiente.") {
		super(message);
	}
}
// Questao 10
class ValorInvalidoError extends AplicacaoError {
	constructor(message: string = "Valor invalido. Insira um valor aceito.") {
		super(message);
	}
}
// Questao 12
class PoupancaInvalidaError extends AplicacaoError {
	constructor(message: string = "A referida conta nao eh poupanca.") {
		super(message);
	}
}

class NumeroContaInvalidoError extends AplicacaoError {
	constructor(message: string = "Numero de conta invalido, insira valores numericos.") {
		super(message);
	}
}

function ehNumerico(numero: string): boolean {
	return /^[0-9]+$/.test(numero);
}

/*
// Questao 05
let Itau: Banco = new Banco ();
Itau.inserir(new Conta("001", 100));
Itau.inserir(new Conta("002", 0));
Itau.transferir("002", "001", 150);
console.log(Itau.consultar("001"));
console.log(Itau.consultar("002"));
*/

export { Banco, Conta, Poupanca, ContaImposto, AplicacaoError }