class Meteo {
    constructor(boton){
        this.boton = boton;
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.mostrado = false;
    }

    realizarAccion(boton) {
        switch (boton.className) {
            case "malaga":
                this.#malaga();
                break;
            case "estepona":
                this.#estepona();
                break;
            case "llanes":
                this.#llanes();
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

    cargarDatos(url){
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2));
                var stringDatos = "";

                stringDatos += "<main id='datos'>";
                stringDatos += "<img id=\"wicon\" src=\"\" alt=\"Weather icon\">"
                stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>País: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                stringDatos += "</main>";

                $("p").html(stringDatos);

                let iconcode = datos.weather[0].icon;
                let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $('#wicon').attr('src', iconurl);
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>");
                $("h4").remove();
                $("pre").remove();
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
        this.crearElemento("h4","Datos de " + ciudad,"footer"); // Crea un elemento con DOM
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con JSON
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
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Estepona extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Estepona";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

class Llanes extends Meteo {
    constructor(boton) {
        super(boton);
        this.ciudad = "Llanes";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
    }
}

var meteo = null;

function ejecutar(boton) {
    if(meteo == null)
        meteo = new Meteo(boton);

    meteo.realizarAccion(boton);
}