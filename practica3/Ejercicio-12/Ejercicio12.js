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
        var tipoTexto = /text.plain/;
        var tipoJson = /text.xml/;
        var tipoXml = /application.json/;

        if (archivo.type.match(tipoTexto) || archivo.type.match(tipoXml) || archivo.type.match(tipoJson))
        {
            var lector = new FileReader();
            lector.onload = function (evento) {
                areaVisualizacion.innerText = lector.result;
            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }

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

