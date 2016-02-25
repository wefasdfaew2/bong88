using Bongda88.Helpers;
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

namespace Bongda88
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();

            Load += MainForm_Load;
            loginButton.Click += loginButton_Click;
        }

        private void loginButton_Click(object sender, EventArgs e)
        {
            using (var web = new WebClientExtend())
            {
                // download main page
                web.DownloadStringAsync(new Uri("http://www.bong88.com/login888.aspx"));
                web.DownloadStringCompleted += web_DownloadStringCompleted;
            }
        }

        private async void web_DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            var indexPage = e.Result;

            var web = sender as WebClientExtend;

            var loginForm = WebRequestHelper.GetInputs(indexPage, "frmLogin") ?? new Dictionary<string, string>();
            if (loginForm.Count == 0)
            {
                loginForm.Add("txtID", string.Empty);
                loginForm.Add("txtPWD", string.Empty);
            }

            loginForm["txtID"] = "SSD020101001";
            loginForm["txtPWD"] = "Qqqq1111";

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
        }

        private void MainForm_Load(object sender, EventArgs e)
        {

        }

        #region helpers
        private void Log(string format, params object[] args)
        {
            LogHelper.Log(format, args);
        }
        #endregion
    }
}
