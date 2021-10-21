! function(t) {
    "use strict";
    t.fn.awbAnimateTitleHighlightsAndRotations = function() {
        t.each(fusion.getObserverSegmentation(t(this)), function(i) {
            var n = fusion.getAnimationIntersectionData(i),
                e = new IntersectionObserver(function(i, n) {
                    t.each(i, function(i, a) {
                        var o = t(a.target);
                        fusion.shouldObserverEntryAnimate(a, n) && (t(o).hasClass("fusion-title-rotating") && t(o).animateTitleRotations(), t(o).hasClass("fusion-title-highlight") && t(o).animateTitleHighlights(), e.unobserve(a.target))
                    })
                }, n);
            t(this).each(function() {
                e.observe(this)
            })
        })
    }, t.fn.animateTitleRotations = function() {
        var i = t(this),
            n = i.find(".fusion-animated-texts-wrapper"),
            e = i.hasClass("fusion-loop-on"),
            a = t(i).closest("[data-animationduration]").data("animationduration"),
            o = void 0 !== a ? 200 * parseFloat(a) : 0;
        n.removeData("textillate"), t(i).find(".fusion-textillate").remove(), t(i).is(".fusion-title-typeIn,.fusion-title-clipIn") || n.awbAnimatedTitleRotationWidth(), n.textillate({
            selector: ".fusion-animated-texts",
            type: n.attr("data-length"),
            minDisplayTime: n.attr("data-minDisplayTime"),
            loop: e,
            initialDelay: o
        })
    }, t.fn.animateTitleHighlights = function() {
        var i, n = t(this),
            e = {
                circle: ["M344.6,40.1c0,0-293-3.4-330.7,40.3c-5.2,6-3.5,15.3,3.3,19.4c65.8,39,315.8,42.3,451.2-3 c6.3-2.1,12-6.1,16-11.4C527.9,27,242,16.1,242,16.1"],
                underline_zigzag: ["M6.1,133.6c0,0,173.4-20.6,328.3-14.5c154.8,6.1,162.2,8.7,162.2,8.7s-262.6-4.9-339.2,13.9 c0,0,113.8-6.1,162.9,6.9"],
                x: ["M25.8,37.1c0,0,321.2,56.7,435.5,82.3", "M55.8,108.7c0,0,374-78.3,423.6-76.3"],
                strikethrough: ["M22.2,93.2c0,0,222.1-11.3,298.8-15.8c84.2-4.9,159.1-4.7,159.1-4.7"],
                curly: ["M9.4,146.9c0,0,54.4-60.2,102.1-11.6c42.3,43.1,84.3-65.7,147.3,0.9c37.6,39.7,79.8-52.6,123.8-14.4 c68.6,59.4,107.2-7,107.2-7"],
                diagonal_bottom_left: ["M6.5,127.1C10.6,126.2,316.9,24.8,497,23.9"],
                diagonal_top_left: ["M7.2,28.5c0,0,376.7,64.4,485.2,93.4"],
                double: ["M21.7,145.7c0,0,192.2-33.7,456.3-14.6", "M13.6,28.2c0,0,296.2-22.5,474.9-5.4"],
                double_underline: ["M10.3,130.6c0,0,193.9-24.3,475.2-11.2", "M38.9,148.9c0,0,173.8-35.3,423.3-11.8"],
                underline: ["M8.1,146.2c0,0,240.6-55.6,479-13.8"]
            }[t(n).data("highlight")],
            a = t();
        "object" == typeof e && e.forEach(function(i) {
            a = a.add(t("<path>", {
                d: i
            }))
        }), i = t("<svg>", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 500 150",
            preserveAspectRatio: "none"
        }).html(a), t(n).find(".fusion-highlighted-text-wrapper svg").remove(), t(n).find(".fusion-highlighted-text").after(i[0].outerHTML)
    }, t.fn.awbAnimatedTitleRotationWidth = function() {
        var i = t(this),
            n = i.find(".fusion-animated-texts"),
            e = 0,
            a = 0,
            o = !1;
        e = parseInt(i.find(".fusion-animated-text").css("font-size")), e *= .6, n.is(":visible") || (o = !0, n.show()), t(i).find(".fusion-animated-text").each(function() {
            var i = t(this).width();
            i > a && (a = i)
        }), o && n.hide(), i.css("width", a + e)
    }, t.fn.awbAnimatedTitleRotationWidthRecalc = function() {
        t(this).each(function() {
            t(this).is(".fusion-title-typeIn,.fusion-title-clipIn") || t(this).find(".fusion-animated-texts-wrapper").awbAnimatedTitleRotationWidth()
        })
    }
}(jQuery), jQuery(window).on("load", function() {
    setTimeout(function() {
        jQuery(".fusion-title-rotating, .fusion-title-highlight").awbAnimateTitleHighlightsAndRotations()
    }, 400), jQuery(window).on("fusion-resize-horizontal", function() {
        jQuery(".fusion-title-rotating").awbAnimatedTitleRotationWidthRecalc()
    })
}), jQuery(window).on("fusion-column-resized fusion-element-render-fusion_title", function(t, i) {
    var n = jQuery('div[data-cid="' + i + '"]').find(".fusion-title-rotating, .fusion-title-highlight");
    n.length && (n.awbAnimateTitleHighlightsAndRotations(), n.awbAnimatedTitleRotationWidthRecalc())
});