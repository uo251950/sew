
class Geolocalizacion {
    constructor() {
        this.output = document.getElementById("ubicacion");
    }

    realizarAccion() {
        if (!navigator.geolocation){
            miposicion.output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }
        else
            navigator.geolocation.getCurrentPosition(this.geolocalizar, this.error);
    }

    geolocalizar(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.accuracy;

        miposicion.output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '° <br>Longitude is ' + altitude + 'm</p>';
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
}

let miposicion = null;

function ejecutar() {
    if(miposicion == null)
        miposicion = new Geolocalizacion();

    miposicion.realizarAccion();
}