jQuery(document).ready(function(){ jQuery("#simplify-main-menu ul ul").css({display: "none"}); jQuery('#simplify-main-menu ul li').hover( function() { jQuery(this).find('ul:first').slideDown(200).css('visibility', 'visible'); jQuery(this).addClass('selected'); }, function() { jQuery(this).find('ul:first').slideUp(200); jQuery(this).removeClass('selected'); }); });

jQuery(document).ready(function(){
        jQuery('#f-post-page').click(function() {
            jQuery('#f-post-page-container').css("display", "block");
			jQuery('#f-post-page').css("display", "none");
          });
    });