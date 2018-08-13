require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 19 ], {
    101: function(t, n, e) {
        e(102);
    },
    102: function(t, n, e) {
        "use strict";
        var a, o = (a = e(0)) && a.__esModule ? a : {
            default: a
        };
        Component({
            properties: {
                entryId: String,
                entryType: String,
                commentCount: Number
            },
            data: {
                entryId: "",
                abstractComments: null
            },
            attached: function() {
                var t = this, n = this.data.entryId, e = "https://www.zhihu.com/api/v4/answers/".concat(n, "/abstract_comments?include=data[*].author,vote_count,voting");
                (0, o.default)(e).then(function(n) {
                    var e = n.data.data;
                    t.setData({
                        abstractComments: e
                    });
                });
            },
            methods: {
                onViewAllTap: function() {
                    this.triggerEvent("openCommentPanel", {});
                }
            }
        });
    }
}, [ 101 ]);