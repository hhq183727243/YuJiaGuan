function __args() {
	var __app = getApp();
	
	var setting = {},
		successCallback = null,
		defaultCallback = function(res){
			if (200 == res.statusCode){
				if (10000 == res.data.errorCode){
					if (typeof successCallback == 'function') successCallback(res.data);
				}else{
					if (res.data.msg != '用户未登录'){
						wx.showModal({
							content: res.data.msg,
							showCancel: false
						});
					}else{
						wx.showModal({
							content: '请先登录系统',
							showCancel: false
						});
						__app.globalData.loginStatus = false;
					}
				}
			}else{
				wx.showModal({
					content: '接口异常，请稍后再试',
					showCancel: false
				});

				wx.hideLoading();
			}
		};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];

		if (typeof arguments[1] === 'object') {
			setting.data = arguments[1];
			successCallback = arguments[2];
		} else {
			successCallback = arguments[1];
		}

		setting.success = defaultCallback;
	}

	if (setting.url.indexOf('http://') !== 0) {
		//setting.url = 'https://miniapp.juz580.com' + setting.url;
		setting.url = 'https://www.qujianshen.com/' + setting.url;
	}

	return setting;
}

function __json(method, setting) {
	var __app = getApp();

	setting.method = method;
	setting.header = __app.globalData.header2;

	setting.fail = function(res){
		wx.showModal({
			content: '网络异常，请稍后再试',
			showCancel: false
		})
	}	

	wx.request(setting);
}

module.exports = {
	getJSON: function () {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function () {
		__json('POST', __args.apply(this, arguments));
	},
	sendTemplate: function (formId, templateData, success, fail) {
		var app = getApp();
		this.getJSON({
			url: '/WxAppApi/sendTemplate',
			data: {
				rd_session: app.rd_session,
				form_id: formId,
				data: templateData,
			},
			success: success,   // errorcode==0时发送成功
			fail: fail
		});
	}
}

