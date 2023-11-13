"use strict";
/**
 01) A diferença se dá que a dinâmica muda o tipo das variáveis intuitivamente ao longo da execução do programa, já com relação à estática, o tipo é declarado de forma explicita e a mesma permanece inalterada ao longo da execução do programa.
 */
/**
 02) A tipagem dinâmica pode levar a erros de runtime, erros estes que são difíceis de serem rastreados, ocasionando dificuldade também para manutenção do código.
 */
/**
 03) Um exemplo que pode ocorrer é na hora de fazer uma operação aritmética entre valores em que não ocorre verificação da tipagem, que ao invés de somar ele concatena os valores. Exemplo: 1 + “1” = 11
 */
/**
 04) A linguagem C é conhecida por ter tipagem fraca, o que significa que as conversões implícitas entre tipos podem ocorrer sem que o programador seja alertado. Exemplo dessa tipagem fraca seria a de somar um número inteiro  com um ponto flutuante, quando pode haver a perda da casa decimal ao arredondar o ponto flutuante sem que o programador tenha especificado, causando divergência de dados.
 */
/**
 05) A exemplo de casos em que seja necessário dar uma resposta, a depender do tipo resultante da operação, a variável pode ser tipado em any para que o compilador não apresente erro.
Um exemplo fornecido pelo Chatgpt seria:

function processComment(comment: any): void {
    if (typeof comment === "string") {
        console.log("Received a tex comment:", comment);
    } else if (comment instanceof File) {
        console.log("Received an uploaded file", comment.name);
    } else {
        console.log("Received a comment of unknow type:", comment);
    }
}

const textComment = "This is a great article!";
const imageFile = new File(["image data"], "image.jpg");

processComment(textComment);
processComment(imageFile);

“Neste exemplo, a função processComment recebe um comentário do tipo "any", pois os comentários podem ser de diferentes tipos, como strings ou objetos do tipo File (um tipo que representa arquivos carregados). Ao usar "any", você pode lidar com diferentes tipos de entrada sem emitir erros de compilação. A função verifica o tipo da entrada usando condicionais e executa ações específicas com base nesse tipo.”
 */
/**
 06) Não, apenas é uma característica da linguagem de aceitar vários tipos numéricos. Pelo contrário, é dita uma linguagem estática e forte, pois apresenta erro de tipagem já na fase da escrita do código.
 */
/**
 07)

 const nome = "Ely"
 const vr_pagamento = 120.56
 const linguagem = "Typescript"

 const message = `${nome}
 My payment time is ${vr_pagamento}
 and
 my preferred language is ${linguagem}`;

 console.log(messagem);
 */
/**
08) Arquivo tsconfig.json criado e modificado.
*/
//# sourceMappingURL=exercicio02.js.map