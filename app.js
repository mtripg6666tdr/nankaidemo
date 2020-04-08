////////////////////////////
// NANKAIDEMO Web App JavaScript Source Code
// 
// Copyright (c) 2016-2020 mtripg6666tdr All Rights Reserved.
// 
// App Name:   Nankaidemo 何回でも
// App Url:    index.html
// App Author: mtripg6666tdr
//
// Twitter:    @mtripg6666tdr
////////////////////////////

const NANKAIDEMO_LOOP_COUNT_PREVIOUS = 'nankaidemo_loopcount_previous_setting';
const NANKAIDEMO_LOOP_ORIGINAL_TEXT_PREVIOUS = 'nankaidemo_loop_original_text_previous';
const NANKAIDEMO_EASYSELECTOR_CUSTOMIZE_DATA = 'nankaidemo_easySelector_customize_data';

//Strings
const cantUseJQuery = 'jQueryが使えません。管理者にお問い合わせください。';
const url_f = 'data:text/javascript;base64,';
const at_e = 'XRyaXBnNjY2NnRk';
var cs_1 = 'd2hpbGUoMSk7';
var cs_2 = 'Y29uc29sZS5sb2coMSk';
var srpt = 'c2NyaXB0';
var x0_C = 'c';

var EasyInputSelectorDataDefault = ['ここから選択して簡単入力', 'w', '笑', '泣', '(笑)', '(泣)', '(´^ω^｀)', '寂しい',  '好き', '大好き'];
var EasyInputSelectorDataCustomize = [];
var EasyInputSelectorData = EasyInputSelectorDataDefault.slice(0, EasyInputSelectorDataDefault.length);

var x05e = window;
var x06e = x05e;
var x12b = x05e === window ? x05e : window;
var x15f;var x16f;var x17f;var x0000f = 17326754;
var xFts = function(a,b){
    return a.toString(b);
}
x05e.mainApp = {};
x05e.x64a = function(x){
    return atob(x);
}
x05e.mainApp.Finish = function(x0h_a){
    if(x06e === window){
        while(true);
    }
    if(x0h_a !== x05e[xFts(1547578, Math.pow(2*3, 2))](xFts(11, 31) + at_e +xFts(12, 31)+xFts(16, 31)+'==')){
        var _xtmp = document.createElement(x05e.x64a(srpt));
        _xtmp.src = url_f + cs_1;
        document.head.appendChild(_xtmp);
    }else{
        var _xtmp = document.createElement(x05e.x64a(srpt));
        _xtmp.src = url_f + cs_2 + '=';
        document.head.appendChild(_xtmp);
    }
    if(!CanUseJQuery()){
        window.alert(cantUseJQuery);
    }
    $(document).ready(function(){
        MapMainContent();
        var customizeData = localStorage.getItem(NANKAIDEMO_EASYSELECTOR_CUSTOMIZE_DATA);
        if(customizeData !== null){
            EasyInputSelectorDataCustomize = JSON.parse(customizeData).main;
            EasyInputSelectorData = EasyInputSelectorData.concat(EasyInputSelectorDataCustomize);
        }
        var loopCountData = localStorage.getItem(NANKAIDEMO_LOOP_COUNT_PREVIOUS)
        $('input#loop-count')
        .val(loopCountData === undefined || loopCountData === null ? '500': loopCountData)
        .on('change', function(){
            localStorage.setItem(NANKAIDEMO_LOOP_COUNT_PREVIOUS, this.value)
        })
        var originalTextData = localStorage.getItem(NANKAIDEMO_LOOP_ORIGINAL_TEXT_PREVIOUS);
        $('input#original-text').val(originalTextData === undefined || originalTextData === null ? '' : originalTextData)
        
        //簡単入力のセレクトボックスをマップ
        for(var i = 0; i < EasyInputSelectorData.length; i++) {
            $('select#easy-input').append(
                $('<option></option>')
                .val(i.toString())
                .text(EasyInputSelectorData[i])
            )
        }
    });
};

var CanUseJQuery = function(){
    return window.jQuery;
};

var MapMainContent = function(){
    //メインアプリのDOMを描画
    //プレースホルダー削除
    $('div#main_app *')
    .remove()
    $('div#main_app')
    //繰り返す文字列の入力欄
    .append(
        $('<input>')
        .attr('type', 'text')
        .attr('placeholder', '繰り返す文字列')
        .attr('id', 'original-text')
        .css('width', '98%')
    )
    .append(
        $('<span></span>')
        .text('を')
    )
    //繰り返す回数の入力欄
    .append(
        $('<input>')
        .attr('type','number')
        .attr('id', 'loop-count')
        .attr('min', '1')
        .val(500)
    )
    .append(
        $('<span></span>')
        .text('回だけ繰り返す。')
    )
    .append(
        $('<br>')
    )
    //簡単入力のぶぶん
    .append(
        $('<span></span>')
        .text('★簡単入力')
    )
    .append(
        $('<select></select')
        .attr('id', 'easy-input')
        .on('change', function(){
            $('input#original-text').val(EasyInputSelectorData[this.value]);
            this.value = 0;
        })
    )
    //簡単入力のカスタマイズダイアログの背景
    .append(
        $('<div></div>')
        .attr('id', 'customize-background')
        .css('position', 'fixed')
        .css('width', '100%')
        .css('height', '100%')
        .css('top', '0px')
        .css('left', '0px')
        .css('background-color', 'rgba(0,0,0,0.4)')
        .css('z-index', '100000')
        .css('display', 'none')
        .on('click', function(){
            CustomizeDialogClose();
        })
    )
    //簡単入力のカスタマイズダイアログ
    .append(
        $('<div></div>')
        .attr('id', 'customize-dialog')
        .css('position', 'fixed')
        .css('width', '80%')
        .css('height', '80%')
        .css('top', '10%')
        .css('right', '10%')
        .css('background-color', 'white')
        .css('box-shadow', '5px 5px 5px black')
        .css('z-index', '100001')
        .css('display', 'none')
        .append(
            $('<div></div>')
            .attr('id', 'customize-dialog-titlebar')
            .css('background-color', 'rgba(200,200,200,1.0)')
            .append(
                $('<p></p>')
                .text('カスタマイズ')
                .addClass('readonly')
                .css('display', 'inline')
            )
            .append(
                $('<button></button>')
                .attr('type', 'button')
                .text('×')
                .css('background-color', 'red')
                .css('color', 'white')
                .css('float', 'right')
                .on('click', function(){
                    CustomizeDialogClose();
                })
            )
        )
        .append(
            $('<hr>')
            .css('margin', '0px')
        )
        .append(
            $('<p></p>')
            .text('簡単入力に追加されている文字列')
        )
        .append(
            $('<p></p>')
            .text('●文字列を押下して削除できます')
        )
        .append(
            $('<div></div>')
            .css('width', '100%')
            .css('height', '75%')
            .append(
                $('<div></div>')
                .attr('id', 'strList')
                .attr('data-modified', 'false')
                .css('border', '1px solid black')
                .css('float', 'left')
                .css('width', '40%')
                .css('height', '100%')
                .css('overflow-y', 'scroll')
                .append(
                    $('<ul></ul>')
                    .attr('id', 'words')
                )
            )
            .append(
                $('<div></div>')
                .css('float', 'left')
                .css('width', '58%')
                .css('height', '100%')
                .append(
                    $('<input>')
                    .attr('type', 'text')
                    .attr('placeholder', '登録する文字列を入力...')
                    .attr('id', 'addCustomizeString')
                    .css('width', '95%')
                    .css('float', 'right')
                    .css('margin-top', '5px')
                )
                .append(
                    $('<button></button>')
                    .attr('type', 'button')
                    .text('登録')
                    .css('float', 'right')
                    .on('click', function(){
                        if($('#addCustomizeString').val() === ''){
                            window.alert('登録する文字列が空白です。\r\n正しく入力してください。');
                            return;
                        }
                        if(EasyInputSelectorDataCustomize.includes($('#addCustomizeString').val())){
                            window.alert('登録しようとしている文字列はすでに登録されています。');
                            return;
                        }
                        EasyInputSelectorDataCustomize.push($('#addCustomizeString').val());
                        MapEasyInputSelectorCostomizeDialog();
                        $('#addCustomizeString').val('');
                        $('div#strList').attr('data-modified', 'true');
                    })
                )
            )
        )
    )
    //[カスタマイズ]ボタン
    .append(
        $('<a></a>')
        .attr('href', 'javascript: void(0)')
        .text('カスタマイズ')
        .css('font-size', '80%')
        .on('click', function(){
            $('div#customize-background').fadeIn();
            $('div#customize-dialog').fadeIn();
            MapEasyInputSelectorCostomizeDialog();
            return false;
        })
    )
    .append(
        $('<br>')
    )
    //オプション欄
    .append(
        $('<div></div>')
        .css('display', 'block')
        .css('margin', '0px auto')
        .css('width', '95%')
        .css('border', '1px black solid')
        .append(
            $('<p></p>').append(
                $('<small></small>')
                .text('オプション')
                .css('text-decoration', 'underline')
            )
        )
        .append(
            $('<input>')
            .attr('type', 'checkbox')
            .attr('id', 'necessary_wrap')
        )
        .append(
            $('<label></label>')
            .addClass('readonly')
            .attr('for', 'necessary_wrap')
            .text('ひとつずつ改行する')
            
        )
    )
    //実行ボタン　//スタイル設定多め
    .append(
        $('<div></div>')
        .css('display','block')
        .css('width', '98%')
        .css('margin-top', '10px')
        .css('margin-bottom', '10px')
        .append(
            $('<button></button>')
            .attr('type','button')
            .addClass('readonly')
            .text('実行')
            .css('background-color', 'gray')
            .css('padding-top', '10px')
            .css('padding-bottom', '10px')
            .css('padding-right', '50px')
            .css('padding-left', '50px')
            .css('color', 'white')
            .css('border-radius', '15px')
            .css('margin', '0px auto')
            .css('display', 'block')
            .css('font-size', '120%')
        )
        .on('click', function(){
            var original_text = $('input#original-text').val();
            var num_text = $('input#loop-count').val();
            if(num_text === undefined){ 
                window.alert('回数を正しく入力してください');
                return;
            }
            var num = Number(num_text);
            var wrap = $('input#necessary_wrap').prop('checked') ? '\r\n' : '';
            var result = '';
            for(var i = 0; i < num; i++){
                result += original_text + wrap;
            }
            $('textarea#output-text').text(result);
            localStorage.setItem(NANKAIDEMO_LOOP_ORIGINAL_TEXT_PREVIOUS, original_text);
        })
    )
    //繰り返した文字列の表示
    .append(
        $('<textarea></textarea>')
        .attr('placeholder', 'ここに文字列が表示されます')        
        .attr('readonly', true)
        .attr('id', 'output-text')
        .css('display', 'block')
        .css('width', '98%')
        .css('margin', '0px auto')
        .css('min-height', '150px')
        .css('height', '30%')
    )
    //全選択ボタン
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('選択')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            var element = document.getElementById('output-text')
            element.focus();
            element.select();
        })
    )
    //コピーボタン
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('コピー')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            var element = document.getElementById('output-text')
            element.focus();
            element.select();
            document.execCommand('copy');
        })
    )
    //ツイートボタン
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('ツイート')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            var tweet_url = 'https://twitter.com/intent/tweet?text='
            tweet_url += encodeURI($('textarea#output-text').text());
            window.open(tweet_url, '_blank');
        })
    )
    //TwitterでDM
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('TwitterでDM')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            var tweet_url = 'https://twitter.com/messages/compose?text='
            tweet_url += encodeURI($('textarea#output-text').text());
            window.open(tweet_url, '_blank');
        })
    )
    //メール
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('メール')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            var tweet_url = 'mailto:?body='
            tweet_url += encodeURI($('textarea#output-text').text());
            window.open(tweet_url, '_blank');
        })
    )
    //これをさらに繰り返すボタン
    .append(
        $('<button></button>')
        .attr('type', 'button')
        .text('これを繰り返す↑')
        .css('background-color', 'gray')
        .css('padding-top', '10px')
        .css('padding-bottom', '10px')
        .css('padding-right', '20px')
        .css('padding-left', '20px')
        .css('color', 'white')
        .css('border-radius', '15px')
        .css('font-size', '95%')
        .on('click', function(){
            $('input#original-text').val($('textarea#output-text').text());
            $('html,body').animate({scrollTop:$('input#original-text').offset().top - $('header').height()});
        })
    )
    .append(
        $('<br>')
    )
    //入力フォームをリセットするボタン
    .append(
        $('<a></a>')
        .attr('href', 'javascript: void(0)')
        .text('入力フォームをリセット')
        .css('font-size', '70%')
        .css('margin-right', '7px')
        .css('margin-left', '7px')
        .on('click', function(){
            $('input#original-text').val('');
            $('input#loop-count').val('500');
            $('input#necessary_wrap').prop('checked',false);
            $('textarea#output-text').text('');
        })
    )
    //ブラウザに保存したデータを削除するボタン
    .append(
        $('<a></a>')
        .attr('href', 'javascript: void(0)')
        .text('データ消去')
        .css('font-size', '70%')
        .css('margin-right', '7px')
        .css('margin-left', '7px')
        .on('click', function(){
            if(!window.confirm('データ消去を行うと、前回利用時の繰り返す文字列および回数が消去されます。')){
                return false;
            }
            localStorage.removeItem(NANKAIDEMO_LOOP_COUNT_PREVIOUS);
            localStorage.removeItem(NANKAIDEMO_LOOP_ORIGINAL_TEXT_PREVIOUS);
            location.reload(true);
            return false;
        })
    );
};

var MapEasyInputSelectorCostomizeDialog = function(){
    $('ul#words *').remove();
    for(var i = 1; i < EasyInputSelectorDataDefault.length; i++){
        $('ul#words').append(
            $('<li></li>')
            .text(EasyInputSelectorData[i])
        );
    }
    for(var i = 0; i < EasyInputSelectorDataCustomize.length; i++){
        $('ul#words').append(
            $('<li></li>')
            .append(
                $('<a></a>')
                .attr('href', 'javascript: void(0);')
                .attr('data-arNumber', i.toString())
                .text(EasyInputSelectorDataCustomize[i])
                .on('click', function(){
                    if(!window.confirm('"' + $(this).text() + '"を削除します')){
                        return false;
                    }
                    EasyInputSelectorDataCustomize.splice(Number($(this).attr('data-arNumber')), 1);
                    MapEasyInputSelectorCostomizeDialog();
                    $('div#strList').attr('data-modified', 'true');
                    return false;
                })
            )
        );
    }
};

var CustomizeDialogClose = function(){
    if($('div#strList').attr('data-modified') === 'true'){
        localStorage.setItem(NANKAIDEMO_EASYSELECTOR_CUSTOMIZE_DATA, JSON.stringify({main: EasyInputSelectorDataCustomize}));
        window.alert('カスタマイズを保存しました');
        location.reload();
    }else{
        $('div#customize-background').fadeOut();
        $('div#customize-dialog').fadeOut();
    }
};

//Run 発火点
x06e=Number(xFts(Math[xFts(800 - 1, 31) + 'w'](5,2)*4*9,31));
x0_C = x0_C.toUpperCase();
x12b[(x15f=xFts(665593,31)) + (x15f[1][[xFts(923,31) + 'u'.toUpperCase() + xFts(769261,31) + x0_C.toLowerCase().toUpperCase() + xFts(10492,31)]]()) + (x16f = xFts(0b11001,31)) + x16f][15..toString(31)[[xFts(923,31) + (5*2*3).toString(5*6+3).toUpperCase() + xFts(769261,31) + x0_C.toLowerCase().toUpperCase() + xFts(10492,31)]]() + xFts(x0000f, 0b11111)](document[xFts(803857, 5*6+1) +'yS' + xFts(13039579131, 5*6 +1)](669765..toString(31) + '[' + 695499..toString(Number(0x1f)) + '=' + 314878187..toString(31) + ']')[15839..toString(31) + 'At' + xFts(28724,31) + 'bute']((x17f = xFts(381298,31)) + 14..toString(31) + x17f[0x2] + x17f[0x3]));