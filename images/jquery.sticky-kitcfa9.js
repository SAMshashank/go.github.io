(function() {
    var t, i;
    t = this.jQuery || window.jQuery, i = t(window), t.fn.stick_in_parent = function(s) {
        var o, n, e, r, c, a, f, u, l, g, d, k, h, p, y, v, m, b, _, C;
        for (null == s && (s = {}), k = s.sticky_class, a = s.inner_scrolling, d = s.recalc_every, g = s.parent, l = s.offset_top, u = s.spacer, e = s.bottoming, h = void 0 !== s.transition_offset && parseFloat(s.transition_offset), p = void 0 !== s.observer && s.observer, y = void 0 !== s.scroll_transition && parseFloat(s.scroll_transition), v = void 0 !== s.clone && s.clone, m = !1, adminBarHeight = fusion.getAdminbarHeight(), null == l && (l = 0), "fusion-container-stuck" === k && "object" == typeof fusion && "function" == typeof fusion.getHeight && (l = fusion.getHeight(l) + adminBarHeight), null == g && (g = void 0), null == a && (a = !0), null == k && (k = "is_stuck"), o = t(document), null == e && (e = !0), r = function(n, r, c, f, w, x, j, H) {
                var z, I, A, O, Q, B, M, R, T, F, G, S, W;
                if (!n.data("sticky_kit")) {
                    if (n.attr("data-sticky_kit", !0), Q = o.height(), M = n.parent(), null != g && (M = M.closest(g)), !M.length) throw "failed to find stick parent";
                    if (A = !1, z = !1, null != u ? G = u && n.closest(u) : v ? (G = n.clone(!1)).addClass("fusion-sticky-spacer").removeClass("fusion-sticky-transition") : G = jQuery('<div class="fusion-sticky-spacer" />'), G && G.css("position", n.css("position")), overlap = function(t, i) {
                            "object" == typeof t && "object" == typeof t[0] && (t[0].isIntersecting ? n.removeClass("fusion-sticky-transition") : n.addClass("fusion-sticky-transition"))
                        }, p && (W = new IntersectionObserver(overlap, {
                            rootMargin: "0px",
                            threshold: 1
                        })), e && "function" == typeof ResizeObserver && new ResizeObserver(function(t) {
                            let i = t[0].contentRect;
                            f = i.height, _()
                        }).observe(M[0]), (R = function() {
                            var t, i, s, e;
                            if (!H) return Q = o.height(), t = parseInt(M.css("border-top-width"), 10), i = parseInt(M.css("padding-top"), 10), r = parseInt(M.css("padding-bottom"), 10), c = M.offset().top + t + i, f = M.height(), A && (A = !1, z = !1, null == u && (n.next(".fusion-sticky-spacer").length ? G = n.next(".fusion-sticky-spacer") : n.insertAfter(G)), n.css({
                                position: "",
                                top: "",
                                width: "",
                                bottom: ""
                            }).removeClass(k), s = !0), w = n.offset().top - (parseInt(n.css("margin-top"), 10) || 0) - l, x = n.outerHeight(!0), j = n.css("float"), G && (e = {
                                width: n.outerWidth(!0),
                                display: n.css("display"),
                                "vertical-align": n.css("vertical-align"),
                                float: j
                            }, v || (e.height = x), G.css(e)), s ? S() : void 0
                        })(), x !== f) {
                        if (O = void 0, B = l, F = d, S = function() {
                                var t, s, g, v, m, b;
                                if (!H) return g = !1, null != F && 0 >= (F -= 1) && (F = d, R(), g = !0), null == F || g || o.height() === Q || (R(), g = !0), v = i.scrollTop(), null != O && (s = v - O), O = v, A ? (e && (m = v + x + B > f + c, z && !m && (z = !1, n.css({
                                    position: "fixed",
                                    bottom: "",
                                    top: B
                                }).trigger("sticky_kit:unbottom"))), v < w && (A = !1, B = l, null == u && ("left" !== j && "right" !== j || n.insertAfter(G), G && G.detach()), t = {
                                    position: "",
                                    width: "",
                                    top: ""
                                }, n.css(t).removeClass(k).trigger("sticky_kit:unstick"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change")), a && (b = i.height(), x + l > b && (z || (B -= s, B = Math.max(b - x, B), B = Math.min(l, B), A && n.css({
                                    top: B + "px"
                                }))))) : v > w && (A = !0, (t = {
                                    position: "fixed",
                                    top: B
                                }).width = "border-box" === n.css("box-sizing") ? n.outerWidth() + "px" : n.width() + "px", n.css(t).addClass(k), null == u && (n.after(G), "left" !== j && "right" !== j || G.append(n)), n.trigger("sticky_kit:stick"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change")), !1 === h || p || (!n.is(".fusion-sticky-transition") && v - w > h ? (n.addClass("fusion-sticky-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-transition-change")) : n.is(".fusion-sticky-transition") && v - w <= h && (n.removeClass("fusion-sticky-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-transition-change"))), !1 !== y && 0 !== y && (0 > s ? n.hasClass("fusion-scrolling-up") || (n.addClass("fusion-scrolling-up").removeClass("fusion-scrolling-down"), i.trigger("fusion-sticky-scroll-change")) : n.hasClass("fusion-scrolling-down") || (n.addClass("fusion-scrolling-down").removeClass("fusion-scrolling-up"), i.trigger("fusion-sticky-scroll-change")), !n.is(".fusion-sticky-scroll-transition") && v - w > y ? (n.addClass("fusion-sticky-scroll-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-scroll-change")) : n.is(".fusion-sticky-scroll-transition") && v - w <= y && (n.removeClass("fusion-sticky-scroll-transition"), "fusion-container-stuck" === k && i.trigger("fusion-sticky-scroll-change"))), A && e && (null == m && (m = v + x + B > f + c), !z && m) ? (z = !0, "static" === M.css("position") && M.css({
                                    position: "relative"
                                }), n.css({
                                    position: "absolute",
                                    bottom: r,
                                    top: "auto"
                                }).trigger("sticky_kit:bottom")) : void 0
                            }, T = function() {
                                return R(), S()
                            }, _ = function(t) {
                                var i;
                                "object" == typeof fusion && "function" == typeof fusion.getHeight && (l = void 0 === s.offset_top ? 0 : s.offset_top, "fusion-container-stuck" === k ? l = fusion.getHeight(l) + adminBarHeight : "fusion-sidebar-stuck" === k && jQuery(".fusion-tb-header").length && "function" == typeof fusionGetStickyOffset && (i = fusionGetStickyOffset()) && (l = i + adminBarHeight + 50), B = l), T(), void 0 !== t && "string" == typeof t.type && "resize" === t.type && "function" == typeof D && D()
                            }, "object" == typeof fusion && "function" == typeof fusion.debounce) var D = fusion.debounce(_, 350);
                        return C = function(t) {
                            m || (m = !0, _(t), D(), setTimeout(function() {
                                m = !1
                            }, 100))
                        }, b = function() {
                            p && W.observe(n.next()[0])
                        }, I = function() {
                            if (H = !0, i.off("touchmove", S), i.off("scroll", S), i.off("resize", _), t(document.body).off("sticky_kit:recalc", T), "fusion-container-stuck" === k && i.trigger("fusion-sticky-change"), n.off("sticky_kit:detach", I), n.removeData("sticky_kit"), n.removeAttr("data-sticky_kit"), n.css({
                                    position: "",
                                    bottom: "",
                                    top: "",
                                    width: ""
                                }), n.removeClass("fusion-sticky-transition"), M.position("position", ""), A) return null == u && ("left" !== j && "right" !== j || n.insertAfter(G), G.remove()), n.removeClass(k);
                            n.next(".fusion-sticky-spacer").length && n.next(".fusion-sticky-spacer").remove()
                        }, G && G.detach(), "fusion-sidebar-stuck" === k && jQuery(".fusion-tb-header").length && i.on("fusion-sticky-change fusion-sticky-scroll-change fusion-sticky-transition-change", C), i.on("touchmove", S), i.on("scroll", S), i.on("resize", _), t(document.body).on("sticky_kit:recalc", T), n.on("sticky_kit:detach", I), n.on("sticky_kit:stick", b), setTimeout(S, 0)
                    }
                }
            }, c = 0, f = this.length; c < f; c++) n = this[c], r(t(n));
        return this
    }
}).call(this);