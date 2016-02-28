var Detecas = {};
Detecas.Config = {
    host: "//sc.detecas.com/di/",
    ip: "183.80.8.53",
    encodedIp: "3075475509",
    cookieStorage: "(global.c)",
    version: "1.1.2",
    ep: "!@#$%^",
    sep: "@",
    na: "N/A",
    storages: "localStorage,webSql,indexedDb,windowName,userData,fileStorage",
    cachedDeviceId: "103053c9af086892b4c4de3dcbc61af72714f3fff195bc3dc456e5750c30d219",
    defaultDeviceId: "103053c9af086892b4c4de3dcbc61af72714f3fff195bc3dc456e5750c30d219",
    capturedDate: "635922052456382957"
}
;
Detecas.Base64 = function () {
    "use strict";
    function f(n) {
        var e = t.parse(n), o = e.words, h = e.sigBytes, c = u, r, i, f, s;
        for (e.clamp(),
        r = [],
        i = 0; i < h; i += 3) {
            var l = o[i >>> 2] >>> 24 - i % 4 * 8 & 255
              , a = o[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255
              , v = o[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255
              , y = l << 16 | a << 8 | v;
            for (f = 0; f < 4 && i + f * .75 < h; f++)
                r.push(c.charAt(y >>> 6 * (3 - f) & 63))
        }
        if (s = c.charAt(64),
        s)
            while (r.length % 4)
                r.push(s);
        return r.join("")
    }
    function e(i) {
        var h = i.length, e = u, c = e.charAt(64), o, s, f, r, l, a, v;
        for (c && (o = i.indexOf(c),
        o !== -1 && (h = o)),
        s = [],
        f = 0,
        r = 0; r < h; r++)
            r % 4 && (l = e.indexOf(i.charAt(r - 1)) << r % 4 * 2,
            a = e.indexOf(i.charAt(r)) >>> 6 - r % 4 * 2,
            s[f >>> 2] |= (l | a) << 24 - f % 4 * 8,
            f++);
        return v = n.create(s, f),
        v.toString(t)
    }
    var i = function () {
        function n() { }
        return {
            extend: function (t) {
                n.prototype = this;
                var i = new n;
                return t && i.mixIn(t),
                i.hasOwnProperty("init") || (i.init = function () {
                    i.$super.init.apply(this, arguments)
                }
                ),
                i.init.prototype = i,
                i.$super = this,
                i
            },
            create: function () {
                var n = this.extend();
                return n.init.apply(n, arguments),
                n
            },
            init: function () { },
            mixIn: function (n) {
                for (var t in n)
                    n.hasOwnProperty(t) && (this[t] = n[t]);
                n.hasOwnProperty("toString") && (this.toString = n.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        }
    }()
      , n = i.extend({
          init: function (n, t) {
              n = this.words = n || [];
              this.sigBytes = t !== undefined ? t : n.length * 4
          },
          toString: function (n) {
              return (n || t).stringify(this)
          },
          concat: function (n) {
              var i = this.words, r = n.words, u = this.sigBytes, f = n.sigBytes, t, e;
              if (this.clamp(),
              u % 4)
                  for (t = 0; t < f; t++)
                      e = r[t >>> 2] >>> 24 - t % 4 * 8 & 255,
                      i[u + t >>> 2] |= e << 24 - (u + t) % 4 * 8;
              else if (r.length > 65535)
                  for (t = 0; t < f; t += 4)
                      i[u + t >>> 2] = r[t >>> 2];
              else
                  i.push.apply(i, r);
              return this.sigBytes += f,
              this
          },
          clamp: function () {
              var t = this.words
                , n = this.sigBytes;
              t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8;
              t.length = Math.ceil(n / 4)
          },
          clone: function () {
              var n = i.clone.call(this);
              return n.words = this.words.slice(0),
              n
          },
          random: function (t) {
              for (var i = [], r = 0; r < t; r += 4)
                  i.push(Math.random() * 4294967296 | 0);
              return new n.init(i, t)
          }
      })
      , r = {
          stringify: function (n) {
              for (var r, u = n.words, f = n.sigBytes, i = [], t = 0; t < f; t++)
                  r = u[t >>> 2] >>> 24 - t % 4 * 8 & 255,
                  i.push(String.fromCharCode(r));
              return i.join("")
          },
          parse: function (t) {
              for (var r = t.length, u = [], i = 0; i < r; i++)
                  u[i >>> 2] |= (t.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              return new n.init(u, r)
          }
      }
      , t = {
          stringify: function (n) {
              try {
                  return decodeURIComponent(escape(r.stringify(n)))
              } catch (t) {
                  throw new Error("Malformed UTF-8 data");
              }
          },
          parse: function (n) {
              return r.parse(unescape(encodeURIComponent(n)))
          }
      }
      , u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return {
        encode: f,
        decode: e
    }
}(),
function () {
    "use strict";
    Array.prototype.indexOf || (Array.prototype.indexOf = function (n) {
        var i = this.length >>> 0
          , t = Number(arguments[1]) || 0;
        for (t = t < 0 ? Math.ceil(t) : Math.floor(t),
        t < 0 && (t += i) ; t < i; t++)
            if (t in this && this[t] === n)
                return t;
        return -1
    }
    );
    typeof Array.prototype.forEach != "function" && (Array.prototype.forEach = function (n) {
        for (var t = 0; t < this.length; t++)
            n.apply(this, [this[t], t, this])
    }
    );
    Array.prototype.filter || (Array.prototype.filter = function (n) {
        var i, f, r, e, t, u;
        if (this === void 0 || this === null)
            throw new TypeError;
        if (i = Object(this),
        f = i.length >>> 0,
        typeof n != "function")
            throw new TypeError;
        for (r = [],
        e = arguments[1],
        t = 0; t < f; t++)
            t in i && (u = i[t],
            n.call(e, u, t, i) && r.push(u));
        return r
    }
    );
    typeof String.prototype.trim != "function" && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }
    )
}();
Detecas.Hex = function () {
    "use strict";
    function n(n) {
        for (var i = "", t = 0; t < n.length; t++)
            i += "" + n.charCodeAt(t).toString(16);
        return i
    }
    function t(n) {
        for (var i = "", t = 0; t < n.length; t += 2)
            i += String.fromCharCode(parseInt(n.substr(t, 2), 16));
        return i
    }
    return {
        encode: n,
        decode: t
    }
}();
Detecas.JSON = function (n) {
    "use strict";
    function f(n) {
        return i.lastIndex = 0,
        i.test(n) ? '"' + n.replace(i, function (n) {
            var t = h[n];
            return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + n + '"'
    }
    function e(n, i, o, s) {
        var l, c, v, p, a, h = i[n], y, w;
        h && typeof h == "object" && typeof h.toPrunedJSON == "function" && (h = h.toPrunedJSON(n));
        switch (typeof h) {
            case "string":
                return f(h);
            case "number":
                return isFinite(h) ? String(h) : "null";
            case "boolean":
            case "null":
                return String(h);
            case "object":
                if (!h)
                    return "null";
                if (o <= 0 || r.indexOf(h) !== -1)
                    return '"{*}"';
                if (r.push(h),
                a = [],
                Object.prototype.toString.apply(h) === "[object Array]") {
                    for (p = Math.min(h.length, s),
                    l = 0; l < p; l += 1)
                        a[l] = e(l, h, o - 1, s) || "null";
                    return a.length ? "[" + a.join(",") + "]" : "[]"
                }
                y = [];
                for (c in h)
                    try {
                        h[c] && c.match(/^[a-zA-Z0-9]+$/) && y.push(c)
                    } catch (b) { }
                for (y.sort(),
                w = y.length,
                l = 0; l < w; l++) {
                    c = y[l];
                    try {
                        v = e(c, h, o - 1, s);
                        typeof v == "string" && (v = v.replace(/[^\u0000-\u007F]/g, ""),
                        typeof u[c] == "function" ? a.push(f(c) + ":" + u[c].call(t, v)) : a.push(f(c) + ":" + v))
                    } catch (b) { }
                }
                return a.length ? "{" + a.join(",") + "}" : "{}"
        }
    }
    var o, s, r, u, i, h, t;
    return "object" != typeof t && (t = {}),
    function () {
        function r(n) {
            return 10 > n ? "0" + n : n
        }
        function e() {
            return this.valueOf()
        }
        function o(n) {
            return s.lastIndex = 0,
            s.test(n) ? '"' + n.replace(s, function (n) {
                var t = c[n];
                return "string" == typeof t ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + n + '"'
        }
        function u(t, r) {
            var s, l, h, a, c, v = n, e = r[t];
            switch (e && "object" == typeof e && "function" == typeof e.toJSON && (e = e.toJSON(t)),
            "function" == typeof i && (e = i.call(r, t, e)),
            typeof e) {
                case "string":
                    return o(e);
                case "number":
                    return isFinite(e) ? e + "" : "null";
                case "boolean":
                case "null":
                    return e + "";
                case "object":
                    if (!e)
                        return "null";
                    if (n += f,
                    c = [],
                    "[object Array]" === Object.prototype.toString.apply(e)) {
                        for (a = e.length,
                        s = 0; a > s; s += 1)
                            c[s] = u(s, e) || "null";
                        return h = 0 === c.length ? "[]" : n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]" : "[" + c.join(",") + "]",
                        n = v,
                        h
                    }
                    if (i && "object" == typeof i)
                        for (a = i.length,
                        s = 0; a > s; s += 1)
                            "string" == typeof i[s] && (l = i[s],
                            h = u(l, e),
                            h && c.push(o(l) + (n ? ": " : ":") + h));
                    else
                        for (l in e)
                            Object.prototype.hasOwnProperty.call(e, l) && (h = u(l, e),
                            h && c.push(o(l) + (n ? ": " : ":") + h));
                    return h = 0 === c.length ? "{}" : n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}" : "{" + c.join(",") + "}",
                    n = v,
                    h
            }
        }
        var l = /^[\],:{}\s]*$/, a = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, y = /(?:^|:|,)(?:\s*\[)+/g, s = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, n, f, c, i;
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + r(this.getUTCMonth() + 1) + "-" + r(this.getUTCDate()) + "T" + r(this.getUTCHours()) + ":" + r(this.getUTCMinutes()) + ":" + r(this.getUTCSeconds()) + "Z" : null
        }
        ,
        Boolean.prototype.toJSON = e,
        Number.prototype.toJSON = e,
        String.prototype.toJSON = e);
        "function" != typeof t.stringify && (c = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        t.stringify = function (t, r, e) {
            var o;
            if (n = "",
            f = "",
            "number" == typeof e)
                for (o = 0; e > o; o += 1)
                    f += " ";
            else
                "string" == typeof e && (f = e);
            if (i = r,
            r && "function" != typeof r && ("object" != typeof r || "number" != typeof r.length))
                throw Error("JSON.stringify");
            return u("", {
                "": t
            })
        }
        );
        "function" != typeof t.parse && (t.parse = function (n, t) {
            function r(n, i) {
                var f, e, u = n[i];
                if (u && "object" == typeof u)
                    for (f in u)
                        Object.prototype.hasOwnProperty.call(u, f) && (e = r(u, f),
                        void 0 !== e ? u[f] = e : delete u[f]);
                return t.call(n, i, u)
            }
            var i;
            if (n += "",
            h.lastIndex = 0,
            h.test(n) && (n = n.replace(h, function (n) {
                return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
            })),
            l.test(n.replace(a, "@").replace(v, "]").replace(y, "")))
                return i = eval("(" + n + ")"),
                "function" == typeof t ? r({
                    "": i
                }, "") : i;
            throw new SyntaxError("JSON.parse");
        }
        )
    }(),
    o = 6,
    s = 50,
    Date.prototype.toPrunedJSON = Date.prototype.toJSON,
    String.prototype.toPrunedJSON = String.prototype.toJSON,
    i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    h = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    t = t || n.JSON,
    t.prune = function (n, t) {
        return r = [],
        t = t || {},
        t.depthDecr = t.depthDecr || o,
        t.arrayMaxLength = t.arrayMaxLength || s,
        u = t.stripFuncs || {},
        e("", {
            "": n
        }, t.depthDecr, t.arrayMaxLength)
    }
    ,
    t
}(window);
Detecas.Md5 = function (n) {
    "use strict";
    function k(n) {
        for (var t, u = "", e = "", i = 0, r = 0, f = 0, o = n.length; f < o; f++) {
            if (t = n.charCodeAt(f),
            t < 128) {
                r++;
                continue
            } else
                e = t < 2048 ? String.fromCharCode(t >> 6 | 192, t & 63 | 128) : String.fromCharCode(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
            r > i && (u += n.slice(i, r));
            u += e;
            i = r = f + 1
        }
        return r > i && (u += n.slice(i, o)),
        u
    }
    function d(n) {
        var t, i;
        if (n += "",
        c = !1,
        y = a = n.length,
        a > 63) {
            for (w(n.substring(0, 64)),
            p(l),
            c = !0,
            t = 128; t <= a; t += 64)
                w(n.substring(t - 64, t)),
                v(l);
            n = n.substring(t - 64);
            a = n.length
        }
        for (u[0] = u[1] = u[2] = u[3] = u[4] = u[5] = u[6] = u[7] = u[8] = u[9] = u[10] = u[11] = u[12] = u[13] = u[14] = u[15] = 0,
        t = 0; t < a; t++)
            i = t & 3,
            i === 0 ? u[t >> 2] = n.charCodeAt(t) : u[t >> 2] |= n.charCodeAt(t) << h[i];
        if (u[t >> 2] |= s[t & 3],
        t > 55)
            return c ? v(u) : (p(u),
            c = !0),
            v([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, y << 3, 0]);
        u[14] = y << 3;
        c ? v(u) : p(u)
    }
    function w(n) {
        for (var t, i = 16; i--;)
            t = i << 2,
            l[i] = n.charCodeAt(t) + (n.charCodeAt(t + 1) << 8) + (n.charCodeAt(t + 2) << 16) + (n.charCodeAt(t + 3) << 24)
    }
    function g(n, t, u) {
        d(t ? n : k(n));
        var e = f[0];
        return i[1] = r[e & 15],
        i[0] = r[(e >>= 4) & 15],
        i[3] = r[(e >>= 4) & 15],
        i[2] = r[(e >>= 4) & 15],
        i[5] = r[(e >>= 4) & 15],
        i[4] = r[(e >>= 4) & 15],
        i[7] = r[(e >>= 4) & 15],
        i[6] = r[(e >>= 4) & 15],
        e = f[1],
        i[9] = r[e & 15],
        i[8] = r[(e >>= 4) & 15],
        i[11] = r[(e >>= 4) & 15],
        i[10] = r[(e >>= 4) & 15],
        i[13] = r[(e >>= 4) & 15],
        i[12] = r[(e >>= 4) & 15],
        i[15] = r[(e >>= 4) & 15],
        i[14] = r[(e >>= 4) & 15],
        e = f[2],
        i[17] = r[e & 15],
        i[16] = r[(e >>= 4) & 15],
        i[19] = r[(e >>= 4) & 15],
        i[18] = r[(e >>= 4) & 15],
        i[21] = r[(e >>= 4) & 15],
        i[20] = r[(e >>= 4) & 15],
        i[23] = r[(e >>= 4) & 15],
        i[22] = r[(e >>= 4) & 15],
        e = f[3],
        i[25] = r[e & 15],
        i[24] = r[(e >>= 4) & 15],
        i[27] = r[(e >>= 4) & 15],
        i[26] = r[(e >>= 4) & 15],
        i[29] = r[(e >>= 4) & 15],
        i[28] = r[(e >>= 4) & 15],
        i[31] = r[(e >>= 4) & 15],
        i[30] = r[(e >>= 4) & 15],
        u ? i : i.join("")
    }
    function t(n, t, i, r, u, f, e) {
        return t += n + r + e,
        (t << u | t >>> f) + i << 0
    }
    function p(n) {
        b(0, 0, 0, 0, n);
        f[0] = e[0] + 1732584193 << 0;
        f[1] = e[1] - 271733879 << 0;
        f[2] = e[2] - 1732584194 << 0;
        f[3] = e[3] + 271733878 << 0
    }
    function v(n) {
        b(f[0], f[1], f[2], f[3], n);
        f[0] = e[0] + f[0] << 0;
        f[1] = e[1] + f[1] << 0;
        f[2] = e[2] + f[2] << 0;
        f[3] = e[3] + f[3] << 0
    }
    function b(n, i, r, u, f) {
        var o, s;
        c ? (n = t((r ^ u) & i ^ u, n, i, f[0], 7, 25, -680876936),
        u = t((i ^ r) & n ^ r, u, n, f[1], 12, 20, -389564586),
        r = t((n ^ i) & u ^ i, r, u, f[2], 17, 15, 606105819),
        i = t((u ^ n) & r ^ n, i, r, f[3], 22, 10, -1044525330)) : (n = f[0] - 680876937,
        n = (n << 7 | n >>> 25) - 271733879 << 0,
        u = f[1] - 117830708 + (2004318071 & n ^ -1732584194),
        u = (u << 12 | u >>> 20) + n << 0,
        r = f[2] - 1126478375 + ((n ^ -271733879) & u ^ -271733879),
        r = (r << 17 | r >>> 15) + u << 0,
        i = f[3] - 1316259209 + ((u ^ n) & r ^ n),
        i = (i << 22 | i >>> 10) + r << 0);
        n = t((r ^ u) & i ^ u, n, i, f[4], 7, 25, -176418897);
        u = t((i ^ r) & n ^ r, u, n, f[5], 12, 20, 1200080426);
        r = t((n ^ i) & u ^ i, r, u, f[6], 17, 15, -1473231341);
        i = t((u ^ n) & r ^ n, i, r, f[7], 22, 10, -45705983);
        n = t((r ^ u) & i ^ u, n, i, f[8], 7, 25, 1770035416);
        u = t((i ^ r) & n ^ r, u, n, f[9], 12, 20, -1958414417);
        r = t((n ^ i) & u ^ i, r, u, f[10], 17, 15, -42063);
        i = t((u ^ n) & r ^ n, i, r, f[11], 22, 10, -1990404162);
        n = t((r ^ u) & i ^ u, n, i, f[12], 7, 25, 1804603682);
        u = t((i ^ r) & n ^ r, u, n, f[13], 12, 20, -40341101);
        r = t((n ^ i) & u ^ i, r, u, f[14], 17, 15, -1502002290);
        i = t((u ^ n) & r ^ n, i, r, f[15], 22, 10, 1236535329);
        n = t((i ^ r) & u ^ r, n, i, f[1], 5, 27, -165796510);
        u = t((n ^ i) & r ^ i, u, n, f[6], 9, 23, -1069501632);
        r = t((u ^ n) & i ^ n, r, u, f[11], 14, 18, 643717713);
        i = t((r ^ u) & n ^ u, i, r, f[0], 20, 12, -373897302);
        n = t((i ^ r) & u ^ r, n, i, f[5], 5, 27, -701558691);
        u = t((n ^ i) & r ^ i, u, n, f[10], 9, 23, 38016083);
        r = t((u ^ n) & i ^ n, r, u, f[15], 14, 18, -660478335);
        i = t((r ^ u) & n ^ u, i, r, f[4], 20, 12, -405537848);
        n = t((i ^ r) & u ^ r, n, i, f[9], 5, 27, 568446438);
        u = t((n ^ i) & r ^ i, u, n, f[14], 9, 23, -1019803690);
        r = t((u ^ n) & i ^ n, r, u, f[3], 14, 18, -187363961);
        i = t((r ^ u) & n ^ u, i, r, f[8], 20, 12, 1163531501);
        n = t((i ^ r) & u ^ r, n, i, f[13], 5, 27, -1444681467);
        u = t((n ^ i) & r ^ i, u, n, f[2], 9, 23, -51403784);
        r = t((u ^ n) & i ^ n, r, u, f[7], 14, 18, 1735328473);
        i = t((r ^ u) & n ^ u, i, r, f[12], 20, 12, -1926607734);
        o = i ^ r;
        n = t(o ^ u, n, i, f[5], 4, 28, -378558);
        u = t(o ^ n, u, n, f[8], 11, 21, -2022574463);
        s = u ^ n;
        r = t(s ^ i, r, u, f[11], 16, 16, 1839030562);
        i = t(s ^ r, i, r, f[14], 23, 9, -35309556);
        o = i ^ r;
        n = t(o ^ u, n, i, f[1], 4, 28, -1530992060);
        u = t(o ^ n, u, n, f[4], 11, 21, 1272893353);
        s = u ^ n;
        r = t(s ^ i, r, u, f[7], 16, 16, -155497632);
        i = t(s ^ r, i, r, f[10], 23, 9, -1094730640);
        o = i ^ r;
        n = t(o ^ u, n, i, f[13], 4, 28, 681279174);
        u = t(o ^ n, u, n, f[0], 11, 21, -358537222);
        s = u ^ n;
        r = t(s ^ i, r, u, f[3], 16, 16, -722521979);
        i = t(s ^ r, i, r, f[6], 23, 9, 76029189);
        o = i ^ r;
        n = t(o ^ u, n, i, f[9], 4, 28, -640364487);
        u = t(o ^ n, u, n, f[12], 11, 21, -421815835);
        s = u ^ n;
        r = t(s ^ i, r, u, f[15], 16, 16, 530742520);
        i = t(s ^ r, i, r, f[2], 23, 9, -995338651);
        n = t(r ^ (i | ~u), n, i, f[0], 6, 26, -198630844);
        u = t(i ^ (n | ~r), u, n, f[7], 10, 22, 1126891415);
        r = t(n ^ (u | ~i), r, u, f[14], 15, 17, -1416354905);
        i = t(u ^ (r | ~n), i, r, f[5], 21, 11, -57434055);
        n = t(r ^ (i | ~u), n, i, f[12], 6, 26, 1700485571);
        u = t(i ^ (n | ~r), u, n, f[3], 10, 22, -1894986606);
        r = t(n ^ (u | ~i), r, u, f[10], 15, 17, -1051523);
        i = t(u ^ (r | ~n), i, r, f[1], 21, 11, -2054922799);
        n = t(r ^ (i | ~u), n, i, f[8], 6, 26, 1873313359);
        u = t(i ^ (n | ~r), u, n, f[15], 10, 22, -30611744);
        r = t(n ^ (u | ~i), r, u, f[6], 15, 17, -1560198380);
        i = t(u ^ (r | ~n), i, r, f[13], 21, 11, 1309151649);
        n = t(r ^ (i | ~u), n, i, f[4], 6, 26, -145523070);
        u = t(i ^ (n | ~r), u, n, f[11], 10, 22, -1120210379);
        r = t(n ^ (u | ~i), r, u, f[2], 15, 17, 718787259);
        i = t(u ^ (r | ~n), i, r, f[9], 21, 11, -343485551);
        e[0] = n;
        e[1] = i;
        e[2] = r;
        e[3] = u
    }
    var i = [], u = [], l = [], s = [], r = "0123456789abcdef".split(""), h = [], f = [], c = !1, y = 0, a = 0, e = [], o;
    if (n.Int32Array)
        u = new Int32Array(16),
        l = new Int32Array(16),
        s = new Int32Array(4),
        h = new Int32Array(4),
        f = new Int32Array(4),
        e = new Int32Array(4);
    else {
        for (o = 0; o < 16; o++)
            u[o] = l[o] = 0;
        for (o = 0; o < 4; o++)
            s[o] = h[o] = f[o] = e[o] = 0
    }
    return s[0] = 128,
    s[1] = 32768,
    s[2] = 8388608,
    s[3] = -2147483648,
    h[0] = 0,
    h[1] = 8,
    h[2] = 16,
    h[3] = 24,
    {
        hash: g
    }
}(window);
Detecas.Rc4 = function () {
    "use strict";
    function n(n, t) {
        for (var r = [], u = 0, f, o = "", e, i = 0; i < 256; i++)
            r[i] = i;
        for (i = 0; i < 256; i++)
            u = (u + r[i] + n.charCodeAt(i % n.length)) % 256,
            f = r[i],
            r[i] = r[u],
            r[u] = f;
        for (i = 0,
        u = 0,
        e = 0; e < t.length; e++)
            i = (i + 1) % 256,
            u = (u + r[i]) % 256,
            f = r[i],
            r[i] = r[u],
            r[u] = f,
            o += String.fromCharCode(t.charCodeAt(e) ^ r[(r[i] + r[u]) % 256]);
        return o
    }
    function t(t, i) {
        return n(t, i)
    }
    return {
        encrypt: n,
        decrypt: t
    }
}();
Detecas.Sha1 = function () {
    "use strict";
    function n(n) {
        function i(n, t, i) {
            while (0 < i--)
                n.push(t)
        }
        function r(n, t) {
            return n << t | n >>> 32 - t
        }
        function u(n, t, i) {
            return n ^ t ^ i
        }
        function t(n, t) {
            var i = (t & 65535) + (n & 65535)
              , r = (t >>> 16) + (n >>> 16) + (i >>> 16);
            return (r & 65535) << 16 | i & 65535
        }
        var f = "0123456789abcdef";
        return function (n) {
            for (var r = [], u = n.length * 4, i, t = 0; t < u; t++)
                i = n[t >> 2] >> (3 - t % 4) * 8,
                r.push(f.charAt(i >> 4 & 15) + f.charAt(i & 15));
            return r.join("")
        }(function (n, f) {
            var l, o, s, h, v, nt = n.length, y = 1732584193, p = 4023233417, w = 2562383102, b = 271733878, k = 3285377520, a = [], d, e, c, g;
            for (i(a, 1518500249, 20),
            i(a, 1859775393, 20),
            i(a, 2400959708, 20),
            i(a, 3395469782, 20),
            n[f >> 5] |= 128 << 24 - f % 32,
            n[(f + 65 >> 9 << 4) + 15] = f,
            d = 0; d < nt; d += 16) {
                for (l = y,
                o = p,
                s = w,
                h = b,
                v = k,
                e = 0,
                c = []; e < 80; e++)
                    c[e] = e < 16 ? n[e + d] : r(c[e - 3] ^ c[e - 8] ^ c[e - 14] ^ c[e - 16], 1),
                    g = function (n, t, i, r, u) {
                        var f = (u & 65535) + (n & 65535) + (t & 65535) + (i & 65535) + (r & 65535)
                          , e = (u >>> 16) + (n >>> 16) + (t >>> 16) + (i >>> 16) + (r >>> 16) + (f >>> 16);
                        return (e & 65535) << 16 | f & 65535
                    }(e < 20 ? function (n, t, i) {
                        return n & t ^ ~n & i
                    }(o, s, h) : e < 40 ? u(o, s, h) : e < 60 ? function (n, t, i) {
                        return n & t ^ n & i ^ t & i
                    }(o, s, h) : u(o, s, h), v, a[e], c[e], r(l, 5)),
                    v = h,
                    h = s,
                    s = r(o, 30),
                    o = l,
                    l = g;
                y = t(y, l);
                p = t(p, o);
                w = t(w, s);
                b = t(b, h);
                k = t(k, v)
            }
            return [y, p, w, b, k]
        }(function (n) {
            for (var i = [], r = n.length * 8, t = 0; t < r; t += 8)
                i[t >> 5] |= (n.charCodeAt(t / 8) & 255) << 24 - t % 32;
            return i
        }(n).slice(), n.length * 8))
    }
    return {
        hash: n
    }
}()
Detecas.DebugData = {
    startTime: (new Date).getTime(),
    version: "",
    exceptions: [],
    executions: [],
    storages: [],
    devices: [],
    enable: !0
};
Detecas.Debug = function (n, t, i, r) {
    "use strict";
    var f = null
      , e = function () {
          var n = (new Date).getTime();
          return n - i.startTime
      }
      , u = function () {
          if (f === null && (f = n.getElementById(r)),
          f !== null) {
              var u = t.stringify(i);
              f.value = u
          }
      }
      , o = function (n) {
          i.version = n;
          u()
      }
      , s = function (n, t) {
          var r = {
              message: n.message,
              module: t,
              time: e()
          };
          i.exceptions.push(r);
          u()
      }
      , h = function (n) {
          var t = {
              step: n,
              time: e()
          };
          i.executions.push(t);
          u()
      }
      , c = function (n, t) {
          var r = {
              name: n,
              success: t,
              time: e()
          };
          i.storages.push(r);
          u()
      }
      , l = function (n, t) {
          var r = {
              name: n,
              value: t,
              time: e()
          };
          i.devices.push(r);
          u()
      }
    ;
    return {
        setVersion: o,
        addException: s,
        addExecuteTime: h,
        addStorage: c,
        addDevice: l
    }
}(document, Detecas.JSON, Detecas.DebugData, "detecas-analysis")
Detecas.Common = function (n, t, i, r, u, f, e, o, s) {
    "use strict";
    function h(n) {
        return typeof n != "undefined" && !!n
    }
    function c(n) {
        return 100 > n.length && 10 < n.length && u.decode(n).length === 32
    }
    function l(n, t) {
        var s = r.decrypt("&％#@?,:*!~^.", u.decode(n))
          , c = {
              na: o.na,
              deviceCode: h(t) ? [t.oldCode, t.code].join(";") : "",
              appVersion: i.appVersion || o.na,
              timeZone: h(t) ? t.timezone : "",
              userAgent: i.userAgent || o.na,
              screen: {
                  width: screen.width,
                  height: screen.height,
                  colorDepth: screen.colorDepth
              },
              deviceId: s,
              href: location.href,
              capturedDate: o.capturedDate
          }
          , l = e.stringify(c);
        return f.encode(l)
    }
    function a() {
        for (var r, n, u = arguments.length, i = 0; i < u; i++)
            r = arguments[i],
            n = t.getElementById(r),
            n && n.parentNode.removeChild(n)
    }
    function v() {
        for (var i, r = arguments.length, t = 0; t < r; t++) {
            i = arguments[t];
            try {
                delete n[i]
            } catch (u) {
                s.addException(u, "Detecas.Common.deleteWindowObjects")
            }
        }
    }
    function y(n, i) {
        var r = i !== undefined && t.getElementById(i) ? t.getElementById(i) : t.createElement(n);
        try {
            r.style.position = "absolute";
            r.style.width = "1px";
            r.style.height = "1px";
            r.style.overflow = "hidden";
            r.style.display = "block";
            r.style.zIndex = "-10";
            r.filter = "alpha(opacity = 1)";
            r.MozOpacity = .1;
            r.KhtmlOpacity = .1;
            r.style.opacity = .1
        } catch (u) {
            s.addException(u, "Detecas.Common.createTransparentDomElement")
        }
        return i && r && r.setAttribute("id", i),
        r
    }
    function p() {
        return n.location.host.replace(/:\d+/, "")
    }
    return {
        getHost: p,
        isValidObject: h,
        removeDOMElement: a,
        deleteWindowObjects: v,
        createTransparentDOMElement: y,
        isValidDeviceId: c,
        collectDeviceInfoToInjectToClient: l
    }
}(window, document, navigator, Detecas.Rc4, Detecas.Hex, Detecas.Base64, Detecas.JSON, Detecas.Config, Detecas.Debug)
Detecas.Cookie = function (n) {
    "use strict";
    function t(t) {
        for (var i, u = t + "=", f = n.cookie.split(";"), r = 0; r < f.length; r++) {
            for (i = f[r]; i.charAt(0) === " ";)
                i = i.substring(1);
            if (i.indexOf(u) === 0)
                return i.substring(u.length, i.length)
        }
        return ""
    }
    function i(t, i, r) {
        var u = new Date;
        u.setTime(u.getTime() + r * 864e5);
        n.cookie = t + "=" + i + ";path=/;expires=" + u.toUTCString()
    }
    return {
        read: t,
        write: i
    }
}(document)
Detecas.GPU = function (n, t, i) {
    "use strict";
    var r = function () {
        var u, r, n, f, e;
        try {
            if (u = i.createTransparentDOMElement("div", "__canvasContainer"),
            t.body.appendChild(u),
            r = i.createTransparentDOMElement("canvas"),
            r.setAttribute("width", 80),
            r.setAttribute("height", 20),
            u.appendChild(r),
            r.getContext && (n = r.getContext("2d")),
            !n)
                return "";
            if (f = "azAZ~!@#$%^&*()_+|{};?<>",
            n.textBaseline = "top",
            n.font = "7px 'Arial'",
            n.textBaseline = "alphabetic",
            n.fillStyle = "#f60",
            n.fillRect(125, 1, 62, 20),
            n.fillStyle = "#069",
            n.fillText && n.fillText(f, 2, 15),
            n.fillStyle = "rgba(102, 204, 0, 0.7)",
            n.fillText && n.fillText(f, 4, 17),
            e = r.toDataURL(),
            e)
                return e.replace("data:image/png;base64,", "")
        } catch (o) {
            Detecas.Debug.addException(o, "Detecas.GPU")
        }
        return ""
    }
    ;
    return {
        getGPUCode: r
    }
}(window, document, Detecas.Common)
Detecas.RTC = function (n, t, i, r, u, f) {
    "use strict";
    var e = {};
    e["0.0.0.0"] = !1;
    var o = function () {
        var t = function (t) {
            var u;
            t = t || function () { }
            ;
            try {
                if (u = n.webkitRTCPeerConnection || n.mozRTCPeerConnection,
                !u)
                    return !1;
                var s = function () {
                    var t = [], n, i;
                    for (n in e)
                        e.hasOwnProperty(n) && (i = e[n],
                        i && t.push(n));
                    return t
                }
                  , f = function (n) {
                      n in e || (e[n] = !0,
                      t(s()))
                  }
                  , o = function (n) {
                      n.split("\r\n").forEach(function (n) {
                          var t, i, r;
                          ~n.indexOf("a=candidate") ? (t = n.split(" "),
                          i = t[4],
                          r = t[7],
                          r === "host" && f(i)) : ~n.indexOf("c=") && (t = n.split(" "),
                          i = t[2],
                          f(i))
                      })
                  }
                  , i = new u({
                      iceServers: []
                  });
                return i.createDataChannel("", {
                    reliable: !1
                }),
                i.onicecandidate = function (n) {
                    n.candidate && o("a=" + n.candidate.candidate)
                }
                ,
                i.createOffer(function (n) {
                    o(n.sdp);
                    i.setLocalDescription(n)
                }, function () { }),
                !0
            } catch (h) {
                r.addException(h, "Detecas.RTC.webRTC")
            }
            return !1
        }
        ;
        return {
            getLocalIpAddress: t
        }
    }()
      , s = function () {
          var t = function (t) {
              var i = n.RTCIceGatherer;
              if (!i)
                  return !1;
              try {
                  var u = []
                    , f = new i({
                        gatherPolicy: "all",
                        iceServers: []
                    });
                  f.onlocalcandidate = function (n) {
                      var i = n.candidate, r;
                      i && i.type === "host" && (r = i.ip,
                      u.push(r),
                      t(u))
                  }
              } catch (e) {
                  r.addException(e, "Detecas.RTC.oRTC")
              }
          }
          ;
          return {
              getLocalIpAddress: t
          }
      }()
      , h = function () {
          var n, e, c, h;
          try {
              n = "lip";
              e = i.read(n);
              e && (c = t.parse(u.decrypt("PI", f.decode(e))),
              Detecas.RTC.localIps = c);
              h = function (r) {
                  if (Object.prototype.toString.call(r) === "[object Array]" && r.length > 0) {
                      Detecas.RTC.localIps = t.prune(r);
                      var e = f.encode(u.encrypt("PI", t.stringify(Detecas.RTC.localIps)));
                      i.write(n, e)
                  }
              }
              ;
              o.getLocalIpAddress(h) || s.getLocalIpAddress(h)
          } catch (l) {
              r.addException(l, "Detecas.RTC.init")
          }
      }
    ;
    return {
        init: h
    }
}(window, Detecas.JSON, Detecas.Cookie, Detecas.Debug, Detecas.Rc4, Detecas.Base64)
Detecas.UserAgent = function (n, t) {
    "use strict";
    function r() {
        try {
            if (i === null) {
                var u = new n.UAParser
                  , r = u.getResult();
                i = {
                    Browser: r.browser,
                    Device: r.device,
                    Engine: r.engine,
                    OS: r.os
                }
            }
        } catch (f) {
            t.addException(f, "Detecas.UserAgent.getResult")
        }
        return i
    }
    (function (n, t) {
        var rt = "", tt = "?", d = "function", b = "undefined", g = "object", ut = "string", r = "model", i = "name", e = "type", u = "vendor", f = "version", l = "architecture", p = "console", o = "mobile", s = "tablet", k = "smarttv", nt = "wearable", a = {
            extend: function (n, t) {
                for (var i in t)
                    "browser cpu device engine os".indexOf(i) !== -1 && t[i].length % 2 == 0 && (n[i] = t[i].concat(n[i]));
                return n
            },
            has: function (n, t) {
                return typeof n == "string" ? t.toLowerCase().indexOf(n.toLowerCase()) !== -1 : !1
            },
            lowerize: function (n) {
                return n.toLowerCase()
            },
            major: function (n) {
                return typeof n === ut ? n.split(".")[0] : t
            }
        }, c = {
            rgx: function () {
                for (var r, o = 0, s, l, u, n, f, i, h = arguments, c, e; o < h.length && !f;) {
                    if (c = h[o],
                    e = h[o + 1],
                    typeof r === b) {
                        r = {};
                        for (u in e)
                            n = e[u],
                            typeof n === g ? r[n[0]] = t : r[n] = t
                    }
                    for (s = l = 0; s < c.length && !f;)
                        if (f = c[s++].exec(this.getUA()),
                        !!f)
                            for (u = 0; u < e.length; u++)
                                i = f[++l],
                                n = e[u],
                                typeof n === g && n.length > 0 ? n.length == 2 ? r[n[0]] = typeof n[1] == d ? n[1].call(this, i) : n[1] : n.length == 3 ? r[n[0]] = typeof n[1] === d && (!n[1].exec || !n[1].test) ? i ? n[1].call(this, i, n[2]) : t : i ? i.replace(n[1], n[2]) : t : n.length == 4 && (r[n[0]] = i ? n[3].call(this, i.replace(n[1], n[2])) : t) : r[n] = i ? i : t;
                    o += 2
                }
                return r
            },
            str: function (n, i) {
                var r, u;
                for (r in i)
                    if (typeof i[r] === g && i[r].length > 0) {
                        for (u = 0; u < i[r].length; u++)
                            if (a.has(i[r][u], n))
                                return r === tt ? t : r
                    } else if (a.has(i[r], n))
                        return r === tt ? t : r;
                return n
            }
        }, v = {
            browser: {
                oldsafari: {
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {
                amazon: {
                    model: {
                        "Fire Phone": ["SD", "KF"]
                    }
                },
                sprint: {
                    model: {
                        "Evo Shift 4G": "7373KT"
                    },
                    vendor: {
                        HTC: "APA",
                        Sprint: "Sprint"
                    }
                }
            },
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    }
                }
            }
        }, it = {
            browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [i, f], [/\s(opr)\/([\w\.]+)/i], [[i, "Opera"], f], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i], [i, f], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[i, "IE"], f], [/(edge)\/((\d+)?[\w\.]+)/i], [i, f], [/(yabrowser)\/([\w\.]+)/i], [[i, "Yandex"], f], [/(comodo_dragon)\/([\w\.]+)/i], [[i, /_/g, " "], f], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i], [i, f], [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i], [[i, "UCBrowser"], f], [/(dolfin)\/([\w\.]+)/i], [[i, "Dolphin"], f], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[i, "Chrome"], f], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i], [f, [i, "MIUI Browser"]], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i], [f, [i, "Android Browser"]], [/FBAV\/([\w\.]+);/i], [f, [i, "Facebook"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [f, [i, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [f, i], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [i, [f, c.str, v.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [i, f], [/(navigator|netscape)\/([\w\.-]+)/i], [[i, "Netscape"], f], [/fxios\/([\w\.-]+)/i], [f, [i, "Firefox"]], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [i, f]],
            cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[l, "amd64"]], [/(ia32(?=;))/i], [[l, a.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[l, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[l, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[l, /ower/, "", a.lowerize]], [/(sun4\w)[;\)]/i], [[l, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[l, a.lowerize]]],
            device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [r, u, [e, s]], [/applecoremedia\/[\w\.]+ \((ipad)/], [r, [u, "Apple"], [e, s]], [/(apple\s{0,1}tv)/i], [[r, "Apple TV"], [u, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [u, r, [e, s]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [r, [u, "Amazon"], [e, s]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [[r, c.str, v.device.amazon.model], [u, "Amazon"], [e, o]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [r, u, [e, o]], [/\((ip[honed|\s\w*]+);/i], [r, [u, "Apple"], [e, o]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [u, r, [e, o]], [/\(bb10;\s(\w+)/i], [r, [u, "BlackBerry"], [e, o]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [r, [u, "Asus"], [e, s]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[u, "Sony"], [r, "Xperia Tablet"], [e, s]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[u, "Sony"], [r, "Xperia Phone"], [e, o]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [u, r, [e, p]], [/android.+;\s(shield)\sbuild/i], [r, [u, "Nvidia"], [e, p]], [/(playstation\s[3portablevi]+)/i], [r, [u, "Sony"], [e, p]], [/(sprint\s(\w+))/i], [[u, c.str, v.device.sprint.vendor], [r, c.str, v.device.sprint.model], [e, o]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [u, r, [e, s]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [u, [r, /_/g, " "], [e, o]], [/(nexus\s9)/i], [r, [u, "HTC"], [e, s]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [r, [u, "Microsoft"], [e, p]], [/(kin\.[onetw]{3})/i], [[r, /\./g, " "], [u, "Microsoft"], [e, o]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i], [r, [u, "Motorola"], [e, o]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [r, [u, "Motorola"], [e, s]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[u, "Samsung"], r, [e, s]], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[u, "Samsung"], r, [e, o]], [/(samsung);smarttv/i], [u, r, [e, k]], [/\(dtv[\);].+(aquos)/i], [r, [u, "Sharp"], [e, k]], [/sie-(\w+)*/i], [r, [u, "Siemens"], [e, o]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[u, "Nokia"], r, [e, o]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [r, [u, "Acer"], [e, s]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[u, "LG"], r, [e, s]], [/(lg) netcast\.tv/i], [u, r, [e, k]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i], [r, [u, "LG"], [e, o]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [r, [u, "Lenovo"], [e, s]], [/linux;.+((jolla));/i], [u, r, [e, o]], [/((pebble))app\/[\d\.]+\s/i], [u, r, [e, nt]], [/android.+;\s(glass)\s\d/i], [r, [u, "Google"], [e, nt]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i], [[r, /_/g, " "], [u, "Xiaomi"], [e, o]], [/(mobile|tablet);.+rv\:.+gecko\//i], [[e, a.lowerize], u, r]],
            engine: [[/windows.+\sedge\/([\w\.]+)/i], [f, [i, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [i, f], [/rv\:([\w\.]+).*(gecko)/i], [f, i]],
            os: [[/microsoft\s(windows)\s(vista|xp)/i], [i, f], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [i, [f, c.str, v.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[i, "Windows"], [f, c.str, v.os.windows.version]], [/\((bb)(10);/i], [[i, "BlackBerry"], f], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], [i, f], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[i, "Symbian"], f], [/\((series40);/i], [i], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[i, "Firefox OS"], f], [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [i, f], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[i, "Chromium OS"], f], [/(sunos)\s?([\w\.]+\d)*/i], [[i, "Solaris"], f], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [i, f], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i], [[i, "iOS"], [f, /_/g, "."]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [[i, "Mac OS"], [f, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], [i, f]]
        }, h = function (t, i) {
            if (this instanceof h) {
                var u = t || (n && n.navigator && n.navigator.userAgent ? n.navigator.userAgent : rt)
                  , r = i ? a.extend(it, i) : it;
                return this.getBrowser = function () {
                    var n = c.rgx.apply(this, r.browser);
                    return n.major = a.major(n.version),
                    n
                }
                ,
                this.getCPU = function () {
                    return c.rgx.apply(this, r.cpu)
                }
                ,
                this.getDevice = function () {
                    return c.rgx.apply(this, r.device)
                }
                ,
                this.getEngine = function () {
                    return c.rgx.apply(this, r.engine)
                }
                ,
                this.getOS = function () {
                    return c.rgx.apply(this, r.os)
                }
                ,
                this.getResult = function () {
                    return {
                        ua: this.getUA(),
                        browser: this.getBrowser(),
                        engine: this.getEngine(),
                        os: this.getOS(),
                        device: this.getDevice(),
                        cpu: this.getCPU()
                    }
                }
                ,
                this.getUA = function () {
                    return u
                }
                ,
                this.setUA = function (n) {
                    return u = n,
                    this
                }
                ,
                this.setUA(u),
                this
            }
            return new h(t, i).getResult()
        }
        , y, w;
        h.VERSION = "0.7.9";
        h.BROWSER = {
            NAME: i,
            MAJOR: "major",
            VERSION: f
        };
        h.CPU = {
            ARCHITECTURE: l
        };
        h.DEVICE = {
            MODEL: r,
            VENDOR: u,
            TYPE: e,
            CONSOLE: p,
            MOBILE: o,
            SMARTTV: k,
            TABLET: s,
            WEARABLE: nt,
            EMBEDDED: "embedded"
        };
        h.ENGINE = {
            NAME: i,
            VERSION: f
        };
        h.OS = {
            NAME: i,
            VERSION: f
        };
        typeof exports !== b ? (typeof module !== b && module.exports && (exports = module.exports = h),
        exports.UAParser = h) : typeof define === d && define.amd ? define(function () {
            return h
        }) : n.UAParser = h;
        y = n.jQuery || n.Zepto;
        typeof y !== b && (w = new h,
        y.ua = w.getResult(),
        y.ua.get = function () {
            return w.getUA()
        }
        ,
        y.ua.set = function (n) {
            var t, i;
            w.setUA(n);
            t = w.getResult();
            for (i in t)
                y.ua[i] = t[i]
        }
        )
    })(typeof n == "object" ? n : this);
    var i = null;
    return {
        getResult: r
    }
}(window, Detecas.Debug)
Detecas.Fonts = function (n, t) {
    "use strict";
    var u = function () {
        function o(t) {
            var o = !1, r, s;
            for (r in i)
                i.hasOwnProperty(r) && (n.style.fontFamily = t + "," + i[r],
                u.appendChild(n),
                s = n.offsetWidth !== f[i[r]] || n.offsetHeight !== e[i[r]],
                u.removeChild(n),
                o = o || s);
            return o ? 1 : 0
        }
        var i = ["monospace", "sans-serif", "serif"], u = t.getElementsByTagName("body")[0], n = t.createElement("span"), f, e, r;
        n.style.fontSize = "72px";
        n.innerHTML = "mail.ru";
        f = {};
        e = {};
        for (r in i)
            i.hasOwnProperty(r) && (n.style.fontFamily = i[r],
            u.appendChild(n),
            f[i[r]] = n.offsetWidth,
            e[i[r]] = n.offsetHeight,
            u.removeChild(n));
        this.detect = o
    }
      , r = new u
      , i = "";
    return i = i + r.detect("Aharoni"),
    i = i + r.detect("Aldhabi"),
    i = i + r.detect("Andalus"),
    i = i + r.detect("Angsana New"),
    i = i + r.detect("AngsanaUPC"),
    i = i + r.detect("Aparajita"),
    i = i + r.detect("Arabic Typesetting"),
    i = i + r.detect("Arial"),
    i = i + r.detect("Arial Black"),
    i = i + r.detect("Batang"),
    i = i + r.detect("BatangChe"),
    i = i + r.detect("Browallia New"),
    i = i + r.detect("BrowalliaUPC"),
    i = i + r.detect("Calibri"),
    i = i + r.detect("Calibri Light"),
    i = i + r.detect("Cambria"),
    i = i + r.detect("Cambria Math"),
    i = i + r.detect("Candara"),
    i = i + r.detect("Comic Sans MS"),
    i = i + r.detect("Consolas"),
    i = i + r.detect("Constantia"),
    i = i + r.detect("Corbel"),
    i = i + r.detect("Cordia New"),
    i = i + r.detect("CordiaUPC"),
    i = i + r.detect("Courier New"),
    i = i + r.detect("DaunPenh"),
    i = i + r.detect("David"),
    i = i + r.detect("DFKai-SB"),
    i = i + r.detect("DilleniaUPC"),
    i = i + r.detect("DokChampa"),
    i = i + r.detect("Dotum"),
    i = i + r.detect("DotumChe"),
    i = i + r.detect("Ebrima"),
    i = i + r.detect("Estrangelo Edessa"),
    i = i + r.detect("EucrosiaUPC"),
    i = i + r.detect("Euphemia"),
    i = i + r.detect("FangSong"),
    i = i + r.detect("Franklin"),
    i = i + r.detect("FrankRuehl"),
    i = i + r.detect("FreesiaUPC"),
    i = i + r.detect("Gabriola"),
    i = i + r.detect("Gadugi"),
    i = i + r.detect("Gautami"),
    i = i + r.detect("Georgia"),
    i = i + r.detect("Gisha"),
    i = i + r.detect("Gulim"),
    i = i + r.detect("GulimChe"),
    i = i + r.detect("Gungsuh"),
    i = i + r.detect("GungsuhChe"),
    i = i + r.detect("Impact"),
    i = i + r.detect("IrisUPC"),
    i = i + r.detect("Iskoola Pota"),
    i = i + r.detect("JasmineUPC"),
    i = i + r.detect("KaiTi"),
    i = i + r.detect("Kalinga"),
    i = i + r.detect("Kartika"),
    i = i + r.detect("Khmer UI"),
    i = i + r.detect("KodchiangUPC"),
    i = i + r.detect("Kokila"),
    i = i + r.detect("Lao UI"),
    i = i + r.detect("Latha"),
    i = i + r.detect("Leelawadee"),
    i = i + r.detect("Levenim MT"),
    i = i + r.detect("LilyUPC"),
    i = i + r.detect("Lucida Console"),
    i = i + r.detect("Lucida Sans Unicode"),
    i = i + r.detect("Malgun Gothic"),
    i = i + r.detect("Mangal"),
    i = i + r.detect("Marlett"),
    i = i + r.detect("Meiryo"),
    i = i + r.detect("Meiryo UI"),
    i = i + r.detect("Microsoft Himalaya"),
    i = i + r.detect("Microsoft JhengHei"),
    i = i + r.detect("Microsoft JhengHei UI"),
    i = i + r.detect("Microsoft New Tai Lue"),
    i = i + r.detect("Microsoft PhagsPa"),
    i = i + r.detect("Microsoft Sans Serif"),
    i = i + r.detect("Microsoft Tai Le"),
    i = i + r.detect("Microsoft Uighur"),
    i = i + r.detect("Microsoft YaHei"),
    i = i + r.detect("Microsoft YaHei UI"),
    i = i + r.detect("Microsoft Yi Baiti"),
    i = i + r.detect("MingLiU, PMingLiU"),
    i = i + r.detect("MingLiU-ExtB"),
    i = i + r.detect("PMingLiU-ExtB"),
    i = i + r.detect("MingLiU_HKSCS"),
    i = i + r.detect("MingLiU_HKSCS-ExtB"),
    i = i + r.detect("Miriam"),
    i = i + r.detect("Mongolian Baiti"),
    i = i + r.detect("MoolBoran"),
    i = i + r.detect("MS Gothic"),
    i = i + r.detect("MS PGothic"),
    i = i + r.detect("MS Mincho"),
    i = i + r.detect("MS PMincho"),
    i = i + r.detect("MS UI Gothic"),
    i = i + r.detect("MV Boli"),
    i = i + r.detect("Myanmar Text"),
    i = i + r.detect("Narkisim"),
    i = i + r.detect("Nirmala UI"),
    i = i + r.detect("NSimSun"),
    i = i + r.detect("Nyala"),
    i = i + r.detect("Palatino Linotype"),
    i = i + r.detect("Plantagenet Cherokee"),
    i = i + r.detect("Raavi"),
    i = i + r.detect("Rod"),
    i = i + r.detect("Sakkal Majalla"),
    i = i + r.detect("Segoe Print"),
    i = i + r.detect("Segoe Script"),
    i = i + r.detect("Segoe UI v5.00"),
    i = i + r.detect("Segoe UI v5.01"),
    i = i + r.detect("Segoe UI v5.27"),
    i = i + r.detect("Segoe UI Symbol"),
    i = i + r.detect("Shonar Bangla"),
    i = i + r.detect("Shruti"),
    i = i + r.detect("SimHei"),
    i = i + r.detect("SimKai"),
    i = i + r.detect("Simplified Arabic"),
    i = i + r.detect("SimSun"),
    i = i + r.detect("SimSun-ExtB"),
    i = i + r.detect("Sylfaen"),
    i = i + r.detect("Symbol"),
    i = i + r.detect("Tahoma"),
    i = i + r.detect("Times New Roman"),
    i = i + r.detect("Traditional Arabic"),
    i = i + r.detect("Trebuchet MS"),
    i = i + r.detect("Tunga"),
    i = i + r.detect("Urdu Typesetting"),
    i = i + r.detect("Utsaah"),
    i = i + r.detect("Vani"),
    i = i + r.detect("Verdana"),
    i = i + r.detect("Vijaya"),
    i = i + r.detect("Vrinda"),
    i = i + r.detect("Webdings"),
    i = i + r.detect("Wingdings"),
    i = i + r.detect("Al Bayan"),
    i = i + r.detect("American Typewriter"),
    i = i + r.detect("Andale Mono"),
    i = i + r.detect("Apple Casual"),
    i = i + r.detect("Apple Chancery"),
    i = i + r.detect("Apple Garamond"),
    i = i + r.detect("Apple Gothic"),
    i = i + r.detect("Apple LiGothic"),
    i = i + r.detect("Apple LiSung"),
    i = i + r.detect("Apple Myungjo"),
    i = i + r.detect("Apple Symbols"),
    i = i + r.detect("AquaKana"),
    i = i + r.detect("Arial Hebrew"),
    i = i + r.detect("Ayuthaya"),
    i = i + r.detect("Baghdad"),
    i = i + r.detect("Baskerville"),
    i = i + r.detect("Beijing"),
    i = i + r.detect("BiauKai"),
    i = i + r.detect("Big Caslon"),
    i = i + r.detect("Brush Script"),
    i = i + r.detect("Chalkboard"),
    i = i + r.detect("Charcoal"),
    i = i + r.detect("Charcoal CY"),
    i = i + r.detect("Chicago"),
    i = i + r.detect("Cochin"),
    i = i + r.detect("Comic Sans"),
    i = i + r.detect("Cooper"),
    i = i + r.detect("Copperplate"),
    i = i + r.detect("Corsiva Hebrew"),
    i = i + r.detect("Courier"),
    i = i + r.detect("DecoType Naskh"),
    i = i + r.detect("Devanagari"),
    i = i + r.detect("Didot"),
    i = i + r.detect("Euphemia UCAS"),
    i = i + r.detect("Fang Song"),
    i = i + r.detect("Futura"),
    i = i + r.detect("Gadget"),
    i = i + r.detect("Geeza Pro"),
    i = i + r.detect("Geezah"),
    i = i + r.detect("Geneva"),
    i = i + r.detect("Geneva CY"),
    i = i + r.detect("Georgia"),
    i = i + r.detect("Gill Sans"),
    i = i + r.detect("Gujarati"),
    i = i + r.detect("Gung Seoche"),
    i = i + r.detect("Gurmukhi"),
    i = i + r.detect("Hangangche"),
    i = i + r.detect("HeadlineA"),
    i = i + r.detect("Hei"),
    i = i + r.detect("Helvetica"),
    i = i + r.detect("Helvetica CY"),
    i = i + r.detect("Helvetica Neue"),
    i = i + r.detect("Herculanum"),
    i = i + r.detect("Hiragino Kaku Gothic Pro"),
    i = i + r.detect("Hiragino Kaku Gothic ProN"),
    i = i + r.detect("Hiragino Kaku Gothic Std"),
    i = i + r.detect("Hiragino Kaku Gothic StdN"),
    i = i + r.detect("Hiragino Maru Gothic Pro"),
    i = i + r.detect("Hiragino Maru Gothic ProN"),
    i = i + r.detect("Hiragino Mincho Pro"),
    i = i + r.detect("Hiragino Mincho ProN"),
    i = i + r.detect("Hoefler Text"),
    i = i + r.detect("Inai Mathi"),
    i = i + r.detect("Impact"),
    i = i + r.detect("Jung Gothic"),
    i = i + r.detect("Kai"),
    i = i + r.detect("Keyboard"),
    i = i + r.detect("Krungthep"),
    i = i + r.detect("KufiStandard GK"),
    i = i + r.detect("LastResort"),
    i = i + r.detect("LiHei Pro"),
    i = i + r.detect("LiSong Pro"),
    i = i + r.detect("Lucida Grande"),
    i = i + r.detect("Marker Felt"),
    i = i + r.detect("Menlo"),
    i = i + r.detect("Monaco"),
    i = i + r.detect("Monaco CY"),
    i = i + r.detect("Mshtakan"),
    i = i + r.detect("Nadeem"),
    i = i + r.detect("New Peninim"),
    i = i + r.detect("New York"),
    i = i + r.detect("NISC GB18030"),
    i = i + r.detect("Optima"),
    i = i + r.detect("Osaka"),
    i = i + r.detect("Palatino"),
    i = i + r.detect("Papyrus"),
    i = i + r.detect("PC Myungjo"),
    i = i + r.detect("Pilgiche"),
    i = i + r.detect("Plantagenet Cherokee"),
    i = i + r.detect("Raanana"),
    i = i + r.detect("Sand"),
    i = i + r.detect("Sathu"),
    i = i + r.detect("Seoul"),
    i = i + r.detect("Shin Myungjo Neue"),
    i = i + r.detect("Silom"),
    i = i + r.detect("Skia"),
    i = i + r.detect("Song"),
    i = i + r.detect("ST FangSong"),
    i = i + r.detect("ST Heiti"),
    i = i + r.detect("ST Kaiti"),
    i = i + r.detect("ST Song"),
    i = i + r.detect("Tae Graphic"),
    i = i + r.detect("Taipei"),
    i = i + r.detect("Techno"),
    i = i + r.detect("Textile"),
    i = i + r.detect("Thonburi"),
    i = i + r.detect("Times"),
    i = i + r.detect("Times CY"),
    i = i + r.detect("Verdana"),
    i = i + r.detect("Zapf Chancery"),
    i = i + r.detect("Zapf Dingbats"),
    i = i + r.detect("Zapfino"),
    {
        getFonts: function () {
            return i
        }
    }
}(window, document)
Detecas.Browser = function (n, t, i, r, u, f, e) {
    "use strict";
    var o = null
      , s = {}
      , h = function () {
          var n = t.createElement("canvas");
          return !!(n.getContext && n.getContext("2d"))
      }
      , c = function () {
          return !!(n.webkitRTCPeerConnection || n.mozRTCPeerConnection)
      }
      , l = function () {
          return typeof n.JSON == "object"
      }
      , a = function () {
          var i = !n.localStorage ? "0" : "1"
            , r = !n.sessionStorage ? "0" : "1"
            , u = !n.globalStorage ? "0" : "1"
            , f = !n.openDatabase ? "0" : "1"
            , o = !n.indexedDB ? "0" : "1"
            , s = function (n) {
                try {
                    var i = e.createTransparentDOMElement("div", "_ud");
                    return t.body.appendChild(i),
                    i.addBehavior ? (i.style.behavior = "url(#default#userData)",
                    n = n.replace(/[^a-z]+/g, ""),
                    !0) : !1
                } catch (r) { }
            }
            , h = !s("test", "test") ? "0" : "1";
          return i + r + u + f + o + h
      }
      , v = function () {
          var n = s.Browser;
          n && (o.name = n.name || r.na,
          o.version = n.version || r.na)
      }
      , y = function () {
          var n = s.Engine;
          n && (o.engine = n.name || r.na,
          o.engineVersion = n.version || 0)
      }
      , p = function () {
          var n = s.OS;
          n && (o.OS = n.name && n.version ? [n.name, n.version].join(" ") : i.platform || r.na)
      }
      , w = function () {
          var t = ["Others", "Desktop", "Tablet", "Mobile"], i = "Desktop", r = s.Device, u, n;
          if (r && r.type)
              for (u = r.type.toLowerCase(),
              n = 1; n < t.length; n++)
                  if (u === t[n].toLowerCase()) {
                      i = t[n];
                      break
                  }
          o.deviceType = t.indexOf(i);
          o.deviceName = i
      }
      , b = function () {
          try {
              o === null && (o = {
                  name: r.na,
                  version: 0,
                  engine: r.na,
                  engineVersion: 0,
                  OS: r.na,
                  deviceType: r.na,
                  deviceName: "Desktop",
                  JSON: l(),
                  RTC: c(),
                  canvas: h(),
                  superCookies: a(),
                  ep: r.ep,
                  sep: r.sep
              },
              s = u.getResult(),
              v(),
              w(),
              y(),
              p())
          } catch (n) {
              f.addException(n, "Detecas.Browser")
          }
          return o
      }
    ;
    return {
        getResult: b
    }
}(window, document, navigator, Detecas.Config, Detecas.UserAgent, Detecas.Debug, Detecas.Common)
Detecas.Device = function (n, t, i, r, u, f, e, o, s, h) {
    "use strict";
    function v() {
        var n = o.width + c.sep + o.height + c.sep + o.colorDepth;
        return n.toString()
    }
    function y(n) {
        return typeof n == "string" ? n.replace(/(\(){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\))/, "") : n
    }
    function g(n) {
        var t = n;
        try {
            t = l(n, 3);
            t.appVersion = !1;
            t.plugins = !1;
            t.mimeTypes = !1;
            t.userAgent = !1;
            t.language = !1;
            t.cookieEnabled = !1;
            t.doNotTrack = !1;
            t.battery = typeof t.battery == "object" && t.battery.level !== 1;
            t.mozBattery = typeof t.mozBattery == "object" && t.mozBattery.level !== 1;
            t.webkitBattery = typeof t.webkitBattery == "object" && t.webkitBattery.level !== 1
        } catch (i) {
            h.addException(i, "Detecas.Device.getNavigator")
        }
        return p(t)
    }
    function nt(n) {
        var t = n;
        try {
            t = l(n, 3);
            t.plugins = "";
            t.appVersion = "";
            t.battery = typeof t.battery == "object" && t.battery.level !== 1;
            t.mozBattery = typeof t.mozBattery == "object" && t.mozBattery.level !== 1;
            t.webkitBattery = typeof t.webkitBattery == "object" && t.webkitBattery.level !== 1
        } catch (i) {
            h.addException(i, "Detecas.Device.getOldNavigator")
        }
        return p(t)
    }
    function p(n) {
        try {
            var t = {
                userAgent: y,
                appVersion: y
            };
            return r.prune(n, {
                depthDecr: 3,
                stripFuncs: t
            })
        } catch (i) {
            h.addException(i, "Detecas.Device.pruneNavigator")
        }
    }
    function tt() {
        var t = {};
        try {
            t.browser = c.name === f.na ? f.na : [c.name, c.version].join(a);
            t.deviceName = c.deviceName;
            t.deviceType = c.deviceType;
            t.engine = c.engine === f.na ? f.na : [c.engine, c.engineVersion].join(a);
            t.OS = c.OS;
            t.plugins = b();
            t.mimetypes = k();
            t.useragent = n.userAgent;
            t.screen = d();
            t.navigator = g(n)
        } catch (i) {
            h.addException(i, "Detecas.Device.getDeviceDetail")
        }
        return t
    }
    function w(n) {
        return n.filter(function (n) {
            return n !== null && n !== undefined && n !== ""
        })
    }
    function it(i) {
        var r = {}, f, u;
        try {
            f = nt(n);
            r.navigator = t.hash(f);
            r.plugins = i.plugins !== undefined ? t.hash(i.plugins) : "";
            r.screen = t.hash(i.screen);
            r.monitor = v();
            r.timezone = (new Date).getTimezoneOffset().toString();
            r.systemTimeOffset = "0";
            u = [r.navigator, r.plugins, r.screen, r.timezone, r.systemTimeOffset, r.monitor];
            u = w(u);
            r.code = t.hash(u.join("$"))
        } catch (e) {
            h.addException(e, "Detecas.Device.getOldFingerprint")
        }
        return r
    }
    function rt(t) {
        var r = {}, f;
        try {
            r.navigator = i.hash(t.navigator);
            r.plugins = t.plugins !== undefined ? i.hash(t.plugins) : "";
            r.mimetypes = i.hash(t.mimetypes);
            r.useragent = i.hash(t.useragent);
            r.fonts = i.hash(s.getFonts());
            r.screen = i.hash(t.screen);
            r.monitor = v();
            r.timezone = (new Date).getTimezoneOffset().toString();
            r.GPUCode = i.hash(u.getGPUCode());
            r.language = n.language;
            r.cookieEnabled = !!n.cookieEnabled;
            r.doNotTrack = n.doNotTrack === "1" ? !0 : !1;
            r.superCookies = c.superCookies;
            r.systemTimeOffset = "0";
            r.browser = t.browser;
            r.deviceType = t.deviceType;
            f = [r.navigator, r.plugins, r.mimetypes, r.useragent, r.fonts, r.screen, r.monitor, r.timezone, r.GPUCode, r.language, r.cookieEnabled, r.doNotTrack, r.superCookies, r.systemTimeOffset, r.browser, r.deviceType];
            f = w(f);
            r.code = i.hash(f.join("$"))
        } catch (e) {
            h.addException(e, "Detecas.Device.getFingerprint")
        }
        return r
    }
    function ut() {
        var i = {
            ip: Detecas.Config.ip,
            localIps: "[]"
        }
          , n = tt()
          , r = it(n)
          , t = rt(n);
        return t.oldCode = r.code,
        n.deviceCode = t.code,
        {
            deviceDetail: n,
            fingerprint: t,
            userIP: i
        }
    }
    var a = " "
      , c = e.getResult()
      , l = function (n, t) {
          var i = r.prune(n, {
              depthDecr: t
          });
          return r.parse(i)
      }
      , b = function () {
          var i = function (n, t) {
              return n.name < t.name ? -1 : n.name > t.name ? 1 : 0
          }
          , u = function (n) {
              var r = [], i, t, u;
              for (i in n)
                  n.hasOwnProperty(i) && n[i].name && (t = n[i],
                  u = {
                      description: t.description,
                      filename: t.filename,
                      length: t.length,
                      name: t.name,
                      version: t.version
                  },
                  r.push(u));
              return r
          }
          , f = function (n) {
              var t = {}
                , i = {};
              return n.filter(function (n) {
                  return t[n.name] && i[n.description] ? !1 : (t[n.name] = i[n.description] = !0,
                  !0)
              })
          }
          , e = function () {
              return n.plugins === undefined || n.plugins.length <= 0 ? [] : l(n.plugins, 2)
          }
          , t;
          try {
              return t = e(),
              t = u(t),
              t = f(t),
              t = t.sort(i),
              r.stringify(t)
          } catch (o) {
              h.addException(o, "Detecas.Device.getBrowserPlugins")
          }
          return r.stringify([])
      }
      , k = function () {
          return n.mimeTypes === undefined || n.mimeTypes.length <= 0 ? "[]" : r.stringify(l(n.mimeTypes, 2))
      }
      , d = function () {
          var n = r.prune(o, {
              depthDecr: 1,
              arrayMaxLength: 3
          });
          return n = r.parse(n),
          n.availHeight = undefined,
          n.availWidth = undefined,
          n.availTop = undefined,
          n.availLeft = undefined,
          n.top = undefined,
          n.left = undefined,
          delete n.availHeight,
          delete n.availWidth,
          delete n.availTop,
          delete n.availLeft,
          delete n.left,
          delete n.top,
          r.prune(n)
      }
    ;
    return {
        getDeviceInformation: ut
    }
}(navigator, Detecas.Sha1, Detecas.Md5, Detecas.JSON, Detecas.GPU, Detecas.Config, Detecas.Browser, screen, Detecas.Fonts, Detecas.Debug)
Detecas.DeviceDetail = function (n, t, i, r, u, f, e) {
    "use strict";
    function o(n) {
        var t = n.deviceCode
          , i = "dct"
          , u = r.read(i);
        return u === t ? !1 : (r.write(i, t, 365),
        !0)
    }
    function s(n) {
        var r, o;
        try {
            var h = encodeURIComponent(u.encode(f.version))
              , c = u.encode(JSON.stringify(n))
              , s = i.createTransparentDOMElement("DIV");
            s.id = "iframe" + f.ip;
            s.innerHTML = "<iframe name='iframe" + f.ip + "' src='about:blank' style='visibility: hidden; position: absolute'><\/iframe>";
            r = i.createTransparentDOMElement("FORM");
            r.id = "form" + f.ip;
            r.setAttribute("action", f.host + "dd.ashx?version=" + h);
            r.setAttribute("method", "POST");
            r.target = "iframe" + f.ip;
            o = i.createTransparentDOMElement("INPUT");
            o.value = c;
            o.name = "deviceDetail";
            r.appendChild(o);
            t.body.appendChild(s);
            t.body.appendChild(r);
            r.submit()
        } catch (l) {
            e.addException(l, "Detecas.insertDeviceDetail")
        }
    }
    return {
        isNewDeviceDetail: o,
        insertDeviceDetail: s
    }
}(window, document, Detecas.Common, Detecas.Cookie, Detecas.Base64, Detecas.Config, Detecas.Debug)
Detecas.Storages = function (n, t, i, r, u, f, e) {
    "use strict";
    function g(n) {
        return eval("Detecas.Storages." + n)
    }
    function nt() {
        var n, t, i;
        try {
            if (a && (clearTimeout(a),
            a = null),
            !v)
                return;
            if (d)
                return;
            d = !0;
            n = [];
            for (t in c)
                c.hasOwnProperty(t) && (i = c[t],
                i !== e && n.push(i));
            v(n);
            v = null
        } catch (r) {
            f.addException(r, "Detecas.Storages.callCompleteCallback")
        }
    }
    function tt(n, t) {
        try {
            v = n;
            w = t;
            o = !1;
            c = {};
            y = 0;
            a = setTimeout(function () {
                nt()
            }, 1e3);
            b.forEach(function (n) {
                Detecas.Storages.hasOwnProperty(n) ? g(n).call(this, k) : y++
            })
        } catch (i) {
            f.addException(i, "Detecas.Storages.get")
        }
    }
    function it(n) {
        try {
            o = !0;
            b.forEach(function (t) {
                Detecas.Storages.hasOwnProperty(t) && g(t).call(this, k, n)
            })
        } catch (t) {
            f.addException(t, "Detecas.Storages.set")
        }
    }
    function s(n, t) {
        try {
            if (c.hasOwnProperty(n))
                return;
            y++;
            var i = !1;
            u.isValidObject(t) ? (i = !0,
            c[n] = t,
            w && w(n, t),
            f.addDevice(n, t)) : c[n] = e;
            f.addStorage(n, i);
            y === b.length && nt()
        } catch (r) {
            f.addException(r, "Detecas.Storages.addStorageValue")
        }
    }
    function p(n) {
        o || s(n, "")
    }
    function h(n, t, i) {
        p(n);
        f.addException(t, i)
    }
    function l(n) {
        o || s(n, e)
    }
    function rt(t, i) {
        var u = "LS", r;
        try {
            r = n.localStorage;
            r ? o ? r.setItem(t, i) : (i = r.getItem(t),
            s(u, i)) : l(u)
        } catch (f) {
            h(u, f, "Detecas.Storages.localStorage")
        }
    }
    function ut(t, i) {
        function c() { }
        function u() {
            p(r)
        }
        var r = "WS", f, e;
        try {
            f = n.openDatabase;
            f ? (e = f("websql_ec", "1.0", "", 1024),
            o ? e.transaction(function (n) {
                try {
                    var f = "CREATE TABLE IF NOT EXISTS ec(name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))";
                    n.executeSql(f, [], c, u);
                    f = "INSERT OR REPLACE INTO ec(name, value) VALUES(?, ?)";
                    n.executeSql(f, [t, i], c, u)
                } catch (e) {
                    h(r, e, "Detecas.Storages.webSql.common.isValidObject(value)")
                }
            }) : e.transaction(function (n) {
                n.executeSql("SELECT value FROM ec WHERE name=?", [t], function (n, t) {
                    try {
                        i = t.rows.item(0).value;
                        s(r, i)
                    } catch (u) {
                        h(r, u, "!Detecas.Storages.webSql.common.isValidObject(value)")
                    }
                }, u)
            })) : l(r)
        } catch (a) {
            h(r, a, "Detecas.Storages.webSql")
        }
    }
    function ft(t, i) {
        var r = "IDB", f, u;
        try {
            f = n.indexedDB || n.mozIndexedDB || n.webkitIndexedDB || n.msIndexedDB || n.shimIndexedDB;
            f ? (u = f.open("indexedDB_ec", 3),
            u.onerror = function () {
                p(r)
            }
            ,
            u.onupgradeneeded = function (n) {
                try {
                    var t = n.target.result;
                    t.objectStoreNames.contains("ec") && t.deleteObjectStore("ec");
                    t.createObjectStore("ec", {
                        keyPath: "name"
                    })
                } catch (i) {
                    h(r, i, "Detecas.Storages.indexedDB.request.onupgradeneeded")
                }
            }
            ,
            u.onsuccess = function (n) {
                var u, f, e;
                try {
                    u = n.target.result;
                    u ? (f = u.transaction(["ec"], "readwrite"),
                    f.db.objectStoreNames.contains("ec") && (e = f.objectStore("ec"),
                    e.get(t).onsuccess = function (n) {
                        var u = n.target.result;
                        o ? e.put({
                            name: t,
                            value: i
                        }) : u ? s(r, u.value) : s(r, "")
                    }
                    )) : o || s(r, "")
                } catch (c) {
                    h(r, c, "Detecas.Storages.indexedDB.request.onsuccess")
                }
            }
            ) : l(r)
        } catch (e) {
            h(r, e, "Detecas.Storages.indexedDB")
        }
    }
    function et(t, i) {
        var f = "WN", r;
        try {
            o ? (r = n.name,
            (!u.isValidObject(r) || u.isValidDeviceId(r)) && (n.name = i)) : (i = n.name,
            u.isValidDeviceId(i) || (i = ""),
            s(f, i))
        } catch (e) {
            h(f, e, "Detecas.Storages.windowName")
        }
    }
    function ot(t, i) {
        function r() {
            o || s(u, "")
        }
        function e(i, u) {
            i.root.getFile(t + ".txt", {}, function (n) {
                u(n)
            }, function (f) {
                (f.name === "NotFoundError" || f.code === n.FileError.NOT_FOUND_ERR) && i.root.getFile(t + ".txt", {
                    create: !0,
                    exclusive: !0
                }, function (n) {
                    u(n)
                }, r)
            })
        }
        function c(n) {
            e(n, function (n) {
                n.createWriter(function (n) {
                    n.onerror = r;
                    var t = new Blob([i], {
                        type: "text/plain"
                    });
                    n.write(t)
                }, r)
            })
        }
        function a(n) {
            e(n, function (n) {
                n.file(function (n) {
                    var t = new FileReader;
                    t.onloadend = function () {
                        s(u, this.result)
                    }
                    ;
                    t.readAsText(n)
                }, r)
            })
        }
        var u = "FS", f;
        try {
            f = n.requestFileSystem || n.webkitRequestFileSystem;
            f ? o ? f(n.TEMPORARY, 1024, c, r) : f(n.TEMPORARY, 1024, a, r) : l(u)
        } catch (v) {
            h(u, v, "Detecas.Storages.fileStorage")
        }
    }
    function st(n, i) {
        var f = "UD", r;
        try {
            r = u.createTransparentDOMElement("div", "_ud");
            t.body.appendChild(r);
            r.addBehavior ? (r.style.behavior = "url(#default#userData)",
            n = n.replace(/[^a-z]+/g, ""),
            o ? (r.setAttribute(n, i),
            r.save(n)) : (r.load(n),
            s(f, r.getAttribute(n)))) : l(f)
        } catch (e) {
            p(f)
        }
    }
    var k = r.cookieStorage
      , d = !1
      , a = null
      , v = null
      , w = null
      , b = r.storages.split(",")
      , o = !1
      , y = 0
      , c = {};
    return {
        localStorage: rt,
        webSql: ut,
        indexedDb: ft,
        windowName: et,
        fileStorage: ot,
        userData: st,
        set: it,
        get: tt
    }
}(window, document, navigator, Detecas.Config, Detecas.Common, Detecas.Debug)
Detecas.Core = function (n, t, i, r, u, f, e, o, s, h, c, l, a, v) {
    "use strict";
    function nt() {
        p.userIP.localIps = i.isValidObject(h.localIps) ? h.localIps : "[]";
        var t = o.stringify({
            device: p.fingerprint,
            ip: s.ip,
            localIps: p.userIP.localIps,
            domainName: n.location.host
        });
        return e.encode(u.encrypt(s.ip, t))
    }
    function tt() {
        var i = encodeURIComponent(nt())
          , r = encodeURIComponent(e.encode(u.encrypt("PI", s.ip)))
          , f = encodeURIComponent(e.encode(s.version))
          , o = ["deviceInfo=" + i, "ip=" + r, "version=" + f].join("&")
          , n = t.createElement("SCRIPT");
        n.type = "text/javascript";
        n.id = "evercookie" + s.ip;
        n.src = s.host + "ec.ashx?" + o;
        n.async = !0;
        t.getElementsByTagName("head")[0].appendChild(n)
    }
    function it() {
        try {
            i.removeDOMElement("evercookie" + s.ip, "iframe" + s.ip, "form" + s.ip, "__canvasContainer")
        } catch (n) {
            v.addException(n, "Detecas.Core.cleanup")
        }
    }
    function rt(n) {
        a.set(n)
    }
    function ut(n, t) {
        try {
            if (t !== w) {
                if (d)
                    return;
                v.addExecuteTime(4);
                d = !0;
                w = t;
                b();
                v.addDevice("CB1", w)
            }
        } catch (i) {
            v.addException(i, "Detecas.Core.getDeviceIdFromStorage")
        }
    }
    function g(n) {
        try {
            v.addExecuteTime(5);
            var t = [w];
            n.forEach(function (n) {
                i.isValidDeviceId(n) && t.indexOf(n) === -1 && t.push(n)
            });
            p.fingerprint.ClientDeviceIds = t.join();
            tt()
        } catch (r) {
            v.addException(r, "Detecas.Core.getDeviceIdsFromStorages")
        }
    }
    function ft() {
        try {
            v.addExecuteTime(1);
            i.isValidDeviceId(w) && (b(),
            v.addDevice(k ? "CC" : "DF", w),
            v.addExecuteTime(2));
            p = c.getDeviceInformation();
            b();
            v.addExecuteTime(3);
            k ? a.get(g) : a.get(g, ut)
        } catch (n) {
            v.addException(n, "Detecas.Core.start")
        }
    }
    function et(t) {
        try {
            if (v.addExecuteTime(6),
            w = t,
            i.isValidDeviceId(t)) {
                if (typeof n.API_CALLBACK == "function") {
                    var r = i.collectDeviceInfoToInjectToClient(t, p.fingerprint);
                    n.API_CALLBACK.call(n, r)
                } else
                    b(),
                    v.addDevice("CB2", t);
                v.addExecuteTime(7);
                l.isNewDeviceDetail(p.deviceDetail) && (l.insertDeviceDetail(p.deviceDetail),
                v.addExecuteTime(8));
                y !== null && i.isValidObject(y.value) || v.addException(new Error("Can't inject __di"), "Detecas.Core.callback");
                rt(t)
            }
            setTimeout(function () {
                it()
            }, 1e3)
        } catch (u) {
            v.addException(u, "Detecas.Core.callback")
        }
    }
    function b() {
        var u, n, r;
        try {
            y === null && (y = t.getElementById("__di"),
            y === null && (u = t.forms[0] || t.body,
            y = t.createElement("INPUT"),
            y.id = y.name = "__di",
            y.setAttribute("type", "hidden"),
            u.appendChild(y)));
            y !== null ? (n = i.collectDeviceInfoToInjectToClient(w, p.fingerprint),
            y.value = n) : v.addException(new Error("Can't inject __di"), "Detecas.Core.injectDeviceInfoToClient");
            r = Detecas.Core.logger;
            r && r(n)
        } catch (f) {
            v.addException(f, "Detecas.Core.injectDeviceInfoToClient")
        }
    }
    h.init();
    var y = null
      , p = {}
      , k = !1
      , d = !1
      , w = s.defaultDeviceId;
    return s.cachedDeviceId && (w = s.cachedDeviceId,
    k = !0),
    {
        start: ft,
        callback: et
    }
}(window, document, Detecas.Common, Detecas.Cookie, Detecas.Rc4, Detecas.Hex, Detecas.Base64, Detecas.JSON, Detecas.Config, Detecas.RTC, Detecas.Device, Detecas.DeviceDetail, Detecas.Storages, Detecas.Debug),
function (n, t, i, r, u) {
    "use strict";
    function e() {
        try {
            var n = new RegExp("loaded|complete|interactive");
            typeof t.readyState == "undefined" || n.test(t.readyState) ? (f && (clearTimeout(f),
            f = null),
            s || (s = !0,
            i.start())) : (o++,
            o < 100 ? f = setTimeout(e, 100) : u.addExecuteTime(0))
        } catch (r) {
            u.addException(r, "Detecas.checkDomReady")
        }
    }
    var o = 0
      , f = null
      , s = !1;
    try {
        u.setVersion(r.version);
        t.addEventListener && t.addEventListener("DOMContentLoaded", e, !1);
        e()
    } catch (h) {
        u.addException(h, "Detecas")
    }
}(window, document, Detecas.Core, Detecas.Config, Detecas.Debug)
;
