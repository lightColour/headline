require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 5 ], {
    111: function(e, t, n) {
        n(112);
    },
    112: function(e, t, n) {
        "use strict";
        var a, o = (a = n(113)) && a.__esModule ? a : {
            default: a
        };
        Component({
            data: {
                video: null
            },
            properties: {
                videoId: {
                    type: String,
                    observer: function(e) {
                        var t = this;
                        e && (this.setData({
                            newId: e
                        }), (0, o.default)(e).then(function(e) {
                            e.data && t.setData({
                                video: e.data
                            });
                        }));
                    }
                }
            },
            methods: {
                handleLoadMoreTap: function() {
                    this.triggerEvent("expand", {});
                }
            }
        });
    },
    113: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = n(0);
        t.default = function(e) {
            return a.default("https://lens.zhihu.com/api/videos/" + e);
        };
    }
}, [ 111 ]);