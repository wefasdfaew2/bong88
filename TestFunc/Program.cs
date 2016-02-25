using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace TestFunc
{
    class Program
    {
        static void Main(string[] args)
        {
            var html = System.IO.File.ReadAllText("html.txt");
            /*
            var doc = new XmlDocument();
            try
            {
                doc.LoadXml(html);
            }
            catch(Exception ex)
            {

            }

            var form = doc.SelectNodes("//form[@id='main-form']//input");
             */

            var form = Regex.Match(html, "<form\\sid=\"frmLogin\".*?/form");
            if (form.Success)
            {

            }

            Console.ReadLine();
        }
    }
}
