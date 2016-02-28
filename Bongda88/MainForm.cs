using AngleSharp;
using AngleSharp.Parser.Html;
using Bongda88.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Bongda88
{
    public partial class MainForm : Form
    {
        private string _html = string.Empty;
        private bool _canPerformLogin = false;
        private string _code = string.Empty;
        Dictionary<string, string> inputs = new Dictionary<string, string>();

        // used for multiple account request
        private Dictionary<Guid, WebBrowser> _webs = new Dictionary<Guid, WebBrowser>();

        // later
        private List<Guid> _addedWebs = new List<Guid>();

        public MainForm()
        {
            InitializeComponent();


            Load += MainForm_Load;
            loginButton.Click += loginButton_Click;
            GetPasswordSuccessRequest += MainForm_GetPasswordSuccessRequest;
        }

        async void MainForm_GetPasswordSuccessRequest(string pass)
        {
            inputs["txtID"] = "SSD020101001";
            inputs["txtPW"] = pass;

            var loginPacket = WebRequestHelper.GetUrlEncoded(inputs);
            Log("login url: {0}", loginPacket);
            using (var req = new WebClientExtend())
            {
                req.DownloadString("http://www.bong88.com/login888.aspx");

                var mainPage = await Task.Run(async () =>
                {
                    try
                    {
                        var resp = await req.UploadDataTaskAsync("http://www.bong88.com/ProcessLogin.aspx", "POST", Encoding.Default.GetBytes(loginPacket));
                        //var uploadResp = req.UploadString("http://www.bong88.com/ProcessLogin.aspx", loginPacket);
                        Log("login response: {0}", resp);

                        return req.DownloadString("http://x57uo.bong88.com/main.aspx");
                    }
                    catch (Exception ex)
                    {
                        Log("login error: {0}", ex.Message);
                        return string.Empty;
                    }
                });



                Log("login result: {0}", mainPage);
            }
        }

        private string GetFormHtml(string html, string formId)
        {
            var form = string.Empty;

            var group = Regex.Match(html, string.Format("(<form.*id=['\"]{0}['\"].*/form>)", formId), RegexOptions.Singleline);

            if (group.Success)
            {
                form = group.Groups[1].Value;
            }

            return form;
        }

        private void SetStatus(string text)
        {
            try
            {
                Invoke(new Action(() =>
                {
                    StatusLabel.Text = text;
                }));
            }
            catch (Exception ex)
            {
                Log("status error: " + ex.Message);
            }           
        }

        private async Task OnLogin(HtmlDocument doc)
        {
            if (!_canPerformLogin)
            {
                Log("cannot do `Login` action because document do not loaded yet");
                return;
            }

            _canPerformLogin = false;
            Log("attemp to login");
            SetStatus("attemp to login");

            await Task.Delay(50);

            inputs = WebRequestHelper.GetFormInputs(doc.GetElementsByTagName("html")[0].InnerHtml, "frmLogin");
            if (inputs.Count == 0)
            {
                Log("input fields not found");
                return;
            }

            _code = inputs["txtCode"];
            GetPassword(_code);

            return;


            if (doc == null)
            {
                Log("cannot get html document, action fail");
                SetStatus("cannot get html document, action fail");
                return;
            }

            Log("get document success, seting data up");
            SetStatus("get document success, seting data up");

            var userInput = doc.GetElementById("txtID");
            var passInput = doc.GetElementById("txtPW");

            if (userInput == null || passInput == null)
            {
                Log("input not found");
                SetStatus("input not found");
                return;
            }

            SetStatus("setting user account");

            userInput.InnerText = "SSD020101001";
            passInput.InnerText = "Qqqq1111";

            var links = doc.GetElementsByTagName("a");
            var count = links.Count;
            for (int i = 0; i < count; i++)
            {
                var inner = links[i].InnerHtml;

                if (!string.IsNullOrEmpty(inner) &&
                    inner.Equals("<span>Go</span>", StringComparison.OrdinalIgnoreCase))
                {
                    Log("found submit button, perform click action");

                    await Task.Run(() =>
                    {
                        links[i].InvokeMember("click");
                    });

                    return;
                }
            }
        }

        private void RequestPage(string url)
        {
            var webRequest = (HttpWebRequest)WebRequest.Create(url);
            //string sb = JsonConvert.SerializeObject(webRequest);
            webRequest.Method = "GET";
            webRequest.KeepAlive = true;
            webRequest.AllowAutoRedirect = true;
            webRequest.ContentType = "application/json";
            webRequest.UserAgent =
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36";
            //webRequest.CookieContainer = cookieJar;

            using (HttpWebResponse response = webRequest.GetResponse() as HttpWebResponse)
            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                var header = response.Headers.ToString();
                var content = reader.ReadToEnd();
                //File.AppendAllText("C:\\httpResponse1.txt", response.Headers.ToString());
                //File.AppendAllText("C:\\httpResponse2.html", reader.ReadToEnd());
            }
        }

        /// <summary>
        /// use web browser to download html page
        /// so we can force web browser invoke javascript to get rendered result
        /// then, get html result and post to web server again with other methods
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private async void loginButton_Click(object sender, EventArgs e)
        {
            var web = new WebBrowser();
            web.ScriptErrorsSuppressed = true; // prevent script popup

            var gid = Guid.NewGuid();
            _addedWebs.Add(gid);
            _webs[gid] = web; // for more user account

            web.DocumentCompleted += web_DocumentCompleted;

            (sender as Button).Enabled = false;
            GetHtmlButton.Enabled = false;
            SetStatus("navigating to homepage...");

            await Task.Run(() => {
                Invoke(new Action(() => web.Navigate("http://www.bong88.com/login888.aspx")));
            });
           
        }

        private void web_FileDownload(object sender, EventArgs e)
        {
        }

        /// <summary>
        /// cannot post data with normal web request
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void web_DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            /*
            Log("*******document completed********");
            Log(e.Result);
            object o = web2.Document.InvokeScript("Detecas.Core.start()");
            await Task.Delay(2000);
            Log(web2.DocumentText);
            
            var indexPage = e.Result;
            var web = sender as WebClientExtend;
            //var loginForm = WebRequestHelper.GetInputs(indexPage, "frmLogin") ?? new Dictionary<string, string>();
            var loginForm = WebRequestHelper.GetFormInputs(indexPage, "frmLogin");
            //if (loginForm.Count == 0)
            //{
            //    loginForm.Add("txtID", string.Empty);
            //    loginForm.Add("txtPW", string.Empty);
            //}
            //var loginForm = new Dictionary<string, string>();
            loginForm["selLang"] = "en";
            loginForm["txtID"] = "SSD020101001";
            loginForm["txtPW"] = "ed87478ca199cb20f147dd2701cc66c9";
            //loginForm["txtCode"] = "7830";
            loginForm["hdubmit"] = "";
            loginForm["IEVerison"] = "0";
            loginForm["detecResTime"] = "294";
            //loginForm["__tk"] = "25b024e3101c165a2890d6f0fe0708c45ecc3f6e29fba106";
            loginForm["IsSSL"] = "0";
            loginForm["PF"] = "Default";
            loginForm["__di"] = "eyJuYSI6Ik4vQSIsImRldmljZUNvZGUiOiI5NGU4MjcxN2NlMDg3NDNhNjQzNWM3M2I3MmZkYmNlZGE3MDE1ZTdmO2IzYWJjNDAzODMwZjM3M2EyYzM1NjEyZGE4Y2VmYWRkIiwiYXBwVmVyc2lvbiI6IjUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjU4LjAgU2FmYXJpLzUzNy4zNiIsInRpbWVab25lIjoiLTQyMCIsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS81MC4wLjI2NTguMCBTYWZhcmkvNTM3LjM2Iiwic2NyZWVuIjp7IndpZHRoIjoxMzY2LCJoZWlnaHQiOjc2OCwiY29sb3JEZXB0aCI6MjR9LCJkZXZpY2VJZCI6ImJjNTdlZDI0YzI0MzRmN2I4MzhiNWM3OGU1YWFlNWI5IiwiaHJlZiI6Imh0dHA6Ly93d3cuYm9uZzg4LmNvbS9sb2dpbjg4OC5hc3B4IiwiY2FwdHVyZWREYXRlIjoiNjM1OTIwMzY4MzIyMDc1OTg1In0=";
            var loginPacket = WebRequestHelper.GetUrlEncoded(loginForm);
            Log("login form data: {0}", loginPacket);
            var mainPage = await Task.Run(() =>
            {
                try
                {
                    var uploadResp = web.UploadString("http://www.bong88.com/ProcessLogin.aspx", loginPacket);
                    Log("login response: {0}", uploadResp);
                    return web.DownloadString("http://x57uo.bong88.com/main.aspx");
                }
                catch (Exception ex)
                {
                    Log("login error: {0}", ex.Message);
                    return string.Empty;
                }
            });
            Log("login result: {0}", mainPage);
            */
        }

        private async void web_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            await Task.Delay(50);

            var w = sender as WebBrowser;

            SetStatus("document load completed");
            Log("document load completed");

            string url = e.Url.ToString();
            if (!(url.StartsWith("http://") || url.StartsWith("https://")))
            {
                // AJAX
                Log();
                
                SetStatus("ajax running");
                Log("ajax running");
            }

            if (e.Url.AbsolutePath != w.Url.AbsolutePath)
            {
                // IFRAME 
                Log();
                SetStatus("iframe rendering");
                Log("iframe rendering");
            }
            else
            {
                // REAL DOCUMENT COMPLETE
                Log();
                Log("document completed, downloading html content");
                SetStatus("document completed, downloading html content");

                _html = w.Document.GetElementsByTagName("HTML")[0].OuterHtml;

                Log(_html);
                LogUI(_html);

                _canPerformLogin = true;

                try
                {
                    await OnLogin(w.Document);

                    Log("login success, remove document complete event");
                    //SetStatus("login success, remove document complete event");
                    //w.DocumentCompleted -= web_DocumentCompleted;

                    await Task.Delay(1000);
                    loginButton.Enabled = true;
                    GetHtmlButton.Enabled = true;
                    SetStatus(string.Empty);
                }
                catch(Exception ex)
                {
                    Log("cannot run `OnLogin` due to error: " + ex.Message);
                    SetStatus("cannot run `OnLogin` due to error: " + ex.Message);
                }

                #region old stuff
                /*
                 * cannot use this method
                 * because in post data web page required field `__di'
                 * this field was rendered by ajax and i cannot get by normal web request
                 * 
                 */ 
                /*
                using (var req = new WebClientExtend())
                {
                    req.DownloadString("http://www.bong88.com/login888.aspx");
                    
                    var mainPage = await Task.Run(() =>
                    {
                        try
                        {
                            var uploadResp = req.UploadString("http://www.bong88.com/ProcessLogin.aspx", loginPacket);
                            Log("login response: {0}", uploadResp);

                            return req.DownloadString("http://x57uo.bong88.com/main.aspx");
                        }
                        catch (Exception ex)
                        {
                            Log("login error: {0}", ex.Message);
                            return string.Empty;
                        }
                    });

                    Log("login result: {0}", mainPage);
                }
                */
                #endregion

                Log("....................................................");
            }
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            // var s = string.Format("asdasdsadas", )
            //var web = new WebBrowser();
            //web.DocumentCompleted += web_DocumentCompleted;
            //web.ObjectForScripting = new MyScript();
            //web.FileDownload += web_FileDownload;
            //web.ScriptErrorsSuppressed = true;
            //web.Navigate("http://www.bong88.com/login888.aspx");
        }

        #region helpers
        private void LogUI(string html)
        {
            Invoke(new Action(() =>
            {
                ResultText.Text += "\r\n------------------------------------\r\n" + 
                    html + "\r\n---------------------------------------------";
            }));
        }

        private void Log(string format = null, params object[] args)
        {
            LogHelper.Log(format, args);
        }
        #endregion

        private event Action<string> GetPasswordSuccessRequest = delegate { };
        private void GetPassword(string code)
        {
            string password = string.Empty;

            using (var web = new WebBrowser())
            {
                var path = AppDomain.CurrentDomain.BaseDirectory;
                path = Path.Combine(path, "javascript", "index.html");
                web.Navigate(path);
                //web.DocumentText = "";

                
                web.DocumentCompleted += delegate
                {
                    web.Document.InvokeScript("getPassCode");

                    var result = web.Document.GetElementById("result");

                    if (result != null)
                    {
                        password = result.InnerText;
                    }

                   //  callback(password);
                    GetPasswordSuccessRequest(password);
                };
                
            }

            // return password;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var html = File.ReadAllText("javascript\\index.html");

            // pass: ae6ac46c6be26580495808f7cd366bf3
            // code: 1489



            html = html.Replace("<div id=\"password\"></div>", string.Format("<div id=\"password\">{0}</div>", "Qqqq1111"));
            html = html.Replace("<div id=\"code\"></div>", string.Format("<div id=\"code\">{0}</div>", "1489"));

           
            var web = new WebBrowser();
            var path = AppDomain.CurrentDomain.BaseDirectory;
            path = Path.Combine(path, "javascript", "index.html");
            web.Navigate(path);
            //web.DocumentText = "";
            web.DocumentCompleted += delegate
            {
                web.Document.InvokeScript("getPassCode");

                var result = web.Document.GetElementById("result");

                if (result != null)
                {
                    var code = result.InnerText;
                }
            };
            
             
            /*
            
            var config = Configuration.Default.WithJavaScript();
            var parser = new HtmlParser(config);

            var doc = parser.Parse(html);

            var result = doc.DocumentElement.OuterHtml;
            */

            return;
            if (_webs.Count == 0) return;

            var top = _webs[_addedWebs.FirstOrDefault()];
            if (top == null) return;

            Log("current document");
            Log(top.DocumentText);

            LogUI(top.DocumentText);
        }

        /*
        [ComVisible(true)]
        public class MyScript
        {
            public void CallServerSideCode()
            {
                var doc = ((MainForm)Application.OpenForms[0]).web2.Document;
                var renderedHtml = doc.GetElementsByTagName("HTML")[0].OuterHtml;
                LogHelper.Log("---------------\r\ncall service\r\n-------------");
                LogHelper.Log(renderedHtml);
            }
        }
        */
    }
}
