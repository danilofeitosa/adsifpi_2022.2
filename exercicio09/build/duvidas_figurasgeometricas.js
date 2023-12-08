"use strict";
class FiguraGeometrica {
}
class Retangulo extends FiguraGeometrica {
    constructor(l1, l2) {
        super();
        this.l1 = l1;
        this.l2 = l2;
    }
    calcualarArea() {
        return this.l1 * this.l2;
    }
    calcualarPerimetro() {
        return (this.l1 + this.l2) * 2;
    }
}
class Quadrado {
    constructor(l) {
        this.l = l;
    }
    calcualarArea() {
        return this.l * this.l;
    }
    calcualarPerimetro() {
        return 4 * this.l;
    }
}
//# sourceMappingURL=duvidas_figurasgeometricas.js.map