//index.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
	data: {
		banner: ['banner_1.png', 'banner_0.png'],
		currentIndex: 0,
		labels: ['瑜伽理疗', '瑜伽塑形', '瑜伽表现'],
		
		demoList: [1,2,3,4]
	},
	//导航切换
	changeTab: function (event) {
		var index = event.currentTarget.dataset.index;
		this.setData({
			currentIndex: index
		});
	},
	//页面分享
	onShareAppMessage: function () {
		
	},
	onLoad: function (options) {

	}
})
