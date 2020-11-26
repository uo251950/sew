
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

    isEstaOperando() {
        return this.memoria[this.memoria.length-1] === "+" || this.memoria[this.memoria.length-1] === "-"
            || this.memoria[this.memoria.length-1] === "*" || this.memoria[this.memoria.length-1] === "/"
    }

    almacenar(datos) {
        if(datos !== "Ans")
            this.memoria.push(datos);
        else
            this.memoria.push(calculadora.ans);
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
                this.acabaDeOperar = false;
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
        return calculadora.acabaDeOperar && (this.tecla === "+" || this.tecla === "-" || this.tecla === "*" || this.tecla === "/" || this.tecla === "**");
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
        this.sol = null;
    }

    ejecutar() {
        switch (this.opcion) {
            case "C":
                this.#borrar()
                break;
            case "M+":
                this.#mMas();
                break;
            case "M-":
                this.#mMenos();
                break;
            case "MRC":
                this.#mrc();
                break;
            case "sin":
                this.#sin()
                break;
            case "cos":
                this.#cos()
                break;
            case "tan":
                this.#tan()
                break;
            case "asin":
                this.#asin()
                break;
            case "acos":
                this.#acos()
                break;
            case "atan":
                this.#atan()
                break;
            case "exp":
                this.#exp()
                break;
            case "log":
                this.#log()
                break;
            case "ln":
                this.#ln()
                break;
            case "pi":
                this.#pi()
                break;
            case "e":
                this.#euler()
                break;
            case "||":
                this.#abs();
                break;
            case "sec":
                this.#sec();
                break;
            case "csc":
                this.#csc();
                break;
            case "cot":
                this.#cot();
                break;
            case "Ran":
                this.#random();
                breaK;
            default:
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
       calculadora.pantalla.innerHTML += calculadora.mc.toString();
       calculadora.almacenar(calculadora.mc);
    }

    #borrar() {
        calculadora.pantalla.innerHTML = "0";
        calculadora.limpiar();
        calculadora.acabaDeOperar = false;
    }

    #sin() {
        this.sol = Math.sin(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #cos() {
        this.sol = Math.cos(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #tan() {
        this.sol = Math.tan(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #asin() {
        this.sol = Math.asin(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #acos() {
        this.sol = Math.acos(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #atan() {
        this.sol = Math.atan(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #exp() {
        this.sol = Math.exp(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #log() {
        this.sol = Math.log10(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #ln() {
        this.sol = Math.log(parseFloat(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #euler() {
        this.sol = Math.E;
        this.#finalizarOpcionOperacion(this.sol);
    }

    #pi() {
        this.sol = Math.PI;
        this.#finalizarOpcionOperacion(this.sol);
    }

    #abs() {
        this.sol = Math.abs(calculadora.pantalla.innerHTML);
        this.#finalizarOpcionOperacion(this.sol);
    }

    #cot() {
        this.sol = eval(1/Math.tan(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #csc() {
        this.sol = eval(1 / Math.sin(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #sec() {
        this.sol = eval(1/Math.cos(calculadora.pantalla.innerHTML));
        this.#finalizarOpcionOperacion(this.sol);
    }

    #random() {
        this.sol = Math.random();
        this.#finalizarOpcionOperacion(this.sol);
    }

    #finalizarOpcionOperacion(sol) {
        calculadora.pantalla.innerHTML = sol;
        calculadora.limpiar();
        calculadora.ans = sol;
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

class CalculadoraCientifica extends CalculadoraBasica {
    constructor() {
        super();
    }

    realizaAccion(elemento) {
        super.realizaAccion(elemento);
    }
}

var calculadora = null;

function ejecutar(boton) {
    if(calculadora == null)
        calculadora = new CalculadoraCientifica();

    calculadora.realizaAccion(boton);
}