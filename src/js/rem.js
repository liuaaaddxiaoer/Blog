(function (win,doc) {

  if (process.env.NODE_ENV == 'production') {
    win.console.log = function () {

    }
  }


    var htmlE = doc.documentElement

    var resizeMethodName = 'orientationchange' in win ? 'orientationchange' : 'resize'
    var width = htmlE.clientWidth;
    var resizeFunc = function () {

      if (width < 500) {
        htmlE.style.fontSize = (width / 375) * 20 + 'px'
      }else {
        htmlE.style.fontSize = 20 + 'px'
      }
    }

    resizeFunc()
    console.log(width)
    console.log(htmlE.clientWidth)

    if (!win.addEventListener) return;
    win.addEventListener(resizeMethodName, resizeFunc, false)

  })(window, document)


