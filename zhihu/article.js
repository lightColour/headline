require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 13 ], {
    127: function(t, o, e) {
        e(128);
    },
    128: function(t, o, e) {
        "use strict";
        var i, n = (i = e(0)) && i.__esModule ? i : {
            default: i
        }, a = e(5);
        Page({
            data: {
                entryId: void 0,
                source: void 0,
                showCommentPanel: !1,
                isToolBarShown: !0
            },
            onLoad: function(t) {
                var o = this, e = t.id || (0, a.decodeScene)(t.scene).id, i = t.source, n = t.preview_video_id || null, r = !!n;
                e && (this.setData({
                    entryId: e,
                    source: i,
                    shouldShowVideoOnly: r,
                    videoId: n
                }), this.initialScrollTop = 0, (0, a.getShareImage)("article", e).then(function(t) {
                    return o.setData({
                        shareImage: t.friend
                    });
                }), this.fetchPost(e, "article").catch(function() {
                    var t;
                    return (t = console).warn.apply(t, arguments), o.fetchPost(e, "promotion").catch(function(t) {
                        var o = t.statusCode;
                        401 === o && wx.redirectTo({
                            url: "/pages/error/index?title=问题&type=unauthorized"
                        }), 404 === o && wx.redirectTo({
                            url: "/pages/error/index?title=问题&type=notFound"
                        });
                    });
                }).catch(console.warn));
            },
            onShow: function() {},
            fetchPost: function(t, o) {
                var e = this, i = [ "column", "content", "created", "image_height", "image_width", "voteup_count", "comment_count", "voting" ].join(","), a = "article" === o ? "https://www.zhihu.com/api/v4/articles/".concat(t, "?include=").concat(i) : "https://promotion.zhihu.com/api/promotions/".concat(t);
                return (0, n.default)(a).then(function(t) {
                    var i = t.data;
                    e.setData({
                        post: i,
                        isPromotion: "promotion" === o
                    });
                }).catch(function(t) {
                    if (401 !== t.statusCode) throw t;
                    wx.redirectTo({
                        url: "/pages/error/index?title=问题&type=unauthorized"
                    });
                });
            },
            onShareAppMessage: function() {
                return (0, a.getShareAppMessage)("article", this.data.entryId, {
                    imageUrl: this.data.shareImage
                });
            },
            openCommentPanel: function() {
                this.setData({
                    showCommentPanel: !0
                });
            },
            closeCommentPanel: function() {
                this.setData({
                    showCommentPanel: !1
                });
            },
            onPageScroll: function(t) {
                var o = t.scrollTop, e = this.data.isToolBarShown;
                this.initialScrollTop || (this.initialScrollTop = o), o - this.initialScrollTop < -100 && (this.initialScrollTop = o, 
                e || this.setData({
                    isToolBarShown: !0
                })), o - this.initialScrollTop > 100 && (this.initialScrollTop = o, e && this.setData({
                    isToolBarShown: !1
                }));
            },
            onReachBottom: function() {
                this.data.isToolBarShown || this.setData({
                    isToolBarShown: !0
                });
            },
            handleVideoLoadMore: function() {
                this.setData({
                    shouldShowVideoOnly: !1
                });
            }
        });
    }
}, [ 127 ]);