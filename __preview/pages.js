/* 미리보기 빌드 전용 (tools/build-pages.mjs 가 만듦) : 정적 호스팅에서 Five Server 가 하던 일을 대신함 */
(function () {
  var BASE = "/startkosmes-preview";
  var STUBS = ["/startkosmes-preview/login/refreshTokenReal.do","/startkosmes-preview/checkAjaxSession.do","/startkosmes-preview/yh_mai001_005.do","/startkosmes-preview/yh_cus001_009.do","/startkosmes-preview/yh_bsm201_004.do","/startkosmes-preview/yh_cmn001_001.do","/startkosmes-preview/yh_dfi002_005.do","/startkosmes-preview/yh_bsm400_027.do"];
  var local = function (url) {
    var a = document.createElement('a'); a.href = url;
    return a.host === location.host ? a.pathname : '';
  };
  // 대체 응답 경로로 가는 ajax 는 GET 으로 (정적 호스팅은 POST 를 받지 않음)
  if (window.jQuery) {
    jQuery.ajaxPrefilter(function (o) {
      if (STUBS.indexOf(local(o.url)) > -1) { o.type = 'GET'; o.cache = true; }
    });
  }
  // 미러에 있는 화면(.html)으로 가는 폼 POST 는 GET 으로
  var toGet = function (f) {
    var p = local(f.action || location.href);
    if (/\.html$/.test(p) && String(f.method).toLowerCase() === 'post') f.method = 'get';
  };
  var submit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function () { toGet(this); return submit.call(this); };
  document.addEventListener('submit', function (e) { toGet(e.target); }, true);
})();
