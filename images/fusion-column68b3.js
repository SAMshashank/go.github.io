jQuery(document).ready(function() {
    jQuery(".fusion-image-hovers .hover-type-liftup.fusion-column-inner-bg").on({
        mouseenter: function() {
            var e = jQuery(this).closest(".fusion_builder_column");
            jQuery(this).css("z-index", "4"), jQuery(this).siblings(".fusion-column-wrapper").css("z-index", "5"), "none" !== e.css("filter") && "auto" === e.css("z-index") && (e.css("z-index", "1"), e.attr("data-filter-zindex", "true"))
        },
        mouseleave: function() {
            var e = jQuery(this).closest(".fusion_builder_column");
            jQuery(this).css("z-index", ""), jQuery(this).siblings(".fusion-column-wrapper").css("z-index", ""), "true" === e.data("filter-zindex") && (e.css("z-index", ""), e.removeAttr("data-filter-zindex"))
        }
    })
});