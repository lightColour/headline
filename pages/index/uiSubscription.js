require("../../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 20 ], {
    54: function(o, e, n) {
        n(55);
    },
    55: function(o, e) {
        Component({
            properties: {
                isVisible: Boolean,
                showButton: Boolean
            },
            methods: {
                handleSubscribe: function() {
                    this.triggerEvent("subcribe");
                }
            }
        });
    }
}, [ 54 ]);