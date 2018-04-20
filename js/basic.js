"use strict";

//////////////////////////////////////////////////////////////////////////////////////////
//コンセプト

//初歩の初歩からPromiseを理解して、今後扱ううえで、論理的に思考して使いこなせるようになることを目指す。
//native Promiseもkintone.Promiseも、具体的なものを通して理解しよう

///////////////////////////////////////////////////////////////////////////////////////////


//セクション１：非同期処理でPromiseを使わないと.....?


//想定：非同期処理を待ってから、別の処理をしたいような状況
//これを、setTimeoutを利用して実演してみる
$('#do-section1-code1-button').click(function(){
    var $result1_1 = $('#result-section1-code1');
    $result1_1.children('p').remove();
    $result1_1.append($('<p>').html('START!'));
    setTimeout(function(){
    
        //2秒（＝2000ミリ秒）待ってからここの処理を実行する
        //kintoneだと、別アプリから大量のレコードやアプリ情報などを取得したりする処理を想定してもらってOK
        $result1_1.append($('<p>').html('setTimeout was finished just now!'));
        console.log('setTimeout was finished just now!');
        
    }, 2000);
    $result1_1.append($('<p>').html('After setTimeout was finished.'));
    console.log('After setTimeout was finished.');
});




///////////////////////////////////////////////////////////////////////////////////////////


//セクション2：native Promiseを使ってみよう！


//クリックイベントは説明の都合上付けています。ご了承ください。
$('#do-section2-code1-button').click(function(){
    var $result2_1 = $('#result-section2-code1');
    $result2_1.children('p').remove();
    $result2_1.append($('<p>').html('START!'));
    //Promiseオブジェクトの中に、監視させたい非同期処理を記述します
    new Promise(function(resolve, reject){
    
        setTimeout(function(){
    
            //2秒（＝2000ミリ秒）待ってからここの処理を実行する
            //kintoneだと、別アプリから大量のレコードやアプリ情報などを取得したりする処理を想定してもらってOK
            $result2_1.append($('<p>').html('setTimeout was finished just now!'));
            console.log('setTimeout was finished just now!');
    
            //「このPromiseは処理完了状態になりましたよ！」と宣言するものが、resolve関数なのだ！！
            resolve('setTimeout of section2');            
            
        }, 2000);
    
    })
    
    //resolveが呼び出されると、thenの中に記述するコールバック関数が呼び出される
    
    .then(function(message){
        
        //resolveの引数をここで受け取って使うことが出来る
        $result2_1.append($('<p>').html('After ' + message + ' was finished.'));
        console.log('After ' + message + ' was finished.');
        
    });
});


/////////////////////////////////////////////////////////////////////////////////////

//セクション3：thenの戻り値について


//code1: thenの戻り値がPromiseになることの簡単な検証

$('#do-section3-code1-button').click(function(){
    var afterThenObject = new Promise(function(resolve, reject){

        //なにかしらの非同期処理が行われたことを想定

        //ここのPromiseが完了状態になったことを宣言
        resolve("HAHAHAHA");

    })
    .then(function(message){

        //resolveの引数を受け取れることは前のセクションで学習済み
        //ここではシンプルに、受け取った値を返すだけにする。
        return message;

    });

    //上の変数afterThenPromiseの実体が何なのかをここでは確認したい。
    console.log(afterThenObject);
});


//code2: thenのメソッドチェーン
$('#do-section3-code2-button').click(function(){
    var $result3_2 = $('#result-section3-code2');
    $result3_2.children('p').remove();
    $result3_2.append($('<p>').html('START!'));
    new Promise(function(resolve, reject){
        //非同期処理
        setTimeout(function(){
            $result3_2.append($('<p>').html('setTimeout was finished just now!'));
            console.log('setTimeout was finished just now!');
            resolve('HAHAHAHAHAHA');
        }, 2000);
    })
    //1つ目のthen
    .then(function(message1){
        $result3_2.append($('<p>').html('First then was done just now. The message is "' + message1 + '"'));
        return message1 + message1;
    })
    //2つ目のthen
    .then(function(message2){
        $result3_2.append($('<p>').html('Second then was done just now. The message is "' + message2+ '"'));
        return message2;        
    });
});



///////////////////////////////////////////////////////////////////////////////////////////


//セクション4：関数を使って書いてみよう


//code1:簡単なものでいいので書いてみよう
$('#do-section4-code1-button').click(function(){
    var $result4_1 = $('#result-section4-code1');
    $result4_1.append($('<p>').html('START!')); 
    //関数実行
    firstPromiseFunction().then(secondPromiseFunction)
    .then(function(message){
        $result4_1.append($('<p>').html('The last message is "' + message + '"'));
        console.log('The last message is "' + message + '"');
    });

    //２つ目の関数はthenの中でPromiseオブジェクトを返している。
    //実際、どうなっているのかを確認してみたい。

    console.log('secondPromiseFunctionの返り値');
    console.log(secondPromiseFunction('a'));
    
});


//関数定義はこちら

//一つ目の関数
function firstPromiseFunction(){
    //非同期処理を監視するPromiseオブジェクトを返す関数！！
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var $result4_1 = $('#result-section4-code1');
            var message1 = 'HAHAHAHA';
            $result4_1.append($('<p>').html('firstPromiseFunction was done just now! send a message "HAHAHAHA" to secondPromiseFunction.'));
            console.log('firstPromiseFunction was done just now! send a message "HAHAHAHA" to secondPromiseFunction.');
            resolve(message1);
        }, 2000);
    });
}

//2つ目の関数。関数の中でthenを使ってみる。
function secondPromiseFunction(message1){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var $result4_1 = $('#result-section4-code1');
            var message2 = message1 + message1 + '!!!!';
            $result4_1.append($('<p>').html('secondPromiseFunction was done just now! send a message "' + message2 + '" to after then.'));
            console.log('secondPromiseFunction was done just now! send a message "' + message2 + '" to after then.');
            resolve(message2);
        }, 2000);
    })
    .then(function(message2){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                var $result4_1 = $('#result-section4-code1');
                var message3 = message2 + message2 + '??????';
                $result4_1.append($('<p>').html('The "then" of secondPromiseFunction was done just now! send  a message "' + message3 + '" to after "then"'));
                console.log('The "then" of secondPromiseFunction was done just now! send  a message "' + message3 + '" to after "then"');
                resolve(message3)
            }, 2000);
        });
    });
}

/////////////////////////////////////////////////////////////////////////


//セクション5：Promise.all, Promise.raceを使った並列処理


//code1: Promise.allについての基本

$('#do-section5-code1-button').click(function(){

    var $result5_1 = $('#result-section5-code1');
    $result5_1.children('p').remove();
    $result5_1.append($('<p>').html('START!'));
    
    //1つ目のPromiseオブジェクト
    var promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_1.append($('<p>').html('promise1: waiting 2 sec'));
            console.log('promise1: waiting 2 sec');
            resolve('promise1');
        }, 2000);
    });

    //2つ目のPromiseオブジェクト
    var promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_1.append($('<p>').html('promise2: waiting 4 sec'));
            console.log('promise2: waiting 4 sec');
            resolve('promise2');
        }, 4000);
    });

    //3つ目のPromiseオブジェクト
    var promise3 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_1.append($('<p>').html('promise3: waiting 6 sec'));
            console.log('promise3: waiting 6 sec');
            resolve('promise3');
        }, 6000);
    });

    //Promise.allで並列処理！
    Promise.all([promise1, promise2, promise3]).then(function(resp){
        $result5_1.append($('<p>').html('"All" promise were finished just now!'));
        $result5_1.append($('<p>').html('and responce is this: '));
        $result5_1.append($('<p>').html('-------------'));
        for(var el of resp){
            $result5_1.append($('<p>').html(el));
        }
        $result5_1.append($('<p>').html('-------------'));
    });

});

//code2: Promise.raceについての基本
$('#do-section5-code2-button').click(function(){

    var $result5_2 = $('#result-section5-code2');
    $result5_2.children('p').remove();
    $result5_2.append($('<p>').html('START!'));
    
    //1つ目のPromiseオブジェクト
    var promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_2.append($('<p>').html('promise1: waiting 2 sec'));
            console.log('promise1: waiting 2 sec');
            resolve('promise1');
        }, 2000);
    });

    //2つ目のPromiseオブジェクト
    var promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_2.append($('<p>').html('promise2: waiting 4 sec'));
            console.log('promise2: waiting 4 sec');
            resolve('promise2');
        }, 4000);
    });

    //3つ目のPromiseオブジェクト
    var promise3 = new Promise(function(resolve, reject){
        setTimeout(function(){
            $result5_2.append($('<p>').html('promise3: waiting 6 sec'));
            console.log('promise3: waiting 6 sec');
            resolve('promise3');
        }, 6000);
    });

    //Promise.raceで並列処理！
    Promise.race([promise1, promise2, promise3]).then(function(resp){
        $result5_2.append($('<p>').html('"One" promise was finished just now!'));
        $result5_2.append($('<p>').html('and responce is this: '));
        $result5_2.append($('<p>').html('-------------'));
        for(var el of resp){
            $result5_2.append($('<p>').html(el));
        }
        $result5_2.append($('<p>').html('-------------'));
    });

});


/////////////////////////////////////////////////////////////


//セクション６：再帰呼び出し



//code1:

//再帰呼び出し用の関数。合計で2回だけ呼び出すようにしてます。
function recursiveFunction(count){
    var $result6_1 = $('#result-section6-code1');
    count = count || 0;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            $result6_1.append($('<p>').html('Now count is ' + count));

            //ここが注意すべきポイント。ここのresolveは期待した動作をしない。
            if(count >= 1){
                resolve('complete!');
            }else{
                count += 1;
                recursiveFunction(count);
            }
        }, 2000);
    });
}

// 再帰呼び出し。できるだシンプルなコードで。
$('#do-section6-code1-button').click(function(){
    var $result6_1 = $('#result-section6-code1');
    $result6_1.children('p').remove();
    $result6_1.append($('<p>').html('START!'));
    recursiveFunction().then(function(message){
        //messageには、「complete!」という文字列が渡されることを期待している。しかしおそらくうまく動かない。
        $result6_1.append($('<p>').html('The responce is "' + message + '".'));
    });

    //Promiseオブジェクトの入れ子構造になっていると予想されるので、そのことを確認する
    console.log(recursiveFunction());
});




//code2:

//修正した再帰呼び出しの関数を定義
function recursiveFunctionNeo(count){
    var $result6_2 = $('#result-section6-code2');
    count = count || 0;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            $result6_2.append($('<p>').html('Now count is ' + count));
            resolve(count);
        }, 2000);    
    })
    .then(function(count){
        if(count === 0){
            count += 1;
            return recursiveFunctionNeo(count);
        }else{
            return 'complete!';
        }
    });
}

// 再帰呼び出し。こんどこそ上手くいくコードにしましょう！
$('#do-section6-code2-button').click(function(){
    var $result6_2 = $('#result-section6-code2');
    $result6_2.children('p').remove();
    $result6_2.append($('<p>').html('START!'));
    recursiveFunctionNeo().then(function(message){
        //messageには、「complete!」という文字列が渡されることを期待している。       
        $result6_2.append($('<p>').html('The responce is "' + message + '".'));
    });
});

//code2をページに表示するクリックイベント
$('#open-section6-code2').click(function(){
    $('#answer6-2').show();
});


//問題の答えを表示するクリックイベント
$('#opne-all-answer').click(function(){
    $('#all-answer').show();
});