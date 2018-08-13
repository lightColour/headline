require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 30 ], {
    107: function(e, o, t) {
        t(108);
    },
    108: function(e, o, t) {
        "use strict";
        var c, n = (c = t(2)) && c.__esModule ? c : {
            default: c
        };
        Component({
            properties: {
                recommand: Object
            },
            data: {},
            methods: {
                handleTap: function() {
                    var e = this.data.recommand, o = "/zhihu/".concat(e.content_type, "?id=").concat(e.url_token, "&source=").concat(e.source);
                    wx.reportAnalytics("hot_recommend_click", {
                        type: e.content_type,
                        source: e.source
                    }), (0, n.default)({
                        url: o
                    });
                }
            }
        });
    }
}, [ 107 ]);