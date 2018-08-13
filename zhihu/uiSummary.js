require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 11 ], {
    121: function(t, a, e) {
        e(122);
    },
    122: function(t, a) {
        var e = function(t) {
            return t.replace(/<.+?>/g, "");
        };
        Component({
            options: {
                multipleSlots: !0
            },
            properties: {
                excerpt: String,
                detail: String
            },
            data: {
                expanded: !1,
                canExpand: !1
            },
            attached: function() {
                var t = this.data, a = t.excerpt, n = t.detail, p = e(a), i = p !== e(n);
                this.setData({
                    canExpand: i,
                    excerptText: p
                });
            },
            methods: {
                handleTap: function() {
                    this.data.canExpand && this.setData({
                        expanded: !0
                    });
                },
                handleExcerptMeasure: function(t) {
                    t.detail.lines > 2 && this.setData({
                        canExpand: !0
                    });
                }
            }
        });
    }
}, [ 121 ]);