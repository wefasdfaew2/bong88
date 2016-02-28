using Bongda88.Helpers;
using CsQuery;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using HtmlParserSharp;
using HtmlParserSharp.Common;
using HtmlParserSharp.Core;
using AngleSharp;
using AngleSharp.Parser.Html;
using System.Runtime.InteropServices;

namespace Bongda88
{
    public partial class MainForm : Form
    {
        // private WebBrowser web = new WebBrowser();
        private string _html = string.Empty;
        private bool _canPerformLogin = false;

        public MainForm()
        {
            InitializeComponent();

            
            Load += MainForm_Load;
            loginButton.Click += loginButton_Click;
        }

        private void SetButtonStatus(string text, bool isEnabled=true)
        {
            Invoke(new Action(() =>
            {
                loginButton.Text = text;
                loginButton.Enabled = isEnabled;
            }));
        }

        private async Task OnLogin(WebBrowser web)
        {
            if (!_canPerformLogin)
            {
                Log("cannot do `Login` action because document do not loaded yet");
                LogUI("cannot do `Login` action because document do not loaded yet");
                return;
            }

            _canPerformLogin = false;
            Log("Perfoming login");

            await Task.Delay(50);

            Invoke(new Action(() =>
            {
                if (web == null)
                {
                    LogUI("web browser not found");
                }

                HtmlDocument doc = null;

                try
                {
                    doc = web.Document;
                }
                catch (Exception ex)
                {
                    Log(ex.Message);
                    LogUI(ex.Message);

                    return;
                }

                var userInput = doc.GetElementById("txtID");
                var passInput = doc.GetElementById("txtPW");

                if (userInput == null || passInput == null)
                {
                    Log("input not found");
                    return;
                }

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
                        LogUI("found submit button, perform click action");

                        // Task.Run(() => );
                        links[i].InvokeMember("click");
                    }
                }
            }));
        }

        private void loginButton_Click(object sender, EventArgs e)
        {
            var web = new WebBrowser();
            web.DocumentCompleted -= web_DocumentCompleted;
            web.DocumentCompleted += web_DocumentCompleted;

            web.Navigate("http://www.bong88.com/login888.aspx");
        }

        void web_FileDownload(object sender, EventArgs e)
        {
        }

        private async void web_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            var w = sender as WebBrowser;
            LogUI("document completed called");
            
            string url = e.Url.ToString();
            if (!(url.StartsWith("http://") || url.StartsWith("https://")))
            {
                // AJAX
                Log();
                Log("ajax call");
                LogUI("ajax call");
            }

            if (e.Url.AbsolutePath != w.Url.AbsolutePath)
            {
                // IFRAME 
                Log();
                Log("iframe rendering");
                LogUI("iframe rendering");
            }
            else
            {
                // REAL DOCUMENT COMPLETE
                Log();
                Log("document completed, downloading html content");
                LogUI("document completed, downloading html content");
                
                _html = w.Document.GetElementsByTagName("HTML")[0].OuterHtml;
                Log(_html);
                LogResult(_html);

                _canPerformLogin = true;

                await Task.Run(async () => await OnLogin(w));

                Invoke(new Action(() =>
                {
                    
                }));

                #region old stuff
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

        private void MainForm_Load(object sender, EventArgs e)
        {
            //var web = new WebBrowser();
            //web.DocumentCompleted += web_DocumentCompleted;
            //web.ObjectForScripting = new MyScript();
            //web.FileDownload += web_FileDownload;
            //web.ScriptErrorsSuppressed = true;
            //web.Navigate("http://www.bong88.com/login888.aspx");
        }

        #region helpers
        private void LogResult(string html)
        {
            Invoke(new Action(() =>
            {
                ResultText.Text += html + "\r\n---------------------------------------------";
            }));
        }

        private void LogUI(string format, params object[] args)
        {
            var msg = string.Empty;
            try
            {
                msg = string.Format(format, args);
            }
            catch(Exception ex)
            {
                msg = ex.Message;
            }

            Invoke(new Action(() =>
            {
                var li = new ListViewItem(DateTime.Now.ToString("hh:mm:ss"));
                li.SubItems.Add(msg);
                LogList.Items.Add(li);
            }));
        }
        private void Log(string format=null, params object[] args)
        {
            LogHelper.Log(format, args);
        }
        #endregion

        private void button1_Click(object sender, EventArgs e)
        {
            
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
