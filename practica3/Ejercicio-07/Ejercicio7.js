class Ejercicio7 {
    constructor(boton) {
        this.clase = boton;
    }

    realizarAccion(boton) {
        switch (boton.className) {
            case "ocultar":
                this.#ocultar(this.#palabraClave(boton.value));
                break;
            case "mostrar":
                this.#mostrar(this.#palabraClave(boton.value));
                break;
            case "modificarParrafo1":
                this.#modificarParrafo1();
                break;
            case "añadirAParrafo2":
                this.#añadirAParrafo2();
                break;
            case "verAtributos":
                this.#verAtributos();
                break;
            case "cambiarAtributos":
                this.#cambiarAtributos();
                break;
            case "añadirNuevoParrafo":
                this.#añadirNuevoParrafo();
                break;
            case "eliminarTabla":
                this.#eliminarTabla();
                break;
            case "añadirNuevoTituloH1Aqui":
                this.#nuevoTitulo(1);
                break;
            case "añadirNuevoTituloH2Aqui":
                this.#nuevoTitulo(2);
                break;
            case "añadirNuevoTituloH3Aqui":
                this.#nuevoTitulo(3);
                break;
            case "eliminarNuevosParrafos":
                this.#eliminarNuevoParrafo();
                break;
            case "mostrarDOM":
                this.#mostrarDOM();
                break;
        }
    }

    #palabraClave(frase) {
        if(frase.includes("párrafos"))
            return "p";
        else if(frase.includes("ordenadas"))
            return "ol";
        else if(frase.includes("desordenadas"))
            return "ul";
        else if(frase.includes("h1"))
            return "h1";
        else if(frase.includes("h2"))
            return "h2";
        else if(frase.includes("h3"))
            return "h3";
        else if(frase.includes("tablas"))
            return "table";
        else if(frase.includes("enlaces"))
            return "a";
        else if(frase.includes("imágenes"))
            return "img";
        else if(frase.includes("mains"))
            return "main";
        else if(frase.includes("articles"))
            return "articles";
        else if(frase.includes("sections"))
            return "section";
        else if(frase.includes("navigator"))
            return "#hide";
    }

    #ocultar(elemento) {
        $(elemento).hide();
    }

     #mostrar(elemento) {
        $(elemento).show();
     }

    #modificarParrafo1() {
        $("#parrafo1").text($("#campoParrafo1").val());
    }

    #añadirAParrafo2() {
        $("#parrafo2").append($("#campoParrafo2").val());
    }

    #cambiarAtributos() {
        $("#campoParrafo2").attr("id", null);
        $("#parrafo2").attr("id",null);

        alert("Atributos cambiados\n"
            + "\n" + "Atributos del campo de texto inmediatamente superior al botón:\nid = " + $("#campoParrafo2").attr("id")
            + "\n" + "Atributos del párrafo inmediatamente superior al botón:\nid = " + $("#parrafo2").attr("id")
            + "\n\n" + "Deja, por tanto, de funcionar los elementos asociados."
        );
    }

    #verAtributos() {
        alert("Atributos iniciales\n"
            + "\n" + "Atributos del campo de texto inmediatamente superior al botón:\nid = " + $("#campoParrafo2").attr("id")
            + "\n" + "Atributos del párrafo inmediatamente superior al botón:\nid = " + $("#parrafo2").attr("id")
        );
    }

    #añadirNuevoParrafo() {
        $("#seccionTabla").append("<p class=\"nuevoParrafo\">NUEVO PÁRRAFO</p>");
        $("#seccionTabla").append("<p><input type=\"button\" class=\"eliminarNuevosParrafos\" value=\"Eliminar nuevos párrafos\" onclick=\"ejecutar(this)\"></p>");
    }

    #eliminarTabla() {
        $("#tabla1").remove();
    }

    #nuevoTitulo(number) {
        if(number === 1)
            $("#seccionTabla").append("<h1>NUEVO TITULO h1</h1>");
        else if(number === 2)
            $("#seccionTabla").append("<h2>NUEVO TÍTULO h2</h2>");
        else if(number === 3)
            $("#seccionTabla").append("<h3>NUEVO TÍTULO h3</h3>");
    }

    #eliminarNuevoParrafo() {
        $(".nuevoParrafo").remove();
    }

    #mostrarDOM() {
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
        });
    }
}

var ejercicio = null;

function ejecutar(boton) {
    if(ejercicio == null)
        ejercicio = new Ejercicio7(boton);

    ejercicio.realizarAccion(boton);
}