function fusionGetScrollOffset() {
    var t, e = fusion.getAdminbarHeight(),
        o = "function" == typeof getStickyHeaderHeight ? getStickyHeaderHeight() : 0,
        n = parseInt(e + o + 1, 10);
    return jQuery(".fusion-tb-header").length && "function" == typeof fusionGetStickyOffset ? (t = fusionGetStickyOffset()) ? t + 1 : e : n
}
jQuery(document).ready(function() {
    jQuery("body").scrollspy({
        target: ".fusion-menu",
        offset: fusionGetScrollOffset()
    }), jQuery(window).on("load fusion-sticky-change fusion-sticky-scroll-change", function() {
        jQuery("body").data()["bs.scrollspy"].options.offset = fusionGetScrollOffset()
    }), jQuery(window).on("fusion-sticky-transition-change", function() {
        setTimeout(function() {
            jQuery("body").data()["bs.scrollspy"].options.offset = fusionGetScrollOffset()
        }, 300)
    })
});