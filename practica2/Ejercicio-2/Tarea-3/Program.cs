using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;

namespace xml2html
{
    class Program
    {
        private static XmlReader inputXml;
        private static XmlDocument outputSvg1;
        private static XmlDocument outputSvg2;
        private static XmlDocument outputSvg3;
        private static XmlReader finalStateInputXml;
        private static XmlReader nameStateInputXml;
        private static string initName;

        static void Main(string[] args)
        {
            // Comprobar argumentos
            if (args.Length < 2)
            {
                Console.WriteLine("\nError en el uso:\n" + "xml2mysvg <docXML> <doc1SVG> <doc2SVG> <doc3SVG>");
                Console.WriteLine("Pulse cualquier tecla para continuar...");
                Console.ReadKey();
                Environment.Exit(-1);
            }

            // Crear fichero de salida y objeto de lectura
            inputXml = XmlReader.Create(args[0]);
            outputSvg1 = new XmlDocument();
            outputSvg2 = new XmlDocument();
            outputSvg3 = new XmlDocument();

            // Construcción del SVG 1
            var output = GenerarSVG(args, outputSvg1, true);
            // Escritura del SVG1
            using FileStream fs1 = new FileStream(args[1], FileMode.Create);
            using StreamWriter w1 = new StreamWriter(fs1, Encoding.UTF8);
            w1.WriteLine(output.OuterXml.Replace("&#xA;", "\n"));

            // Construcción del SVG 2
            inputXml = finalStateInputXml;
            output = GenerarSVG(args, outputSvg2, false);
            // Escritura del SVG2
            using FileStream fs2 = new FileStream(args[2], FileMode.Create);
            using StreamWriter w2 = new StreamWriter(fs2, Encoding.UTF8);
            w2.WriteLine(output.OuterXml.Replace("&#xA;", "\n"));

            // Construcción del SVG 3
            inputXml = finalStateInputXml;
            output = GenerarSVG(args, outputSvg3, false);
            // Escritura del SVG3
            using FileStream fs3 = new FileStream(args[3], FileMode.Create);
            using StreamWriter w3 = new StreamWriter(fs3, Encoding.UTF8);
            w3.WriteLine(output.OuterXml.Replace("&#xA;", "\n"));
        }

        private static XmlDocument GenerarSVG(String[] args, XmlDocument outputSvg, bool isInit)
        {
            var xmlDeclaration = outputSvg.CreateXmlDeclaration("1.0", "utf-8", null);
            outputSvg.AppendChild(xmlDeclaration);
            var svg = outputSvg.CreateElement("svg");
            svg.SetAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.SetAttribute("version", "2.0");
            outputSvg.AppendChild(svg);
            var polyline = outputSvg.CreateElement("polyline");

            // Creación de la gráfica de la ruta
            var list = CreateGraphics(outputSvg, GetAltitudes());
            var ruta = list.ToArray();
            polyline.SetAttribute("points", ruta[0].ToString());
            polyline.SetAttribute("style", "fill:white;stroke:red;stroke-width:4");
            svg.AppendChild(polyline);

            // Texto del eje de las abscisas
            return GenerateTextX(svg, outputSvg, ruta, args[0], isInit);
        }

        private static XmlDocument GenerateTextX(XmlElement svg, XmlDocument outputSvg, object[] ruta, string arg, bool isInit)
        {
            if (isInit)
                inputXml = XmlReader.Create(arg);
            else
                inputXml = nameStateInputXml;
            
            int i = 0;
            while (inputXml.Read())
            {
                if (Regex.IsMatch(inputXml.Name, "^(h|H)(it)(o)$"))
                {
                    if (i == 0)
                    {
                        List<XmlElement> textElements = (List<XmlElement>)ruta[1];
                        textElements[i].AppendChild(outputSvg.CreateTextNode(initName));
                        svg.AppendChild(textElements[i]);
                        i++;
                    }
                    
                    if (inputXml.NodeType != XmlNodeType.EndElement)
                    {
                        inputXml.Read();
                        inputXml.Read();
                        inputXml.Read();
                        List<XmlElement> textElements = (List<XmlElement>)ruta[1];
                        textElements[i].AppendChild(outputSvg.CreateTextNode(inputXml.Value));
                        svg.AppendChild(textElements[i]);
                        i++;

                        if (i == 4)
                        {
                            nameStateInputXml = inputXml;
                            break;
                        }
                    }
                }
            }

            return outputSvg;            
        }

        private static List<Object> CreateGraphics(XmlDocument outputSvg, string[] ruta)
        {
            List<Object> result = new List<Object>();
            StringBuilder builder = new StringBuilder();
            string xinit = "100";
            string x = xinit;
            int paso = 20;
            string min = float.MaxValue.ToString();
            string max = float.MinValue.ToString();
            List<XmlElement> pointsX = new List<XmlElement>();

            // Crear figura
            foreach (string s in ruta)
            {
                min = ruta.Min();
                max = ruta.Max();

                builder.Append(x + "," + s);
                pointsX = CreateTextXY(outputSvg, pointsX, x, max);
                x = (int.Parse(x) + paso).ToString();
            }

            // Cerrar figura
            builder.Append(int.Parse(x) - paso + "," + max);
            builder.Append(xinit + "," + max);
            builder.Append(xinit + "," + min);

            result.Add(builder);
            result.Add(pointsX);
            return result;
        }

        private static List<XmlElement> CreateTextXY(XmlDocument outputSvg, List<XmlElement> pointsX, string x, string max)
        {
            var point = outputSvg.CreateElement("text");
            point.SetAttribute("x", x);
            point.SetAttribute("y", (float.Parse(max)+20).ToString());
            point.SetAttribute("style", "writing-mode: tb; glyph-orientation-vertical: 0;");
            pointsX.Add(point);
            return pointsX;
        }

        private static string[] GetAltitudes()
        {
            List<string> altitudes = new List<string>();
            int count = 0;

            while (inputXml.Read())
            {
                if (inputXml.Name == "lugar_inicio" && inputXml.NodeType != XmlNodeType.EndElement)
                {
                    inputXml.Read();
                    initName = inputXml.Value;
                }
                    
                if (inputXml.Name == "altitud")
                {
                    if (inputXml.NodeType != XmlNodeType.EndElement)
                    {
                        inputXml.Read();
                        if (inputXml.NodeType == XmlNodeType.Text)
                        {
                            altitudes.Add(inputXml.Value + "\n");
                            count++;
                        }

                        if (count == 4)
                        {
                            finalStateInputXml = inputXml;
                            break;
                        }
                    }
                }
            }

            return altitudes.ToArray();
        }
    }
}
