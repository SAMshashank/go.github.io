var prevCallback = window.onYouTubePlayerAPIReady,
    fusionTimeout = [];

function registerYoutubePlayers(e) {
    !0 === window.yt_vid_exists && (window.$youtube_players = [], jQuery(".tfs-slider").each(function() {
        var t = jQuery(this),
            a = t.find("[data-youtube-video-id]").find("iframe").length,
            i = !1;
        t.find("[data-youtube-video-id]").find("iframe").each(function(o) {
            var u = jQuery(this);
            a === o + 1 && void 0 !== e && (i = t.data("flexslider")), window.YTReady(function() {
                window.$youtube_players[u.attr("id")] = new YT.Player(u.attr("id"), {
                    events: {
                        onReady: onPlayerReady(u.parents("li"), i),
                        onStateChange: onPlayerStateChange(u.attr("id"), t)
                    }
                })
            })
        })
    }))
}

function onPlayerReady(e, t) {
    return function(a) {
        "yes" === jQuery(e).data("mute") && a.target.mute(), t && setTimeout(function() {
            playVideoAndPauseOthers(t)
        }, 300)
    }
}

function loadYoutubeIframeAPI() {
    var e, t;
    (!0 === window.yt_vid_exists || jQuery("body").hasClass("fusion-builder-live")) && ((e = document.createElement("script")).src = "https://www.youtube.com/iframe_api", (t = document.getElementsByTagName("script")[0]).parentNode.insertBefore(e, t))
}

function onYouTubePlayerAPIReadyCallback() {
    window.YTReady(!0)
}

function onPlayerStateChange(e, t) {
    return function(e) {
        e.data == YT.PlayerState.PLAYING && jQuery(t).flexslider("pause"), e.data == YT.PlayerState.PAUSED && jQuery(t).flexslider("play"), e.data == YT.PlayerState.BUFFERING && jQuery(t).flexslider("pause"), e.data == YT.PlayerState.ENDED && "1" == jQuery(t).data("autoplay") && (void 0 !== jQuery(t).find(".flex-active-slide").data("loop") && "yes" !== jQuery(t).find(".flex-active-slide").data("loop") && jQuery(t).flexslider("next"), jQuery(t).flexslider("play"))
    }
}

function ytVidId(e) {
    return !!e.match(/^(?:https?:)?(\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/) && RegExp.$1
}

function insertParam(e, t, a, i) {
    var o, u, n, r, d, s, y;
    if (0 < e.indexOf("#") ? (o = e.indexOf("#"), u = e.substring(e.indexOf("#"), e.length)) : (u = "", o = e.length), r = "", 1 < (n = e.substring(0, o).split("?")).length)
        for (d = n[1].split("&"), s = 0; s < d.length; s++)(y = d[s].split("="))[0] !== t && ("" === r ? r = "?" + y[0] + "=" + (y[1] ? y[1] : "") : (r += "&", r += y[0] + "=" + (y[1] ? y[1] : "")));
    return "" === r && (r = "?"), i ? r = "?" + t + "=" + a + (1 < r.length ? "&" + r.substring(1) : "") : ("" !== r && "?" !== r && (r += "&"), r += t + "=" + (a || "")), n[0] + r + u
}

function fusionYouTubeTimeout(e) {
    void 0 === fusionTimeout[e] && (fusionTimeout[e] = 0), setTimeout(function() {
        void 0 !== window.$youtube_players && void 0 !== window.$youtube_players[e] && void 0 !== window.$youtube_players[e].playVideo ? window.$youtube_players[e].playVideo() : 5 > ++fusionTimeout[e] && fusionYouTubeTimeout(e)
    }, 325)
}
window.onYouTubePlayerAPIReady = prevCallback ? function() {
    prevCallback(), onYouTubePlayerAPIReadyCallback()
} : onYouTubePlayerAPIReadyCallback, window.YTReady = function() {
    var e = [],
        t = !1;
    return function(a, i) {
        if (!0 === a)
            for (t = !0; e.length;) e.shift()();
        else "function" == typeof a && (t ? a() : e[i ? "unshift" : "push"](a))
    }
}();
var onYouTubeIframeAPIReady = function() {
    var e, t, a, i, o, u = _fbRowGetAllElementsWithAttribute("data-youtube-video-id");
    if ("function" != typeof fusionGetConsent || fusionGetConsent("youtube"))
        for (e = 0; e < u.length; e++) {
            for (t = u[e].getAttribute("data-youtube-video-id"), a = "", i = 0; i < u[e].childNodes.length; i++)
                if (/div/i.test(u[e].childNodes[i].tagName)) {
                    a = u[e].childNodes[i].getAttribute("id");
                    break
                }
            "" !== a && ((o = new YT.Player(a, {
                height: "auto",
                width: "auto",
                videoId: t,
                playerVars: {
                    autohide: 1,
                    autoplay: 1,
                    fs: 0,
                    showinfo: 0,
                    modestBranding: 1,
                    start: 0,
                    controls: 0,
                    rel: 0,
                    disablekb: 1,
                    iv_load_policy: 3,
                    wmode: "transparent"
                },
                events: {
                    onReady: _fbRowOnPlayerReady,
                    onStateChange: _fbRowOnPlayerStateChange
                }
            })).isMute = !1, "yes" === u[e].getAttribute("data-mute") && (o.isMute = !0), "true" === u[e].getAttribute("data-youtube-video-id") && o.setPlaybackQuality("hd720"))
        }
};
jQuery(document).ready(function() {
    var e;
    jQuery(".fusion-fullwidth.video-background").each(function() {
        jQuery(this).find("[data-youtube-video-id]") && (window.yt_vid_exists = !0)
    }), e = jQuery("iframe"), jQuery.each(e, function(e, t) {
        var a, i = jQuery(this).attr("src"),
            o = jQuery(this).data("privacy-src"),
            u = !i && o ? o : i;
        u && ytVidId(u) && (jQuery(this).attr("id", "player_" + (e + 1)), a = insertParam(insertParam(u, "enablejsapi", "1", !1), "wmode", "opaque", !1), i ? jQuery(this).attr("src", a) : o && jQuery(this).attr("data-privacy-src", a), window.yt_vid_exists = !0)
    }), ("function" != typeof fusionGetConsent || fusionGetConsent("youtube")) && (registerYoutubePlayers(), loadYoutubeIframeAPI())
});