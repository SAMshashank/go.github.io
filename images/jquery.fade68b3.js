! function(t) {
    "use strict";
    t.fn.fusionScroller = function(e) {
        var f = t.extend({
            type: "opacity",
            offset: 0,
            endOffset: ""
        }, e);
        t(this).each(function() {
            var e, i, r, o = this;
            t(window).on("scroll", function() {
                var s, l, p, c;
                e = t(o).offset().top, t("body").hasClass("admin-bar") && (e = t(o).offset().top - t("#wpadminbar").outerHeight()), 0 < f.offset && (e = t(o).offset().top - f.offset), i = t(o).outerHeight(), r = e + i, f.endOffset && t(f.endOffset).length && (r = t(f.endOffset).offset().top), (s = t(this).scrollTop()) >= e && s <= r && (l = (r - s) / i * 100, "opacity" === f.type ? (p = l / 100 * 1, t(o).css({
                    opacity: p
                })) : "blur" === f.type ? (c = "blur(" + (l = 100 - l) / 100 * 50 + "px)", t(o).css({
                    "-webkit-filter": c,
                    "-ms-filter": c,
                    "-o-filter": c,
                    "-moz-filter": c,
                    filter: c
                })) : "fading_blur" === f.type && (p = l / 100 * 1, c = "blur(" + (l = 100 - l) / 100 * 50 + "px)", t(o).css({
                    "-webkit-filter": c,
                    "-ms-filter": c,
                    "-o-filter": c,
                    "-moz-filter": c,
                    filter: c,
                    opacity: p
                }))), s < e && ("opacity" === f.type ? t(o).css({
                    opacity: 1
                }) : "blur" === f.type ? (c = "blur(0px)", t(o).css({
                    "-webkit-filter": c,
                    "-ms-filter": c,
                    "-o-filter": c,
                    "-moz-filter": c,
                    filter: c
                })) : "fading_blur" === f.type && (c = "blur(0px)", t(o).css({
                    opacity: 1,
                    "-webkit-filter": c,
                    "-ms-filter": c,
                    "-o-filter": c,
                    "-moz-filter": c,
                    filter: c
                })))
            })
        })
    }
}(jQuery);