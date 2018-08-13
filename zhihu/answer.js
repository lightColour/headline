require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 14 ], {
    80: function(t, e, a) {
        a(81);
    },
    81: function(t, e, a) {
        "use strict";
        var n = s(a(2)), o = s(a(0)), i = a(5);
        function s(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        Page({
            data: {
                entryId: void 0,
                source: void 0,
                showTitleOnNavigationBar: !1,
                isToolBarShown: !0,
                hasNext: !0,
                loading: !1,
                pageNum: 1,
                recommands: [],
                recommandsSource: []
            },
            onLoad: function(t) {
                var e = this, a = t.id || (0, i.decodeScene)(t.scene).id, n = t.source, o = t.preview_video_id || null, s = !!o;
                a && (this.setData({
                    entryId: a,
                    source: n,
                    shouldShowVideoOnly: s,
                    videoId: o
                }), this.initialScrollTop = 0, (0, i.getShareImage)("answer", a).then(function(t) {
                    return e.setData({
                        shareImage: t.friend
                    });
                }), Promise.all([ this.fetchAnswer(a), this.fetchRecommand() ]));
            },
            onShow: function() {},
            fetchAnswer: function(t) {
                var e = this, a = [ "excerpt,", "content,", "created_time,", "updated_time,", "comment_count,", "voteup_count,", "reshipment_settings,", "relationship.voting;", "author.badge[*].topics;" ].join(""), n = "https://www.zhihu.com/api/v4/answers/".concat(t, "?include=").concat(encodeURIComponent(a));
                (0, o.default)(n).then(function(t) {
                    var a = t.data;
                    e.setData({
                        answer: a
                    });
                    var n = t.data.question.id;
                    return (0, o.default)("https://www.zhihu.com/api/v4/questions/".concat(n, "?include=answer_count"));
                }).then(function(t) {
                    wx.createSelectorQuery().select(".title").boundingClientRect(function(a) {
                        var n = a.height;
                        e.setData({
                            questionAreaHeight: n,
                            answerCount: t.data.answer_count
                        });
                    }).exec();
                }).catch(function(t) {
                    var e = t.statusCode;
                    401 === e && wx.redirectTo({
                        url: "/pages/error/index?title=回答&type=unauthorized"
                    }), 404 === e && wx.redirectTo({
                        url: "/pages/error/index?title=回答&type=notFound"
                    });
                });
            },
            handleRedirectBack: function(t) {
                var e = getCurrentPages(), a = e[e.length - 2];
                if (a && "zhihu/question" === a.route) wx.navigateBack(); else {
                    var o = t.currentTarget.dataset.id, i = "/".concat("zhihu/question", "?id=").concat(o);
                    (0, n.default)({
                        url: i
                    });
                }
            },
            onShareAppMessage: function() {
                return (0, i.getShareAppMessage)("answer", this.data.entryId, {
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
                var e = t.scrollTop, a = this.data, n = a.showTitleOnNavigationBar, o = a.answer, i = a.questionAreaHeight, s = a.isToolBarShown;
                !n && e > i && (this.setData({
                    showTitleOnNavigationBar: !0
                }), wx.setNavigationBarTitle({
                    title: o.question.title
                })), n && e < i && (this.setData({
                    showTitleOnNavigationBar: !1
                }), wx.setNavigationBarTitle({
                    title: "回答"
                })), this.initialScrollTop || (this.initialScrollTop = e), e - this.initialScrollTop < -100 && (this.initialScrollTop = e, 
                s || this.setData({
                    isToolBarShown: !0
                })), e - this.initialScrollTop > 100 && (this.initialScrollTop = e, s && this.setData({
                    isToolBarShown: !1
                }));
            },
            onReachBottom: function() {
                this.data.isToolBarShown || this.setData({
                    isToolBarShown: !0
                }), this.onRecommandScroll();
            },
            fetchRecommand: function() {
                var t = this;
                (0, o.default)("https://api.zhihu.com/wx-minapp-push/hot_recommendation").then(function(e) {
                    var a = e.data.data;
                    t.setData({
                        recommandsSource: a,
                        recommands: a.slice(0, 7)
                    });
                });
            },
            onRecommandScroll: function() {
                var t = this;
                this.data.hasNext && !this.data.loading && (this.setData({
                    loading: !0
                }), setTimeout(function() {
                    var e = t.data, a = e.pageNum, n = e.recommandsSource, o = 7 * (a + 1);
                    t.setData({
                        loading: !1,
                        pageNum: a + 1,
                        recommands: n.slice(0, o),
                        hasNext: o < n.length
                    });
                }, 1e3));
            },
            handleVideoLoadMore: function() {
                this.setData({
                    shouldShowVideoOnly: !1
                });
            }
        });
    }
}, [ 80 ]);