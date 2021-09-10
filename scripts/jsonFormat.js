var jsonFormatVue = new Vue({
    el: '#app',
    data() {
        return {
            jForm: {theme: '', language: ''},
            themeData: [],
            languageData: [],
            editor: {},
            editorFull: {},
            formatResult: {notify: {}},
            configData: {openConfirm: true, fullscreen: false, fullscreenIcon: 'el-icon-full-screen'},
            dialogConfig: {showDialog: false, initFlg: true, height: 0, fullHeight: 0},
        }
    },
    mounted() {

        this.editor = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
            lineNumbers: true,
            // value: value,
            styleActiveLine: true,
            matchBrackets: true,
            theme: "monokai",
            // overlay simple null
            scrollbarStyle: 'simple',
            mode: "javascript",
            indentUnit: 2,
            keyMap: "sublime",
            fixedGutter: true,
            autoCloseBrackets: true,
            showCursorWhenSelecting: true,
            tabSize: 2,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            lineWrapping: true,
            extraKeys: {
                "Esc": function (cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            },
            highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
        });

        // this.editor.setSize('auto', 'auto');
        this.editor.setSize('auto', '600px');

        this.handleInitData();
    },
    methods: {
        handleInitData() {
            let that = this;
            axios.get('../resource/data/jsonFormat-initData.json').then(function (response) {
                that.themeData = response.data.themeData;
                that.languageData = response.data.languageData;
                that.jForm.theme = 'monokai';
                that.jForm.language = 'javascript';
            }).catch(function (error) {
                console.log(error);
            }).then(function () {
                // always executed
            });
        },
        handleChangeTheme(choice) {
            if (choice) {
                this.editor.setOption('theme', choice);
                if (!this.dialogConfig.initFlg) {
                    this.editorFull.setOption('theme', choice);
                }
            }
        },
        handleChangeMode(choice) {
            if (choice) {
                this.editor.setOption('mode', choice);
                if (!this.dialogConfig.initFlg) {
                    this.editorFull.setOption('mode', choice);
                }
            }
        },
        handleFullScreen() {
            this.editor.setOption("fullScreen", !this.editor.getOption("fullScreen"));
        },
        handleFullscreen() {
            this.configData.fullscreen = !this.configData.fullscreen;
            if (this.configData.fullscreen) {
                this.configData.fullscreenIcon = 'el-icon-rank';

                // 最大化弹框，重设编辑器高度
                if (this.dialogConfig.fullHeight === 0) {
                    this.dialogConfig.fullHeight = document.body.clientHeight - 100;
                }
                this.editorFull.setSize('auto', this.dialogConfig.fullHeight + 'px');
            } else {
                this.configData.fullscreenIcon = 'el-icon-full-screen';

                // 非最大化弹框，恢复编辑器高度
                this.editorFull.setSize('auto', this.dialogConfig.height + 'px');
            }
        },
        handleDialogCommand(v) {
            console.log('handleDialogOptions?', v);
        },
        handleZip() {
            let v = this.editor.getValue();
            let result = this.jsonFormat(v, true);
            if (result.success) {
                this.editor.setValue(result.data);
            } else {
                this.$notify.info({
                    title: '错误',
                    message: result.message
                });
            }
            // console.log(result)
        },
        isJSONStr(str) {
            let result = {};
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        result['success'] = false;
                        return result;
                    } else {
                        if (typeof obj == 'string') {
                            var againObj = JSON.parse(obj);
                            if (typeof againObj == 'object' && againObj) {
                                result['success'] = true;
                                result['data'] = obj;
                                return result;
                            } else {
                                result['success'] = false;
                                return result;
                            }
                        }
                        result['success'] = false;
                        return result;
                    }
                } catch (e) {
                    console.log('error：' + str + '!!!' + e);
                    result['success'] = false;
                    return result;
                }
            }
            console.log('It is not a string!');
            result['success'] = false;
            return result;
        },
        handleFormat() {
            let v;
            if (this.dialogConfig.showDialog) {
                v = this.editorFull.getValue();
            } else {
                v = this.editor.getValue();
            }
            if (v === '') return;
            let rrr = this.isJSONStr(v);
            if (rrr['success']) {
                v = rrr['data'];
                if (this.configData.openConfirm) {
                    this.$confirm('文本内容是一个字符串,而不是对象,需要转成JSON对象么?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let result = this.jsonFormat(v, false);
                        if (result.success) {
                            this.editor.setValue(result.data);
                        } else {
                            this.$notify.info({
                                title: '错误',
                                message: result.message
                            });
                        }
                        // this.formatResult['success'] = true;
                        // let fv = this.formatJson(v, this.handleFormatErr);
                        // if (this.formatResult['success']) this.editor.setValue(fv);
                    }).catch(() => {

                    });
                    return;
                }
            }
            // this.formatResult['success'] = true;
            // let fv = this.formatJson(v, this.handleFormatErr);
            // if (this.formatResult['success']) this.editor.setValue(fv);
            let result = this.jsonFormat(v, false);
            if (result.success) {
                if (this.dialogConfig.showDialog) {
                    this.editorFull.setValue(result.data);
                } else {
                    this.editor.setValue(result.data);
                }
                this.$message({message: '已格式化', type: 'success'});
            } else {
                this.$notify.info({title: '错误', message: result.message});
            }
        },
        handleFormatErr(error) {
            this.formatResult['success'] = false;
            this.formatResult['msg'] = error;
            this.formatResult['notify'] = this.$notify.error({
                title: '错误',
                message: 'json数据格式有误。' + error
            });
        },
        handleMore(v) {
            // a 弹框展示
            if (v === 'a') {
                let editorValue = this.editor.getValue();
                this.dialogConfig.showDialog = true;
                if (this.dialogConfig.initFlg) {
                    let that = this;
                    this.$nextTick(() => {
                        if (that.dialogConfig.height === 0) {
                            that.dialogConfig.height = Math.floor(document.body.clientHeight / 2);
                        }
                        that.editorFull = CodeMirror.fromTextArea(document.getElementById("codeAreaFull"), {
                            lineNumbers: true,
                            styleActiveLine: true,
                            matchBrackets: true,
                            theme: "monokai",
                            scrollbarStyle: 'simple',
                            mode: "javascript",
                            indentUnit: 2,
                            keyMap: "sublime",
                            fixedGutter: true,
                            autoCloseBrackets: true,
                            showCursorWhenSelecting: true,
                            tabSize: 2,
                            foldGutter: true,
                            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                            lineWrapping: true,
                            extraKeys: {
                                "Esc": function (cm) {
                                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                                }
                            },
                            highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
                        });
                        that.editorFull.setValue(editorValue);
                        that.editorFull.setSize('auto', that.dialogConfig.height + 'px');
                        that.dialogConfig.initFlg = false;
                    });
                } else {
                    this.editorFull.setValue(editorValue);
                }
            }
        },
        handleCloseDialog() {
            this.editor.setValue(this.editorFull.getValue());
        },

        // 格式方法
        transitionJsonToString(jsonObj, callback) {
            // 转换后的jsonObj受体对象
            var _jsonObj = null;
            // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
            if (Object.prototype.toString.call(jsonObj) !== "[object String]") {
                try {
                    _jsonObj = JSON.stringify(jsonObj);
                } catch (error) {
                    // 转换失败错误信息
                    // console.error('您传递的json数据格式有误，请核对...');
                    // console.error(error);
                    callback(error);
                }
            } else {
                try {
                    jsonObj = jsonObj.replace(/(\')/g, '\"');
                    _jsonObj = JSON.stringify(JSON.parse(jsonObj));
                } catch (error) {
                    // 转换失败错误信息
                    // console.error('您传递的json数据格式有误，请核对...');
                    // console.error(error);
                    callback(error);
                }
            }
            return _jsonObj;
        },

        // callback为数据格式化错误的时候处理函数
        formatJson(jsonObj, callback) {
            // 正则表达式匹配规则变量
            var reg = null;
            // 转换后的字符串变量
            var formatted = '';
            // 换行缩进位数
            var pad = 0;
            // 一个tab对应空格位数
            var PADDING = '    ';
            // json对象转换为字符串变量
            var jsonString = this.transitionJsonToString(jsonObj, callback);
            if (!jsonString) {
                return jsonString;
            }
            // 存储需要特殊处理的字符串段
            var _index = [];
            // 存储需要特殊处理的“再数组中的开始位置变量索引
            var _indexStart = null;
            // 存储需要特殊处理的“再数组中的结束位置变量索引
            var _indexEnd = null;
            // 将jsonString字符串内容通过\r\n符分割成数组
            var jsonArray = [];
            // 正则匹配到{,}符号则在两边添加回车换行
            jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
            // 正则匹配到[,]符号则在两边添加回车换行
            jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
            // 正则匹配到,符号则在两边添加回车换行
            jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
            // 正则匹配到要超过一行的换行需要改为一行
            jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
            // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
            jsonString = jsonString.replace(/\r\n\,/g, ',');
            // 特殊处理双引号中的内容
            jsonArray = jsonString.split('\r\n');
            jsonArray.forEach(function (node, index) {
                // 获取当前字符串段中"的数量
                var num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
                // 判断num是否为奇数来确定是否需要特殊处理
                if (num % 2 && !_indexStart) {
                    _indexStart = index
                }
                if (num % 2 && _indexStart && _indexStart !== index) {
                    _indexEnd = index
                }
                // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
                if (_indexStart && _indexEnd) {
                    _index.push({
                        start: _indexStart,
                        end: _indexEnd
                    });
                    _indexStart = null
                    _indexEnd = null
                }
            });
            // 开始处理双引号中的内容，将多余的"去除
            _index.reverse().forEach(function (item, index) {
                var newArray = jsonArray.slice(item.start, item.end + 1)
                jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''))
            });
            // 奖处理后的数组通过\r\n连接符重组为字符串
            jsonString = jsonArray.join('\r\n');
            // 将匹配到:后为回车换行加大括号替换为冒号加大括号
            jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
            // 将匹配到:后为回车换行加中括号替换为冒号加中括号
            jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
            // 将上述转换后的字符串再次以\r\n分割成数组
            jsonArray = jsonString.split('\r\n');
            // 将转换完成的字符串根据PADDING值来组合成最终的形态
            jsonArray.forEach(function (item, index) {
                // console.log(item)
                var i = 0;
                // 表示缩进的位数，以tab作为计数单位
                var indent = 0;
                // 表示缩进的位数，以空格作为计数单位
                var padding = '';
                if (item.match(/{$/) || item.match(/\[$/)) {
                    // 匹配到以{和[结尾的时候indent加1
                    indent += 1
                } else if (item.match(/}$/) || item.match(/]$/) || item.match(/},$/) || item.match(/],$/)) {
                    // 匹配到以}和]结尾的时候indent减1
                    if (pad !== 0) {
                        pad -= 1
                    }
                } else {
                    indent = 0
                }
                for (i = 0; i < pad; i++) {
                    padding += PADDING
                }
                formatted += padding + item + '\r\n';
                pad += indent
            });
            // 返回的数据需要去除两边的空格
            return formatted.trim();
        },

        /**
         * JSON 格式化
         * @param txt
         * @param compress true:表示压缩json字符串 | false:表示格式化json字符串
         * @returns {string}
         */
        jsonFormat(txt, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
            var result = {};
            var indentChar = '  ';
            if (/^\s*$/.test(txt)) {
                console.log('数据为空,无法格式化! ');
                result['success'] = false;
                result['message'] = '数据为空,无法格式化! ';
                return result;
            }
            try {
                var data = eval('(' + txt + ')');
            } catch (e) {
                console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
                result['success'] = false;
                result['message'] = '数据源语法错误,格式化失败! 错误信息: ' + e.description;
                return result;
            }
            var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

            var space = '';
            var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
                nodeCount++;/*节点计数*/
                for (var i = 0, tab = ''; i < indent; i++) tab += indentChar;/* 缩进HTML */
                tab = compress ? '' : tab;/*压缩模式忽略缩进*/
                maxDepth = ++indent;/*缩进递增并记录*/
                if (value && value.constructor === Array) {/*处理数组*/
                    draw.push(tab + (formObj ? (space + '"' + name + '": ') : '') + '[' + line);/*缩进'[' 然后换行*/
                    for (var i = 0; i < value.length; i++)
                        notify(i, value[i], i === value.length - 1, indent, false);
                    draw.push(tab + space + ']' + (isLast ? line : (',' + line)));/*缩进']'换行,若非尾元素则添加逗号*/
                } else if (value && typeof value == 'object') {/*处理对象*/
                    draw.push(tab + (formObj ? (space + '"' + name + '": ') : '') + '{' + line);/*缩进'{' 然后换行*/
                    var len = 0, i = 0;
                    for (var key in value) len++;
                    for (var key in value) notify(key, value[key], ++i === len, indent, true);
                    draw.push(tab + '}' + (isLast ? line : (',' + line)));/*缩进'}'换行,若非尾元素则添加逗号*/
                } else {
                    if (typeof value == 'string') value = '"' + value + '"';
                    draw.push(tab + (formObj ? (space + '"' + name + '": ') : '') + value + (isLast ? '' : ',') + line);
                }
            };
            var isLast = true, indent = 0;
            notify('', data, isLast, indent, false);
            result['data'] = draw.join('');
            result['success'] = true;
            return result;
        },

    }
});