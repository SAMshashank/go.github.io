var generateCarousel = function(e) {
    var i = void 0 !== e ? jQuery('div[data-cid="' + e + '"]').find(".fusion-carousel") : jQuery(".fusion-carousel");
    jQuery().carouFredSel && i.each(function() {
        var e = jQuery(this).attr("data-imagesize") ? jQuery(this).data("imagesize") : "fixed",
            i = !jQuery(this).attr("data-metacontent") || "yes" !== jQuery(this).data("metacontent"),
            s = !(!jQuery(this).attr("data-autoplay") || "yes" !== jQuery(this).data("autoplay")),
            t = jQuery(this).parents(".related-posts").length ? fusionCarouselVars.related_posts_speed : fusionCarouselVars.carousel_speed,
            r = jQuery(this).attr("data-scrollfx") ? jQuery(this).data("scrollfx") : "scroll",
            n = jQuery(this).attr("data-scrollitems") ? parseInt(jQuery(this).data("scrollitems")) : null,
            a = !(!jQuery(this).attr("data-touchscroll") || "yes" !== jQuery(this).data("touchscroll")),
            u = a ? " fusion-carousel-swipe" : "",
            o = jQuery(this).attr("data-columns") ? jQuery(this).data("columns") : 6,
            l = jQuery(this).attr("data-itemmargin") ? parseInt(jQuery(this).data("itemmargin"), 10) : 44,
            f = jQuery(this).attr("data-itemwidth") ? parseInt(jQuery(this).data("itemwidth"), 10) + l : 180 + l,
            c = jQuery(this).parent().hasClass("fusion-image-carousel") && "fixed" === e ? "115px" : "variable";
        jQuery(this).find(".fusion-carousel-positioner").css("margin-left", "-" + l + "px"), jQuery(this).find(".fusion-carousel-item").css("margin-left", l + "px"), jQuery(this).find(".fusion-nav-prev").css("margin-left", l + "px"), jQuery(this).find("ul").carouFredSel({
            circular: !0,
            infinite: !0,
            responsive: !0,
            centerVertically: i,
            height: c,
            width: "100%",
            auto: {
                play: s,
                timeoutDuration: parseInt(t, 10)
            },
            items: {
                height: c,
                width: f,
                visible: {
                    min: 1,
                    max: parseInt(o, 10)
                }
            },
            scroll: {
                pauseOnHover: !0,
                items: n,
                fx: r
            },
            swipe: {
                onTouch: a,
                onMouse: a,
                options: {
                    excludedElements: "button, input, select, textarea, a, .noSwipe"
                }
            },
            prev: jQuery(this).find(".fusion-nav-prev"),
            next: jQuery(this).find(".fusion-nav-next"),
            onCreate: function() {
                var e = this;
                jQuery(this).find(".fusion-carousel-item-wrapper").css("visibility", "inherit"), jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-nav").css("visibility", "inherit"), jQuery(this).parents(".fusion-woo-featured-products-slider").length && jQuery(this).parent().css("overflow", ""), i && jQuery(this).css("line-height", jQuery(this).parent().height() + "px"), jQuery(this).css("top", "auto"), jQuery(this).parents(".fusion-carousel").find(".fusion-nav-next").each(function() {
                    jQuery(this).css("left", jQuery(this).parents(".fusion-carousel").find(".fusion-carousel-wrapper").width() - jQuery(this).width())
                }), jQuery(window).trigger("resize"), jQuery(this).closest(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(this).closest(".fusion-megamenu-menu").one("mouseenter focusin", function() {
                    jQuery(e).trigger("updateSizes")
                })
            },
            currentVisible: function(e) {
                return e
            }
        }, {
            wrapper: {
                classname: "fusion-carousel-wrapper" + u
            }
        })
    })
};
! function(e) {
    "use strict";
    e.fn.fusion_recalculate_carousel = function() {
        e(this).not(".fusion-woo-featured-products-slider").each(function() {
            var i, s, t = e(this),
                r = e(this).data("imagesize");
            setTimeout(function() {
                t.find(".fusion-nav-next").each(function() {
                    e(this).css("left", t.find(".fusion-carousel-wrapper").width() - e(this).width())
                }), "fixed" === r && (i = t.find(".fusion-carousel-item").map(function() {
                    return e(this).find("img").height()
                }).get(), s = Math.max.apply(null, i), t.find(".fusion-placeholder-image").each(function() {
                    e(this).css("height", s)
                }), 1 <= e(t).parents(".fusion-image-carousel").length && t.find(".fusion-image-wrapper").each(function() {
                    e(this).css("height", s), e(this).css("width", "100%"), e(this).find("> a").css("line-height", s - 2 + "px")
                }))
            }, 5)
        })
    }, e.fn.fusion_responsive_columns_carousel = function() {
        e(this).each(function() {
            var i, s, t = e(this),
                r = ["small", "medium", "large"],
                n = fusion.isLarge() ? "large" : fusion.isMedium() ? "medium" : "small",
                a = [];
            if (e.each(r, function(e, i) {
                    a.push(t.attr("data-columns" + i.replace("large", "")) ? t.data("columns" + i.replace("large", "")) : 0)
                }), 0 === (s = parseInt(a[r.indexOf(n)])))
                for (i = r.indexOf(n); i < r.length;) {
                    if (0 < parseInt(a[i])) {
                        s = parseInt(a[i]);
                        break
                    }
                    i++
                }
            0 < s && t.find(".fusion-carousel-holder").trigger("finish").trigger("configuration", {
                items: {
                    visible: {
                        min: 1,
                        max: s
                    }
                }
            }).trigger("updateSizes")
        })
    }
}(jQuery), jQuery(window).on("load fusion-reinit-related-posts-carousel fusion-reinit-carousels fusion-element-render-fusion_images fusion-element-render-fusion_featured_products_slider fusion-element-render-fusion_products_slider fusion-element-render-fusion_portfolio fusion-element-render-fusion_tb_related fusion-element-render-fusion_tb_woo_related fusion-element-render-fusion_tb_woo_upsells fusion-element-render-fusion_post_cards fusion-column-resized", function(e, i) {
    generateCarousel(i)
}), jQuery(window).on("fusion-element-render-fusion_images", function(e, i) {
    var s = !!jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin") && parseFloat(jQuery('li[data-parent-cid="' + i + '"]').parents(".fusion-carousel").data("itemmargin"));
    !1 !== s && jQuery('li[data-parent-cid="' + i + '"]').css("margin-left", s + "px"), jQuery('li[data-parent-cid="' + i + '"], li[data-parent-cid="' + i + '"] .fusion-carousel-item-wrapper').css("visibility", "inherit")
}), jQuery(window).on("fusion-dynamic-content-render", function(e, i) {
    0 < jQuery(i).find(".fusion-carousel").length && generateCarousel()
}), jQuery(document).ready(function() {
    jQuery(window).on("fusion-resize-horizontal", function() {
        jQuery(".fusion-carousel-responsive").fusion_responsive_columns_carousel(), jQuery(".fusion-carousel").fusion_recalculate_carousel()
    })
});