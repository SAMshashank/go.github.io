jQuery(document).ready(function() {
    jQuery(".fusion-vertical-menu-widget .current_page_item, .fusion-vertical-menu-widget .current-menu-item").each(function() {
        var e = jQuery(this),
            n = e.parent();
        e.find(".children, .sub-menu").length && e.find("> .children, > .sub-menu").show("slow"), n.hasClass("fusion-vertical-menu-widget") && e.find("ul").show("slow"), (n.hasClass("children") || n.hasClass("sub-menu")) && e.closest("ul").show("slow")
    })
}), jQuery(window).on("load", function() {
    jQuery(".fusion-vertical-menu-widget.click li a .arrow").on("click", function(e) {
        var n = jQuery(this).parent(),
            i = n.parent(),
            t = i.find("> .children, > .sub-menu");
        if (e.preventDefault(), (i.hasClass("page_item_has_children") || i.hasClass("menu-item-has-children")) && (t.length && !t.is(":visible") ? t.stop(!0, !0).slideDown("slow") : t.stop(!0, !0).slideUp("slow")), n.parent(".page_item_has_children.current_page_item, .menu-item-has-children.current-menu-item").length) return !1
    }), jQuery(".fusion-vertical-menu-widget.hover li").each(function() {
        var e;
        jQuery(this).hover(function() {
            var n = jQuery(this).find("> .children, > .sub-menu");
            clearTimeout(e), e = setTimeout(function() {
                n.length && n.stop(!0, !0).slideDown("slow")
            }, 500)
        }, function() {
            var n = jQuery(this),
                i = n.find("> .children, > .sub-menu");
            clearTimeout(e), e = setTimeout(function() {
                (0 === n.find(".current_page_item").length && !1 === n.hasClass("current_page_item") || 0 === n.find(".current-menu-item").length && !1 === n.hasClass("current-menu-item")) && i.stop(!0, !0).slideUp("slow")
            }, 500)
        })
    })
});