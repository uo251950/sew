class CalculadoraBasica {
    constructor() {
        this.pantalla = document.getElementById("salida");
        this.memoria = [];
        this.ans = 0;
        this.acabaDeOperar = false;
        this.mc = 0;
    }

    get getStringMemoria() {
        let stringMemoria = "";

        for (let i = 0; i < this.memoria.length; i++)
            stringMemoria += this.memoria[i];

        return stringMemoria;
    }

    almacenar(datos) {
        this.memoria.push(datos);
    }

    limpiar() {
        this.memoria = [];
    }

    realizaAccion(elemento) {
        switch (elemento.className) {
            case "teclaBasica":
                this.#visualizarNumero(elemento.value);
                break;
            case "igual":
                this.#realizarOperacion(elemento.value);
                break;
            case "opcion":
                this.#aplicarOpcion(elemento.value);
                break;
        }
    }

    #visualizarNumero(tecla) {
        this.teclaBasica = new TeclaBasica(tecla);
        this.teclaBasica.mostrar();
    }

    #aplicarOpcion(opcion) {
        this.opcion = new Opcion(opcion);
        this.opcion.ejecutar();
    }

    #realizarOperacion(valor) {
        this.igual = new Igual(valor);
        this.igual.evaluar();
    }
}

class TeclaBasica {
    constructor(tecla) {
        this.tecla = tecla;
    }

    isContinuarOperacion() {
        return calculadora.acabaDeOperar && (this.tecla === "+" || this.tecla === "-" || this.tecla === "*" || this.tecla === "/");
    }

    mostrar() {
        if(this.isContinuarOperacion()) {
            calculadora.almacenar(calculadora.ans);
            calculadora.pantalla.innerHTML = calculadora.getStringMemoria;
        }

        if(this.#isEstadoInicial()) {
            if(this.tecla === '.')
                calculadora.pantalla.innerHTML = "0.";
            else
                calculadora.pantalla.innerHTML = this.tecla;

            calculadora.almacenar(calculadora.pantalla.innerHTML);
        }
        else {
            calculadora.almacenar(this.tecla);
            calculadora.pantalla.innerHTML = calculadora.getStringMemoria;
        }

        calculadora.acabaDeOperar = false;
    }

    #isEstadoInicial() {
        return (calculadora.memoria.length === 0);
    }
}

class Opcion {
    constructor(opcion) {
        this.opcion = opcion;
    }

    ejecutar() {
        switch (this.opcion) {
            case "M+":
                this.#mMas();
                break;
            case "M-":
                this.#mMenos();
                break;
            case "MRC":
                this.#mrc();
                break;
            case "C":
                this.#borrar()
                break;
        }
    }

    #mMas() {
        calculadora.mc += parseFloat(calculadora.pantalla.innerHTML);
    }

    #mMenos() {
        calculadora.mc -= parseFloat(calculadora.pantalla.innerHTML);
    }

    #mrc() {
        calculadora.pantalla.innerHTML = calculadora.mc.toString();
    }

    #borrar() {
        calculadora.pantalla.innerHTML = "0";
        calculadora.memoria = [];
        calculadora.acabaDeOperar = false;
    }
}

class Igual {
    constructor(simbolo) {
        this.simbolo = simbolo;
    }

    evaluar() {
        if(this.isIgual()) {
            let resultado = null;
            try {
                resultado = eval(calculadora.getStringMemoria);
            }
            catch (e){ }

            calculadora.limpiar();

            if(typeof resultado === "undefined" || resultado == null)
                calculadora.pantalla.innerHTML = "Syntax ERROR";
            else {
                calculadora.ans = resultado;
                calculadora.pantalla.innerHTML = resultado;
                calculadora.acabaDeOperar = true;
            }
        }
    }

    isIgual() {
        return (this.simbolo === "=");
    }
}

let calculadora = null;

function ejecutar(boton) {
    if(calculadora == null)
        calculadora = new CalculadoraBasica();

    calculadora.realizaAccion(boton);
}