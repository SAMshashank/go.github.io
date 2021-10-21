function _fusionRefreshScroll() {
    window._fusionScrollTop = window.pageYOffset, window._fusionScrollLeft = window.pageXOffset
}

function _fusionParallaxAll() {
    var t;
    for (_fusionRefreshScroll(), t = 0; t < window._fusionImageParallaxImages.length; t++) window._fusionImageParallaxImages[t].doParallax()
}

function _fusionRefreshWindow() {
    window._fusionScrollTop = window.pageYOffset, window._fusionWindowHeight = jQuery(window).height(), window._fusionScrollLeft = window.pageXOffset, window._fusionWindowWidth = jQuery(window).width()
}! function(t) {
    var i;
    i = 0, t.requestAnimationFrame || (t.webkitRequestAnimationFrame && (t.requestAnimationFrame = t.webkitRequestAnimationFrame, t.cancelAnimationFrame = t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame), t.requestAnimationFrame = function(e) {
        var s = (new Date).getTime(),
            n = Math.max(0, 16 - (s - i)),
            a = t.setTimeout(function() {
                e(s + n)
            }, n);
        return i = s + n, a
    }, t.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    }), "function" == typeof define && define(function() {
        return t.requestAnimationFrame
    })
}(window), void 0 === window._fusionImageParallaxImages && (window._fusionImageParallaxImages = []),
    function(t, i) {
        var e = "fusionImageParallax",
            s = {
                direction: "up",
                mobileenabled: !1,
                mobiledevice: !1,
                width: "",
                height: "",
                align: "center",
                opacity: "1",
                velocity: ".3",
                image: "",
                target: "",
                repeat: !1,
                loopScroll: "",
                loopScrollTime: "2",
                removeOrig: !1,
                complete: function() {}
            };

        function n(i, n) {
            var a;
            this.element = i, this.settings = t.extend({}, s, n), a = this.settings.align.split(" "), this.settings.xpos = a[0], 2 === a.length ? this.settings.ypos = a[1] : this.settings.ypos = "center", this._defaults = s, this._name = e, this.init()
        }
        t.extend(n.prototype, {
            init: function() {
                var e;
                "" === this.settings.target && (this.settings.target = t(this.element)), "" === this.settings.image && void 0 !== t(this.element).css("backgroundImage") && "" !== t(this.element).css("backgroundImage") && (this.settings.image = t(this.element).css("backgroundImage").replace(/url\(|\)|"|'/g, "")), e = i._fusionImageParallaxImages.push(this), jQuery(this.element).attr("data-parallax-index", e - 1), this.setup(), this.settings.complete(), this.containerWidth = 0, this.containerHeight = 0
            },
            setup: function() {
                !1 !== this.settings.removeOrig && t(this.element).remove(), this.resizeParallaxBackground()
            },
            doParallax: function() {
                var t, e, s, n, a, o, r, g, d = this.settings.target.find(".parallax-inner");
                this.settings.mobiledevice && !this.settings.mobileenabled || this.isInView() && (d.css({
                    minHeight: "150px"
                }), t = this.settings.target.width() + parseInt(this.settings.target.css("paddingRight"), 10) + parseInt(this.settings.target.css("paddingLeft"), 10), e = this.settings.target.height() + parseInt(this.settings.target.css("paddingTop"), 10) + parseInt(this.settings.target.css("paddingBottom"), 10), 0 === this.containerWidth || 0 === this.containerHeight || t === this.containerWidth && e === this.containerHeight || this.resizeParallaxBackground(), this.containerWidth = t, this.containerHeight = e, void 0 !== d && 0 !== d.length && (s = (i._fusionScrollTop - this.scrollTopMin) / (this.scrollTopMax - this.scrollTopMin), n = this.moveMax * s, "down" === this.settings.direction && (n *= 1.25), "left" !== this.settings.direction && "up" !== this.settings.direction || (n *= -1), a = "translate3d(", o = "px, -2px, 0px)", r = "translate3d(0, ", g = "px, 0)", jQuery("html").hasClass("ua-safari") && d.parent().find(".fusion-section-separator").length && (a = "translate(", o = "px, 0)", r = "translate(0, ", g = "px)"), "no-repeat" === d.css("background-repeat") && ("down" === this.settings.direction && 0 > n ? n = 0 : "up" === this.settings.direction && 0 < n ? n = 0 : "right" === this.settings.direction && 0 > n ? n = 0 : "left" === this.settings.direction && 0 < n && (n = 0)), "fixed" === this.settings.direction || ("left" === this.settings.direction || "right" === this.settings.direction ? d.css({
                    webkitTransform: a + n + o,
                    mozTransform: a + n + o,
                    msTransform: a + n + o,
                    oTransform: a + n + o,
                    transform: a + n + o
                }) : d.css({
                    webkitTransform: r + n + g,
                    mozTransform: r + n + g,
                    msTransform: r + n + g,
                    oTransform: r + n + g,
                    transform: r + n + g
                }))))
            },
            isInView: function() {
                var t, e = this.settings.target;
                if (void 0 !== e && 0 !== e.length) return !((t = e.offset().top) + (e.height() + parseInt(e.css("paddingTop"), 10) + parseInt(e.css("paddingBottom"), 10)) < i._fusionScrollTop || i._fusionScrollTop + i._fusionWindowHeight < t)
            },
            setBackgroundStyling: function(t, i) {
                var e = "none" === this.settings.blendMode ? "" : this.settings.blendMode,
                    s = this.settings.backgroundColor;
                t.find(".parallax-inner").css({
                    "background-color": s,
                    "background-blend-mode": e
                }), "" !== i && t.find(".parallax-inner").css({
                    "background-image": i
                })
            },
            resizeParallaxBackground: function() {
                var t, e, s, n, a, o, r, g, d, l, h, c, u = this.settings.target,
                    p = "";
                void 0 !== u && 0 !== u.length && u.is(":visible") && (c = u.hasClass("lazyload"), t = "true" === this.settings.repeat || !0 === this.settings.repeat || 1 === this.settings.repeat, "" === this.settings.gradientStartColor && "" === this.settings.gradientStartPosition || ("linear" === this.settings.gradientType ? p += "linear-gradient(" + this.settings.gradientAngle + "deg, " : "radial" === this.settings.gradientType && (p += "radial-gradient(circle at " + this.settings.gradientRadialDirection + ", "), p += this.settings.gradientStartColor + " " + this.settings.gradientStartPosition + "%,", p += this.settings.gradientEndColor + " " + this.settings.gradientEndPosition + "%)", "" !== this.settings.image && "none" !== this.settings.image && (p += ",url('" + this.settings.image + "')")), "none" === this.settings.direction ? (e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), n = u.offset().left, "center" === this.settings.align ? n = "50% 50%" : "left" === this.settings.align ? n = "0% 50%" : "right" === this.settings.align ? n = "100% 50%" : "top" === this.settings.align ? n = "50% 0%" : "bottom" === this.settings.align && (n = "50% 100%"), u.css({
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundSize: "cover",
                    backgroundAttachment: "scroll",
                    backgroundPosition: n,
                    backgroundRepeat: "no-repeat"
                }), "" !== this.settings.image && "none" !== this.settings.image && u.css({
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundImage: c ? "" : "url(" + this.settings.image + ")"
                })) : "fixed" === this.settings.direction ? (u.css({
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "repeat"
                }), "" !== this.settings.image && "none" !== this.settings.image && u.attr("style", "background-image: url(" + this.settings.image + ") !important;" + u.attr("style"))) : "left" === this.settings.direction || "right" === this.settings.direction ? (e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), s = u.height() + 4 + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), a = e, e += 400 * Math.abs(parseFloat(this.settings.velocity)), o = 0, "right" === this.settings.direction && (o -= e - a), 1 > u.find(".parallax-inner").length && u.prepend('<div class="parallax-inner"></div>'), u.css({
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    "background-image": "none"
                }).attr("style", u.attr("style")).find(".parallax-inner").css({
                    pointerEvents: "none",
                    width: e,
                    height: s,
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: o,
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundPosition: t ? "0 0 " : this.settings.xpos + " " + this.settings.ypos,
                    backgroundRepeat: t ? "repeat" : "no-repeat",
                    backgroundSize: t ? "auto" : "cover"
                }), "" !== this.settings.image && "none" !== this.settings.image && (u.find(".parallax-inner").css({
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundImage: c ? "" : "url(" + this.settings.image + ")"
                }), this.setBackgroundStyling(u, p)), g = 0, u.offset().top > i._fusionWindowHeight && (g = u.offset().top - i._fusionWindowHeight), d = u.offset().top + u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), this.moveMax = e - a, this.scrollTopMin = g, this.scrollTopMax = d) : (r = 900, r = jQuery(i).height(), e = u.width() + parseInt(u.css("paddingRight"), 10) + parseInt(u.css("paddingLeft"), 10), l = s = u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), s += r * Math.abs(parseFloat(this.settings.velocity)), h = 0, "down" === this.settings.direction && (h -= s - l), 1 > u.find(".parallax-inner").length && u.prepend('<div class="parallax-inner"></div>'), u.css({
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    "background-image": "none"
                }).attr("style", u.attr("style")).find(".parallax-inner").css({
                    pointerEvents: "none",
                    width: e,
                    height: s,
                    position: "absolute",
                    zIndex: -1,
                    top: h,
                    left: 0,
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundPosition: t ? "0 0 " : this.settings.xpos + " " + this.settings.ypos,
                    backgroundRepeat: t ? "repeat" : "no-repeat",
                    backgroundSize: t ? "auto" : "cover"
                }), "" !== this.settings.image && "none" !== this.settings.image && (u.find(".parallax-inner").css({
                    opacity: Math.abs(parseFloat(this.settings.opacity) / 100),
                    backgroundImage: c ? "" : "url(" + this.settings.image + ")"
                }), this.setBackgroundStyling(u, p)), g = 0, u.offset().top > i._fusionWindowHeight && (g = u.offset().top - i._fusionWindowHeight), d = u.offset().top + u.height() + parseInt(u.css("paddingTop"), 10) + parseInt(u.css("paddingBottom"), 10), this.moveMax = s - l, this.scrollTopMin = g, this.scrollTopMax = d), c && u.find(".parallax-inner").attr("data-bg", this.settings.image).addClass("lazyload"))
            },
            isMobile: function() {
                return cssua.ua.mobile
            }
        }), t.fn[e] = function(i) {
            return this.each(function() {
                t.data(this, "plugin_" + e) || t.data(this, "plugin_" + e, new n(this, i))
            }), this
        }
    }(jQuery, window, document), jQuery(document).ready(function(t) {
        "use strict";
        t(window).on("scroll touchmove touchstart touchend gesturechange", function() {
            requestAnimationFrame(_fusionParallaxAll)
        }), cssua.ua.mobile && requestAnimationFrame(function() {
            var t;
            for (_fusionRefreshScroll(), t = 0; t < window._fusionImageParallaxImages.length; t++) window._fusionImageParallaxImages[t].doParallax()
        }), t(window).on("resize", function() {
            setTimeout(function() {
                _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) {
                    i.resizeParallaxBackground()
                })
            }, 1)
        }), setTimeout(function() {
            _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) {
                i.resizeParallaxBackground()
            })
        }, 1), setTimeout(function() {
            _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) {
                i.resizeParallaxBackground()
            })
        }, 100)
    }), jQuery(window).on("load", function() {
        setTimeout(function() {
            _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) {
                i.resizeParallaxBackground()
            })
        }, 1), setTimeout(function() {
            _fusionRefreshWindow(), jQuery.each(window._fusionImageParallaxImages, function(t, i) {
                i.resizeParallaxBackground()
            })
        }, 1e3)
    }), jQuery(document).on("ready fusion-element-render-fusion_builder_container", function(t, i) {
        "use strict";
        var e = void 0 !== i ? jQuery('div[data-cid="' + i + '"]').find(".fusion-bg-parallax") : jQuery(".fusion-bg-parallax");

        function s() {
            return cssua.ua.mobile
        }
        s() && jQuery(".fusion-bg-parallax.video > div").remove(), e.next().addClass("bg-parallax-parent"), e.attr("style", "").css("display", "none"), e.each(function() {
            cssua.ua.mobile && !jQuery(this).data("mobile-enabled") || (jQuery(this).removeData(), jQuery(this).fusionImageParallax({
                image: jQuery(this).data("bg-image"),
                backgroundColor: void 0 !== jQuery(this).data("bg-color") ? jQuery(this).data("bg-color") : "",
                blendMode: void 0 !== jQuery(this).data("blend-mode") ? jQuery(this).data("blend-mode") : "none",
                direction: jQuery(this).data("direction"),
                mobileenabled: jQuery(this).data("mobile-enabled"),
                mobiledevice: s(),
                bgAlpha: jQuery(this).data("bg-alpha"),
                opacity: jQuery(this).data("opacity"),
                width: jQuery(this).data("bg-width"),
                height: jQuery(this).data("bg-height"),
                velocity: jQuery(this).data("velocity"),
                align: jQuery(this).data("bg-align"),
                repeat: jQuery(this).data("bg-repeat"),
                target: jQuery(this).next(),
                gradientType: void 0 !== jQuery(this).data("bg-gradient-type") ? jQuery(this).data("bg-gradient-type") : "",
                gradientAngle: void 0 !== jQuery(this).data("bg-gradient-angle") ? jQuery(this).data("bg-gradient-angle") : "",
                gradientStartColor: void 0 !== jQuery(this).data("bg-gradient-start-color") ? jQuery(this).data("bg-gradient-start-color") : "",
                gradientStartPosition: void 0 !== jQuery(this).data("bg-gradient-start-position") ? jQuery(this).data("bg-gradient-start-position") : "",
                gradientEndColor: void 0 !== jQuery(this).data("bg-gradient-end-color") ? jQuery(this).data("bg-gradient-end-color") : "",
                gradientEndPosition: void 0 !== jQuery(this).data("bg-gradient-end-position") ? jQuery(this).data("bg-gradient-end-position") : "",
                gradientRadialDirection: void 0 !== jQuery(this).data("bg-radial-direction") ? jQuery(this).data("bg-radial-direction") : "",
                complete: function() {}
            }))
        })
    });