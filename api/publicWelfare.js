const request = require("../utils/request") //引入封装好的js文件
module.exports = {
	getPublicWelfareListApi() {
		return request.get("/officialWebsite/charityProject")
	}
}