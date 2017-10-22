var app = getApp();
Page({
	data: {
		hasEmptyGrid: false,
		placeIndex: 0,
		places: [{ id: 11, name: 'haha' }, { id: 22, name: 'hehe' }],
		dayCheck: 0,
		weeks: [],
		allCourse: false,//是否查看某个场所的所有课程，true表示用户从团体课程进入，false表示用户从健康日历进入
		hours: 0, // 团课发布
		joinNum: 0, // 会员加入
		orderNum: 0 // 会员约课
	},
	onLoad(options) {
		let allCourse = !!options.allCourse;
		let self = this;
		const date = new Date();
		const cur_year = date.getFullYear();
		const cur_month = date.getMonth() + 1;
		const cur_date = date.getDate();
		const weeks = ['日', '一', '二', '三', '四', '五', '六'];
		this.calculateEmptyGrids(cur_year, cur_month);
		this.calculateDays(cur_year, cur_month);
		this.setData({
			allCourse,
			cur_year,
			cur_month,
			dayCheck: cur_date - 1,
			weeks
		});
		const now_date = cur_year + '-' + cur_month + '-' + cur_date;

		var openid = wx.getStorageSync('userInfo').openid;

		this.getInfo(now_date);
		this.getPlace('1');
	},

	// 根据日期显示指定信息
	getInfo: function (now_date) {
		const self = this;
		const openid = wx.getStorageSync('userInfo').openid;
		wx.request({
			url: app.GLOBAL.__ROOT__ + 'wx/LessonInfo/calendar',
			data: {
				openid,
				date: now_date
			},
			success: function (res) {
				var data = res.data;
				if (data.errorCode == 10000) {
					self.setData({
						hours: data.data.hours,
						joinNum: data.data.joinNum,
						orderNum: data.data.orderNum
					})
				}
			}
		});
	},

	// 获取通过审核的场所列表
	getPlace: function (type) {
		const self = this;
		const openid = wx.getStorageSync('userInfo').openid;
		wx.request({
			url: app.GLOBAL.__ROOT__ + 'wx/Places/entry',
			data: {
				openid,
				type
			},
			success: function (res) {
				var data = res.data;
				if (data.errorCode == 10000) {
					self.setData({
						places: data.data
					})
				}
			}
		});
	},

	// 选择场所
	bindPlace: function (e) {
		var id = e.currentTarget.dataset.id;
		this.setData({
			placeIndex: e.detail.value
		})
	},

	// 点击日期
	bindDate: function (e) {
		var idx = e.currentTarget.dataset.idx;
		const cur_year = this.data.cur_year;
		const cur_month = this.data.cur_month;
		// console.log(cur_year,cur_month,idx);
		const now_date = cur_year + '-' + cur_month + '-' + (idx - 0 + 1);
		this.setData({
			dayCheck: idx
		});
		this.getInfo(now_date)
	},

	// 跳转到团课发布
	bindGroup: function (e) {
		var date = this.data.cur_year + '-' + this.data.cur_month + '-' + (this.data.dayCheck + 1);
		var placeId = this.data.places[this.data.placeIndex].id;
		wx.navigateTo({
			url: '../course/group?date=' + date + '&placeId=' + placeId
		})
		// console.log('会员审核哈哈。。。。')
	},

	// 跳转到会员
	bindMember: function (e) {
		// wx.navigateTo({
		//   url: 'member'
		// })
		wx.showModal({
			title: '提示',
			content: '该功能暂未开启',
			showCancel: false
		})
		// console.log('会员审核哈哈。。。。')
	},

	// 跳转到会员约课
	bindsubscript: function (e) {
		wx.showModal({
			title: '提示',
			content: '该功能暂未开启',
			showCancel: false
		})
		// wx.navigateTo({
		//   url: '../course/subscript'
		// })
	},

	getThisMonthDays(year, month) {
		return new Date(year, month, 0).getDate();
	},
	getFirstDayOfWeek(year, month) {
		return new Date(Date.UTC(year, month - 1, 1)).getDay();
	},
	calculateEmptyGrids(year, month) {
		const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
		let empytGrids = [];
		if (firstDayOfWeek > 0) {
			for (let i = 0; i < firstDayOfWeek; i++) {
				empytGrids.push(i);
			}
			this.setData({
				hasEmptyGrid: true,
				empytGrids
			});
		} else {
			this.setData({
				hasEmptyGrid: false,
				empytGrids: []
			});
		}
	},
	calculateDays(year, month) {
		let days = [];

		const thisMonthDays = this.getThisMonthDays(year, month);

		for (let i = 1; i <= thisMonthDays; i++) {
			days.push(i);
		}

		this.setData({
			days
		});
	},
	handleCalendar(e) {
		const handle = e.currentTarget.dataset.handle;
		const cur_year = this.data.cur_year;
		const cur_month = this.data.cur_month;
		let newYear = cur_year;
		let newMonth = cur_month - 1;
		if (handle === 'prev') {
			if (newMonth < 1) {
				newYear = cur_year - 1;
				newMonth = 12;
			}
		} else {
			newMonth = cur_month + 1;
			if (newMonth > 12) {
				newYear = cur_year + 1;
				newMonth = 1;
			}
		}
		this.calculateDays(newYear, newMonth);
		this.calculateEmptyGrids(newYear, newMonth);
		this.setData({
			cur_year: newYear,
			cur_month: newMonth
		})

		const date = new Date();
		const cur_now_year = date.getFullYear();
		const cur_now_month = date.getMonth() + 1;
		const cur_now_date = date.getDate();
		if (cur_now_year == newYear && (cur_now_month == newMonth)) {
			this.setData({
				dayCheck: cur_now_date - 1,
			})
		} else {
			this.setData({
				dayCheck: - 1,
			})
		}
	},
	onShareAppMessage() {
		return {
			title: '小程序日历',
			desc: '日历哟日历哟日历哟日历哟',
			path: 'pages/calendar/calendar'
		}
	}
});