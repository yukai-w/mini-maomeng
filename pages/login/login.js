// pages/login/login.js
import {
  pushCode,
  createOrder
} from "../../api/login.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true
  },
  //是否选中
  checkedTap() {
    this.setData({
      "checked": !this.data.checked
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  getUserProfile() {
    // wx.getUserProfile({

    //   desc: '请求登录', // 必填，用户确认提供个人信息的用途
    //   success: (res) => {
    //     console.log('用户信息:', res.userInfo);
    //     // 你可以在这里将用户信息保存到服务器或本地存储
    //   },
    //   fail: (err) => {
    //     console.error('获取用户信息失败：', err);
    //   }
    // });

    wx.login({
      success: (res) => {
        if (res.code) {
          console.log('登录凭证 code:', res.code);
          // 你可以在这里将 code 发送给服务端，换取 openid 和 session_key
          pushCode(res.code).then(res => {
            console.log('登录回调', res.data)
            if (res.data && res.data.data) {
              const resData = res.data.data
              wx.setStorageSync('token', resData.token);
              wx.setStorageSync('openid', resData.openId);

              createOrder({
                "createTime": "",
                "openId": resData.openId,
                "orderAmount": 1,
                "orderDetails": "1",
                "orderNumber": "1",
                "orderPayType": "1",
                "orderStatus": 0,
                "outTime": "",
                "payTime": "",
                "userId": "112"
              }).then(orderRes => {
                console.log(orderRes.data);
                const orderData = orderRes.data.wxDto;
                wx.requestPayment({
                  timeStamp: orderData.timeStamp,
                  nonceStr: orderData.nonceStr,
                  package: orderData.prepayId,
                  signType: orderData.signType,
                  paySign: orderData.paySign,
                  success (res) {
                    console.log('成功',res)
                   },
                  fail (res) {
                    console.log('失败',res)
                   }
                })
              })
            }
          })
        } else {
          console.error('获取登录凭证失败：' + res.errMsg);
        }
      },
      fail: (err) => {
        console.error('wx.login 接口调用失败：', err);
      }
    });
  }

})