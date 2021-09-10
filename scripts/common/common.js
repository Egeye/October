$(function () {
    $(window).scroll(function () {
        var isTop = $(window).scrollTop();
        if (isTop >= 100) {
            $(".topHome").fadeIn();
        } else {
            $(".topHome").fadeOut();
        }
    });

    $("a[href='#top']").click(function () {
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
    });

    $('.navbar-inverse').on('click', 'li a', function () {
        $('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
    });
});