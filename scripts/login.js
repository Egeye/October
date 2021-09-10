$(function () {


    iziToast.settings({
        timeout: 5000,
        // position: 'center',
        // imageWidth: 50,
        pauseOnHover: true,
        // resetOnHover: true,
        close: true,
        progressBar: true,
        // layout: 1,
        // balloon: true,
        // target: '.target',
        // icon: 'material-icons',
        // iconText: 'face',
        // animateInside: false,
        // transitionIn: 'flipInX',
        // transitionOut: 'flipOutX',
    });

    if (sessionStorage.getItem("errMsg") && sessionStorage.getItem("errMsg") !== "") {
        iziToast.error({
            title: '',
            message: sessionStorage.getItem("errMsg"),
            position: 'topRight',
            transitionIn: 'fadeInDown'
        });
        sessionStorage.removeItem("errMsg");
    }

    $('#login').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === "") {
            iziToast.warning({
                title: '',
                message: '请输入用户名！',
                position: 'topLeft',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX'
            });
            return;
        }
        if (password === "") {
            iziToast.warning({
                title: '',
                message: '请输入密码！',
                position: 'topLeft',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX'
            });
            return;
        }
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        if (username.toLowerCase() !== "octavius" || password !== "123456") {
            iziToast.warning({
                title: '',
                message: '用户名或者密码错误！',
                position: 'topLeft',
                transitionIn: 'flipInX',
                transitionOut: 'flipOutX'
            });
            return;
        }
        window.location.href = "../views/oldIndex.html";
    });

});