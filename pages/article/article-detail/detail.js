var { article } = require('../../../db/db.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAudioPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置文章详细内容
    // console.log(options.itemId);
    this.setData(article[options.itemId]);


    var collection=wx.getStorageSync('userCollection');
    var currentCollection=false;
    if(collection){
      currentCollection = !!collection[this.data.itemId];
    }else{
      var data={};
      data[this.data.itemId]=false;
      wx.setStorageSync('userCollection', data);
    }
    this.setData({currentCollection: currentCollection});

    //监听音频播放
    var _this=this;
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function(){
      _this.setData({
        isAudioPlay: true
      })
    })
    backgroundAudioManager.onPause(function(){
      _this.setData({
        isAudioPlay: false
      })
    })
    
  },
  tapCollection:function(){
    var collection = wx.getStorageSync('userCollection');
    var currentCollection=collection[this.data.itemId];
    //改变storage里面的值
    collection[this.data.itemId]=!currentCollection;
    wx.setStorageSync('userCollection', collection)
   //改变页面图片显示
   this.setData({
     currentCollection:!currentCollection
   })
   wx.showToast({
     title: currentCollection ? '取消成功' : '收藏成功',
   })
  },
  tapShare:function(){
    var itemList = ['分享到QQ', '分享到微信', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功',
        })
      }
    })
  },
  tapMusic:function(){
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    var isAudioPlay = !!this.data.isAudioPlay;
    if (isAudioPlay){
      backgroundAudioManager.pause();
      this.setData({
        isAudioPlay:false
      })
    }else{
      backgroundAudioManager.title = this.data.music.title;
      backgroundAudioManager.coverImgUrl = this.data.music.image;
      backgroundAudioManager.src = this.data.music.url;
      backgroundAudioManager.play();
      this.setData({
        isAudioPlay: true
      })
    }
   
  }


 
})