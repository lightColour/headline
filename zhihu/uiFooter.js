require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 12 ], {
    119: function(t, e, r) {
        r(120);
    },
    120: function(t, e) {
        function r(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var r = [], n = !0, a = !1, i = void 0;
                try {
                    for (var o, p = t[Symbol.iterator](); !(n = (o = p.next()).done) && (r.push(o.value), 
                    !e || r.length !== e); n = !0) ;
                } catch (t) {
                    a = !0, i = t;
                } finally {
                    try {
                        n || null == p.return || p.return();
                    } finally {
                        if (a) throw i;
                    }
                }
                return r;
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
        Component({
            properties: {
                entryId: String,
                entryType: String,
                title: String,
                excerpt: String
            },
            data: {
                entity_id: "",
                current_page: ""
            },
            ready: function() {
                var t = getCurrentPages(), e = t[t.length - 1] || {}, n = e.route, a = e.options, i = r(n.match(/\/(\w+)$/) || [], 2), o = (i[0], 
                i[1]), p = a.id;
                this.setData({
                    id: p,
                    pageName: o
                });
            },
            methods: {
                handleIndexButtonTap: function() {
                    var t = this.data, e = t.id, r = t.pageName;
                    wx.reportAnalytics("back_to_index", {
                        entity_id: e,
                        current_page: r
                    });
                },
                handleShareButtonTap: function() {
                    var t = this.data, e = t.id, r = t.pageName;
                    wx.reportAnalytics("share_to_friend", {
                        entity_id: e,
                        current_page: r
                    });
                }
            }
        });
    }
}, [ 119 ]);