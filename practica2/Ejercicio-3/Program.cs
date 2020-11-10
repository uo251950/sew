using System;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Xml;

namespace mydocx
{
    class Program
    {
        private static XmlReader inputXml;
        private static XmlDocument outputXSD;

        static void Main(string[] args)
        {
            if (args.Length < 2)
            {
                Console.WriteLine("\nError en el uso:\n" + "mydocx <docx> <xsd>");
                Console.WriteLine("Pulse cualquier tecla para continuar...");
                Console.ReadKey();
                Environment.Exit(-1);
            }

            CreateBase(args);
            ProcessXml();
            WriteOutput(args);
        }

        private static void WriteOutput(string[] args)
        {
            using FileStream fs = new FileStream(args[1], FileMode.Create);
            using StreamWriter w = new StreamWriter(fs, Encoding.UTF8);
            w.WriteLine(outputXSD.OuterXml.Replace("<", "<xs:").Replace("<xs:?", "<?").Replace("<xs:/", "</xs:"));
        }

        private static void ProcessXml()
        {
            var xsSchema = outputXSD.FirstChild.NextSibling;
            while (inputXml.Read())
            {
                switch (inputXml.NodeType)
                {
                    case XmlNodeType.Element:
                        var xsElement = outputXSD.CreateElement("xs:element");
                        xsElement.SetAttribute("name", inputXml.Name);
                        XmlElement xsComplexType = null;
                        XmlElement xsSequence = null;

                        if (inputXml.HasAttributes) 
                        {
                            xsComplexType = outputXSD.CreateElement("xs:complexType");

                            while (inputXml.MoveToNextAttribute())
                            {
                                var xsAttribute = outputXSD.CreateElement("xs:attribute");
                                xsAttribute.SetAttribute("name", inputXml.Name);
                                xsAttribute.SetAttribute("type", inputXml.Value.GetType().Name);
                                xsComplexType.AppendChild(xsAttribute);
                            }
                        }

                        while (inputXml.Read())
                            if (!(inputXml.NodeType == XmlNodeType.Whitespace))
                                break;

                        if (inputXml.NodeType == XmlNodeType.Element && !inputXml.IsEmptyElement)
                        {
                            if(xsComplexType == null)
                                xsComplexType = outputXSD.CreateElement("xs:complexType");

                            xsSequence = outputXSD.CreateElement("xs:sequence");
                            var xsElementChild = outputXSD.CreateElement("xs:element");
                            xsElementChild.SetAttribute("name", inputXml.Name);
                            xsSequence.AppendChild(xsElementChild);
                            ProcessXml();
                            xsComplexType.AppendChild(xsSequence);
                        }

                        if (xsComplexType != null)
                            xsElement.AppendChild(xsComplexType);
                        else
                            return;

                        xsSchema.AppendChild(xsElement);
                        break;
                }
            }
        }

        private static void CreateBase(string[] args)
        {
            string outPath = Environment.CurrentDirectory + "/" + args[0].Split(".")[0];
            try { ZipFile.ExtractToDirectory(args[0], outPath); } catch (IOException) { };
            inputXml = XmlReader.Create(outPath + "/word/document.xml");
            outputXSD = new XmlDocument();
            var xmlDeclaration = outputXSD.CreateXmlDeclaration("1.0", "utf-8", null);
            outputXSD.AppendChild(xmlDeclaration);
            var xsSchema = outputXSD.CreateElement("xs:schema");
            xsSchema.SetAttribute("elementFormDefault", "qualified");
            xsSchema.SetAttribute("xmlns:xs", "http://www.w3.org/2001/XMLSchema");
            outputXSD.AppendChild(xsSchema);
        }
    }
}
