require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 25 ], {
    50: function(e, t, r) {
        r(51);
    },
    51: function(e, t, r) {
        "use strict";
        var n = r(4);
        var a = {
            properties: {
                activeNav: {
                    type: Number,
                    value: 0
                },
                searchIconOpacity: {
                    type: Number,
                    value: 1
                },
                defaultOffset: {
                    type: Number,
                    value: 0
                }
            },
            data: {
                list: [ {
                    text: "热榜",
                    url: "/pages/index/index",
                    identifier: n.NavIdentifier.hot
                }, {
                    text: "为你推荐",
                    url: "/pages/index/recommend",
                    identifier: n.NavIdentifier.recommendation
                } ],
                scrollTopMap: {}
            },
            methods: {
                handleNavItemTap: function(e) {
                    var t = this, r = e.currentTarget.dataset.navIdentifier;
                    r !== this.data.activeNav && this.memoizeScrollTop().then(function() {
                        t.triggerEvent("tabchange", {
                            nextNavIdentifier: r,
                            previousNavIdentifier: t.data.activeNav
                        });
                    }).then(function() {
                        return t.recoverScrollTop(r);
                    }).then(function() {
                        return t.triggerEvent("scrollpositionrestored");
                    });
                },
                memoizeScrollTop: function() {
                    var e = this, t = this.data.activeNav, r = "scrollTopMap[".concat(t, "]");
                    return new Promise(function(t) {
                        wx.createSelectorQuery().selectViewport().scrollOffset(function(n) {
                            var a, o, i;
                            e.setData((a = {}, o = r, i = n.scrollTop, o in a ? Object.defineProperty(a, o, {
                                value: i,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : a[o] = i, a), t);
                        }).exec();
                    });
                },
                recoverScrollTop: function(e) {
                    var t = this;
                    return new Promise(function(r) {
                        setTimeout(function() {
                            wx.pageScrollTo({
                                scrollTop: t.data.scrollTopMap[e] || t.data.defaultOffset,
                                duration: 1
                            }), r();
                        }, 1);
                    });
                },
                handleSearchIconTap: function() {
                    this.triggerEvent("searchIconTap");
                }
            }
        };
        Component(a);
    }
}, [ 50 ]);