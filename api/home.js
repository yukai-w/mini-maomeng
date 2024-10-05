const request = require("../utils/request") //引入封装好的js文件
module.exports = {
	getBannerListApi() {
		return request.get("/officialWebsite/banner")
	},
	getThirteenCatsListApi() {
		return request.get("/officialWebsite/getThirteenCats")
	},
	// 获取最新资讯
	getNewListApi() {
		return request.get("/officialWebsite/getDynamic")
	}
}