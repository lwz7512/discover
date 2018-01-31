// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'implement',
    canvas:'secondCanvas',
    input: '',
    implementWords: [
      '国企走出去','利润翻一翻','收益增长','业务规模扩大','行业领军','一站式服务',
      '强强联手','企业转型','力挽狂澜','一击即中','体重增加5个点','油腻中年','脱单','手气最佳',
      '佛系蜕变','升职加薪','一起吃鸡','最初的梦想','平安喜乐','万事顺意'
    ],
    showModal: false
  },

  drawWords: [
    {
      seqence:   7,
      fillSytle: '#FFFFFF',
      fontSize:  30,
      rotate:    0,
      text:      '您的实现?',
      xPos:      100,
      yPos:      220,
      shadow:    true,
      shadowColor:'#666666'
    },{
      seqence:   1,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗1',
      xPos:      20,
      yPos:      60,
      shadow:    false
    },{
      seqence:   2,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗2',
      xPos:      100,
      yPos:      120,
      shadow:    false
    },{
      seqence:   3,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗3',
      xPos:      250,
      yPos:      40,
      shadow:    false
    },{
      seqence:   4,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗4',
      xPos:      10,
      yPos:      160,
      shadow:    false
    },{
      seqence:   5,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗5',
      xPos:      200,
      yPos:      140,
      shadow:    false
    },{
      seqence:   6,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗6',
      xPos:      250,
      yPos:      120,
      shadow:    false
    },{
      seqence:   8,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗8',
      xPos:      30,
      yPos:      270,
      shadow:    false
    },{
      seqence:   9,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/18,
      text:      '中文可以le吗9',
      xPos:      100,
      yPos:      300,
      shadow:    false
    },{
      seqence:   10,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/18,
      text:      '中文可以le吗10',
      xPos:      270,
      yPos:      250,
      shadow:    false
    },{
      seqence:   11,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗11',
      xPos:      0,
      yPos:      340,
      shadow:    false
    },{
      seqence:   12,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗12',
      xPos:      160,
      yPos:      340,
      shadow:    false
    },{
      seqence:   13,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗13',
      xPos:      220,
      yPos:      360,
      shadow:    false
    }
  ],

  // FILL TO THE INPUT
  selectWord (e) {
    // console.log(e)
    var index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({input: this.data.implementWords[index]})
    // update display
    this.drawWords.forEach(it => it.seqence==7?it.text = this.data.input:0)
    this.drawAll()
    this.setData({showModal: false})
  },


  openSelectionDialogue () {
    this.setData({
      showModal: true
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   * 阻断事件向下传递，避免在弹窗后还可以点击或者滑动蒙层下的界面
   */
  preventTouchMove: function () {
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    })
    this.drawAll()
  },


  goComplete () {
    if(!this.data.input){
      return wx.showToast({
            title: '写点啥吧亲',
            icon: 'none',
            image:'../../images/icon_intro.png',
            duration: 2000
        });
    }
    // save to global
    app.data.implementInpt = this.data.input

    wx.navigateTo({
      url: '../complete/complete'
    })
  },

  /**
   * 输入自定义关键字
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  inputKeyWord (evt) {
    // save the input
    this.data.input = evt.detail.value
    // update display
    this.drawWords.forEach(it => it.seqence==7?it.text = evt.detail.value:0)
    this.drawAll()
  },

  drawAll () {
    // redraw
    var context = wx.createCanvasContext(this.data.canvas)
    for(var item of this.drawWords) {
      if(item.shadow){
        context.save()
        context.setFillStyle(item.shadowColor);
        context.setFontSize(item.fontSize)
        context.rotate(item.rotate)
        context.fillText(item.text, item.xPos+2, item.yPos+2)
        context.restore()
      }
      context.save()
      item.shadow?context.setFillStyle(item.fillSytle):context.setFillStyle('#CCCCCC')
      context.setFontSize(item.fontSize)
      context.rotate(item.rotate)
      context.fillText(item.text, item.xPos, item.yPos)
      context.restore()// normal
    }
    // 这个不能放在循环里 !
    context.draw()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (opts) {
    console.log(opts)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // 随机选择关键字
    var randomDiscover = this.data.implementWords.sort(function(){return Math.random()-0.5})
    // save the reordered words
    this.setData({implementWords: randomDiscover})

    // 初始化显示的关键字
    for(var i in this.drawWords){
      if(this.drawWords[i].shadow) continue
      this.drawWords[i].text = randomDiscover[i]
    }
    // console.log(this.drawWords);

    var counter = 1
    var uDiscover = this.drawWords[0]
    // remove first
    this.drawWords.splice(0,1)
    // reorder words then
    var reorderedArray = this.drawWords.sort(function(){return Math.random()-0.5})
    // bring it back, insert
    reorderedArray.splice(0, 0, uDiscover)
    // save the reordered array!
    this.drawWords = reorderedArray

    // begin to draw
    var context = wx.createCanvasContext(this.data.canvas)
    var intvId = setInterval(() => {
      if(counter==this.drawWords.length+1) return clearInterval(intvId)

      for(var item of reorderedArray.slice(0, counter)) {
        if(item.shadow){
          context.save()
          context.setFillStyle(item.shadowColor);
          context.setFontSize(item.fontSize)
          context.rotate(item.rotate)
          context.fillText(item.text, item.xPos+2, item.yPos+2)
          context.restore()
        }
        context.save()
        context.setFillStyle(item.fillSytle)
        context.setFontSize(item.fontSize)
        context.rotate(item.rotate)
        context.fillText(item.text, item.xPos, item.yPos)
        context.restore()// normal
      }
      // 这个不能放在循环里 !
      context.draw()

      counter ++
    }, 100)

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
