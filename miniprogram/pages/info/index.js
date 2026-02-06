const {
    genLocation
} = require('../../common/utils')

const {
    couple,
    publisher,
    isRemoved
} = getApp().globalData

Page({
    data: {
        // 新郎新娘联系方式
        // couple,

        // 以上变量都不用动，以下变量是需要手动修改的

        // 其它事项
        info: [
            {
                date: '3.27',
                title: '3月27日 · 预备日',
                list: [
                    '15:00-18:00 办理入住',
                    '18:00-21:00 预备宴-疍家渔排',
                    '21:00-22:00 婚房布置',
                ]
            },
            {
                date: '3.28',
                title: '3月28日 · 婚礼日',
                list: [
                    '11:00-13:00 婚礼主仪式',
                    '13:00-15:00 婚礼午宴-威斯汀酒店'
                ]
            },
            {
                date: '3.29',
                title: '3月29日 · 自由日',
                list: [
                    '00:00-23:59 Enjoy yourself!!!'
                ]
            }
        ],

        // 公告栏描述
        desc: `我们婚礼相关的重要信息都在这里啦，有问题欢迎随时联系我们 :)`,

        // 其余人员联系方式
        phone: [
            {
                name: '李睿渊（新郎）',
                number: '15010901968'
            },
            {
                name: '陈逸雨（新娘）',
                number: '18360809965'
            }
        ],

        // 定位信息（通过页面上的「选择位置并获取定位信息」按钮可以获取定位信息，发布前记得把按钮注释起来）
        location: genLocation([{
            name: '蓝湾绿城威斯汀度假酒店',
            address: '海南陵水县清水湾旅游度假区C区',
            latitude: 18.414602279663086,
            longitude: 109.953857421875
        }]),

        // PDF资料（在云开发的「存储」里上传文件，就可以得到fileID了）
        files: [{
            name: '凌晨接亲时间表',
            fileID: 'cloud://online-xxxxxxxxx'
        }, {
            name: '婚礼时间表',
            fileID: 'cloud://online-xxxxxxxxx'
        }],
    },

    // 呼叫
    call(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.dataset.phone
        })
    },

    // 打开定位
    openLocation(e) {
        const location = this.data.location[e.target.dataset.index]
        wx.openLocation({
            latitude: location.latitude,
            longitude: location.longitude,
            name: location.name,
            address: location.address
        })
    },

    // 仅用于获取定位信息，获取后会打印到控制台并写入到粘贴板，正式发布时记得注释起来
    chooseLocation() {
        wx.chooseLocation({
            success(res) {
                wx.setClipboardData({
                    data: JSON.stringify(res),
                    success() {
                        wx.showToast({
                            title: '已写入剪贴板'
                        })
                        console.log(res)
                    }
                })
            }
        })
    },

    // 下载并打开文件
    openFile(e) {
        if (isRemoved) {
            wx.showToast({
                title: '云开发下架咯~'
            })
        } else {
            wx.showLoading({
                title: '加载中'
            })
            const {
                fileID
            } = this.data.files[e.currentTarget.dataset.index]
            wx.cloud.downloadFile({
                fileID,
                success: res => {
                    wx.openDocument({
                        filePath: res.tempFilePath,
                        showMenu: true,
                        fileType: 'pdf',
                        success: () => {
                            wx.hideLoading()
                        }
                    })
                }
            })
        }
    },

    // 分享到会话
    onShareAppMessage() {
        return {
            title: 'C&L 婚礼公告',
            imageUrl: '../../images/infoPoster.png'
        }
    }
})