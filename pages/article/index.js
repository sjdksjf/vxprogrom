
var { article }=require('../../db/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      article:article
    })
  },

  /**
   * 点击获取文章详情页
   */
  tapArticleDetail: function (event) {
    var itemId=event.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: './article-detail/detail?itemId=' + itemId,
    })
  },



})