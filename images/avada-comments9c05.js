jQuery(document).ready(function() {
    var e, t, n, r;
    if (jQuery(".comment-respond .comment-reply-title").length && !jQuery(".comment-respond .comment-reply-title").parents(".fusion-comments-tb").length && !jQuery(".comment-respond .comment-reply-title").parents(".woocommerce-tabs").length) {
        for (e = avadaCommentVars.title_style_type.split(" "), t = "", r = 0; r < e.length; r++) t += " sep-" + e[r];
        jQuery("body").hasClass("rtl") ? jQuery(".comment-respond .comment-reply-title").addClass("title-heading-right") : jQuery(".comment-respond .comment-reply-title").addClass("title-heading-left"), n = ' style="margin-top:' + avadaCommentVars.title_margin_top + ";margin-bottom:" + avadaCommentVars.title_margin_bottom + ';"', jQuery(".comment-respond .comment-reply-title").wrap('<div class="fusion-title title fusion-title-size-three' + t + '"' + n + "></div>"), -1 === t.indexOf("underline") && jQuery(".comment-respond .comment-reply-title").parent().append('<span class="awb-title-spacer"></span><div class="title-sep-container"><div class="title-sep' + t + ' "></div></div>')
    }
    jQuery(".textarea-comment").each(function() {
        jQuery(this).css("max-width", jQuery("#content").width())
    }), jQuery(window).on("fusion-resize-horizontal", function() {
        jQuery(".textarea-comment").each(function() {
            jQuery(this).css("max-width", jQuery("#content").width())
        })
    })
});