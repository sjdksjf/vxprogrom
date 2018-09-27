var { scoreToStar, getMovieData }=require('../../utils/util.js');
var app = getApp();
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
    var _this = this;
    var baseUrl=app.G_DATA.baseUrl;
    var inTheaters = baseUrl + 'v2/movie/in_theaters?start=0&count=3';
    getMovieData(inTheaters,function(movie){
      // console.log(movie)
      _this.setData({
        inTheatersData: movie,
        inTheatersTag: "正在热播",
        inTheatersTagType:'inTheaters'
      })
    });
    var comingSoon = baseUrl + 'v2/movie/coming_soon?start=0&count=3';
    getMovieData(comingSoon,function (movie) {
      _this.setData({
        comingSoonData: movie,
        comingSoonTag: "即将上映",
        comingSoonTagType: 'comingSoon'
      })
    });
    var top = baseUrl + 'v2/movie/top250?start=0&count=3';
    getMovieData(top,function (movie) {
      _this.setData({
        topData: movie,
        topTag: "豆瓣top10",
        topTagType: 'top'
      })
    })
  },
  moreTap:function(e){
    var tagType = e.currentTarget.dataset.tap;
    wx.navigateTo({
      url: './movie-more/movie-more?tagType='+tagType,
    })
  },

  
})