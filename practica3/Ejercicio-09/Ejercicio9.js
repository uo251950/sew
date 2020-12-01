class Meteo {
    constructor(boton){
        this.boton = boton;
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.codigoPais = "ES";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.mostrado = false;
    }

    realizarAccion(boton) {
        switch (boton.id) {
            case "malaga":
                this.#malaga();
                break;
            case "estepona":
                this.#estepona();
                break;
            case "llanes":
                this.#llanes();
                break;
            case "marbella":
                this.#marbella();
                break;
            case "jerez":
                this.#torremolinos();
                break;
        }
    }

    evaluar(lugar) {
        if(!this.mostrado)
            this.mostrado = true;
        else {
            this.limpiar();
            this.mostrado = false;
        }

        this.mostrarDatos(lugar.ciudad, lugar.url);
    }

    #malaga() {
        this.malaga = new Malaga(this.boton);
        this.evaluar(this.malaga);
    }

    #estepona() {
        this.estepona = new Estepona(this.boton);
        this.evaluar(this.estepona);
    }

    #llanes() {
        this.llanes = new Llanes(this.boton);
        this.evaluar(this.llanes);
    }

    #marbella() {
        this.marbella = new Marbella(this.boton);
        this.evaluar(this.marbella);
    }

    #torremolinos() {
        this.jerez = new Jerez(this.boton);
        this.evaluar(this.jerez);
    }

    cargarDatos(url){
        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: function(datos){
                var ciudad                = $('city',datos).attr("name");
                var longitud              = $('coord',datos).attr("lon");
                var latitud               = $('coord',datos).attr("lat");
                var pais                  = $('country',datos).text();
                var amanecer              = $('sun',datos).attr("rise");
                var minutosZonaHoraria    = new Date().getTimezoneOffset();
                var amanecerMiliSeg1970   = Date.parse(amanecer);
                amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var oscurecer             = $('sun',datos).attr("set");
                var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var presion               = $('pressure',datos).attr("value");
                var presionUnit           = $('pressure',datos).attr("unit");
                var velocidadViento       = $('speed',datos).attr("value");
                var nombreViento          = $('speed',datos).attr("name");
                var direccionViento       = $('direction',datos).attr("value");
                var codigoViento          = $('direction',datos).attr("code");
                var nombreDireccionViento = $('direction',datos).attr("name");
                var nubosidad             = $('clouds',datos).attr("value");
                var nombreNubosidad       = $('clouds',datos).attr("name");
                var visibilidad           = $('visibility',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var precipitacionMode     = $('precipitation',datos).attr("mode");
                var descripcion           = $('weather',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                var icono                 = $('weather',datos).attr("icon");

                var stringDatos = "";

                stringDatos += "<main id='datos'>";
                stringDatos += "<img id=\"wicon\" src=\"\" alt=\"Weather icon\">"
                stringDatos += "<li>Ciudad: " + ciudad + "</li>";
                stringDatos += "<li>Longitud: " + longitud + " grados</li>";
                stringDatos += "<li>Latitud: " + latitud + " grados</li>";
                stringDatos += "<li>País: " + pais + "</li>";
                stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                stringDatos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
                stringDatos += "<li>Presión: " + presion + " " + presionUnit + "</li>";
                stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
                stringDatos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                stringDatos += "<li>Código del viento: " + codigoViento + "</li>";
                stringDatos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
                stringDatos += "<li>Nubosidad: " + nubosidad + "</li>";
                stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
                stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
                stringDatos += "<li>Precipitación modo: " + precipitacionMode + "</li>";
                stringDatos += "<li>Descripción: " + descripcion + "</li>";
                stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";

                $("p").html(stringDatos);

                let iconurl = "http://openweathermap.org/img/w/" + icono + ".png";
                $('#wicon').attr('src', iconurl);
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("p").remove();
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento);
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    mostrarDatos(ciudad, url){
        this.crearElemento("h4","Datos de " + ciudad,"footer");
        this.crearElemento("p","","footer");
        this.cargarDatos(url);
        this.mostrado = true;
    }

    limpiar() {
        $("#datos").remove();
        $("h4").remove();
        $("p").remove();
    }
}

class Malaga extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Málaga";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Estepona extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Estepona";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Llanes extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Llanes";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Marbella extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Marbella";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Jerez extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Jerez de la Frontera";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

var meteo = null;

function ejecutar(boton) {
    if(meteo == null)
        meteo = new Meteo(boton);

    meteo.realizarAccion(boton);
}