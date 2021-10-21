function fusionSetAnimationData(n) {
    "off" === fusionAnimationsVars.status_css_animations || cssua.ua.mobile && "desktop_and_mobile" !== fusionAnimationsVars.status_css_animations ? jQuery("body").addClass("dont-animate").removeClass("do-animate") : (jQuery("body").addClass("do-animate").removeClass("dont-animate"), void 0 !== n && void 0 !== n.data.custom && jQuery(window).initElementAnimations())
}! function(n) {
    "use strict";
    window.awbAnimationObservers = {}, n.fn.initElementAnimations = function() {
        n.each(window.awbAnimationObservers, function(i, t) {
            n.each(t[0], function(n, i) {
                t[1].unobserve(i)
            }), delete window.awbAnimationObservers[i]
        }), n.each(fusion.getObserverSegmentation(n(".fusion-animated")), function(i) {
            var t = fusion.getAnimationIntersectionData(i),
                a = new IntersectionObserver(function(i, t) {
                    n.each(i, function(i, t) {
                        var e, o, s, u = n(t.target);
                        t.isIntersecting && (u.parents(".fusion-delayed-animation").length || (u.css("visibility", "visible"), e = u.data("animationtype"), o = u.data("animationduration"), u.addClass(e), o && (u.css("animation-duration", o + "s"), s = u, setTimeout(function() {
                            s.removeClass(e)
                        }, 1e3 * o))), a.unobserve(t.target))
                    })
                }, t);
            n(this).each(function() {
                a.observe(this)
            }), window.awbAnimationObservers[i] = [this, a]
        })
    }
}(jQuery), jQuery(document).ready(function() {
    fusionSetAnimationData()
}), jQuery(window).on("load", function() {
    jQuery("body").hasClass("fusion-builder-live") || setTimeout(function() {
        jQuery(window).initElementAnimations()
    }, 300)
}), jQuery(window).on("CSSAnimations", {
    custom: !0
}, fusionSetAnimationData);