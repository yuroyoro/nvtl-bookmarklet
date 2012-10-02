Navigation Timeline Bookmarklet
====================================================

A bookmarklet for visualizing time-spents of various browser events that proviede by W3C Navigation Timing API values.

## ScreenShots

<img src='https://github.com/yuroyoro/nvtl-bookmarklet/raw/master/screenshot-1.png' width='600'/>
<img src='https://github.com/yuroyoro/nvtl-bookmarklet/raw/master/screenshot-2.png' width='600'/>
<img src='https://github.com/yuroyoro/nvtl-bookmarklet/raw/master/screenshot-3.png' width='600'/>

## How to use

You will have to follow these steps to create it manually:

create a favorite (IE) or bookmark (all other browser) targeting an arbitrary url
change the target url to this:

```javascript
javascript:(function(){var s=document.createElement('script');var head=document.getElementsByTagName('head')[0];var done=false;s.charset='UTF-8';s.language='javascript';s.type='text/javascript';s.src='https://raw.github.com/yuroyoro/nvtl-bookmarklet/master/navigation_timeline.js';head.appendChild(s);})();
```

## Supported browses

Chrome, Firefox 7+ or Internet Explorer 9+.

(Any browser that supports W3C Navigation Timing API)

## License
(The MIT License)

Copyright (c) 2012 Tomohito Ozaki(@yuroyoro). See LICENSE for details.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Copyright

Copyright (c) 2012 Tomohito Ozaki(@yuroyoro).
