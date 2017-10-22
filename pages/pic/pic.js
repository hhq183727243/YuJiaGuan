// pages/pic/pic.js
Page({
	data: {
		initLabels: ['综合排序', '空间', '风格', '户型', '面积'],
		labels: ['综合排序','空间','风格','户型','面积'],
		conditionIndex: 0,
		conditions: [
			['综合排序','按收藏数','按浏览数'],
			['不限','客厅', '卧室', '餐厅', '厨房', '卫生间','阳台'],
			['不限','简约', '现代', '中式', '欧式', '美式', '田园', '简约', '现代', '中式', '欧式', '美式', '田园'],
			['不限','小户型', '一居', '二居', '三居', '四居', '复式'],
			['不限','50平', '60平', '70平', '80平', '90平', '100平']],
		show :false
	},

	toggleMenu: function(e){
		var index = e.currentTarget.dataset.index,
			show = !this.data.show;

		if (this.data.conditionIndex != index){
			show = true;
		}

		this.setData({
			conditionIndex: index,
			show: show
		});
	},

	//选择条件
	bindSelectCondition: function(e){
		var parentIdx = e.currentTarget.dataset.idx,
			childrenIdx = e.currentTarget.dataset.index,
			labels = this.data.labels;
		
		if (this.data.conditions[parentIdx][childrenIdx] != '不限'){
			labels[parentIdx] = this.data.conditions[parentIdx][childrenIdx];
		}else{
			labels[parentIdx] = this.data.initLabels[parentIdx];
		}

		this.setData({
			labels: labels,
			show: false
		});
	},

	//图片加载完成
	bindImageLoad: function(e){
		console.log(e.detail)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})