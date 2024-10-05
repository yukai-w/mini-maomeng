// pages/home/home.js
const app = getApp()
import {
  getBannerListApi,
  getThirteenCatsListApi,
  getNewListApi
} from "../../api/home.js"
import {
  getPublicWelfareListApi
} from "../../api/publicWelfare"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeSearchValue: "",
    bannerList: [], // banner列表
    publicWelfareList: [], // 公益项目列表
    thirteenCatsList: [], // 十三猫列表
    newList: [], //最新资讯列表
    baseUrl: "",
    background: [1, 2, 3, 4, 5, 6],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    duration: 500
  },
  // 获取banner列表
  getBannerList() {
    getBannerListApi().then((res) => {
      this.setData({
        bannerList: res.data.rows
      })
    }).catch(err => {
      console.log('err', err)
    })
  },
  // 获取公益项目列表
  getPublicWelfareList() {
    getPublicWelfareListApi().then((res) => {
      this.setData({
        publicWelfareList: res.data.rows,
      });
    }).catch(err => {
      console.log('err', err)
    })
  },
  // 获取十三猫列表
  getThirteenCatsList() {
    getThirteenCatsListApi().then(res => {
      this.setData({
        thirteenCatsList: res.data.rows,
      });
    }).catch(err => {
      console.log('err', err)
    })
  },
  // 获取最新资讯
  getNewList() {
    getNewListApi().then(res => {
      const newList = res.data.rows
      this.setData({
        newList: newList
      })
    }).catch(err => {
      console.log('err', err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      baseUrl: app.globalData.baseUrl
    })
    this.getBannerList()
    this.getPublicWelfareList()
    this.getThirteenCatsList()
    this.getNewList()
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

  }
})