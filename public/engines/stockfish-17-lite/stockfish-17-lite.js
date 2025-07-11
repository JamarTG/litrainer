/*!
 * Stockfish.js 17 (c) 2025, Chess.com, LLC
 * https://github.com/nmrugg/stockfish.js
 * License: GPLv3
 *
 * Based on Stockfish (c) T. Romstad, M. Costalba, J. Kiiski, G. Linscott and other contributors.
 * https://github.com/official-stockfish/Stockfish
 *
 * Nets by Linmiao Xu (linrock)
 * https://tests.stockfishchess.org/nns?network_name=nn-9067e33176e
 */ !(function () {
  var i, s, u, c, e, n, r;
  function f() {
    function e(e) {
      function i() {
        return _.buffer != g && v(_.buffer), Z;
      }
      function l() {
        return _.buffer != g && v(_.buffer), ee;
      }
      function h() {
        return _.buffer != g && v(_.buffer), te;
      }
      function P() {
        return _.buffer != g && v(_.buffer), ne;
      }
      (e = e || {}),
        ((c = c || (void 0 !== e ? e : {})).ready = new Promise(function (e, t) {
          (F = e), (W = t);
        })),
        "undefined" != typeof global &&
          "[object process]" === Object.prototype.toString.call(global.process) &&
          "undefined" != typeof fetch &&
          ("undefined" == typeof XMLHttpRequest &&
            (global.XMLHttpRequest = function () {
              var n,
                r = {
                  open: function (e, t) {
                    n = t;
                  },
                  send: function () {
                    require("fs").readFile(n, function (e, t) {
                      (r.readyState = 4),
                        e
                          ? (console.error(e), (r.status = 404), r.onerror(e))
                          : ((r.status = 200), (r.response = t), r.onreadystatechange(), r.onload());
                    });
                  }
                };
              return r;
            }),
          (fetch = null)),
        (c.print = function (e) {
          c.listener ? c.listener(e) : console.log(e);
        }),
        (c.printErr = function (e) {
          c.listener ? c.listener(e) : console.error(e);
        }),
        (c.terminate = function () {
          void 0 !== E && E.ra();
        });
      var c,
        F,
        W,
        B,
        t,
        n,
        L,
        U,
        Y = Object.assign({}, c),
        H = [],
        s = "./this.program",
        r = (e, t) => {
          throw t;
        },
        N = "object" == typeof window,
        o = "function" == typeof importScripts,
        u =
          "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
        d = c.ENVIRONMENT_IS_PTHREAD || !1,
        a = "";
      function V(e) {
        return c.locateFile ? c.locateFile(e, a) : a + e;
      }
      if (u) {
        (a = o ? require("path").dirname(a) + "/" : __dirname + "/"),
          (U = () => {
            L || ((n = require("fs")), (L = require("path")));
          }),
          (B = function (e, t) {
            return U(), (e = L.normalize(e)), n.readFileSync(e, t ? void 0 : "utf8");
          }),
          (t = (e) => (e = (e = B(e, !0)).buffer ? e : new Uint8Array(e))),
          1 < process.argv.length && (s = process.argv[1].replace(/\\/g, "/")),
          (H = process.argv.slice(2)),
          process.on("uncaughtException", function (e) {
            if (!(e instanceof q)) throw e;
          }),
          process.on("unhandledRejection", function (e) {
            throw e;
          }),
          (r = (e, t) => {
            if (b()) throw ((process.exitCode = e), t);
            t instanceof q || m("exiting due to exception: " + t), process.exit(e);
          }),
          (c.inspect = function () {
            return "[Emscripten Module object]";
          });
        let e;
        try {
          e = require("worker_threads");
        } catch (e) {
          throw (
            (console.error(
              'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'
            ),
            e)
          );
        }
        global.Worker = e.Worker;
      } else
        (N || o) &&
          (o
            ? (a = self.location.href)
            : "undefined" != typeof document && document.currentScript && (a = document.currentScript.src),
          (a =
            0 !== (a = ht ? ht : a).indexOf("blob:") ? a.substr(0, a.replace(/[?#].*/, "").lastIndexOf("/") + 1) : ""),
          u ||
            ((B = (e) => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, !1), t.send(null), t.responseText;
            }),
            o &&
              (t = (e) => {
                var t = new XMLHttpRequest();
                return t.open("GET", e, !1), (t.responseType = "arraybuffer"), t.send(null), new Uint8Array(t.response);
              })));
      u && "undefined" == typeof performance && (global.performance = require("perf_hooks").performance);
      var G,
        f,
        p = console.log.bind(console),
        $ = console.warn.bind(console),
        X = (u && (U(), (p = (e) => n.writeSync(1, e + "\n")), ($ = (e) => n.writeSync(2, e + "\n"))), c.print || p),
        m = c.printErr || $,
        z =
          (Object.assign(c, Y),
          c.arguments && (H = c.arguments),
          c.thisProgram && (s = c.thisProgram),
          c.quit && (r = c.quit),
          c.wasmBinary && (f = c.wasmBinary),
          c.noExitRuntime || !0);
      "object" != typeof WebAssembly && A("no native wasm support detected");
      var _,
        Q,
        J = !1;
      function K(e) {
        var t = new TextDecoder(e);
        this.decode = (e) => (e.buffer instanceof SharedArrayBuffer && (e = new Uint8Array(e)), t.decode.call(t, e));
      }
      var g,
        Z,
        ee,
        te,
        ne,
        re = "undefined" != typeof TextDecoder ? new K("utf8") : void 0;
      function ae(e, t, n) {
        var r = t + n;
        for (n = t; e[n] && !(r <= n); ) ++n;
        if (16 < n - t && e.subarray && re) return re.decode(e.subarray(t, n));
        for (r = ""; t < n; ) {
          var a,
            o,
            i = e[t++];
          128 & i
            ? ((a = 63 & e[t++]),
              192 == (224 & i)
                ? (r += String.fromCharCode(((31 & i) << 6) | a))
                : ((o = 63 & e[t++]),
                  (i =
                    224 == (240 & i)
                      ? ((15 & i) << 12) | (a << 6) | o
                      : ((7 & i) << 18) | (a << 12) | (o << 6) | (63 & e[t++])) < 65536
                    ? (r += String.fromCharCode(i))
                    : ((i -= 65536), (r += String.fromCharCode(55296 | (i >> 10), 56320 | (1023 & i))))))
            : (r += String.fromCharCode(i));
        }
        return r;
      }
      function y(e) {
        return e ? ae(l(), e, void 0) : "";
      }
      function w(e, t, n, r) {
        if (0 < r) {
          r = n + r - 1;
          for (var a = 0; a < e.length; ++a) {
            var o = e.charCodeAt(a);
            if ((o = 55296 <= o && o <= 57343 ? (65536 + ((1023 & o) << 10)) | (1023 & e.charCodeAt(++a)) : o) <= 127) {
              if (r <= n) break;
              t[n++] = o;
            } else {
              if (o <= 2047) {
                if (r <= n + 1) break;
                t[n++] = 192 | (o >> 6);
              } else {
                if (o <= 65535) {
                  if (r <= n + 2) break;
                  t[n++] = 224 | (o >> 12);
                } else {
                  if (r <= n + 3) break;
                  (t[n++] = 240 | (o >> 18)), (t[n++] = 128 | ((o >> 12) & 63));
                }
                t[n++] = 128 | ((o >> 6) & 63);
              }
              t[n++] = 128 | (63 & o);
            }
          }
          t[n] = 0;
        }
      }
      function oe(e) {
        for (var t = 0, n = 0; n < e.length; ++n) {
          var r = e.charCodeAt(n);
          (r = 55296 <= r && r <= 57343 ? (65536 + ((1023 & r) << 10)) | (1023 & e.charCodeAt(++n)) : r) <= 127
            ? ++t
            : (t = r <= 2047 ? t + 2 : r <= 65535 ? t + 3 : t + 4);
        }
        return t;
      }
      function ie(e) {
        var t = oe(e) + 1,
          n = j(t);
        return w(e, i(), n, t), n;
      }
      function se(e, t) {
        i().set(e, t);
      }
      function v(e) {
        (g = e),
          (c.HEAP8 = Z = new Int8Array(e)),
          (c.HEAP16 = new Int16Array(e)),
          (c.HEAP32 = te = new Int32Array(e)),
          (c.HEAPU8 = ee = new Uint8Array(e)),
          (c.HEAPU16 = new Uint16Array(e)),
          (c.HEAPU32 = new Uint32Array(e)),
          (c.HEAPF32 = new Float32Array(e)),
          (c.HEAPF64 = ne = new Float64Array(e));
      }
      if (
        ("undefined" != typeof TextDecoder && new K("utf-16le"),
        d && (g = c.buffer),
        (p = c.INITIAL_MEMORY || 134217728),
        d)
      )
        (_ = c.wasmMemory), (g = c.buffer);
      else if (c.wasmMemory) _ = c.wasmMemory;
      else if (
        !(
          (_ = new WebAssembly.Memory({ initial: p / 65536, maximum: 32768, shared: !0 })).buffer instanceof
          SharedArrayBuffer
        )
      )
        throw (
          (m(
            "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"
          ),
          u &&
            console.log(
              "(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"
            ),
          Error("bad memory"))
        );
      (g = _ ? _.buffer : g).byteLength, v(g);
      var ue,
        ce = [],
        fe = [],
        le = [],
        de = [],
        pe = 0;
      function b() {
        return z || 0 < pe;
      }
      var x,
        S = 0,
        me = null,
        M = null;
      function A(e) {
        throw (
          (d ? postMessage({ cmd: "onAbort", arg: e }) : c.onAbort && c.onAbort(e),
          m((e = "Aborted(" + e + ")")),
          (J = !0),
          (e = new WebAssembly.RuntimeError(e + ". Build with -s ASSERTIONS=1 for more info.")),
          W(e),
          e)
        );
      }
      function he() {
        return x.startsWith("data:application/octet-stream;base64,");
      }
      function _e() {
        var e = x;
        try {
          if (e == x && f) return new Uint8Array(f);
          if (t) return t(e);
          throw "both async and sync fetching of the wasm failed";
        } catch (e) {
          A(e);
        }
      }
      (c.preloadedImages = {}), (c.preloadedAudios = {}), (x = "stockfish.wasm"), he() || (x = V(x));
      var ge = {};
      function k(e) {
        for (; 0 < e.length; ) {
          var t,
            n = e.shift();
          "function" == typeof n
            ? n(c)
            : "number" == typeof (t = n.Ua)
              ? void 0 === n.fa
                ? be(t)()
                : be(t)(n.fa)
              : t(void 0 === n.fa ? null : n.fa);
        }
      }
      function ye(e) {
        var t = ct();
        return (e = e()), ft(t), e;
      }
      function we(e) {
        var t = E.aa[e];
        t && ((h()[e >> 2] = 0), E.wa(t.worker));
      }
      var E = {
        ba: [],
        ha: [],
        ma: [],
        Ca: function () {
          d && E.Ea();
        },
        Xa: function () {},
        Ea: function () {
          (E.receiveObjectTransfer = E.Ha), (E.threadInit = E.xa), (E.setExitStatus = E.Ja), (z = !1);
        },
        aa: {},
        Ja: function () {},
        ra: function () {
          for (var e in E.aa) {
            var t = E.aa[e];
            t && t.worker && E.wa(t.worker);
          }
          for (e = 0; e < E.ba.length; ++e) E.ba[e].terminate();
          E.ba = [];
        },
        wa: function (e) {
          E.Ia(function () {
            delete E.aa[e.da.sa], E.ba.push(e), E.ha.splice(E.ha.indexOf(e), 1), ot(e.da.sa), (e.da = void 0);
          });
        },
        Ia: function (e) {
          h()[lt >> 2] = 0;
          try {
            e();
          } finally {
            h()[lt >> 2] = 1;
          }
        },
        Ha: function () {},
        xa: function () {
          for (var e in E.ma) E.ma.hasOwnProperty(e) && E.ma[e]();
        },
        Fa: function (r, a) {
          (r.onmessage = (e) => {
            var t,
              n = (e = e.data).cmd;
            r.da && (E.za = r.da.sa),
              e.targetThread && e.targetThread != it()
                ? (t = E.aa[e.bb])
                  ? t.worker.postMessage(e, e.transferList)
                  : m(
                      'Internal error! Worker sent a message "' +
                        n +
                        '" to target pthread ' +
                        e.targetThread +
                        ", but that thread no longer exists!"
                    )
                : "processQueuedMainThreadWork" === n
                  ? nt()
                  : "spawnThread" === n
                    ? xe(e)
                    : "cleanupThread" === n
                      ? we(e.thread)
                      : "killThread" === n
                        ? ((e = e.thread),
                          (h()[e >> 2] = 0),
                          (n = E.aa[e]),
                          delete E.aa[e],
                          n.worker.terminate(),
                          ot(e),
                          E.ha.splice(E.ha.indexOf(n.worker), 1),
                          (n.worker.da = void 0))
                        : "cancelThread" === n
                          ? E.aa[e.thread].worker.postMessage({ cmd: "cancel" })
                          : "loaded" === n
                            ? ((r.loaded = !0), a && a(r), r.ga && (r.ga(), delete r.ga))
                            : "print" === n
                              ? X("Thread " + e.threadId + ": " + e.text)
                              : "printErr" === n
                                ? m("Thread " + e.threadId + ": " + e.text)
                                : "alert" === n
                                  ? alert("Thread " + e.threadId + ": " + e.text)
                                  : "setimmediate" === e.target
                                    ? r.postMessage(e)
                                    : "onAbort" === n
                                      ? c.onAbort && c.onAbort(e.arg)
                                      : m("worker sent an unknown command " + n),
              (E.za = void 0);
          }),
            (r.onerror = (e) => {
              throw (m("worker sent an error! " + e.filename + ":" + e.lineno + ": " + e.message), e);
            }),
            u &&
              (r.on("message", function (e) {
                r.onmessage({ data: e });
              }),
              r.on("error", function (e) {
                r.onerror(e);
              }),
              r.on("detachedExit", function () {})),
            r.postMessage({ cmd: "load", urlOrBlob: c.mainScriptUrlOrBlob || ht, wasmMemory: _, wasmModule: Q });
        },
        ya: function () {
          var e = V("stockfish.worker.js");
          E.ba.push(new Worker(e));
        },
        Ba: function () {
          return 0 == E.ba.length && (E.ya(), E.Fa(E.ba[0])), E.ba.pop();
        }
      };
      function ve(e) {
        if (d) return I(1, 0, e);
        try {
          pt(e);
        } catch (e) {
          e instanceof q || "unwind" == e || r(1, e);
        }
      }
      c.establishStackSpace = function () {
        var e = it(),
          t = h()[(e + 44) >> 2],
          e = h()[(e + 48) >> 2];
        ut(t, t - e), ft(t);
      };
      var D = [];
      function be(e) {
        var t = D[e];
        return t || (e >= D.length && (D.length = e + 1), (D[e] = t = ue.get(e))), t;
      }
      function xe(e) {
        var t = E.Ba();
        if (!t) return 6;
        E.ha.push(t);
        var n = (E.aa[e.qa] = { worker: t, sa: e.qa }),
          r = ((t.da = n), { cmd: "run", start_routine: e.Ka, arg: e.fa, threadInfoStruct: e.qa });
        return (
          (t.ga = () => {
            (r.time = performance.now()), t.postMessage(r, e.Pa);
          }),
          t.loaded && (t.ga(), delete t.ga),
          0
        );
      }
      c.invokeEntryPoint = function (e, t) {
        return be(e)(t);
      };
      var Se = u
          ? () => {
              var e = process.hrtime();
              return 1e3 * e[0] + e[1] / 1e6;
            }
          : d
            ? () => performance.now() - c.__performance_now_clock_drift
            : () => performance.now(),
        Me = [null, [], []],
        Ae = {};
      function ke(e, t, n) {
        return d ? I(2, 1, e, t, n) : 0;
      }
      function Ee(e, t) {
        if (d) return I(3, 1, e, t);
      }
      function De(e, t, n) {
        return d ? I(4, 1, e, t, n) : 0;
      }
      function Ie(e, t, n) {
        if (d) return I(5, 1, e, t, n);
      }
      function I(a, o) {
        var i = arguments.length - 2,
          s = arguments;
        return ye(function () {
          for (var e = j(8 * i), t = e >> 3, n = 0; n < i; n++) {
            var r = s[2 + n];
            P()[t + n] = r;
          }
          return rt(a, i, e, o);
        });
      }
      var Re = [],
        Oe = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];
      function Te(e) {
        return (e = 2 < e ? y(e) : e), Oe[e] || ("undefined" != typeof document ? document.querySelector(e) : void 0);
      }
      function Ce(e, t, n) {
        var r,
          a,
          o,
          i,
          s = Te(e);
        return s
          ? (s.la && ((h()[s.la >> 2] = t), (h()[(s.la + 4) >> 2] = n)),
            !s.va && s.Ra
              ? s.la
                ? ((s = h()[(s.la + 8) >> 2]),
                  (e = e ? y(e) : ""),
                  (r = s),
                  (a = e),
                  (o = t),
                  (i = n),
                  ye(function () {
                    var e,
                      t = j(12),
                      n = 0;
                    a && ((n = oe(a) + 1), (e = st(n)), w(a, l(), e, n), (n = e)),
                      (h()[t >> 2] = n),
                      (h()[(t + 4) >> 2] = o),
                      (h()[(t + 8) >> 2] = i),
                      at(r, 657457152, 0, n, t);
                  }),
                  1)
                : -4
              : ((e = !1),
                (s = s.va ? s.va : s).ka &&
                  s.ka.ja &&
                  (e =
                    0 === (e = s.ka.ja.getParameter(2978))[0] && 0 === e[1] && e[2] === s.width && e[3] === s.height),
                (s.width = t),
                (s.height = n),
                e && s.ka.ja.viewport(0, 0, t, n),
                0))
          : -4;
      }
      function je(e, t, n) {
        return d ? I(6, 1, e, t, n) : Ce(e, t, n);
      }
      function qe(n, e) {
        n.ta ||
          ((n.ta = n.getContext),
          (n.getContext = function (e, t) {
            return ("webgl" == e) == (t = n.ta(e, t)) instanceof WebGLRenderingContext ? t : null;
          }));
        var t,
          r,
          a,
          o = n.getContext("webgl", e);
        {
          if (o) {
            if (
              ((o = o),
              (e = e),
              (r = st(8)),
              (h()[(r + 4) >> 2] = it()),
              (a = { Wa: r, attributes: e, version: e.Ga, ja: o }),
              o.canvas && (o.canvas.ka = a),
              (void 0 === e.ua || e.ua) && !(o = (o = a) || Pe).Da)
            ) {
              o.Da = !0;
              var i = (t = o.ja),
                s = i.getExtension("ANGLE_instanced_arrays"),
                u =
                  (s &&
                    ((i.vertexAttribDivisor = function (e, t) {
                      s.vertexAttribDivisorANGLE(e, t);
                    }),
                    (i.drawArraysInstanced = function (e, t, n, r) {
                      s.drawArraysInstancedANGLE(e, t, n, r);
                    }),
                    (i.drawElementsInstanced = function (e, t, n, r, a) {
                      s.drawElementsInstancedANGLE(e, t, n, r, a);
                    })),
                  t),
                c = u.getExtension("OES_vertex_array_object"),
                f =
                  (c &&
                    ((u.createVertexArray = function () {
                      return c.createVertexArrayOES();
                    }),
                    (u.deleteVertexArray = function (e) {
                      c.deleteVertexArrayOES(e);
                    }),
                    (u.bindVertexArray = function (e) {
                      c.bindVertexArrayOES(e);
                    }),
                    (u.isVertexArray = function (e) {
                      return c.isVertexArrayOES(e);
                    })),
                  t),
                l = f.getExtension("WEBGL_draw_buffers");
              l &&
                (f.drawBuffers = function (e, t) {
                  l.drawBuffersWEBGL(e, t);
                }),
                (t.Sa = t.getExtension("EXT_disjoint_timer_query")),
                (t.Za = t.getExtension("WEBGL_multi_draw")),
                (t.getSupportedExtensions() || []).forEach(function (e) {
                  e.includes("lose_context") || e.includes("debug") || t.getExtension(e);
                });
            }
            return r;
          }
          return 0;
        }
      }
      var Pe,
        Fe,
        We = ["default", "low-power", "high-performance"],
        Be = {};
      function Le() {
        if (!Fe) {
          var e,
            t = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (("object" == typeof navigator && navigator.languages && navigator.languages[0]) || "C").replace(
                  "-",
                  "_"
                ) + ".UTF-8",
              _: s || "./this.program"
            };
          for (e in Be) void 0 === Be[e] ? delete t[e] : (t[e] = Be[e]);
          var n = [];
          for (e in t) n.push(e + "=" + t[e]);
          Fe = n;
        }
        return Fe;
      }
      function Ue(r, a) {
        var o;
        return d
          ? I(7, 1, r, a)
          : ((o = 0),
            Le().forEach(function (e, t) {
              var n = a + o;
              for (t = h()[(r + 4 * t) >> 2] = n, n = 0; n < e.length; ++n) i()[t++ >> 0] = e.charCodeAt(n);
              (i()[t >> 0] = 0), (o += e.length + 1);
            }),
            0);
      }
      function Ye(e, t) {
        var n, r;
        return d
          ? I(8, 1, e, t)
          : ((n = Le()),
            (h()[e >> 2] = n.length),
            (r = 0),
            n.forEach(function (e) {
              r += e.length + 1;
            }),
            (h()[t >> 2] = r),
            0);
      }
      function He(e) {
        return d ? I(9, 1, e) : 0;
      }
      function Ne(e, t, n, r) {
        return d ? I(10, 1, e, t, n, r) : ((e = Ae.Va(e)), (t = Ae.Ta(e, t, n)), (h()[r >> 2] = t), 0);
      }
      function Ve(e, t, n, r, a) {
        if (d) return I(11, 1, e, t, n, r, a);
      }
      function Ge(e, t, n, r) {
        if (d) return I(12, 1, e, t, n, r);
        for (var a = 0, o = 0; o < n; o++) {
          var i = h()[t >> 2],
            s = h()[(t + 4) >> 2];
          t += 8;
          for (var u = 0; u < s; u++) {
            var c = l()[i + u],
              f = Me[e];
            0 === c || 10 === c ? ((1 === e ? X : m)(ae(f, 0)), (f.length = 0)) : f.push(c);
          }
          a += s;
        }
        return (h()[r >> 2] = a), 0;
      }
      function R(e) {
        return 0 == e % 4 && (0 != e % 100 || 0 == e % 400);
      }
      function $e(e, t) {
        for (var n = 0, r = 0; r <= t; n += e[r++]);
        return n;
      }
      var O = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        T = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function C(e, t) {
        for (e = new Date(e.getTime()); 0 < t; ) {
          var n = e.getMonth(),
            r = (R(e.getFullYear()) ? O : T)[n];
          if (!(t > r - e.getDate())) {
            e.setDate(e.getDate() + t);
            break;
          }
          (t -= r - e.getDate() + 1),
            e.setDate(1),
            n < 11 ? e.setMonth(n + 1) : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
        }
        return e;
      }
      function Xe(e, t, n, r) {
        function a(e, t, n) {
          for (e = "number" == typeof e ? e.toString() : e || ""; e.length < t; ) e = n[0] + e;
          return e;
        }
        function o(e, t) {
          return a(e, t, "0");
        }
        function i(e, t) {
          function n(e) {
            return e < 0 ? -1 : 0 < e ? 1 : 0;
          }
          var r;
          return (r =
            0 === (r = n(e.getFullYear() - t.getFullYear())) && 0 === (r = n(e.getMonth() - t.getMonth()))
              ? n(e.getDate() - t.getDate())
              : r);
        }
        function s(e) {
          switch (e.getDay()) {
            case 0:
              return new Date(e.getFullYear() - 1, 11, 29);
            case 1:
              return e;
            case 2:
              return new Date(e.getFullYear(), 0, 3);
            case 3:
              return new Date(e.getFullYear(), 0, 2);
            case 4:
              return new Date(e.getFullYear(), 0, 1);
            case 5:
              return new Date(e.getFullYear() - 1, 11, 31);
            case 6:
              return new Date(e.getFullYear() - 1, 11, 30);
          }
        }
        function u(e) {
          e = C(new Date(e.$ + 1900, 0, 1), e.pa);
          var t = new Date(e.getFullYear() + 1, 0, 4),
            n = s(new Date(e.getFullYear(), 0, 4)),
            t = s(t);
          return i(n, e) <= 0 ? (i(t, e) <= 0 ? e.getFullYear() + 1 : e.getFullYear()) : e.getFullYear() - 1;
        }
        var c,
          f = h()[(r + 40) >> 2];
        for (c in ((r = {
          Na: h()[r >> 2],
          Ma: h()[(r + 4) >> 2],
          na: h()[(r + 8) >> 2],
          ia: h()[(r + 12) >> 2],
          ea: h()[(r + 16) >> 2],
          $: h()[(r + 20) >> 2],
          oa: h()[(r + 24) >> 2],
          pa: h()[(r + 28) >> 2],
          cb: h()[(r + 32) >> 2],
          La: h()[(r + 36) >> 2],
          Oa: f ? y(f) : ""
        }),
        (n = y(n)),
        (f = {
          "%c": "%a %b %d %H:%M:%S %Y",
          "%D": "%m/%d/%y",
          "%F": "%Y-%m-%d",
          "%h": "%b",
          "%r": "%I:%M:%S %p",
          "%R": "%H:%M",
          "%T": "%H:%M:%S",
          "%x": "%m/%d/%y",
          "%X": "%H:%M:%S",
          "%Ec": "%c",
          "%EC": "%C",
          "%Ex": "%m/%d/%y",
          "%EX": "%H:%M:%S",
          "%Ey": "%y",
          "%EY": "%Y",
          "%Od": "%d",
          "%Oe": "%e",
          "%OH": "%H",
          "%OI": "%I",
          "%Om": "%m",
          "%OM": "%M",
          "%OS": "%S",
          "%Ou": "%u",
          "%OU": "%U",
          "%OV": "%V",
          "%Ow": "%w",
          "%OW": "%W",
          "%Oy": "%y"
        })))
          n = n.replace(new RegExp(c, "g"), f[c]);
        var l,
          d,
          p = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          m = "January February March April May June July August September October November December".split(" "),
          f = {
            "%a": function (e) {
              return p[e.oa].substring(0, 3);
            },
            "%A": function (e) {
              return p[e.oa];
            },
            "%b": function (e) {
              return m[e.ea].substring(0, 3);
            },
            "%B": function (e) {
              return m[e.ea];
            },
            "%C": function (e) {
              return o(((e.$ + 1900) / 100) | 0, 2);
            },
            "%d": function (e) {
              return o(e.ia, 2);
            },
            "%e": function (e) {
              return a(e.ia, 2, " ");
            },
            "%g": function (e) {
              return u(e).toString().substring(2);
            },
            "%G": u,
            "%H": function (e) {
              return o(e.na, 2);
            },
            "%I": function (e) {
              return 0 == (e = e.na) ? (e = 12) : 12 < e && (e -= 12), o(e, 2);
            },
            "%j": function (e) {
              return o(e.ia + $e(R(e.$ + 1900) ? O : T, e.ea - 1), 3);
            },
            "%m": function (e) {
              return o(e.ea + 1, 2);
            },
            "%M": function (e) {
              return o(e.Ma, 2);
            },
            "%n": function () {
              return "\n";
            },
            "%p": function (e) {
              return 0 <= e.na && e.na < 12 ? "AM" : "PM";
            },
            "%S": function (e) {
              return o(e.Na, 2);
            },
            "%t": function () {
              return "\t";
            },
            "%u": function (e) {
              return e.oa || 7;
            },
            "%U": function (e) {
              var t = new Date(e.$ + 1900, 0, 1),
                n = 0 === t.getDay() ? t : C(t, 7 - t.getDay());
              return i(n, (e = new Date(e.$ + 1900, e.ea, e.ia))) < 0
                ? o(
                    Math.ceil(
                      (31 - n.getDate() + ($e(R(e.getFullYear()) ? O : T, e.getMonth() - 1) - 31) + e.getDate()) / 7
                    ),
                    2
                  )
                : 0 === i(n, t)
                  ? "01"
                  : "00";
            },
            "%V": function (e) {
              var t = new Date(e.$ + 1901, 0, 4),
                n = s(new Date(e.$ + 1900, 0, 4)),
                t = s(t),
                r = C(new Date(e.$ + 1900, 0, 1), e.pa);
              return i(r, n) < 0
                ? "53"
                : i(t, r) <= 0
                  ? "01"
                  : o(
                      Math.ceil((n.getFullYear() < e.$ + 1900 ? e.pa + 32 - n.getDate() : e.pa + 1 - n.getDate()) / 7),
                      2
                    );
            },
            "%w": function (e) {
              return e.oa;
            },
            "%W": function (e) {
              var t = new Date(e.$, 0, 1),
                n = 1 === t.getDay() ? t : C(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1);
              return i(n, (e = new Date(e.$ + 1900, e.ea, e.ia))) < 0
                ? o(
                    Math.ceil(
                      (31 - n.getDate() + ($e(R(e.getFullYear()) ? O : T, e.getMonth() - 1) - 31) + e.getDate()) / 7
                    ),
                    2
                  )
                : 0 === i(n, t)
                  ? "01"
                  : "00";
            },
            "%y": function (e) {
              return (e.$ + 1900).toString().substring(2);
            },
            "%Y": function (e) {
              return e.$ + 1900;
            },
            "%z": function (e) {
              var t = 0 <= (e = e.La);
              return (e = Math.abs(e) / 60), (t ? "+" : "-") + String("0000" + ((e / 60) * 100 + (e % 60))).slice(-4);
            },
            "%Z": function (e) {
              return e.Oa;
            },
            "%%": function () {
              return "%";
            }
          };
        for (c in ((n = n.replace(/%%/g, "\0\0")), f)) n.includes(c) && (n = n.replace(new RegExp(c, "g"), f[c](r)));
        return (
          (n = n.replace(/\0\0/g, "%")),
          (l = n),
          (d = Array(oe(l) + 1)),
          w(l, d, 0, d.length),
          (c = d).length > t ? 0 : (se(c, e), c.length - 1)
        );
      }
      E.Ca();
      var ze,
        Qe = [null, ve, ke, Ee, De, Ie, je, Ue, Ye, He, Ne, Ve, Ge],
        Je = {
          p: function (e, t) {
            Ke(e, t);
          },
          l: function (e) {
            et(e, !o, 1, !N), E.xa();
          },
          i: function (e) {
            d ? postMessage({ cmd: "cleanupThread", thread: e }) : we(e);
          },
          e: function (e, t, n, r) {
            var a;
            return "undefined" == typeof SharedArrayBuffer
              ? (m("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6)
              : ((a = []),
                d && 0 === a.length
                  ? tt(687865856, e, t, n, r)
                  : ((e = { Ka: n, qa: e, fa: r, Pa: a }), d ? ((e.Qa = "spawnThread"), postMessage(e, a), 0) : xe(e)));
          },
          g: ke,
          v: Ee,
          u: De,
          w: Ie,
          B: function () {
            return 2097152;
          },
          m: function (e, t) {
            if (e == t) postMessage({ cmd: "processQueuedMainThreadWork" });
            else if (d) postMessage({ targetThread: e, cmd: "processThreadQueue" });
            else {
              if (!(e = (e = E.aa[e]) && e.worker)) return;
              e.postMessage({ cmd: "processThreadQueue" });
            }
            return 1;
          },
          b: function () {
            A("");
          },
          x: function (e, t) {
            if (0 === e) e = Date.now();
            else {
              if (1 !== e && 4 !== e) return (h()[Ze() >> 2] = 28), -1;
              e = Se();
            }
            return (h()[t >> 2] = (e / 1e3) | 0), (h()[(t + 4) >> 2] = ((e % 1e3) * 1e6) | 0), 0;
          },
          h: function () {
            u ||
              o ||
              (G = G || {})[
                "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
              ] ||
              ((G[
                "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
              ] = 1),
              m(
                "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
              ));
          },
          c: Se,
          A: function (e, t, n) {
            l().copyWithin(e, t, t + n);
          },
          C: function (e, t, n) {
            (Re.length = t), (n >>= 3);
            for (var r = 0; r < t; r++) Re[r] = P()[n + r];
            return (e < 0 ? ge[-e - 1] : Qe[e]).apply(null, Re);
          },
          z: function (e) {
            var t = l().length;
            if (!((e >>>= 0) <= t || 2147483648 < e))
              for (var n = 1; n <= 4; n *= 2) {
                var r = t * (1 + 0.2 / n),
                  r = Math.min(r, e + 100663296),
                  a = Math;
                (r = Math.max(e, r)), (a = a.min.call(a, 2147483648, r + ((65536 - (r % 65536)) % 65536)));
                e: {
                  try {
                    _.grow((a - g.byteLength + 65535) >>> 16), v(_.buffer);
                    var o = 1;
                    break e;
                  } catch (e) {}
                  o = void 0;
                }
                if (o) return !0;
              }
            return !1;
          },
          j: function (e, t, n) {
            return (Te(e) ? Ce : je)(e, t, n);
          },
          n: function () {
            throw "unwind";
          },
          k: function (e, t) {
            t >>= 2;
            var n = h()[t + 6];
            return (
              (t = {
                alpha: !!h()[t],
                depth: !!h()[t + 1],
                stencil: !!h()[t + 2],
                antialias: !!h()[t + 3],
                premultipliedAlpha: !!h()[t + 4],
                preserveDrawingBuffer: !!h()[t + 5],
                powerPreference: We[n],
                failIfMajorPerformanceCaveat: !!h()[t + 7],
                Ga: h()[t + 8],
                Ya: h()[t + 9],
                ua: h()[t + 10],
                Aa: h()[t + 11],
                $a: h()[t + 12],
                ab: h()[t + 13]
              }),
              !(e = Te(e)) || t.Aa ? 0 : qe(e, t)
            );
          },
          r: Ue,
          s: Ye,
          d: function (e) {
            pt(e);
          },
          f: He,
          t: Ne,
          o: Ve,
          y: Ge,
          a: _ || c.wasmMemory,
          q: Xe
        },
        Ke =
          (!(function () {
            function t(e, t) {
              (c.asm = e.exports),
                E.ma.push(c.asm.I),
                (ue = c.asm.W),
                fe.unshift(c.asm.D),
                (Q = t),
                d ||
                  (S--,
                  c.monitorRunDependencies && c.monitorRunDependencies(S),
                  0 == S && (null !== me && (clearInterval(me), (me = null)), M) && ((e = M), (M = null), e()));
            }
            function n(e) {
              t(e.instance, e.module);
            }
            function r(e) {
              return (
                f || (!N && !o) || "function" != typeof fetch
                  ? Promise.resolve().then(_e)
                  : fetch(x, { credentials: "same-origin" })
                      .then(function (e) {
                        if (e.ok) return e.arrayBuffer();
                        throw "failed to load wasm binary file at '" + x + "'";
                      })
                      .catch(_e)
              )
                .then(function (e) {
                  return WebAssembly.instantiate(e, a);
                })
                .then(function (e) {
                  return e;
                })
                .then(e, function (e) {
                  m("failed to asynchronously prepare wasm: " + e), A(e);
                });
            }
            var a = { a: Je };
            if ((d || (S++, c.monitorRunDependencies && c.monitorRunDependencies(S)), c.instantiateWasm))
              try {
                return c.instantiateWasm(a, t);
              } catch (e) {
                return m("Module.instantiateWasm callback failed with error: " + e);
              }
            (f || "function" != typeof WebAssembly.instantiateStreaming || he() || "function" != typeof fetch
              ? r(n)
              : fetch(x, { credentials: "same-origin" }).then(function (e) {
                  return WebAssembly.instantiateStreaming(e, a).then(n, function (e) {
                    return (
                      m("wasm streaming compile failed: " + e), m("falling back to ArrayBuffer instantiation"), r(n)
                    );
                  });
                })
            ).catch(W);
          })(),
          (c.___wasm_call_ctors = function () {
            return (c.___wasm_call_ctors = c.asm.D).apply(null, arguments);
          }),
          (c._main = function () {
            return (Ke = c._main = c.asm.E).apply(null, arguments);
          })),
        Ze =
          ((c._command = function () {
            return (c._command = c.asm.F).apply(null, arguments);
          }),
          (c._isReady = function () {
            return (c._isReady = c.asm.G).apply(null, arguments);
          }),
          (c._free = function () {
            return (c._free = c.asm.H).apply(null, arguments);
          }),
          (c._emscripten_tls_init = function () {
            return (c._emscripten_tls_init = c.asm.I).apply(null, arguments);
          }),
          (c.___errno_location = function () {
            return (Ze = c.___errno_location = c.asm.J).apply(null, arguments);
          })),
        et =
          ((c.__emscripten_thread_crashed = function () {
            return (c.__emscripten_thread_crashed = c.asm.K).apply(null, arguments);
          }),
          (c._emscripten_proxy_main = function () {
            return (c._emscripten_proxy_main = c.asm.L).apply(null, arguments);
          }),
          (c.__emscripten_thread_init = function () {
            return (et = c.__emscripten_thread_init = c.asm.M).apply(null, arguments);
          })),
        tt =
          ((c._emscripten_current_thread_process_queued_calls = function () {
            return (c._emscripten_current_thread_process_queued_calls = c.asm.N).apply(null, arguments);
          }),
          (c._emscripten_sync_run_in_main_thread_4 = function () {
            return (tt = c._emscripten_sync_run_in_main_thread_4 = c.asm.O).apply(null, arguments);
          })),
        nt = (c._emscripten_main_thread_process_queued_calls = function () {
          return (nt = c._emscripten_main_thread_process_queued_calls = c.asm.P).apply(null, arguments);
        }),
        rt = (c._emscripten_run_in_main_runtime_thread_js = function () {
          return (rt = c._emscripten_run_in_main_runtime_thread_js = c.asm.Q).apply(null, arguments);
        }),
        at = (c._emscripten_dispatch_to_thread_ = function () {
          return (at = c._emscripten_dispatch_to_thread_ = c.asm.R).apply(null, arguments);
        }),
        ot = (c.__emscripten_thread_free_data = function () {
          return (ot = c.__emscripten_thread_free_data = c.asm.S).apply(null, arguments);
        }),
        it =
          ((c.__emscripten_thread_exit = function () {
            return (c.__emscripten_thread_exit = c.asm.T).apply(null, arguments);
          }),
          (c._pthread_self = function () {
            return (it = c._pthread_self = c.asm.U).apply(null, arguments);
          })),
        st = (c._malloc = function () {
          return (st = c._malloc = c.asm.V).apply(null, arguments);
        }),
        ut = (c._emscripten_stack_set_limits = function () {
          return (ut = c._emscripten_stack_set_limits = c.asm.X).apply(null, arguments);
        }),
        ct = (c.stackSave = function () {
          return (ct = c.stackSave = c.asm.Y).apply(null, arguments);
        }),
        ft = (c.stackRestore = function () {
          return (ft = c.stackRestore = c.asm.Z).apply(null, arguments);
        }),
        j = (c.stackAlloc = function () {
          return (j = c.stackAlloc = c.asm._).apply(null, arguments);
        }),
        lt = (c.__emscripten_allow_main_runtime_queued_calls = 6652224);
      function q(e) {
        (this.name = "ExitStatus"), (this.message = "Program terminated with exit(" + e + ")"), (this.status = e);
      }
      function dt(o) {
        function e() {
          if (!ze && ((ze = !0), (c.calledRun = !0), !J)) {
            if ((d || k(fe), d || k(le), F(c), c.onRuntimeInitialized && c.onRuntimeInitialized(), mt)) {
              var e = o,
                t = c._emscripten_proxy_main,
                n = (e = e || []).length + 1,
                r = j(4 * (n + 1));
              h()[r >> 2] = ie(s);
              for (var a = 1; a < n; a++) h()[(r >> 2) + a] = ie(e[a - 1]);
              (h()[(r >> 2) + n] = 0), t(n, r);
            }
            if (!d) {
              if (c.postRun)
                for ("function" == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length; )
                  (e = c.postRun.shift()), de.unshift(e);
              k(de);
            }
          }
        }
        if (((o = o || H), !(0 < S)))
          if (d) F(c), d || k(fe), postMessage({ cmd: "loaded" });
          else {
            if (c.preRun)
              for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length; )
                (t = void 0), (t = c.preRun.shift()), ce.unshift(t);
            k(ce),
              0 < S ||
                (c.setStatus
                  ? (c.setStatus("Running..."),
                    setTimeout(function () {
                      setTimeout(function () {
                        c.setStatus("");
                      }, 1),
                        e();
                    }, 1))
                  : e());
          }
        var t;
      }
      function pt(e) {
        if (d) throw (ve(e), "unwind");
        b() || d || E.ra(), b() || (E.ra(), c.onExit && c.onExit(e), (J = !0)), r(e, new q(e));
      }
      if (
        ((c.ccall = function (e, t, n, r) {
          var a = {
              string: function (e) {
                var t,
                  n,
                  r = 0;
                return null != e && 0 !== e && ((t = 1 + (e.length << 2)), (n = r = j(t)), w(e, l(), n, t)), r;
              },
              array: function (e) {
                var t = j(e.length);
                return se(e, t), t;
              }
            },
            o = ((e = c["_" + e]), []),
            i = 0;
          if (r)
            for (var s = 0; s < r.length; s++) {
              var u = a[n[s]];
              u ? (0 === i && (i = ct()), (o[s] = u(r[s]))) : (o[s] = r[s]);
            }
          return (n = e.apply(null, o)), (e = n), 0 !== i && ft(i), "string" === t ? y(e) : "boolean" === t ? !!e : e;
        }),
        (c.keepRuntimeAlive = b),
        (c.PThread = E),
        (c.PThread = E),
        (c.wasmMemory = _),
        (c.ExitStatus = q),
        (M = function e() {
          ze || dt(), ze || (M = e);
        }),
        (c.run = dt),
        c.preInit)
      )
        for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length; ) c.preInit.pop()();
      var mt = !0;
      return c.noInitialRun && (mt = !1), dt(), e.ready;
    }
    var ht;
    (ht = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0),
      "undefined" != typeof __filename && (ht = ht || __filename);
    return (
      "object" == typeof exports && "object" == typeof module
        ? (module.exports = e)
        : "function" == typeof define && define.amd
          ? define([], function () {
              return e;
            })
          : "object" == typeof exports && (exports.Stockfish = e),
      e
    );
  }
  function t(n) {
    var e,
      r = 0,
      a = [],
      t = s.slice(1 + ((s.lastIndexOf(".") - 1) >>> 0)),
      o = s.slice(0, -t.length);
    for (e = 0; e < n; ++e)
      !(function (e, t) {
        fetch(new Request(e))
          .then(function (e) {
            return e.blob();
          })
          .then(function (e) {
            t(e);
          });
      })(
        o + "-part-" + e + t,
        (function (t) {
          return function (e) {
            ++r, (a[t] = e), r === n && ((e = URL.createObjectURL(new Blob(a))), u(e));
          };
        })(e)
      );
  }
  ("undefined" != typeof self && "worker" === self.location.hash.split(",")[1]) ||
  ("undefined" != typeof global &&
    "[object process]" === Object.prototype.toString.call(global.process) &&
    !require("worker_threads").isMainThread)
    ? (function () {
        "use strict";
        var e,
          t,
          n,
          r = {},
          a =
            "object" == typeof process &&
            "object" == typeof process.versions &&
            "string" == typeof process.versions.node;
        a &&
          ((e = require("worker_threads")),
          (t = e.parentPort).on("message", function (e) {
            onmessage({ data: e });
          }),
          (n = require("fs")),
          Object.assign(global, {
            self: global,
            require: require,
            Module: r,
            location: { href: __filename },
            Worker: e.Worker,
            importScripts: function (e) {
              (0, eval)(n.readFileSync(e, "utf8"));
            },
            postMessage: function (e) {
              t.postMessage(e);
            },
            performance: global.performance || {
              now: function () {
                return Date.now();
              }
            }
          }));
        var o = function () {
          var e = Array.prototype.slice.call(arguments).join(" ");
          a ? n.writeSync(2, e + "\n") : console.error(e);
        };
        (self.alert = function () {
          var e = Array.prototype.slice.call(arguments).join(" ");
          postMessage({ cmd: "alert", text: e, threadId: r._pthread_self() });
        }),
          (r.instantiateWasm = (e, t) => {
            e = new WebAssembly.Instance(r.wasmModule, e);
            return t(e), (r.wasmModule = null), e.exports;
          }),
          (self.onmessage = (e) => {
            try {
              var t;
              if ("load" === e.data.cmd)
                (r.wasmModule = e.data.wasmModule),
                  (r.wasmMemory = e.data.wasmMemory),
                  (r.buffer = r.wasmMemory.buffer),
                  (r.ENVIRONMENT_IS_PTHREAD = !0),
                  "string" == typeof e.data.urlOrBlob
                    ? importScripts(e.data.urlOrBlob)
                    : ((t = URL.createObjectURL(e.data.urlOrBlob)), importScripts(t), URL.revokeObjectURL(t)),
                  i(r).then(function (e) {
                    r = e;
                  });
              else if ("run" === e.data.cmd) {
                (r.__performance_now_clock_drift = performance.now() - e.data.time),
                  r.__emscripten_thread_init(e.data.threadInfoStruct, 0, 0, 1),
                  r.establishStackSpace(),
                  r.PThread.receiveObjectTransfer(e.data),
                  r.PThread.threadInit();
                try {
                  var n = r.invokeEntryPoint(e.data.start_routine, e.data.arg);
                  r.keepRuntimeAlive() ? r.PThread.setExitStatus(n) : r.__emscripten_thread_exit(n);
                } catch (e) {
                  if ("unwind" != e) {
                    if (!(e instanceof r.ExitStatus)) throw e;
                    r.keepRuntimeAlive() || r.__emscripten_thread_exit(e.status);
                  }
                }
              } else
                "cancel" === e.data.cmd
                  ? r._pthread_self() && r.__emscripten_thread_exit(-1)
                  : "setimmediate" !== e.data.target &&
                    ("processThreadQueue" === e.data.cmd
                      ? r._pthread_self() && r._emscripten_current_thread_process_queued_calls()
                      : "processProxyingQueue" === e.data.cmd
                        ? r._pthread_self() && r._emscripten_proxy_execute_queue(e.data.queue)
                        : (o("worker.js received unknown command " + e.data.cmd), o(e.data)));
            } catch (e) {
              throw (
                (o("worker.js onmessage() captured an uncaught exception: " + e),
                e && e.stack && o(e.stack),
                r.__emscripten_thread_crashed && r.__emscripten_thread_crashed(),
                e)
              );
            }
          }),
          (self._origOnmessage = self.onmessage),
          (self.onmessage = function (e) {
            "load" === e.data.cmd
              ? ((r.wasmModule = e.data.wasmModule),
                (r.wasmMemory = e.data.wasmMemory),
                (r.buffer = r.wasmMemory.buffer),
                (r.ENVIRONMENT_IS_PTHREAD = !0),
                e.data.workerID && (r.workerID = e.data.workerID),
                e.data.wasmSourceMap && (r.wasmSourceMapData = e.data.wasmSourceMap),
                e.data.wasmOffsetConverter && (r.wasmOffsetData = e.data.wasmOffsetConverter),
                (i = f())(r).then(function (e) {
                  r = e;
                }))
              : self._origOnmessage(e);
          });
      })()
    : ("undefined" != typeof onmessage && ("undefined" == typeof window || void 0 === window.document)) ||
        ("undefined" != typeof global && "[object process]" === Object.prototype.toString.call(global.process))
      ? ((e = "undefined" != typeof global && "[object process]" === Object.prototype.toString.call(global.process)),
        (n = {}),
        (r = []),
        e
          ? require.main === module
            ? ((c = require("path")),
              (s = c.join(__dirname, c.basename(__filename, c.extname(__filename)) + ".wasm")),
              (n = {
                locateFile: function (e) {
                  return -1 < e.indexOf(".wasm") ? (-1 < e.indexOf(".wasm.map") ? s + ".map" : s) : __filename;
                },
                listener: function (e) {
                  process.stdout.write(e + "\n");
                }
              }),
              "number" == typeof enginePartsCount &&
                (n.wasmBinary = (function (e) {
                  for (var t = require("fs"), n = c.extname(s), r = s.slice(0, -n.length), a = [], o = 0; o < e; ++o)
                    a.push(t.readFileSync(r + "-part-" + o + ".wasm"));
                  return Buffer.concat(a);
                })(enginePartsCount)),
              (i = f())(n).then(function e() {
                if (n._isReady) {
                  if (!n._isReady()) return setTimeout(e, 10);
                  delete n._isReady;
                }
                (n.sendCommand = function (e) {
                  n.ccall("command", null, ["string"], [e], {
                    async: "undefined" != typeof IS_ASYNCIFY && /^go\b/.test(e)
                  });
                }),
                  r.forEach(n.sendCommand),
                  (r = null);
              }),
              require("readline")
                .createInterface({
                  input: process.stdin,
                  output: process.stdout,
                  completer: function (t) {
                    var e = [
                      "binc ",
                      "btime ",
                      "confidence ",
                      "depth ",
                      "infinite ",
                      "mate ",
                      "maxdepth ",
                      "maxtime ",
                      "mindepth ",
                      "mintime ",
                      "moves ",
                      "movestogo ",
                      "movetime ",
                      "ponder ",
                      "searchmoves ",
                      "shallow ",
                      "winc ",
                      "wtime "
                    ];
                    function n(e) {
                      return 0 === e.indexOf(t);
                    }
                    var r = [
                      "compiler",
                      "d",
                      "eval",
                      "exit",
                      "flip",
                      "go ",
                      "isready ",
                      "ponderhit ",
                      "position fen ",
                      "position startpos",
                      "position startpos moves",
                      "quit",
                      "setoption name Clear Hash value true",
                      "setoption name Contempt value ",
                      "setoption name Hash value ",
                      "setoption name Minimum Thinking Time value ",
                      "setoption name Move Overhead value ",
                      "setoption name MultiPV value ",
                      "setoption name Ponder value ",
                      "setoption name Skill Level value ",
                      "setoption name Slow Mover value ",
                      "setoption name Threads value ",
                      "setoption name UCI_Chess960 value false",
                      "setoption name UCI_Chess960 value true",
                      "setoption name UCI_LimitStrength value true",
                      "setoption name UCI_LimitStrength value false",
                      "setoption name UCI_Elo value ",
                      "setoption name UCI_ShowWDL value true",
                      "setoption name UCI_ShowWDL value false",
                      "setoption name nodestime value ",
                      "stop",
                      "uci",
                      "ucinewgame"
                    ].filter(n);
                    return [(r = r.length ? r : (t = t.replace(/^.*\s/, "")) ? e.filter(n) : e), t];
                  },
                  historySize: 100
                })
                .on("line", function (e) {
                  e && (n.sendCommand ? n.sendCommand(e) : r.push(e), ("quit" !== e && "exit" !== e) || process.exit());
                })
                .on("close", function () {
                  process.exit();
                })
                .setPrompt(""))
            : (module.exports = f)
          : ((e = self.location.hash.substr(1).split(",")),
            (s = decodeURIComponent(e[0] || location.origin + location.pathname.replace(/\.js$/i, ".wasm"))),
            (u = function (t) {
              (n = {
                locateFile: function (e) {
                  return -1 < e.indexOf(".wasm")
                    ? -1 < e.indexOf(".wasm.map")
                      ? s + ".map"
                      : t || s
                    : self.location.origin + self.location.pathname + "#" + s + ",worker";
                },
                listener: function (e) {
                  postMessage(e);
                }
              }),
                (i = f())(n)
                  .then(function e() {
                    if (n._isReady) {
                      if (!n._isReady()) return setTimeout(e, 10);
                      delete n._isReady;
                    }
                    (n.sendCommand = function (e) {
                      if (
                        (n.ccall("command", null, ["string"], [e], {
                          async: "undefined" != typeof IS_ASYNCIFY && /^go\b/.test(e)
                        }),
                        "quit" === e || "exit" === e)
                      )
                        try {
                          n.terminate();
                        } catch (e) {}
                    }),
                      r.forEach(n.sendCommand),
                      (r = null);
                  })
                  .catch(function (e) {
                    setTimeout(function () {
                      throw e;
                    }, 1);
                  });
            }),
            "number" == typeof enginePartsCount ? t(enginePartsCount) : u(),
            (onmessage =
              onmessage ||
              function (e) {
                if ((n.sendCommand ? n.sendCommand(e.data) : r.push(e.data), "quit" === e.data || "exit" === e.data))
                  try {
                    self.close();
                  } catch (e) {}
              })))
      : "object" == typeof document && document.currentScript
        ? (document.currentScript._exports = f())
        : (i = f());
})();
