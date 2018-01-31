//获取应用实例
var app = getApp()
var ajax = require('../../utils/server.js');

Page({
    data: {  
        loginStatus : false,
        userInfo : {},
		spendMoney: 0,
		joinedCount: 0
    },
	//获取自己消费的金额wx/Member/cost?openid=sss111
	getSpendMoney: function(){
		const openid = app.globalData.openid;
		
		ajax.getJSON('wx/Member/cost?openid=' + openid, (res) => {
			this.setData({
				spendMoney: res.data
			});
		});
	},
	//获取已加入场所数
	getJoinedCount: function () {
		const openid = app.globalData.openid;
		
		ajax.getJSON('wx/Places/amount?openid=' + openid, (res) => {
			this.setData({
				joinedCount: res.data
			});
		});
	},

    onLogin : function(res){
		//调用登录接口
		var that = this;

		if ('getuserinfo' == res.type) {
			if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
				wx.showModal({
					content: '登录失败，请重新授权登录',
					showCancel: false,
					confirmText: '知道了'
				})
			} else {
				wx.setStorageSync('userInfo', res.detail.rawData);
				wx.showToast({
					icon: 'loading',
					title: '登录中...',
					mask: true,
					duration: 10000
				});

				app.wechatLogin(function () {
					wx.hideToast();
					that.initUserInfo();
				});
			}
		}
    },
    initUserInfo : function(){
        var that = this;
		if (app.globalData.loginStatus){
			this.setData({
				userInfo: app.globalData.userInfo,
				loginStatus: app.globalData.loginStatus
			});

			this.getSpendMoney();
			this.getJoinedCount();
		}
    },
	//页面分享
	onShareAppMessage: function () {
		return {
			title: '瑜伽馆',
			desc: '悠扬的旋律、曼妙的身姿、清新的空气、放松的心情……这是瑜伽的魅力',
			path: '/pages/index/index'
		}
	},
    onLoad: function (options) {
		this.initUserInfo();
    }
})
