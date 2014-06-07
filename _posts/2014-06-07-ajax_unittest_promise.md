---
layout: postLayout
title : AJAX 단위테스트가 Promise를 맞이하실 때.
tags : javascript
category : javascript
---

이글은 JavaScript와 Ajax 그리고 Promise에 대한 이해가 필요합니다. <br>
Promise패턴은 ['HTML5rocks의 번역글'](http://www.html5rocks.com/ko/tutorials/es6/promises/ "Promise HTML5Rocks번역글") 이 도움이 됩니다.

<br>
JavaScript테스트코드의 구현방법은 ['자바스크립트 테스트와 디버깅'](http://book.naver.com/bookdb/book_detail.nhn?bid=7383401) 책이나 qunit 웹사이트에서 비동기테스트 방법에 대한 설명이 잘 되어 있습니다.

<br>
Ajax 와 같은 비동기함수의 테스트코드는 어려운 편이지만 다행히 몇가지 방법이 있습니다.<br/><br/>

1. 1.setTimeout으로 시간 지연 (또 다른 비동기콜백을 생성해서 순서 경쟁을 유발)
2. 2.XMLHttpRequest 객체를 재정의하기
3. 3.callback 함수만 따로 테스트하기

<br>
위 3가지 방법은 모두 쓸만한 방법이며 각각 장단점이 있습니다.

이 중에서 1번 방법은 XHR객체를 통해 실제 통신과정 테스트가 가능하여 개인적으로 좋은 방법이라 생각합니다.

1번 예제를 한번 보겠습니다.

<pre class="prettyprint">
var oMyAjax = {
 	xhr_async : function(sURL) {
 		var req = new XMLHttpRequest();
 		req.open("GET" , sURL , true);
 		req.send(null);

 		req.onreadystatechange = function() {
 			if (req.readyState == 4 &&  req.status == 200) {
 				this.result = req.responseText;
          this.myCallback(this.result);
        }
      }.bind(this);
    },
    myCallback : function(result) {
         document.getElementById('_player').textContent = result;
    }
}
</pre>

<br>
요놈은 qunit으로 작성한 테스트코드 입니다.

<pre class="prettyprint">
asyncTest("XHR [asyncTest_setTimeout사용] ", function() {

	var URL = "http://codepen.io/nigayo/pen/EhtGz.js";

    oMyAjax.xhr_async(URL);
  
    setTimeout(function() {
        var texts = document.getElementById('_player').textContent;
        ok(/ronaldo,29/.test(texts) , 'XHR을 통해 DOM에 ronaldo 텍스트가 있군요');
        start();
    },1000);
  
});
</pre>
[(CodePen DEMO)](http://codepen.io/nigayo/pen/BoezC?editors=001 "codepen demo page")

여기서는 1초 지연을 통해서 처리가 됩니다. 이 방법의 경우는 실제 XHR통신을 테스트 할 수 있다는 장점이 있지만 임의의 시간을 지연시간으로 지정해야 합니다.
만약 네트웍 상황이 좋지 않아 응답을 받기까지 1초 이상이 걸린다면 테스트코드는 실패할 것입니다. 그래서 넉넉한 시간(?)을 지정해야 하는 것이고요.

<br><br>

**Promise패턴을 적용한다면 어떻게 될까요?**
<br><br>

아래 코드를 보겠습니다. 

<pre class="prettyprint">
var oMyAjax = {
    myCallback : function(result) {
         document.getElementById('_player').textContent = result;
         console.log("myCallback called");
    }, 
    getPromise : function(sURL) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET" , sURL , true);
        req.send(null);
        req.onreadystatechange = function() {
          if (req.readyState == 4 &&  req.status == 200) {
            resolve(req.responseText);
          } else if(req.status !== 200) {
            reject(Error("ajax error"));
          }
        };
      });
    }
}
</pre>

oMyAjax의 getPromise는 promise 인스턴스를 반환합니다.

아래는 테스트 코드 입니다. promise객체의 then함수로 비동기의 순서를 보장하고 있습니다.

<pre class="prettyprint">
module("XHR AsyncTest");
moduleStart(function(){
  URL = "http://codepen.io/nigayo/pen/EhtGz.js";
  BAD_URL  = "http://codepen.io/nigayo/pen/Eht3Gz.js";  
});

asyncTest("XHR [Promise 정상 URL] ", function() {
 var oP = oMyAjax.getPromise(URL);
      
        oP.then(function(res) {
                oMyAjax.myCallback(res);
        },function(err) {
                console.log('error ->  ' , err.message);
        }).then(function(){
                var texts = document.getElementById('_player').textContent;
                ok(/ronaldo,29/.test(texts) , 'XHR을 통해 DOM에 ronaldo 텍스트가 있군요');
                start();
        });
});

</pre>

then메소드를 통해서 myCallback메소드가 실행되며, 이후에(콜백함수가 끝나면) ok 함수를 통해서 테스트를 할 수 있습니다.

<br>
XHR통신 오류 상황에서의 테스트 코드도 말끔히 처리할 수 있습니다.

<pre class="prettyprint">
asyncTest("XHR [Promise 에러 URL] ", function() {

        var oP = oMyAjax.getPromise(BAD_URL);
      
        oP.then(function(res) {
                oMyAjax.myCallback(res);
        },function(err) {
                equal(err.message, 'ajax error' , 'ajax error 처리가 정상이군요');
                start();
        }).then(function(){
                //do Something..
        });
});
</pre>
[(CodePen DEMO)](http://codepen.io/nigayo/pen/CvBHf/?editors=001 "codepen demo page")

<i>*Promise는 IE와 모바일웹환경(크롬 for Android 제외)은 지원하지 않아 위 테스트코드는 먹통이여요</i>

<br> 
then 함수의 두 번째 인자로 error를 처리 할 수 있는 콜백함수를 지정할 수 있습니다.

이 콜백함수에서 필요한 error 처리를 할 수 있어 에러상황에 대한 테스트코드도 자연스럽게 구현 할 수 있습니다.

Promise를 적용하고보니 비동기테스트도 좀 할만한 것 같네요. 간단한 테스트라 다른 예외적인 상황이 또 있을지는 아직 모르겠습니다.

<br>
<br>

<em>정리하면,</em>

테스트코드를 위해서 Promise패턴을 적용하는 것은 사실 좀 고민해야 할 것 같고요.

(완전하지 않지만 처음에 설명한 것처럼 괜찮은 방법들이 있음으로)

다만 Promise패턴이 적용된 AJAX코드의 단위테스트 구현은 좀더 깔끔하고 명확한 맛이 있는 것 같네요.



