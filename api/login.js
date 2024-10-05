const request = require("../utils/request") //引入封装好的js文件
module.exports = {
	pushCode(code) {
		return request.get(`/wxcallback?code=${code}`)
	},
	// 临时
	createOrder(data) {
		return request.post(`/wx/order/addWxOrder`, data)
	}
}