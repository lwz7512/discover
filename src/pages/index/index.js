/**
 * v0.11 release officially
 * @2018/02/07
 */
// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'Index page',
    showModal: false,
    userName: '',
    phone: '',
    company:'',
    position:'',
    address:'',
    bgClass: '',
    showNow: false,
    canvas:'gifCanvas',
    demoWords: [
      {word: '发', font: 24, row: 0, col: 0, xPos: 0, yPos: 0},
      {word: '现', font: 24, row: 1, col: 0, xPos: 0, yPos: 0},
      {word: '客', font: 18, row: 2, col: 0, xPos: 0, yPos: 0},
      {word: '户', font: 18, row: 3, col: 0, xPos: 0, yPos: 0},
      {word: '需', font: 18, row: 4, col: 0, xPos: 0, yPos: 0},
      {word: '求', font: 18, row: 5, col: 0, xPos: 0, yPos: 0},
      // --------------------
      {word: '实', font: 24, row: 0, col: 1, xPos: 0, yPos: 0},
      {word: '现', font: 24, row: 1, col: 1, xPos: 0, yPos: 0},
      {word: '一', font: 18, row: 2, col: 1, xPos: 0, yPos: 0},
      {word: '站', font: 18, row: 3, col: 1, xPos: 0, yPos: 0},
      {word: '式', font: 18, row: 4, col: 1, xPos: 0, yPos: 0},
      {word: '服', font: 18, row: 5, col: 1, xPos: 0, yPos: 0},
      {word: '务', font: 18, row: 6, col: 1, xPos: 0, yPos: 0},
      // -------clear-------------
      {word: ''},
      //
      {word: '发', font: 24, row: 0, col: 0, xPos: 0, yPos: 0},
      {word: '现', font: 24, row: 1, col: 0, xPos: 0, yPos: 0},
      {word: '🐶', font: 18, row: 2, col: 0, xPos: 0, yPos: 0},
      {word: '年', font: 18, row: 3, col: 0, xPos: 0, yPos: 0},
      {word: '来', font: 18, row: 4, col: 0, xPos: 0, yPos: 0},
      {word: '袭', font: 18, row: 5, col: 0, xPos: 0, yPos: 0},
      // --------------------
      {word: '实', font: 24, row: 0, col: 1, xPos: 0, yPos: 0},
      {word: '现', font: 24, row: 1, col: 1, xPos: 0, yPos: 0},
      {word: '单', font: 18, row: 2, col: 1, xPos: 0, yPos: 0},
      {word: '身', font: 18, row: 3, col: 1, xPos: 0, yPos: 0},
      {word: '🐶', font: 18, row: 4, col: 1, xPos: 0, yPos: 0},
      {word: '的', font: 18, row: 5, col: 1, xPos: 0, yPos: 0},
      {word: '逆', font: 18, row: 6, col: 1, xPos: 0, yPos: 0},
      {word: '袭', font: 18, row: 7, col: 1, xPos: 0, yPos: 0}
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(' ---------- onLoad ----------')
    // console.log(new Date().getTime())
    var compatiblity = app.checkCompatibility()
    this.setData({bgClass: compatiblity?'home-background-high':'home-background-low'})
    // if(!compatiblity) this.showToast('兼容模式', 'none')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
    setTimeout(()=>this.setData({showNow: true}), 6000)
    // begin to draw
    var counter = 1
    var words = this.data.demoWords;
    var system = wx.getSystemInfoSync()
    var canvasWidth = system.windowWidth
    var canvasHeight= system.windowHeight*2/5
    var startX = canvasWidth/3
    var startY = 1
    var rectW = canvasWidth/3
    var rectH = canvasHeight-2
    var context = wx.createCanvasContext(this.data.canvas)

    var intvId = setInterval(() => {
      if(counter == words.length+1) return clearInterval(intvId)

      for(var item of words.slice(0, counter)) {

        if(!item.word) {
          context.clearRect(0, 0, canvasWidth, canvasHeight)
          continue
        }
        // draw white rectangle
        context.setLineWidth(2);
        context.setStrokeStyle("#FFFFFF");
        context.rect(startX, startY, rectW, rectH)
        context.stroke()

        item.xPos = startX + 20 + item.col * 50
        item.yPos = startY + 30 + item.row * 26
        // context.save()
        context.setFillStyle('#FFFFFF')
        context.setFontSize(item.font)
        context.fillText(item.word, item.xPos, item.yPos)
        // context.restore()// normal
      }
      // 这个不能放在循环里 !
      context.draw()

      counter ++
    }, 200)
  },


  drawAll () {
    // begin to draw
    var counter = 1
    var words = this.data.demoWords;
    var system = wx.getSystemInfoSync()
    var canvasWidth = system.windowWidth
    var canvasHeight= system.windowHeight*2/5
    var startX = canvasWidth/3
    var startY = 1
    var rectW = canvasWidth/3
    var rectH = canvasHeight-2
    var context = wx.createCanvasContext(this.data.canvas)

    for(var item of words.slice(14, words.length)) {

      // draw white rectangle
      context.setLineWidth(2);
      context.setStrokeStyle("#FFFFFF");
      context.rect(startX, startY, rectW, rectH)
      context.stroke()

      item.xPos = startX + 20 + item.col * 50
      item.yPos = startY + 30 + item.row * 26
      // context.save()
      context.setFillStyle('#FFFFFF')
      context.setFontSize(item.font)
      context.fillText(item.word, item.xPos, item.yPos)
      // context.restore()// normal
    }
    // 这个不能放在循环里 !
    context.draw()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },

  imgLoadErr (e) {
    this.showToast(e.detail.errMsg)
  },

  imgLoadSucs (e) {
    this.showToast(JSON.stringify(e.detail), 'none')
  },

  showToast (title, type) {
    wx.showToast({
      title: title,
      icon: type?type:'none',
      duration: 2000
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    console.log(' ---------- onPullDownRefresh ----------')
  },

  forwardDiscover: function () {
    wx.navigateTo({
      url: '../discover/discover'
    })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function () {
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
    this.setData({showModal: false})
    this.drawAll()
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal()
  },

  showAlert: function (title) {
    wx.showToast({
        title: title,
        icon: 'none',
        image:'../../images/icon_intro.png',
        duration: 2000
    });
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this

    if(!this.data.userName || !this.data.phone || !this.data.company
      || !this.data.position || !this.data.address) return this.showAlert('亲，请填写完整再提交!')

    this.hideModal()
    wx.showLoading({
      title: '发送中...',
    })

    wx.request({
      url: 'https://demos.kstartup.cn/180202/user',
      method: 'POST',
      data: {
         username: this.data.userName ,
         contact:  this.data.phone,
         company:  this.data.company,
         position: this.data.position,
         address:  this.data.address
      },
      header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      success: function(res) {
        wx.hideLoading()
        console.log(res)
        if(res.data.meta.code == '200'){
          that.showToast('发送成功!')
          setTimeout(function(){// 延迟跳转
            wx.navigateTo({
              url: '../discover/discover'
            })
          }, 1000)
        }else{
          wx.showToast({
              title: '啊呀出错啦!',
              icon: 'none',
              image:'../../images/icon_intro.png',
              duration: 2000
          });
        }
      }
    })
  },

  inputName: function (evt) {
    console.log(evt.detail.value)
    this.setData({userName: evt.detail.value})
  },
  inputPhone: function (evt) {
    console.log(evt.detail.value)
    this.setData({phone: evt.detail.value})
  },
  inputCompany: function (evt) {
    console.log(evt.detail.value)
    this.setData({company: evt.detail.value})
  },
  inputTitle: function (evt) {
    console.log(evt.detail.value)
    this.setData({position: evt.detail.value})
  },

  inputAddress: function (evt) {
    console.log(evt.detail.value)
    this.setData({address: evt.detail.value})
  },

  /**
   * 分享回调
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '发现实现',
      path: 'pages/index/index',
      // path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
