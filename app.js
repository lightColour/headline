require("common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 31 ], {
    13: function(e, n, t) {
        t(44);
    },
    44: function(e, n, t) {
        "use strict";
        var a = t(4), o = t(3);
        App({
            globalData: {},
            onLaunch: function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).scene;
                this.globalData || (this.globalData = {}), this.globalData.scene = e, this.updateWechatScene(e, !0);
                var n = wx.getSystemInfoSync(), t = /iPhone X/.test(n.model) ? 20 : 0;
                Object.assign(this.globalData, {
                    systemInfo: n,
                    safeAreaInsetValue: t
                }), this.authRequired();
            },
            onShow: function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).scene;
                this.updateWechatScene(e);
            },
            updateWechatScene: function(e, n) {
                e === a.WechatScene.THIRD_PARTY_APP_SHARE_CARD ? wx.setStorageSync("CAN_OPEN_APP", 1) : n && e !== a.WechatScene.THIRD_PARTY_APP_SHARE_CARD ? wx.removeStorageSync("CAN_OPEN_APP") : e !== a.WechatScene.PULL_DOWN_PANEL && e !== a.WechatScene.LONG_PRESS_HOME && wx.removeStorageSync("CAN_OPEN_APP");
            },
            getUserInfo: function() {
                var e = this;
                if (this.globalData && this.globalData.userInfo) return this.globalData.userInfo;
                wx.getUserInfo({
                    lang: "zh_CN",
                    success: function(n) {
                        e.globalData.userInfo = n.userInfo;
                    }
                });
            },
            sessionRequired: function(e) {
                return function() {
                    wx.getStorageSync("sessionKey") ? wx.checkSession({
                        success: e,
                        fail: function() {
                            (0, o.getSessionKeyOnce)().then(e);
                        }
                    }) : (0, o.getSessionKeyOnce)().then(e);
                };
            },
            authRequired: function() {
                var e = this, n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                return new Promise(function(t, a) {
                    var s = function() {
                        n && (0, o.getSessionKeyOnce)().then(function() {
                            return t(e.authRequired(!1));
                        }, a);
                    };
                    e.sessionRequired(function() {
                        var e = (0, o.getAuthorizationStatus)(), n = e.token, c = e.status;
                        c === o.LOGIN_STATUS.LOGGED_IN && n ? t(n) : c === o.LOGIN_STATUS.NEED_REFRESH && n ? (0, 
                        o.getAuthorization)(o.LoginType.refresh).catch(s).then(t, a) : n && c !== o.LOGIN_STATUS.NOT_LOGGED_IN ? a(new Error("Reached unreachable: LOGIN_STATUS not processed: ".concat(c))) : (0, 
                        o.getAuthorization)(o.LoginType.login).then(t, a);
                    })();
                });
            }
        });
    }
}, [ 13 ]);