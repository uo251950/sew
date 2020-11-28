class Pila {
    constructor (nombre){
        this.nombre = nombre;
        this.pila = new Array();
    }

    apilar(valor){
        this.pila.push(valor);
    }

    desapilar(){
        return (this.pila.pop());
    }

    mostrar(){
        let stringPila = "";

        for (var i in this.pila)
            stringPila += "[ " + this.pila[i] + " ]" + "\t";

        return stringPila;
    }

    isVacia() {
        return this.pila.length === 0;
    }

    get getLegth() {
        return this.pila.length;
    }
}

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
                this.visualizarNumero(elemento.value);
                break;
            case "igual":
                this.realizarOperacion(elemento.value);
                break;
            case "opcion":
                this.acabaDeOperar = false;
                this.aplicarOpcion(elemento.value);
                break;
        }
    }

    visualizarNumero(tecla) {
        this.teclaBasica = new TeclaBasica(tecla);
        this.teclaBasica.mostrar();
    }

    aplicarOpcion(opcion) {
        this.opcion = new Opcion(opcion);
        this.opcion.ejecutar();
    }

    realizarOperacion(valor) {
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
            //calculadora.almacenar(calculadora.ans);
            calculadora.pantalla.innerHTML = calculadora.getStringMemoria;
        }

        if(calculadora.isEstadoInicial()) {
            if(this.tecla === '.')
                calculadora.getPantallaEntrada.innerHTML = "0.";
            else
                calculadora.getPantallaEntrada.innerHTML = this.tecla;

            calculadora.setEstadoInicial = false;
        }
        else
            calculadora.getPantallaEntrada.innerHTML += this.tecla;

        calculadora.acabaDeOperar = false;
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
            case "MRC":
                this.#mrc();
                break;
            case "pi":
                this.#pi()
                break;
            case "e":
                this.#euler()
                break;
            case "Ran":
                this.#random();
                break;
            case "Ans":
                this.#ans();
                break;
            default:
                break;
        }
    }

    #ans() {
        calculadora.getPantallaEntrada.innerHTML = calculadora.ans.toString();
    }

    #mrc() {
        calculadora.getPantallaEntrada.innerHTML = calculadora.mc.toString();
    }

    #borrar() {
        calculadora.getPantallaEntrada.innerHTML = "0";
        calculadora.getPantallaSalida.innerHTML = "Pila vacía";
        calculadora.limpiar();
        calculadora.acabaDeOperar = false;
        calculadora.setEstadoInicial = true;
    }

    #euler() {
        calculadora.getPantallaEntrada.innerHTML = Math.E.toString();
    }

    #pi() {
        calculadora.getPantallaEntrada.innerHTML = Math.PI.toString();
    }

    #random() {
        calculadora.getPantallaEntrada.innerHTML = Math.random().toString();
    }
}

class OpcionUnaria extends Opcion {
    constructor(opcion) {
        super(opcion);
        this.op1 = null;
    }

    ejecutar() {
        if(calculadora.memoria.pila.length < 1) { return; }

        switch (this.opcion) {
            case "M+":
                this.#mMas();
                break;
            case "M-":
                this.#mMenos();
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
        }
    }

    #mMas() {
        this.op1 = calculadora.memoria.desapilar();
        calculadora.memoria.apilar(this.op1)
        calculadora.mc += parseFloat(this.op1);
    }

    #mMenos() {
        this.op1 = calculadora.memoria.desapilar();
        calculadora.memoria.apilar(this.op1)
        calculadora.mc -= parseFloat(this.op1);
    }

    #sin() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.sin(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #cos() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.cos(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #tan() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.tan(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #asin() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.asin(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #acos() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.acos(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #atan() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.atan(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #exp() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.exp(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #log() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.log10(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #ln() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.log(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #abs() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = Math.abs(parseFloat(this.op1));
        this.#finalizarOpcion();
    }

    #cot() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(1/Math.tan(this.op1));
        this.#finalizarOpcion();
    }

    #csc() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(1/Math.sin(this.op1));
        this.#finalizarOpcion();
    }

    #sec() {
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(1/Math.cos(this.op1));
        this.#finalizarOpcion();
    }

    #finalizarOpcion() {
        calculadora.memoria.apilar(this.sol);
        calculadora.getPantallaEntrada.innerHTML = "0";
        calculadora.getPantallaSalida.innerHTML = calculadora.memoria.mostrar();
    }
}

class OpcionBinaria extends Opcion {
    constructor(opcion) {
        super(opcion);
        this.op1 = null;
        this.op2 = null;
    }

    ejecutar(){
        if(calculadora.memoria.pila.length < 2) { return; }

        switch (this.opcion) {
            case "+":
                this.#suma()
                break;
            case "-":
                this.#resta()
                break;
            case "*":
                this.#producto()
                break;
            case "/":
                this.#division()
                break;
            case "**":
                this.#pow()
                break;
            default:
                break;
        }
    }

    #suma() {
        this.op2 = calculadora.memoria.desapilar();
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(this.op1) + parseFloat(this.op2);
        this.#finalizarOpcion();
    }

    #resta() {
        this.op2 = calculadora.memoria.desapilar();
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(this.op1) - parseFloat(this.op2);
        this.#finalizarOpcion();
    }

    #producto() {
        this.op2 = calculadora.memoria.desapilar();
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(this.op1) * parseFloat(this.op2);
        this.#finalizarOpcion();
    }

    #division() {
        this.op2 = calculadora.memoria.desapilar();
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(this.op1) / parseFloat(this.op2);
        this.#finalizarOpcion();
    }

    #pow() {
        this.op2 = calculadora.memoria.desapilar();
        this.op1 = calculadora.memoria.desapilar();
        this.sol = parseFloat(this.op1) ** parseFloat(this.op2);
        this.#finalizarOpcion();
    }

    #finalizarOpcion() {
        calculadora.memoria.apilar(this.sol);
        calculadora.getPantallaEntrada.innerHTML = "0";
        calculadora.getPantallaSalida.innerHTML = calculadora.memoria.mostrar();
    }
}

class Enter {
    constructor(simbolo) {
        this.simbolo = simbolo;
    }

    evaluar() {
        calculadora.memoria.apilar(calculadora.getPantallaEntrada.innerText);
        calculadora.getPantallaSalida.innerHTML = calculadora.memoria.mostrar();
        calculadora.setEstadoInicial = true;
    }
}

class CalculadoraRPN extends CalculadoraBasica {
    constructor() {
        super();
        this.pantallaEntrada = document.getElementById("entrada");
        this.memoria = new Pila("RPN");
        this.estadoInicial = true;
    }

    get getPantallaEntrada() {
        return this.pantallaEntrada;
    }

    get getPantallaSalida() {
        return this.pantalla;
    }

    realizaAccion(elemento) {
        if(elemento.value === "+-") {
            this.#cambioSigno();
            return;
        }

        switch (elemento.className) {
            case "teclaBasica":
                this.visualizarNumero(elemento.value);
                break;
            case "enter":
                this.realizarOperacion(elemento.value);
                break;
            case "opcion":
                this.acabaDeOperar = false;
                super.aplicarOpcion(elemento.value);
                break;
            case "opcionBinaria":
                this.acabaDeOperar = false;
                this.#aplicarOpcionBinaria(elemento.value);
                break;
            case "opcionUnaria":
                this.acabaDeOperar = false;
                this.#aplicarOpcionUnaria(elemento.value);
                break;
        }
    }

    #aplicarOpcionUnaria(opcion) {
        this.opcionUnaria = new OpcionUnaria(opcion);
        this.opcionUnaria.ejecutar();
    }

    #aplicarOpcionBinaria(opcion) {
        this.opcionBinaria = new OpcionBinaria(opcion);
        this.opcionBinaria.ejecutar();
    }

    #cambioSigno() {
        if (Math.sign(calculadora.getPantallaEntrada.innerText) === 1)
            calculadora.getPantallaEntrada.innerHTML = "-" + calculadora.getPantallaEntrada.innerHTML;
        else if (Math.sign(calculadora.getPantallaEntrada.innerText) === -1)
            calculadora.getPantallaEntrada.innerHTML = calculadora.getPantallaEntrada.innerText.split("-")[calculadora.getPantallaEntrada.innerText.length-1];
    }

    almacenar(datos) {
        if(datos !== "Ans")
            this.memoria.apilar(datos);
        else
            this.memoria.apilar(calculadora.ans);
    }

    limpiar() {
        this.memoria = new Pila("RPN");
    }

    realizarOperacion(valor) {
        this.enter = new Enter(valor);
        this.enter.evaluar();
    }

    get getStringMemoria() {
        let stringMemoria = "";

        for (let i = 0; i < this.memoria.getLegth; i++)
            stringMemoria += this.memoria.pila[i];

        return stringMemoria;
    }

    isEstadoInicial() {
        return this.estadoInicial;
    }

    set setEstadoInicial(bool) {
        this.estadoInicial = bool;
    }
}

var calculadora = null;

function ejecutar(boton) {
    if(calculadora == null)
        calculadora = new CalculadoraRPN();

    calculadora.realizaAccion(boton);
}