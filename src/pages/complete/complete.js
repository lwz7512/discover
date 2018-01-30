// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'complete',
    btnSelected: false,
    options: [
      '../../images/opt-bg-0.jpg','../../images/opt-bg-1.jpg',
      '../../images/opt-bg-2.jpg','../../images/opt-bg-3.jpg'
    ],
    background: null,
    canvas: 'thirdCanvas'
  },

  // compose image
  createImage () {
    var that = this

    this.showToast('正在生成图片', 'loading')

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
            that.showToast('请在相册中查看生成的图片', 'success')
            console.log("success:" + res);
          }, fail(e) {
            console.log("err:" + e);
          }
        })
      }
    });// end of canvas to file
  },

  showToast (title, type) {
    wx.showToast({
          title: title,
          icon: type,
          // image:'../../images/icon_intro.png',
          duration: 2000
    });
  },

  changeBG (evt) {
    // console.log(evt)
    var i = Number(evt.currentTarget.dataset.index)
    var image = this.data.options[i]
    // console.log(image);
    this.setData({background: image})
    // redraw
    wx.getImageInfo({
      src: this.data.background,
      success: res => {
        // console.log(res);
        this.drawAll(this.data.background, res.width, res.height)
      }
    })
  },

  switchImgs () {
    var last = this.data.btnSelected
    this.setData({btnSelected: !last})
  },

  /**
   * 生命周期函数--监听页面加载
   * 注：这里不适合密集计算!
   * @2018/01/30
   */
  onLoad () {
    // console.log(app.data);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // console.log(new Date().getTime());
    var defaultBG = this.data.options[0]
    this.setData({background: defaultBG})
    // 必须得到图片的大小以计算缩放比例，不然没法画
    wx.getImageInfo({
      src: this.data.background,
      success: res => {
        // console.log(res);
        this.drawAll(this.data.background, res.width, res.height)
      }
    })
  },

  drawLargeText (context, fontSize, text, x, y) {
    context.setFillStyle('#FFFFFF')
    context.setFontSize(fontSize)
    context.fillText(text, x, y)
  },

  drawAll (imgPath, imgWidth, imgHeight) {
    var system = wx.getSystemInfoSync()
    // console.log(system);
    var screenWidth = system.windowWidth
    var screenHeight= system.windowHeight
    var context = wx.createCanvasContext(this.data.canvas)
    // draw background image
    context.save()
    context.scale(screenWidth/imgWidth, screenHeight/imgHeight)
    context.drawImage(imgPath, 0, 0)
    context.restore()

    var startX = screenWidth/3
    var startY = 120
    var rectW = screenWidth/3
    var rectH = screenHeight*2.2/5

    // draw white rectangle
    context.setLineWidth(2);
    context.setStrokeStyle("#FFFFFF");
    context.rect(startX, startY, rectW, rectH)
    context.stroke()

    // draw text
    this.drawLargeText(context, 30, '发', startX+20, startY+40)
    this.drawLargeText(context, 30, '现', startX+20, startY+80)

    var index = 0
    var customDiscoverInput = app.data.discoverInput
    for(var char of customDiscoverInput){
      this.drawLargeText(context, 22, char, startX+24, startY+110+index*28)
      index ++
    }

    this.drawLargeText(context, 30, '实', startX+rectW-50, startY+40)
    this.drawLargeText(context, 30, '现', startX+rectW-50, startY+80)

    var index = 0
    var customImplementInput= app.data.implementInpt
    for(var char of customImplementInput){
      this.drawLargeText(context, 22, char, startX+rectW-46, startY+110+index*28)
      index ++
    }

    // draw kpmg wish for new year
    var wish = '毕马威祝您在新的一年里能够发现机遇，'
    var wish2 = '实现梦想'
    this.drawLargeText(context, 18, wish, 40, screenHeight-180)
    this.drawLargeText(context, 18, wish2, 40, screenHeight-140)

    // draw qrcode image
    context.save()
    context.scale(0.6, 0.6)
    context.drawImage('../../images/discoverlogo.jpg', screenWidth*1.2, screenHeight*1.26+20)
    context.restore()

    // draw kpmg logo
    context.save()
    context.scale(0.4, 0.4)
    context.drawImage('../../images/kpmg-200.png', 60, 60)
    context.restore()

    context.draw()
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
