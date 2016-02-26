using Sgml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;

namespace Bongda88.Helpers
{
    public static class WebRequestHelper
    {
        public static XmlDocument LoadXml(string html)
        {
            var doc = new XmlDocument();
            using (var parser = new SgmlReader { DocType = "HTML", WhitespaceHandling = WhitespaceHandling.All, CaseFolding = CaseFolding.ToLower })
            {
                using (var reader = new StringReader(html))
                {
                    parser.InputStream = reader;
                    doc.Load(parser);
                }
            }

            return doc;
        }

        public static Dictionary<string, string> GetInputs(string html, string formId)
        {
            var doc = LoadXml(html);
            // var selector = string.Format("//form[normalize-space(@id)='{0}']//input|//form[normalize-space(@name)='{0}']//input", formId);
            var selector = string.Format("//form//input", formId);
            var inputs = doc.SelectNodes(selector);

            return inputs.OfType<XmlNode>()
                .ToDictionary(
                    k => k.Attributes["name"] == null ? string.Empty : k.Attributes["name"].Value,
                    v => v.Attributes["value"] == null ? string.Empty : v.Attributes["value"].Value);
        }

        public static Dictionary<string, string> GetFormInputs(string html, string formId)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            var form = Regex.Match(html, "(<form.*id=\"" + formId + "\".*</form>)", RegexOptions.Singleline); // get form tag
            if (form.Success)
            {
                var formHtml = form.Groups[1].Value; // form value, get from regex group

                // get all input that have both attribute name + value
                var inputs = Regex.Matches(formHtml, "<input.*name=['\"](.*?)['\"].*value=['\"](.*?)['\"].*>");
                foreach (Match input in inputs)
                {
                    var name = input.Groups[1].Value;
                    var value = input.Groups[2].Value;
                    LogHelper.Log("input name={0} value={1}", name, value);
                    dic[name] = value;
                }
            }

            return dic;
        }

        public static string GetUrlEncoded(Dictionary<string, string> form)
        {
            var builder = new StringBuilder();
            foreach (var pair in form)
            {
                builder.Append("&");
                builder.Append(pair.Key);
                builder.Append("=");
                builder.Append(Uri.EscapeDataString(pair.Value));
            }

            return builder.Remove(0, 1).ToString();
        }

        public static string Encode(string data)
        {
            var pattern = string.Format("0-9a-zA-Z{0}", Regex.Escape("-_.!~*'()"));
            return Regex.Replace(data,
                string.Format("[^{0}]", pattern), new MatchEvaluator(EncodeEvaluator));
        }

        public static string EncodeEvaluator(Match match)
        {
            return (match.Value == " ") ? "+" : String.Format("%{0:X2}", Convert.ToInt32(match.Value[0]));
        }

        public static string EncodeSqlSpecialChars(string where)
        {
            if (where == null) return where;
            var builder = new StringBuilder(where.Length + 10);
            foreach (char ch in where.ToCharArray())
            {
                if (ch == '\'')
                    builder.Append(new char[] { ch, ch });
                else if (ch == '%' || ch == '*' || ch == '[' || ch == ']')
                    builder.Append(new char[] { '[', ch, ']' });
                else
                    builder.Append(ch);
            }
            return builder.ToString();
        }

        public static string EncodeJsString(string s)
        {
            var builder = new StringBuilder();
            builder.Append("\"");

            foreach (char c in s)
            {
                switch (c)
                {
                    case '\"':
                        builder.Append("\\\"");
                        break;
                    case '\\':
                        builder.Append("\\\\");
                        break;
                    case '\b':
                        builder.Append("\\b");
                        break;
                    case '\f':
                        builder.Append("\\f");
                        break;
                    case '\n':
                        builder.Append("\\n");
                        break;
                    case '\r':
                        builder.Append("\\r");
                        break;
                    case '\t':
                        builder.Append("\\t");
                        break;
                    default:
                        int i = (int)c;
                        if (i < 32 || i > 127)
                        {
                            builder.AppendFormat("\\u{0:X04}", i);
                        }
                        else
                        {
                            builder.Append(c);
                        }
                        break;
                }
            }
            builder.Append("\"");

            return builder.ToString();
        }
    }
}
