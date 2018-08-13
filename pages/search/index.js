require("../../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 1 ], {
    60: function(t, e, a) {
        a(61);
    },
    61: function(t, e, a) {
        "use strict";
        var r = h(a(1)), s = h(a(0)), n = h(a(62)), o = h(a(2)), i = a(10), c = a(75), u = a(7);
        function h(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function d(t) {
            if (Array.isArray(t)) {
                for (var e = 0, a = new Array(t.length); e < t.length; e++) a[e] = t[e];
                return a;
            }
            return Array.from(t);
        }
        function l() {
            return (l = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var a = arguments[e];
                    for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
                }
                return t;
            }).apply(this, arguments);
        }
        var f = "".concat(r.default.apiHost, "/search/top_search"), g = "".concat(r.default.apiHost, "/search/suggest");
        Page({
            data: {
                searchInputText: "",
                searchText: "",
                topSearchWords: [],
                historySearchWords: [],
                suggestSearchWords: [],
                isSearchInputFocus: !0,
                isLoadingResult: !1
            },
            onLoad: function(t) {
                var e = this, a = t.preset;
                (0, s.default)(f).then(function(t) {
                    var a = wx.getStorageSync("historySearchWords");
                    e.setData({
                        topSearchWords: t.data.top_search.words,
                        historySearchWords: a
                    });
                }), this.showPresetWords(a);
            },
            onShow: function() {},
            onReachBottom: function() {
                var t = this.data, e = t.result, a = t.searchText, r = t.isLoadingResult;
                if (e && a && !r) {
                    var s = e.paging;
                    s.is_end || this.getSearchResult(l({}, (0, i.getQuery)(s.next)), !0);
                }
            },
            onUnload: function() {
                this.saveHistorySearchWordsToLocal();
            },
            onHide: function() {
                this.saveHistorySearchWordsToLocal();
            },
            saveHistorySearchWordsToLocal: function() {
                var t = this.data.historySearchWords;
                wx.setStorage({
                    key: "historySearchWords",
                    data: t
                });
            },
            handleSearchCancel: function() {
                wx.navigateBack({});
            },
            handleSearchClear: function() {
                this.setData({
                    searchText: "",
                    searchInputText: "",
                    isLoadingResult: !1,
                    result: null
                });
            },
            updateSearchHistory: function(t) {
                this.setData({
                    historySearchWords: t
                });
            },
            handleSearchInput: function(t) {
                var e = t.detail.value, a = e.trim();
                this.setData({
                    searchInputText: e,
                    searchText: a
                }), (0, c.debounce)(this.updateSuggestSearchWords, 200);
            },
            updateSuggestSearchWords: function() {
                var t = this, e = this.data.searchText;
                this.suggestRequestCount = this.suggestRequestCount ? this.suggestRequestCount + 1 : 1;
                var a, r = this.suggestRequestCount;
                e && (a = e, (0, s.default)("".concat(g, "?q=").concat(a))).then(function(a) {
                    if (r === t.suggestRequestCount) {
                        var s = a.data.suggest.map(function(t) {
                            var a = t.query;
                            return 0 === a.indexOf(e) ? {
                                query: a,
                                matching: e,
                                mismatching: a.replace(e, "")
                            } : {
                                query: a,
                                matching: "",
                                mismatching: a
                            };
                        });
                        t.setData({
                            suggestSearchWords: s
                        });
                    }
                });
            },
            handleSearchFocus: function() {
                this.setData({
                    isSearchInputFocus: !0
                });
            },
            searchConfirm: function(t) {
                var e = this.data.historySearchWords, a = d(new Set([ t ].concat(d(e))));
                t && this.updateSearchHistory(a), wx.pageScrollTo({
                    scrollTop: 0,
                    duration: 1
                }), this.setData({
                    isLoadingResult: !0,
                    isSearchInputFocus: !1,
                    suggestSearchWords: []
                }), this.getSearchResult({
                    q: t
                }).then(function() {});
            },
            getSearchResult: function(t) {
                var e = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return (0, n.default)(t).then(function(t) {
                    e.setData({
                        result: a ? l({}, t, {
                            data: e.data.result.data.concat(t.data)
                        }) : t,
                        isLoadingResult: !1
                    });
                });
            },
            handleSearchConfirm: function() {
                var t = this.data, e = t.searchText, a = t.presetWord;
                if (e) this.searchConfirm(e); else if (a) {
                    var r = a.real_query;
                    this.setData({
                        searchText: r,
                        searchInputText: r
                    }), this.searchConfirm(r);
                }
            },
            handlePresetWordTap: function(t) {
                this.handleRecommendWordTap(t);
                var e = t.currentTarget.dataset.id;
                (0, u.markPresetWordInvalid)(e), this.showPresetWords();
            },
            handleRecommendWordTap: function(t) {
                var e = t.currentTarget.dataset, a = e.query;
                e.type;
                this.setData({
                    searchText: a,
                    searchInputText: a
                }), this.searchConfirm(a), this.showPresetWords();
            },
            handleRemoveHistoryItem: function(t) {
                var e = t.currentTarget.dataset.word, a = this.data.historySearchWords.filter(function(t) {
                    return t != e;
                });
                this.updateSearchHistory(a);
            },
            handleEmptySearchHistory: function() {
                this.updateSearchHistory([]);
            },
            handleSearchResultTap: function(t) {
                var e = t.currentTarget;
                (0, o.default)({
                    url: e.dataset.url
                });
            },
            showPresetWords: function(t) {
                var e = this;
                if (t) {
                    var a = (0, u.getLocalPresetWords)().find(function(e) {
                        return e.query === t;
                    });
                    this.setData({
                        presetWord: a
                    });
                } else (0, u.getPresetWord)().then(function(t) {
                    return e.setData({
                        presetWord: t
                    });
                });
            }
        });
    },
    62: function(t, e, a) {
        "use strict";
        var r = this && this.__assign || Object.assign || function(t) {
            for (var e, a = 1, r = arguments.length; a < r; a++) for (var s in e = arguments[a]) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            return t;
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = a(8), n = a(9), o = a(0), i = {
            correction: 1,
            offset: 0,
            advertCount: 0,
            limit: 20,
            excerpt_len: 50,
            t: "general"
        }, c = [ "answer", "question", "article" ];
        function u(t) {
            return !!t.object && ("search_result" === t.type && -1 !== c.indexOf(t.object.type));
        }
        function h(t) {
            var e = r({}, t), a = e.highlight, o = a.title, i = a.description;
            return e.highlight = {
                title: s.default(n(o)),
                description: s.default(n(i))
            }, e;
        }
        function d(t) {
            return r({}, t.data, {
                data: t.data.data.filter(u).map(h)
            });
        }
        e.default = function(t) {
            var e = r({}, i, t, {
                limit: 30
            });
            return o.default("https://www.zhihu.com/api/v4/search_v3", {
                header: {
                    "x-api-version": "3.0.91",
                    "x-hybrid": 1
                },
                data: e
            }).then(d);
        };
    },
    75: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.debounce = function(t, e, a) {
            void 0 === e && (e = 100), void 0 === a && (a = {}), clearTimeout(t.tId), t.tId = setTimeout(function() {
                t.call(a);
            }, e);
        };
    }
}, [ 60 ]);