
class Geolocalizacion {
    constructor() {
        this.output = document.getElementById("ubicacion");
        this.latitude = null;
        this.longitude = null;
        this.coord = null;
        this.opciones = null;
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
        miposicion.coord = new google.maps.LatLng(miposicion.latitude, miposicion.longitude);
        miposicion.opciones = {
            zoom: 9,
            center: this.coord,
            mapTypeId: google.maps.MapyTypeId.ROADMAP
        }

        var mapa = new google.maps.Map(document.getElementById("mapa"), this.opciones);
        var marker = new google.maps.Marker({map:mapa, position:this.coord});

        //miposicion.output.innerHTML = '<p>Latitude is ' + miposicion.latitude + '° <br>Longitude is ' + miposicion.longitude + '° <br>Longitude is ' + miposicion.altitude + 'm</p>';

        //miposicion.getMapaEstaticoGoogle("mapa");
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

let miposicion = null;

function ejecutar() {
    if(miposicion == null)
        miposicion = new Geolocalizacion();

    miposicion.realizarAccion();
}