//app.js
App({
	globalData: {
		appid: 'wx734bb7f468f25060',
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
		loginStatus: false,
		openId: '',
		userInfo: {},
		ixkSessionId: '',
	},

	errorCallback: function (res) {
		var that = this;

		var tip = ('string' == typeof (res)) ? res : (res.data['data'] || '系统繁忙，请稍后再试...');

		wx.showModal({
			title: '提示',
			content: tip,
			showCancel: false,
			success: function (_res) {
				if (_res.confirm) {
					if ('用户未登录' == res.data['data'] || 'loginError' == res.data['data']) {
						that.data.loginStatus = false;
						that.data.userInfo = {};

						wx.switchTab({
							url: '/pages/user/user'
						})
					}
				}
			}
		});
	},

	testLogin: function () {
		var that = this;
		wx.request({
			url: this.data.baseUrl + '/testLogin',
			method: 'POST',
			data: {
				"userProfile.email": '1@163.com',
				"userProfile.password": '1'
			},
			header: this.data.header3,
			success: function (res) {
				console.log(res.data);
				that.data.loginStatus = true;
			}
		});
	},

	//获取ixkSessionId
	getIxkSessionId: function (callback) {
		var that = this;

		//获取ixkSessionId
		wx.request({
			url: that.data['baseUrl'] + '/app/user/getSessionId',
			success: function (res) {
				if (200 === res.data['status']) {
					that.data['ixkSessionId'] = res.data['data'];
					that.data.header['Cookie'] = 'JSESSIONID=' + that.data['ixkSessionId'];
					that.data.header2['Cookie'] = 'JSESSIONID=' + that.data['ixkSessionId'];
					that.data.header3['Cookie'] = 'JSESSIONID=' + that.data['ixkSessionId'];

					that.wechatLogin(callback);
				}
			}
		});
	},

	wechatLogin: function (ixkLoginCallback) {
		var that = this,
			userInfo = {};

		var ixkLogin = function (postData) {
			wx.request({
				url: that.data.baseUrl + 'app/user/thirdPartyAccountLogin',
				method: 'POST',
				data: postData,
				header: that.data.header3,
				success: function (res) {
					if (200 == res.data.status) {
						userInfo = res.data.data.result;

						that.data.openId = postData.openId;
						that.data.userInfo = userInfo;
						//that.data.loginStatus = true;

						if (null == userInfo.userCategory && 2 == userInfo.registeredMethod) {
							wx.redirectTo({
								url: '/pages/setUserCategory/setUserCategory'
							});
						} else if ('function' == typeof (ixkLoginCallback)) {
							that.data.loginStatus = true;

							ixkLoginCallback();
						}
					}
				}
			});
		};

		//获取access_token
		var loginCallback = function (code, userInfo) {
			wx.setStorageSync('userInfo', userInfo);

			ixkLogin({
				code: code,
				client: 'wechat_pictureCase',
				userInfoJson: JSON.stringify(userInfo),
				type: 1
			});
		};

		//调用登录接口
		wx.login({
			success: function (res) {
				var userInfo = wx.getStorageSync('userInfo'),
					code = res.code;

				if (userInfo) {
					loginCallback(code, userInfo);
				} else {
					wx.getUserInfo({
						success: function (res) {
							loginCallback(code, res.userInfo);
						}
					});
				}
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
	}
})