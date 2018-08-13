require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 29 ], {
    123: function(e, n, t) {
        t(124);
    },
    124: function(e, n) {
        Component({
            properties: {
                fontSize: {
                    type: String,
                    value: 15
                }
            },
            ready: function() {
                var e = this, n = this.createSelectorQuery();
                n.select(".offscreen").boundingClientRect(), n.exec(function(n) {
                    var t = n[0].height / e.data.fontSize;
                    e.triggerEvent("measure", {
                        lines: t
                    });
                });
            }
        });
    }
}, [ 123 ]);