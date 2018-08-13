require("../../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 23 ], {
    78: function(e, t, o) {
        o(79);
    },
    79: function(e, t) {
        var o = {
            notFound: {
                notice: "你似乎来到了没有知识存在的荒原…"
            },
            unauthorized: {
                notice: "当前内容暂时无法查看"
            }
        };
        Page({
            onLoad: function(e) {
                wx.setNavigationBarTitle({
                    title: e.title
                }), this.setData({
                    errorType: e.type,
                    error: o[e.type]
                });
            }
        });
    }
}, [ 78 ]);