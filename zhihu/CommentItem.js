require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 18 ], {
    103: function(t, e, n) {
        n(104);
    },
    104: function(t, e, n) {
        "use strict";
        var o, c = (o = n(0)) && o.__esModule ? o : {
            default: o
        }, i = n(3);
        Component({
            properties: {
                entryId: String,
                entryType: String,
                comment: Object
            },
            data: {},
            ready: function() {
                this.tryRegisterTime = 0;
            },
            methods: {
                handleVoteUpClick: function(t) {
                    var e = this, n = t.currentTarget, o = n.dataset.id, a = this.data.comment, r = a.voting, u = "https://www.zhihu.com/api/v4/comments/".concat(o, "/actions/like");
                    getApp().authRequired().then(function() {
                        return (0, c.default)(u, {
                            method: r ? "DELETE" : "POST"
                        }).then(function(t) {
                            a.vote_count = t.data.vote_count, a.voting = !a.voting, e.setData({
                                comment: a
                            });
                        });
                    }).catch(function(t) {
                        (0, i.createZhihuAccountOnce)(t).then(function() {
                            e.tryRegisterTime < 2 && e.handleVoteUpClick({
                                currentTarget: n
                            });
                        });
                    });
                }
            }
        });
    }
}, [ 103 ]);