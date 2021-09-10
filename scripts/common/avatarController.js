new Vue({
    el: '#app',
    data: function () {
        return {}
    },
    created: function () {
        console.log('created')
    },
    methods: {
        handleLogout() {
            this.$confirm('确定退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.location.href = "../views/login.html";
            });
        },
        handleJumpToMain() {
            window.location.href = "../views/main.html";
        },
        handleAvatar: function (command) {
            if (command === 'logout') this.handleLogout();
            if (command === 'main') this.handleJumpToMain();
        },
    }
});