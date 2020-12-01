
class Noticia {
    constructor() {
        this.apikey = "5667dcc78b334c379d7dc2d10771d820";
        this.url = "http://newsapi.org/v2/top-headlines?" +
            "country=us&" +
            "apiKey=" + this.apikey;
        $.get(this.url, (datos) => this.obtenerNoticias(datos));
    }

    crearElemento(tipoElemento, texto, insertarAntesDe, nParrafo){
        var elemento = document.createElement(tipoElemento);
        elemento.setAttribute("id", nParrafo)
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    obtenerNoticias(news) {
        for(let i = 1; i < news.articles.length; i++) {
            this.crearElemento("article","","footer", i);
            $.ajax({
                dataType: "json",
                url: this.url,
                method: 'GET',
                success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                    var stringDatos = "";

                    stringDatos += "<h2>" + datos.articles[i].title + "</h2>";
                    stringDatos += "<h3>" + datos.articles[i].description + "</h3>";
                    stringDatos += "<h4>" + datos.articles[i].author + "</h4>";
                    stringDatos += "<h5>" + datos.articles[i].publishedAt + "</h5>";
                    stringDatos += "<p>" + datos.articles[i].content + "</p>";

                    $("#"+i).html(stringDatos);
                },
                error:function(){
                    $("h3").html("¡Tenemos problemas! No puedo obtener JSON de noticias");
                    $("pre").remove();
                    $("p").remove();
                }
            });
        }
    }
}

var noticia = new Noticia();