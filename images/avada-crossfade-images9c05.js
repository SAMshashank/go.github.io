function fusionResizeCrossfadeImagesContainer(e) {
    var i = 0;
    e.find("img").each(function() {
        var e = jQuery(this).height();
        e > i && (i = e)
    }), e.css("height", i)
}
jQuery(window).on("load", function() {
    jQuery(window).on("resize", function() {
        jQuery(".crossfade-images").each(function() {
            fusionResizeCrossfadeImagesContainer(jQuery(this))
        })
    }), jQuery(".crossfade-images").each(function() {
        fusionResizeCrossfadeImagesContainer(jQuery(this))
    })
});