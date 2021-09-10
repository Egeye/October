// https://wannianli.tianqi.com/jisuanqi/
// cancelAnimationFrame
new Vue({
    el: '#clockApp',
    data: {
        visibleConfig: {runningTime: false, drawerTime: false},
        currentDate: new Date(),
        timeToolForm: {startDate: '', stopDate: '', diffDay: ''},
        pickerOptions: {
            // disabledDate(time) {
            //     return time.getTime() > Date.now();
            // },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                    picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }]
        },
        romanNumber: [
            {'label': 'Ⅻ', visible: false},
            {'label': 'Ⅰ', visible: false},
            {'label': 'Ⅱ', visible: false},
            {'label': 'Ⅲ', visible: false},
            {'label': 'Ⅳ', visible: false},
            {'label': 'Ⅴ', visible: false},
            {'label': 'Ⅵ', visible: false},
            {'label': 'Ⅶ', visible: false},
            {'label': 'Ⅷ', visible: false},
            {'label': 'Ⅸ', visible: false},
            {'label': 'Ⅹ', visible: false},
            {'label': 'Ⅺ', visible: false},
        ],
    },
    created() {
    },
    mounted() {
    },
    methods: {
        handleBeforeCloseRT(done) {
            for (let i = 0; i < this.romanNumber.length; i++) {
                let rObj = this.romanNumber[i];
                rObj.visible = false;
            }
            console.log('this.romanNumber', this.romanNumber)
            done();
        },
        handleShowDraw() {
            this.visibleConfig.runningTime = true;
            let that = this;
            window.setTimeout(function () {
                that.drawClock();
            }, 1000);

            let map12 = 0;
            this.handleShowTimeNumber(map12);
        },
        handleShowTimeNumber(tIdx) {
            if (tIdx > 12) return;
            let that = this;
            window.setTimeout(function () {
                if (that.romanNumber[tIdx]) {
                    that.romanNumber[tIdx].visible = true;
                }
                if (tIdx < 12) {
                    tIdx++;
                    that.handleShowTimeNumber(tIdx);
                }
            }, 200);
        },
        drawClock() {
            let canvas = document.getElementById('lineClock');
            let currentTime = new Date();
            let hour = (currentTime.getHours() % 12) * Math.PI / 6;
            let minute = currentTime.getMinutes() * Math.PI / 30;
            let second = currentTime.getSeconds() * Math.PI / 30;
            hour = hour - Math.PI * (1 / 2);
            minute = minute - Math.PI * (1 / 2);
            second = second - Math.PI * (1 / 2);
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');
                let s = Math.PI / 1800;
                let m = s / 60;
                let h = m / 12;
                requestAnimationFrame(step);

                function step() {
                    second = second + s;
                    minute = minute + m;
                    hour = hour + h;
                    if (second >= Math.PI * (3 / 2)) {
                        second = Math.PI * (-1 / 2);
                    }
                    if (minute >= Math.PI * (3 / 2)) {
                        minute = Math.PI * (-1 / 2);
                    }
                    if (second >= Math.PI * (3 / 2)) {
                        second = Math.PI * (-1 / 2);
                    }
                    //秒针的终点
                    let xs = 150 * Math.cos(second) + 200;
                    let ys = 150 * Math.sin(second) + 200;
                    //分针的终点
                    let xm = 100 * Math.cos(minute) + 200;
                    let ym = 100 * Math.sin(minute) + 200;
                    //时针的终点
                    let xh = 50 * Math.cos(hour) + 200;
                    let yh = 50 * Math.sin(hour) + 200;

                    ctx.clearRect(0, 0, 400, 400);
                    ctx.beginPath();
                    ctx.strokeStyle = '#409EFF';
                    ctx.lineWidth = 2;
                    //绘制指针
                    ctx.moveTo(200, 200);
                    ctx.lineTo(xs, ys);
                    ctx.moveTo(200, 200);
                    ctx.lineTo(xm, ym);
                    ctx.moveTo(200, 200);
                    ctx.lineTo(xh, yh);
                    //绘制圆形轮廓
                    ctx.moveTo(200, 150);
                    ctx.arc(200, 200, 50, Math.PI * (-1 / 2), hour, false);
                    ctx.moveTo(200, 100);
                    ctx.arc(200, 200, 100, Math.PI * (-1 / 2), minute, false);
                    ctx.moveTo(200, 50);
                    ctx.arc(200, 200, 150, Math.PI * (-1 / 2), second, false);
                    ctx.stroke();
                    requestAnimationFrame(step);
                }
            }
        },
        handleShowCalc() {
            this.visibleConfig.drawerTime = true;
        },
        handleChangeStartDate(vv) {
            console.log('handleChangeStartDate', vv)
            console.log('this', this.timeToolForm)
            console.log('diff', this.timeToolForm.stopDate - this.timeToolForm.startDate)
            if (this.timeToolForm.startDate && this.timeToolForm.stopDate) {
                this.timeToolForm.diffDay = (this.timeToolForm.stopDate - this.timeToolForm.startDate) / 86400000
            } else {
                this.timeToolForm.diffDay = '';
            }

        },
        handleChangeStopDate(vv) {
            console.log('stop', vv)
            if (this.timeToolForm.startDate && this.timeToolForm.stopDate) {
                this.timeToolForm.diffDay = (this.timeToolForm.stopDate - this.timeToolForm.startDate) / 86400000
            } else {
                this.timeToolForm.diffDay = '';
            }
        },
    }
});

var hzWeek = ["日", "一", "二", "三", "四", "五", "六", "日"];

function cweekday(wday) {
    return hzWeek[wday];
}

function cala() {
    y = document.getElementById("SY").value;
    m = document.getElementById("SM").value;
    d = document.getElementById("SD").value;
    ddd = document.getElementById("decday").value;

    ttt = new Date(y, m - 1, d).getTime() + ddd * 24000 * 3600;

    theday = new Date();
    theday.setTime(ttt);
    document.getElementById("result1").innerHTML = theday.getFullYear() + "年" + (1 + theday.getMonth()) + "月" + theday.getDate() + "日" + "星期" + cweekday(theday.getDay());
}

function calb() {
    var y2 = document.getElementById("SY2").value;
    var m2 = document.getElementById("SM2").value;
    var d2 = document.getElementById("SD2").value;
    var y3 = document.getElementById("SY3").value;
    var m3 = document.getElementById("SM3").value;
    var d3 = document.getElementById("SD3").value;
    var day2 = new Date(y2, m2 - 1, d2);
    var day3 = new Date(y3, m3 - 1, d3);
    document.getElementById("result2").innerHTML = (day3 - day2) / 86400000;
}

function OnEnter(pp, vv) {
    console.log('pp', pp)
    console.log('vv', vv)
}

function OnExit(pp, vv) {
    console.log('OnExit pp', pp)
    console.log('OnExit vv', vv)
}