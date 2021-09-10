jQuery(document).ready(function ($) {
    let patrioticIndex = 0;
    let patriotic = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"];
    let faces = ["Hi~ o(*￣▽￣*)ブ", "(/≧▽≦)/~┴┴ ", "ヾ(￣▽￣)Bye~Bye~", "╮(￣⊿￣)╭", "(⊙o⊙)", "(´▽｀)ノ♪", "[]~(￣▽￣)~* 干杯", "( ￣▽￣)σ", "(\" ▔□▔)", "(ー_ー)!!"];
    $("body").click(function (e) {
        let $i = $("<span/>").text(patriotic[patrioticIndex] + faces[Math.floor(Math.random() * 10)]);
        patrioticIndex = (patrioticIndex + 1) % patriotic.length;
        let x = e.pageX;
        let y = e.pageY;
        $i.css({
            "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
            "top": y - 20,
            "font-weight": "bold",
            "left": x,
            "position": "absolute",
            "color": '#' + Math.floor(Math.random() * 0xffffff).toString(16)
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            2500,
            function () {
                $i.remove();
            });
    });
});
