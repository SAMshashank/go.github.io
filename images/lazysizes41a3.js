! function(t, e) {
    var a = function(t, e, a) {
        "use strict";
        var n, i;
        if (function() {
                var e, a = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    fastLoadedClass: "ls-is-cached",
                    iframeLoadMode: 0,
                    srcAttr: "data-orig-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 0,
                    throttleDelay: 125
                };
                for (e in i = t.lazySizesConfig || t.lazysizesConfig || {}, a) e in i || (i[e] = a[e])
            }(), !e || !e.getElementsByClassName) return {
            init: function() {},
            cfg: i,
            noSupport: !0
        };
        var r = e.documentElement,
            s = t.HTMLPictureElement,
            o = t.addEventListener.bind(t),
            l = t.setTimeout,
            d = t.requestAnimationFrame || l,
            u = t.requestIdleCallback,
            c = /^picture$/i,
            f = ["load", "error", "lazyincluded", "_lazyloaded"],
            g = {},
            m = Array.prototype.forEach,
            v = function(t, e) {
                return g[e] || (g[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), g[e].test(t.getAttribute("class") || "") && g[e]
            },
            y = function(t, e) {
                v(t, e) || t.setAttribute("class", (t.getAttribute("class") || "").trim() + " " + e)
            },
            z = function(t, e) {
                var a;
                (a = v(t, e)) && t.setAttribute("class", (t.getAttribute("class") || "").replace(a, " "))
            },
            h = function(t, e, a) {
                var n = a ? "addEventListener" : "removeEventListener";
                a && h(t, e), f.forEach(function(a) {
                    t[n](a, e)
                })
            },
            b = function(t, a, i, r, s) {
                var o = e.createEvent("Event");
                return i || (i = {}), i.instance = n, o.initEvent(a, !r, !s), o.detail = i, t.dispatchEvent(o), o
            },
            p = function(e, a) {
                var n;
                !s && (n = t.picturefill || i.pf) ? (a && a.src && !e.getAttribute("srcset") && e.setAttribute("srcset", a.src), n({
                    reevaluate: !0,
                    elements: [e]
                })) : a && a.src && (e.src = a.src)
            },
            A = function(t, e) {
                return (getComputedStyle(t, null) || {})[e]
            },
            C = function(t, e, a) {
                for (a = a || t.offsetWidth; a < i.minSize && e && !t._lazysizesWidth;) a = e.offsetWidth, e = e.parentNode;
                return a
            },
            E = (R = [], k = [], D = R, H = function() {
                var t = D;
                for (D = R.length ? k : R, T = !0, F = !1; t.length;) t.shift()();
                T = !1
            }, I = function(t, a) {
                T && !a ? t.apply(this, arguments) : (D.push(t), F || (F = !0, (e.hidden ? l : d)(H)))
            }, I._lsFlush = H, I),
            _ = function(t, e) {
                return e ? function() {
                    E(t)
                } : function() {
                    var e = this,
                        a = arguments;
                    E(function() {
                        t.apply(e, a)
                    })
                }
            },
            L = function(t) {
                var e, n, i = function() {
                        e = null, t()
                    },
                    r = function() {
                        var t = a.now() - n;
                        t < 99 ? l(r, 99 - t) : (u || i)(i)
                    };
                return function() {
                    n = a.now(), e || (e = l(r, 99))
                }
            },
            w = function() {
                var s, f, g, C, w, N, x, W, S, B, T, F, R, k, D, H, I, O, P, $ = /^img$/i,
                    q = /^iframe$/i,
                    U = "onscroll" in t && !/(gle|ing)bot/.test(navigator.userAgent),
                    j = 0,
                    G = 0,
                    J = -1,
                    K = function(t) {
                        G--, (!t || G < 0 || !t.target) && (G = 0)
                    },
                    Q = function(t) {
                        return null == F && (F = "hidden" == A(e.body, "visibility")), F || !("hidden" == A(t.parentNode, "visibility") && "hidden" == A(t, "visibility"))
                    },
                    V = function(t, a) {
                        var n, i = t,
                            s = Q(t);
                        for (W -= a, T += a, S -= a, B += a; s && (i = i.offsetParent) && i != e.body && i != r;)(s = (A(i, "opacity") || 1) > 0) && "visible" != A(i, "overflow") && (n = i.getBoundingClientRect(), s = B > n.left && S < n.right && T > n.top - 1 && W < n.bottom + 1);
                        return s
                    },
                    X = function() {
                        var t, a, o, l, d, u, c, g, m, v, y, z, h = n.elements;
                        if ((C = i.loadMode) && G < 8 && (t = h.length)) {
                            for (a = 0, J++; a < t; a++)
                                if (h[a] && !h[a]._lazyRace)
                                    if (!U || n.prematureUnveil && n.prematureUnveil(h[a])) it(h[a]);
                                    else if ((g = h[a].getAttribute("data-expand")) && (u = 1 * g) || (u = j), v || (v = !i.expand || i.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : i.expand, n._defEx = v, y = v * i.expFactor, z = i.hFac, F = null, j < y && G < 1 && J > 2 && C > 2 && !e.hidden ? (j = y, J = 0) : j = C > 1 && J > 1 && G < 6 ? v : 0), m !== u && (N = innerWidth + u * z, x = innerHeight + u, c = -1 * u, m = u), o = h[a].getBoundingClientRect(), (T = o.bottom) >= c && (W = o.top) <= x && (B = o.right) >= c * z && (S = o.left) <= N && (T || B || S || W) && (i.loadHidden || Q(h[a])) && (f && G < 3 && !g && (C < 3 || J < 4) || V(h[a], u))) {
                                if (it(h[a]), d = !0, G > 9) break
                            } else !d && f && !l && G < 4 && J < 4 && C > 2 && (s[0] || i.preloadAfterLoad) && (s[0] || !g && (T || B || S || W || "auto" != h[a].getAttribute(i.sizesAttr))) && (l = s[0] || h[a]);
                            l && !d && it(l)
                        }
                    },
                    Y = (R = X, D = 0, H = i.throttleDelay, I = i.ricTimeout, O = function() {
                        k = !1, D = a.now(), R()
                    }, P = u && I > 49 ? function() {
                        u(O, {
                            timeout: I
                        }), I !== i.ricTimeout && (I = i.ricTimeout)
                    } : _(function() {
                        l(O)
                    }, !0), function(t) {
                        var e;
                        (t = !0 === t) && (I = 33), k || (k = !0, (e = H - (a.now() - D)) < 0 && (e = 0), t || e < 9 ? P() : l(P, e))
                    }),
                    Z = function(t) {
                        var e = t.target;
                        e._lazyCache ? delete e._lazyCache : (K(t), y(e, i.loadedClass), z(e, i.loadingClass), h(e, et), b(e, "lazyloaded"))
                    },
                    tt = _(Z),
                    et = function(t) {
                        tt({
                            target: t.target
                        })
                    },
                    at = function(t) {
                        var e, a = t.getAttribute(i.srcsetAttr);
                        (e = i.customMedia[t.getAttribute("data-media") || t.getAttribute("media")]) && t.setAttribute("media", e), a && t.setAttribute("srcset", a)
                    },
                    nt = _(function(t, e, a, n, r) {
                        var s, o, d, u, f, v;
                        (f = b(t, "lazybeforeunveil", e)).defaultPrevented || (n && (a ? y(t, i.autosizesClass) : t.setAttribute("sizes", n)), o = t.getAttribute(i.srcsetAttr), s = t.getAttribute(i.srcAttr), r && (d = t.parentNode, u = d && c.test(d.nodeName || "")), v = e.firesLoad || "src" in t && (o || s || u), f = {
                            target: t
                        }, y(t, i.loadingClass), v && (clearTimeout(g), g = l(K, 2500), h(t, et, !0)), u && m.call(d.getElementsByTagName("source"), at), o ? t.setAttribute("srcset", o) : s && !u && (q.test(t.nodeName) ? function(t, e) {
                            var a = t.getAttribute("data-load-mode") || i.iframeLoadMode;
                            0 == a ? t.contentWindow.location.replace(e) : 1 == a && (t.src = e)
                        }(t, s) : t.src = s), r && (o || u) && p(t, {
                            src: s
                        })), t._lazyRace && delete t._lazyRace, z(t, i.lazyClass), E(function() {
                            var e = t.complete && t.naturalWidth > 1;
                            v && !e || (e && y(t, i.fastLoadedClass), Z(f), t._lazyCache = !0, l(function() {
                                "_lazyCache" in t && delete t._lazyCache
                            }, 9)), "lazy" == t.loading && G--
                        }, !0)
                    }),
                    it = function(t) {
                        if (!t._lazyRace) {
                            var e, a = $.test(t.nodeName),
                                n = a && (t.getAttribute(i.sizesAttr) || t.getAttribute("sizes")),
                                r = "auto" == n;
                            (!r && f || !a || !t.getAttribute("src") && !t.srcset || t.complete || v(t, i.errorClass) || !v(t, i.lazyClass)) && (e = b(t, "lazyunveilread").detail, r && M.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, G++, nt(t, e, r, n, a))
                        }
                    },
                    rt = L(function() {
                        i.loadMode = 3, Y()
                    }),
                    st = function() {
                        3 == i.loadMode && (i.loadMode = 2), rt()
                    },
                    ot = function() {
                        f || (a.now() - w < 999 ? l(ot, 999) : (f = !0, i.loadMode = 3, Y(), o("scroll", st, !0)))
                    };
                return {
                    _: function() {
                        w = a.now(), n.elements = e.getElementsByClassName(i.lazyClass), s = e.getElementsByClassName(i.lazyClass + " " + i.preloadClass), o("scroll", Y, !0), o("resize", Y, !0), o("pageshow", function(t) {
                            if (t.persisted) {
                                var a = e.querySelectorAll("." + i.loadingClass);
                                a.length && a.forEach && d(function() {
                                    a.forEach(function(t) {
                                        t.complete && it(t)
                                    })
                                })
                            }
                        }), t.MutationObserver ? new MutationObserver(Y).observe(r, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (r.addEventListener("DOMNodeInserted", Y, !0), r.addEventListener("DOMAttrModified", Y, !0), setInterval(Y, 999)), o("hashchange", Y, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(t) {
                            e.addEventListener(t, Y, !0)
                        }), /d$|^c/.test(e.readyState) ? ot() : (o("load", ot), e.addEventListener("DOMContentLoaded", Y), l(ot, 2e4)), n.elements.length ? (X(), E._lsFlush()) : Y()
                    },
                    checkElems: Y,
                    unveil: it,
                    _aLSL: st
                }
            }(),
            M = (W = _(function(t, e, a, n) {
                var i, r, s;
                if (t._lazysizesWidth = n, n += "px", t.setAttribute("sizes", n), c.test(e.nodeName || ""))
                    for (i = e.getElementsByTagName("source"), r = 0, s = i.length; r < s; r++) i[r].setAttribute("sizes", n);
                a.detail.dataAttr || p(t, a.detail)
            }), S = function(t, e, a) {
                var n, i = t.parentNode;
                i && (a = C(t, i, a), (n = b(t, "lazybeforesizes", {
                    width: a,
                    dataAttr: !!e
                })).defaultPrevented || (a = n.detail.width) && a !== t._lazysizesWidth && W(t, i, n, a))
            }, B = L(function() {
                var t, e = x.length;
                if (e)
                    for (t = 0; t < e; t++) S(x[t])
            }), {
                _: function() {
                    x = e.getElementsByClassName(i.autosizesClass), o("resize", B)
                },
                checkElems: B,
                updateElem: S
            }),
            N = function() {
                !N.i && e.getElementsByClassName && (N.i = !0, M._(), w._())
            };
        var x, W, S, B;
        var T, F, R, k, D, H, I;
        return l(function() {
            i.init && N()
        }), n = {
            cfg: i,
            autoSizer: M,
            loader: w,
            init: N,
            uP: p,
            aC: y,
            rC: z,
            hC: v,
            fire: b,
            gW: C,
            rAF: E
        }
    }(t, t.document, Date);
    t.lazySizes = a, "object" == typeof module && module.exports && (module.exports = a)
}("undefined" != typeof window ? window : {}), document.addEventListener("lazybeforeunveil", function(t) {
    var e = t.target.getAttribute("data-bg"),
        a = t.target.getAttribute("data-bg-gradient");
    a && e ? t.target.style.backgroundImage = a + ",url(" + e + ")" : e && (t.target.style.backgroundImage = "url(" + e + ")")
});