//app.js
App({
	globalData: {
		//appid: 'wx734bb7f468f25060',
		baseUrl: 'https://www.topmedpost.com/',
		header: {
			'Content-Type': 'application/json',
			'Cookie': ''
		},
		header2: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Cookie': ''
		},
		header3: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Cookie': '',
			'X-Requested-With': 'XMLHttpRequest'
		},
		loginStatus: true,
		openid: 'xxxwww',
		userInfo: {}
	},

	//获取ixkSessionId
	getSessionId: function (callback) {
		var that = this;

		//获取ixkSessionId
		wx.request({
			url: that.data['baseUrl'] + '/app/user/getSessionId',
			success: function (res) {
				
			}
		});
	},
	//获取openid
	wechatLogin: function (callback) {
		var that = this;
		
		//调用登录接口
		wx.login({
			success: function (res) {
				wx.getUserInfo({
					withCredentials: true,
					success: function (res) {
						that.globalData.userInfo = res.userInfo;
						wx.setStorageSync('userInfo', res.userInfo);

						if(typeof(callback) === 'function'){
							callback();
						}
					}
				});
			}
		});
	},

	//当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	onLaunch: function () {
		var that = this;

		// 设备信息
		wx.getSystemInfo({
			success: function (res) {
				that.screenWidth = res.windowWidth;
				that.pixelRatio = res.pixelRatio;
			}
		});

		this.wechatLogin();
	}
})