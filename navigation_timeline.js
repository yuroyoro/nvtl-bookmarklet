(function(){
  window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};

  var timing = performance.timing || {};
  var navigation = performance.navigation || {};

  function getOrAddElement(id, type, properties, parent, insertBefore) {
    var elem = document.getElementById(id);
    if (!elem) {
      elem = document.createElement(type);
      elem.id = id;
      for (var p in properties) {
        elem[p] = properties[p];
      }
      if (!parent) parent = document.getElementById('nvtl-detail');
      if (insertBefore) {
        parent.insertBefore(elem, insertBefore);
      } else {
        parent.appendChild(elem);
      }
    }
    return elem;
  }

  function log(label, msg) {
    var logElem = getOrAddElement('logElem', 'div');
    if (label) label = (''+label).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
    if (msg) msg = (''+msg).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
    var logLine = ['<br><b>', label, '</b>: ', msg].join('');
    logElem.innerHTML += logLine;
  }

  function logTiming(timingStr) {
    if (timing) {
      var absTiming = getTiming(timingStr);
      var deltaTiming = getDelta('navigationStart', timingStr);
      log(timingStr, absTiming + ' ' + deltaTiming);
    }
  }

  function logType() {
    var NAVIGATION_TYPE = ['Navigate', 'Reload', 'Back/Forward'];
    if (navigation) {
      log('type', NAVIGATION_TYPE[navigation.type]);
    }
  }

  function logRedirectCount() {
    if (navigation) {
      log('redirectCount', navigation.redirectCount);
    }
  }

  function getTiming(timingStr) {
    if (!timing) return 0;
    return timing[timingStr];
  }

  function getStartTiming() {
    return getTiming('navigationStart');
  }

  function getEndTiming() {
    return getTiming('loadEventEnd');
  }

  function getPercent(startTiming, endTiming) {
    var begin = getStartTiming();
    var end = getEndTiming();
    var from = getTiming(startTiming);
    var to = getTiming(endTiming);
    var totalDuration = end - begin;
    var thisDuration = to - from;
    return Math.round(100.0 * thisDuration / totalDuration);
  }

  function getDelta(startTiming, endTiming) {
    var begin = getTiming(startTiming);
    var end = getTiming(endTiming);
    if (!begin || !end) return "n/a";
    return (end - begin) + "ms";
  }

  function setVerticalBar(id, startTiming, endTiming, labelId) {
    var elem = document.getElementById(id);
    var percent = getPercent('navigationStart', endTiming);
    elem.style.width = percent + '%';
    if(labelId) {
      var label = document.getElementById(labelId);
      label.innerHTML += " " + getDelta(startTiming, endTiming);
      label.style.width= percent + '%';
    }else{
      elem.innerHTML += " " + getDelta(startTiming, endTiming);
    }
    elem.style.visibility = 'visible';
  }

  function setHorizontalBar(id, startTiming, endTiming) {
    var elem = document.getElementById(id);
    var startPercent = getPercent('navigationStart', startTiming);
    var endPercent = getPercent('navigationStart', endTiming);
    var width = endPercent - startPercent;
    if (width > 0)
      elem.style.width = width + '%';
    else
      elem.style.width = '1px';
    elem.style.marginLeft = (startPercent > 0 ? startPercent : 0) + '%';
    elem.innerHTML += " " + getDelta(startTiming, endTiming);
    elem.style.visibility = 'visible';
  }

  function initStyle(){
    var head = document.getElementsByTagName('head')[0];

    var style = document.createElement('style');
    var css = "";
    css += ".nvtl-main {";
    css += "  position: absolute;";
    css += "  z-index: 1999;";
    css += "  top: 0px;";
    css += "  left:0px;";
    css += "  width:100%;";
    css += "  height:auto;";
    css += "  background: #111;";
    css += "  background: -webkit-gradient(linear, 0 top, 0 bottom, from(#333), color-stop(0.2, #222), to(#222));";
    css += "  border: 1px solid black;";
    css += "  filter: alpha(opacity=90);";
    css += "  -moz-opacity:0.9;";
    css += "  opacity:0.9;";
    css += "  opacity:0.9;";
    css += "  font-family: arial,  sans-serif;";
    css += "  font-size: 13px;";
    css += "  color: #DDD;";
    css += "}";
    css += ".nvtl-title{";
    css += "  margin-top: 1ex;";
    css += "  text-align: center;";
    css += "  font-size: 18px;";
    css += "}";
    css += ".nvtl-title h2{";
    css += "  color: #DDD;";
    css += "}";
    css += ".ntvl-error {";
    css += "  text-align: center;";
    css += "  width: 100%;";
    css += "}";
    css += ".nvtl-links{";
    css += "  text-align: right;";
    css += "  width: 100%;";
    css += "}";
    css += ".nvtl-links a{";
    css += "  font-size: 10px;";
    css += "  margin-left: 1ex;";
    css += "  margin-right: 1ex;";
    css += "}";
    css += ".nvtl-timeline {";
    css += "  color: #DDD;";
    css += "  position: relative;";
    css += "  text-shadow: 1px 1px 1px #111;";
    css += "  margin-left: 3%;";
    css += "  width: 90%;";
    css += "  -webkit-box-reflect: below 0 -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.86, transparent), to(hsla(0,0%,0%,.25)));";
    css += "  z-index: 0;";
    css += "  border-left: 1px dashed hsla(0,100%,100%,.5);";
    css += "}";
    css += ".nvtl-vertical-bar {";
    css += "  border-right: 1px dashed hsla(0,100%,100%,.5);";
    css += "  height: 100%;";
    css += "  text-align: right;";
    css += "  position: absolute;";
    css += "  visibility: hidden;";
    css += "  white-space: nowrap;";
    css += "  z-index: 1;";
    css += "}";
    css += ".nvtl-vertical-label{";
    css += "  text-align: right;";
    css += "  white-space: nowrap;";
    css += "}";
    css += ".nvtl-vertical-label-blue {";
    css += "  color: #1A89D7;";
    css += "}";
    css += ".nvtl-vertical-label-orange{";
    css += "  color: #F8C27E;";
    css += "}";
    css += ".nvtl-vertical-label-green{";
    css += "  color: #7EF8B9;";
    css += "}";
    css += ".nvtl-horizontal-bar {";
    css += "  border-radius: 5px;";
    css += "  height: 3.5ex;";
    css += "  -webkit-transition-property: width;";
    css += "  -webkit-transition-duration: .5s;";
    css += "  visibility: hidden;";
    css += "  white-space: nowrap;";
    css += "  z-index: 2;";
    css += "}";
    css += ".nvtl-horizontal-bar-blue {";
    css += "  background: #1A89D7;";
    css += "  background: -webkit-gradient(linear, left top, left bottom, from(#E9EDE8), to(#1A89D7), color-stop(0.4, #2A4D8B));";
    css += "}";
    css += ".nvtl-horizontal-bar-orange{";
    css += "  background: #F8C27E;";
    css += "  background: -webkit-gradient(linear, left top, left bottom, from(#E9EDE8), to(#F8C27E), color-stop(0.4, #C78003));";
    css += "}";
    css += ".nvtl-horizontal-bar-green{";
    css += "  background: #7EF8B9;";
    css += "  background: -webkit-gradient(linear, left top, left bottom, from(#E9EDE8), to(#7EF8B9), color-stop(0.4, #01A84B));";
    css += "}";
    css += ".spacer { "
    css += "  height: 3ex;";
    css += "  margin-bottom: 0.5ex;";
    css += "  border-bottom: 1px dashed hsla(0,100%,100%,.5);";
    css += "}";
    css += ".nvtl-detail{";
    css += "  position: absolute;";
    css += "  z-index: 2999;";
    css += "  top: 0px;";
    css += "  left:0px;";
    css += "  width:auto;";
    css += "  background: #fff;";
    css += "  color: #333;";
    css += "  text-align: left;";
    css += "  border: 1px solid #ccc;";
    css += "  border-radius: 5px;";
    css += "  padding: 5px;";
    css += "}";
    css += ".nvtl-footer{";
    css += "  border-top: 1px dashed hsla(0,100%,100%,.5);";
    css += "  padding: 1ex;";
    css += "  text-align: right;";
    css += "}";

    style.innerHTML= css;
    head.appendChild(style);
  }

  function initContent(){
    var createDiv = function(id, parent, styleClass, style){
      var div = document.createElement('div');
      div.id = id;
      if(styleClass) div.className = styleClass;
      if(style) div.style = style;
      parent.appendChild(div);
      return div
    };

    var main = createDiv('nvtl-main', document.body, 'nvtl-main');
    var title = createDiv('nvtl-title', main, 'nvtl-title');
    var h2 = document.createElement('h2');
    h2.classname = 'nvtl-h2';
    h2.innerHTML= 'Navigation Timing Timeline';
    title.appendChild(h2);

    var links = createDiv('nvtl-links', main, 'nvtl-links');
    var createLink = function(text, href) {
      var a = document.createElement('a');
      a.classname = 'nvtl-a';
      a.href = href;
      a.innerHTML= text;
      a.target = '_blank';
      links.appendChild(a);
    }
    createLink('What is Navigation Timing API', 'https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html');
    var sep = document.createElement('span');
    sep.innerHTML = " | ";
    links.appendChild(sep);
    createLink('About this bookmarket', 'https://github.com/yuroyoro/nvtl-bookmarket');

    var error = createDiv('nvtl-error', main, 'nvtl-error');
    error.innerHTML = "Sorry. This browser doesn't seem support Navigation Timing yet. Run this bookmarket on Chrome, Firefox 7+ or Internet Explorer 9+.";
    error.style.display = 'none';

    if (!getTiming('navigationStart')) {
      error.style.display = '';
      return false;
    }

    var timeline = createDiv('nvtl-timeline', main, 'nvtl-timeline');

    var vertical_bar_count = 0;
    var createVerticalBar = function(id, text){
      var bar = createDiv(id, timeline, 'nvtl-vertical-bar');
      if(text) bar.innerHTML= text;
      return bar;
    };
    var createVerticalLabel= function(id, text, color){
      var label  = createDiv(id, timeline, 'nvtl-vertical-label nvtl-vertical-label-' + color);
      label.innerHTML= text;
      return label;
    };
    var createHorizontalBar = function(id, text, color, style){
      var bar = createDiv(id, timeline, 'nvtl-horizontal-bar nvtl-horizontal-bar-' + color, style);
      bar.innerHTML= text;
      return bar;
    };
    var createSpacer = function(){
    };
    var start_bar = createVerticalBar('v-nav-start-bar', 'Navigation started 0ms');
    start_bar.style.visibility = 'visible';
    start_bar.style.borderRight= 'none';
    createVerticalBar('v-networking-bar');
    createVerticalBar('v-dom-processing-bar');
    createVerticalBar('v-loading-bar');
    createVerticalBar('v-page-loaded-bar', 'Page loaded');

    createDiv(null, timeline, 'spacer');
    createVerticalLabel('v-networking-label', 'Networking', 'blue');

    createHorizontalBar('h-redirect-bar', 'Redirects', 'blue');
    createHorizontalBar('h-unloaded-bar', 'Unloaded', 'blue');
    createHorizontalBar('h-fetch-bar', 'Fetch', 'blue');
    createHorizontalBar('h-dns-bar', 'DNS', 'blue');
    createHorizontalBar('h-connect-bar', 'Connect', 'blue');
    createHorizontalBar('h-request-bar', 'Request', 'blue');
    createHorizontalBar('h-response-bar', 'Response', 'blue');

    createDiv(null, timeline, 'spacer');
    createVerticalLabel('v-dom-processing-label', 'DOM Processing', 'orange');

    createHorizontalBar('h-dom-loading-bar', 'Dom Loading', 'orange');
    createHorizontalBar('h-dom-content-bar', 'Dom Content Loading', 'orange');
    createHorizontalBar('h-dom-complete-bar', 'Dom Complete', 'orange');

    createDiv(null, timeline, 'spacer');
    createVerticalLabel('v-loading-label', 'On Loading', 'green');

    createHorizontalBar('h-loading-bar', 'Loading', 'green');

    var detail = createDiv('nvtl-detail', main, 'nvtl-detail');

    var footer = createDiv('nvtl-footer', main, 'nvtl-footer');
    var createButton = function(id, label, callback){
      var btn = document.createElement('button');
      btn.innerHTML= label;
      btn.onclick = callback;
      footer.appendChild(btn);
    };

    var toggleDetail = function(){
      if( detail.style.display == ''){
        detail.style.display = 'none';
      }else{
        detail.style.display = '';
      }
    };
    detail.style.display = 'none';

    createButton('nvtl-close-btn', 'detail', toggleDetail);

    createButton('nvtl-close-btn', 'refresh', function(){
      document.body.removeChild(main);
      var initialized = initContent();
      if(initialized) writeTimings();
    });
    createButton('nvtl-close-btn', 'close', function(){
      document.body.removeChild(main);
    });

    return true;
  };

  function writeTimings() {

    setVerticalBar('v-networking-bar', 'navigationStart', 'responseEnd', 'v-networking-label');
    setVerticalBar('v-dom-processing-bar', 'domLoading', 'domComplete', 'v-dom-processing-label');
    setVerticalBar('v-loading-bar', 'loadEventStart', 'loadEventEnd', 'v-loading-label');
    setVerticalBar('v-page-loaded-bar', 'navigationStart', 'loadEventEnd');

    setHorizontalBar('h-redirect-bar', 'redirectStart', 'redirectEnd');
    setHorizontalBar('h-unloaded-bar', 'unloadEventStart', 'unloadEventEnd');
    setHorizontalBar('h-fetch-bar', 'fetchStart', 'domainLookupStart');
    setHorizontalBar('h-dns-bar', 'domainLookupStart', 'domainLookupEnd');
    setHorizontalBar('h-connect-bar', 'connectStart', 'connectEnd');
    setHorizontalBar('h-request-bar', 'requestStart', 'responseStart');
    setHorizontalBar('h-response-bar', 'responseStart', 'responseEnd');

    setHorizontalBar('h-dom-loading-bar', 'domLoading', 'domInteractive');
    setHorizontalBar('h-dom-content-bar', 'domContentLoadedEventStart', 'domContentLoadedEventEnd');
    setHorizontalBar('h-dom-complete-bar', 'domContentLoadedEventEnd', 'domComplete');

    setHorizontalBar('h-loading-bar', 'loadEventStart', 'loadEventEnd');

    logType();
    logRedirectCount();
    logTiming('navigationStart');
    logTiming('unloadEventStart');
    logTiming('unloadEventEnd');
    logTiming('redirectStart');
    logTiming('redirectEnd');
    logTiming('fetchStart');
    logTiming('domainLookupStart');
    logTiming('domainLookupEnd');
    logTiming('connectStart');
    logTiming('connectEnd');
    logTiming('requestStart');
    logTiming('responseStart');
    logTiming('responseEnd');
    logTiming('domLoading');
    logTiming('domInteractive');
    logTiming('domContentLoadedEventStart');
    logTiming('domContentLoadedEventEnd');
    logTiming('domComplete');
    logTiming('loadEventStart');
    logTiming('loadEventEnd');
  }
  initStyle();
  var initialized = initContent();
  if(initialized) writeTimings();
})();
