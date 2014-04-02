---
layout: postLayout
title : 크롬으로 뚝딱뚝딱 웹사이트 로딩 개선하기
tags : javascript,performance
category : javascript
---


최근에는 PC의 성능과 네트워크속도의 발전으로 대부분의 웹사이트를 빠르게 볼 수 있습니다.

그런 이유로 Front-End에 더 많은 JavaScript코드를 구현하면서 인터랙티브한 웹 사이트를 만들 수 있습니다.

JavaScript MVC관련 프레임워크도 몇 개 인기를 끌고 있고요. 간단하지만 HTML5 기술을 이용한 웹기반게임 애플리케이션도 적잖게 볼 수 있습니다.

결국 웹사이트의 성능개선의 필요성도 계속 증가할 것입니다.

그런데 안타깝게도 우리가 사용하는 많은 웹사이트는 성능개선에 별 관심은 없는 듯 합니다.

물론 자원(Resource)이 많지 않은 웹사이트라면 성능개선에 관심을 꺼도 됩니다. <br><br>

**하지만 성능개선은 웹사이트 사용성과 직결되는 항목입니다.** <br><br>

더 빠르게 이용할 수 있다는 건 대단한UX가 반영된 웹사이트보다 훌륭한 사용성을 제공합니다. <br/><br/>


잔소리 같은 이야기는 여기서 접고 성능개선을 시작해보겠습니다.

웹UI의 성능개선 포인트는 로딩속도, 처리속도 다양합니다.
여기서는 로딩(Loading)을 좀더 빠르게 할 수 있는 방법을 알아볼 것입니다.

오래전부터 알려진 방법들이며 비교적 쉽고 간단합니다. 

이번글에는 로딩속도 개선을 위한 HTTP통신과정의 원리나 모든 개선 비법이 포함되지 않았습니다.

그런건 아래 서적들을 공부하는 것을 추천합니다. <br><br>


- [웹사이트최적화기법](http://book.naver.com/bookdb/book_detail.nhn?bid=4587095)
- [자바스크립트 테스트와 디버깅](http://book.naver.com/bookdb/book_detail.nhn?bid=7383401)
- [NHN은 이렇게한다 자바스크립트 성능이야기](http://book.naver.com/bookdb/book_detail.nhn?bid=7006583)

<br><br>

참고로 UI성능개선은 Front-End개발자의 중요한 역량 중 하나입니다. 생각보다 공부할 게 많습니다. <br>
하지만 간단한 지식만으로도 웹의 기본적인 성능을 향상시킬 수 있습니다. <br><br>

**어떻게 성능분석을하고 개선할 수 있는지를 살펴보겠습니다.** <br><br>

성능을 개선하기 위해서는 몇가지 훌륭한 웹분석도구들이 있습니다. 이 중에서 크롬개발자도구의 Audits라는 탭을 활용할 것입니다.

이렇게 생겼군요.<br/><br/>


>![#border](/images/0401/auditmain.png "크롬 Audits탭") <br/><br/>

크롬개발자도구를 아직 모르시면 우선 그것부터 찾아서 공부하시는 것이 좋습니다.(여기서는 생략 ^^)

우리가 할 건 다음과 같습니다. <br><br>

<ol>
	<li> 1. 분석할 사이트를 정하기</li>
	<li> 2. Audits 탭에서 성능 진단</li>
	<li> 3. 문제점을 이해</li>
	<li> 4. 몇 가지 개선</li>
</ol>
<br><br>
**1. 분석할 사이트 정하기**<br><br>
전 간단한 웹사이트 하나를 정했습니다

[http://nigayo.com/urisunsu](http://nigayo.com/urisunsu)

여러분도 서버쪽도 컨트롤을 할 수 있는 웹사이트 하나를 정하세요. (없다면 그냥 눈으로 이해하는 걸로~)

제가 정한 사이트는 nodeJS와 Express 기반의 웹환경을 갖추고 있으며 정적인 페이지 하나만 존재합니다.
<br><br>
**2.Audits 탭에서 성능진단하기**<br><br>

성능진단을 위해서는 크롬개발자도구를 실행한 후 Audits탭을 눌러 아래 그림의 붉은 색 버튼을 누르면 됩니다
(참고로 pageSpeed라는 크롬확장도구도 비슷하면서 훌륭하다고 합니다) 

>![#border](/images/0401/auditstart.png "Audits 으로 성능진단 시작하기") <br/><br/> 

그러면 아래와 같은 결과가 나옵니다. 

>![#border](/images/0401/compress/gzip_audit_before.png "성능진단결과") <br/><br/>

아래는 위 사이트보단 복잡한 다른 웹사이트 결과입니다.

결과 항목이 좀더 복잡해 보입니다. 실제로 해당 웹사이트에서 개선해야 할 항목들이 많음을 표시합니다.

>![#border](/images/0401/auditResultG.png "성능진단결과") <br/><br/>

**3.문제점을 이해**<br><br>

분석 후 발견된 문제 중 아래 4가지만 개선해보겠습니다. <br><br>

1. 1.Enable gzip compression
2. 2.Leverage browser caching
3. 3.Specify image dimensions
4. 4.Optimize the order of styles and scripts
<br><br>

어떻게 개선할지에 초점을 맞출것이라 위에 지적된 성능개선 항목들이 왜 중요한 것인지, 왜 개선해야 하는지는 간략히만 설명하겠습니다. <br><br>


3.1 Enable gizp compression <br>
 \> 정적인 자웓들(javascript, css) 를 gzip 압축하지 않았다고 판단하고 있습니다. 웬만한 웹서버에서는 gzip압축을 쉽게 지원하고 있고 대부분 브라우저는 압축을 알아서 해제해서 소스코드를 해석후 브라우저 화면에 표시합니다. <br><br>

3.2 Leverage browser caching <br>
 \> 자원들에 캐쉬설정이 되야 합니다. 기간이 짧아도 문제가 된다고 합니다. <br><br>

3.3 Specify image dimensions <br>
 \> 이미지태그에는 넓이와 높이값 설정이 되야 합니다. 그래야 이미지를 다운로드 받는대로 빠르게 화면에 보여줄 수 있다고 합니다. <br><br>

3.4 Optimize the order of styles and scripts <br>
 \> css는 HTML 앞에 javascript파일의 순서는 HTML 뒷부분에 위치하는 게 좋습니다. <br><br>

**4.몇가지 개선**<br><br>

4.1 Enable gizp compression

gzip을 설정하기 위해서는 웹서버환경에 무언가 조치를 취해주는 게 일반적입니다.

제가 사용하는 node서버에서의 설정 방법을 모름으로 구글검색을 했습니다.

검색키워드는 [node express gzip setting] 입니다.

첫페이지에 나오는 사이트 중에 'app.js' 에 compress라는 함수를 호출하면 된다는 내용이 있습니다.

(app.js는 Express라는 웹애플리케이션 구동 역할을 하는 녀석이 함꼐 물고 올라가는 설정정보를 담고 있다고 생각하면 됩니다)

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

위에 부분은 관련없는 부분이고요, 마지막 compress 부분만 추가한 것입니다.

express 모듈이 지원하는 함수라는 것만 추측할 수 있습니다. 자세한 방식은 찾아봐야겠네요

위와 같이 설정하고 node서버를 재시작한 후 브라우저에서 결과를 보면 아래와 같습니다. <br><br>

compress를 적용하기 전,

>![#border](/images/0401/compress/gzip_audit_before.png) <br><br>

compress를 적용 후,

>![#border](/images/0401/compress/gzip_audit_after.png) <br><br>





<br><br>

4.2 Leverage browser caching <br>

4.3 Specify image dimensions <br>

4.4 Optimize the order of styles and scripts <br>





