require("../../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 2 ], {
    46: function(t, e, a) {
        a(47);
    },
    47: function(t, e, a) {
        "use strict";
        var n = a(4), r = d(a(1)), o = d(a(0)), i = d(a(2)), s = d(a(48)), c = a(49), u = a(3), h = a(7);
        function d(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function f(t, e, a) {
            return e in t ? Object.defineProperty(t, e, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = a, t;
        }
        function l() {
            return (l = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = arguments[e];
                    for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
                }
                return t;
            }).apply(this, arguments);
        }
        var g = getApp(), p = function(t) {
            return t.target && ("answer" === t.target.type || "article" === t.target.type);
        }, m = function(t) {
            return l({}, t.target, {
                id: String(t.target.id),
                attachedInfo: t.attached_info,
                title: t.target.question ? t.target.question.title : t.target.title,
                urltoken: String(t.target.id),
                image: t.target.thumbnail || t.target.image_url
            });
        };
        Page({
            data: {
                hotList: [],
                showFreshBanner: !1,
                showSubscription: !1,
                isSubscriptionButtonVisible: !0,
                pageType: "home",
                currentNav: n.NavIdentifier.hot,
                navIdentifiers: (0, s.default)(n.NavIdentifier),
                recommendList: [],
                recommendPaging: null,
                scrollPositionRestored: !0,
                searchIconHidden: 1
            },
            willShowSearchWhenTouchEnd: !1,
            willHideSearchWhenTouchEnd: !1,
            onLoad: function() {
                var t = this;
                this.getHotData().then(function() {
                    t.getRecommendData();
                }), g.authRequired().then(function(e) {
                    t.checkSubscription().then(function() {
                        return t.logUserAccess();
                    }).then(function() {
                        t.getRecommendData(!0, !0), t.handleRefresh(!0);
                    });
                });
            },
            onPullDownRefresh: function() {
                wx.vibrateShort && wx.vibrateShort(), this.handleRefresh(!0);
            },
            onShow: function() {
                var t = this.data, e = t.hotList, a = t.currentNav;
                e.length && a === n.NavIdentifier.hot && this.handleRefresh(!1), this.showPresetWords();
            },
            onShareAppMessage: function() {
                var t = (g.globalData.userInfo || {}).nickName, e = void 0 === t ? "" : t;
                return e ? {
                    title: "".concat(e, " 和你分享了热门榜单")
                } : {
                    title: ""
                };
            },
            onListScroll: function(t) {
                var e = t.detail.scrollTop;
                e < -40 && !this.shouldRefreshWhenTouchEnd ? (wx.vibrateShort && wx.vibrateShort(), 
                this.shouldRefreshWhenTouchEnd = !0) : e > -40 && this.shouldRefreshWhenTouchEnd && (this.shouldRefreshWhenTouchEnd = !1), 
                this.setData({
                    searchIconOpacity: Math.min(.025 * e, 1)
                });
            },
            onReachBottom: function() {
                this.handleScrollBottom();
            },
            showSearchBar: function(t) {
                wx.pageScrollTo({
                    scrollTop: 0,
                    duration: t || 1
                }), this.setData({
                    searchIconHidden: !0
                });
            },
            handleScrollBottom: function() {
                var t = this, e = this.data, a = e.isBottomLoading, n = e.recommendPaging, r = n && n.is_end;
                if (!a && !r) {
                    this.setData({
                        isBottomLoading: !0
                    });
                    var o = function() {
                        return t.setData({
                            isBottomLoading: !1
                        });
                    };
                    this.getRecommendData().then(o, o);
                }
            },
            handleTabChange: function(t) {
                this.setData({
                    currentNav: t.detail.nextNavIdentifier,
                    scrollPositionRestored: !1
                });
            },
            handleTabScrollPositionRestored: function(t) {
                this.setData({
                    scrollPositionRestored: !0
                });
            },
            getHotData: function() {
                var t = this;
                return (0, o.default)("".concat(r.default.dataBaseUrl, "/api/v3/feed/topstory/hot-list-wx?limit=50")).then(function(e) {
                    return t.setData({
                        hotList: e.data.data.map(t.normalizeHotItemData)
                    }), e;
                });
            },
            getRecommendData: function(t, e) {
                var a = this, n = this.data, i = n.recommendPaging, s = n.recommendList;
                return function(t) {
                    return (0, o.default)(t).then(function(t) {
                        return {
                            data: t.data.data.filter(p).map(m),
                            paging: t.data.paging,
                            freshText: t.data.fresh_text
                        };
                    });
                }(!e && i ? i.next : (0, u.isLoggedIn)() ? "".concat(r.default.dataBaseUrl, "/api/v3/feed/topstory") : "".concat(r.default.dataBaseUrl, "/api/v3/feed/topstory/hot-lite")).then(function(e) {
                    return a.setData({
                        recommendList: t ? e.data : (0, c.uniqueById)(s.concat(e.data)),
                        recommendPaging: e.paging
                    }), e;
                });
            },
            checkSubscription: function() {
                var t = this;
                return (0, o.default)("".concat(r.default.apiBaseUrl, "/user-push-switch")).then(function(e) {
                    e.data.status || t.openSubscriptHeader();
                });
            },
            logUserAccess: function() {
                return (0, o.default)("".concat(r.default.apiBaseUrl, "/access-time"), {
                    method: "PUT"
                });
            },
            handleHotItemTap: function(t) {
                var e = t.target.dataset, a = e.urltoken, n = e.type;
                this.shouldSendFormId() && (0, o.default)("".concat(r.default.apiBaseUrl, "/user-formid"), {
                    method: "POST",
                    data: {
                        formid: t.detail.formId
                    }
                }).then(function() {
                    var e = new Date().toDateString(), a = wx.getStorageSync("formIdLists");
                    if (a && a[e]) {
                        var n = a[e];
                        wx.setStorageSync("formIdLists", f({}, e, n.concat([ t.detail.formId ])));
                    } else wx.setStorageSync("formIdLists", f({}, e, [ t.detail.formId ]));
                }), (0, i.default)({
                    url: "/zhihu/".concat(n, "?id=").concat(a, "&source=hotList")
                });
            },
            shouldSendFormId: function() {
                var t = new Date().toDateString(), e = wx.getStorageSync("formIdLists");
                if (!e) return !0;
                var a = e[t];
                return !a || !(a.length >= 7);
            },
            handleSubscribe: function() {
                var t = this;
                (0, o.default)("".concat(r.default.apiBaseUrl, "/user-push-switch"), {
                    method: "PUT",
                    data: {
                        status: !0
                    }
                }).then(function() {
                    t.setData({
                        isSubscriptionButtonVisible: !1
                    }), setTimeout(function() {
                        t.closeSubscriptHeader();
                    }, 700);
                }, function() {
                    t.showNetworkErrorToast();
                });
            },
            normalizeHotItemData: function(t, e) {
                var a = t.target.link.url, n = a.match(/\/(\d+)+/)[1], r = -1 !== a.indexOf("/question") ? "question" : "article", o = t.target.metrics_area.text, i = t.target.title_area.text, s = i.length > 12 ? "" : t.target.excerpt_area && t.target.excerpt_area.text;
                return l({
                    id: t.id,
                    attachedInfo: t.attached_info,
                    title: i,
                    excerpt: s,
                    image: t.target.image_area && t.target.image_area.url,
                    link: a,
                    metrics: o,
                    type: r,
                    urltoken: n,
                    indexColor: e <= 2 ? "red" : "gold"
                }, t.feed_specific);
            },
            openSubscriptHeader: function() {
                this.setData({
                    showSubscription: !0
                });
            },
            closeSubscriptHeader: function() {
                this.setData({
                    showSubscription: !1
                });
            },
            handleRefresh: function(t) {
                var e = this;
                (this.data.currentNav === n.NavIdentifier.hot ? this.getHotData() : this.getRecommendData(!0)).then(function(a) {
                    if (wx.stopPullDownRefresh(), t && e.topToast) {
                        var n = {
                            delay: 500,
                            duration: 1e3
                        };
                        a.freshText && (n.text = a.freshText), e.topToast.show(n);
                    }
                });
            },
            handleTopToastRef: function(t) {
                this.topToast = t.detail;
            },
            showToast: function(t) {
                this.setData({
                    networkErrorToast: t
                });
            },
            hideToast: function() {
                this.setData({
                    networkErrorToast: ""
                });
            },
            showNetworkErrorToast: function() {
                var t = this;
                this.showToast("好像哪里出错了，稍后再试"), setTimeout(function() {
                    t.hideToast();
                }, 1500);
            },
            handleTestButtonTap: function() {
                wx.scanCode({
                    success: function(t) {
                        var e = t.path;
                        (0, i.default)({
                            url: "/".concat(e)
                        });
                    }
                });
            },
            navigateToSearchPage: function() {
                var t = this.data.presetWord, e = t ? t.query : "", a = this;
                (0, i.default)({
                    url: "/pages/search/index?preset=".concat(e),
                    success: function() {
                        setTimeout(function() {
                            return a.showPresetWords();
                        }, 1e3);
                    }
                });
            },
            handleSearchIconTap: function() {
                this.navigateToSearchPage();
            },
            handleFakeInputTap: function() {
                this.navigateToSearchPage();
            },
            handleChangeTapBySwipe: function(t) {
                var e = t.detail.current;
                this.setData({
                    currentNav: e
                });
            },
            handlePageTouchEnd: function() {
                this.shouldRefreshWhenTouchEnd && (wx.vibrateShort && wx.vibrateShort(), this.handleRefresh(!0), 
                this.shouldRefreshWhenTouchEnd = !1);
            },
            showPresetWords: function() {
                var t = this;
                (0, h.getPresetWord)().then(function(e) {
                    return t.setData({
                        presetWord: e
                    });
                });
            }
        });
    },
    48: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = function(t) {
            return JSON.parse(JSON.stringify(t));
        };
    },
    49: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.uniqueBy = function(t, e) {
            var a = t.map(e);
            return t.filter(function(t, e) {
                return a.indexOf(a[e]) === e;
            });
        }, e.uniqueById = function(t) {
            return e.uniqueBy(t, function(t) {
                return t.id;
            });
        };
    }
}, [ 46 ]);