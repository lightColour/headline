require("../../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 21 ], {
    58: function(e, t, o) {
        o(59);
    },
    59: function(e, t, o) {
        "use strict";
        var n, c = (n = o(2)) && n.__esModule ? n : {
            default: n
        };
        Component({
            properties: {
                item: Object
            },
            methods: {
                handleTap: function() {
                    var e = this.data.item, t = "/zhihu/".concat(e.type, "?id=").concat(e.urltoken, "&source=recommend");
                    (0, c.default)({
                        url: t
                    });
                }
            }
        });
    }
}, [ 58 ]);