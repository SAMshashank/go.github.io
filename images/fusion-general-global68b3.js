function checkHoverTouchState() {
    var e, o = !1;
    document.addEventListener("touchstart", function() {
        clearTimeout(e), o = !0, jQuery("body").addClass("fusion-touch"), jQuery("body").removeClass("fusion-no-touch"), e = setTimeout(function() {
            o = !1
        }, 500)
    }, {
        passive: !0
    }), document.addEventListener("mouseover", function() {
        o || (o = !1, jQuery("body").addClass("fusion-no-touch"), jQuery("body").removeClass("fusion-touch"))
    })
}
checkHoverTouchState(), jQuery(document).ready(function() {
    jQuery("input, textarea").placeholder()
});