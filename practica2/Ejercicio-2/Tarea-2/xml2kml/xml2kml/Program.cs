using System;
using System.IO;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Xml;

namespace xml2kml
{
    class Program
    {
        private static XmlReader inputXml;
        private static XmlDocument outputKml;
        private static string rutaUno;
        private static string rutaDos;
        private static string rutaTres;

        static void Main(string[] args)
        {
            // Comprobar argumentos
            if (args.Length < 2)
            {
                Console.WriteLine("\nError en el uso:\n" + "xml2kml <docXML> <docKML>");
                Console.WriteLine("Pulse cualquier tecla para continuar...");
                Console.ReadKey();
                Environment.Exit(-1);
            }

            // Crear fichero de salida y objeto de lectura
            inputXml = XmlReader.Create(args[0]);
            outputKml = new XmlDocument();
            rutaTres = rutaDos = rutaUno = "";
            GenerarRutas();
            GenerarKML();

            // Escritura del KML
            using FileStream fs = new FileStream(args[1], FileMode.Create);
            using StreamWriter w = new StreamWriter(fs, Encoding.UTF8);
            outputKml.Save(w);
        }

        private static void GenerarRutas()
        {
            StringBuilder coordenadas = new StringBuilder();
            float grados = float.NaN, minutos = float.NaN, segundos = float.NaN;
            char hemisferio = char.MinValue, esteOeste = char.MinValue;
            bool isLock = false;
            int count = 0;
            int indexRutas = 0;

            while (inputXml.Read())
            {
                if (inputXml.Name == "latitud")
                {
                    isLock = false;
                    inputXml.MoveToNextAttribute();
                    if (inputXml.NodeType == XmlNodeType.Attribute)
                        hemisferio = char.Parse(inputXml.Value);
                }
                else if (inputXml.Name == "longitud")
                {
                    isLock = true;
                    inputXml.MoveToNextAttribute();
                    if (inputXml.NodeType == XmlNodeType.Attribute)
                        esteOeste = char.Parse(inputXml.Value);
                }

                if (inputXml.Name == "grados")
                {
                    inputXml.Read();
                    if (inputXml.NodeType == XmlNodeType.Text)
                        grados = float.Parse(inputXml.Value);
                }
                else if (inputXml.Name == "minutos")
                {
                    inputXml.Read();
                    if (inputXml.NodeType == XmlNodeType.Text)
                        minutos = float.Parse(inputXml.Value);
                }
                else if (inputXml.Name == "segundos")
                {
                    inputXml.Read();
                    if (inputXml.NodeType == XmlNodeType.Text)
                        segundos = float.Parse(inputXml.Value);
                }

                if (!float.IsNaN(grados) && !float.IsNaN(minutos) && !float.IsNaN(segundos))
                {
                    count++;
                    // Si es longitud (impar)
                    if (count % 2 != 0)
                    {
                        if (esteOeste == 'W')
                            coordenadas.Append("-" + (grados + (minutos / 60) + (segundos / 3600)).ToString().Replace(',', '.'));
                        else
                            coordenadas.Append((grados + (minutos / 60) + (segundos / 3600)).ToString().Replace(',', '.'));

                        coordenadas.Append(",");
                    }
                    // Si es latitud (par)
                    else
                    {
                        if (hemisferio == 'S')
                            coordenadas.Append("-" + (grados + (minutos / 60) + (segundos / 3600)).ToString().Replace(',', '.'));
                        else
                            coordenadas.Append((grados + (minutos / 60) + (segundos / 3600)).ToString().Replace(',', '.'));

                        coordenadas.Append(",");
                    }

                    grados = float.NaN;
                    minutos = float.NaN;
                    segundos = float.NaN;

                    if (!isLock)
                    {
                        coordenadas.Append("0.0\n");
                        indexRutas++;
                    }

                    if (indexRutas == 4)
                    {
                        rutaUno = coordenadas.ToString();
                        coordenadas.Clear();
                        indexRutas++;
                    }
                    else if (indexRutas == 9)
                    {
                        rutaDos = coordenadas.ToString();
                        coordenadas.Clear();
                        indexRutas++;
                    }
                    else if (indexRutas == 14)
                    {
                        rutaTres = coordenadas.ToString();
                        coordenadas.Clear();
                        indexRutas++;
                    }

                }
            }
        }

        private static void GenerarKML()
        {
            var xmlDeclaration = outputKml.CreateXmlDeclaration("1.0", "utf-8", null);
            outputKml.AppendChild(xmlDeclaration);
            var kml = outputKml.CreateElement("kml");
            outputKml.AppendChild(kml);
            var doc = outputKml.CreateElement("Document");
            kml.AppendChild(doc);

            // Ruta uno
            GenerarPlacemark(doc, rutaUno);

            // Ruta dos
            GenerarPlacemark(doc, rutaDos);

            // Ruta tres
            GenerarPlacemark(doc, rutaTres);
        }

        private static void GenerarPlacemark(XmlElement doc, string ruta)
        {
            var placemarkRutaUno = outputKml.CreateElement("Placemark");
            doc.AppendChild(placemarkRutaUno);
            var name = outputKml.CreateElement("name");
            var nameText = outputKml.CreateTextNode("rutas");
            name.AppendChild(nameText);
            placemarkRutaUno.AppendChild(name);
            var lineString = outputKml.CreateElement("LineString");
            var extrude = outputKml.CreateElement("extrude");
            var extrudeText = outputKml.CreateTextNode("1");
            extrude.AppendChild(extrudeText);
            var tessellate = outputKml.CreateElement("tessellate");
            var tessellateText = outputKml.CreateTextNode("1");
            tessellate.AppendChild(tessellateText);
            lineString.AppendChild(extrude);
            lineString.AppendChild(tessellate);
            var coordinates = outputKml.CreateElement("coordinates");
            var coordinatesText = outputKml.CreateTextNode(ruta);
            coordinates.AppendChild(coordinatesText);
            lineString.AppendChild(coordinates);
            var altitude = outputKml.CreateElement("altitudeMode");
            var altitudeText = outputKml.CreateTextNode("relativeToGround");
            altitude.AppendChild(altitudeText);
            placemarkRutaUno.AppendChild(lineString);
            var style = outputKml.CreateElement("Style");
            var lineStyle = outputKml.CreateElement("LineStyle");
            var color = outputKml.CreateElement("color");
            var colorText = outputKml.CreateTextNode("#ff0000ff");
            color.AppendChild(colorText);
            var width = outputKml.CreateElement("width");
            var widthText = outputKml.CreateTextNode("5");
            width.AppendChild(widthText);
            lineStyle.AppendChild(color);
            lineStyle.AppendChild(width);
            style.AppendChild(lineStyle);
            placemarkRutaUno.AppendChild(style);
        }
    }
}
