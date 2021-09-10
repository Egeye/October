var phoneVue = new Vue({
    el: '#phoneApp',
    data: function () {
        return {
            visibleConfig: {},
            loadingConfig: {loading: false},
            urls: {
                p: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=${phone}'
            },
            phoneForm: {},
            phoneModel: {province: '', catName: '', areaVid: ''},
            scriptObj: '',
            rules: {
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'change'},
                    {message: '请输入正确的号码', trigger: 'change', pattern: /^1[0-9]{10}$/ || /^([0-9]{3,4}-)?[0-9]{7,8}$/},
                ]
            },
        }
    },
    methods: {
        handleChangePhone() {
        },
        handleRequest(that, urlStr) {
            try {
                that.scriptObj = document.createElement('script');
                that.scriptObj.type = 'text/javascript';

                // 传参并指定回调执行函数为onBack
                that.scriptObj.src = urlStr + '&callback=phoneVue.onScriptLoaded';
                document.head.appendChild(that.scriptObj);
            } catch (e) {
                console.log(e);
                this.loadingConfig.loading = false;
            }

        },
        onScriptLoaded(response) {
            console.log('response', response);
            this.phoneModel.areaVid = response.areaVid || '';
            this.phoneModel.catName = response.catName || '';
            this.phoneModel.province = response.province || '';
            if (this.scriptObj) document.head.removeChild(this.scriptObj);
            this.loadingConfig.loading = false;
        },

        handleCommitPhone() {
            if (!this.phoneForm.phone) return;
            this.loadingConfig.loading = true;
            console.log('handleCommitPhone');
            let url = this.urls.p.replace('${phone}', this.phoneForm.phone);
            let that = this;
            this.handleRequest(that, url);
        },
        // __GetZoneResult_ = {
        //     mts:'1806087',
        //     province:'福建',
        //     catName:'中国电信',
        //     telString:'18060875165',
        //     areaVid:'30519',
        //     ispVid:'138238560',
        //     carrier:'福建电信'
        // }
    }
});