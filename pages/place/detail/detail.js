// pages/place/detail/detail.js
var app = getApp();

Page({
	data: {
		isJoin: false,
		banner: ['banner_1.png', 'banner_0.png'],
	},

	//展示团体课程
	bindShowCourse: function(e){

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var isJoin = options.isJoin || 0;

		this.setData({
			isJoin: isJoin == '1'
		});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})