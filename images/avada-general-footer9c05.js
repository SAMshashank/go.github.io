jQuery(document).ready(function() {
    jQuery(".fusion-footer .fusion-footer-widget-area .fusion-column").each(function() {
        jQuery(this).is(":empty") && jQuery(this).css("margin-bottom", "0")
    }), jQuery(".fusion-social-links-footer").find(".fusion-social-networks").children().length || (jQuery(".fusion-social-links-footer").hide(), jQuery(".fusion-footer-copyright-area .fusion-copyright-notice").css("padding-bottom", "0"))
});