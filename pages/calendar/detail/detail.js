// pages/calendar/detail/detail.js
Page({
	data: {
		subscribed: false//是否已预约
	},

	bindSubscribe: function(e){
		wx.showToast({
			title: '预约成功',
			icon: 'success'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let subscribed = options.subscribed;

		this.setData({
			subscribed: subscribed == '1'
		});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})