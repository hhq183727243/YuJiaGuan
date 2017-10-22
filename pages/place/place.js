// pages/place/place.js
var sliderWidth = 84;
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabs: ["商业场所", "非商业场所"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		list1: 'aaaaa'
	},

	tabClick: function(e){
		console.log(e);
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id
		});


	},

	//申请加入
	bindApplyJoin: function(e){
		wx.showToast({
			title: '申请成功',
			icon: 'success'
		});


	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var windowWidth = app.screenWidth;

		this.setData({
			sliderLeft: (windowWidth / this.data.tabs.length - sliderWidth) / 2,
			sliderOffset: windowWidth / this.data.tabs.length * this.data.activeIndex
		});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})