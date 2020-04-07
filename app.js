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

var NANKAIDEMO_LOOP_COUNT_PREVIOUS = 'nankaidemo_loopcount_previous_setting';
var NANKAIDEMO_LOOP_ORIGINAL_TEXT_PREVIOUS = 'nankaidemo_loop_original_text_previous';
var NANKAIDEMO_EASYSELECTOR_CUSTOMIZE_DATA = 'nankaidemo_easySelector_customize_data';

var EasyInputSelectorDataDefault = ['ここから選択して簡単入力', 'w', '笑', '泣', '(笑)', '(泣)', '(´^ω^｀)', '寂しい', '助けて', '死ね', 'ﾀﾋね', '生きて', '好き', '大好き'];
var EasyInputSelectorDataCustomize = [];
var EasyInputSelectorData = EasyInputSelectorDataDefault.slice(0, EasyInputSelectorDataDefault.length);

var Run = function(){
    if(!CanUseJQuery()){
        window.alert('jQueryが使えません。管理者にお問い合わせください。');
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
}

var CanUseJQuery = function(){
    return window.jQuery;
}

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
}

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
}

var CustomizeDialogClose = function(){
    if($('div#strList').attr('data-modified') === 'true'){
        localStorage.setItem(NANKAIDEMO_EASYSELECTOR_CUSTOMIZE_DATA, JSON.stringify({main: EasyInputSelectorDataCustomize}));
        window.alert('カスタマイズを保存しました');
        location.reload();
    }else{
        $('div#customize-background').fadeOut();
        $('div#customize-dialog').fadeOut();
    }
}

Run();
