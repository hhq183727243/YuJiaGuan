//index.js
var app = getApp()
var ajax = require('../../utils/server.js');

Page({
	data: {
		banner: ['banner_1.png', 'banner_0.png'],
		currentIndex: 0,
		whichPage: 1,
		placeList: []
	},
	//导航切换
	changeTab: function (event) {
		var index = event.currentTarget.dataset.index;
		this.setData({
			currentIndex: index
		});
	},

	getPlaceList: function(whichPage){
		ajax.getJSON('wx/Member/entry?openid=' + app.globalData.openid + '&status=1',(res) => {
			wx.stopPullDownRefresh();
			this.setData({
				placeList: res.data || []
			});
		})
	},
	onPullDownRefresh: function () {
		this.getPlaceList(1);
	},

	//页面分享
	onShareAppMessage: function () {
		
	},
	onLoad: function (options) {
		this.getPlaceList(1);
	}
})
