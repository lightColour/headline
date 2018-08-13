require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 28 ], {
    100: function(t, e, n) {
        "use strict";
        var a = n(10), r = {
            utm_source: "wechat_app",
            utm_content: "app_jumping"
        };
        Component({
            methods: {
                launchAppError: function(t) {
                    console.error("无法打开知乎，错误原因：", t), this.setData({
                        shown: !1
                    }), wx.showModal({
                        title: "无法打开知乎",
                        content: "请前往应用商店下载最新版知乎 App，发现更大的世界"
                    });
                },
                handleTap: function() {}
            },
            data: {
                parameter: JSON.stringify({
                    url: (0, a.addQuery)("zhihu://feed", r)
                }),
                shown: !1
            },
            ready: function() {
                var t = wx.getStorageSync("CAN_OPEN_APP");
                this.setData({
                    shown: t
                });
            },
            properties: {
                url: {
                    type: String,
                    value: "/",
                    observer: function(t) {
                        this.setData({
                            parameter: JSON.stringify({
                                url: (0, a.addQuery)("zhihu://".concat(t), r)
                            })
                        });
                    }
                }
            }
        });
    },
    99: function(t, e, n) {
        n(100);
    }
}, [ 99 ]);