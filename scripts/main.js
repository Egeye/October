$(document).ready(function () {
    var selectItem;
    var mainVue = new Vue({
        el: '#mainApp',
        data: {
            mainData: {},
            showConfig: {showElMenu: true},
            loading: false,
            currentUrl: ''
        },
        created() {
            let that = this;
            $.getJSON("../resource/data/mainData.json", function (response) {
                that.mainData = response;
                that.handleInitRouter();
            });
        },
        methods: {
            handleInitRouter() {
                let routerValues = this.mainData['routerData'] || {};
                // 不符合上述路由时，默认跳至
                Object.assign(routerValues, {'defaults': 'home'});
                vipspa.start({
                    view: '#viewPage',// 装载视图的dom
                    router: routerValues,
                    errorTemplateId: '#error'
                });
            },
            menuClick: function (data) {
                selectItem = data;
            },
            handleLogout() {
                this.$confirm('确定退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.href = "../views/login.html";
                });
            },
            handleMenuSwitch: function (menu) {
                console.log(menu);
                this.showConfig.showElMenu = menu.switch.value;
            },
            handleMenuOpen: function (key, keyPath) {
                // console.log(key, keyPath);
            },
            handleMenuClose: function (key, keyPath) {
                // console.log(key, keyPath);
            },
            handleMainLoading(param) {
                // this.loading = param.loading;
                if (param.loaded) {
                    return;
                }
                if (param.loading) {
                    $(".or-loading").fadeIn(1000);
                } else {
                    $(".or-loading").fadeOut(1000);
                }

            },
            handleMenuSelect: function (key) {
                let menuList = this.mainData['menuList'];
                let target = '';
                for (let i = 0; i < menuList.length; i++) {
                    let item = menuList[i];
                    if (item.id === key) {
                        // vipspa.setMessage({id: item.href, callback: this.handleMainLoading});
                        target = item.href;
                        break;
                    }
                    if (item.hasOwnProperty('dropList')) {
                        for (let jj = 0; jj < item.dropList.length; jj++) {
                            let cItem = item.dropList[jj];
                            if (cItem.id === key) {
                                target = cItem.href;
                                // vipspa.setMessage({id: cItem.href, callback: this.handleMainLoading});
                                break;
                            }
                        }
                    }
                }
                if (target && this.currentUrl !== target) {
                    this.currentUrl = target;
                    window.location.hash = vipspa.stringify(target);
                }
            },
        }
    });

    $(".menu-container").jSideMenu({
        jSidePosition: "position-left", //possible options position-left or position-right
        jSideSticky: true, // menubar will be fixed on top, false to set static
        // jSideSkin: "default-skin" // to apply custom skin, just put its name in this string
        jSideSkin: "el-theme" // to apply custom skin, just put its name in this string
        // jSideSkin: "moonlit" // to apply custom skin, just put its name in this string
        // jSideSkin: "light-skin" // to apply custom skin, just put its name in this string
    });

    $(".github-link").css('color', "#409eff");

    var menuList = $(".menu-items div");
    menuList.first().addClass("clickMenu");
    menuList.click(function () {
        var $that = $(this);
        if (!selectItem) return;
        if (!selectItem.hasOwnProperty("dropList")) {
            $(this).siblings().removeClass('clickMenu');
            $(this).siblings().each(function (index, item) {
                $(item).find("li span").removeClass('clickMenu');
            });
            $(this).addClass('clickMenu');
            $(".has-sub ul div").each(function () {
                $(this).siblings().removeClass('clickMenuChild');
            });
        } else {

            $(".has-sub ul div").click(function () {
                $(".has-sub ul div").each(function () {
                    $(this).siblings().removeClass('clickMenuChild');
                });

                $(this).siblings().removeClass('clickMenuChild');
                $(this).addClass('clickMenuChild');

                $that.siblings().removeClass('clickMenu');
                $that.siblings().each(function (index, item) {
                    $(item).find("li span").removeClass('clickMenu');
                });
                $that.find('span').addClass('clickMenu');
            });
        }
    });

    $(".or-loading").fadeOut(1000);
});