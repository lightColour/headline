require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 17 ], {
    114: function(t, a, e) {
        e(115);
    },
    115: function(t, a, e) {
        "use strict";
        var n, o = (n = e(0)) && n.__esModule ? n : {
            default: n
        };
        function i(t) {
            if (Array.isArray(t)) {
                for (var a = 0, e = new Array(t.length); a < t.length; a++) e[a] = t[a];
                return e;
            }
            return Array.from(t);
        }
        Component({
            properties: {
                entryId: String,
                entryType: String
            },
            data: {
                isLoadingMore: !1,
                isEnd: !1
            },
            attached: function() {
                this.loadComments();
            },
            methods: {
                loadComments: function() {
                    var t = this, a = this.data, e = a.entryId, n = a.commentsData, s = (n = void 0 === n ? {} : n).data, r = void 0 === s ? [] : s, c = a.offset, d = void 0 === c ? 0 : c, m = a.isLoadingMore, u = a.isEnd, f = a.entryType;
                    if (!u && !m) {
                        var l = "";
                        if ("answer" === f) {
                            var h = [ "data[*].author", "vote_count", "voting", "child_comments[*].author", "vote_count" ].join(",");
                            l = "https://api.zhihu.com/answers/".concat(e, "/root_comments?include=").concat(h, "&offset=").concat(d, "&limit=").concat(10);
                        } else if ("article" === f) {
                            var p = [ "data[*].author" ].join(",");
                            l = "https://api.zhihu.com/articles/".concat(e, "/comments?include=").concat(p, "&offset=").concat(d, "&limit=").concat(10, "&status=open&reverse_order=0");
                        }
                        this.setData({
                            isLoadingMore: !0
                        }), (0, o.default)(l).then(function(a) {
                            var e = a.data.featured_counts, n = i(r).concat(i(a.data.data)), o = n.slice(0, e), s = n.slice(e);
                            t.setData({
                                commentsData: Object.assign({}, a.data, {
                                    data: n
                                }),
                                featuredComments: o,
                                commonComments: s,
                                offset: d + 10,
                                isLoadingMore: !1,
                                isEnd: a.data.paging.is_end || a.data.data.length < 10
                            });
                        });
                    }
                },
                closeCommentPanel: function() {
                    this.triggerEvent("closeCommentPanel", {});
                }
            }
        });
    }
}, [ 114 ]);