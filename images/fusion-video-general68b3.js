function playVideoAndPauseOthers(e) {
    var i = jQuery(e).find("[data-youtube-video-id]").find("iframe"),
        t = jQuery(e).data("flexslider").slides.eq(jQuery(e).data("flexslider").currentSlide),
        o = t.find("[data-youtube-video-id]").find("iframe");
    i.each(function() {
        jQuery(this).attr("id") !== o.attr("id") && void 0 !== window.$youtube_players && void 0 !== window.$youtube_players[jQuery(this).attr("id")] && window.$youtube_players[jQuery(this).attr("id")].stopVideo()
    }), o.length && ("function" != typeof fusionGetConsent || fusionGetConsent("youtube")) && void 0 !== window.$youtube_players && (!o.parents("li").hasClass("clone") && o.parents("li").hasClass("flex-active-slide") && "yes" === o.parents("li").attr("data-autoplay") && (void 0 === window.$youtube_players || void 0 === window.$youtube_players[o.attr("id")] || void 0 === window.$youtube_players[o.attr("id")].playVideo ? fusionYouTubeTimeout(o.attr("id")) : "slide" === jQuery(e).data("animation") && 0 === e.currentSlide && void 0 === jQuery(e).data("iteration") ? window.$youtube_players[o.attr("id")] && setTimeout(function() {
        window.$youtube_players[o.attr("id")].playVideo(), jQuery(e).data("iteration", 1), e.stop(), setTimeout(function() {
            e.play()
        }, 1e3 * window.$youtube_players[o.attr("id")].getDuration() - 6e3)
    }, 2e3) : window.$youtube_players[o.attr("id")].playVideo()), "yes" === t.attr("data-mute") && void 0 !== window.$youtube_players[o.attr("id")] && void 0 !== window.$youtube_players[o.attr("id")].mute && window.$youtube_players[o.attr("id")].mute()), Number(fusionVideoGeneralVars.status_vimeo) && ("function" != typeof fusionGetConsent || fusionGetConsent("vimeo")) && setTimeout(function() {
        jQuery(e).find("[data-vimeo-video-id] > iframe").each(function() {
            new Vimeo.Player(jQuery(this)[0]).pause()
        }), 0 !== e.slides.eq(e.currentSlide).find("[data-vimeo-video-id] > iframe").length && ("yes" === jQuery(e.slides.eq(e.currentSlide)).data("autoplay") && new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).play(), "yes" === jQuery(e.slides.eq(e.currentSlide)).data("mute") && new Vimeo.Player(e.slides.eq(e.currentSlide).find("iframe")[0]).setVolume(0))
    }, 300), jQuery(e).find("video").each(function() {
        "function" == typeof jQuery(this)[0].pause && jQuery(this)[0].pause(), !jQuery(this).parents("li").hasClass("clone") && jQuery(this).parents("li").hasClass("flex-active-slide") && "yes" === jQuery(this).parents("li").attr("data-autoplay") && "function" == typeof jQuery(this)[0].play && jQuery(this)[0].play()
    })
}
jQuery(document).ready(function() {
    var e;
    e = jQuery("iframe"), jQuery.each(e, function(e, i) {
        var t = jQuery(this).attr("src"),
            o = jQuery(this).data("privacy-src"),
            s = !t && o ? o : t;
        s && Number(fusionVideoGeneralVars.status_vimeo) && 1 <= s.indexOf("vimeo") && jQuery(this).attr("id", "player_" + (e + 1))
    }), jQuery("body").hasClass("fusion-builder-live") ? setTimeout(function() {
        jQuery(".full-video, .video-shortcode, .wooslider .slide-content, .fusion-portfolio-carousel .fusion-video").not("#bbpress-forums .full-video, #bbpress-forums .video-shortcode, #bbpress-forums .wooslider .slide-content, #bbpress-forums .fusion-portfolio-carousel .fusion-video").fitVids(), jQuery("#bbpress-forums").fitVids()
    }, 350) : (jQuery(".full-video, .video-shortcode, .wooslider .slide-content, .fusion-portfolio-carousel .fusion-video").not("#bbpress-forums .full-video, #bbpress-forums .video-shortcode, #bbpress-forums .wooslider .slide-content, #bbpress-forums .fusion-portfolio-carousel .fusion-video").fitVids(), jQuery("#bbpress-forums").fitVids())
});