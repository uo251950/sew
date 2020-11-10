using System;
using System.IO;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Xml;

namespace xml2html
{
    class Program
    {
        private static XmlReader inputXml;
        private static XmlDocument outputHtml;

        static void Main(string[] args)
        {
            // Comprobar argumentos
            if (args.Length < 2)
            {
                Console.WriteLine("\nError en el uso:\n" + "xml2html <docXML> <docHTML>");
                Console.WriteLine("Pulse cualquier tecla para continuar...");
                Console.ReadKey();
                Environment.Exit(-1);
            }

            // Crear fichero de salida y objeto de lectura
            inputXml = XmlReader.Create(args[0]);
            outputHtml = new XmlDocument();
            CreateSkeleton();

            // Procesar XML
            inputXml.Read();
            inputXml.Read();
            inputXml.Read();
            var h1 = outputHtml.CreateElement("h1");
            var h1Content = outputHtml.CreateTextNode(inputXml.Name);
            var body = outputHtml.FirstChild.LastChild;
            h1.AppendChild(h1Content);
            body.AppendChild(h1);

            while (inputXml.Read())
            {
                switch (inputXml.NodeType)
                {
                    case XmlNodeType.Element:                       
                        var h2 = outputHtml.CreateElement("h2");
                        var h2Content = outputHtml.CreateTextNode(inputXml.Name);
                        body = outputHtml.FirstChild.LastChild;
                        h2.AppendChild(h2Content);
                        body.AppendChild(h2);

                        if (inputXml.HasAttributes)
                        {
                            while (inputXml.MoveToNextAttribute())
                            {
                                var p = outputHtml.CreateElement("p");
                                var pContent = outputHtml.CreateTextNode(inputXml.Name + ": " + inputXml.Value);
                                p.AppendChild(pContent);
                                body.AppendChild(p);
                            }
                        }
                        break;
                    case XmlNodeType.Text:
                        var text = outputHtml.CreateTextNode(inputXml.Value);
                        body.AppendChild(text);
                        break;
                }//fin del switch
            }

            // Escritura del HTML
            using FileStream fs = new FileStream(args[1], FileMode.Create);
            using StreamWriter w = new StreamWriter(fs, Encoding.UTF8);
            w.WriteLine(outputHtml.OuterXml.Insert(0, "<!DOCTYPE html>"));
        }

        private static void CreateSkeleton()
        {
            var html = outputHtml.CreateElement("html");
            outputHtml.AppendChild(html);
            var lang = outputHtml.CreateAttribute("lang");
            lang.Value = "es";
            html.SetAttribute(lang.Name, lang.Value);
            var head = outputHtml.CreateElement("head");
            html.AppendChild(head);
            var meta = outputHtml.CreateElement("meta");
            var charset = outputHtml.CreateAttribute("charset");
            charset.Value = "utf-8";
            meta.SetAttribute(charset.Name, charset.Value);
            var link = outputHtml.CreateElement("link");
            var rel = outputHtml.CreateAttribute("rel");
            var type = outputHtml.CreateAttribute("type");
            var href = outputHtml.CreateAttribute("href");
            rel.Value = "stylesheet";
            type.Value = "text/css";
            href.Value = "estilo.css";
            link.SetAttribute(rel.Name, rel.Value);
            link.SetAttribute(type.Name, type.Value);
            link.SetAttribute(href.Name, href.Value);
            head.AppendChild(meta);
            head.AppendChild(link);
            var title = outputHtml.CreateElement("title");
            var titleContent = outputHtml.CreateTextNode("Rutas");
            title.AppendChild(titleContent);
            head.AppendChild(title);
            var body = outputHtml.CreateElement("body");
            html.AppendChild(body);
        }
    }
}
