require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 15 ], {
    109: function(t, e, n) {
        n(110);
    },
    110: function(t, e, n) {
        "use strict";
        var r, o = (r = n(0)) && r.__esModule ? r : {
            default: r
        }, a = n(3);
        function i(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var n = [], r = !0, o = !1, a = void 0;
                try {
                    for (var i, u = t[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), 
                    !e || n.length !== e); r = !0) ;
                } catch (t) {
                    o = !0, a = t;
                } finally {
                    try {
                        r || null == u.return || u.return();
                    } finally {
                        if (o) throw a;
                    }
                }
                return n;
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
        Component({
            properties: {
                entryId: String,
                commentCount: Number,
                voteupCount: Number,
                voting: Number,
                isToolBarShown: Boolean,
                type: String
            },
            data: {
                entity_id: "",
                current_page: "",
                isToolBarShown: !0
            },
            ready: function() {
                var t = getCurrentPages(), e = t[t.length - 1] || {}, n = e.route, r = e.options, o = i(n.match(/\/(\w+)$/) || [], 2), a = (o[0], 
                o[1]), u = r.id, c = "iPhone X" === getApp().globalData.systemInfo.model;
                this.setData({
                    id: u,
                    pageName: a,
                    isIphoneX: c
                }), this.tryRegisterTime = 0;
            },
            methods: {
                handleShareButtonTap: function() {
                    var t = this.data, e = t.id, n = t.pageName;
                    wx.reportAnalytics("share_to_friend", {
                        entity_id: e,
                        current_page: n
                    });
                },
                handleAnswerVote: function(t) {
                    var e = this, n = t.currentTarget, r = n.dataset.voteType, i = this.data, u = i.entryId, c = i.voting, s = "https://www.zhihu.com/api/v4/answers/".concat(u, "/voters"), h = {
                        "-1": "down",
                        0: "neutral",
                        1: "up"
                    }, p = (c = "up" === r ? 1 !== c ? 1 : 0 : -1 !== c ? -1 : 0).toString();
                    getApp().authRequired().then(function() {
                        return (0, o.default)(s, {
                            method: "POST",
                            data: {
                                type: h[p]
                            }
                        }).then(function(t) {
                            var n = t.data, r = n.voteup_count, o = n.voting;
                            e.setData({
                                voteupCount: r,
                                voting: o
                            }), -1 === o && wx.showToast({
                                title: "已反对",
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    }).catch(function(t) {
                        e.tryRegisterTime++, (0, a.createZhihuAccountOnce)(t).then(function() {
                            e.tryRegisterTime++ < 2 && e.handleAnswerVote({
                                currentTarget: n
                            });
                        });
                    });
                },
                handleArticleVote: function(t) {
                    var e = this, n = t.currentTarget, r = (n.dataset.voteType, this.data), i = r.entryId, u = r.voting, c = "https://www.zhihu.com/api/v4/articles/".concat(i, "/likers");
                    getApp().authRequired().then(function() {
                        return (0, o.default)(c, {
                            method: u ? "DELETE" : "POST"
                        }).then(function(t) {
                            var n = t.data.likes_count;
                            e.setData({
                                voteupCount: n,
                                voting: u ? 0 : 1
                            });
                        });
                    }).catch(function(t) {
                        e.tryRegisterTime++, (0, a.createZhihuAccountOnce)(t).then(function() {
                            e.tryRegisterTime++ < 2 && e.handleAnswerVote({
                                currentTarget: n
                            });
                        });
                    });
                },
                onCommentTap: function() {
                    this.data.type;
                    this.triggerEvent("openCommentPanel", {});
                }
            }
        });
    }
}, [ 109 ]);