import prompt from "prompt-sync";
let input = prompt();
/*
Responder em dupla, preferencialmente a dupla da primeira avaliação.

Coloquem no readme do repositório o nome da equipe e um link de um vídeo de 10 minutos mostrando as alterações no projeto "Rede social"
*/

/*
q1. Podemos instanciar classes abstratas? Justifique.

*/

/*
q2. Explique o que é necessário para que a compilação da ClasseConcreta ocorra sem erros:

abstract class ClasseAbstrata {
    abstract imprimaAlgo(): void;
}

class ClasseConcreta extends ClasseAbstrata {}

    R. As subclasses devem obrigatoriamente implementar o metodo da classe abstrata raiz para que seja compilado sem erros.


*/

/*
q3. Se uma classe que herda de uma abstrata e não implementa os seus métodos, o que ocorre?
    R: Acontece um erro de compilacao com o seguinte erro "Non-abstract class 'Gerente' does not implement all abstract members of 'Funcionario'". Ou seja, a classe Gerente nao implementou todos os metodos da classe abstrata Funcionario.
*/
    abstract class Funcionario1 {
        private _salario: number;

        constructor (salario: number) {
            this._salario = salario;
        }
        
        abstract getBonificacao(): number;

        get salario(): number {
            return this._salario;
        }
    }

    class Gerente1 extends Funcionario1 {

        constructor (salario: number) {
            super(salario);

        }

        getBonificacao(): number {
            return this.salario * 1.4;
        }
    }


/*
q4. Imagine que você deve modelar várias figuras geométricas em TypeScript e que cada uma tem sua forma específica de calcular área e perímetro. Proponha e implemente uma hierarquia de classes usando uma classe abstrata chamada FiguraGeometrica e outras concretas: Quadrado, Triangulo, etc.

    abstract class FiguraGeometrica {
        private _lado1: number;

        constructor (lado1: number) {
            this._lado1 = lado1;
        }

        abstract getArea(): number;

        abstract getPerimetro(): number;

        get lado1(): number {
            return this._lado1;
        }
    }

    class Quadrado extends FiguraGeometrica {

        constructor(lado1: number) {
            super(lado1);
        }

        getArea(): number {
            return this.lado1 * this.lado1
        }

        getPerimetro(): number {
            return this.lado1 * 4
        }
    }

    class Triangulo extends FiguraGeometrica {
        private _altura: number;
        private _base: number;
        private _lado2: number;
        private _lado3: number;


        constructor (altura: number, base: number, lado1: number, lado2: number, lado3: number) {
            super(lado1);
            this._lado2 = lado2;
            this._lado3 = lado3;
            this._altura = altura;
            this._base = base;
        }

        getArea(): number {
            return (this._base * this._altura) / 2
        }

        getPerimetro(): number {
            return this.lado1 + this._lado2 + this._lado3
        }
    }
*/

/*
q5. Não podemos aplicar o operador new em FiguraGeometrica, mas porque então podemos realizar o seguinte código de instanciação:

abstract class FiguraGeometrica {
    //...
}

let figuras: FiguraGeometrica[] = new Array();

    R: Esse codigo de  instanciacao nao esta instanciando uma classe e sim sendo usada como um tipo para definir arrays que armazenam objetos de suas subclasses (derivadas). Nesse caso, "figuras" eh um array que contem/podem conter instancias de classes que herdam de "FiguraGeometrica".
*/

/*
q6. Implemente as classes Funcionario, Gerente e Diretor conforme o diagrama exposto em sala:
a. A classe funcionário deve ser abstrata e o método getBonificacao()
abstrato;
b. Na classe gerente o método bonificação deve retornar 40% do salário;
c. Em Diretor a bonificação deve ser 60% do salário.
d. Por fim, na classe presidente o método deve retornar 100% do salário + R$
1.000,00.
*/

abstract class Funcionario {
    protected salario: number;

    constructor (salario: number) {
        this.salario = salario;
    }

    abstract getBonificacao(): number;
}

class Gerente extends Funcionario {

    constructor (salario: number) {
        super(salario);
    }

    getBonificacao(): number {
        return this.salario * 0.4
    }
}

class Diretor extends Gerente {
    constructor (salario: number) {
        super(salario);
    }

    getBonificacao(): number {
        return this.salario * 1 + 1000.00
    }
}

/*
q7. Refaça a questão 04 do exercício usando interfaces com os métodos propostos em vez de herança. Crie também um script que instancie e teste diferentes formas geométricas.

    interface FiguraGeometrica {
        getArea(): number;
        getPerimetro(): number;
    }

    class Quadrado implements FiguraGeometrica {
        private _lado: number;
        constructor(lado: number) {
            this._lado = lado;
        }

        getArea(): number {
            return this._lado * this._lado
        }

        getPerimetro(): number {
            return this._lado * 4
        }
    }

    class Triangulo implements FiguraGeometrica {
        private _altura: number;
        private _base: number;
        private _lado1: number;
        private _lado2: number;


        constructor (altura: number, base: number, lado1: number, lado2: number) {
            this._lado1 = lado1;
            this._lado2 = lado2;
            this._altura = altura;
            this._base = base;
        }

        getArea(): number {
            return (this._base * this._altura) / 2
        }

        getPerimetro(): number {
            return this._lado1 + this._lado2 + this._base
        }
    }

*/
/*
q8. Crie uma interface chamada IComparavel com um método chamado comparar que receba uma forma geométrica como parâmetro e retorna um inteiro como resultado. Implemente em cada uma das classes do exemplo anterior a interface retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a passada via parâmetro.
*/
abstract class FiguraGeometrica implements IComparavel {
    abstract getArea(): number;
    abstract getPerimetro(): number;

    comparar(outraForma: FiguraGeometrica): number {
        const minhaArea = this.getArea();
        const outraArea = outraForma.getArea();

        if (minhaArea < outraArea) {
            return -1;
        } else if (minhaArea > outraArea) {
            return 1;
        } else {
            return 0;
        }
    }
}

interface IComparavel {
    comparar(outraForma: FiguraGeometrica): number;
}

class Quadrado extends FiguraGeometrica {
    private _lado: number;
    constructor(lado: number) {
        super();
        this._lado = lado;
    }

    getArea(): number {
        return this._lado * this._lado
    }

    getPerimetro(): number {
        return this._lado * 4
    }
}

class Triangulo extends FiguraGeometrica {
    private _altura: number;
    private _base: number;
    private _lado1: number;
    private _lado2: number;


    constructor (altura: number, base: number, lado1: number, lado2: number) {
        super();
        this._lado1 = lado1;
        this._lado2 = lado2;
        this._altura = altura;
        this._base = base;
    }

    getArea(): number {
        return (this._base * this._altura) / 2
    }

    getPerimetro(): number {
        return this._lado1 + this._lado2 + this._base
    }
}

/*
q9. Crie uma classe para testar os exemplos anteriores. Instancie várias formas diferentes. Pegue duas formas chame em uma delas o método comparar passando a outra como parâmetro e exiba o resultado. Repita para outras formas.
*/

    class TesteFormasGeometricas  {
        static testarComparacao(forma1: FiguraGeometrica, forma2: FiguraGeometrica) {
            const resultadoComparacao = forma1.comparar(forma2);
        

            console.log("Comparacao de areas: ")
            console.log(`Area da Forma 1: ${forma1.getArea()}`);
            console.log(`Area da Forma 2: ${forma2.getArea()}`);

            if (resultadoComparacao === -1) {
                console.log('A área da Forma 1 é menor que a área da Forma 2.');
            } else if (resultadoComparacao === 1) {
                console.log('A área da Forma 1 é maior que a área da Forma 2.');
            } else {
                console.log('A área da Forma 1 é igual à área da Forma 2.');
            }

            console.log(`\n`);
        }
    }

    let quadrado1: FiguraGeometrica = new Quadrado(5);
    let quadrado2: FiguraGeometrica = new Quadrado(8);

    let triangulo1: FiguraGeometrica = new Triangulo(6, 4, 5, 6);
    let triangulo2: FiguraGeometrica = new Triangulo(8, 7, 6, 6);

    TesteFormasGeometricas.testarComparacao(quadrado1, quadrado2);
    TesteFormasGeometricas.testarComparacao(triangulo1, triangulo2);
    TesteFormasGeometricas.testarComparacao(quadrado1, triangulo1);

/*
q10. Implemente o diagrama de classes abaixo:
*/


interface Tributavel {
    calculaTributos(): number;
}
class Conta {
    private _nome: string = "";
    private _saldo: number = 0;

    constructor (nome: string, saldo: number) {
        this._nome = nome;
        this._saldo = saldo;
    }

    getNome(): string {
        return this._nome;
    }

    setNome(nome: string): void {
        this._nome = nome;    
    }

    getSaldo(): number {
        return this._saldo;
    }

    setSaldo(saldo: number): void {
        this._saldo = saldo;
    }
}

class ContaCorrente extends Conta implements Tributavel {
    calculaTributos(): number {
        return this.getSaldo() * 0.1;
    }
}

class SeguroDeVida implements Tributavel {
    calculaTributos(): number {
        return 50
    }
}

/*
11. Crie uma classe chamada AuditoriaInterna que tenha dois métodos que tenha um array de Tributaveis e os métodos:
a. adicionar(Tributável);
b. calcularTributos(): retorna um double que representa a soma de todos os
cálculos dos tributos de todos os tributáveis;
c. Crie uma classe de testes que instancie várias classes ContaCorrente e
SeguroDeVida, adicione-as na classe AuditoriaInterna e exiba o resultado
do método calculaTributos. Perceba que a classe de auditoria não se preocupa que tipo de classe está sendo passada.
*/

    class AuditoriaInterna {
        private tributaveis: Tributavel[] = []
    // a)    
        adicionar(tributavel: Tributavel): void {
            this.tributaveis.push(tributavel);
        }

        calcularTributos(): number {
            let totalTributos = 0;
            for (let tributavel of this.tributaveis) {
                totalTributos += tributavel.calculaTributos();
            }
            return totalTributos;
        }
    }

    const auditoria = new AuditoriaInterna();

    const contaCorrente1 = new ContaCorrente("001", 0);
    contaCorrente1.setSaldo(1000);
    auditoria.adicionar(contaCorrente1);

    const contaCorrente2 = new ContaCorrente("002", 0);
    contaCorrente2.setSaldo(2000);
    auditoria.adicionar(contaCorrente2);

    const seguroDeVida = new SeguroDeVida();
    auditoria.adicionar(seguroDeVida);


    console.log("Total de tributos calculados pela Auditoria Interna:", auditoria.calcularTributos());







