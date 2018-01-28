// 获取全局应用程序实例对象
// const app = getApp()


// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'discover',
    discoverWords: [
      '海外商机','市场新趋势','瓶颈突破点','运营痛点','行业热点','客户需求',
      '竞争对手','自身限制','风险','风口','新饭店','芳华已逝','Mr.意中人','抢红包攻略',
      '蛙儿子不好养','职场真谛','最强王者','初心不改','包治百病','小确幸'
    ],
    implementWords: [
      '国企走出去','利润翻一翻','收益增长','业务规模扩大','行业领军','一站式服务',
      '强强联手','企业转型','力挽狂澜','一击即中','体重增加5个点','油腻中年','脱单','手气最佳',
      '佛系蜕变','升职加薪','一起吃鸡','最初的梦想','平安喜乐','万事顺意'
    ]
  },

  drawWords: [
    {
      seqence:   1,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗1',
      xPos:      20,
      yPos:      60,
      shadow:    false
    },
    {
      seqence:   2,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗2',
      xPos:      100,
      yPos:      120,
      shadow:    false
    },
    {
      seqence:   3,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗3',
      xPos:      250,
      yPos:      40,
      shadow:    false
    },
    {
      seqence:   4,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗4',
      xPos:      10,
      yPos:      160,
      shadow:    false
    },
    {
      seqence:   5,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗5',
      xPos:      200,
      yPos:      140,
      shadow:    false
    },
    {
      seqence:   6,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗6',
      xPos:      250,
      yPos:      120,
      shadow:    false
    },
    {
      seqence:   7,
      fillSytle: '#FFFFFF',
      fontSize:  30,
      rotate:    0,
      text:      '您的发现?',
      xPos:      100,
      yPos:      220,
      shadow:    true,
      shadowColor:'#666666'
    },
    {
      seqence:   8,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗8',
      xPos:      30,
      yPos:      270,
      shadow:    false
    },
    {
      seqence:   9,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/18,
      text:      '中文可以le吗9',
      xPos:      100,
      yPos:      300,
      shadow:    false
    },
    {
      seqence:   10,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/18,
      text:      '中文可以le吗10',
      xPos:      270,
      yPos:      250,
      shadow:    false
    },
    {
      seqence:   11,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    -Math.PI/36,
      text:      '中文可以le吗11',
      xPos:      0,
      yPos:      340,
      shadow:    false
    },
    {
      seqence:   12,
      fillSytle: '#FFFFFF',
      fontSize:  18,
      rotate:    Math.PI/36,
      text:      '中文可以le吗12',
      xPos:      160,
      yPos:      340,
      shadow:    false
    },
    {
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

  /**
   * 输入自定义关键字
   * @param  {[type]} evt [description]
   * @return {[type]}     [description]
   */
  inputKeyWord (evt) {
    // console.log(evt.detail.value)
    this.drawWords.forEach(it => it.seqence==7?it.text = evt.detail.value:0)
    // redraw
    var context = wx.createCanvasContext('firstCanvas')
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
  onLoad () {
    // TODO: onLoad
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // 随机选择关键字
    var randomDiscover = this.data.discoverWords.sort(function(){return Math.random()-0.5})
    // 初始化显示的关键字
    for(var i in this.drawWords){
      if(this.drawWords[i].shadow) continue
      this.drawWords[i].text = randomDiscover[i]
    }
    console.log(this.drawWords);

    var context = wx.createCanvasContext('firstCanvas')
    var counter = 1
    var reorderedArray = this.drawWords.sort(function(){return Math.random()-0.5})
    // save the reordered array!
    this.drawWords = reorderedArray

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
