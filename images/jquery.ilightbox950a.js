! function($, window, undefined) {
    var extensions = {
            flash: ["swf"],
            image: ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "tif", "jfif", "jpe", "webp"],
            iframe: ["asp", "aspx", "cgi", "cfm", "htm", "html", "jsp", "php", "pl", "php3", "php4", "php5", "phtml", "rb", "rhtml", "shtml", "txt"],
            video: ["avi", "mov", "mpg", "mpeg", "movie", "mp4", "webm", "ogv", "ogg", "3gp", "m4v"]
        },
        $win = $(window),
        $doc = $(document),
        browser, transform, gpuAcceleration, fullScreenApi = "",
        userAgent = navigator.userAgent || navigator.vendor || window.opera,
        supportTouch = "ontouchstart" in window || navigator.msMaxTouchPoints,
        isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4)),
        clickEvent = supportTouch ? "click itap" : "click",
        touchStartEvent = supportTouch ? "mousedown.iLightBox touchstart.iLightBox" : "mousedown.iLightBox",
        touchStopEvent = supportTouch ? "mouseup.iLightBox touchend.iLightBox" : "mouseup.iLightBox",
        touchMoveEvent = supportTouch ? "mousemove.iLightBox touchmove.iLightBox" : "mousemove.iLightBox",
        abs = Math.abs,
        sqrt = Math.sqrt,
        round = Math.round,
        max = Math.max,
        min = Math.min,
        floor = Math.floor,
        random = Math.random,
        pluginspages = {
            quicktime: "http://www.apple.com/quicktime/download",
            flash: "http://www.adobe.com/go/getflash"
        },
        iLightBox = function(e, t, o, i) {
            var n = this;
            if (n.options = t, n.selector = e.selector || e, n.context = e.context, n.instant = i, o.length < 1 ? n.attachItems() : n.items = o, n.vars = {
                    total: n.items.length,
                    start: 0,
                    current: null,
                    next: null,
                    prev: null,
                    BODY: $("body"),
                    loadRequests: 0,
                    overlay: $('<div class="ilightbox-overlay"></div>'),
                    loader: $('<div class="ilightbox-loader"><div></div></div>'),
                    toolbar: $('<div class="ilightbox-toolbar"></div>'),
                    innerToolbar: $('<div class="ilightbox-inner-toolbar"></div>'),
                    title: $('<div class="ilightbox-title"></div>'),
                    closeButton: $('<a class="ilightbox-close" role="button" title="' + n.options.text.close + '"></a>'),
                    fullScreenButton: $('<a class="ilightbox-fullscreen" role="button" title="' + n.options.text.enterFullscreen + '"></a>'),
                    innerPlayButton: $('<a class="ilightbox-play" role="button" title="' + n.options.text.slideShow + '"></a>'),
                    innerNextButton: $('<a class="ilightbox-next-button" role="button" title="' + n.options.text.next + '"></a>'),
                    innerPrevButton: $('<a class="ilightbox-prev-button" role="button" title="' + n.options.text.previous + '"></a>'),
                    holder: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + '" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-next" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    prevPhoto: $('<div class="ilightbox-holder' + (supportTouch ? " supportTouch" : "") + ' ilightbox-prev" ondragstart="return false;"><div class="ilightbox-container"></div></div>'),
                    nextButton: $('<a class="ilightbox-button ilightbox-next-button" role="button" ondragstart="return false;" title="' + n.options.text.next + '"><span></span></a>'),
                    prevButton: $('<a class="ilightbox-button ilightbox-prev-button" role="button" ondragstart="return false;" title="' + n.options.text.previous + '"><span></span></a>'),
                    thumbnails: $('<div class="ilightbox-thumbnails" ondragstart="return false;"><div class="ilightbox-thumbnails-container"><a class="ilightbox-thumbnails-dragger"></a><div class="ilightbox-thumbnails-grid"></div></div></div>'),
                    thumbs: !1,
                    nextLock: !1,
                    prevLock: !1,
                    hashLock: !1,
                    isMobile: !1,
                    mobileMaxWidth: 980,
                    isInFullScreen: !1,
                    isSwipe: !1,
                    mouseID: 0,
                    cycleID: 0,
                    isPaused: 0
                }, n.vars.hideableElements = n.vars.nextButton.add(n.vars.prevButton), n.normalizeItems(), n.availPlugins(), n.options.startFrom = n.options.startFrom > 0 && n.options.startFrom >= n.vars.total ? n.vars.total - 1 : n.options.startFrom, n.options.startFrom = n.options.randomStart ? floor(random() * n.vars.total) : n.options.startFrom, n.vars.start = n.options.startFrom, i ? n.instantCall() : n.patchItemsEvents(), n.options.linkId && (n.hashChangeHandler(), $win.iLightBoxHashChange(function() {
                    n.hashChangeHandler()
                })), supportTouch) {
                var a = /(click|mouseenter|mouseleave|mouseover|mouseout)/gi;
                n.options.caption.show = n.options.caption.show.replace(a, "itap"), n.options.caption.hide = n.options.caption.hide.replace(a, "itap"), n.options.social.show = n.options.social.show.replace(a, "itap"), n.options.social.hide = n.options.social.hide.replace(a, "itap")
            }
            n.options.controls.arrows && $.extend(n.options.styles, {
                nextOffsetX: 0,
                prevOffsetX: 0,
                nextOpacity: 0,
                prevOpacity: 0
            })
        };

    function getPixel(e, t) {
        return parseInt(e.css(t), 10) || 0
    }

    function within(e, t, o) {
        return e < t ? t : e > o ? o : e
    }

    function getViewport() {
        var e = window,
            t = "inner";
        return "innerWidth" in window || (t = "client", e = document.documentElement || document.body), {
            width: e[t + "Width"],
            height: e[t + "Height"]
        }
    }

    function removeHash() {
        var e = getScrollXY();
        window.location.hash = "", window.scrollTo(e.x, e.y)
    }

    function doAjax(e, t) {
        e = "//ilightbox.net/getSource/jsonp.php?url=" + encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
        $.ajax({
            url: e,
            dataType: "jsonp"
        }), iLCallback = function(e) {
            t.call(this, e)
        }
    }

    function findImageInElement(e) {
        var t = $("*", e),
            o = new Array;
        return t.each(function() {
            var e = "";
            if ("none" != $(this).css("background-image") ? e = $(this).css("background-image") : void 0 !== $(this).attr("src") && "img" == this.nodeName.toLowerCase() && (e = $(this).attr("src")), -1 == e.indexOf("gradient"))
                for (var t = (e = (e = (e = (e = e.replace(/url\(\"/g, "")).replace(/url\(/g, "")).replace(/\"\)/g, "")).replace(/\)/g, "")).split(","), i = 0; i < t.length; i++)
                    if (t[i].length > 0 && -1 == $.inArray(t[i], o)) {
                        var n = "";
                        browser.msie && browser.version < 9 && (n = "?" + floor(3e3 * random())), o.push(t[i] + n)
                    }
        }), o
    }

    function getExtension(e) {
        var t = e.split(".").pop().toLowerCase(),
            o = -1 !== t.indexOf("?") ? "?" + t.split("?").pop() : "";
        return t.replace(o, "")
    }

    function getTypeByExtension(e) {
        var t = getExtension(e);
        return -1 !== extensions.image.indexOf(t) ? "image" : -1 !== extensions.flash.indexOf(t) ? "flash" : -1 !== extensions.video.indexOf(t) ? "video" : "iframe"
    }

    function percentToValue(e, t) {
        return parseInt(t / 100 * e)
    }

    function parseURI(e) {
        var t = String(e).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        return t ? {
            href: t[0] || "",
            protocol: t[1] || "",
            authority: t[2] || "",
            host: t[3] || "",
            hostname: t[4] || "",
            port: t[5] || "",
            pathname: t[6] || "",
            search: t[7] || "",
            hash: t[8] || ""
        } : null
    }

    function absolutizeURI(e, t) {
        var o, i;
        return t = parseURI(t || ""), e = parseURI(e || ""), t && e ? (t.protocol || e.protocol) + (t.protocol || t.authority ? t.authority : e.authority) + (o = t.protocol || t.authority || "/" === t.pathname.charAt(0) ? t.pathname : t.pathname ? (e.authority && !e.pathname ? "/" : "") + e.pathname.slice(0, e.pathname.lastIndexOf("/") + 1) + t.pathname : e.pathname, i = [], o.replace(/^(\.\.?(\/|$))+/, "").replace(/\/(\.(\/|$))+/g, "/").replace(/\/\.\.$/, "/../").replace(/\/?[^\/]*/g, function(e) {
            "/.." === e ? i.pop() : i.push(e)
        }), i.join("").replace(/^\//, "/" === o.charAt(0) ? "/" : "")) + (t.protocol || t.authority || t.pathname ? t.search : t.search || e.search) + t.hash : null
    }

    function version_compare(e, t, o) {
        this.php_js = this.php_js || {}, this.php_js.ENV = this.php_js.ENV || {};
        var i, n = 0,
            a = 0,
            r = {
                dev: -6,
                alpha: -5,
                a: -5,
                beta: -4,
                b: -4,
                RC: -3,
                rc: -3,
                "#": -2,
                p: 1,
                pl: 1
            },
            s = function(e) {
                return (e = (e = ("" + e).replace(/[_\-+]/g, ".")).replace(/([^.\d]+)/g, ".$1.").replace(/\.{2,}/g, ".")).length ? e.split(".") : [-8]
            },
            l = function(e) {
                return e ? isNaN(e) ? r[e] || -7 : parseInt(e, 10) : 0
            };
        for (e = s(e), t = s(t), i = max(e.length, t.length), n = 0; n < i; n++)
            if (e[n] != t[n]) {
                if (e[n] = l(e[n]), t[n] = l(t[n]), e[n] < t[n]) {
                    a = -1;
                    break
                }
                if (e[n] > t[n]) {
                    a = 1;
                    break
                }
            }
        if (!o) return a;
        switch (o) {
            case ">":
            case "gt":
                return a > 0;
            case ">=":
            case "ge":
                return a >= 0;
            case "<=":
            case "le":
                return a <= 0;
            case "==":
            case "=":
            case "eq":
                return 0 === a;
            case "<>":
            case "!=":
            case "ne":
                return 0 !== a;
            case "":
            case "<":
            case "lt":
                return a < 0;
            default:
                return null
        }
    }

    function getScrollXY() {
        var e = 0,
            t = 0;
        return "number" == typeof window.pageYOffset ? (t = window.pageYOffset, e = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (t = document.body.scrollTop, e = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (t = document.documentElement.scrollTop, e = document.documentElement.scrollLeft), {
            x: e,
            y: t
        }
    }
    iLightBox.prototype = {
            showLoader: function() {
                var e = this;
                e.vars.loadRequests += 1, "horizontal" == e.options.path.toLowerCase() ? e.vars.loader.addClass("ilightbox-show").stop().animate({
                    top: "-30px"
                }, e.options.show.speed, "easeOutCirc") : e.vars.loader.addClass("ilightbox-show").stop().animate({
                    left: "-30px"
                }, e.options.show.speed, "easeOutCirc")
            },
            hideLoader: function() {
                var e = this;
                e.vars.loadRequests -= 1, e.vars.loadRequests = e.vars.loadRequests < 0 ? 0 : e.vars.loadRequests, "horizontal" == e.options.path.toLowerCase() ? e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({
                    top: "-192px"
                }, e.options.show.speed, "easeInCirc") : e.vars.loadRequests <= 0 && e.vars.loader.removeClass("ilightbox-show").stop().animate({
                    left: "-192px"
                }, e.options.show.speed, "easeInCirc")
            },
            createUI: function() {
                var e = this;
                e.ui = {
                    currentElement: e.vars.holder,
                    nextElement: e.vars.nextPhoto,
                    prevElement: e.vars.prevPhoto,
                    currentItem: e.vars.current,
                    nextItem: e.vars.next,
                    prevItem: e.vars.prev,
                    hide: function() {
                        e.closeAction()
                    },
                    refresh: function() {
                        arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto()
                    },
                    fullscreen: function() {
                        e.fullScreenAction()
                    }
                }
            },
            attachItems: function() {
                var iL = this,
                    itemsObject = new Array,
                    items = new Array;
                $(iL.selector, iL.context).each(function() {
                    var t = $(this),
                        URL = t.attr(iL.options.attr) || null,
                        options = t.data("options") && eval("({" + t.data("options") + "})") || {},
                        caption = t.data("caption"),
                        title = t.data("title"),
                        type = t.data("type") || getTypeByExtension(URL);
                    items.push({
                        URL: URL,
                        caption: caption,
                        title: title,
                        type: type,
                        options: options
                    }), iL.instant || itemsObject.push(t)
                }), iL.items = items, iL.itemsObject = itemsObject, iL.vars && (iL.vars.total = items.length)
            },
            normalizeItems: function() {
                var e = this,
                    t = new Array;
                $.each(e.items, function(o, i) {
                    "string" == typeof i && (i = {
                        url: i
                    });
                    var n = i.url || i.URL || null,
                        a = i.options || {},
                        r = i.caption || null,
                        s = i.title || null,
                        l = i.type ? i.type.toLowerCase() : getTypeByExtension(n),
                        c = "object" != typeof n ? getExtension(n) : "";
                    if (a.thumbnail = a.thumbnail || ("image" == l ? n : null), a.videoType = a.videoType || null, a.skin = a.skin || e.options.skin, a.width = a.width || null, a.height = a.height || null, a.mousewheel = void 0 === a.mousewheel || a.mousewheel, a.swipe = void 0 === a.swipe || a.swipe, a.social = void 0 !== a.social ? a.social : e.options.social.buttons && $.extend({}, {}, e.options.social.buttons), "video" == l && (a.html5video = void 0 !== a.html5video ? a.html5video : {}, a.html5video.webm = a.html5video.webm || a.html5video.WEBM || null, a.html5video.controls = void 0 !== a.html5video.controls ? a.html5video.controls : "controls", a.html5video.preload = a.html5video.preload || "metadata", a.html5video.autoplay = void 0 !== a.html5video.autoplay && a.html5video.autoplay), "iframe" === l)
                        if (-1 !== n.indexOf("youtube.com")) {
                            var u = n.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
                            u && 11 === u[7].length && (a.thumbnail = "//img.youtube.com/vi/" + u[7] + "/mqdefault.jpg")
                        } else if (-1 !== n.indexOf("vimeo.com") && -1 === n.indexOf("preview=0")) {
                        var h = n.split(/[?#]/)[0];
                        h.replace(/[^\d]/g, "");
                        $.getJSON("https://vimeo.com/api/oembed.json?url=" + h, {
                            format: "json"
                        }, function(e) {
                            a.thumbnail = e.thumbnail_url
                        })
                    }
                    a.width && a.height || "video" !== l && "iframe" !== l && "flash" !== l || (a.width = parseInt(fusionLightboxVideoVars.lightbox_video_width), a.height = parseInt(fusionLightboxVideoVars.lightbox_video_height)), delete i.url, i.index = o, i.URL = n, i.caption = r, i.title = s, i.type = l, i.options = a, i.ext = c, t.push(i)
                }), e.items = t
            },
            instantCall: function() {
                var e = this,
                    t = e.vars.start;
                e.vars.current = t, e.vars.next = e.items[t + 1] ? t + 1 : null, e.vars.prev = e.items[t - 1] ? t - 1 : null, e.addContents(), e.patchEvents()
            },
            addContents: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = getViewport(),
                    n = o.path.toLowerCase(),
                    a = t.total > 0 && e.items.filter(function(e, t, i) {
                        return -1 === ["image", "flash", "video"].indexOf(e.type) && void 0 === e.recognized && (o.smartRecognition || e.options.smartRecognition)
                    }),
                    r = a.length > 0;
                o.mobileOptimizer && !o.innerToolbar && (t.isMobile = i.width <= t.mobileMaxWidth), t.overlay.addClass(o.skin).hide().css("opacity", o.overlay.opacity), o.linkId && t.overlay[0].setAttribute("linkid", o.linkId), o.controls.toolbar && (t.toolbar.addClass(o.skin).append(t.closeButton), o.controls.fullscreen && t.toolbar.append(t.fullScreenButton), o.controls.slideshow && t.toolbar.append(t.innerPlayButton), t.total > 1 && t.toolbar.append(t.innerPrevButton).append(t.innerNextButton)), t.BODY.addClass("ilightbox-noscroll").append(t.overlay).append(t.loader).append(t.holder).append(t.nextPhoto).append(t.prevPhoto), o.innerToolbar || t.BODY.append(t.toolbar), o.controls.arrows && t.BODY.append(t.nextButton).append(t.prevButton), o.controls.thumbnail && t.total > 1 && (t.BODY.append(t.thumbnails), t.thumbnails.addClass(o.skin).addClass("ilightbox-" + n), $("div.ilightbox-thumbnails-grid", t.thumbnails).empty(), t.thumbs = !0);
                var s = "horizontal" == o.path.toLowerCase() ? {
                    left: parseInt(i.width / 2 - t.loader.outerWidth() / 2)
                } : {
                    top: parseInt(i.height / 2 - t.loader.outerHeight() / 2)
                };
                t.loader.addClass(o.skin).css(s), t.nextButton.add(t.prevButton).addClass(o.skin), "horizontal" == n && t.loader.add(t.nextButton).add(t.prevButton).addClass("horizontal"), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), o.infinite || (t.prevButton.add(t.prevButton).add(t.innerPrevButton).add(t.innerNextButton).removeClass("disabled"), 0 == t.current && t.prevButton.add(t.innerPrevButton).addClass("disabled"), t.current >= t.total - 1 && t.nextButton.add(t.innerNextButton).addClass("disabled")), o.show.effect ? (t.overlay.stop().fadeIn(o.show.speed), t.toolbar.stop().fadeIn(o.show.speed)) : (t.overlay.show(), t.toolbar.show());
                var l = a.length;
                r ? (e.showLoader(), $.each(a, function(i, n) {
                    e.ogpRecognition(this, function(i) {
                        var n = -1,
                            a = (e.items.filter(function(e, t, o) {
                                return e.URL == i.url && (n = t), e.URL == i.url
                            }), e.items[n]);
                        i && $.extend(!0, a, {
                            URL: i.source,
                            type: i.type,
                            recognized: !0,
                            options: {
                                html5video: i.html5video,
                                width: "image" == i.type ? 0 : i.width || a.width,
                                height: "image" == i.type ? 0 : i.height || a.height,
                                thumbnail: a.options.thumbnail || i.thumbnail
                            }
                        }), 0 == --l && (e.hideLoader(), t.dontGenerateThumbs = !1, e.generateThumbnails(), o.show.effect ? setTimeout(function() {
                            e.generateBoxes()
                        }, o.show.speed) : e.generateBoxes())
                    })
                })) : o.show.effect ? setTimeout(function() {
                    e.generateBoxes()
                }, o.show.speed) : e.generateBoxes(), e.createUI(), window.iLightBox = {
                    close: function() {
                        e.closeAction()
                    },
                    fullscreen: function() {
                        e.fullScreenAction()
                    },
                    moveNext: function() {
                        e.moveTo("next")
                    },
                    movePrev: function() {
                        e.moveTo("prev")
                    },
                    goTo: function(t) {
                        e.goTo(t)
                    },
                    refresh: function() {
                        e.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? e.repositionPhoto(!0) : e.repositionPhoto()
                    },
                    setOption: function(t) {
                        e.setOption(t)
                    },
                    destroy: function() {
                        e.closeAction(), e.dispatchItemsEvents()
                    }
                }, o.linkId && (t.hashLock = !0, window.location.hash = o.linkId + "/" + t.current, setTimeout(function() {
                    t.hashLock = !1
                }, 55)), o.slideshow.startPaused || (e.resume(), t.innerPlayButton.removeClass("ilightbox-play").addClass("ilightbox-pause")), "function" == typeof e.options.callback.onOpen && e.options.callback.onOpen.call(e)
            },
            loadContent: function(e, t, o) {
                var i, n, a = this;
                switch (a.createUI(), e.speed = o || a.options.effects.loadedFadeSpeed, "current" == t && (e.options.mousewheel ? a.vars.lockWheel = !1 : a.vars.lockWheel = !0, e.options.swipe ? a.vars.lockSwipe = !1 : a.vars.lockSwipe = !0), t) {
                    case "current":
                        i = a.vars.holder, n = a.vars.current;
                        break;
                    case "next":
                        i = a.vars.nextPhoto, n = a.vars.next;
                        break;
                    case "prev":
                        i = a.vars.prevPhoto, n = a.vars.prev
                }
                if (i.removeAttr("style class").addClass("ilightbox-holder" + (supportTouch ? " supportTouch" : "")).addClass(e.options.skin), $("div.ilightbox-inner-toolbar", i).remove(), e.title || a.options.innerToolbar) {
                    var r = a.vars.innerToolbar.clone();
                    if (e.title && a.options.show.title) {
                        var s = a.vars.title.clone();
                        s.empty().html(e.title), r.append(s)
                    }
                    a.options.innerToolbar && r.append(a.vars.total > 1 ? a.vars.toolbar.clone() : a.vars.toolbar), i.prepend(r)
                }
                a.loadSwitcher(e, i, n, t)
            },
            loadSwitcher: function(e, t, o, i) {
                var n = this,
                    a = n.options,
                    r = {
                        element: t,
                        position: o
                    };
                switch (e.type) {
                    case "image":
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(e.URL, function(s) {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r);
                            var l = s ? s.width : 400,
                                c = s ? s.height : 200;
                            t.data({
                                naturalWidth: l,
                                naturalHeight: c
                            }), $("div.ilightbox-container", t).empty().append(s ? '<img src="' + e.URL + '" class="ilightbox-image" />' : '<span class="ilightbox-alert">' + a.errors.loadImage + "</span>"), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t)
                        });
                        break;
                    case "video":
                        t.data({
                            naturalWidth: e.options.width,
                            naturalHeight: e.options.height
                        }), n.addContent(t, e), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t);
                        break;
                    case "iframe":
                        for (var s = e.URL.substring(e.URL.indexOf("?") + 1).split("&"), l = {}, c = 0; c < s.length; ++c) {
                            var u = s[c].split("=");
                            2 == u.length && ("w" == u[0] && (u[0] = "width"), "h" == u[0] && (u[0] = "height"), l[u[0]] = decodeURIComponent(u[1].replace(/\+/g, " ")))
                        }
                        n.showLoader(), t.data({
                            naturalWidth: e.options.width,
                            naturalHeight: e.options.height
                        });
                        var h = n.addContent(t, e);
                        "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.configureHolder(e, i, t), h.on("load", function() {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.hideLoader(), h.off("load")
                        });
                        break;
                    case "inline":
                        h = $(e.URL);
                        var d = n.addContent(t, e),
                            p = findImageInElement(t);
                        t.data({
                            naturalWidth: n.items[o].options.width || h.outerWidth(),
                            naturalHeight: n.items[o].options.height || h.outerHeight()
                        }), d.children().eq(0).show(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(p, function() {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, i, t)
                        });
                        break;
                    case "flash":
                        h = n.addContent(t, e);
                        t.data({
                            naturalWidth: n.items[o].options.width || h.outerWidth(),
                            naturalHeight: n.items[o].options.height || h.outerHeight()
                        }), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r), n.configureHolder(e, i, t);
                        break;
                    case "ajax":
                        var f = e.options.ajax || {};
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.showLoader(), $.ajax({
                            url: e.URL || a.ajaxSetup.url,
                            data: f.data || null,
                            dataType: f.dataType || "html",
                            type: f.type || a.ajaxSetup.type,
                            cache: f.cache || a.ajaxSetup.cache,
                            crossDomain: f.crossDomain || a.ajaxSetup.crossDomain,
                            global: f.global || a.ajaxSetup.global,
                            ifModified: f.ifModified || a.ajaxSetup.ifModified,
                            username: f.username || a.ajaxSetup.username,
                            password: f.password || a.ajaxSetup.password,
                            beforeSend: f.beforeSend || a.ajaxSetup.beforeSend,
                            complete: f.complete || a.ajaxSetup.complete
                        }).done(function(s, l, c) {
                            n.hideLoader();
                            var u = $(s),
                                h = $("div.ilightbox-container", t),
                                d = n.items[o].options.width || parseInt(u[0].getAttribute("width")),
                                p = n.items[o].options.height || parseInt(u[0].getAttribute("height")),
                                g = u[0].getAttribute("width") && u[0].getAttribute("height") ? {
                                    overflow: "hidden"
                                } : {};
                            h.empty().append($('<div class="ilightbox-wrapper"></div>').css(g).html(u)), t.show().data({
                                naturalWidth: d || h.outerWidth(),
                                naturalHeight: p || h.outerHeight()
                            }).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                            var m = findImageInElement(t);
                            n.loadImage(m, function() {
                                "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.configureHolder(e, i, t)
                            }), a.ajaxSetup.success(s, l, c), "function" == typeof f.success && f.success(s, l, c)
                        }).fail(function(s, l, c) {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), n.hideLoader(), $("div.ilightbox-container", t).empty().append('<span class="ilightbox-alert">' + a.errors.loadContents + "</span>"), n.configureHolder(e, i, t), a.ajaxSetup.error(s, l, c), "function" == typeof f.error && f.error(s, l, c)
                        });
                        break;
                    case "html":
                        var g = e.URL;
                        if (container = $("div.ilightbox-container", t), g[0].nodeName) h = g.clone();
                        else {
                            var m = $(g);
                            h = m.selector ? $("<div>" + m + "</div>") : m
                        }
                        var v = n.items[o].options.width || parseInt(h.attr("width")),
                            b = n.items[o].options.height || parseInt(h.attr("height"));
                        n.addContent(t, e), h.appendTo(document.documentElement).hide(), "function" == typeof a.callback.onRender && a.callback.onRender.call(n, n.ui, o), "function" == typeof e.options.onRender && e.options.onRender.call(n, r);
                        p = findImageInElement(t);
                        "function" == typeof a.callback.onBeforeLoad && a.callback.onBeforeLoad.call(n, n.ui, o), "function" == typeof e.options.onBeforeLoad && e.options.onBeforeLoad.call(n, r), n.loadImage(p, function() {
                            "function" == typeof a.callback.onAfterLoad && a.callback.onAfterLoad.call(n, n.ui, o), "function" == typeof e.options.onAfterLoad && e.options.onAfterLoad.call(n, r), t.show().data({
                                naturalWidth: v || container.outerWidth(),
                                naturalHeight: b || container.outerHeight()
                            }).hide(), h.remove(), n.configureHolder(e, i, t)
                        })
                }
            },
            configureHolder: function(e, t, o) {
                var i = this,
                    n = i.vars,
                    a = i.options;
                if ("current" != t && ("next" == t ? o.addClass("ilightbox-next") : o.addClass("ilightbox-prev")), "current" == t) var r = n.current;
                else if ("next" == t) {
                    var s = a.styles.nextOpacity;
                    r = n.next
                } else s = a.styles.prevOpacity, r = n.prev;
                var l = {
                    element: o,
                    position: r
                };
                i.items[r].options.width = i.items[r].options.width || 0, i.items[r].options.height = i.items[r].options.height || 0, "current" == t ? a.show.effect ? o.css(transform, gpuAcceleration).fadeIn(e.speed, function() {
                    if (o.css(transform, ""), e.caption) {
                        i.setCaption(e, o);
                        var t = $("div.ilightbox-caption", o),
                            n = parseInt(t.outerHeight() / o.outerHeight() * 100);
                        a.caption.start & n <= 50 && t.fadeIn(a.effects.fadeSpeed)
                    }
                    var s = e.options.social;
                    s && (i.setSocial(s, e.URL, o), a.social.start && $("div.ilightbox-social", o).fadeIn(a.effects.fadeSpeed)), i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)
                }) : (o.show(), i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)) : a.show.effect ? o.fadeTo(e.speed, s, function() {
                    "next" == t ? n.nextLock = !1 : n.prevLock = !1, i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)
                }) : (o.css({
                    opacity: s
                }).show(), "next" == t ? n.nextLock = !1 : n.prevLock = !1, i.generateThumbnails(), "function" == typeof a.callback.onShow && a.callback.onShow.call(i, i.ui, r), "function" == typeof e.options.onShow && e.options.onShow.call(i, l)), setTimeout(function() {
                    i.repositionPhoto()
                }, 0)
            },
            generateBoxes: function() {
                var e = this,
                    t = e.vars,
                    o = e.options;
                o.infinite && t.total >= 3 ? (t.current == t.total - 1 && (t.next = 0), 0 == t.current && (t.prev = t.total - 1)) : o.infinite = !1, e.loadContent(e.items[t.current], "current", o.show.speed), e.items[t.next] && e.loadContent(e.items[t.next], "next", o.show.speed), e.items[t.prev] && e.loadContent(e.items[t.prev], "prev", o.show.speed)
            },
            generateThumbnails: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = null;
                if (t.thumbs && !e.vars.dontGenerateThumbs) {
                    var n = t.thumbnails,
                        a = $("div.ilightbox-thumbnails-container", n),
                        r = $("div.ilightbox-thumbnails-grid", a),
                        s = 0;
                    r.removeAttr("style").empty(), $.each(e.items, function(l, c) {
                        var u = t.current == l ? "ilightbox-active" : "",
                            h = t.current == l ? o.thumbnails.activeOpacity : o.thumbnails.normalOpacity,
                            d = c.options.thumbnail,
                            p = $('<div class="ilightbox-thumbnail"></div>'),
                            f = $('<div class="ilightbox-thumbnail-icon"></div>');
                        p.css({
                            opacity: 0
                        }).addClass(u), "video" != c.type && "flash" != c.type || void 0 !== c.options.icon ? c.options.icon && (f.addClass("ilightbox-thumbnail-" + c.options.icon), p.append(f)) : (f.addClass("ilightbox-thumbnail-video"), p.append(f)), d && e.loadImage(d, function(t) {
                            s++, t ? p.data({
                                naturalWidth: t.width,
                                naturalHeight: t.height
                            }).append('<img src="' + d + '" border="0" />') : p.data({
                                naturalWidth: o.thumbnails.maxWidth,
                                naturalHeight: o.thumbnails.maxHeight
                            }), clearTimeout(i), i = setTimeout(function() {
                                e.positionThumbnails(n, a, r)
                            }, 20), setTimeout(function() {
                                p.fadeTo(o.effects.loadedFadeSpeed, h)
                            }, 20 * s)
                        }), r.append(p)
                    }), e.vars.dontGenerateThumbs = !0
                }
            },
            positionThumbnails: function(e, t, o) {
                var i = this,
                    n = i.vars,
                    a = i.options,
                    r = getViewport(),
                    s = a.path.toLowerCase();
                e || (e = n.thumbnails), t || (t = $("div.ilightbox-thumbnails-container", e)), o || (o = $("div.ilightbox-thumbnails-grid", t));
                var l = $(".ilightbox-thumbnail", o),
                    c = "horizontal" == s ? r.width - a.styles.pageOffsetX : l.eq(0).outerWidth() - a.styles.pageOffsetX,
                    u = "horizontal" == s ? l.eq(0).outerHeight() - a.styles.pageOffsetY : r.height - a.styles.pageOffsetY,
                    h = "horizontal" == s ? 0 : c,
                    d = "horizontal" == s ? u : 0,
                    p = $(".ilightbox-active", o),
                    f = {};
                arguments.length < 3 && (l.css({
                    opacity: a.thumbnails.normalOpacity
                }), p.css({
                    opacity: a.thumbnails.activeOpacity
                })), l.each(function(e) {
                    var t = $(this),
                        o = t.data(),
                        n = "horizontal" == s ? 0 : a.thumbnails.maxWidth;
                    height = "horizontal" == s ? a.thumbnails.maxHeight : 0, dims = i.getNewDimenstions(n, height, o.naturalWidth, o.naturalHeight, !0), t.css({
                        width: dims.width,
                        height: dims.height
                    }), "horizontal" == s && t.css({
                        float: "left"
                    }), "horizontal" == s ? h += t.outerWidth(!0) : d += t.outerHeight()
                }), f = {
                    width: h,
                    height: d
                }, o.css(f), f = {};
                var g = o.offset(),
                    m = p.length ? p.offset() : {
                        top: parseInt(u / 2),
                        left: parseInt(c / 2)
                    };
                g.top = g.top - $doc.scrollTop(), g.left = g.left - $doc.scrollLeft(), m.top = m.top - g.top - $doc.scrollTop(), m.left = m.left - g.left - $doc.scrollLeft(), "horizontal" == s ? (f.top = 0, f.left = parseInt(c / 2 - m.left - p.outerWidth() / 2)) : (f.top = parseInt(u / 2 - m.top - p.outerHeight() / 2), f.left = 0), arguments.length < 3 ? o.stop().animate(f, a.effects.repositionSpeed, "easeOutCirc") : o.css(f)
            },
            loadImage: function(e, t) {
                Array.isArray(e) || (e = [e]);
                var o = this,
                    i = e.length;
                i > 0 ? (o.showLoader(), $.each(e, function(n, a) {
                    var r = new Image;
                    r.onload = function() {
                        0 == (i -= 1) && (o.hideLoader(), t(r))
                    }, r.onerror = r.onabort = function() {
                        0 == (i -= 1) && (o.hideLoader(), t(!1))
                    }, r.src = e[n]
                })) : t(!1)
            },
            patchItemsEvents: function() {
                var e = this,
                    t = e.vars,
                    o = supportTouch ? "click.iL itap.iL" : "click.iL",
                    i = supportTouch ? "click.iL itap.iL" : "itap.iL";
                if (e.context && e.selector) {
                    var n = $(e.selector, e.context);
                    $(e.context).on(o, e.selector, function() {
                        var o = $(this),
                            i = n.index(o);
                        return t.current = i, t.next = e.items[i + 1] ? i + 1 : null, t.prev = e.items[i - 1] ? i - 1 : null, e.addContents(), e.patchEvents(), !1
                    }).on(i, e.selector, function() {
                        return !1
                    })
                } else $.each(e.itemsObject, function(n, a) {
                    a.on(o, function() {
                        return t.current = n, t.next = e.items[n + 1] ? n + 1 : null, t.prev = e.items[n - 1] ? n - 1 : null, e.addContents(), e.patchEvents(), !1
                    }).on(i, function() {
                        return !1
                    })
                })
            },
            dispatchItemsEvents: function() {
                var e = this;
                e.vars, e.options;
                e.context && e.selector ? $(e.context).off(".iL", e.selector) : $.each(e.itemsObject, function(e, t) {
                    t.off(".iL")
                })
            },
            refresh: function() {
                this.dispatchItemsEvents(), this.attachItems(), this.normalizeItems(), this.patchItemsEvents()
            },
            patchEvents: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = o.path.toLowerCase(),
                    n = $(".ilightbox-holder"),
                    a = fullScreenApi.fullScreenEventName + ".iLightBox",
                    r = verticalDistanceThreshold = 100,
                    s = [t.nextButton[0], t.prevButton[0], t.nextButton[0].firstChild, t.prevButton[0].firstChild];
                $win.on("resize.iLightBox", function() {
                    var i = getViewport();
                    o.mobileOptimizer && !o.innerToolbar && (t.isMobile = i.width <= t.mobileMaxWidth), t.BODY[t.isMobile ? "addClass" : "removeClass"]("isMobile"), t.nextLock || t.prevLock || e.repositionPhoto(null), supportTouch && (clearTimeout(t.setTime), t.setTime = setTimeout(function() {
                        var e = getScrollXY().y;
                        window.scrollTo(0, e - 30), window.scrollTo(0, e + 30), window.scrollTo(0, e)
                    }, 2e3)), t.thumbs && e.positionThumbnails()
                }).on("keydown.iLightBox", function(i) {
                    if (o.controls.keyboard) switch (i.keyCode) {
                        case 13:
                            i.shiftKey && o.keyboard.shift_enter && e.fullScreenAction();
                            break;
                        case 27:
                            o.keyboard.esc && e.closeAction();
                            break;
                        case 37:
                            o.keyboard.left && !t.lockKey && e.moveTo("prev");
                            break;
                        case 38:
                            o.keyboard.up && !t.lockKey && e.moveTo("prev");
                            break;
                        case 39:
                            o.keyboard.right && !t.lockKey && e.moveTo("next");
                            break;
                        case 40:
                            o.keyboard.down && !t.lockKey && e.moveTo("next")
                    }
                }), fullScreenApi.supportsFullScreen && $win.on(a, function() {
                    e.doFullscreen()
                });
                var l = [o.caption.show + ".iLightBox", o.caption.hide + ".iLightBox", o.social.show + ".iLightBox", o.social.hide + ".iLightBox"].filter(function(e, t, o) {
                        return o.lastIndexOf(e) === t
                    }),
                    c = "";
                $.each(l, function(e, t) {
                    0 != e && (c += " "), c += t
                }), $doc.on(clickEvent, ".ilightbox-overlay", function() {
                    o.overlay.blur && e.closeAction()
                }).on(clickEvent, ".ilightbox-next, .ilightbox-next-button", function() {
                    e.moveTo("next")
                }).on(clickEvent, ".ilightbox-prev, .ilightbox-prev-button", function() {
                    e.moveTo("prev")
                }).on(clickEvent, ".ilightbox-thumbnail", function() {
                    var o = $(this),
                        i = $(".ilightbox-thumbnail", t.thumbnails).index(o);
                    i != t.current && e.goTo(i)
                }).on(c, ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(e) {
                    var i = $("div.ilightbox-caption", t.holder),
                        n = $("div.ilightbox-social", t.holder),
                        a = o.effects.fadeSpeed;
                    t.nextLock || t.prevLock ? (e.type != o.caption.show || i.is(":visible") ? e.type == o.caption.hide && i.is(":visible") && i.fadeOut(a) : i.fadeIn(a), e.type != o.social.show || n.is(":visible") ? e.type == o.social.hide && n.is(":visible") && n.fadeOut(a) : n.fadeIn(a)) : (e.type != o.caption.show || i.is(":visible") ? e.type == o.caption.hide && i.is(":visible") && i.stop().fadeOut(a) : i.stop().fadeIn(a), e.type != o.social.show || n.is(":visible") ? e.type == o.social.hide && n.is(":visible") && n.stop().fadeOut(a) : n.stop().fadeIn(a))
                }).on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-wrapper", function(e) {
                    "mouseenter" == e.type ? t.lockWheel = !0 : t.lockWheel = !1
                }).on(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause", function() {
                    var t = $(this);
                    t.hasClass("fusion-updated") || (t.hasClass("ilightbox-fullscreen") ? e.fullScreenAction() : t.hasClass("ilightbox-play") ? (e.resume(), t.addClass("ilightbox-pause").removeClass("ilightbox-play")) : t.hasClass("ilightbox-pause") ? (e.pause(), t.addClass("ilightbox-play").removeClass("ilightbox-pause")) : e.closeAction(), t.addClass("fusion-updated"), setTimeout(function() {
                        t.removeClass("fusion-updated")
                    }, 100))
                }).on(touchMoveEvent, ".ilightbox-overlay, .ilightbox-thumbnails-container", function(e) {
                    e.preventDefault()
                }), o.controls.arrows && !supportTouch && $doc.on("mousemove.iLightBox", function(e) {
                    t.isMobile || (t.mouseID || t.hideableElements.show(), t.mouseID = clearTimeout(t.mouseID), -1 === s.indexOf(e.target) && (t.mouseID = setTimeout(function() {
                        t.hideableElements.hide(), t.mouseID = clearTimeout(t.mouseID)
                    }, 3e3)))
                }), o.controls.slideshow && o.slideshow.pauseOnHover && $doc.on("mouseenter.iLightBox mouseleave.iLightBox", ".ilightbox-holder:not(.ilightbox-next, .ilightbox-prev)", function(o) {
                    "mouseenter" == o.type && t.cycleID ? e.pause() : "mouseleave" == o.type && t.isPaused && e.resume()
                });
                var u = $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails");
                o.controls.mousewheel && u.on("mousewheel.iLightBox", function(o, i) {
                    t.lockWheel || (o.preventDefault(), i < 0 ? e.moveTo("next") : i > 0 && e.moveTo("prev"))
                }), o.controls.swipe && n.on(touchStartEvent, function(a) {
                    if (!(t.nextLock || t.prevLock || 1 == t.total || t.lockSwipe)) {
                        t.BODY.addClass("ilightbox-closedhand");
                        var s, l = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                            c = $doc.scrollTop(),
                            u = $doc.scrollLeft(),
                            h = [n.eq(0).offset(), n.eq(1).offset(), n.eq(2).offset()],
                            d = [{
                                top: h[0].top - c,
                                left: h[0].left - u
                            }, {
                                top: h[1].top - c,
                                left: h[1].left - u
                            }, {
                                top: h[2].top - c,
                                left: h[2].left - u
                            }],
                            p = {
                                time: (new Date).getTime(),
                                coords: [l.pageX - u, l.pageY - c]
                            };
                        n.on(touchMoveEvent, g), $doc.one(touchStopEvent, function(a) {
                            n.off(touchMoveEvent, g), t.BODY.removeClass("ilightbox-closedhand"), p && s && ("horizontal" == i && s.time - p.time < 1e3 && abs(p.coords[0] - s.coords[0]) > r && abs(p.coords[1] - s.coords[1]) < verticalDistanceThreshold ? p.coords[0] > s.coords[0] ? t.current != t.total - 1 || o.infinite ? (t.isSwipe = !0, e.moveTo("next")) : m() : 0 != t.current || o.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : m() : "vertical" == i && s.time - p.time < 1e3 && abs(p.coords[1] - s.coords[1]) > r && abs(p.coords[0] - s.coords[0]) < verticalDistanceThreshold ? p.coords[1] > s.coords[1] ? t.current != t.total - 1 || o.infinite ? (t.isSwipe = !0, e.moveTo("next")) : m() : 0 != t.current || o.infinite ? (t.isSwipe = !0, e.moveTo("prev")) : m() : m()), p = s = undefined
                        })
                    }

                    function f(e) {
                        var t = $(this),
                            o = d[e],
                            n = [p.coords[0] - s.coords[0], p.coords[1] - s.coords[1]];
                        t[0].style["horizontal" == i ? "left" : "top"] = ("horizontal" == i ? o.left - n[0] : o.top - n[1]) + "px"
                    }

                    function g(e) {
                        if (p) {
                            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                            s = {
                                time: (new Date).getTime(),
                                coords: [t.pageX - u, t.pageY - c]
                            }, n.each(f), e.preventDefault()
                        }
                    }

                    function m() {
                        n.each(function() {
                            var e = $(this),
                                t = e.data("offset") || {
                                    top: e.offset().top - c,
                                    left: e.offset().left - u
                                },
                                o = t.top,
                                i = t.left;
                            e.css(transform, gpuAcceleration).stop().animate({
                                top: o,
                                left: i
                            }, 500, "easeOutCirc", function() {
                                e.css(transform, "")
                            })
                        })
                    }
                })
            },
            goTo: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = e - o.current;
                if (i.infinite && (e == o.total - 1 && 0 == o.current && (n = -1), o.current == o.total - 1 && 0 == e && (n = 1)), 1 == n) t.moveTo("next");
                else if (-1 == n) t.moveTo("prev");
                else {
                    if (o.nextLock || o.prevLock) return !1;
                    "function" == typeof i.callback.onBeforeChange && i.callback.onBeforeChange.call(t, t.ui), i.linkId && (o.hashLock = !0, window.location.hash = i.linkId + "/" + e), t.items[e] && (t.items[e].options.mousewheel ? t.vars.lockWheel = !1 : o.lockWheel = !0, t.items[e].options.swipe ? o.lockSwipe = !1 : o.lockSwipe = !0), $.each([o.holder, o.nextPhoto, o.prevPhoto], function(e, t) {
                        t.css(transform, gpuAcceleration).fadeOut(i.effects.loadedFadeSpeed)
                    }), o.current = e, o.next = e + 1, o.prev = e - 1, t.createUI(), setTimeout(function() {
                        t.generateBoxes()
                    }, i.effects.loadedFadeSpeed + 50), $(".ilightbox-thumbnail", o.thumbnails).removeClass("ilightbox-active").eq(e).addClass("ilightbox-active"), t.positionThumbnails(), i.linkId && setTimeout(function() {
                        o.hashLock = !1
                    }, 55), i.infinite || (o.nextButton.add(o.prevButton).add(o.innerPrevButton).add(o.innerNextButton).removeClass("disabled"), 0 == o.current && o.prevButton.add(o.innerPrevButton).addClass("disabled"), o.current >= o.total - 1 && o.nextButton.add(o.innerNextButton).addClass("disabled")), t.resetCycle(), "function" == typeof i.callback.onAfterChange && i.callback.onAfterChange.call(t, t.ui)
                }
            },
            moveTo: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = i.path.toLowerCase(),
                    a = getViewport(),
                    r = i.effects.switchSpeed,
                    s = t.vars.holder,
                    l = s.find("iframe").length ? s.find("iframe").attr("src") : "";
                if (l && -1 !== l.indexOf("vimeo.com") && s.find("iframe").attr("src", l), o.nextLock || o.prevLock) return !1;
                var c = "next" == e ? o.next : o.prev;
                if (i.linkId && c && (o.hashLock = !0, window.location.hash = i.linkId + "/" + c), "next" == e) {
                    if (!t.items[c]) return !1;
                    var u = o.nextPhoto,
                        h = o.holder,
                        d = o.prevPhoto,
                        p = "ilightbox-prev",
                        f = "ilightbox-next"
                } else if ("prev" == e) {
                    if (!t.items[c]) return !1;
                    u = o.prevPhoto, h = o.holder, d = o.nextPhoto, p = "ilightbox-next", f = "ilightbox-prev"
                }
                "function" == typeof i.callback.onBeforeChange && i.callback.onBeforeChange.call(t, t.ui), "next" == e ? o.nextLock = !0 : o.prevLock = !0;
                var g = $("div.ilightbox-caption", h),
                    m = $("div.ilightbox-social", h);
                if (g.length && g.stop().fadeOut(r, function() {
                        $(this).remove()
                    }), m.length && m.stop().fadeOut(r, function() {
                        $(this).remove()
                    }), t.items[c].caption) {
                    t.setCaption(t.items[c], u);
                    var v = $("div.ilightbox-caption", u),
                        b = parseInt(v.outerHeight() / u.outerHeight() * 100);
                    i.caption.start && b <= 50 && v.fadeIn(r)
                }
                var x = t.items[c].options.social;
                x && (t.setSocial(x, t.items[c].URL, u), i.social.start && $("div.ilightbox-social", u).fadeIn(i.effects.fadeSpeed)), $.each([u, h, d], function(e, t) {
                    t.removeClass("ilightbox-next ilightbox-prev")
                });
                var w = u.data("offset"),
                    y = a.width - i.styles.pageOffsetX,
                    k = a.height - i.styles.pageOffsetY,
                    S = w.newDims.width,
                    L = w.newDims.height,
                    T = w.thumbsOffset,
                    A = w.diff,
                    I = parseInt(k / 2 - L / 2 - A.H - T.H / 2),
                    C = parseInt(y / 2 - S / 2 - A.W - T.W / 2);
                u.css(transform, gpuAcceleration).animate({
                    top: I,
                    left: C,
                    opacity: 1
                }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    u.css(transform, "")
                }), $("div.ilightbox-container", u).animate({
                    width: S,
                    height: L
                }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc");
                var O = h.data("offset"),
                    B = O.object;
                A = O.diff, S = O.newDims.width, L = O.newDims.height, S = parseInt(S * i.styles["next" == e ? "prevScale" : "nextScale"]), L = parseInt(L * i.styles["next" == e ? "prevScale" : "nextScale"]), I = "horizontal" == n ? parseInt(k / 2 - B.offsetY - L / 2 - A.H - T.H / 2) : parseInt(k - B.offsetX - A.H - T.H / 2), "prev" == e ? C = "horizontal" == n ? parseInt(y - B.offsetX - A.W - T.W / 2) : parseInt(y / 2 - S / 2 - A.W - B.offsetY - T.W / 2) : (I = "horizontal" == n ? I : parseInt(B.offsetX - A.H - L - T.H / 2), C = "horizontal" == n ? parseInt(B.offsetX - A.W - S - T.W / 2) : parseInt(y / 2 - B.offsetY - S / 2 - A.W - T.W / 2)), $("div.ilightbox-container", h).animate({
                    width: S,
                    height: L
                }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc"), h.addClass(p).css(transform, gpuAcceleration).animate({
                    top: I,
                    left: C,
                    opacity: i.styles.prevOpacity
                }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    h.css(transform, ""), $(".ilightbox-thumbnail", o.thumbnails).removeClass("ilightbox-active").eq(c).addClass("ilightbox-active"), t.positionThumbnails(), t.items[c] && (t.items[c].options.mousewheel ? o.lockWheel = !1 : o.lockWheel = !0, t.items[c].options.swipe ? o.lockSwipe = !1 : o.lockSwipe = !0), o.isSwipe = !1, "next" == e ? (o.nextPhoto = d, o.prevPhoto = h, o.holder = u, o.nextPhoto.hide(), o.next = o.next + 1, o.prev = o.current, o.current = o.current + 1, i.infinite && (o.current > o.total - 1 && (o.current = 0), o.current == o.total - 1 && (o.next = 0), 0 == o.current && (o.prev = o.total - 1)), t.createUI(), t.items[o.next] ? t.loadContent(t.items[o.next], "next") : o.nextLock = !1) : (o.prevPhoto = d, o.nextPhoto = h, o.holder = u, o.prevPhoto.hide(), o.next = o.current, o.current = o.prev, o.prev = o.current - 1, i.infinite && (o.current == o.total - 1 && (o.next = 0), 0 == o.current && (o.prev = o.total - 1)), t.createUI(), t.items[o.prev] ? t.loadContent(t.items[o.prev], "prev") : o.prevLock = !1), i.linkId && setTimeout(function() {
                        o.hashLock = !1
                    }, 55), i.infinite || (o.nextButton.add(o.prevButton).add(o.innerPrevButton).add(o.innerNextButton).removeClass("disabled"), 0 == o.current && o.prevButton.add(o.innerPrevButton).addClass("disabled"), o.current >= o.total - 1 && o.nextButton.add(o.innerNextButton).addClass("disabled")), t.repositionPhoto(), t.resetCycle(), "function" == typeof i.callback.onAfterChange && i.callback.onAfterChange.call(t, t.ui)
                }), I = "horizontal" == n ? getPixel(d, "top") : "next" == e ? parseInt(-k / 2 - d.outerHeight()) : parseInt(2 * I), C = "horizontal" == n ? "next" == e ? parseInt(-y / 2 - d.outerWidth()) : parseInt(2 * C) : getPixel(d, "left"), d.css(transform, gpuAcceleration).animate({
                    top: I,
                    left: C,
                    opacity: i.styles.nextOpacity
                }, r, o.isSwipe ? "easeOutCirc" : "easeInOutCirc", function() {
                    d.css(transform, "")
                }).addClass(f)
            },
            setCaption: function(e, t) {
                var o = $('<div class="ilightbox-caption"></div>');
                e.caption && (o.html(e.caption), $("div.ilightbox-container", t).append(o))
            },
            normalizeSocial: function(e, t) {
                this.vars;
                var o = this.options,
                    i = window.location.href;
                return $.each(e, function(n, a) {
                    if (!a) return !0;
                    var r, s;
                    switch (n.toLowerCase()) {
                        case "facebook":
                            r = "http://www.facebook.com/share.php?v=4&src=bm&u={URL}", s = "Share on Facebook";
                            break;
                        case "twitter":
                            r = "http://twitter.com/home?status={URL}", s = "Share on Twitter";
                            break;
                        case "delicious":
                            r = "http://delicious.com/post?url={URL}", s = "Share on Delicious";
                            break;
                        case "digg":
                            r = "http://digg.com/submit?phase=2&url={URL}", s = "Share on Digg";
                            break;
                        case "reddit":
                            r = "http://reddit.com/submit?url={URL}", s = "Share on reddit"
                    }
                    e[n] = {
                        URL: a.URL && absolutizeURI(i, a.URL) || o.linkId && window.location.href || "string" != typeof t && i || t && absolutizeURI(i, t) || i,
                        source: a.source || r || a.URL && absolutizeURI(i, a.URL) || t && absolutizeURI(i, t),
                        text: a.text || s || "Share on " + n,
                        width: void 0 === a.width || isNaN(a.width) ? 640 : parseInt(a.width),
                        height: a.height || 360
                    }
                }), e
            },
            setSocial: function(e, t, o) {
                var i = $('<div class="ilightbox-social"></div>'),
                    n = "<ul>";
                e = this.normalizeSocial(e, t), $.each(e, function(e, t) {
                    e.toLowerCase();
                    var o = t.source.replace(/\{URL\}/g, encodeURIComponent(t.URL).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+")),
                        i = "mail" === e ? "" : 'onclick="javascript:window.open(this.href' + (t.width <= 0 || t.height <= 0 ? "" : ", '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=" + t.height + ",width=" + t.width + ",left=40,top=40'") + ');return false;"';
                    n += '<li class="' + e + '"><a class="awb-icon-' + e + '" href="' + o + '"' + i + ' title="' + t.text + '" target="_blank" role="button"></a></li>'
                }), n += "</ul>", i.html(n), $("div.ilightbox-container", o).append(i)
            },
            fullScreenAction: function() {
                this.vars;
                fullScreenApi.supportsFullScreen ? fullScreenApi.isFullScreen() ? fullScreenApi.cancelFullScreen(document.documentElement) : fullScreenApi.requestFullScreen(document.documentElement) : this.doFullscreen()
            },
            doFullscreen: function() {
                var e = this,
                    t = e.vars,
                    o = getViewport(),
                    i = e.options;
                if (i.fullAlone) {
                    var n = t.holder,
                        a = e.items[t.current],
                        r = o.width,
                        s = o.height,
                        l = [n, t.nextPhoto, t.prevPhoto, t.nextButton, t.prevButton, t.overlay, t.toolbar, t.thumbnails, t.loader],
                        c = [t.loader, t.thumbnails];
                    if (t.isInFullScreen) t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !1, t.overlay.css({
                        opacity: e.options.overlay.opacity
                    }), $.each(c, function(e, t) {
                        t.show()
                    }), t.fullScreenButton.attr("title", i.text.enterFullscreen), n.data({
                        naturalWidth: n.data("naturalWidthOld"),
                        naturalHeight: n.data("naturalHeightOld"),
                        naturalWidthOld: null,
                        naturalHeightOld: null
                    }), $.each(l, function(e, t) {
                        t.removeClass("ilightbox-fullscreen")
                    }), "function" == typeof i.callback.onExitFullScreen && i.callback.onExitFullScreen.call(e, e.ui);
                    else {
                        if (t.isInFullScreen = t.lockKey = t.lockWheel = t.lockSwipe = !0, t.overlay.css({
                                opacity: 1
                            }), $.each(c, function(e, t) {
                                t.hide()
                            }), t.fullScreenButton.attr("title", i.text.exitFullscreen), -1 != i.fullStretchTypes.indexOf(a.type)) n.data({
                            naturalWidthOld: n.data("naturalWidth"),
                            naturalHeightOld: n.data("naturalHeight"),
                            naturalWidth: r,
                            naturalHeight: s
                        });
                        else {
                            o = a.options.fullViewPort || i.fullViewPort || "";
                            var u = r,
                                h = s,
                                d = n.data("naturalWidth"),
                                p = n.data("naturalHeight");
                            if ("fill" == o.toLowerCase())(h = u / d * p) < s && (u = s / p * d, h = s);
                            else if ("fit" == o.toLowerCase()) {
                                u = (f = e.getNewDimenstions(u, h, d, p, !0)).width, h = f.height
                            } else if ("stretch" == o.toLowerCase()) u = u, h = h;
                            else {
                                var f, g = d > u || p > h;
                                u = (f = e.getNewDimenstions(u, h, d, p, g)).width, h = f.height
                            }
                            n.data({
                                naturalWidthOld: n.data("naturalWidth"),
                                naturalHeightOld: n.data("naturalHeight"),
                                naturalWidth: u,
                                naturalHeight: h
                            })
                        }
                        $.each(l, function(e, t) {
                            t.addClass("ilightbox-fullscreen")
                        }), "function" == typeof i.callback.onEnterFullScreen && i.callback.onEnterFullScreen.call(e, e.ui)
                    }
                } else t.isInFullScreen ? t.isInFullScreen = !1 : t.isInFullScreen = !0;
                e.repositionPhoto(!0)
            },
            closeAction: function() {
                var e = this.vars,
                    t = this.options;
                $win.off(".iLightBox"), $doc.off(".iLightBox"), $doc.off(clickEvent, ".ilightbox-overlay"), $doc.off(clickEvent, ".ilightbox-next, .ilightbox-next-button"), $doc.off(clickEvent, ".ilightbox-prev, .ilightbox-prev-button"), $doc.off(clickEvent, ".ilightbox-thumbnail"), $doc.off(clickEvent, ".ilightbox-toolbar a.ilightbox-close, .ilightbox-toolbar a.ilightbox-fullscreen, .ilightbox-toolbar a.ilightbox-play, .ilightbox-toolbar a.ilightbox-pause"), e.isInFullScreen && fullScreenApi.cancelFullScreen(document.documentElement), $(".ilightbox-overlay, .ilightbox-holder, .ilightbox-thumbnails").off(".iLightBox"), t.hide.effect ? e.overlay.stop().fadeOut(t.hide.speed, function() {
                    e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox")
                }) : (e.overlay.remove(), e.BODY.removeClass("ilightbox-noscroll").off(".iLightBox"));
                var o = [e.toolbar, e.holder, e.nextPhoto, e.prevPhoto, e.nextButton, e.prevButton, e.loader, e.thumbnails];
                $.each(o, function(e, t) {
                    t.removeAttr("style").remove()
                }), e.prevButton.removeClass("disabled"), e.nextButton.removeClass("disabled"), e.dontGenerateThumbs = e.isInFullScreen = !1, window.iLightBox = null, t.linkId && (e.hashLock = !0, removeHash(), setTimeout(function() {
                    e.hashLock = !1
                }, 55)), "function" == typeof t.callback.onHide && t.callback.onHide.call(this, this.ui)
            },
            repositionPhoto: function() {
                var e = this,
                    t = e.vars,
                    o = e.options,
                    i = o.path.toLowerCase(),
                    n = getViewport(),
                    a = n.width,
                    r = n.height,
                    s = t.isInFullScreen && o.fullAlone || t.isMobile ? 0 : "horizontal" == i ? 0 : t.thumbnails.outerWidth(),
                    l = t.isMobile ? t.toolbar.outerHeight() : t.isInFullScreen && o.fullAlone ? 0 : "horizontal" == i ? t.thumbnails.outerHeight() : 0,
                    c = t.isInFullScreen && o.fullAlone ? a : a - o.styles.pageOffsetX,
                    u = t.isInFullScreen && o.fullAlone ? r : r - o.styles.pageOffsetY,
                    h = "horizontal" == i ? parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (o.styles.nextOffsetX + o.styles.prevOffsetX) : c / 10 <= 30 ? 30 : c / 10) : parseInt(c / 10 <= 30 ? 30 : c / 10) + s,
                    d = "horizontal" == i ? parseInt(u / 10 <= 30 ? 30 : u / 10) + l : parseInt(e.items[t.next] || e.items[t.prev] ? 2 * (o.styles.nextOffsetX + o.styles.prevOffsetX) : u / 10 <= 30 ? 30 : u / 10),
                    p = {
                        type: "current",
                        width: c,
                        height: u,
                        item: e.items[t.current],
                        offsetW: h,
                        offsetH: d,
                        thumbsOffsetW: s,
                        thumbsOffsetH: l,
                        animate: arguments.length,
                        holder: t.holder
                    };
                e.repositionEl(p), e.items[t.next] && (p = $.extend(p, {
                    type: "next",
                    item: e.items[t.next],
                    offsetX: o.styles.nextOffsetX,
                    offsetY: o.styles.nextOffsetY,
                    holder: t.nextPhoto
                }), e.repositionEl(p)), e.items[t.prev] && (p = $.extend(p, {
                    type: "prev",
                    item: e.items[t.prev],
                    offsetX: o.styles.prevOffsetX,
                    offsetY: o.styles.prevOffsetY,
                    holder: t.prevPhoto
                }), e.repositionEl(p));
                var f = "horizontal" == i ? {
                    left: parseInt(c / 2 - t.loader.outerWidth() / 2)
                } : {
                    top: parseInt(u / 2 - t.loader.outerHeight() / 2)
                };
                t.loader.css(f)
            },
            repositionEl: function(e) {
                var t = this.vars,
                    o = this.options,
                    i = o.path.toLowerCase(),
                    n = "current" == e.type && t.isInFullScreen && o.fullAlone ? e.width : e.width - e.offsetW,
                    a = "current" == e.type && t.isInFullScreen && o.fullAlone ? e.height : e.height - e.offsetH,
                    r = e.item,
                    s = e.item.options,
                    l = e.holder,
                    c = e.offsetX || 0,
                    u = e.offsetY || 0,
                    h = e.thumbsOffsetW,
                    d = e.thumbsOffsetH;
                "current" == e.type ? ("number" == typeof s.width && s.width && (n = t.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(r.type) || s.fullViewPort || o.fullViewPort) ? n : s.width > n ? n : s.width), "number" == typeof s.height && s.height && (a = t.isInFullScreen && o.fullAlone && (-1 != o.fullStretchTypes.indexOf(r.type) || s.fullViewPort || o.fullViewPort) ? a : s.height > a ? a : s.height)) : ("number" == typeof s.width && s.width && (n = s.width > n ? n : s.width), "number" == typeof s.height && s.height && (a = s.height > a ? a : s.height)), $(".ilightbox-inner-toolbar", l).length && (a = parseInt(a - $(".ilightbox-inner-toolbar", l).outerHeight()));
                var p = "string" == typeof s.width && -1 != s.width.indexOf("%") ? percentToValue(parseInt(s.width.replace("%", "")), e.width) : l.data("naturalWidth"),
                    f = "string" == typeof s.height && -1 != s.height.indexOf("%") ? percentToValue(parseInt(s.height.replace("%", "")), e.height) : l.data("naturalHeight"),
                    g = "string" == typeof s.width && -1 != s.width.indexOf("%") || "string" == typeof s.height && -1 != s.height.indexOf("%") ? {
                        width: p,
                        height: f
                    } : this.getNewDimenstions(n, a, p, f),
                    m = $.extend({}, g, {});
                "prev" == e.type || "next" == e.type ? (p = parseInt(g.width * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale)), f = parseInt(g.height * ("next" == e.type ? o.styles.nextScale : o.styles.prevScale))) : (p = g.width, f = g.height);
                var v = parseInt((getPixel(l, "padding-left") + getPixel(l, "padding-right") + getPixel(l, "border-left-width") + getPixel(l, "border-right-width")) / 2),
                    b = parseInt((getPixel(l, "padding-top") + getPixel(l, "padding-bottom") + getPixel(l, "border-top-width") + getPixel(l, "border-bottom-width") + ($(".ilightbox-inner-toolbar", l).outerHeight() || 0)) / 2);
                switch (e.type) {
                    case "current":
                        var x = parseInt(e.height / 2 - f / 2 - b - d / 2),
                            w = parseInt(e.width / 2 - p / 2 - v - h / 2);
                        break;
                    case "next":
                        x = "horizontal" == i ? parseInt(e.height / 2 - u - f / 2 - b - d / 2) : parseInt(e.height - c - b - d / 2), w = "horizontal" == i ? parseInt(e.width - c - v - h / 2) : parseInt(e.width / 2 - p / 2 - v - u - h / 2);
                        break;
                    case "prev":
                        x = "horizontal" == i ? parseInt(e.height / 2 - u - f / 2 - b - d / 2) : parseInt(c - b - f - d / 2), w = "horizontal" == i ? parseInt(c - v - p - h / 2) : parseInt(e.width / 2 - u - p / 2 - v - h / 2)
                }
                l.data("offset", {
                    top: x,
                    left: w,
                    newDims: m,
                    diff: {
                        W: v,
                        H: b
                    },
                    thumbsOffset: {
                        W: h,
                        H: d
                    },
                    object: e
                }), e.animate > 0 && o.effects.reposition ? (l.css(transform, gpuAcceleration).stop().animate({
                    top: x,
                    left: w
                }, o.effects.repositionSpeed, "easeOutCirc", function() {
                    l.css(transform, "")
                }), $("div.ilightbox-container", l).stop().animate({
                    width: p,
                    height: f
                }, o.effects.repositionSpeed, "easeOutCirc"), $("div.ilightbox-inner-toolbar", l).stop().animate({
                    width: p
                }, o.effects.repositionSpeed, "easeOutCirc", function() {
                    $(this).css("overflow", "visible")
                })) : (l.css({
                    top: x,
                    left: w
                }), $("div.ilightbox-container", l).css({
                    width: p,
                    height: f
                }), $("div.ilightbox-inner-toolbar", l).css({
                    width: p
                }))
            },
            resume: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options;
                !i.slideshow.pauseTime || i.controls.slideshow && o.total <= 1 || e < o.isPaused || (o.isPaused = 0, o.cycleID && (o.cycleID = clearTimeout(o.cycleID)), o.cycleID = setTimeout(function() {
                    o.current == o.total - 1 ? t.goTo(0) : t.moveTo("next")
                }, i.slideshow.pauseTime))
            },
            pause: function(e) {
                var t = this.vars;
                this.options;
                e < t.isPaused || (t.isPaused = e || 100, t.cycleID && (t.cycleID = clearTimeout(t.cycleID)))
            },
            resetCycle: function() {
                var e = this.vars;
                this.options.controls.slideshow && e.cycleID && !e.isPaused && this.resume()
            },
            getNewDimenstions: function(e, t, o, i, n) {
                var a = this;
                return factor = e ? t ? min(e / o, t / i) : e / o : t / i, n || (factor > a.options.maxScale ? factor = a.options.maxScale : factor < a.options.minScale && (factor = a.options.minScale)), {
                    width: a.options.keepAspectRatio ? round(o * factor) : e,
                    height: a.options.keepAspectRatio ? round(i * factor) : t,
                    ratio: factor
                }
            },
            setOption: function(e) {
                this.options = $.extend(!0, this.options, e || {}), this.refresh()
            },
            availPlugins: function() {
                var e = document.createElement("video");
                this.plugins = {
                    flash: !isMobile,
                    quicktime: parseInt(PluginDetect.getVersion("QuickTime")) >= 0,
                    html5H264: !(!e.canPlayType || !e.canPlayType("video/mp4").replace(/no/, "")),
                    html5WebM: !(!e.canPlayType || !e.canPlayType("video/webm").replace(/no/, "")),
                    html5Vorbis: !(!e.canPlayType || !e.canPlayType("video/ogg").replace(/no/, "")),
                    html5QuickTime: !(!e.canPlayType || !e.canPlayType("video/quicktime").replace(/no/, ""))
                }
            },
            addContent: function(e, t) {
                var o = this;
                switch (t.type) {
                    case "video":
                        var i = !1,
                            n = t.videoType,
                            a = t.options.html5video;
                        ("video/mp4" == n || "mp4" == t.ext || "m4v" == t.ext || a.h264) && o.plugins.html5H264 ? (t.ext = "mp4", t.URL = a.h264 || t.URL) : a.webm && o.plugins.html5WebM ? (t.ext = "webm", t.URL = a.webm || t.URL) : a.ogg && o.plugins.html5Vorbis && (t.ext = "ogv", t.URL = a.ogg || t.URL), !o.plugins.html5H264 || "video/mp4" != n && "mp4" != t.ext && "m4v" != t.ext ? !o.plugins.html5WebM || "video/webm" != n && "webm" != t.ext ? !o.plugins.html5Vorbis || "video/ogg" != n && "ogv" != t.ext ? !o.plugins.html5QuickTime || "video/quicktime" != n && "mov" != t.ext && "qt" != t.ext || (i = !0, n = "video/quicktime") : (i = !0, n = "video/ogg") : (i = !0, n = "video/webm") : (i = !0, n = "video/mp4"), i ? m = $("<video />", {
                            width: "100%",
                            height: "100%",
                            preload: a.preload,
                            autoplay: a.autoplay,
                            poster: a.poster,
                            controls: a.controls
                        }).append($("<source />", {
                            src: t.URL,
                            type: n
                        })) : o.plugins.quicktime ? (m = $("<object />", {
                            type: "video/quicktime",
                            pluginspage: pluginspages.quicktime
                        }).attr({
                            data: t.URL,
                            width: "100%",
                            height: "100%"
                        }).append($("<param />", {
                            name: "src",
                            value: t.URL
                        })).append($("<param />", {
                            name: "autoplay",
                            value: "false"
                        })).append($("<param />", {
                            name: "loop",
                            value: "false"
                        })).append($("<param />", {
                            name: "scale",
                            value: "tofit"
                        })), browser.msie && (m = QT_GenerateOBJECTText(t.URL, "100%", "100%", "", "SCALE", "tofit", "AUTOPLAY", "false", "LOOP", "false"))) : m = $("<span />", {
                            class: "ilightbox-alert",
                            html: o.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.quicktime).replace("{type}", "QuickTime")
                        });
                        break;
                    case "flash":
                        if (o.plugins.flash) {
                            var r = "",
                                s = 0;
                            t.options.flashvars ? $.each(t.options.flashvars, function(e, t) {
                                0 != s && (r += "&"), r += e + "=" + encodeURIComponent(t), s++
                            }) : r = null, m = $("<embed />").attr({
                                type: "application/x-shockwave-flash",
                                src: t.URL,
                                width: "number" == typeof t.options.width && t.options.width && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.width : "100%",
                                height: "number" == typeof t.options.height && t.options.height && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.height : "100%",
                                quality: "high",
                                bgcolor: "#000000",
                                play: "true",
                                loop: "true",
                                menu: "true",
                                wmode: "transparent",
                                scale: "showall",
                                allowScriptAccess: "always",
                                allowFullScreen: "true",
                                flashvars: r,
                                fullscreen: "yes"
                            })
                        } else m = $("<span />", {
                            class: "ilightbox-alert",
                            html: o.options.errors.missingPlugin.replace("{pluginspage}", pluginspages.flash).replace("{type}", "Adobe Flash player")
                        });
                        break;
                    case "iframe":
                        var l = t.URL.substring(t.URL.indexOf("?") + 1).split("&"),
                            c = "?";
                        if (-1 != t.URL.indexOf("vimeo.com")) {
                            var u = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
                            if (p = t.URL.match(u)) {
                                c = "?title=0&amp;byline=0&amp;portrait=0";
                                for (var h = 0; h < l.length; ++h) {
                                    1 < (f = l[h].split("="))[0].length && 2 === f.length && -1 === c.indexOf(f[0]) && (c += "&" + f[0] + "=" + decodeURIComponent(f[1].replace(/\+/g, " ")))
                                }
                                var d = "//player.vimeo.com/video/" + p[3] + c
                            } else d = t.URL
                        } else {
                            var p;
                            u = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                            if (p = t.URL.match(u)) {
                                c = "?enablejsapi=1";
                                for (h = 0; h < l.length; ++h) {
                                    var f;
                                    1 < (f = l[h].split("="))[0].length && 2 === f.length && -1 === c.indexOf(f[0]) && (c += "&" + f[0] + "=" + decodeURIComponent(f[1].replace(/\+/g, " ")))
                                }
                                d = "//www.youtube.com/embed/" + p[7] + c
                            } else d = t.URL
                        }
                        var g = ""; - 1 !== c.indexOf("autoplay=1") && (g += "autoplay"), m = $("<iframe />").attr({
                            width: "number" == typeof t.options.width && t.options.width && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.width : "100%",
                            height: "number" == typeof t.options.height && t.options.height && "1" == o.options.minScale && "1" == o.options.maxScale ? t.options.height : "100%",
                            src: d,
                            frameborder: 0,
                            hspace: 0,
                            vspace: 0,
                            scrolling: supportTouch ? "auto" : "scroll",
                            webkitAllowFullScreen: "",
                            mozallowfullscreen: "",
                            allowFullScreen: "",
                            allow: g
                        });
                        break;
                    case "inline":
                        m = $('<div class="ilightbox-wrapper"></div>').html($(t.URL).clone(!0));
                        break;
                    case "html":
                        var m, v = t.URL;
                        if (v[0].nodeName) m = $('<div class="ilightbox-wrapper"></div>').html(v);
                        else {
                            var b = $(t.URL),
                                x = b.selector ? $("<div>" + b + "</div>") : b;
                            m = $('<div class="ilightbox-wrapper"></div>').html(x)
                        }
                }
                return $("div.ilightbox-container", e).empty().html(m), "video" === m[0].tagName.toLowerCase() && browser.webkit && setTimeout(function() {
                    var e = m[0].currentSrc + "?" + floor(3e4 * random());
                    m[0].currentSrc = e, m[0].src = e
                }), m
            },
            ogpRecognition: function(e, t) {
                var o = this,
                    i = e.URL;
                o.showLoader(), doAjax(i, function(e) {
                    if (o.hideLoader(), e) {
                        var i = new Object;
                        if (i.length = !1, i.url = e.url, 200 == e.status) {
                            for (var n = e.results, a = n.type, r = n.source, s = n.url.substring(n.url.indexOf("?") + 1).split("&"), l = r.src, c = 0; c < s.length; ++c) - 1 === l.indexOf(s[c]) && (l += "&" + s[c]);
                            i.source = l, i.width = r.width && parseInt(r.width) || 0, i.height = r.height && parseInt(r.height) || 0, i.type = a, i.thumbnail = r.thumbnail || n.images[0], i.html5video = n.html5video || {}, i.length = !0, "application/x-shockwave-flash" == r.type ? i.type = "flash" : -1 != r.type.indexOf("video/") ? i.type = "video" : -1 != r.type.indexOf("/html") ? i.type = "iframe" : -1 != r.type.indexOf("image/") && (i.type = "image")
                        } else if (void 0 !== e.response) throw e.response;
                        t.call(this, !!i.length && i)
                    }
                })
            },
            hashChangeHandler: function(e) {
                var t = this,
                    o = t.vars,
                    i = t.options,
                    n = parseURI(e || window.location.href).hash,
                    a = n.split("/"),
                    r = a[1];
                if (!(o.hashLock || "#" + i.linkId != a[0] && n.length > 1))
                    if (r) {
                        var s = a[1] || 0;
                        if (t.items[s])(l = $(".ilightbox-overlay")).length && l.attr("linkid") == i.linkId ? t.goTo(s) : t.itemsObject[s].trigger(supportTouch ? "click itap" : "click");
                        else(l = $(".ilightbox-overlay")).length && t.closeAction()
                    } else {
                        var l;
                        (l = $(".ilightbox-overlay")).length && t.closeAction()
                    }
            }
        }, $.fn.iLightBox = function() {
            var e = arguments,
                t = $.isPlainObject(e[0]) ? e[0] : e[1],
                o = Array.isArray(e[0]) || "string" == typeof e[0] ? e[0] : e[1];
            t || (t = {});
            var i = $.extend(!0, {
                    attr: "href",
                    path: "vertical",
                    skin: "dark",
                    linkId: !1,
                    infinite: !1,
                    startFrom: 0,
                    randomStart: !1,
                    keepAspectRatio: !0,
                    maxScale: 1,
                    minScale: .2,
                    innerToolbar: !1,
                    smartRecognition: !1,
                    mobileOptimizer: !0,
                    fullAlone: !0,
                    fullViewPort: null,
                    fullStretchTypes: "flash, video",
                    overlay: {
                        blur: !0,
                        opacity: .85
                    },
                    controls: {
                        arrows: !1,
                        slideshow: !1,
                        toolbar: !0,
                        fullscreen: !0,
                        thumbnail: !0,
                        keyboard: !0,
                        mousewheel: !0,
                        swipe: !0
                    },
                    keyboard: {
                        left: !0,
                        right: !0,
                        up: !0,
                        down: !0,
                        esc: !0,
                        shift_enter: !0
                    },
                    show: {
                        effect: !0,
                        speed: 300,
                        title: !0
                    },
                    hide: {
                        effect: !0,
                        speed: 300
                    },
                    caption: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave"
                    },
                    social: {
                        start: !0,
                        show: "mouseenter",
                        hide: "mouseleave",
                        buttons: !1
                    },
                    styles: {
                        pageOffsetX: 0,
                        pageOffsetY: 0,
                        nextOffsetX: 45,
                        nextOffsetY: 0,
                        nextOpacity: 1,
                        nextScale: 1,
                        prevOffsetX: 45,
                        prevOffsetY: 0,
                        prevOpacity: 1,
                        prevScale: 1
                    },
                    thumbnails: {
                        maxWidth: 120,
                        maxHeight: 80,
                        normalOpacity: 1,
                        activeOpacity: .6
                    },
                    effects: {
                        reposition: !0,
                        repositionSpeed: 200,
                        switchSpeed: 500,
                        loadedFadeSpeed: 180,
                        fadeSpeed: 200
                    },
                    slideshow: {
                        pauseTime: 5e3,
                        pauseOnHover: !1,
                        startPaused: !0
                    },
                    text: {
                        close: "Press Esc to close",
                        enterFullscreen: "Enter Fullscreen (Shift+Enter)",
                        exitFullscreen: "Exit Fullscreen (Shift+Enter)",
                        slideShow: "Slideshow",
                        next: "Next",
                        previous: "Previous"
                    },
                    errors: {
                        loadImage: "An error occurred when trying to load photo.",
                        loadContents: "An error occurred when trying to load contents.",
                        missingPlugin: "The content your are attempting to view requires the <a href='{pluginspage}' role='button' target='_blank'>{type} plugin</a>."
                    },
                    ajaxSetup: {
                        url: "",
                        beforeSend: function(e, t) {},
                        cache: !1,
                        complete: function(e, t) {},
                        crossDomain: !1,
                        error: function(e, t, o) {},
                        success: function(e, t, o) {},
                        global: !0,
                        ifModified: !1,
                        username: null,
                        password: null,
                        type: "GET"
                    },
                    callback: {}
                }, t),
                n = !(!Array.isArray(o) && "string" != typeof o);
            if (o = Array.isArray(o) ? o : new Array, "string" == typeof e[0] && (o[0] = e[0]), version_compare($.fn.jquery, "1.8", ">=")) {
                var a = new iLightBox($(this), i, o, n);
                return {
                    close: function() {
                        a.closeAction()
                    },
                    fullscreen: function() {
                        a.fullScreenAction()
                    },
                    moveNext: function() {
                        a.moveTo("next")
                    },
                    movePrev: function() {
                        a.moveTo("prev")
                    },
                    goTo: function(e) {
                        a.goTo(e)
                    },
                    refresh: function() {
                        a.refresh()
                    },
                    reposition: function() {
                        arguments.length > 0 ? a.repositionPhoto(!0) : a.repositionPhoto()
                    },
                    setOption: function(e) {
                        a.setOption(e)
                    },
                    destroy: function() {
                        a.closeAction(), $win.off("iLightBoxHashChange"), a.dispatchItemsEvents()
                    }
                }
            }
            throw "The jQuery version that was loaded is too old. iLightBox requires jQuery 1.8+"
        }, $.iLightBox = function() {
            return $.fn.iLightBox(arguments[0], arguments[1])
        }, $.extend($.easing, {
            easeInCirc: function(e, t, o, i, n) {
                return -i * (sqrt(1 - (t /= n) * t) - 1) + o
            },
            easeOutCirc: function(e, t, o, i, n) {
                return i * sqrt(1 - (t = t / n - 1) * t) + o
            },
            easeInOutCirc: function(e, t, o, i, n) {
                return (t /= n / 2) < 1 ? -i / 2 * (sqrt(1 - t * t) - 1) + o : i / 2 * (sqrt(1 - (t -= 2) * t) + 1) + o
            }
        }),
        function() {
            $.each("touchstart touchmove touchend tap taphold swipeleft swiperight scrollstart scrollstop".split(" "), function(e, t) {
                $.fn[t] = function(e) {
                    return e ? this.on(t, e) : this.trigger(t)
                }
            });
            var e = "touchstart.iTap",
                t = "touchend.iTap";
            $.event.special.itap = {
                setup: function() {
                    var o, i, n = this,
                        a = $(this);
                    a.on(e, function(e) {
                        o = getScrollXY(), a.one(t, function(e) {
                            i = getScrollXY();
                            var t = e || window.event;
                            (e = $.event.fix(t)).type = "itap", o && i && o.x == i.x && o.y == i.y && ($.event.dispatch || $.event.handle).call(n, e), o = i = undefined
                        })
                    })
                },
                teardown: function() {
                    $(this).off(e)
                }
            }
        }(),
        function() {
            if (fullScreenApi = {
                    supportsFullScreen: !1,
                    isFullScreen: function() {
                        return !1
                    },
                    requestFullScreen: function() {},
                    cancelFullScreen: function() {},
                    fullScreenEventName: "",
                    prefix: ""
                }, browserPrefixes = "webkit moz o ms khtml".split(" "), void 0 !== document.cancelFullScreen) fullScreenApi.supportsFullScreen = !0;
            else
                for (var e = 0, t = browserPrefixes.length; e < t; e++)
                    if (fullScreenApi.prefix = browserPrefixes[e], void 0 !== document[fullScreenApi.prefix + "CancelFullScreen"]) {
                        fullScreenApi.supportsFullScreen = !0;
                        break
                    }
            fullScreenApi.supportsFullScreen && (fullScreenApi.fullScreenEventName = fullScreenApi.prefix + "fullscreenchange", fullScreenApi.isFullScreen = function() {
                switch (this.prefix) {
                    case "":
                        return document.fullScreen;
                    case "webkit":
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + "FullScreen"]
                }
            }, fullScreenApi.requestFullScreen = function(e) {
                return "" === this.prefix ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]()
            }, fullScreenApi.cancelFullScreen = function(e) {
                return "" === this.prefix ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]()
            })
        }(),
        function() {
            var e = function(e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }(navigator.userAgent);
            browser = {}, e.browser && (browser[e.browser] = !0, browser.version = e.version), browser.chrome ? browser.webkit = !0 : browser.webkit && (browser.safari = !0)
        }(),
        function() {
            var e = ["", "webkit", "moz", "ms", "o"],
                t = document.createElement("div");

            function o(o) {
                for (var i = 0, n = e.length; i < n; i++) {
                    var a = e[i] ? e[i] + o.charAt(0).toUpperCase() + o.slice(1) : o;
                    if (t.style[a] !== undefined) return a
                }
            }
            transform = o("transform") || "", gpuAcceleration = o("perspective") ? "translateZ(0) " : ""
        }();
    var PluginDetect = {
        version: "0.7.9",
        name: "PluginDetect",
        handler: function(e, t, o) {
            return function() {
                e(t, o)
            }
        },
        openTag: "<",
        isDefined: function(e) {
            return void 0 !== e
        },
        isArray: function(e) {
            return /array/i.test(Object.prototype.toString.call(e))
        },
        isFunc: function(e) {
            return "function" == typeof e
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNum: function(e) {
            return "number" == typeof e
        },
        isStrNum: function(e) {
            return "string" == typeof e && /\d/.test(e)
        },
        getNumRegx: /[\d][\d\.\_,-]*/,
        splitNumRegx: /[\.\_,-]/g,
        getNum: function(e, t) {
            var o = this,
                i = o.isStrNum(e) ? (o.isDefined(t) ? new RegExp(t) : o.getNumRegx).exec(e) : null;
            return i ? i[0] : null
        },
        compareNums: function(e, t, o) {
            var i, n, a, r = this,
                s = parseInt;
            if (r.isStrNum(e) && r.isStrNum(t)) {
                if (r.isDefined(o) && o.compareNums) return o.compareNums(e, t);
                for (i = e.split(r.splitNumRegx), n = t.split(r.splitNumRegx), a = 0; a < min(i.length, n.length); a++) {
                    if (s(i[a], 10) > s(n[a], 10)) return 1;
                    if (s(i[a], 10) < s(n[a], 10)) return -1
                }
            }
            return 0
        },
        formatNum: function(e, t) {
            var o, i, n = this;
            if (!n.isStrNum(e)) return null;
            for (n.isNum(t) || (t = 4), t--, i = e.replace(/\s/g, "").split(n.splitNumRegx).concat(["0", "0", "0", "0"]), o = 0; o < 4; o++) /^(0+)(.+)$/.test(i[o]) && (i[o] = RegExp.$2), (o > t || !/\d/.test(i[o])) && (i[o] = "0");
            return i.slice(0, 4).join(",")
        },
        $$hasMimeType: function(e) {
            return function(t) {
                if (!e.isIE && t) {
                    var o, i, n, a = e.isArray(t) ? t : e.isString(t) ? [t] : [];
                    for (n = 0; n < a.length; n++)
                        if (e.isString(a[n]) && /[^\s]/.test(a[n]) && (i = (o = navigator.mimeTypes[a[n]]) ? o.enabledPlugin : 0) && (i.name || i.description)) return o
                }
                return null
            }
        },
        findNavPlugin: function(e, t, o) {
            var i, n, a, r = new RegExp(e, "i"),
                s = !this.isDefined(t) || t ? /\d/ : 0,
                l = o ? new RegExp(o, "i") : 0,
                c = navigator.plugins;
            for (i = 0; i < c.length; i++)
                if (a = c[i].description || "", n = c[i].name || "", (r.test(a) && (!s || s.test(RegExp.leftContext + RegExp.rightContext)) || r.test(n) && (!s || s.test(RegExp.leftContext + RegExp.rightContext))) && (!l || !l.test(a) && !l.test(n))) return c[i];
            return null
        },
        getMimeEnabledPlugin: function(e, t, o) {
            var i, n, a, r, s = new RegExp(t, "i"),
                l = o ? new RegExp(o, "i") : 0,
                c = this.isString(e) ? [e] : e;
            for (r = 0; r < c.length; r++)
                if ((i = this.hasMimeType(c[r])) && (i = i.enabledPlugin) && (a = i.description || "", n = i.name || "", (s.test(a) || s.test(n)) && (!l || !l.test(a) && !l.test(n)))) return i;
            return 0
        },
        getPluginFileVersion: function(e, t) {
            var o, i, n, a, r = this,
                s = -1;
            if (r.OS > 2 || !e || !e.version || !(o = r.getNum(e.version))) return t;
            if (!t) return o;
            for (o = r.formatNum(o), i = (t = r.formatNum(t)).split(r.splitNumRegx), n = o.split(r.splitNumRegx), a = 0; a < i.length; a++) {
                if (s > -1 && a > s && "0" != i[a]) return t;
                if (n[a] != i[a] && (-1 == s && (s = a), "0" != i[a])) return t
            }
            return o
        },
        AXO: window.ActiveXObject,
        getAXO: function(e) {
            var t = null;
            try {
                t = new this.AXO(e)
            } catch (e) {}
            return t
        },
        convertFuncs: function(e) {
            var t, o, i = /^[\$][\$]/;
            for (t in e)
                if (i.test(t)) try {
                    (o = t.slice(2)).length > 0 && !e[o] && (e[o] = e[t](e), delete e[t])
                } catch (e) {}
        },
        initObj: function(e, t, o) {
            var i, n;
            if (e) {
                if (1 == e[t[0]] || o)
                    for (i = 0; i < t.length; i += 2) e[t[i]] = t[i + 1];
                for (i in e)(n = e[i]) && 1 == n[t[0]] && this.initObj(n, t)
            }
        },
        initScript: function() {
            var e = this,
                t = navigator,
                o = document,
                i = t.userAgent || "",
                n = t.vendor || "",
                a = t.platform || "",
                r = t.product || "";
            for (u in e.initObj(e, ["$", e]), e.Plugins) e.Plugins[u] && e.initObj(e.Plugins[u], ["$", e, "$$", e.Plugins[u]], 1);
            if (e.convertFuncs(e), e.OS = 100, a) {
                var s = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100];
                for (u = s.length - 2; u >= 0; u -= 2)
                    if (s[u] && new RegExp(s[u], "i").test(a)) {
                        e.OS = s[u + 1];
                        break
                    }
            }
            if (e.head = o.getElementsByTagName("head")[0] || o.getElementsByTagName("body")[0] || o.body || null, e.isIE = new Function("return/*@cc_on!@*/!1")(), e.verIE = e.isIE && /MSIE\s*(\d+\.?\d*)/i.test(i) ? parseFloat(RegExp.$1, 10) : null, e.verIEfull = null, e.docModeIE = null, e.isIE) {
                var l, c = document.createElement("div");
                try {
                    c.style.behavior = "url(#default#clientcaps)", e.verIEfull = c.getComponentVersion("{89820200-ECBD-11CF-8B85-00AA005B4383}", "componentid").replace(/,/g, ".")
                } catch (e) {}
                l = parseFloat(e.verIEfull || "0", 10), e.docModeIE = o.documentMode || (/back/i.test(o.compatMode || "") ? 5 : l) || e.verIE, e.verIE = l || e.docModeIE
            }
            if (e.ActiveXEnabled = !1, e.isIE) {
                var u, h = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "ShockwaveFlash.ShockwaveFlash", "TDCCtl.TDCCtl", "Shell.UIHelper", "Scripting.Dictionary", "wmplayer.ocx"];
                for (u = 0; u < h.length; u++)
                    if (e.getAXO(h[u])) {
                        e.ActiveXEnabled = !0;
                        break
                    }
            }
            e.isGecko = /Gecko/i.test(r) && /Gecko\s*\/\s*\d/i.test(i), e.verGecko = e.isGecko ? e.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(i) ? RegExp.$1 : "0.9") : null, e.isChrome = /Chrome\s*\/\s*(\d[\d\.]*)/i.test(i), e.verChrome = e.isChrome ? e.formatNum(RegExp.$1) : null, e.isSafari = (/Apple/i.test(n) || !n && !e.isChrome) && /Safari\s*\/\s*(\d[\d\.]*)/i.test(i), e.verSafari = e.isSafari && /Version\s*\/\s*(\d[\d\.]*)/i.test(i) ? e.formatNum(RegExp.$1) : null, e.isOpera = /Opera\s*[\/]?\s*(\d+\.?\d*)/i.test(i), e.verOpera = e.isOpera && (/Version\s*\/\s*(\d+\.?\d*)/i.test(i), 1) ? parseFloat(RegExp.$1, 10) : null, e.addWinEvent("load", e.handler(e.runWLfuncs, e))
        },
        init: function(e) {
            var t, o = this,
                i = {
                    status: -3,
                    plugin: 0
                };
            return o.isString(e) ? 1 == e.length ? (o.getVersionDelimiter = e, i) : (e = e.toLowerCase().replace(/\s/g, ""), (t = o.Plugins[e]) && t.getVersion ? (i.plugin = t, o.isDefined(t.installed) || (t.installed = null, t.version = null, t.version0 = null, t.getVersionDone = null, t.pluginName = e), o.garbage = !1, o.isIE && !o.ActiveXEnabled && "java" !== e ? (i.status = -2, i) : (i.status = 1, i)) : i) : i
        },
        fPush: function(e, t) {
            var o = this;
            o.isArray(t) && (o.isFunc(e) || o.isArray(e) && e.length > 0 && o.isFunc(e[0])) && t.push(e)
        },
        callArray: function(e) {
            var t;
            if (this.isArray(e))
                for (t = 0; t < e.length; t++) {
                    if (null === e[t]) return;
                    this.call(e[t]), e[t] = null
                }
        },
        call: function(e) {
            var t = this,
                o = t.isArray(e) ? e.length : -1;
            o > 0 && t.isFunc(e[0]) ? e[0](t, o > 1 ? e[1] : 0, o > 2 ? e[2] : 0, o > 3 ? e[3] : 0) : t.isFunc(e) && e(t)
        },
        getVersionDelimiter: ",",
        $$getVersion: function(e) {
            return function(t, o, i) {
                var n, a, r = e.init(t);
                return r.status < 0 ? null : (1 != (n = r.plugin).getVersionDone && (n.getVersion(null, o, i), null === n.getVersionDone && (n.getVersionDone = 1)), e.cleanup(), a = (a = n.version || n.version0) ? a.replace(e.splitNumRegx, e.getVersionDelimiter) : a)
            }
        },
        cleanup: function() {
            this.garbage && this.isDefined(window.CollectGarbage) && window.CollectGarbage()
        },
        isActiveXObject: function(e, t) {
            var o = this,
                i = !1,
                n = '<object width="1" height="1" style="display:none" ' + e.getCodeBaseVersion(t) + ">" + e.HTML + o.openTag + "/object>";
            if (!o.head) return i;
            o.head.insertBefore(document.createElement("object"), o.head.firstChild), o.head.firstChild.outerHTML = n;
            try {
                o.head.firstChild.classid = e.classID
            } catch (e) {}
            try {
                o.head.firstChild.object && (i = !0)
            } catch (e) {}
            try {
                i && o.head.firstChild.readyState < 4 && (o.garbage = !0)
            } catch (e) {}
            return o.head.removeChild(o.head.firstChild), i
        },
        codebaseSearch: function(e, t) {
            var o = this;
            if (!o.ActiveXEnabled || !e) return null;
            e.BIfuncs && e.BIfuncs.length && null !== e.BIfuncs[e.BIfuncs.length - 1] && o.callArray(e.BIfuncs);
            var i, n = e.SEARCH;
            if (o.isStrNum(t)) return !!(n.match && n.min && o.compareNums(t, n.min) <= 0) || !(n.match && n.max && o.compareNums(t, n.max) >= 0) && ((i = o.isActiveXObject(e, t)) && (!n.min || o.compareNums(t, n.min) > 0) && (n.min = t), i || n.max && !(o.compareNums(t, n.max) < 0) || (n.max = t), i);
            var a, r, s, l, c, u = [0, 0, 0, 0],
                h = [].concat(n.digits),
                d = n.min ? 1 : 0,
                p = function(t, i) {
                    var n = [].concat(u);
                    return n[t] = i, o.isActiveXObject(e, n.join(","))
                };
            if (n.max) {
                for (l = n.max.split(o.splitNumRegx), a = 0; a < l.length; a++) l[a] = parseInt(l[a], 10);
                l[0] < h[0] && (h[0] = l[0])
            }
            if (n.min) {
                for (c = n.min.split(o.splitNumRegx), a = 0; a < c.length; a++) c[a] = parseInt(c[a], 10);
                c[0] > u[0] && (u[0] = c[0])
            }
            if (c && l)
                for (a = 1; a < c.length && c[a - 1] == l[a - 1]; a++) l[a] < h[a] && (h[a] = l[a]), c[a] > u[a] && (u[a] = c[a]);
            if (n.max)
                for (a = 1; a < h.length; a++)
                    if (l[a] > 0 && 0 == h[a] && h[a - 1] < n.digits[a - 1]) {
                        h[a - 1] += 1;
                        break
                    }
            for (a = 0; a < h.length; a++) {
                for (s = {}, r = 0; r < 20 && !(h[a] - u[a] < 1) && !s["a" + (i = round((h[a] + u[a]) / 2))]; r++) s["a" + i] = 1, p(a, i) ? (u[a] = i, d = 1) : h[a] = i;
                if (h[a] = u[a], !d && p(a, u[a]) && (d = 1), !d) break
            }
            return d ? u.join(",") : null
        },
        addWinEvent: function(e, t) {
            var o, i = window;
            this.isFunc(t) && (i.addEventListener ? i.addEventListener(e, t, !1) : i.attachEvent ? i.attachEvent("on" + e, t) : (o = i["on" + e], i["on" + e] = this.winHandler(t, o)))
        },
        winHandler: function(e, t) {
            return function() {
                e(), "function" == typeof t && t()
            }
        },
        WLfuncs0: [],
        WLfuncs: [],
        runWLfuncs: function(e) {
            e.winLoaded = !0, e.callArray(e.WLfuncs0), e.callArray(e.WLfuncs), e.onDoneEmptyDiv && e.onDoneEmptyDiv()
        },
        winLoaded: !1,
        $$onWindowLoaded: function(e) {
            return function(t) {
                e.winLoaded ? e.call(t) : e.fPush(t, e.WLfuncs)
            }
        },
        div: null,
        divID: "plugindetect",
        divWidth: 50,
        pluginSize: 1,
        emptyDiv: function() {
            var e, t, o, i, n, a = this;
            if (a.div && a.div.childNodes)
                for (e = a.div.childNodes.length - 1; e >= 0; e--) {
                    if ((o = a.div.childNodes[e]) && o.childNodes)
                        for (t = o.childNodes.length - 1; t >= 0; t--) {
                            n = o.childNodes[t];
                            try {
                                o.removeChild(n)
                            } catch (e) {}
                        }
                    if (o) try {
                        a.div.removeChild(o)
                    } catch (e) {}
                }
            if (a.div || (i = document.getElementById(a.divID)) && (a.div = i), a.div && a.div.parentNode) {
                try {
                    a.div.parentNode.removeChild(a.div)
                } catch (e) {}
                a.div = null
            }
        },
        DONEfuncs: [],
        onDoneEmptyDiv: function() {
            var e, t, o = this;
            if (o.winLoaded && (!o.WLfuncs || !o.WLfuncs.length || null === o.WLfuncs[o.WLfuncs.length - 1])) {
                for (e in o)
                    if ((t = o[e]) && t.funcs) {
                        if (3 == t.OTF) return;
                        if (t.funcs.length && null !== t.funcs[t.funcs.length - 1]) return
                    }
                for (e = 0; e < o.DONEfuncs.length; e++) o.callArray(o.DONEfuncs);
                o.emptyDiv()
            }
        },
        getWidth: function(e) {
            if (e) {
                var t = e.scrollWidth || e.offsetWidth;
                if (this.isNum(t)) return t
            }
            return -1
        },
        getTagStatus: function(e, t, o, i) {
            var n = this,
                a = e.span,
                r = n.getWidth(a),
                s = o.span,
                l = n.getWidth(s),
                c = t.span,
                u = n.getWidth(c);
            if (!(a && s && c && n.getDOMobj(e))) return -2;
            if (l < u || r < 0 || l < 0 || u < 0 || u <= n.pluginSize || n.pluginSize < 1) return 0;
            if (r >= u) return -1;
            try {
                if (r == n.pluginSize && (!n.isIE || 4 == n.getDOMobj(e).readyState)) {
                    if (!e.winLoaded && n.winLoaded) return 1;
                    if (e.winLoaded && n.isNum(i) && (n.isNum(e.count) || (e.count = i), i - e.count >= 10)) return 1
                }
            } catch (e) {}
            return 0
        },
        getDOMobj: function(e, t) {
            var o = e ? e.span : 0,
                i = o && o.firstChild ? 1 : 0;
            try {
                i && t && this.div.focus()
            } catch (e) {}
            return i ? o.firstChild : null
        },
        setStyle: function(e, t) {
            var o, i = e.style;
            if (i && t)
                for (o = 0; o < t.length; o += 2) try {
                    i[t[o]] = t[o + 1]
                } catch (e) {}
        },
        insertDivInBody: function(e, t) {
            var o = "pd33993399",
                i = null,
                n = t ? window.top.document : window.document,
                a = n.getElementsByTagName("body")[0] || n.body;
            if (!a) try {
                n.write('<div id="' + o + '">.' + this.openTag + "/div>"), i = n.getElementById(o)
            } catch (e) {}(a = n.getElementsByTagName("body")[0] || n.body) && (a.insertBefore(e, a.firstChild), i && a.removeChild(i))
        },
        insertHTML: function(e, t, o, i, n) {
            var a, r, s, l = document,
                c = this,
                u = l.createElement("span"),
                h = ["outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"];
            if (c.isDefined(i) || (i = ""), c.isString(e) && /[^\s]/.test(e)) {
                for (e = e.toLowerCase().replace(/\s/g, ""), a = c.openTag + e + ' width="' + c.pluginSize + '" height="' + c.pluginSize + '" ', a += 'style="outline-style:none;border-style:none;padding:0px;margin:0px;visibility:visible;display:inline;" ', r = 0; r < t.length; r += 2) /[^\s]/.test(t[r + 1]) && (a += t[r] + '="' + t[r + 1] + '" ');
                for (a += ">", r = 0; r < o.length; r += 2) /[^\s]/.test(o[r + 1]) && (a += c.openTag + 'param name="' + o[r] + '" value="' + o[r + 1] + '" />');
                a += i + c.openTag + "/" + e + ">"
            } else a = i;
            if (c.div || ((s = l.getElementById(c.divID)) ? c.div = s : (c.div = l.createElement("div"), c.div.id = c.divID), c.setStyle(c.div, h.concat(["width", c.divWidth + "px", "height", c.pluginSize + 3 + "px", "fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "block"])), s || (c.setStyle(c.div, ["position", "absolute", "right", "0px", "top", "0px"]), c.insertDivInBody(c.div))), c.div && c.div.parentNode) {
                c.setStyle(u, h.concat(["fontSize", c.pluginSize + 3 + "px", "lineHeight", c.pluginSize + 3 + "px", "verticalAlign", "baseline", "display", "inline"]));
                try {
                    u.innerHTML = a
                } catch (e) {}
                try {
                    c.div.appendChild(u)
                } catch (e) {}
                return {
                    span: u,
                    winLoaded: c.winLoaded,
                    tagName: e,
                    outerHTML: a
                }
            }
            return {
                span: null,
                winLoaded: c.winLoaded,
                tagName: "",
                outerHTML: a
            }
        },
        Plugins: {
            quicktime: {
                mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"],
                progID: "QuickTimeCheckObject.QuickTimeCheck.1",
                progID0: "QuickTime.QuickTime",
                classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
                minIEver: 7,
                HTML: '<param name="src" value="" /><param name="controller" value="false" />',
                getCodeBaseVersion: function(e) {
                    return 'codebase="#version=' + e + '"'
                },
                SEARCH: {
                    min: 0,
                    max: 0,
                    match: 0,
                    digits: [16, 128, 128, 0]
                },
                getVersion: function(e) {
                    var t, o = this,
                        i = o.$,
                        n = null,
                        a = null;
                    if (i.isIE) {
                        if (i.isStrNum(e) && ((t = e.split(i.splitNumRegx)).length > 3 && parseInt(t[3], 10) > 0 && (t[3] = "9999"), e = t.join(",")), i.isStrNum(e) && i.verIE >= o.minIEver && o.canUseIsMin() > 0) return o.installed = o.isMin(e), void(o.getVersionDone = 0);
                        o.getVersionDone = 1, !n && i.verIE >= o.minIEver && (n = o.CDBASE2VER(i.codebaseSearch(o))), n || (a = i.getAXO(o.progID)) && a.QuickTimeVersion && (n = a.QuickTimeVersion.toString(16), n = parseInt(n.charAt(0), 16) + "." + parseInt(n.charAt(1), 16) + "." + parseInt(n.charAt(2), 16))
                    } else i.hasMimeType(o.mimeType) && (a = 3 != i.OS ? i.findNavPlugin("QuickTime.*Plug-?in", 0) : null) && a.name && (n = i.getNum(a.name));
                    o.installed = n ? 1 : a ? 0 : -1, o.version = i.formatNum(n, 3)
                },
                cdbaseUpper: ["7,60,0,0", "0,0,0,0"],
                cdbaseLower: ["7,50,0,0", null],
                cdbase2ver: [function(e, t) {
                    var o = t.split(e.$.splitNumRegx);
                    return [o[0], o[1].charAt(0), o[1].charAt(1), o[2]].join(",")
                }, null],
                CDBASE2VER: function(e) {
                    var t, o = this,
                        i = o.$,
                        n = o.cdbaseUpper,
                        a = o.cdbaseLower;
                    if (e)
                        for (e = i.formatNum(e), t = 0; t < n.length; t++)
                            if (n[t] && i.compareNums(e, n[t]) < 0 && a[t] && i.compareNums(e, a[t]) >= 0 && o.cdbase2ver[t]) return o.cdbase2ver[t](o, e);
                    return e
                },
                canUseIsMin: function() {
                    var e, t = this,
                        o = t.$,
                        i = t.canUseIsMin,
                        n = t.cdbaseUpper,
                        a = t.cdbaseLower;
                    if (!i.value)
                        for (i.value = -1, e = 0; e < n.length; e++) {
                            if (n[e] && o.codebaseSearch(t, n[e])) {
                                i.value = 1;
                                break
                            }
                            if (a[e] && o.codebaseSearch(t, a[e])) {
                                i.value = -1;
                                break
                            }
                        }
                    return t.SEARCH.match = 1 == i.value ? 1 : 0, i.value
                },
                isMin: function(e) {
                    return this.$.codebaseSearch(this, e) ? .7 : -1
                }
            },
            flash: {
                mimeType: "application/x-shockwave-flash",
                progID: "ShockwaveFlash.ShockwaveFlash",
                classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
                getVersion: function() {
                    var e, t, o, i, n = function(e) {
                            if (!e) return null;
                            var t = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(e);
                            return t ? t[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null
                        },
                        a = this,
                        r = a.$,
                        s = null,
                        l = null,
                        c = null;
                    if (r.isIE) {
                        for (e = 15; e > 2; e--)
                            if (l = r.getAXO(a.progID + "." + e)) {
                                c = e.toString();
                                break
                            }
                        if (l || (l = r.getAXO(a.progID)), "6" == c) try {
                            l.AllowScriptAccess = "always"
                        } catch (e) {
                            return "6,0,21,0"
                        }
                        try {
                            s = n(l.GetVariable("$version"))
                        } catch (e) {}!s && c && (s = c)
                    } else {
                        if (o = r.hasMimeType(a.mimeType)) {
                            t = r.getDOMobj(r.insertHTML("object", ["type", a.mimeType], [], "", a));
                            try {
                                s = r.getNum(t.GetVariable("$version"))
                            } catch (e) {}
                        }
                        s || ((i = o ? o.enabledPlugin : null) && i.description && (s = n(i.description)), s && (s = r.getPluginFileVersion(i, s)))
                    }
                    return a.installed = s ? 1 : -1, a.version = r.formatNum(s), !0
                }
            },
            shockwave: {
                mimeType: "application/x-director",
                progID: "SWCtl.SWCtl",
                classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000",
                getVersion: function() {
                    var e, t = null,
                        o = null,
                        i = this,
                        n = i.$;
                    if (n.isIE) {
                        try {
                            o = n.getAXO(i.progID).ShockwaveVersion("")
                        } catch (e) {}
                        n.isString(o) && o.length > 0 ? t = n.getNum(o) : n.getAXO(i.progID + ".8") ? t = "8" : n.getAXO(i.progID + ".7") ? t = "7" : n.getAXO(i.progID + ".1") && (t = "6")
                    } else(e = n.findNavPlugin("Shockwave\\s*for\\s*Director")) && e.description && n.hasMimeType(i.mimeType) && (t = n.getNum(e.description)), t && (t = n.getPluginFileVersion(e, t));
                    i.installed = t ? 1 : -1, i.version = n.formatNum(t)
                }
            },
            zz: 0
        }
    };
    PluginDetect.initScript();
    var gArgCountErr = 'The "%%" function requires an even number of arguments.\nArguments should be in the form "atttributeName", "attributeValue", ...',
        gTagAttrs = null,
        gQTGeneratorVersion = 1;

    function AC_QuickTimeVersion() {
        return gQTGeneratorVersion
    }

    function _QTComplain(e, t) {
        t = t.replace("%%", e), alert(t)
    }

    function _QTAddAttribute(e, t, o) {
        var i;
        return null == (i = gTagAttrs[e + t]) && (i = gTagAttrs[t]), null != i ? (0 == t.indexOf(e) && null == o && (o = t.substring(e.length)), null == o && (o = t), o + '="' + i + '" ') : ""
    }

    function _QTAddObjectAttr(e, t) {
        return 0 == e.indexOf("emb#") ? "" : (0 == e.indexOf("obj#") && null == t && (t = e.substring(4)), _QTAddAttribute("obj#", e, t))
    }

    function _QTAddEmbedAttr(e, t) {
        return 0 == e.indexOf("obj#") ? "" : (0 == e.indexOf("emb#") && null == t && (t = e.substring(4)), _QTAddAttribute("emb#", e, t))
    }

    function _QTAddObjectParam(e, t) {
        var o, i = "",
            n = t ? " />" : ">";
        return -1 == e.indexOf("emb#") && (null == (o = gTagAttrs["obj#" + e]) && (o = gTagAttrs[e]), 0 == e.indexOf("obj#") && (e = e.substring(4)), null != o && (i = '  <param name="' + e + '" value="' + o + '"' + n + "\n")), i
    }

    function _QTDeleteTagAttrs() {
        for (var e = 0; e < arguments.length; e++) {
            var t = arguments[e];
            delete gTagAttrs[t], delete gTagAttrs["emb#" + t], delete gTagAttrs["obj#" + t]
        }
    }

    function _QTGenerate(e, t, o) {
        if (4 > o.length || 0 != o.length % 2) return _QTComplain(e, gArgCountErr), "";
        (gTagAttrs = []).src = o[0], gTagAttrs.width = o[1], gTagAttrs.height = o[2], gTagAttrs.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", gTagAttrs.pluginspage = "http://www.apple.com/quicktime/download/", null != (e = o[3]) && "" != e || (e = "6,0,2,0"), gTagAttrs.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=" + e;
        for (var i, n = 4; n < o.length; n += 2) i = o[n].toLowerCase(), e = o[n + 1], "name" == i || "id" == i ? gTagAttrs.name = e : gTagAttrs[i] = e;
        for (i in o = "<object " + _QTAddObjectAttr("classid") + _QTAddObjectAttr("width") + _QTAddObjectAttr("height") + _QTAddObjectAttr("codebase") + _QTAddObjectAttr("name", "id") + _QTAddObjectAttr("tabindex") + _QTAddObjectAttr("hspace") + _QTAddObjectAttr("vspace") + _QTAddObjectAttr("border") + _QTAddObjectAttr("align") + _QTAddObjectAttr("class") + _QTAddObjectAttr("title") + _QTAddObjectAttr("accesskey") + _QTAddObjectAttr("noexternaldata") + ">\n" + _QTAddObjectParam("src", t), n = "  <embed " + _QTAddEmbedAttr("src") + _QTAddEmbedAttr("width") + _QTAddEmbedAttr("height") + _QTAddEmbedAttr("pluginspage") + _QTAddEmbedAttr("name") + _QTAddEmbedAttr("align") + _QTAddEmbedAttr("tabindex"), _QTDeleteTagAttrs("src", "width", "height", "pluginspage", "classid", "codebase", "name", "tabindex", "hspace", "vspace", "border", "align", "noexternaldata", "class", "title", "accesskey"), gTagAttrs) null != (e = gTagAttrs[i]) && (n += _QTAddEmbedAttr(i), o += _QTAddObjectParam(i, t));
        return o + n + "> </embed>\n</object>"
    }

    function QT_GenerateOBJECTText() {
        return _QTGenerate("QT_GenerateOBJECTText", !1, arguments)
    }! function() {
        function e(e) {
            return "#" + (e = e || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }
        var t, o = document,
            i = $.event.special,
            n = o.documentMode,
            a = "oniLightBoxHashChange" in window && (void 0 === n || 7 < n);
        $.fn.iLightBoxHashChange = function(e) {
            return e ? this.on("iLightBoxHashChange", e) : this.trigger("iLightBoxHashChange")
        }, $.fn.iLightBoxHashChange.delay = 50, i.iLightBoxHashChange = $.extend(i.iLightBoxHashChange, {
            setup: function() {
                if (a) return !1;
                $(t.start)
            },
            teardown: function() {
                if (a) return !1;
                $(t.stop)
            }
        }), t = function() {
            function t() {
                var o = e(),
                    n = h(l);
                o !== l ? (u(l = o, n), $(window).trigger("iLightBoxHashChange")) : n !== l && (location.href = location.href.replace(/#.*/, "") + n), i = setTimeout(t, $.fn.iLightBoxHashChange.delay)
            }
            var i, n, r, s = {},
                l = e(),
                c = function(e) {
                    return e
                },
                u = c,
                h = c;
            return s.start = function() {
                i || t()
            }, s.stop = function() {
                i && clearTimeout(i), i = void 0
            }, browser.msie && !a && (s.start = function() {
                n || (r = (r = $.fn.iLightBoxHashChange.src) && r + e(), n = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    r || u(e()), t()
                }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow, o.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (n.document.title = o.title)
                    } catch (e) {}
                })
            }, s.stop = c, h = function() {
                return e(n.location.href)
            }, u = function(e, t) {
                var i = n.document,
                    a = $.fn.iLightBoxHashChange.domain;
                e !== t && (i.title = o.title, i.open(), a && i.write('<script>document.domain="' + a + '"<\/script>'), i.close(), n.location.hash = e)
            }), s
        }()
    }(), Array.prototype.filter || (Array.prototype.filter = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            o = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var i = [], n = arguments[1], a = 0; a < o; a++)
            if (a in t) {
                var r = t[a];
                e.call(n, r, a, t) && i.push(r)
            }
        return i
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        var o;
        if (null == this) throw new TypeError('"this" is null or not defined');
        var i = Object(this),
            n = i.length >>> 0;
        if (0 === n) return -1;
        var a = +t || 0;
        if (abs(a) === 1 / 0 && (a = 0), a >= n) return -1;
        for (o = max(a >= 0 ? a : n - abs(a), 0); o < n;) {
            if (o in i && i[o] === e) return o;
            o++
        }
        return -1
    }), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(e) {
        "use strict";
        if (null == this) throw new TypeError;
        var t = Object(this),
            o = t.length >>> 0;
        if (0 === o) return -1;
        var i = o;
        arguments.length > 1 && ((i = Number(arguments[1])) != i ? i = 0 : 0 != i && i != 1 / 0 && i != -1 / 0 && (i = (i > 0 || -1) * floor(abs(i))));
        for (var n = i >= 0 ? min(i, o - 1) : o - abs(i); n >= 0; n--)
            if (n in t && t[n] === e) return n;
        return -1
    })
}(jQuery, this);