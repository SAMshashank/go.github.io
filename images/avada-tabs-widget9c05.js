jQuery(document).on("ready fusion-widget-render-Fusion_Widget_Tabs", function() {
    jQuery(".fusion-tabs-widget .fusion-tabs-nav li a").on("click", function(n) {
        var t = jQuery(this).data("link");
        n.preventDefault(), jQuery(this).parents(".fusion-tabs-nav").find("li").removeClass("active"), jQuery(this).parent().addClass("active"), jQuery(this).parents(".fusion-tabs-widget").find(".fusion-tab-content").hide(), jQuery(this).parents(".fusion-tabs-widget").find('.fusion-tab-content[data-name="' + t + '"]').fadeIn()
    })
});