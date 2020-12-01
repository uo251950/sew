
class CalculadoraBasica {
    constructor() {
        this.pantallaEntrada = document.getElementById("entrada");
        this.memoria = [];
        this.modo = new ModoPrestamo();
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
            case "opcion":
                this.acabaDeOperar = false;
                this.#aplicarOpcion(elemento.value);
                break;
            case "modoPrestamo":
                calculadora.modoPrestamo();
                this.#mostrarModo();
                break;
            case "modoInteres":
                calculadora.modoInteres();
                this.#mostrarModo();
                break;
            case "modoTiempo":
                calculadora.modoTiempo();
                this.#mostrarModo();
                break;
            case "enter":
                this.#agregar();
                break;
            case "calcular":
                CalculadoraFinanciera.calcular();
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

    #agregar() {
        this.enter = new Enter();
        this.enter.add();
        this.limpiar();
        this.#mostrarMemoria();
    }

    #mostrarModo() {
        if(this.modo instanceof ModoPrestamo)
            document.getElementById("modo").innerHTML = "Modo préstamo";
        else if(this.modo instanceof ModoInteres)
            document.getElementById("modo").innerHTML = "Modo interés";
        else if(this.modo instanceof ModoTiempo)
            document.getElementById("modo").innerHTML = "Modo tiempo";
    }

    #mostrarMemoria() {
        if(calculadora.prestamo != null )
            document.getElementById("mprestamo").innerHTML = calculadora.prestamo;
        if(calculadora.interes != null)
            document.getElementById("minteres").innerHTML = calculadora.interes;
        if(calculadora.tiempo != null)
            document.getElementById("mtiempo").innerHTML = calculadora.tiempo;
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
            calculadora.pantallaEntrada.innerHTML = calculadora.getStringMemoria;
        }

        if(this.#isEstadoInicial()) {
            if(this.tecla === '.')
                calculadora.pantallaEntrada.innerHTML = "0.";
            else
                calculadora.pantallaEntrada.innerHTML = this.tecla;

            calculadora.almacenar(calculadora.pantallaEntrada.innerHTML);
        }
        else {
            calculadora.almacenar(this.tecla);
            calculadora.pantallaEntrada.innerHTML = calculadora.getStringMemoria;
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
            default:
                break;

        }
    }

    #mMas() {
        calculadora.mc += parseFloat(calculadora.pantallaEntrada.innerHTML);
    }

    #mMenos() {
        calculadora.mc -= parseFloat(calculadora.pantallaEntrada.innerHTML);
    }

    #mrc() {
        calculadora.pantallaEntrada.innerHTML += calculadora.mc.toString();
        calculadora.almacenar(calculadora.mc);
    }

    #borrar() {
        calculadora.pantallaEntrada.innerHTML = "0";
        calculadora.limpiar();
        calculadora.acabaDeOperar = false;
    }
}

class ModoPrestamo {
    constructor() {
        this.prestamo = null;
    }

    set setPrestamo(valor) {
        if(valor >= 0)
            this.prestamo = valor;
        else
            calculadora.pantallaEntrada.innerHTML = "Math ERROR";
    }

    get getPrestamo() {
        return this.prestamo;
    }
}


class ModoInteres {
    constructor() {
        this.interes = null;
    }

    set setInteres(valor) {
        if(valor >= 0 && valor <= 100) {
            if(valor%1 === 0)
                this.interes = valor/100;
            else {
                if (valor > 1)
                    this.interes = valor / 100;
                else
                    this.interes = valor;
            }
        }
        else
            calculadora.pantallaEntrada.innerHTML = "Math ERROR";
    }

    get getInteres() {
        return this.interes;
    }
}

class ModoTiempo {
    constructor() {
        this.tiempo = null;
    }

    set setTiempo(valor) {
        if(valor > 0)
            this.tiempo = valor;
        else
            calculadora.pantallaEntrada.innerHTML = "Math ERROR";
    }

    get getTiempo() {
        return this.tiempo;
    }
}

class Enter {
    add() {
        if(calculadora.modo instanceof ModoPrestamo) {
            calculadora.modo.setPrestamo = parseFloat(calculadora.pantallaEntrada.innerText);
            calculadora.prestamo = calculadora.modo.getPrestamo;
        }
        else if(calculadora.modo instanceof ModoInteres) {
            calculadora.modo.setInteres = parseFloat(calculadora.pantallaEntrada.innerHTML);
            calculadora.interes = calculadora.modo.getInteres;
        }
        else if(calculadora.modo instanceof ModoTiempo) {
            calculadora.modo.setTiempo = parseFloat(calculadora.pantallaEntrada.innerHTML);
            calculadora.tiempo = calculadora.modo.getTiempo;
        }
    }
}

class CalculadoraFinanciera extends CalculadoraBasica {
    constructor() {
        super();
        this.pantallaSalida = document.getElementById("salida");
        this.modoPrestamo();
    }

    modoPrestamo() {
        this.modo = new ModoPrestamo();
    }

    modoInteres() {
        this.modo = new ModoInteres();
    }

    modoTiempo() {
        this.modo = new ModoTiempo();
    }

    realizaAccion(elemento) {
        super.realizaAccion(elemento);
    }

    static calcular() {
        if(calculadora.prestamo != null && calculadora.interes != null && calculadora.tiempo != null)
            calculadora.pantallaSalida.innerHTML = ((calculadora.prestamo*calculadora.interes)+calculadora.prestamo)/calculadora.tiempo;
        else
            calculadora.pantallaSalida.innerHTML = "Math ERROR";
    }
}

var calculadora = null;

function ejecutar(boton) {
    if(calculadora == null)
        calculadora = new CalculadoraFinanciera();

    calculadora.realizaAccion(boton);
}