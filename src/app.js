/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat')
const Promise = require('./utils/bluebird')

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate',
    version: '0.1.0',
    userInfo: null,
    discoverInput: '小白鼠的使命',
    implementInpt: '大白兔的人生',
    platform: '',
    system: ''
  },

  // 不是只能定义`data`，别的也可以
  other: 'other variables',

  /** v
   * 获取用户信息
   * @return {Promise} 包含获取用户信息的`Promise`
   */
  getUserInfo () {
    return new Promise((resolve, reject) => {
      if (this.data.userInfo) return reject(this.data.userInfo)
      wechat.login()
        .then(() => wechat.getUserInfo())
        .then(res => res.userInfo)
        .then(info => (this.data.userInfo = info))
        .then(info => resolve(info))
        .catch(error => console.error('failed to get user info, error: ' + error))
    })
  },

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    console.log(' ========== Application is launched ========== ')
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        console.log(res.version) // wechat version
        // console.log(res.platform) // OS type
        that.data.platform = res.platform
        // console.log(res.system); // OS version
        that.data.system = res.system

        // console.log(new Date().getTime())
        // var checkResult = that.checkCompatibility()
        // console.log('COMPATIBILITY: '+ checkResult);
      }
    })
  },

  checkCompatibility () {
    var system = this.data.system
    var os = system.split(' ')[0]
    var version = system.split(' ')[1]
    // console.log(os)
    // console.log(version)
    if(os.toLowerCase()=='ios' && Number(version.split('.')[0])<11) return false

    return true
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})
