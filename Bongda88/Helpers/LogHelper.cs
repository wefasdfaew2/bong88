using NLog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bongda88.Helpers
{
    public class LogHelper
    {
        private static readonly ILogger _log = LogManager.GetCurrentClassLogger();

        public static void Log(string format = null, params object[] args)
        {
            if (string.IsNullOrEmpty(format))
            {
                format = "------------------------------------------------------";
                _log.Info(format);
                Debug.WriteLine(format);
                return;
            }

            try
            {
                format = format.Replace("{", "[{").Replace("}", "}]");
                var msg = string.Format(format, args);

                _log.Info(msg);
                Debug.WriteLine(msg);
            }
            catch (Exception)
            {
                Debug.WriteLine("format error: \r\n------\r\n{0}\r\n------ with {1} parameters", format, args.Length, 1);
                _log.Info("format error: \r\n------\r\n{0}\r\n------ with {1} parameters", format, args.Length, 1);
            }
        }
    }
}
