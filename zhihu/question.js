require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 4 ], {
    116: function(t, n, e) {
        e(117);
    },
    117: function(t, n, e) {
        "use strict";
        var a = e(2), i = s(e(0)), o = s(e(118)), r = e(5);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function u() {
            return (u = Object.assign || function(t) {
                for (var n = 1; n < arguments.length; n++) {
                    var e = arguments[n];
                    for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                }
                return t;
            }).apply(this, arguments);
        }
        Page({
            data: {
                entryId: void 0,
                source: void 0,
                sortBy: "default",
                openType: "navigate"
            },
            onLoad: function(t) {
                var n = this, e = t.id || (0, r.decodeScene)(t.scene).id, o = t.source;
                if (e) {
                    this.setData({
                        entryId: e,
                        source: o,
                        openType: (0, a.getOpenType)()
                    }), (0, r.getShareImage)("question", e).then(function(t) {
                        return n.setData({
                            shareImage: t.friend
                        });
                    });
                    var s = "https://www.zhihu.com/api/v4/questions/".concat(e, "?include=").concat("excerpt,detail,thumbnail_info,mute_info");
                    (0, i.default)(s).then(function(t) {
                        var e = t.data;
                        console.info("question", t), e.mute_info && "" !== e.mute_info.type ? wx.redirectTo({
                            url: "/pages/error/index?title=问题&type=unauthorized"
                        }) : n.setData({
                            question: e
                        });
                    }).catch(function(t) {
                        var n = t.statusCode;
                        401 === n && wx.redirectTo({
                            url: "/pages/error/index?title=问题&type=unauthorized"
                        }), 404 === n && wx.redirectTo({
                            url: "/pages/error/index?title=问题&type=notFound"
                        });
                    }), this.initAnswers();
                }
            },
            onShow: function() {},
            initAnswers: function() {
                var t = this, n = this.data, e = n.entryId, a = n.sortBy, o = [ "data[*].voteup_count", "excerpt", "thumbnail_info.thumbnails[*].data_url" ].join(","), r = "https://www.zhihu.com/api/v4/questions/".concat(e, "/answers?include=").concat(o, "&sort_by=").concat(a);
                (0, i.default)(r).then(function(n) {
                    var e = n.data.data, a = n.data.paging;
                    console.info("answers", n), t.setData({
                        answers: e,
                        paging: a
                    });
                });
            },
            handleAnswerItemClick: function() {},
            onReachBottom: function() {
                var t = this;
                if (!this.data.isBottomLoading && !0 !== this.data.paging.is_end) {
                    this.setData({
                        isBottomLoading: !0
                    });
                    var n = (0, o.default)(this.data.paging.next);
                    (0, i.default)(n).then(function(n) {
                        var e, a = n.data;
                        t.setData({
                            isBottomLoading: !1,
                            answers: (e = t.data.answers.concat(a.data), function(t, n) {
                                var e = t.map(n);
                                return t.filter(function(t, n) {
                                    return e.indexOf(e[n]) === n;
                                });
                            }(e, function(t) {
                                return t.id;
                            })),
                            paging: u({}, t.data.paging, {
                                is_end: a.paging.is_end,
                                next: a.paging.next
                            })
                        });
                    }).catch(function(n) {
                        console.info("catch", n), t.setData({
                            isBottomLoading: !1
                        });
                    });
                }
            },
            onShareAppMessage: function() {
                return (0, r.getShareAppMessage)("question", this.data.entryId, {
                    imageUrl: this.data.shareImage
                });
            },
            handleSwitch: function() {
                var t = this, n = "default" === this.data.sortBy ? "created" : "default";
                this.setData({
                    sortBy: n
                }, function() {
                    t.initAnswers();
                });
            },
            handleShowOpenInApp: function() {},
            handleOpenInApp: function() {}
        });
    },
    118: function(t, n, e) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        n.default = function(t) {
            return t.replace(/^http:/, "https:");
        };
    }
}, [ 116 ]);