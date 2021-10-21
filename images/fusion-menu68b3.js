var fusionNavClickExpandBtn = function(e) {
        var n = jQuery(e).parent();
        n.toggleClass("expanded"), n.attr("aria-expanded", "false" === n.attr("aria-expanded") ? "true" : "false"), fusionNavMobilePosition(n[0])
    },
    fusionNavClickExpandSubmenuBtn = function(e) {
        var n = jQuery(e),
            s = n.closest("nav"),
            a = n.parent();
        s.find(".fusion-open-nav-submenu").each(function(n, s) {
            var a = jQuery(s);
            a.parent().find(e).length || (a.attr("aria-expanded", "false"), a.parent("li").removeClass("expanded"))
        }), n.attr("aria-expanded", "false" === n.attr("aria-expanded") ? "true" : "false"), "true" === n.attr("aria-expanded") ? (a.addClass("expanded"), a.hasClass("fusion-megamenu-menu") && "undefined" != typeof fusionNavMegamenuPosition && fusionNavMegamenuPosition(a), s.hasClass("submenu-mode-flyout") && !s.hasClass("collapse-enabled") && (s.addClass("flyout-submenu-expanded"), s.parents(".fusion-row").last().addClass("fusion-row-on-top"), jQuery(document).on("keyup.fusion_flyout", function(e) {
            "Escape" === e.key && n.trigger("click")
        }), 0 < a.find(".fusion-search-form-content").length && setTimeout(function() {
            a.find(".fusion-search-form-content input.s").focus()
        }, 100), jQuery("body").hasClass("fusion-builder-live") && jQuery("body").hasClass("avada-footer-fx-parallax-effect") && jQuery("body").addClass("avada-flyout-submenu-active"))) : (a.removeClass("expanded"), n.blur(), s.hasClass("submenu-mode-flyout") && (s.removeClass("flyout-submenu-expanded"), s.parents(".fusion-row").last().removeClass("fusion-row-on-top"), jQuery(document).off("keyup.fusion_flyout"), jQuery("body").hasClass("avada-flyout-submenu-active") && jQuery("body").removeClass("avada-flyout-submenu-active"))), fusionNavSubmenuDirection(a)
    },
    fusionNavMobilePosition = function(e) {
        var n = jQuery(e),
            s = n.children("ul");
        n.hasClass("mobile-size-full-absolute") && s.offset({
            left: 0
        }).css("width", "calc(100vw - " + avadaGetScrollBarWidth() + "px")
    },
    fusionNavSubmenuDirection = function(e) {
        var n, s, a, u = jQuery(e),
            o = u.closest(".fusion-row"),
            t = o.offset().left,
            i = t + o.width(),
            r = u.closest("nav"),
            l = u.children("ul"),
            f = r.hasClass("direction-row"),
            c = r.hasClass("expand-left"),
            d = u.closest(".fusion-megamenu-wrapper").length,
            m = f && u.parent()[0] === r.children("ul")[0];
        l && !d && !r.hasClass("submenu-mode-flyout") && l.length && (jQuery("body").hasClass("side-header") && 0 < r.closest("#side-header.fusion-tb-header").length || (l.css({
            left: "",
            right: ""
        }), a = (n = l.offset().left) + (s = l.width()), c && n < t ? m ? l.css("right", -1 * s + l.parent().width()) : l.css("right", -1 * s) : !c && a > i && (m ? l.css("left", -1 * s + l.parent().width()) : l.css("left", -1 * s)), !m && f && u.width() > 2 * l.width() && u.addClass("reposition-arrows")))
    },
    fusionNavSearchOverlay = function(e) {
        var n = jQuery(e).closest("nav");
        n.toggleClass("has-search-overlay"), n.addClass("menu-element-search-transition"), setTimeout(function() {
            n.removeClass("menu-element-search-transition")
        }, n.data("transition-time")), n.hasClass("has-search-overlay") ? (n.find("> .fusion-overlay-search input[type=search]").focus(), n.find(".fusion-menu-icon-search").attr("aria-expanded", "true")) : n.find(".fusion-menu-icon-search").attr("aria-expanded", "false")
    },
    fusionNavCloseFlyoutSub = function(e) {
        var n = jQuery(e).parent();
        fusionNavClickExpandSubmenuBtn(n.find(".menu-item-has-children.expanded > .fusion-open-nav-submenu"))
    },
    fusionNavAltArrowsClass = function(e) {
        var n;
        (jQuery(e).hasClass("dropdown-arrows-both") || jQuery(e).hasClass("dropdown-arrows-child")) && ((n = jQuery(e).find("ul.sub-menu li:first-child")).on("mouseenter mouseleave focus", function(e) {
            var n = jQuery(this).closest("ul.sub-menu").parent();
            n.hasClass("custom-menu-search") || jQuery(this).closest("ul.sub-menu").hasClass("avada-custom-menu-item-contents") || ("mouseenter" === e.handleObj.origType ? (n.addClass("alt-arrow-child-color"), n.children("a").addClass("hover")) : "mouseleave" === e.handleObj.origType ? (n.removeClass("alt-arrow-child-color"), n.children("a").removeClass("hover")) : n.toggleClass("alt-arrow-child-color"))
        }), n.each(function(e, n) {
            jQuery(n).hasClass("current-menu-item") && jQuery(n).closest("ul.sub-menu").parent().toggleClass("alt-arrow-child-color")
        }))
    },
    fusionNavRunAll = function() {
        var e = jQuery(".fusion-menu-element-wrapper.expand-method-hover:not(.submenu-mode-flyout) .menu-item-has-children:not(.fusion-megamenu-menu)");
        e.each(function() {
            fusionNavSubmenuDirection(this)
        }), e.on("mouseenter", function() {
            fusionNavSubmenuDirection(this)
        }), jQuery(".fusion-open-nav-submenu-on-click").parent().each(function() {
            fusionNavSubmenuDirection(this)
        }), jQuery(".fusion-menu-element-wrapper .custom-menu-search-dropdown .fusion-main-menu-icon").on("click", function(e) {
            var n = jQuery(this),
                s = n.parent();
            e.preventDefault(), n.closest(".fusion-menu-element-wrapper").hasClass("submenu-mode-flyout") ? n.siblings(".fusion-open-nav-submenu-on-click").trigger("click") : (s.toggleClass("expanded"), fusionNavSubmenuDirection(s)), s.hasClass("expanded") ? setTimeout(function() {
                s.find("input[type=search]").focus()
            }, 100) : n.blur()
        }), jQuery(".fusion-menu-element-wrapper.submenu-mode-flyout:not(.dropdown-carets-yes) .fusion-custom-menu > li.menu-item-has-children > a:not(.fusion-main-menu-icon)").on("click", function(e) {
            e && e.preventDefault(), jQuery(this).next(".fusion-open-nav-submenu-on-click").trigger("click")
        }), jQuery("html").on("mouseenter", ".fusion-no-touch .fusion-menu-element-wrapper.submenu-mode-flyout:not(.collapse-enabled) .sub-menu .menu-item a", function() {
            var e = jQuery(this),
                n = e.parent();
            void 0 !== n.data("item-id") && (e.closest(".fusion-menu").find(".fusion-flyout-menu-backgrounds").addClass("fusion-flyout-menu-backgrounds-active").find("#item-bg-" + n.data("item-id")).addClass("active"), e.closest(".sub-menu").addClass("fusion-transparent-bg"))
        }), jQuery("html").on("mouseleave", ".fusion-no-touch .fusion-menu-element-wrapper.submenu-mode-flyout:not(.collapse-enabled) .sub-menu .menu-item a", function() {
            var e = jQuery(this),
                n = e.parent();
            void 0 !== n.data("item-id") && (e.closest(".fusion-menu").find(".fusion-flyout-menu-backgrounds").removeClass("fusion-flyout-menu-backgrounds-active").find("#item-bg-" + n.data("item-id")).removeClass("active"), e.closest(".sub-menu").removeClass("fusion-transparent-bg"))
        }), jQuery(".fusion-menu-element-wrapper:not(.submenu-mode-flyout) a").on("click", function(e) {
            var n = jQuery(this).closest(".fusion-menu-element-wrapper");
            void 0 !== this.attributes.href && "#" !== this.attributes.href.value || ((n.hasClass("expand-method-click") || n.hasClass("collapse-enabled")) && jQuery(this).siblings(".fusion-open-nav-submenu-on-click").trigger("click"), e.preventDefault())
        }), jQuery(".fusion-menu-element-wrapper").each(function(e, n) {
            var s = jQuery(n);
            s.hasClass("collapse-enabled") && (s.hasClass("mobile-size-full-absolute") || s.hasClass("mobile-size-relative")) && s.hasClass("mobile-mode-collapse-to-button") && jQuery(n).children("ul").offset({
                left: 0
            })
        }), jQuery('.fusion-menu-element-wrapper a[href^="#"]').on("click", function() {
            var e = jQuery(this.hash),
                n = jQuery(this).closest(".fusion-menu-element-wrapper");
            n.hasClass("collapse-enabled") && (n.hasClass("mobile-size-full-absolute") || n.hasClass("mobile-size-column-absolute")) && e.length && "" !== this.hash.slice(1) && n.find(".avada-menu-mobile-menu-trigger").trigger("click")
        })
    },
    fusionAdjustNavMobilePosition = function() {
        setTimeout(function() {
            fusionNavMobilePosition(jQuery('.fusion-menu-element-wrapper.expanded[aria-expanded="true"]'))
        }, 50)
    };
jQuery(window).on("load", function() {
    jQuery(".fusion-menu-element-wrapper").each(function(e, n) {
        fusionNavAltArrowsClass(n), fusionNavIsCollapsed(n)
    }), jQuery(".fusion-menu-element-wrapper .fusion-menu-icon-search.trigger-overlay, .fusion-menu-element-wrapper .fusion-close-search").on("click", function(e) {
        e && e.preventDefault(), fusionNavSearchOverlay(this)
    })
}), jQuery(window).on("fusion-element-render-fusion_menu", function(e, n) {
    var s = jQuery('[data-cid="' + n + '"] .fusion-menu-element-wrapper');
    fusionNavRunAll(), s.length && fusionNavIsCollapsed(s[0])
}), jQuery(window).on("fusion-mobile-menu-collapsed", function() {
    jQuery('.fusion-menu-element-wrapper.mobile-mode-collapse-to-button.mobile-size-full-absolute[aria-expanded="false"]').children("ul").offset({
        left: 0
    })
}), jQuery(document).ready(fusionNavRunAll), jQuery(window).on("fusion-sticky-change fusion-resize-horizontal", fusionAdjustNavMobilePosition), jQuery(document.body).on("wc_fragments_refreshed wc_fragments_loaded", function() {
    jQuery(".menu-item-type-custom.fusion-menu-cart").each(function() {
        0 !== jQuery(this).children("ul.sub-menu").length && (jQuery(this).children("ul.sub-menu").hasClass("avada-custom-menu-item-contents-empty") ? jQuery(this).removeClass("menu-item-has-children").addClass("empty-cart") : (jQuery(this).addClass("menu-item-has-children").removeClass("empty-cart"), fusionNavSubmenuDirection(jQuery(this))))
    })
});