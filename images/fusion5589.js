var fusion = {
    fusionResizeWidth: 0,
    fusionResizeHeight: 0,
    toBool: function(e) {
        return 1 === e || "1" === e || !0 === e || "true" === e || "on" === e
    },
    restArguments: function(e, t) {
        return t = null == t ? e.length - 1 : +t,
            function() {
                for (var n, i = Math.max(arguments.length - t, 0), o = Array(i), r = 0; r < i; r++) o[r] = arguments[r + t];
                switch (t) {
                    case 0:
                        return e.call(this, o);
                    case 1:
                        return e.call(this, arguments[0], o);
                    case 2:
                        return e.call(this, arguments[0], arguments[1], o)
                }
                for (n = Array(t + 1), r = 0; r < t; r++) n[r] = arguments[r];
                return n[t] = o, e.apply(this, n)
            }
    },
    debounce: function(e, t, n) {
        var i, o, r, s, u, a = this;
        return r = function(t, n) {
            i = null, n && (o = e.apply(t, n))
        }, (s = this.restArguments(function(s) {
            return i && clearTimeout(i), n ? (u = !i, i = setTimeout(r, t), u && (o = e.apply(this, s))) : i = a.delay(r, t, this, s), o
        })).cancel = function() {
            clearTimeout(i), i = null
        }, s
    },
    isSmall: function() {
        return Modernizr.mq("only screen and (max-width:" + fusionJSVars.visibility_small + "px)")
    },
    isMedium: function() {
        return Modernizr.mq("only screen and (min-width:" + (parseInt(fusionJSVars.visibility_small) + 1) + "px) and (max-width:" + parseInt(fusionJSVars.visibility_medium) + "px)")
    },
    isLarge: function() {
        return Modernizr.mq("only screen and (min-width:" + (parseFloat(fusionJSVars.visibility_medium) + 1) + "px)")
    },
    getHeight: function(e, t) {
        var n = 0;
        return "number" == typeof e ? n = e : "string" == typeof e && (e.includes(".") || e.includes("#")) ? (t = void 0 !== t && t, jQuery(e).each(function() {
            n += jQuery(this).outerHeight(t)
        })) : n = parseFloat(e), n
    },
    getAdminbarHeight: function() {
        var e = jQuery("#wpadminbar").length ? parseInt(jQuery("#wpadminbar").height()) : 0;
        return e += jQuery(".fusion-fixed-top").length ? parseInt(jQuery(".fusion-fixed-top").height()) : 0
    },
    isWindow: function(e) {
        return null != e && e === e.window
    },
    getObserverSegmentation: function(e) {
        var t = {};
        return e.each(function() {
            jQuery(this).data("animationoffset") || jQuery(this).attr("data-animationoffset", "top-into-view")
        }), t = {
            "top-into-view": e.filter('[data-animationoffset="top-into-view"]'),
            "top-mid-of-view": e.filter('[data-animationoffset="top-mid-of-view"]'),
            "bottom-in-view": e.filter('[data-animationoffset="bottom-in-view"]')
        }, jQuery.each(t, function(e, n) {
            n.length || delete t[e]
        }), 0 === Object.keys(t).length && (t["top-into-view"] = e), t
    },
    getAnimationIntersectionData: function(e) {
        var t = "",
            n = 0,
            i = "0px 0px 0px 0px";
        return "string" == typeof e ? t = e : void 0 !== e.data("animationoffset") && (t = e.data("animationoffset")), "top-mid-of-view" === t ? i = "0px 0px -50% 0px" : "bottom-in-view" === t && (n = [0, .2, .4, .6, .7, .8, .9, 1]), {
            root: null,
            rootMargin: i,
            threshold: n
        }
    },
    shouldObserverEntryAnimate: function(e, t) {
        var n = !1,
            i = 1;
        return 1 < t.thresholds.length ? e.boundingClientRect.height > e.rootBounds.height ? (i = e.rootBounds.height / e.boundingClientRect.height, t.thresholds.filter(function(t) {
            return t >= e.intersectionRatio && t <= i
        }).length || (n = !0)) : e.isIntersecting && 1 === e.intersectionRatio && (n = !0) : e.isIntersecting && (n = !0), n
    }
};
fusion.delay = fusion.restArguments(function(e, t, n) {
    return setTimeout(function() {
        return e.apply(null, n)
    }, t)
}), fusion.ready = function(e) {
    if ("function" == typeof e) return "complete" === document.readyState ? e() : void document.addEventListener("DOMContentLoaded", e, !1)
}, fusion.passiveSupported = function() {
    var e, t;
    if (void 0 === fusion.supportsPassive) {
        try {
            t = {
                get passive() {
                    e = !0
                }
            }, window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
        } catch (t) {
            e = !1
        }
        fusion.supportsPassive = !!e && {
            passive: !0
        }
    }
    return fusion.supportsPassive
}, fusion.getElements = function(e) {
    var t = [];
    return e ? ("object" == typeof e ? Object.keys(e).forEach(function(n) {
        Element.prototype.isPrototypeOf(e[n]) && t.push(e[n])
    }) : "string" == typeof e && (t = document.querySelectorAll(e), t = Array.prototype.slice.call(t)), t) : []
}, Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
    var t = this;
    do {
        if (t.matches(e)) return t;
        t = t.parentElement || t.parentNode
    } while (null !== t && 1 === t.nodeType);
    return null
}), jQuery(document).ready(function() {
    var e;
    void 0 === jQuery.migrateVersion && 2 < parseInt(jQuery.fn.jquery) && jQuery(window.document).triggerHandler("ready"), e = fusion.debounce(function() {
        fusion.fusionResizeWidth !== jQuery(window).width() && (window.dispatchEvent(new Event("fusion-resize-horizontal", {
            bubbles: !0,
            cancelable: !0
        })), fusion.fusionResizeWidth = jQuery(window).width()), fusion.fusionResizeHeight !== jQuery(window).height() && (jQuery(window).trigger("fusion-resize-vertical"), fusion.fusionResizeHeight = jQuery(window).height())
    }, 250), fusion.fusionResizeWidth = jQuery(window).width(), fusion.fusionResizeHeight = jQuery(window).height(), jQuery(window).on("resize", e)
});