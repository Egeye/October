var mdsVue = new Vue({
    el: '#mdsApp',
    data: function () {
        return {

        }
    },
    created() {
        console.log('mdsApp')
    },
    methods: {
        handleSelect: function (value) {
            console.log(value)
        }
    }
});
