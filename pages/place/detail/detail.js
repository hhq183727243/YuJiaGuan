// pages/place/detail/detail.js
var app = getApp();
var ajax = require('../../../utils/server.js');

Page({
	data: {
		id: '',
		isJoin: false,
		banner: ['banner_1.png', 'banner_0.png'],
		entity: {
			area: '',
			address: ''
		},
		isJoin: true
	},
	//展示团体课程
	bindShowCourse: function(e){

	},
	//是否加入某个场所
	funJudgeIsJoinPlace: function(id){
		let openid = app.globalData.openid;

		ajax.getJSON('/wx/Places/checkout?id=' + id + '&openid=' + openid, (res) => {
			this.setData({
				isJoin: res.data[0].status === 1
			});
		});
	},

	getPlaceDetail: function(id){
		ajax.getJSON('wx/Places/info?id=' + id, (res) => {
			this.setData({
				entity: res.data
				//roomList: res.data.room_info || []
			});
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//var isJoin = options.isJoin || 0;

		this.setData({
			id: options.id
			//isJoin: isJoin == '1'
		});

		this.getPlaceDetail(this.data.id);
		this.funJudgeIsJoinPlace(this.data.id);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})