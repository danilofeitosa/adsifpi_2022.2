/**
    01) Enquanto a classe diz respeito a uma matriz (modelo) para os objetos, definindo atributos e como ela irá se comportar, o objeto seria a representação real da classe, a sua instância. Um exemplo claro de como seria de Classe e Objeto, teríamos que:

    Classe – Conta Bancária
	    Atributos – Titular, saldo.

    Objeto – Conta1, Conta2
 */

/**
    02) Atributo se refere às características/estado que definem um objeto, já os métodos são as funções exercidas por ele. Para a Classe “Pessoa”, o atributo poderia ser a “altura” e o método poderia ser “cumprimentar”.
*/

/**
    03) 
        Peso = Programa de emagrecimento
        Tipo de CNH = Autoescola
        Tipo Sanguíneo = Hospital
        Habilidade destra = Futebol
        Percentual de gordura = Academia
        Saldo em conta = Banco
        Etnia = Censo demográfico
 */

/**
    04)
    a) Sim, em um sistema bancário, é interessante que um objeto "conta" possua um objeto "pessoa" como atributo interno para representar o titular da conta.
    b) Sim, uma pessoa pode possuir mais de uma conta como atributo. O elemento da programação estruturada que melhor representa o conjunto de contas de uma pessoa é uma "lista" ou "array".
 */

/**
    05) Professor, Disciplina, Turma, Nota, Sala de aula.
*/

/**
    06)
        a) Jogador
            I) Nome
            II) Vida
                1) Mover
                2) Atacar
        b) Itens
            Nome
            Efeito
                Usar
        c) Mapa
            I) Terreno
            II) Obstáculos
                1) Mostrar
 */

/**
    07) Considerando o exemplo da classe Retangulo dos slides, implemente um método adicional chamado que calcule o perímetro do retângulo e altere a classe TestaRetangulo para exibir o cálculo do perímetro.
 */

class Retangulo {
    l1: number = 0;
    l2: number = 0;

    calcularArea(): number {
        return this.l1 * this.l2
    }

    calcularPerimetro(): number {
        return (this.l1 * 2) + (this.l2 * 2)
    }
}

let retangulo : Retangulo;
retangulo = new Retangulo();
retangulo.l1 = 10
retangulo.l2 = 20

console.log(retangulo.calcularPerimetro());
console.log(retangulo.calcularArea());

/**
    08) Crie uma classe Circulo que possua um atributo raio. Crie dois métodos quecalculam a área e o perímetro. Instancie um objeto dessa classe, atribua um valor ao raio e exiba a área e o perímetro chamando os dois métodos definidos.
 */

class Circulo {
    raio: number = 0;

    calcularArea(): number {
        return this.raio * 3.14
    }

    calcularPerimetro(): number {
        return 2 * 3.14 * this.raio
    }
}

let circulo: Circulo;
circulo = new Circulo();
circulo.raio = 5;

console.log(circulo.calcularArea().toFixed(2));
console.log(circulo.calcularPerimetro().toFixed(2));

/**
    09) Crie uma classe chamada SituacaoFinanceira com os atributos valorCreditos e valorDebitos. Crie um método chamado saldo() que retorna/calcula a diferença entre crédito e débito. Instancie uma classe SituacaoFinanceira, inicialize os dois atributos e exiba o resultado do método saldo().
 */

class SituacaoFinanceira {
    valorCreditos: number = 0;
    valorDebitos: number = 0;

    saldo() {
        return this.valorCreditos - this.valorDebitos
    }
}

let situacaoFinanceira: SituacaoFinanceira;
situacaoFinanceira = new SituacaoFinanceira();
situacaoFinanceira.valorCreditos = 15
situacaoFinanceira.valorDebitos = 7

console.log(`Diferença é igual a ${situacaoFinanceira.saldo()}`);






