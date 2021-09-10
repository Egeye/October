$('document').ready(function () {
    $.getJSON("../data/wordData.json", function (response) {
        new Vue({
            el: '.leaderboard',
            data: {
                response: response
            },
            methods:{
                testDetail: function (data) {
                    console.log(data);
                }
            }
        })
    });

});