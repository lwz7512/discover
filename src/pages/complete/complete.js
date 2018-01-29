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

  changeBG (evt) {
    // console.log(evt)
    var i = Number(evt.currentTarget.dataset.index)
    var image = this.data.options[i]
    console.log(image);
    this.setData({background: image})
  },

  switchImgs () {
    var last = this.data.btnSelected
    this.setData({btnSelected: !last})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // console.log(app.data);
    var defaultBG = this.data.options[0]
    this.setData({background: defaultBG})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    var system = wx.getSystemInfoSync()
    console.log(system)
    var screenWidth = system.windowWidth
    var screenHeight= system.windowHeight
    var context = wx.createCanvasContext(this.data.canvas)

    var startX = screenWidth/3
    var startY = 20
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
    // context.save()
    // draw light bulb
    // context.scale(0.5, 0.5)
    // context.drawImage('../../images/lamp-bulb.png', screenWidth+rectW/2, 0)

    // draw lastly, done!
    // context.restore()
    context.draw()
  },

  drawLargeText (context, fontSize, text, x, y) {
    context.setFillStyle('#FFFFFF')
    context.setFontSize(fontSize)
    context.fillText(text, x, y)
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
