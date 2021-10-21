function fusionInitTooltips() {
    jQuery('[data-toggle="tooltip"]').each(function() {
        var e;
        e = jQuery(this).parents(".fusion-header-wrapper").length ? ".fusion-header-wrapper" : jQuery(this).parents("#side-header").length ? "#side-header" : "body", (!cssua.ua.mobile || cssua.ua.mobile && "_blank" !== jQuery(this).attr("target")) && jQuery(this).tooltip({
            container: e
        })
    })
}
jQuery(window).on("load", function() {
    fusionInitTooltips()
}), jQuery(window).on("fusion-element-render-fusion_text fusion-element-render-fusion_social_links", function(e, t) {
    var i, n = jQuery('div[data-cid="' + t + '"]').find('[data-toggle="tooltip"]');
    i = n.parents(".fusion-header-wrapper").length ? ".fusion-header-wrapper" : n.parents("#side-header").length ? "#side-header" : "body", n.each(function() {
        (!cssua.ua.mobile || cssua.ua.mobile && "_blank" !== jQuery(this).attr("target")) && jQuery(this).tooltip({
            container: i
        })
    })
});