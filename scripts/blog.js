var execute = {
    setPages: function () {
        $('#mainNav').onePageNav({
            currentClass: 'active',
            changeHash: false,
            scrollSpeed: 950,
            scrollThreshold: 0.2,
            filter: '',
            easing: 'swing',
            begin: function () {
                //I get fired when the animation is starting
            },
            end: function () {
                //I get fired when the animation is ending
            },
            scrollChange: function ($currentListItem) {
                //I get fired when you enter a section and I pass the list item of the section
            }
        });


    },
    getFiles: function () {
        // $("#idMD").load("../mds/test.2018-11-04.md");
        var $mdList = $('#mdList');
        var renderList = function (data) {
            for (var i = 0; i < data.length; i++) {
                var el = "<div class='md-item'>" +
                    "<div class='md-item-d'><img class='md-pic' src='../styles/images/bg-lamp.jpg'/>" +
                    "<div class='md-info'>" +
                    "<h6><a class='a-title' href=''>" + data[i]["title"] + "</a></h6>" +
                    "<div class='md-info-desc'>" + data[i]["describe"] + "</div>" +
                    "<span class='label label-danger'>blog</span>" +
                    "<div class='md-info-auth'>" +
                    "<span class='glyphicon  glyphicon-time md-info-icon'></span>" +
                    "<span class='md-info-time'>" + data[i]["time"] + "</span>" +
                    "<span class='glyphicon glyphicon-eye-open md-info-icon'></span>" +
                    "<span class='md-info-eye'>" + data[i]["reader"] + "</span>" +
                    "<a class='md-detail'>更多<span class='glyphicon glyphicon-link'></span></a>" +
                    "</div></div></div></div>";
                $mdList.append(el);
            }
        };
        $.getJSON("../resource/data/mdData.json", function (r) {
            // renderList(r["mdList"]);
            new Vue({
                el: '#mdList',
                data: {
                    articleList: r
                },
                methods:{
                    detail: function (d) {
                        console.log(d);
                        window.location.href = "../views/main.html";
                    }
                }
            })
        });
    }
};
$('document').ready(function () {
    execute.setPages();
    execute.getFiles();
});