// pages/calendar/detail/detail.js
var app = getApp();
var ajax = require('../../../utils/server.js');

Page({
	data: {
		lessonId: '',//课时id
		roomNumber: '',//教室编号，由路由参数获取
		lessonEntity: {},
		placeEntity: {},
		subscribedUserList: [],
		isSubscribed: false//是否已预约
	},

	//获取课时详细信息
	getLessonDetail: function(id){
		ajax.getJSON('wx/LessonInfo/show?id=' + id, (res) => {
			this.setData({
				lessonEntity: res.data[0]
			});

			this.getPlaceDetail(res.data[0].place_info_id);
		});
	},

	//获取场所详细信息
	getPlaceDetail: function (id) {
		ajax.getJSON('wx/Places/info?id=' + id, (res) => {
			this.setData({
				placeEntity: res.data
			});
		});
	},

	//获取已预约的用户列表
	getSubscribedUserList: function(id){
		ajax.getJSON('wx/LessonInfo/subscriber?id=' + id, (res) => {
			this.setData({
				subscribedUserList: res.data
			});
		});
	},

	//判断时候预约课时
	funJudgeIsSubscribedLesson: function(){
		const openid = app.globalData.openid;

		ajax.getJSON('wx/LessonInfo/checkout?id=' + id + '&openid=' + openid, (res) => {
			this.setData({
				isSubscribed: res.data.status == 1
			});
		});
	},	

	bindSubscribeLesson: function(e){
		wx.showToast({
			title: '预约成功',
			icon: 'success'
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			roomNumber: options.roomNumber,
			lessonId: options.id
		});

		this.getLessonDetail(this.data.lessonId);
		this.getSubscribedUserList(this.data.lessonId);
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})