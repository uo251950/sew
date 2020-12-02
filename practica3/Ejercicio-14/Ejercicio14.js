
class Geolocalizacion {
    constructor() {
        this.output = document.getElementById("ubicacion");
        this.latitude = null;
        this.longitude = null;
        this.altitude = null;
    }

    realizarAccion() {
        if (!navigator.geolocation){
            miposicion.output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }
        else {
            navigator.geolocation.getCurrentPosition(this.geolocalizar, this.error);
        }
    }

    geolocalizar(position) {
        miposicion.latitude = position.coords.latitude;
        miposicion.longitude = position.coords.longitude;
        miposicion.altitude = position.coords.accuracy;

        miposicion.output.innerHTML = '<p>Latitude is ' + miposicion.latitude + '° <br>Longitude is ' + miposicion.longitude + '° <br>Longitude is ' + miposicion.altitude + 'm</p>';

        miposicion.getMapaEstaticoGoogle("mapa");
    }

    error(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                miposicion.output.innerHTML = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                miposicion.output.innerHTML = "Información de geolocalizaciónn no disponible"
                break;
            case error.TIMEOUT:
                miposicion.output.innerHTML = "La petición de geolocalizaciónn ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                miposicion.output.innerHTML = "Se ha producido un error desconocido"
                break;
        }
    }

    getMapaEstaticoGoogle(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);

        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";

        var centro = "center=" + miposicion.latitude + "," + miposicion.longitude;

        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";

        var marcador = "&markers=color:red%7Clabel:S%7C" + miposicion.latitude + "," + miposicion.longitude;

        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"'/>";
    }
}

let miposicion = new Geolocalizacion();
miposicion.realizarAccion();

const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');

let coord = {x:0 , y:0};

let paint = false;

class Canvas {
    resize(){
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    getPosition(event){
        coord.x = event.clientX - canvas.offsetLeft;
        coord.y = event.clientY - canvas.offsetTop;
    }

    startPainting(event){
        paint = true;
        can.getPosition(event);
    }

    stopPainting(){
        paint = false;
    }

    sketch(event){
        if (!paint) return;
        ctx.beginPath();

        ctx.lineWidth = 5;

        ctx.lineCap = 'round';

        ctx.strokeStyle = 'green';

        ctx.moveTo(coord.x, coord.y);

        can.getPosition(event);

        ctx.lineTo(coord.x , coord.y);

        ctx.stroke();
    }
}

var can = new Canvas();

window.addEventListener('load', ()=>{

    can.resize();
    document.addEventListener('mousedown', can.startPainting);
    document.addEventListener('mouseup', can.stopPainting);
    document.addEventListener('mousemove', can.sketch);
    window.addEventListener('resize', can.resize);
});

class Comprobacion {
    static isNavegadorValido() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            document.write("<p>Este navegador soporta el API File </p>");
            return true;
        }
        else {
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
            return false;
        }
    }
}

class File {
    realizaAccion(archivos) {
        var archivo = archivos[0];
        var nombre = document.getElementById("nombreArchivo");
        var tamaño = document.getElementById("tamañoArchivo");
        var tipo = document.getElementById("tipoArchivo");
        var ultima = document.getElementById("ultimaModificacion");
        var contenido = document.getElementById("contenidoArchivo");
        var areaVisualizacion = document.getElementById("areaTexto");
        var errorArchivo = document.getElementById("errorLectura");
        nombre.innerText = "Nombre del archivo: " + archivo.name;
        tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes";
        tipo.innerText = "Tipo del archivo: " + archivo.type;
        ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
        contenido.innerText="Contenido del archivo de texto:"

        var lector = new FileReader();
        lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            areaVisualizacion.innerText = lector.result;
        }
        lector.readAsText(archivo);

        document.getElementById("label").remove();
        document.getElementById("archivoTexto").remove();
    }
}

var file = null;

if (Comprobacion.isNavegadorValido()) {
    function ejecutar(archivos) {
        if(file == null)
            file = new File();

        file.realizaAccion(archivos);
    }
}