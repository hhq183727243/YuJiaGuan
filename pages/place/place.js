// pages/place/place.js
var sliderWidth = 84;
var app = getApp();
var ajax = require('../../utils/server.js');

Page({
	data: {
		tabs: ["商业场所", "非商业场所"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		placeList_1: [],
		placeList_2: [],
		hasMoreData: false,
		whichPage: 1
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
		ajax.postJSON('wx/Places/membership',{
			openid: app.globalData.openid,
			id: e.currentTarget.dataset.id
		}, (res) => {
			if (_type == 1) {
				this.setData({
					placeList_1: res.data || []
				});
			} else {
				this.setData({
					placeList_2: res.data || []
				});
			}
		});

		wx.showToast({
			title: '申请成功',
			icon: 'success'
		});
	},

	getPlaceList(whichPage,_type){
		let openid = app.globalData.openid;

		//type:1商业场所 / 2非商业场所
		ajax.getJSON('wx/Member/entry?openid=' + openid + '&status=2&type=' + _type, (res) => {
			wx.stopPullDownRefresh();
			
			if(_type == 1){
				this.setData({
					placeList_1: res.data || []
				});
			}else{
				this.setData({
					placeList_2: res.data || []
				});
			}
		});
	},

	onPullDownRefresh: function () {
		this.getPlaceList(1, 1);
		this.getPlaceList(1, 2);
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

		this.getPlaceList(1, 1);
		this.getPlaceList(1, 2);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})