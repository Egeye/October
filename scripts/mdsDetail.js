$(function () {

    $.get("../resource/mds/test.2018-11-04.md", function (response) {
        document.getElementById('content').innerHTML = marked(response);
    });


});

var mdsVue = new Vue({
    el: '#mdsDetailApp',
    data: function () {
        return {

        }
    },
    methods: {
        handleSelect: function (value) {
            console.log(value)
        }
    }
});
