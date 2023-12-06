abstract class  FiguraGeometrica {
    abstract calcualarArea(): number;
    abstract calcualarPerimetro(): number;
}

class Retangulo extends FiguraGeometrica{
    l1: number;
    l2: number;

    constructor(l1: number, l2: number) {
        super();
        this.l1 = l1;
        this.l2 = l2;
    }

    calcualarArea(): number {
        return this.l1 * this.l2;
    }
    calcualarPerimetro(): number {
        return (this.l1 + this.l2) *2 ;
    }
}


interface IFiguraGeometrica {
    calcualarArea(): number;
    calcualarPerimetro(): number;
}

class Quadrado implements IFiguraGeometrica{
    l: number; 

    constructor(l: number) {
        this.l = l;
    }
    calcualarArea(): number {
        return this.l * this.l;        
    }
    calcualarPerimetro(): number {
        return 4 * this.l;
    }
}