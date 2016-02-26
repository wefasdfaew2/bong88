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

            Dictionary<string, string> dic = new Dictionary<string, string>();

            var form = Regex.Match(html, "(<form.*id=\"frmLogin\".*</form>)", RegexOptions.Singleline);
            if (form.Success)
            {
                var formHtml = form.Groups[1].Value;

                var inputs = Regex.Matches(formHtml, "<input.*name=['\"](.*?)['\"].*value=['\"](.*?)['\"].*>");
                foreach (Match input in inputs)
                {
                    dic[input.Groups[1].Value] = input.Groups[2].Value;
                }
            }

           // Console.ReadLine();
        }

        private Dictionary<string, string> GetFormInputs(string html)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            var form = Regex.Match(html, "(<form.*id=\"frmLogin\".*</form>)", RegexOptions.Singleline); // get form tag
            if (form.Success)
            {
                var formHtml = form.Groups[1].Value; // form value, get from regex group

                // get all input that have both attribute name + value
                var inputs = Regex.Matches(formHtml, "<input.*name=['\"](.*?)['\"].*value=['\"](.*?)['\"].*>");
                foreach (Match input in inputs)
                {
                    dic[input.Groups[1].Value] = input.Groups[2].Value;
                }
            }

            return dic;
        }
    }
}
