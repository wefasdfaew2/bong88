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
            var s1 = "eyJuYSI6Ik4vQSIsImRldmljZUNvZGUiOiI5NGU4MjcxN2NlMDg3NDNhNjQzNWM3M2I3MmZkYmNlZGE3MDE1ZTdmO2IzYWJjNDAzODMwZjM3M2EyYzM1NjEyZGE4Y2VmYWRkIiwiYXBwVmVyc2lvbiI6IjUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjU4LjAgU2FmYXJpLzUzNy4zNiIsInRpbWVab25lIjoiLTQyMCIsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS81MC4wLjI2NTguMCBTYWZhcmkvNTM3LjM2Iiwic2NyZWVuIjp7IndpZHRoIjoxMzY2LCJoZWlnaHQiOjc2OCwiY29sb3JEZXB0aCI6MjR9LCJkZXZpY2VJZCI6ImJjNTdlZDI0YzI0MzRmN2I4MzhiNWM3OGU1YWFlNWI5IiwiaHJlZiI6Imh0dHA6Ly93d3cuYm9uZzg4LmNvbS9sb2dpbjg4OC5hc3B4IiwiY2FwdHVyZWREYXRlIjoiNjM1OTIwNjgwODIwMTc3NjIwIn0%3D";
            var s2 = "eyJuYSI6Ik4vQSIsImRldmljZUNvZGUiOiI5NGU4MjcxN2NlMDg3NDNhNjQzNWM3M2I3MmZkYmNlZGE3MDE1ZTdmO2IzYWJjNDAzODMwZjM3M2EyYzM1NjEyZGE4Y2VmYWRkIiwiYXBwVmVyc2lvbiI6IjUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjU4LjAgU2FmYXJpLzUzNy4zNiIsInRpbWVab25lIjoiLTQyMCIsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS81MC4wLjI2NTguMCBTYWZhcmkvNTM3LjM2Iiwic2NyZWVuIjp7IndpZHRoIjoxMzY2LCJoZWlnaHQiOjc2OCwiY29sb3JEZXB0aCI6MjR9LCJkZXZpY2VJZCI6ImJjNTdlZDI0YzI0MzRmN2I4MzhiNWM3OGU1YWFlNWI5IiwiaHJlZiI6Imh0dHA6Ly93d3cuYm9uZzg4LmNvbS9sb2dpbjg4OC5hc3B4IiwiY2FwdHVyZWREYXRlIjoiNjM1OTIwMzY4MzIyMDc1OTg1In0%3D";
            var eq = string.Equals(s1, s2);

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
