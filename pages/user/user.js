//获取应用实例
var app = getApp()
Page({
    data: {  
        setScreenBrightness : false,
        loginStatus : false,
        userInfo : {}
    },
    //页面分享
    onShareAppMessage: function () {
        return {
            title: '迅康图片案例',
            desc: '分享交流医学图片病例，帮助医生进行教学、诊断和学术交流等活动',
            path: '/pages/index/index'
        }
    },
    onLogin : function(res){
        //调用登录接口
        var that = this;

        if ('getuserinfo' == res.type && res.detail.errMsg == 'getUserInfo:ok'){
            wx.setStorageSync('userInfo', res.detail.rawData);

            wx.showToast({
                icon: 'loading',
                title: '登录中...',
                mask: true,
                duration: 10000
            });
        }
        
        app.getIxkSessionId(function(){
            wx.hideToast();
            that.initUserInfo();
        });
    },
    initUserInfo : function(){
        var that = this;

		var userInfo = app.globalData['userInfo'];

        if(userInfo.portrait){
			userInfo.portrait = userInfo.portrait.indexOf('http') > -1 ? userInfo.portrait : (app.globalData.baseUrl + userInfo.portrait);
        }
        
        this.setData({
           userInfo : userInfo,
		   loginStatus: app.globalData['loginStatus']
        });
    },

    //调整屏幕亮度
    switch1Change : function(e){
        var val = e.detail.value;

        if(val){
            wx.setScreenBrightness({ value: 0 });
        }else{
            wx.setScreenBrightness({ value: 0.5 })
        }
    },

    onLoad: function (options) {
        if(wx.canIUse('setScreenBrightness')){
            this.setData({
                setScreenBrightness : true
            });
        }
    },
    onShow : function(){
        this.initUserInfo();
    }
})
