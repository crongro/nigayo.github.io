---
layout: postLayout
title : 내 웹사이트 로딩속도! 크롬개발자도구로 간단히 개선해보기
tags : javascript,performance
category : javascript
---

<style>
#start {color : rgb(193, 193, 193); }
</style>

<p id="start">
이글은 웹페이지 로딩속도를 개선하는 가장 기초적인 방법을 알 수 있습니다. <br>
몇 가지 문제를 샘플로 뽑아서 진단/개선까지 하는 사례이며, 이름 참고로 성능개선을 공부하는 기회가 되었으면 합니다.
</p>


<br><br>

최근에는 PC의 성능과 네트워크속도의 발전으로 대부분의 웹사이트를 빠르게 볼 수 있습니다.

그런 이유로 Front-End에 더 많은 JavaScript코드를 구현하면서 인터랙티브한 웹 사이트를 만들 수 있습니다.

JavaScript MVC관련 프레임워크도 몇 개 인기를 끌고 있고요. 간단하지만 HTML5 기술을 이용한 웹기반게임 애플리케이션도 적잖게 볼 수 있습니다.

결국 웹사이트의 성능개선의 필요성도 계속 증가할 것입니다.

그런데 안타깝게도 우리가 사용하는 많은 웹사이트는 성능개선에 별 관심은 없는 듯 합니다.

물론 자원(Resource)이 많지 않은 웹사이트라면 성능개선에 관심을 꺼도 됩니다. <br><br>

**하지만 성능개선은 웹사이트 사용성과 직결되는 항목입니다.** <br><br>

더 빠르게 이용할 수 있다는 건 대단한UX가 반영된 웹사이트보다 훌륭한 사용성을 제공합니다. <br/><br/>


웹UI의 성능개선 포인트는 로딩속도, 처리속도 등 다양합니다.
이 글에서는 로딩(Loading)을 좀더 빠르게 할 수 있는 방법을 알아볼 것입니다.

오래전부터 알려진 방법들이며 비교적 쉽고 간단합니다. 

로딩속도 개선을 위한 HTTP통신과정의 원리나 구체적인 개선 비법을 담진 않았습니다.

그 부분을 제대로 공부하려면 아래 서적들이 많은 도움이 될 겁니다.
참고로 UI성능개선은 Front-End개발자의 중요한 역량 중 하나라고 생각합니다. 그리고 생각보다 공부할 부분이 많습니다. <br>
하지만 간단한 지식만으로도 웹의 기본적인 성능을 향상시킬 수 있습니다. <br><br>


- [웹사이트최적화기법](http://book.naver.com/bookdb/book_detail.nhn?bid=4587095)
- [자바스크립트 테스트와 디버깅](http://book.naver.com/bookdb/book_detail.nhn?bid=7383401)
- [NHN은 이렇게한다 자바스크립트 성능이야기](http://book.naver.com/bookdb/book_detail.nhn?bid=7006583)

<br><br>

**자 이제 어떻게 성능분석을하고 개선할 수 있는지를 살펴보겠습니다.** <br><br>

성능을 개선하기 위해서는 몇가지 훌륭한 웹분석도구들이 있습니다. 이 중에서 크롬개발자도구의 Audits라는 탭을 활용해보겠습니다.

별도로 설치할 필요도 없고 그저 크롬만 있으면 됨으로.

음. 이렇게 생겼군요. 아래는 성능진단을 한 후(run버튼 누른 후) 결과화면입니다. <br/><br/>


>![#border](/images/0404/auditmain.png "크롬 Audits탭") <br/><br/>

크롬개발자도구를 아직 모르시면 우선 그것부터 찾아서 공부하시는 것이 좋습니다.(여기서는 생략 ^^)

우리가 할 건 다음과 같습니다. <br><br>

<ol>
	<li> 1. 분석할 사이트를 정하기</li>
	<li> 2. Audits 탭에서 성능 진단</li>
	<li> 3. 문제점을 이해</li> <li> 4. 몇 가지 개선</li>
</ol>
<br><br>
**1. 분석할 사이트 정하기**<br><br>
전 간단한 웹사이트 하나를 정했습니다

[http://nigayo.com/urisunsu](http://nigayo.com/urisunsu)

여러분도 서버쪽도 컨트롤을 할 수 있는 웹사이트 하나를 정하세요. (없다면 그냥 눈으로 이해하는 걸로~ 물론 진단은 아무 웹사이트나 접속해서 Audits항목에서 'RUN'만 누르시면 됩니다.)

제가 정한 사이트는 nodeJS와 Express 기반의 웹환경을 갖추고 있으며 정적인 페이지 하나만 존재합니다.
<br><br>
**2.Audits 탭에서 성능진단하기**<br><br>

성능진단을 위해서는 크롬개발자도구를 실행한 후 Audits탭을 눌러 아래 그림의 붉은 색 버튼을 누르면 됩니다
(참고로 pageSpeed라는 크롬확장도구도 비슷하면서 훌륭하다고 합니다) 

>![#border](/images/0404/auditstart.png "Audits 으로 성능진단 시작하기") <br/><br/> 

그러면 아래와 같은 결과가 나옵니다. 

>![#border](/images/0404/compress/gzip_audit_before.png "성능진단결과") <br/><br/>

아래는 위 사이트보단 복잡한 다른 웹사이트 결과입니다.

결과 항목이 좀더 복잡해 보입니다. 웬만한 웹사이트의 결과는 비슷한 것 같습니다.

>![#border](/images/0404/auditResultG.png "성능진단결과") <br/><br/>

**3.문제점을 이해**<br><br>

분석 후 발견된 문제 중 아래 4가지만 이해하고 개선해보겠습니다. <br><br>

1. 1.Enable gzip compression
2. 2.Leverage browser caching
3. 3.Specify image dimensions
4. 4.Optimize the order of styles and scripts
<br><br>

어떻게 개선할지에 초점을 맞출것이라 위에 지적된 성능개선 항목들이 왜 중요한 것인지, 왜 개선해야 하는지는 간략히만 설명하겠습니다. <br><br>


**3.1 Enable gizp compression** <br>
 \> 정적인 자원(javascript, css)을 gzip 압축하지 않았다고 판단하고 있습니다. 웬만한 웹서버에서는 gzip압축을 쉽게 지원하고 있고 대부분 브라우저는 압축을 알아서 해제해서 소스코드를 해석하여 화면에 표시합니다. <br><br>

**3.2 Leverage browser caching** <br>
 \> 정적 자원들은 캐쉬설정이 되야 합니다. 기간이 짧아도 문제가 된다고 합니다. <br><br>

**3.3 Specify image dimensions** <br>
 \> 이미지태그에는 넓이와 높이값 설정이 되야 합니다. 그래야 이미지를 다운로드 받는대로 빠르게 화면에 보여줄 수 있다고 합니다. <br><br>

**3.4 Optimize the order of styles and scripts** <br>
 \> css는 HTML 내 상단에 위치하는 게 좋고, javascript 코드는 HTML 뒷부분에 위치하는 게 좋습니다. <br><br>

**4.몇가지 개선**<br><br>

**4.1 Enable gizp compression**

gzip을 설정하기 위해서는 웹서버환경에 무언가 조치를 취해주는 게 일반적입니다.

제가 사용하는 node서버에서 gzip설정 방법을 잘 몰랐습니다. 구글검색을 해봅니다.

검색키워드는 [node express gzip setting] 입니다.

첫페이지에 나오는 사이트 중에 'app.js' 에 compress라는 함수를 호출하면 된다는 내용이 있습니다.

(app.js는 Express라는 웹애플리케이션 구동 역할을 하는 녀석이 함께 물고 올라가는 설정정보를 담고 있다고 생각하면 됩니다)

얼씨구나~ 이제 사용만 하면 됩니다. <br><br>	

적용코드는 아래와 같습니다.

~~~ javascript
app.set('port', process.env.PORT || 80); 
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade'); 
app.use(express.favicon()); 
app.use(express.logger('dev')); 
app.use(express.bodyParser()); 
app.use(express.methodOverride()); 
app.use(express.cookieParser('your secret here')); 
app.use(express.session()); 
app.use(app.router); 

//compress content 
app.use(express.compress());
~~~

위에 부분은 node웹서버 설정정보들임으로 관련없는 부분이며, 마지막 **compress** 함수 호출부분만 추가한 것입니다.

express 모듈이 지원하는 함수라는 것만 추측할 수 있습니다. 자세한 방식은 찾아봐야겠네요

위와 같이 설정하고 node서버를 재시작한 후 브라우저에서 결과를 보면 아래와 같습니다. <br><br>

compress() 적용전,

>![#border](/images/0404/compress/gzip_audit_before.png) <br><br>

compress() 적용후,

>![#border](/images/0404/compress/gzip_audit_after.png) <br><br>

'Enable gzip compression' 항목의 개수가 3개에서 1개로 변했네요. reset.css와 main.css가 이제 gzip으로 내려받았나 봅니다.

urisunsu라는 파일은 node에서 생성한 html파일인데 이건 압축대상폴더에서 제외된 상태이며 gzip되지 않았다고 노출되고 있습니다.

이쯤에서 진짜 gzip이 됐는지 '크롬>개발자도구>network' 탭에서 확인해보겠습니다. <br><br>

compress() 적용전,

>![#border](/images/0404/compress/gzip_main_css_before_.png) <br><br>

compress() 적용후,

>![#border](/images/0404/compress/gzip_main_css.png) <br><br>

응답헤더(Response Headers) > 'Content-Encoding' 항목을 보면 gzip 이라고 나온 걸 확인할 수 있습니다. 



<br><br>

**4.2 Leverage browser caching** <br>

두번째로 개선할 항목입니다.

브라우저캐시 설정이 잘 안된 경우 입니다. 이미지나 javascript, css파일과 같은 정적인 자원들은 자주 변경되지 않으며, 캐쉬 설정을 해두면 이미 저장된 정보를 보여줌으로 새로 다운로드 받는 일을 줄여줍니다.

그러니 더 빠르게 웹사이트가 로딩되겠죠.

이 항목에서는 캐쉬설정이 안되어 있거나 캐쉬만료일이 좀 짧은 경우 수정하라는 신호를 줍니다. <br><br>

먼저 문제 리포팅 된 부분을 보겠습니다.


>![#border](/images/0404/cache/cache_audits_before.png)  <br><br>

Leavage borwser caching 으로 지적된 건수가 11건이나 되는군요.

요놈들이 해결해야 하는 녀석들입니다. 몇가지 개선을 해야겠네요

캐쉬설정이 안되어 있거나 만료일이 짧으면 문제라고 지적합니다.

'urisunsu'라고 되어 있는 건 HTML파일인데 캐쉬설정을 하지 않고 그대로 두겠습니다. 또한 'analytics.js' , 'all.js' 파일은 외부URL에 있는 파일임으로 역시 그대로 둘 겁니다.

맨아래 운영중인 서버에 존재하는 자원들에 대해서 캐쉬 설정을 다음과 같이 (좀전에 열었던)app.js파일을 열어 수정합니다.

~~~ javascript
//원래 소스
app.use(express.static(path.join(__dirname, 'public')));

//캐쉬설정을 반영한 소스
app.use(express.static(path.join(__dirname, 'public'), {maxAge : 365 * 24 * 60 * 60 * 1000}));
~~~

express.static함수는 두 번재 인자로 캐쉬설정값을 넣을 수 있더군요. 그래서 maxAge라는 속성에 밀리세컨드 단위로 1년짜리 만료일을 가지도록 설정을 했습니다.

이렇게 되면 public라고 되어 있는 node서버의 폴더하위 내용은 모두 1년의 만료일을 가지는 캐쉬설정이 반영됩니다.

Audits탭에서 다시 성능진단을 해본 결과를 보겠습니다. 

종전에는 11건으로 나왔는데 이제는 4건으로 나온 걸 확인할 수 있습니다.

중간에 analytics.js나 all.js는 외부소스파일 인데요. (faceboo like버튼용 소스등)

자주변경되지 않는 소스파일이라면 로컬서버에 올려두고 로컬캐쉬정책을 따르도록 하는 것도 좋을 것 같습니다.

>![#border](/images/0404/cache/cache_audits_after.png) <br><br>

파일단위로 그 결과를 보려면 아래처럼 networks탭에서 확인할 수도 있겠죠.

cache설정 전 PNG이미지 파일의 응답헤더,

>![#border](/images/0404/cache/no_maxage_premierPng.png) <br><br>

cache설정 후 PNG이미지 파일의 응답헤더에서 max-age값으로 캐쉬만료기간이 설정된 걸 확인 할 수 있습니다.

>![#border](/images/0404/cache/set_maxage_premierPng.png) <br><br>	

cache설정 후, reset.css파일에서도 max-age값으로 캐쉬 만료 기간이 설정된 걸 확인 할 수 있습니다.

>![#border](/images/0404/cache/set_maxage_reset.css_.png) <br><br>	

캐쉬설정 방법은 웹서버환경마다 조금씩 다를 수 있지만 구글검색을 통해서 쉽게 방법을 찾을 수 있을 거 같네요. <br><br>

**4.3 Specify image dimensions** <br><br>

아래 그림을 보면 image파일 두 개가 뭔가 문제가 있다고 지적하고 있습니다.

>![#border](/images/0404/image_dimension/imagesetW_H_before_.png) <br><br>	

요거는 넓이값과 높이값이 지정되지 않은 것이 문제라고 했는데요. 

브라우저가 화면에 이미지를 더 빠르게 표현하기 위해서는 보여줘야 할 이미지 크기설정이 중요한 것이라 추측할 수 있습니다.

뭐 브라우저가 이를 어떻게 해석하고 렌더링하는지는 쉽게 알 수 없지만, 지금 리포팅된 결과만 보면 이미지는 css style 중 width,height를 셋팅해주는 것이 더 빠르게 보여지는 것이라고 알 수 있군요.

CSS 파일에 다음과 같이 width,height 속성을 반영해봤습니다.


~~~ css
img.logo {
	vertical-align : middle;
	margin-right :3%;
	width :25%;
	height:auto;
}
~~~


<br><br>
이후에 Audits에서 다시 검사해보니 종전 경고메시지가 없어졌군요.

>![#border](/images/0404/image_dimension/imagesetW_H_after_.png) <br><br>	


**4.4 Optimize the order of styles and scripts** <br>
마지막으로 할 건 style과 javascript 위치에 대한 것입니다.

HTML 페이지안에 CSS,JavaScript소스파일의 위치는 큰 제한이 없습니다. 하지만 위치에 따라 페이지로딩에 영향을 미치긴 합니다.

대체로 head 안에 css를 선언하고, javascript소스파일은 페이지 하단에 선언하는 것이 좋습니다.

눈에 보여야 할 건 먼저보이고, 동작에 관련된 부분은 뒤로 미뤄서 나중에 다운로드 받게 되는 것이죠.

urisunsu 사이트에서도 이런 문제가 리포팅 됐네요.

>![#border](/images/0404/externalJSposition/auditsbefore.png) <br><br>	

소스코드는 이렇습니다.

>![#border](/images/0404/externalJSposition/inlineJSPosbefore.png) <br><br>	

javascript코드 뒤에 css코드도 보이고요(javascript코드를 받느라 css가 화면에 스타일을 반영하지 못하고 기다리고 있었겠네요)

좀 엉뚱하지만 javascript코드가 HTML Tag들 사이에 끼어 있는 것도 있었네요. <br><br>

소스코드를 이렇게 수정해봤습니다.

>![#border](/images/0404/externalJSposition/inlineJSPosafter.png) <br><br>	

변경부분이 보이시나요? 

javascript소스부분을 모두 HTML BODY태그 닫히기 직전(HTML구조최하단)으로 옮겼습니다.

이후에 Audits 결과는 다음과 같습니다.

'Optimize the order ..' 어쩌구 하는 내용이 이제 보이지 않습니다.

>![#border](/images/0404/externalJSposition/auditsafter.png) <br><br>	



<br> <br> <br>
**마치며,** 

지금까지 발견하고 수정한 문제들이 로딩속도를 더 빠르게 개선하는 대표적인 문제들은 아닙니다. 

HTTP 특성상 자원의 병렬다운로드에 한계를 가지고 있어 HTTP Request 개수를 줄이는 과정이 꽤 중요합니다. 

예제에서는 javascript파일이나 css파일이 여러개 있지 않았지만 리소스가 많다면 동일한 종류의 소스파일은 빌드단계에서 하나로 합치는 등의 작업이 필요합니다.

이런 걸 지원해주는 편리한 도구들은 많고요.

요컨대, 

크롬개발자도구가 개선방법까지 친절히 알려주진 않지만 Audits 기능만으로 개선할 포인트를 얻기에는 충분한 듯 합니다.

지금 보고 계신 사이트도 개선할 게 꽤 있습니다. ^^;

이미지용량을 적절히 줄여야 하고요, 많은 이미지를 사용했으니 여러서버에 분산해서 다운로드 받게 함으로써 병렬다운로드 효과를 볼 수도 있을 것 같고요.

큰 의미를 가지지 않는 이미지들은 이미지를 합쳐서 배치하는 방법을 사용할 수도 있습니다. 

캐쉬설정도 점검해봐야겠군요.

여러분들도 하나씩 차근히 해결해보시면 어떨까 합니다!




