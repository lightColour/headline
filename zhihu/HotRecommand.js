require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 16 ], {
    105: function(e, n, o) {
        o(106);
    },
    106: function(e, n) {
        Component({
            properties: {
                recommands: Array,
                loading: Boolean,
                end: Boolean
            },
            data: {},
            methods: {
                handleTap: function() {
                    wx.reLaunch ? wx.reLaunch({
                        url: "/pages/index/index"
                    }) : wx.redirectTo({
                        url: "/pages/index/index"
                    });
                }
            }
        });
    }
}, [ 105 ]);