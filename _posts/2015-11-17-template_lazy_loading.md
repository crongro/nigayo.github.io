---
layout: postLayout
title : HTML templates을 활용한 image lazy loading
tags : javascript, template, lazy loading, image, performance
category : javascript
---

<p> 많은 이미지를 로딩해야 하는 경우 lazy loading 을 고려할 수 있습니다.</p>
<p>그런 상황에서 load 이벤트를 통해서 첫 화면을 제어하는 경우에 유용한 팁을 공유합니다.</p>
<p> </p>
<p>
  <strong>template tag를 활용한 이미지 lazy loading 방법입니다.</strong>
</p>
<p> </p>
<p>이 방법은 최근 해외 블로그를 우연히 보다 알게 된 방법입니다.</p>
<p>기존에 image lazy loading 방법에서 불가능했던 방법은 아니며, 새로운 방법으로 이해해야 합니다.</p>
<p>비교를 해봐야 하지만 대체로 쉽고 DOM 조작이 간단하며, 브라우저 지원 template tag를 활용하기 때문에 더 빠를 것으로 예상합니다.</p>
<p>특징은 별도의 polyfill이 필요 없습니다. (template 태그로 인식해서 아래 '적용전'과 같이 이미지 로딩)</p>
<p> </p>
<h3>Template TAG</h3>
<p>template  tag 는 새로운 html tag 문법이며 말그대로 handlebar와 같은 라이브러리 기반의 template 작업을 대체할 수 있습니다.</p>
<p>(참고 : <a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">http://www.html5rocks.com/en/tutorials/webcomponents/template/</a>) </p>
<p>또한 template은 WEB Component 에서 주로 사용될 예정인 spec 이기도 합니다.</p>
<p> </p>
<h3>적용결과</h3>
<p>적용전/후 캡쳐화면을 먼저 살펴보겠습니다. </p>
<p> </p>
<p>
  <strong>&lt;적용전&gt;</strong>
</p>
<p>보통 이미지 태그를 화면에 넣어두면 이와 같이 load 이벤트가 발생하기 까지 많은 시간이 걸립니다.</p>
<p>이를 해결하는 방법 중 DOMContentLoaded 를 사용할 수도 있습니다.</p>
<p>참고로 DOMContentLoaded는 script, style, image 등이 로딩되기도 전에 DOM tree가 완성되면 바로 발생합니다</p>

>![#border](/images/1117/lazy_loading.jpg) <br><br>

<p>
  <strong>
    <a href="http://nigayo.github.io/page/1117/default.html"> 데모보기 (http://nigayo.github.io/page/1117/default.html)</a>  (개발자 도구를 열고 확인)</strong>
</p>
<p> </p>
<p>
  <strong>&lt;적용후&gt;</strong>
</p>
<p>다운로드 되는 이미지 갯수가 적기 때문에 빠르게 load이벤트가 발생하고 이후에 이미지 lazy loading으로 이미지들이 다운로드 되는 것을 볼 수 있습니다.</p>
<p>template 태그를 사용하면 그 하위에 image 태그들은 화면에서 로딩되지 않고 대기하게 됩니다. (브라우저가 렌더링에 포함할 유효한 DOM Tree로 인식하지 않는 듯)</p>
<p>물론 추가이미지를 다운로드 받기 위해서 load 된 이후에 추가적인 이미지들을 간단한 DOM 조작으로 추가해줘야 합니다.(아래 JS코드참고)</p>
<p>이과정은 script태그내의 innerHTML을 활용한 전통적인 템플릿 방식보다 좀더 빠른 듯 합니다. </p>

>![#border](/images/1117/lazy_loading_2.jpg) <br><br>

<p>
  <strong>
    <a href="http://nigayo.github.io/page/1117/lazy.html"> 데모보기 (http://nigayo.github.io/page/1117/lazy.html)</a>
  </strong>
</p>
<p> </p>
<h3>적용을 위한 최선의 선택.</h3>
<p>이 방법은 이런 경우(상황)에 유용할 것으로 보입니다.</p>
<p>load 이벤트로 첫 로딩 화면을 제어하고 있고, </p>
<p>많은 이미지가 필요로하지만, 막상 화면에는 몇몇 개의 이미지만 노출해야 하며, (이미지기반 슬라이딩이나, 사진뷰어 등등). </p>
<p>모바일웹 서비스인 경우(template tag 지원)</p>
<p> </p>
<h3>호환성문제</h3>
<p>template tag 의 브라우저 호환성은 IE에서는 좋지 않습니다. 또한 android 4.3 이하 버전에서도 지원하지 않고요.</p>
<p>
  <a href="http://caniuse.com/#feat=template">http://caniuse.com/#feat=template</a> </p>
<p>하지만 이부분이 문제가 되지 않습니다.
지원하지 않는 브라우저에서는 오류없이 위의 'default' 처럼 동작하기 때문이죠. 다시말해 브라우저 호환성 이슈없이 이 기능을 사용할 수 있다고 봐야 합니다. (load 전에 이미지를 다운로드 해서 화면에 노출)</p>
<p> </p>
<h3>코드</h3>
<p>lazy.html 내의 html코드는 다음과 같습니다.</p>
<p>template 을 지원하는 브라우저에서는 template 하위 태그를 렌더링하지 않습니다.</p>

<pre class="prettyprint">
<p>&lt;ul&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101914551950329_8930318_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101914551919506_8932698_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;template&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/201510161538162912_8932699_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101615411645448_8932700_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101615431620318_8932701_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101615451649844_8932702_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/201510161549165580_8932704_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;img&nbsp;src="/2015101615521612727_8932705_1.jpg"&nbsp;alt=""&gt;&lt;/li&gt;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/template&gt;</p><p>&lt;/ul&gt;</p>
</pre>

<p>template 코드를 추출해서 DOM에 추가하는 코드는 lazy.js 에 있습니다.</p>


<pre class="prettyprint">
  var elTemplateContent = elTemplate.content;
  var elParent = elTemplate.parentNode;
  elParent.removeChild(elTemplate);
  elParent.appendChild(elTemplateContent);
</pre>

<p>content 속성으로 template 데이터를 추출하는 것이 표준적인 방법입니다.</p>
<p> </p>
<h3>아래 힌트를 얻은 블로그가 있으니 참고하세요.</h3>
<p>
  <a href="https://www.christianheilmann.com/2015/09/08/quick-trick-using-template-to-delay-loading-of-images/">https://www.christianheilmann.com/2015/09/08/quick-trick-using-template-to-delay-loading-of-images/</a>
</p>
<p>web component 에 대한 부분은 별도로 구글링을 통해서 학습하시길 바랍니다 ^^</p>
<p> </p>
<p> </p>




