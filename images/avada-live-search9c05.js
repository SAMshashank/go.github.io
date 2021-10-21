var avadaLiveSearch = function() {
    var s = [];
    avadaLiveSearchVars.live_search && jQuery(".fusion-live-search-input").each(function() {
        var e, a = jQuery(this),
            i = a.closest(".fusion-live-search"),
            t = i.find(".fusion-search-button"),
            o = i.find(".fusion-search-submit"),
            n = i.find(".fusion-search-results"),
            r = i.find('input[name^="post_type"]'),
            d = i.find('input[name="search_limit_to_post_titles"]'),
            u = n.closest(".fusion-builder-row"),
            c = i.closest(".fusion-header");

        function l(s) {
            var e = "";
            n.html(""), n.removeClass("suggestions-empty"), n.addClass("suggestions-added"), h("add"), jQuery.isEmptyObject(s) ? (n.addClass("suggestions-empty"), e += '<div class="fusion-search-result">' + avadaLiveSearchVars.no_search_results + "</div>", n.append(e)) : jQuery.each(s, function(s, a) {
                e = "", e += '<a class="fusion-search-result" href="' + a.post_url + '" title="' + a.title + '">', a.image_url && (e += '<div class="fusion-search-image"><img class="fusion-search-image-tag" src="' + a.image_url + '" alt="Post Thumb' + a.id + '"/></div>'), e += '<div class="fusion-search-content">', e += '<div class="fusion-search-post-title">' + a.title + "</div>", a.type && (e += '<div class="fusion-search-post-type">' + a.type + "</div>"), e += "</div>", e += "</a>", n.append(e)
            })
        }

        function v() {
            var e, t;
            if (i = a.closest(".fusion-live-search"), e = a.val(), e += (t = function() {
                    var s = [];
                    return r.each(function() {
                        s.push(this.value)
                    }), s
                })().toString(), avadaLiveSearchVars.min_char_count <= a.val().length) {
                if (void 0 !== s[e]) return void l(s[e]);
                i.find(".fusion-slider-loading").show(), i.find(".fusion-search-submit").css("color", "transparent"), o.css("color", "transparent"), jQuery.ajax({
                    url: avadaLiveSearchVars.ajaxurl,
                    type: "post",
                    data: {
                        action: "live_search_retrieve_posts",
                        search: a.val(),
                        per_page: avadaLiveSearchVars.per_page,
                        show_feat_img: avadaLiveSearchVars.show_feat_img,
                        display_post_type: avadaLiveSearchVars.display_post_type,
                        post_type: t(),
                        search_limit_to_post_titles: d.val()
                    }
                }).done(function(a) {
                    s[e] = a, l(a), i.find(".fusion-slider-loading").hide(), o.css("color", o.attr("data-color"))
                })
            } else i.find(".fusion-slider-loading").hide(), o.css("color", o.attr("data-color")), n.removeClass("suggestions-added"), h("remove")
        }

        function h(s) {
            u.length && ("add" === s ? u.css("z-index", "11") : u.css("z-index", "")), c.length && ("add" === s ? c.addClass("live-suggestion-added") : c.removeClass("live-suggestion-added"))
        }
        o.attr("data-color", o.css("color")), a.on("focusin", function() {
            avadaLiveSearchVars.min_char_count <= jQuery(this).val().length && n.children(".fusion-search-result").length && (n.addClass("suggestions-added"), h("add"))
        }), a.on("focusout", function() {
            n.is(":hover") || t.is(":hover") || (n.removeClass("suggestions-added"), h("remove"), n.addClass("suggestions-transition"), setTimeout(function() {
                n.removeClass("suggestions-transition")
            }, 300))
        }), jQuery(t, n).on("mouseleave", function() {
            a.is(":focus") || (n.removeClass("suggestions-added"), h("remove"), n.addClass("suggestions-transition"), setTimeout(function() {
                n.removeClass("suggestions-transition")
            }, 300))
        }), a.on("keyup", function() {
            clearTimeout(e), e = setTimeout(v, 500)
        }), a.on("keydown", function() {
            clearTimeout(e)
        })
    })
};
jQuery(document).ready(function() {
    avadaLiveSearch()
});