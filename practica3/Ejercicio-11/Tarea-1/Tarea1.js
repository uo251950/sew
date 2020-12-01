
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
            navigator.geolocation.getCurrentPosition(this.geolocalizar);
    }

    geolocalizar(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var altitude = position.coords.accuracy;

        miposicion.output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '° <br>Longitude is ' + altitude + 'm</p>';
    }
}

let miposicion = null;

function ejecutar() {
    if(miposicion == null)
        miposicion = new Geolocalizacion();

    miposicion.realizarAccion();
}