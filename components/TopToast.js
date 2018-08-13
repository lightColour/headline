require("../common.js");

var webpackJsonp = wx.webpackJsonp;

webpackJsonp([ 24 ], {
    52: function(t, n, e) {
        e(53);
    },
    53: function(t, n) {
        var e = function(t) {
            return new Promise(function(n) {
                return setTimeout(n, t);
            });
        };
        Component({
            properties: {
                offset: {
                    type: String,
                    value: "0"
                },
                text: {
                    type: String,
                    value: ""
                }
            },
            data: {
                mount: !1,
                status: ""
            },
            attached: function() {
                this.triggerEvent("onref", this);
            },
            detached: function() {
                this.triggerEvent("onref", null);
            },
            methods: {
                show: function(t) {
                    var n = this, r = Object.assign({
                        delay: 0,
                        duration: 1500
                    }, this.data, t);
                    e(r.delay).then(function() {
                        return n.setState({
                            mount: !0,
                            status: "active",
                            text: r.text
                        });
                    }).then(function() {
                        return e(300 + r.duration);
                    }).then(function() {
                        return n.setState({
                            status: "leave"
                        });
                    }).then(function() {
                        return e(300);
                    }).then(function() {
                        return n.setState({
                            mount: !1
                        });
                    });
                },
                setState: function(t) {
                    var n = this;
                    return new Promise(function(e) {
                        return n.setData(t, e);
                    });
                }
            }
        });
    }
}, [ 52 ]);