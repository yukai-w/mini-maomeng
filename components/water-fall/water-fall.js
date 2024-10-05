Component({
  options: {
    multipleSlots: true
  },

  properties: {
    value: {
      type: Array,
      value: []
    },
    defaultSlot: {
      type: Boolean,
      value: true
    },
  },

  data: {
    leftList: [],
    rightList: [],
    tempList: [],
    oldTempList: [],
  },

  lifetimes: {
    attached() {
      this.data.tempList = this.cloneData(this.data.value);
      this.splitData();
    },
    detached() {
      // 销毁前的清理操作
    }
  },

  observers: {
    'value': function (nVal) {
      this.setData({
        oldTempList: this.cloneData(nVal),
        tempList: this.findDifferentItems(nVal, this.data.oldTempList)
      });
      this.splitData();
    }
  },

  methods: {
    async splitData() {
      if (!this.data.tempList.length) return;
      let leftRect = await this.getRect('#left-column');
      let rightRect = await this.getRect('#right-column');
      let item = this.data.tempList[0];
      if (!item) return;
      if (leftRect.height <= rightRect.height) {
        let arr = this.data.leftList.concat(item)
        this.setData({
          leftList: arr
        });
      } else {
        let arr = this.data.rightList.concat(item)
        this.setData({
          rightList: arr
        });
      }
      this.data.tempList.splice(0, 1);
      if (this.data.tempList.length) {
        this.splitData();
        return;
      }
    },

    getRect(selector) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        query.select(selector).boundingClientRect();
        query.exec(function (res) {
          if (res && res[0]) {
            resolve(res[0]);
          } else {
            reject('获取节点信息失败');
          }
        });
      });
    },

    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },

    clear() {
      this.setData({
        leftList: [],
        rightList: []
      });
    },

    /* 数组过滤 */
    findDifferentItems(array1, array2) {
      const uniqueArray = [];

      // 遍历第一个数组
      for (let i = 0; i < array1.length; i++) {
        let found = false;

        // 检查第二个数组中是否存在相同的项
        for (let j = 0; j < array2.length; j++) {
          if (array1[i].id === array2[j].id) {
            found = true;
            break;
          }
        }

        // 如果第二个数组中不存在相同的项，则将其添加到结果数组中
        if (!found) {
          uniqueArray.push(array1[i]);
        }
      }

      return uniqueArray;
    }
  }
});