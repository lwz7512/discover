// 获取全局应用程序实例对象
const app = getApp()
const Promise = require('../../utils/bluebird')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'complete',
    btnSelected: true, // FIXME, ...
    options: [
      '../../images/opt-bg-0.jpg','../../images/opt-bg-1.jpg',
      '../../images/opt-bg-2.jpg','../../images/opt-bg-3.jpg'
    ],
    background: null,
    canvas: 'thirdCanvas',
    editMode: true // default is edit mode, false while sharing
  },

  /**
   * 生命周期函数--监听页面加载
   * 注：这里不适合密集计算!
   * @2018/01/30
   */
  onLoad () {
    var system = wx.getSystemInfoSync()
    // console.log(system)
    var screenWidth = system.windowWidth
    var screenHeight= system.windowHeight
    // initialize coordinates
    this.setData({
      circleRect: {},// toggle switch button, init in later drawing function
      btnImgs: [
        { // background 0
          x: screenWidth - 60,
          y: screenHeight * 0.24,
          right: screenWidth,
          bottom: screenHeight * 0.24 + 40 // width, height = 40
        },{ // background 1
          x: screenWidth - 60,
          y: screenHeight * 0.24 + 50,
          right: screenWidth,
          bottom: screenHeight * 0.24 + 50 + 40 // width, height = 40
        },{ // background 2
          x: screenWidth - 60,
          y: screenHeight * 0.24 + 100,
          right: screenWidth,
          bottom: screenHeight * 0.24 + 100 + 40 // width, height = 40
        },{ // background 3
          x: screenWidth - 60,
          y: screenHeight * 0.24 + 150,
          right: screenWidth,
          bottom: screenHeight * 0.24 + 150 + 40 // width, height = 40
        },{ // background custom @2018/02/03
          x: screenWidth - 60,
          y: screenHeight * 0.24 + 200,
          right: screenWidth,
          bottom: screenHeight * 0.24 + 200 + 40 // width, height = 40
        }
      ],
      btnRoundRect: { // share button
        x: screenWidth - 100,
        // x: 40,
        y: screenHeight - 116,
        // right: 120,
        right: screenWidth - 20,
        bottom: screenHeight - 90
      }
    })
  },


  // TODO: 检测是否点击了按钮
  canvasTap (e) {
    var that = this

    var clientX = e.touches[0].clientX
    var clientY = e.touches[0].clientY

    var touchedSwitchBtn = this.detectInRect(clientX, clientY, this.data.circleRect)
    // 重汇此按钮和背景选择按钮
    if(touchedSwitchBtn){
      var previous = this.data.btnSelected
      this.setData({btnSelected:!previous}) // reverse operation
      this.safeDrawScreen()
    }

    var touchedSwitchOpt0 = this.detectInRect(clientX, clientY, this.data.btnImgs[0])
    // 切换背景图绘制 - 0
    if(touchedSwitchOpt0){
      // console.log('image 0 touched!');
      var image = this.data.options[0]
      this.setData({background: image})
      this.safeDrawScreen()
    }
    var touchedSwitchOpt1 = this.detectInRect(clientX, clientY, this.data.btnImgs[1])
    // 切换背景图绘制 - 1
    if(touchedSwitchOpt1){
      // console.log('image 1 touched!');
      var image = this.data.options[1]
      this.setData({background: image})
      this.safeDrawScreen()
    }
    var touchedSwitchOpt2 = this.detectInRect(clientX, clientY, this.data.btnImgs[2])
    // 切换背景图绘制 - 2
    if(touchedSwitchOpt2){
      // console.log('image 2 touched!');
      var image = this.data.options[2]
      this.setData({background: image})
      this.safeDrawScreen()
    }
    var touchedSwitchOpt3 = this.detectInRect(clientX, clientY, this.data.btnImgs[3])
    // 切换背景图绘制 - 3
    if(touchedSwitchOpt3){
      // console.log('image 3 touched!');
      var image = this.data.options[3]
      this.setData({background: image})
      this.safeDrawScreen()
    }
    // access cutomer album
    var touchedSwitchCustom = this.detectInRect(clientX, clientY, this.data.btnImgs[4])
    if(touchedSwitchCustom){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          that.setData({background: tempFilePaths[0]});
        },
        fail: (res)=>{
          that.showToast('选择图片失败!', 'warn')
        },
        complete: (res)=>{
          that.safeDrawScreen()
        }
      })
    }

    // 检测是否点下了分享按钮, 改变模式
    var touchedShareBtn = this.detectInRect(clientX, clientY, this.data.btnRoundRect)
    if(touchedShareBtn){
      // console.log('share btn touched!')
      this.setData({editMode: false})
      this.safeDrawScreen().then(()=>{
        this.createImage()
      })
    }
  }, // end of canvasTap

  detectInRect (x, y, rect) {
    if(x > rect.x && y > rect.y && x < rect.right && y < rect.bottom) return true
    return false
  },

  // compose image
  createImage () {
    var that = this

    // this.showToast('正在生成图片', 'loading')
    wx.showLoading({
      title: '正在生成图片...',
    })

    var system = wx.getSystemInfoSync()
    // console.log(system);
    var screenWidth = system.windowWidth
    var screenHeight = system.windowHeight
    // create image
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      height: screenHeight,
      width: screenWidth,
      canvasId: this.data.canvas,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.hideLoading() // hide loading mannually...
            var info = '请在相册中查看生成的图片，并分享祝福!'
            wx.showModal({
              title: '提示',
              content: info
            })
            // restore edit mode
            that.setData({editMode: true})
            that.safeDrawScreen()
          }, fail(e) {
            that.showToast('保存图片出错啦！', 'warn')
          }
        })
      }
    });// end of canvas to file
  },// end of createImage


  showToast (title, type, duration) {
    var options = {
      title: title,
      icon: 'none',
      duration: duration?duration:2000
    }
    if(type == 'warn') options.image = '../../images/icon_intro.png'
    wx.showToast(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(new Date().getTime());
    var defaultBG = this.data.options[0]
    this.setData({background: defaultBG})

    this.safeDrawScreen().then(()=>{
      console.log('image rendered!');
    })
  },

  drawLargeText (context, fontSize, text, x, y) {
    context.setFillStyle('#FFFFFF')
    context.setFontSize(fontSize)
    context.fillText(text, x, y)
  },

  // 拿到背景图片信息后绘制
  safeDrawScreen () {
    return new Promise((resolve, reject) => {
      // 必须得到背景图片的大小以计算缩放比例，不然没法画
      wx.getImageInfo({
        src: this.data.background,
        success: res => {
          // console.log(res);
          this.drawAll(this.data.background, res.width, res.height)
          resolve()
        },
        fail: reject
      })
    })

  },

  drawAll (imgPath, imgWidth, imgHeight) {
    var system = wx.getSystemInfoSync()
    var screenWidth = system.windowWidth
    var screenHeight= system.windowHeight
    var smallScreen = system.windowHeight>600?false:true
    // this.showToast('屏幕高度: '+system.windowHeight+', small screen: '+smallScreen, 'none')
    var context = wx.createCanvasContext(this.data.canvas)
    // draw background image
    context.save()
    context.scale(screenWidth/imgWidth, screenHeight/imgHeight)
    context.drawImage(imgPath, 0, 0)
    context.restore()

    var startX = screenWidth/3
    var startY = screenHeight/6
    var rectW = screenWidth/3
    var rectH = screenHeight*2.24/5

    // draw white rectangle
    context.setLineWidth(2);
    context.setStrokeStyle("#FFFFFF");
    context.rect(startX, startY, rectW, rectH)
    context.stroke()

    var lgFontSize = smallScreen?28:30
    var nmFontSize = smallScreen?20:24

    // fix text position for iphone5 @2018/02/01
    startY = smallScreen?startY-10:startY

    // draw text
    this.drawLargeText(context, lgFontSize, '发', startX+20, startY+1.5*lgFontSize)
    this.drawLargeText(context, lgFontSize, '现', startX+20, startY+2.8*lgFontSize)

    var index = 0
    var customDiscoverInput = app.data.discoverInput
    var nmFontYOffset = 110

    for(var char of customDiscoverInput){
      this.drawLargeText(context, nmFontSize, char, startX+24, startY+nmFontYOffset+index*nmFontSize*1.2)
      index ++
    }

    this.drawLargeText(context, lgFontSize, '实', startX+rectW-50, startY+1.5*lgFontSize)
    this.drawLargeText(context, lgFontSize, '现', startX+rectW-50, startY+2.8*lgFontSize)

    var index = 0
    var customImplementInput= app.data.implementInpt
    for(var char of customImplementInput){
      this.drawLargeText(context, nmFontSize, char, startX+rectW-46, startY+nmFontYOffset+index*nmFontSize*1.2)
      index ++
    }

    // draw kpmg wish for new year
    var wish1 = '发现机遇，实现梦想'
    var wish2 = '毕马威祝您在新的一年里心想事成'
    this.drawLargeText(context, 18, wish1, 40, screenHeight*0.7)
    this.drawLargeText(context, 18, wish2, 40, screenHeight*0.7+30)

    // draw qrcode image
    context.save()
    context.scale(0.6, 0.6)
    // context.drawImage('../../images/discoverlogo4.png', screenWidth*1.2, screenHeight*1.34)
    context.drawImage('../../images/discoverlogo4.png', 70, screenHeight*1.34)
    context.restore()

    var sao_qi_de_hua = '扫一扫，分享你的发现实现'
    this.drawLargeText(context, 12, sao_qi_de_hua, 40, screenHeight - 20)

    // draw kpmg logo
    context.save()
    context.scale(0.4, 0.4)
    context.drawImage('../../images/kpmg-200.png', 60, 60)
    context.restore()

    // draw round rectangle button
    if(this.data.editMode){
      this.drawRoundRect(context, this.data.btnRoundRect, 14, '#DE4323')
      // draw background switch image
      var cntrX = screenWidth - 40
      var cntrY = screenHeight * 0.18
      var r = 22
      var imgPath = this.data.btnSelected?'../../images/img-dn-icon.png':'../../images/img-up-icon.png'
      this.drawCircleImg(context, cntrX, cntrY, r, imgPath)

      // TODO,  draw background options
      if(this.data.btnSelected){
        context.drawImage('../../images/icn-bg-0-40.png', this.data.btnImgs[0].x, this.data.btnImgs[0].y)
        context.drawImage('../../images/icn-bg-1-40.png', this.data.btnImgs[1].x, this.data.btnImgs[1].y)
        context.drawImage('../../images/icn-bg-2-40.png', this.data.btnImgs[2].x, this.data.btnImgs[2].y)
        context.drawImage('../../images/icn-bg-3-40.png', this.data.btnImgs[3].x, this.data.btnImgs[3].y)
        context.drawImage('../../images/icn-bg-c-40.png', this.data.btnImgs[4].x, this.data.btnImgs[4].y)
      }
    }

    // lastly draw it!
    context.draw()
  },

  drawRoundRect (context, rect, radius, fillColor) {
    context.beginPath();
    context.moveTo(rect.x+radius, rect.y);
    context.lineTo(rect.right - radius, rect.y);
    context.arc(rect.right - radius,rect.y + radius, radius, 3*Math.PI/2,2*Math.PI, false);
    context.lineTo(rect.right, rect.bottom - radius);
    context.arc(rect.right - radius, rect.bottom - radius, radius, 0, Math.PI/2, false);
    context.lineTo(rect.x + radius, rect.bottom);
    context.arc(rect.x + radius, rect.bottom - radius, radius, Math.PI/2, Math.PI, false);
    context.lineTo(rect.x, rect.y+radius);
    context.arc(rect.x + radius, rect.y + radius, radius, Math.PI, 3*Math.PI/2, false);
    context.closePath();
    // context.setStrokeStyle(fillColor)
    // context.stroke()
    context.setFillStyle(fillColor)
    context.fill()
    this.drawLargeText(context, 14, '分享祝福', rect.x+12, rect.y+18)
  },

  /**
   * 要记下该按钮位置做点击判断
   * @param  {[type]} context [description]
   * @param  {[type]} cntrX   [description]
   * @param  {[type]} cntrY   [description]
   * @param  {[type]} r       [description]
   * @param  {[type]} imgPath [description]
   * @return {[type]}         [description]
   */
  drawCircleImg (context, cntrX, cntrY, r, imgPath) {

    context.beginPath();
    context.arc(cntrX, cntrY, r, 0, 2*Math.PI)
    context.setFillStyle('#CCCCCC')
    context.fill()

    // draw image image
    context.drawImage(imgPath, cntrX-12, cntrY-12)
    // save the rect postion for tap detect
    this.setData({
      circleRect: {
        x: cntrX - r,
        y: cntrY - r,
        right: cntrX + r,
        bottom: cntrY + r
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
