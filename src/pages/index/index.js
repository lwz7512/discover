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
    title:'',
    address:'',
    bgClass: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(' ---------- onLoad ----------')
    // console.log(new Date().getTime())
    var compatiblity = app.checkCompatibility()
    this.setData({bgClass: compatiblity?'home-background-high':'home-background-low'})
    if(!compatiblity) this.showToast('兼容模式', 'none')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
    // console.log(new Date().getTime())
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
      icon: type,
      // image:'../../images/icon_intro.png',
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
    this.setData({
      showModal: false
    })
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal()
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal()
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
    this.setData({title: evt.detail.value})
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
