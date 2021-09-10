$(function () {
    var jSide = $(".menu-container, .menu-head, .menubar");
    $(".menu-position").on('change', function () {
        $(jSide).not(".menubar").addClass($(this).val());
        $(".j-pos").html('jSidePosition: "position-right",');
        if ($(this).val() == 'position-left') {
            $(jSide).removeClass("position-right");
            $(".j-pos").html('jSidePosition: "position-left",');
            $(".menu-trigger").removeClass("right").addClass("left");
        } else {
            $(jSide).removeClass("position-left");
            $(".menu-trigger").removeClass("left").addClass("right");
        }
    });
    $(".bg-color").on('change', function () {
        var color = $(this).val();
        $(jSide).css({'background': color,});
        $(".bg-color-input").val(color);
    });
    $(".bg-color-input").on('input', function () {
        // $(jSide).css({'background': $(this).val(),});
    });
    $("#set-top").change(function () {
        $(".menubar").addClass("sticky");
        $(".j-sticky").html("jSideSticky: true,");
    });
    $("#set-st").change(function () {
        $(".menubar").removeClass("sticky");
        $(".j-sticky").html("jSideSticky: false,");
    });
    $(".theme-tray span").click(function () {
        var skin = $(this).attr("class");

        var background = $(this).css('background');
        var index = background.lastIndexOf(")");
        var rgb = background.substring(0, index + 1)
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        var ccc = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);

        $(".menubar").attr('class', skin).addClass("menubar sticky");
        $(".menu-container").attr('class', skin).addClass("menu-container position-left");
        $(".menu-head").attr('class', skin).addClass("menu-head position-left");
        $(".github-link").css('color', ccc);
    });
});