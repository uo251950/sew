class Mapa {
    initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 11,
            center: { lat: 41.876, lng: -87.624 },
        });

        const ctaLayer = new google.maps.KmlLayer({
            url: "https://uo251950.github.io/sew/practica3/rutas.kml",
            map: map,
        });
    }
}

var mapa = new Mapa();