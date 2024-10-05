const app = getApp()
Component({
    properties: {
        searchValue: String
    },
    data: {
        navBarHeight: app.globalData.navBarHeight,
        menuRight: app.globalData.menuRight,
        menuTop: app.globalData.menuTop,
        menuHeight: app.globalData.menuHeight,
    },
    attached: function () {},
    methods: {},
    options: {
        styleIsolation: 'shared',
    }
})