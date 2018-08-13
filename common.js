!function(t) {
    var e = wx.webpackJsonp;
    wx.webpackJsonp = function(r, o, n) {
        for (var a, c, u, l = 0, h = []; l < r.length; l++) c = r[l], s[c] && h.push(s[c][0]), 
        s[c] = 0;
        for (a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
        for (e && e(r, o, n); h.length; ) h.shift()();
        if (n) for (l = 0; l < n.length; l++) u = i(i.s = n[l]);
        return u;
    };
    var r = {}, s = {
        32: 0
    };
    function i(e) {
        if (r[e]) return r[e].exports;
        var s = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
    }
    i.m = t, i.c = r, i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return i.d(e, "a", e), e;
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, i.p = "/", i.oe = function(t) {
        throw console.error(t), t;
    };
}([ function(t, e, r) {
    "use strict";
    var s = this && this.__assign || Object.assign || function(t) {
        for (var e, r = 1, s = arguments.length; r < s; r++) for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t;
    };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = r(1), o = r(6), n = r(3), a = "oauth c3cef7c66a1843f8b3a9e6a1e3160e20", c = {
        header: {
            "Weapp-Alias": "a45c26964c9246caab21aa471ec101be",
            "Weapp-Client-Alias": "c51ae4e5c08949309c10a0389cbb6705"
        }
    };
    e.default = function(t, e) {
        void 0 === e && (e = {});
        var r = function(t) {
            return void 0 === t && (t = ""), t.startsWith("http") || t.startsWith("//") ? t : "" + i.default.dataBaseUrl + t;
        }(t), u = function() {
            var t = n.getAuthorizationToken(), u = {
                Authorization: t ? "bearer " + t : a,
                "Weapp-Session": wx.getStorageSync("sessionKey"),
                "X-Weapp-Version": i.default.currentVersion
            };
            return o.default(s({
                url: r
            }, e, c, {
                header: s({}, c.header, u, e.header)
            }));
        };
        return u().catch(function(t) {
            if (401 !== t.statusCode || e.shouldOverrideAuthFailure) throw t;
            return n.setAuthorizationToken(""), new Promise(function(t, e) {
                getApp().authRequired().then(function() {
                    u().then(t, e);
                }, function() {
                    return e({
                        statusCode: 401
                    });
                });
            });
        });
    };
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = {
        apiHost: "https://api.zhihu.com",
        apiBasePath: "/wx-minapp-push/hot-list",
        apiBaseUrl: "https://api.zhihu.com/wx-minapp-push/hot-list",
        dataBaseUrl: "https://www.zhihu.com",
        webviewBaseUrl: "https://www.zhihu.com/wechat/hotlist",
        appVersion: "100",
        currentVersion: "3.2.0"
    };
    e.default = s;
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = 9;
    e.getOpenType = function() {
        return getCurrentPages().length < s ? "navigate" : "redirect";
    }, e.default = function(t) {
        getCurrentPages().length < s ? wx.navigateTo(t) : wx.redirectTo(t);
    };
}, function(t, e, r) {
    "use strict";
    var s = this && this.__assign || Object.assign || function(t) {
        for (var e, r = 1, s = arguments.length; r < s; r++) for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t;
    };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i, o = r(1), n = r(0), a = r(45), c = 864e3;
    function u() {
        return new Promise(function(t, e) {
            wx.getUserInfo({
                withCredentials: !0,
                success: t,
                fail: e
            });
        });
    }
    !function(t) {
        t[t.LOGGED_IN = 0] = "LOGGED_IN", t[t.NEED_REFRESH = 1] = "NEED_REFRESH", t[t.NOT_LOGGED_IN = 2] = "NOT_LOGGED_IN";
    }(i = e.LOGIN_STATUS || (e.LOGIN_STATUS = {})), e.getSessionKey = function() {
        return new Promise(function(t, e) {
            wx.login({
                success: function(r) {
                    n.default(o.default.apiHost + "/wx-minapp-account/session", {
                        method: "POST",
                        data: {
                            wx_code: r.code
                        }
                    }).then(function(e) {
                        var r = e.data;
                        wx.setStorageSync("sessionKey", r.session_key), t(r.session_key);
                    }).catch(e);
                },
                fail: e
            });
        });
    }, e.getSessionKeyOnce = a.once(e.getSessionKey), e.getWxUserInfo = u, wx.removeStorageSync("Authorization"), 
    wx.removeStorageSync("Authorization2");
    var l = "Authorization3", h = "loginExpiresAt", p = "loginRefreshTicket";
    function _(t) {
        wx.setStorageSync(l, t);
    }
    e.setAuthorizationToken = _, e.getAuthorizationStatus = function() {
        var t = Number(wx.getStorageSync(h) || 0), e = Date.now() / 1e3, r = wx.getStorageSync(l);
        return t && t - e < c ? {
            status: i.NEED_REFRESH,
            token: wx.getStorageSync(p)
        } : r ? {
            status: i.LOGGED_IN,
            token: r
        } : {
            status: i.NOT_LOGGED_IN
        };
    }, e.getAuthorizationToken = function() {
        return wx.getStorageSync(l);
    }, e.saveLoggedInData = function(t) {
        _(t.login_ticket), wx.setStorageSync(p, t.refresh_ticket), wx.setStorageSync(h, String(t.expires_at));
    }, e.loginZhihu = function(t, r) {
        return n.default(o.default.apiHost + "/wx-minapp-account/login", {
            method: "POST",
            data: {
                user_encrypted_data: t.encryptedData,
                user_iv: t.iv,
                login_type: r,
                refresh_ticket: t.refresh_ticket
            },
            shouldOverrideAuthFailure: !0
        }).then(function(t) {
            var r = t.data;
            e.saveLoggedInData(r);
        }).catch(function(e) {
            throw console.error("login failed", e), t;
        });
    }, e.loginZhihuOnce = a.once(e.loginZhihu), function(t) {
        t.refresh = "refresh_ticket", t.login = "wx-minapp";
    }(e.LoginType || (e.LoginType = {})), e.getAuthorization = function(t) {
        return u().then(function(r) {
            return e.loginZhihuOnce(s({}, r, {
                refresh_ticket: String(wx.getStorageSync(p))
            }), t);
        });
    }, e.isLoggedIn = function() {
        return !!wx.getStorageSync(l);
    }, e.createZhihuAccount = function(t) {
        return n.default(o.default.apiHost + "/wx-minapp-account/bind", {
            method: "POST",
            data: {
                user_encrypted_data: t.encryptedData,
                user_iv: t.iv
            }
        }).then(function(t) {
            var r = t.data;
            return e.saveLoggedInData(r);
        });
    }, e.createZhihuAccountOnce = a.once(e.createZhihuAccount);
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), function(t) {
        t[t.hot = 0] = "hot", t[t.recommendation = 1] = "recommendation";
    }(e.NavIdentifier || (e.NavIdentifier = {})), function(t) {
        t[t.DISCOVER = 1001] = "DISCOVER", t[t.TOP_SEARCH_RESULT = 1005] = "TOP_SEARCH_RESULT", 
        t[t.DISCOVER_SEARCH_RESULT = 1006] = "DISCOVER_SEARCH_RESULT", t[t.MESSAGE_CARD = 1007] = "MESSAGE_CARD", 
        t[t.GROUP_MESSAGE_CARD = 1008] = "GROUP_MESSAGE_CARD", t[t.SCAN_QRCODE = 1011] = "SCAN_QRCODE", 
        t[t.PRESS_QRCODE = 1012] = "PRESS_QRCODE", t[t.ALBUM_QRCODE = 1013] = "ALBUM_QRCODE", 
        t[t.TEMPLATE_MESSAGE = 1014] = "TEMPLATE_MESSAGE", t[t.STAGING_ENTRANCE = 1017] = "STAGING_ENTRANCE", 
        t[t.WECHAT_WALLET = 1019] = "WECHAT_WALLET", t[t.PUBLIC_ACCOUNT_RELATED = 1020] = "PUBLIC_ACCOUNT_RELATED", 
        t[t.CHAT_TOP = 1022] = "CHAT_TOP", t[t.DESKTOP = 1023] = "DESKTOP", t[t.MINIAPP_PROFIE = 1024] = "MINIAPP_PROFIE", 
        t[t.SCAN_BARCODE = 1025] = "SCAN_BARCODE", t[t.NEARBY_APP = 1026] = "NEARBY_APP", 
        t[t.USED_TOP_NAV = 1027] = "USED_TOP_NAV", t[t.COUPON_PANEL = 1028] = "COUPON_PANEL", 
        t[t.COUPON_PAGE = 1029] = "COUPON_PAGE", t[t.TESTING = 1030] = "TESTING", t[t.PRESS_BARCODE = 1031] = "PRESS_BARCODE", 
        t[t.ALBUM_BARCODE = 1032] = "ALBUM_BARCODE", t[t.PAY_SUCCESS = 1034] = "PAY_SUCCESS", 
        t[t.PUBLIC_ACCOUNT_MENU = 1035] = "PUBLIC_ACCOUNT_MENU", t[t.THIRD_PARTY_APP_SHARE_CARD = 1036] = "THIRD_PARTY_APP_SHARE_CARD", 
        t[t.THIRD_PARTY_MINIAPP = 1037] = "THIRD_PARTY_MINIAPP", t[t.BACK_FROM_MINIAPP = 1038] = "BACK_FROM_MINIAPP", 
        t[t.TV_SHAKE = 1039] = "TV_SHAKE", t[t.SEARCH_FRIEND_RESULT = 1042] = "SEARCH_FRIEND_RESULT", 
        t[t.PUBLIC_ACCOUNT_TEMPLATE_MESSAGE = 1043] = "PUBLIC_ACCOUNT_TEMPLATE_MESSAGE", 
        t[t.MINIAPP_SHARE_CARD = 1044] = "MINIAPP_SHARE_CARD", t[t.SCAN_MINIAPP_CODE = 1047] = "SCAN_MINIAPP_CODE", 
        t[t.PRESS_MINIAPP_CODE = 1048] = "PRESS_MINIAPP_CODE", t[t.ALBUM_MINIAPP_CODE = 1049] = "ALBUM_MINIAPP_CODE", 
        t[t.COUPON_STORE_LIST = 1052] = "COUPON_STORE_LIST", t[t.SEARCH_SEARCH_RESULT = 1053] = "SEARCH_SEARCH_RESULT", 
        t[t.TOP_SEARCH_SHORTCUT = 1054] = "TOP_SEARCH_SHORTCUT", t[t.MUSIC_PLAYER = 1056] = "MUSIC_PLAYER", 
        t[t.BANKCARD_DETAIL = 1057] = "BANKCARD_DETAIL", t[t.PUBLIC_ACCOUNT_ARTICLE = 1058] = "PUBLIC_ACCOUNT_ARTICLE", 
        t[t.BIND_INVITATION = 1059] = "BIND_INVITATION", t[t.WECHAT_WIFI = 1064] = "WECHAT_WIFI", 
        t[t.PUBLIC_ACCOUNT_ARTICLE_AD = 1067] = "PUBLIC_ACCOUNT_ARTICLE_AD", t[t.NEARBY_MINIAPP_AD = 1068] = "NEARBY_MINIAPP_AD", 
        t[t.BANKCARD_LIST = 1071] = "BANKCARD_LIST", t[t.QRCODE_RECEIVE_MONEY = 1072] = "QRCODE_RECEIVE_MONEY", 
        t[t.CUSTOMER_MESSAGE = 1073] = "CUSTOMER_MESSAGE", t[t.PUBLIC_ACCOUNT_MESSAGE = 1074] = "PUBLIC_ACCOUNT_MESSAGE", 
        t[t.WECHAT_WIFI_SUCCESS = 1078] = "WECHAT_WIFI_SUCCESS", t[t.PULL_DOWN_PANEL = 1089] = "PULL_DOWN_PANEL", 
        t[t.LONG_PRESS_HOME = 1090] = "LONG_PRESS_HOME", t[t.CITY_SERVICE = 1092] = "CITY_SERVICE";
    }(e.WechatScene || (e.WechatScene = {}));
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = r(1), i = r(6);
    e.encodeScene = function(t, e) {
        return t + "/" + e;
    }, e.decodeScene = function(t) {
        void 0 === t && (t = "");
        var e = decodeURIComponent(t).split("/");
        return {
            type: e[0],
            id: e[1]
        };
    }, e.getShareImage = function(t, r) {
        return i.default({
            url: s.default.apiBaseUrl + "/share-image",
            method: "GET",
            query: {
                page: "zhihu/" + t,
                scene: e.encodeScene(t, r),
                type: t,
                id: r,
                template: (o = Math.floor(4 * Math.random()) + 1, String(o))
            }
        }).then(function(t) {
            var e = t.data.image_urls;
            if (!e || !e.friend) throw new Error("no res data");
            return e;
        });
        var o;
    };
    var o = {
        p: "这篇文章",
        answer: "这个回答",
        question: "这个问题"
    };
    e.getShareAppMessage = function(t, e, r) {
        void 0 === r && (r = {});
        var s = r.imageUrl, i = (getApp().globalData.userInfo || {}).nickName, n = void 0 === i ? void 0 : i, a = o[t] || "小程序", c = {
            title: "",
            path: "/zhihu/" + t + "?id=" + e + "&isShared=1"
        };
        return n && a && (c.title = n + " 和你分享了" + a), s && (c.imageUrl = s), c;
    };
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(t) {
        var e = t.url, r = t.method, s = void 0 === r ? "GET" : r, i = t.data, o = t.query, n = t.header, a = o ? function(t) {
            var e = Object.keys(t);
            return e.length ? e.reduce(function(r, s, i) {
                var o = i === e.length - 1 ? "" : "&";
                return "" + r + encodeURIComponent(s) + "=" + encodeURIComponent(String(t[s])) + o;
            }, "?") : "";
        }(o) : "";
        return new Promise(function(t, r) {
            wx.request({
                url: "" + e + a,
                method: s,
                data: i,
                header: n,
                success: function(e) {
                    var s;
                    (s = e.statusCode) >= 200 && s < 300 ? t(e) : r(e);
                },
                fail: function(t) {
                    r(t);
                }
            });
        });
    };
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = r(0);
    var i = r(1).default.apiHost + "/search/preset_words", o = function(t) {
        return s.default(i + "?w=" + encodeURIComponent(JSON.stringify(t)));
    };
    function n(t) {
        return wx.setStorageSync("searchPresetWords", JSON.stringify(t)), t;
    }
    function a() {
        return JSON.parse(wx.getStorageSync("searchPresetWords"));
    }
    function c(t) {
        void 0 === t && (t = []);
        var e = t.filter(function(t) {
            return t.valid && Date.now() / 1e3 < t.end_ts;
        });
        if (!e || 0 === e.length) return "";
        var r, s, i, o, n = e.find(function(t) {
            return 10 === t.weight;
        });
        return n || e[(r = e.map(function(t) {
            return t.weight;
        }), s = Math.random() * r.reduce(function(t, e) {
            return t + e;
        }, 0), i = 0, o = 0, r.some(function(t, e) {
            return (o += t) > s && (i = e, !0);
        }), i)];
    }
    e.getLocalPresetWords = a, e.getPresetWord = function() {
        return new Promise(function(t, e) {
            var r;
            try {
                r = a();
            } catch (t) {}
            var s = c(r || []);
            r ? s ? t(s) : o(r.map(function(t) {
                return {
                    id: t.id,
                    valid: t.valid
                };
            })).then(function(t) {
                return n(t.data.preset_words.words);
            }).then(function(e) {
                return t(c(e));
            }).catch(e) : o([]).then(function(t) {
                return n(t.data.preset_words.words);
            }).then(function(e) {
                return t(c(e));
            }).catch(e);
        });
    }, e.markPresetWordInvalid = function(t) {
        var e = a();
        e.find(function(e) {
            return e.id === t;
        }).valid = 0, n(e);
    }, e.selectPresetWords = c;
}, function(t, e, r) {
    "use strict";
    function s(t) {
        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0;
    var i = {
        pre: "div",
        figure: "div",
        figcaption: "div",
        u: "span"
    }, o = function() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
        return e.reduce(function(t, e) {
            var r = s(e);
            return "string" === r || "number" === r ? t.push(e) : null !== e && "object" === r && t.push.apply(t, function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
                    return r;
                }
                return Array.from(t);
            }(Object.keys(e).filter(function(t) {
                return e[t];
            }))), t;
        }, []).join(" ");
    }, n = function t(e) {
        return Array.isArray(e) ? e.map(t) : "object" === s(e) ? {
            name: i[e.tag] || e.tag,
            attrs: function(t) {
                var e = t.attrs || {}, r = o(t.tag, e.class), s = {};
                if ("img" === t.tag && e) if (e.eeimg) s = {
                    class: "eeimg eeimg-" + ("1" === e.eeimg ? "inline" : "block")
                }; else {
                    e.src.startsWith("data:image") && e["data-actualsrc"] && (s = {
                        src: e["data-actualsrc"]
                    });
                    var i = e["data-size"];
                    i && (s.class = r + " size-" + i);
                }
                return Object.assign({}, e, {
                    class: r
                }, s);
            }(e),
            children: t(e.content)
        } : "string" == typeof e ? e.startsWith("\x3c!--") && e.endsWith("--\x3e") ? {
            type: "text",
            text: ""
        } : {
            type: "text",
            text: e
        } : null;
    };
    e.default = n;
}, function(t, e, r) {
    "use strict";
    var s = r(63), i = r(72), o = r(74), n = {
        lowerCaseTags: !1,
        lowerCaseAttributeNames: !1
    }, a = [ {
        name: "!doctype",
        start: "<",
        end: ">"
    } ];
    function c(t, e) {
        var r = [], i = [];
        r.last = function() {
            return this[this.length - 1];
        };
        var c = new s({
            onprocessinginstruction: function(t, s) {
                for (var o = [].concat(a, e.directives || []), n = r.last(), c = 0; c < o.length; c++) {
                    var u = o[c], l = u.start + s + u.end;
                    if (t.toLowerCase() === u.name) {
                        if (!n) return void i.push(l);
                        n.content || (n.content = []), n.content.push(l);
                    }
                }
            },
            oncomment: function(t) {
                var e = "\x3c!--" + t + "--\x3e", s = r.last();
                s ? (s.content || (s.content = []), s.content.push(e)) : i.push(e);
            },
            onopentag: function(t, e) {
                var s = {
                    tag: t
                };
                Object.keys(e).length && (s.attrs = function(t) {
                    var e = {};
                    return Object.keys(t).forEach(function(r) {
                        var s = {};
                        s[r] = t[r].replace(/&quot;/g, '"'), o(e, s);
                    }), e;
                }(e)), r.push(s);
            },
            onclosetag: function() {
                var t = r.pop();
                if (r.length) {
                    var e = r.last();
                    Array.isArray(e.content) || (e.content = []), e.content.push(t);
                } else i.push(t);
            },
            ontext: function(t) {
                var e = r.last();
                e ? (e.content || (e.content = []), e.content.push(t)) : i.push(t);
            }
        }, e || n);
        return c.write(t), c.end(), i;
    }
    t.exports = function() {
        var t;
        function e(e) {
            return c(e, o(n, t));
        }
        return 1 === arguments.length && i(arguments[0]) ? (t = arguments[0], e) : (t = arguments[1], 
        e(arguments[0]));
    }, t.exports.defaultOptions = n, t.exports.defaultDirectives = a;
}, function(t, e, r) {
    "use strict";
    var s = this && this.__assign || Object.assign || function(t) {
        for (var e, r = 1, s = arguments.length; r < s; r++) for (var i in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t;
    };
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.param = function(t) {
        return void 0 === t && (t = {}), Object.keys(t).map(function(e) {
            var r = t[e];
            return void 0 !== r && null !== r && e + "=" + encodeURIComponent(r);
        }).filter(Boolean).join("&");
    }, e.getQuery = function(t) {
        if (!t) return {};
        var e = (t.match(/\?([^#]+)/) || [])[1], r = void 0 === e ? "" : e;
        return r ? r.split("&").reduce(function(t, e) {
            var r = e.split("="), s = r[0], i = r[1];
            return t[s] = decodeURIComponent(i), t;
        }, {}) : {};
    }, e.addQuery = function(t, r) {
        void 0 === r && (r = {});
        var i = e.param(s({}, e.getQuery(t), r));
        return i ? /\?([^#]+)/.test(t) ? t.replace(/\?([^#]+)/, "?" + i) : /(#[\w]+)$/.test(t) ? t.replace(/(#[\w]+)$/, "?" + i + "$1") : t + "?" + i : t;
    };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.once = function(t) {
        var e;
        return function() {
            for (var r = [], s = 0; s < arguments.length; s++) r[s] = arguments[s];
            return null !== e && void 0 !== e || (e = t.apply(void 0, r)), e;
        };
    };
}, , , , , , , , , , , , , , , , , , function(t, e, r) {
    var s = r(64), i = {
        input: !0,
        option: !0,
        optgroup: !0,
        select: !0,
        button: !0,
        datalist: !0,
        textarea: !0
    }, o = {
        tr: {
            tr: !0,
            th: !0,
            td: !0
        },
        th: {
            th: !0
        },
        td: {
            thead: !0,
            th: !0,
            td: !0
        },
        body: {
            head: !0,
            link: !0,
            script: !0
        },
        li: {
            li: !0
        },
        p: {
            p: !0
        },
        h1: {
            p: !0
        },
        h2: {
            p: !0
        },
        h3: {
            p: !0
        },
        h4: {
            p: !0
        },
        h5: {
            p: !0
        },
        h6: {
            p: !0
        },
        select: i,
        input: i,
        output: i,
        button: i,
        datalist: i,
        textarea: i,
        option: {
            option: !0
        },
        optgroup: {
            optgroup: !0
        }
    }, n = {
        __proto__: null,
        area: !0,
        base: !0,
        basefont: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        frame: !0,
        hr: !0,
        img: !0,
        input: !0,
        isindex: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
        path: !0,
        circle: !0,
        ellipse: !0,
        line: !0,
        rect: !0,
        use: !0,
        stop: !0,
        polyline: !0,
        polygon: !0
    }, a = /\s|\//;
    function c(t, e) {
        this._options = e || {}, this._cbs = t || {}, this._tagname = "", this._attribname = "", 
        this._attribvalue = "", this._attribs = null, this._stack = [], this.startIndex = 0, 
        this.endIndex = null, this._lowerCaseTagNames = "lowerCaseTags" in this._options ? !!this._options.lowerCaseTags : !this._options.xmlMode, 
        this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ? !!this._options.lowerCaseAttributeNames : !this._options.xmlMode, 
        this._options.Tokenizer && (s = this._options.Tokenizer), this._tokenizer = new s(this._options, this), 
        this._cbs.onparserinit && this._cbs.onparserinit(this);
    }
    r(70)(c, r(71).EventEmitter), c.prototype._updatePosition = function(t) {
        null === this.endIndex ? this._tokenizer._sectionStart <= t ? this.startIndex = 0 : this.startIndex = this._tokenizer._sectionStart - t : this.startIndex = this.endIndex + 1, 
        this.endIndex = this._tokenizer.getAbsoluteIndex();
    }, c.prototype.ontext = function(t) {
        this._updatePosition(1), this.endIndex--, this._cbs.ontext && this._cbs.ontext(t);
    }, c.prototype.onopentagname = function(t) {
        if (this._lowerCaseTagNames && (t = t.toLowerCase()), this._tagname = t, !this._options.xmlMode && t in o) for (var e; (e = this._stack[this._stack.length - 1]) in o[t]; this.onclosetag(e)) ;
        !this._options.xmlMode && t in n || this._stack.push(t), this._cbs.onopentagname && this._cbs.onopentagname(t), 
        this._cbs.onopentag && (this._attribs = {});
    }, c.prototype.onopentagend = function() {
        this._updatePosition(1), this._attribs && (this._cbs.onopentag && this._cbs.onopentag(this._tagname, this._attribs), 
        this._attribs = null), !this._options.xmlMode && this._cbs.onclosetag && this._tagname in n && this._cbs.onclosetag(this._tagname), 
        this._tagname = "";
    }, c.prototype.onclosetag = function(t) {
        if (this._updatePosition(1), this._lowerCaseTagNames && (t = t.toLowerCase()), !this._stack.length || t in n && !this._options.xmlMode) this._options.xmlMode || "br" !== t && "p" !== t || (this.onopentagname(t), 
        this._closeCurrentTag()); else {
            var e = this._stack.lastIndexOf(t);
            if (-1 !== e) if (this._cbs.onclosetag) for (e = this._stack.length - e; e--; ) this._cbs.onclosetag(this._stack.pop()); else this._stack.length = e; else "p" !== t || this._options.xmlMode || (this.onopentagname(t), 
            this._closeCurrentTag());
        }
    }, c.prototype.onselfclosingtag = function() {
        this._options.xmlMode || this._options.recognizeSelfClosing ? this._closeCurrentTag() : this.onopentagend();
    }, c.prototype._closeCurrentTag = function() {
        var t = this._tagname;
        this.onopentagend(), this._stack[this._stack.length - 1] === t && (this._cbs.onclosetag && this._cbs.onclosetag(t), 
        this._stack.pop());
    }, c.prototype.onattribname = function(t) {
        this._lowerCaseAttributeNames && (t = t.toLowerCase()), this._attribname = t;
    }, c.prototype.onattribdata = function(t) {
        this._attribvalue += t;
    }, c.prototype.onattribend = function() {
        this._cbs.onattribute && this._cbs.onattribute(this._attribname, this._attribvalue), 
        this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname) && (this._attribs[this._attribname] = this._attribvalue), 
        this._attribname = "", this._attribvalue = "";
    }, c.prototype._getInstructionName = function(t) {
        var e = t.search(a), r = e < 0 ? t : t.substr(0, e);
        return this._lowerCaseTagNames && (r = r.toLowerCase()), r;
    }, c.prototype.ondeclaration = function(t) {
        if (this._cbs.onprocessinginstruction) {
            var e = this._getInstructionName(t);
            this._cbs.onprocessinginstruction("!" + e, "!" + t);
        }
    }, c.prototype.onprocessinginstruction = function(t) {
        if (this._cbs.onprocessinginstruction) {
            var e = this._getInstructionName(t);
            this._cbs.onprocessinginstruction("?" + e, "?" + t);
        }
    }, c.prototype.oncomment = function(t) {
        this._updatePosition(4), this._cbs.oncomment && this._cbs.oncomment(t), this._cbs.oncommentend && this._cbs.oncommentend();
    }, c.prototype.oncdata = function(t) {
        this._updatePosition(1), this._options.xmlMode || this._options.recognizeCDATA ? (this._cbs.oncdatastart && this._cbs.oncdatastart(), 
        this._cbs.ontext && this._cbs.ontext(t), this._cbs.oncdataend && this._cbs.oncdataend()) : this.oncomment("[CDATA[" + t + "]]");
    }, c.prototype.onerror = function(t) {
        this._cbs.onerror && this._cbs.onerror(t);
    }, c.prototype.onend = function() {
        if (this._cbs.onclosetag) for (var t = this._stack.length; t > 0; this._cbs.onclosetag(this._stack[--t])) ;
        this._cbs.onend && this._cbs.onend();
    }, c.prototype.reset = function() {
        this._cbs.onreset && this._cbs.onreset(), this._tokenizer.reset(), this._tagname = "", 
        this._attribname = "", this._attribs = null, this._stack = [], this._cbs.onparserinit && this._cbs.onparserinit(this);
    }, c.prototype.parseComplete = function(t) {
        this.reset(), this.end(t);
    }, c.prototype.write = function(t) {
        this._tokenizer.write(t);
    }, c.prototype.end = function(t) {
        this._tokenizer.end(t);
    }, c.prototype.pause = function() {
        this._tokenizer.pause();
    }, c.prototype.resume = function() {
        this._tokenizer.resume();
    }, c.prototype.parseChunk = c.prototype.write, c.prototype.done = c.prototype.end, 
    t.exports = c;
}, function(t, e, r) {
    t.exports = bt;
    var s, i, o = r(65), n = r(67), a = r(68), c = r(69), u = 0, l = u++, h = u++, p = u++, _ = u++, f = u++, d = u++, g = u++, m = u++, b = u++, y = u++, S = u++, v = u++, E = u++, A = u++, w = u++, x = u++, C = u++, T = u++, q = u++, N = u++, L = u++, I = u++, O = u++, D = u++, R = u++, P = u++, k = u++, U = u++, B = u++, M = u++, V = u++, G = u++, H = u++, j = u++, z = u++, W = u++, F = u++, Y = u++, Q = u++, K = u++, Z = u++, J = u++, X = u++, $ = u++, tt = u++, et = u++, rt = u++, st = u++, it = u++, ot = u++, nt = u++, at = u++, ct = u++, ut = u++, lt = u++, ht = 0, pt = ht++, _t = ht++, ft = ht++;
    function dt(t) {
        return " " === t || "\n" === t || "\t" === t || "\f" === t || "\r" === t;
    }
    function gt(t, e, r) {
        var s = t.toLowerCase();
        return t === s ? function(t) {
            t === s ? this._state = e : (this._state = r, this._index--);
        } : function(i) {
            i === s || i === t ? this._state = e : (this._state = r, this._index--);
        };
    }
    function mt(t, e) {
        var r = t.toLowerCase();
        return function(s) {
            s === r || s === t ? this._state = e : (this._state = p, this._index--);
        };
    }
    function bt(t, e) {
        this._state = l, this._buffer = "", this._sectionStart = 0, this._index = 0, this._bufferOffset = 0, 
        this._baseState = l, this._special = pt, this._cbs = e, this._running = !0, this._ended = !1, 
        this._xmlMode = !(!t || !t.xmlMode), this._decodeEntities = !(!t || !t.decodeEntities);
    }
    bt.prototype._stateText = function(t) {
        "<" === t ? (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), 
        this._state = h, this._sectionStart = this._index) : this._decodeEntities && this._special === pt && "&" === t && (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), 
        this._baseState = l, this._state = nt, this._sectionStart = this._index);
    }, bt.prototype._stateBeforeTagName = function(t) {
        "/" === t ? this._state = f : "<" === t ? (this._cbs.ontext(this._getSection()), 
        this._sectionStart = this._index) : ">" === t || this._special !== pt || dt(t) ? this._state = l : "!" === t ? (this._state = w, 
        this._sectionStart = this._index + 1) : "?" === t ? (this._state = C, this._sectionStart = this._index + 1) : (this._state = this._xmlMode || "s" !== t && "S" !== t ? p : V, 
        this._sectionStart = this._index);
    }, bt.prototype._stateInTagName = function(t) {
        ("/" === t || ">" === t || dt(t)) && (this._emitToken("onopentagname"), this._state = m, 
        this._index--);
    }, bt.prototype._stateBeforeCloseingTagName = function(t) {
        dt(t) || (">" === t ? this._state = l : this._special !== pt ? "s" === t || "S" === t ? this._state = G : (this._state = l, 
        this._index--) : (this._state = d, this._sectionStart = this._index));
    }, bt.prototype._stateInCloseingTagName = function(t) {
        (">" === t || dt(t)) && (this._emitToken("onclosetag"), this._state = g, this._index--);
    }, bt.prototype._stateAfterCloseingTagName = function(t) {
        ">" === t && (this._state = l, this._sectionStart = this._index + 1);
    }, bt.prototype._stateBeforeAttributeName = function(t) {
        ">" === t ? (this._cbs.onopentagend(), this._state = l, this._sectionStart = this._index + 1) : "/" === t ? this._state = _ : dt(t) || (this._state = b, 
        this._sectionStart = this._index);
    }, bt.prototype._stateInSelfClosingTag = function(t) {
        ">" === t ? (this._cbs.onselfclosingtag(), this._state = l, this._sectionStart = this._index + 1) : dt(t) || (this._state = m, 
        this._index--);
    }, bt.prototype._stateInAttributeName = function(t) {
        ("=" === t || "/" === t || ">" === t || dt(t)) && (this._cbs.onattribname(this._getSection()), 
        this._sectionStart = -1, this._state = y, this._index--);
    }, bt.prototype._stateAfterAttributeName = function(t) {
        "=" === t ? this._state = S : "/" === t || ">" === t ? (this._cbs.onattribend(), 
        this._state = m, this._index--) : dt(t) || (this._cbs.onattribend(), this._state = b, 
        this._sectionStart = this._index);
    }, bt.prototype._stateBeforeAttributeValue = function(t) {
        '"' === t ? (this._state = v, this._sectionStart = this._index + 1) : "'" === t ? (this._state = E, 
        this._sectionStart = this._index + 1) : dt(t) || (this._state = A, this._sectionStart = this._index, 
        this._index--);
    }, bt.prototype._stateInAttributeValueDoubleQuotes = function(t) {
        '"' === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = m) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), 
        this._baseState = this._state, this._state = nt, this._sectionStart = this._index);
    }, bt.prototype._stateInAttributeValueSingleQuotes = function(t) {
        "'" === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = m) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), 
        this._baseState = this._state, this._state = nt, this._sectionStart = this._index);
    }, bt.prototype._stateInAttributeValueNoQuotes = function(t) {
        dt(t) || ">" === t ? (this._emitToken("onattribdata"), this._cbs.onattribend(), 
        this._state = m, this._index--) : this._decodeEntities && "&" === t && (this._emitToken("onattribdata"), 
        this._baseState = this._state, this._state = nt, this._sectionStart = this._index);
    }, bt.prototype._stateBeforeDeclaration = function(t) {
        this._state = "[" === t ? I : "-" === t ? T : x;
    }, bt.prototype._stateInDeclaration = function(t) {
        ">" === t && (this._cbs.ondeclaration(this._getSection()), this._state = l, this._sectionStart = this._index + 1);
    }, bt.prototype._stateInProcessingInstruction = function(t) {
        ">" === t && (this._cbs.onprocessinginstruction(this._getSection()), this._state = l, 
        this._sectionStart = this._index + 1);
    }, bt.prototype._stateBeforeComment = function(t) {
        "-" === t ? (this._state = q, this._sectionStart = this._index + 1) : this._state = x;
    }, bt.prototype._stateInComment = function(t) {
        "-" === t && (this._state = N);
    }, bt.prototype._stateAfterComment1 = function(t) {
        this._state = "-" === t ? L : q;
    }, bt.prototype._stateAfterComment2 = function(t) {
        ">" === t ? (this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2)), 
        this._state = l, this._sectionStart = this._index + 1) : "-" !== t && (this._state = q);
    }, bt.prototype._stateBeforeCdata1 = gt("C", O, x), bt.prototype._stateBeforeCdata2 = gt("D", D, x), 
    bt.prototype._stateBeforeCdata3 = gt("A", R, x), bt.prototype._stateBeforeCdata4 = gt("T", P, x), 
    bt.prototype._stateBeforeCdata5 = gt("A", k, x), bt.prototype._stateBeforeCdata6 = function(t) {
        "[" === t ? (this._state = U, this._sectionStart = this._index + 1) : (this._state = x, 
        this._index--);
    }, bt.prototype._stateInCdata = function(t) {
        "]" === t && (this._state = B);
    }, bt.prototype._stateAfterCdata1 = (s = "]", i = M, function(t) {
        t === s && (this._state = i);
    }), bt.prototype._stateAfterCdata2 = function(t) {
        ">" === t ? (this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2)), 
        this._state = l, this._sectionStart = this._index + 1) : "]" !== t && (this._state = U);
    }, bt.prototype._stateBeforeSpecial = function(t) {
        "c" === t || "C" === t ? this._state = H : "t" === t || "T" === t ? this._state = X : (this._state = p, 
        this._index--);
    }, bt.prototype._stateBeforeSpecialEnd = function(t) {
        this._special !== _t || "c" !== t && "C" !== t ? this._special !== ft || "t" !== t && "T" !== t ? this._state = l : this._state = rt : this._state = Y;
    }, bt.prototype._stateBeforeScript1 = mt("R", j), bt.prototype._stateBeforeScript2 = mt("I", z), 
    bt.prototype._stateBeforeScript3 = mt("P", W), bt.prototype._stateBeforeScript4 = mt("T", F), 
    bt.prototype._stateBeforeScript5 = function(t) {
        ("/" === t || ">" === t || dt(t)) && (this._special = _t), this._state = p, this._index--;
    }, bt.prototype._stateAfterScript1 = gt("R", Q, l), bt.prototype._stateAfterScript2 = gt("I", K, l), 
    bt.prototype._stateAfterScript3 = gt("P", Z, l), bt.prototype._stateAfterScript4 = gt("T", J, l), 
    bt.prototype._stateAfterScript5 = function(t) {
        ">" === t || dt(t) ? (this._special = pt, this._state = d, this._sectionStart = this._index - 6, 
        this._index--) : this._state = l;
    }, bt.prototype._stateBeforeStyle1 = mt("Y", $), bt.prototype._stateBeforeStyle2 = mt("L", tt), 
    bt.prototype._stateBeforeStyle3 = mt("E", et), bt.prototype._stateBeforeStyle4 = function(t) {
        ("/" === t || ">" === t || dt(t)) && (this._special = ft), this._state = p, this._index--;
    }, bt.prototype._stateAfterStyle1 = gt("Y", st, l), bt.prototype._stateAfterStyle2 = gt("L", it, l), 
    bt.prototype._stateAfterStyle3 = gt("E", ot, l), bt.prototype._stateAfterStyle4 = function(t) {
        ">" === t || dt(t) ? (this._special = pt, this._state = d, this._sectionStart = this._index - 5, 
        this._index--) : this._state = l;
    }, bt.prototype._stateBeforeEntity = gt("#", at, ct), bt.prototype._stateBeforeNumericEntity = gt("X", lt, ut), 
    bt.prototype._parseNamedEntityStrict = function() {
        if (this._sectionStart + 1 < this._index) {
            var t = this._buffer.substring(this._sectionStart + 1, this._index), e = this._xmlMode ? c : n;
            e.hasOwnProperty(t) && (this._emitPartial(e[t]), this._sectionStart = this._index + 1);
        }
    }, bt.prototype._parseLegacyEntity = function() {
        var t = this._sectionStart + 1, e = this._index - t;
        for (e > 6 && (e = 6); e >= 2; ) {
            var r = this._buffer.substr(t, e);
            if (a.hasOwnProperty(r)) return this._emitPartial(a[r]), void (this._sectionStart += e + 1);
            e--;
        }
    }, bt.prototype._stateInNamedEntity = function(t) {
        ";" === t ? (this._parseNamedEntityStrict(), this._sectionStart + 1 < this._index && !this._xmlMode && this._parseLegacyEntity(), 
        this._state = this._baseState) : (t < "a" || t > "z") && (t < "A" || t > "Z") && (t < "0" || t > "9") && (this._xmlMode || this._sectionStart + 1 === this._index || (this._baseState !== l ? "=" !== t && this._parseNamedEntityStrict() : this._parseLegacyEntity()), 
        this._state = this._baseState, this._index--);
    }, bt.prototype._decodeNumericEntity = function(t, e) {
        var r = this._sectionStart + t;
        if (r !== this._index) {
            var s = this._buffer.substring(r, this._index), i = parseInt(s, e);
            this._emitPartial(o(i)), this._sectionStart = this._index;
        } else this._sectionStart--;
        this._state = this._baseState;
    }, bt.prototype._stateInNumericEntity = function(t) {
        ";" === t ? (this._decodeNumericEntity(2, 10), this._sectionStart++) : (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(2, 10), 
        this._index--);
    }, bt.prototype._stateInHexEntity = function(t) {
        ";" === t ? (this._decodeNumericEntity(3, 16), this._sectionStart++) : (t < "a" || t > "f") && (t < "A" || t > "F") && (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(3, 16), 
        this._index--);
    }, bt.prototype._cleanup = function() {
        this._sectionStart < 0 ? (this._buffer = "", this._bufferOffset += this._index, 
        this._index = 0) : this._running && (this._state === l ? (this._sectionStart !== this._index && this._cbs.ontext(this._buffer.substr(this._sectionStart)), 
        this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._sectionStart === this._index ? (this._buffer = "", 
        this._bufferOffset += this._index, this._index = 0) : (this._buffer = this._buffer.substr(this._sectionStart), 
        this._index -= this._sectionStart, this._bufferOffset += this._sectionStart), this._sectionStart = 0);
    }, bt.prototype.write = function(t) {
        this._ended && this._cbs.onerror(Error(".write() after done!")), this._buffer += t, 
        this._parse();
    }, bt.prototype._parse = function() {
        for (;this._index < this._buffer.length && this._running; ) {
            var t = this._buffer.charAt(this._index);
            this._state === l ? this._stateText(t) : this._state === h ? this._stateBeforeTagName(t) : this._state === p ? this._stateInTagName(t) : this._state === f ? this._stateBeforeCloseingTagName(t) : this._state === d ? this._stateInCloseingTagName(t) : this._state === g ? this._stateAfterCloseingTagName(t) : this._state === _ ? this._stateInSelfClosingTag(t) : this._state === m ? this._stateBeforeAttributeName(t) : this._state === b ? this._stateInAttributeName(t) : this._state === y ? this._stateAfterAttributeName(t) : this._state === S ? this._stateBeforeAttributeValue(t) : this._state === v ? this._stateInAttributeValueDoubleQuotes(t) : this._state === E ? this._stateInAttributeValueSingleQuotes(t) : this._state === A ? this._stateInAttributeValueNoQuotes(t) : this._state === w ? this._stateBeforeDeclaration(t) : this._state === x ? this._stateInDeclaration(t) : this._state === C ? this._stateInProcessingInstruction(t) : this._state === T ? this._stateBeforeComment(t) : this._state === q ? this._stateInComment(t) : this._state === N ? this._stateAfterComment1(t) : this._state === L ? this._stateAfterComment2(t) : this._state === I ? this._stateBeforeCdata1(t) : this._state === O ? this._stateBeforeCdata2(t) : this._state === D ? this._stateBeforeCdata3(t) : this._state === R ? this._stateBeforeCdata4(t) : this._state === P ? this._stateBeforeCdata5(t) : this._state === k ? this._stateBeforeCdata6(t) : this._state === U ? this._stateInCdata(t) : this._state === B ? this._stateAfterCdata1(t) : this._state === M ? this._stateAfterCdata2(t) : this._state === V ? this._stateBeforeSpecial(t) : this._state === G ? this._stateBeforeSpecialEnd(t) : this._state === H ? this._stateBeforeScript1(t) : this._state === j ? this._stateBeforeScript2(t) : this._state === z ? this._stateBeforeScript3(t) : this._state === W ? this._stateBeforeScript4(t) : this._state === F ? this._stateBeforeScript5(t) : this._state === Y ? this._stateAfterScript1(t) : this._state === Q ? this._stateAfterScript2(t) : this._state === K ? this._stateAfterScript3(t) : this._state === Z ? this._stateAfterScript4(t) : this._state === J ? this._stateAfterScript5(t) : this._state === X ? this._stateBeforeStyle1(t) : this._state === $ ? this._stateBeforeStyle2(t) : this._state === tt ? this._stateBeforeStyle3(t) : this._state === et ? this._stateBeforeStyle4(t) : this._state === rt ? this._stateAfterStyle1(t) : this._state === st ? this._stateAfterStyle2(t) : this._state === it ? this._stateAfterStyle3(t) : this._state === ot ? this._stateAfterStyle4(t) : this._state === nt ? this._stateBeforeEntity(t) : this._state === at ? this._stateBeforeNumericEntity(t) : this._state === ct ? this._stateInNamedEntity(t) : this._state === ut ? this._stateInNumericEntity(t) : this._state === lt ? this._stateInHexEntity(t) : this._cbs.onerror(Error("unknown _state"), this._state), 
            this._index++;
        }
        this._cleanup();
    }, bt.prototype.pause = function() {
        this._running = !1;
    }, bt.prototype.resume = function() {
        this._running = !0, this._index < this._buffer.length && this._parse(), this._ended && this._finish();
    }, bt.prototype.end = function(t) {
        this._ended && this._cbs.onerror(Error(".end() after done!")), t && this.write(t), 
        this._ended = !0, this._running && this._finish();
    }, bt.prototype._finish = function() {
        this._sectionStart < this._index && this._handleTrailingData(), this._cbs.onend();
    }, bt.prototype._handleTrailingData = function() {
        var t = this._buffer.substr(this._sectionStart);
        this._state === U || this._state === B || this._state === M ? this._cbs.oncdata(t) : this._state === q || this._state === N || this._state === L ? this._cbs.oncomment(t) : this._state !== ct || this._xmlMode ? this._state !== ut || this._xmlMode ? this._state !== lt || this._xmlMode ? this._state !== p && this._state !== m && this._state !== S && this._state !== y && this._state !== b && this._state !== E && this._state !== v && this._state !== A && this._state !== d && this._cbs.ontext(t) : (this._decodeNumericEntity(3, 16), 
        this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : (this._decodeNumericEntity(2, 10), 
        this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : (this._parseLegacyEntity(), 
        this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData()));
    }, bt.prototype.reset = function() {
        bt.call(this, {
            xmlMode: this._xmlMode,
            decodeEntities: this._decodeEntities
        }, this._cbs);
    }, bt.prototype.getAbsoluteIndex = function() {
        return this._bufferOffset + this._index;
    }, bt.prototype._getSection = function() {
        return this._buffer.substring(this._sectionStart, this._index);
    }, bt.prototype._emitToken = function(t) {
        this._cbs[t](this._getSection()), this._sectionStart = -1;
    }, bt.prototype._emitPartial = function(t) {
        this._baseState !== l ? this._cbs.onattribdata(t) : this._cbs.ontext(t);
    };
}, function(t, e, r) {
    var s = r(66);
    t.exports = function(t) {
        if (t >= 55296 && t <= 57343 || t > 1114111) return "�";
        t in s && (t = s[t]);
        var e = "";
        t > 65535 && (t -= 65536, e += String.fromCharCode(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t);
        return e += String.fromCharCode(t);
    };
}, function(t, e) {
    t.exports = {
        0: 65533,
        128: 8364,
        130: 8218,
        131: 402,
        132: 8222,
        133: 8230,
        134: 8224,
        135: 8225,
        136: 710,
        137: 8240,
        138: 352,
        139: 8249,
        140: 338,
        142: 381,
        145: 8216,
        146: 8217,
        147: 8220,
        148: 8221,
        149: 8226,
        150: 8211,
        151: 8212,
        152: 732,
        153: 8482,
        154: 353,
        155: 8250,
        156: 339,
        158: 382,
        159: 376
    };
}, function(t, e) {
    t.exports = {
        Aacute: "Á",
        aacute: "á",
        Abreve: "Ă",
        abreve: "ă",
        ac: "∾",
        acd: "∿",
        acE: "∾̳",
        Acirc: "Â",
        acirc: "â",
        acute: "´",
        Acy: "А",
        acy: "а",
        AElig: "Æ",
        aelig: "æ",
        af: "⁡",
        Afr: "𝔄",
        afr: "𝔞",
        Agrave: "À",
        agrave: "à",
        alefsym: "ℵ",
        aleph: "ℵ",
        Alpha: "Α",
        alpha: "α",
        Amacr: "Ā",
        amacr: "ā",
        amalg: "⨿",
        amp: "&",
        AMP: "&",
        andand: "⩕",
        And: "⩓",
        and: "∧",
        andd: "⩜",
        andslope: "⩘",
        andv: "⩚",
        ang: "∠",
        ange: "⦤",
        angle: "∠",
        angmsdaa: "⦨",
        angmsdab: "⦩",
        angmsdac: "⦪",
        angmsdad: "⦫",
        angmsdae: "⦬",
        angmsdaf: "⦭",
        angmsdag: "⦮",
        angmsdah: "⦯",
        angmsd: "∡",
        angrt: "∟",
        angrtvb: "⊾",
        angrtvbd: "⦝",
        angsph: "∢",
        angst: "Å",
        angzarr: "⍼",
        Aogon: "Ą",
        aogon: "ą",
        Aopf: "𝔸",
        aopf: "𝕒",
        apacir: "⩯",
        ap: "≈",
        apE: "⩰",
        ape: "≊",
        apid: "≋",
        apos: "'",
        ApplyFunction: "⁡",
        approx: "≈",
        approxeq: "≊",
        Aring: "Å",
        aring: "å",
        Ascr: "𝒜",
        ascr: "𝒶",
        Assign: "≔",
        ast: "*",
        asymp: "≈",
        asympeq: "≍",
        Atilde: "Ã",
        atilde: "ã",
        Auml: "Ä",
        auml: "ä",
        awconint: "∳",
        awint: "⨑",
        backcong: "≌",
        backepsilon: "϶",
        backprime: "‵",
        backsim: "∽",
        backsimeq: "⋍",
        Backslash: "∖",
        Barv: "⫧",
        barvee: "⊽",
        barwed: "⌅",
        Barwed: "⌆",
        barwedge: "⌅",
        bbrk: "⎵",
        bbrktbrk: "⎶",
        bcong: "≌",
        Bcy: "Б",
        bcy: "б",
        bdquo: "„",
        becaus: "∵",
        because: "∵",
        Because: "∵",
        bemptyv: "⦰",
        bepsi: "϶",
        bernou: "ℬ",
        Bernoullis: "ℬ",
        Beta: "Β",
        beta: "β",
        beth: "ℶ",
        between: "≬",
        Bfr: "𝔅",
        bfr: "𝔟",
        bigcap: "⋂",
        bigcirc: "◯",
        bigcup: "⋃",
        bigodot: "⨀",
        bigoplus: "⨁",
        bigotimes: "⨂",
        bigsqcup: "⨆",
        bigstar: "★",
        bigtriangledown: "▽",
        bigtriangleup: "△",
        biguplus: "⨄",
        bigvee: "⋁",
        bigwedge: "⋀",
        bkarow: "⤍",
        blacklozenge: "⧫",
        blacksquare: "▪",
        blacktriangle: "▴",
        blacktriangledown: "▾",
        blacktriangleleft: "◂",
        blacktriangleright: "▸",
        blank: "␣",
        blk12: "▒",
        blk14: "░",
        blk34: "▓",
        block: "█",
        bne: "=⃥",
        bnequiv: "≡⃥",
        bNot: "⫭",
        bnot: "⌐",
        Bopf: "𝔹",
        bopf: "𝕓",
        bot: "⊥",
        bottom: "⊥",
        bowtie: "⋈",
        boxbox: "⧉",
        boxdl: "┐",
        boxdL: "╕",
        boxDl: "╖",
        boxDL: "╗",
        boxdr: "┌",
        boxdR: "╒",
        boxDr: "╓",
        boxDR: "╔",
        boxh: "─",
        boxH: "═",
        boxhd: "┬",
        boxHd: "╤",
        boxhD: "╥",
        boxHD: "╦",
        boxhu: "┴",
        boxHu: "╧",
        boxhU: "╨",
        boxHU: "╩",
        boxminus: "⊟",
        boxplus: "⊞",
        boxtimes: "⊠",
        boxul: "┘",
        boxuL: "╛",
        boxUl: "╜",
        boxUL: "╝",
        boxur: "└",
        boxuR: "╘",
        boxUr: "╙",
        boxUR: "╚",
        boxv: "│",
        boxV: "║",
        boxvh: "┼",
        boxvH: "╪",
        boxVh: "╫",
        boxVH: "╬",
        boxvl: "┤",
        boxvL: "╡",
        boxVl: "╢",
        boxVL: "╣",
        boxvr: "├",
        boxvR: "╞",
        boxVr: "╟",
        boxVR: "╠",
        bprime: "‵",
        breve: "˘",
        Breve: "˘",
        brvbar: "¦",
        bscr: "𝒷",
        Bscr: "ℬ",
        bsemi: "⁏",
        bsim: "∽",
        bsime: "⋍",
        bsolb: "⧅",
        bsol: "\\",
        bsolhsub: "⟈",
        bull: "•",
        bullet: "•",
        bump: "≎",
        bumpE: "⪮",
        bumpe: "≏",
        Bumpeq: "≎",
        bumpeq: "≏",
        Cacute: "Ć",
        cacute: "ć",
        capand: "⩄",
        capbrcup: "⩉",
        capcap: "⩋",
        cap: "∩",
        Cap: "⋒",
        capcup: "⩇",
        capdot: "⩀",
        CapitalDifferentialD: "ⅅ",
        caps: "∩︀",
        caret: "⁁",
        caron: "ˇ",
        Cayleys: "ℭ",
        ccaps: "⩍",
        Ccaron: "Č",
        ccaron: "č",
        Ccedil: "Ç",
        ccedil: "ç",
        Ccirc: "Ĉ",
        ccirc: "ĉ",
        Cconint: "∰",
        ccups: "⩌",
        ccupssm: "⩐",
        Cdot: "Ċ",
        cdot: "ċ",
        cedil: "¸",
        Cedilla: "¸",
        cemptyv: "⦲",
        cent: "¢",
        centerdot: "·",
        CenterDot: "·",
        cfr: "𝔠",
        Cfr: "ℭ",
        CHcy: "Ч",
        chcy: "ч",
        check: "✓",
        checkmark: "✓",
        Chi: "Χ",
        chi: "χ",
        circ: "ˆ",
        circeq: "≗",
        circlearrowleft: "↺",
        circlearrowright: "↻",
        circledast: "⊛",
        circledcirc: "⊚",
        circleddash: "⊝",
        CircleDot: "⊙",
        circledR: "®",
        circledS: "Ⓢ",
        CircleMinus: "⊖",
        CirclePlus: "⊕",
        CircleTimes: "⊗",
        cir: "○",
        cirE: "⧃",
        cire: "≗",
        cirfnint: "⨐",
        cirmid: "⫯",
        cirscir: "⧂",
        ClockwiseContourIntegral: "∲",
        CloseCurlyDoubleQuote: "”",
        CloseCurlyQuote: "’",
        clubs: "♣",
        clubsuit: "♣",
        colon: ":",
        Colon: "∷",
        Colone: "⩴",
        colone: "≔",
        coloneq: "≔",
        comma: ",",
        commat: "@",
        comp: "∁",
        compfn: "∘",
        complement: "∁",
        complexes: "ℂ",
        cong: "≅",
        congdot: "⩭",
        Congruent: "≡",
        conint: "∮",
        Conint: "∯",
        ContourIntegral: "∮",
        copf: "𝕔",
        Copf: "ℂ",
        coprod: "∐",
        Coproduct: "∐",
        copy: "©",
        COPY: "©",
        copysr: "℗",
        CounterClockwiseContourIntegral: "∳",
        crarr: "↵",
        cross: "✗",
        Cross: "⨯",
        Cscr: "𝒞",
        cscr: "𝒸",
        csub: "⫏",
        csube: "⫑",
        csup: "⫐",
        csupe: "⫒",
        ctdot: "⋯",
        cudarrl: "⤸",
        cudarrr: "⤵",
        cuepr: "⋞",
        cuesc: "⋟",
        cularr: "↶",
        cularrp: "⤽",
        cupbrcap: "⩈",
        cupcap: "⩆",
        CupCap: "≍",
        cup: "∪",
        Cup: "⋓",
        cupcup: "⩊",
        cupdot: "⊍",
        cupor: "⩅",
        cups: "∪︀",
        curarr: "↷",
        curarrm: "⤼",
        curlyeqprec: "⋞",
        curlyeqsucc: "⋟",
        curlyvee: "⋎",
        curlywedge: "⋏",
        curren: "¤",
        curvearrowleft: "↶",
        curvearrowright: "↷",
        cuvee: "⋎",
        cuwed: "⋏",
        cwconint: "∲",
        cwint: "∱",
        cylcty: "⌭",
        dagger: "†",
        Dagger: "‡",
        daleth: "ℸ",
        darr: "↓",
        Darr: "↡",
        dArr: "⇓",
        dash: "‐",
        Dashv: "⫤",
        dashv: "⊣",
        dbkarow: "⤏",
        dblac: "˝",
        Dcaron: "Ď",
        dcaron: "ď",
        Dcy: "Д",
        dcy: "д",
        ddagger: "‡",
        ddarr: "⇊",
        DD: "ⅅ",
        dd: "ⅆ",
        DDotrahd: "⤑",
        ddotseq: "⩷",
        deg: "°",
        Del: "∇",
        Delta: "Δ",
        delta: "δ",
        demptyv: "⦱",
        dfisht: "⥿",
        Dfr: "𝔇",
        dfr: "𝔡",
        dHar: "⥥",
        dharl: "⇃",
        dharr: "⇂",
        DiacriticalAcute: "´",
        DiacriticalDot: "˙",
        DiacriticalDoubleAcute: "˝",
        DiacriticalGrave: "`",
        DiacriticalTilde: "˜",
        diam: "⋄",
        diamond: "⋄",
        Diamond: "⋄",
        diamondsuit: "♦",
        diams: "♦",
        die: "¨",
        DifferentialD: "ⅆ",
        digamma: "ϝ",
        disin: "⋲",
        div: "÷",
        divide: "÷",
        divideontimes: "⋇",
        divonx: "⋇",
        DJcy: "Ђ",
        djcy: "ђ",
        dlcorn: "⌞",
        dlcrop: "⌍",
        dollar: "$",
        Dopf: "𝔻",
        dopf: "𝕕",
        Dot: "¨",
        dot: "˙",
        DotDot: "⃜",
        doteq: "≐",
        doteqdot: "≑",
        DotEqual: "≐",
        dotminus: "∸",
        dotplus: "∔",
        dotsquare: "⊡",
        doublebarwedge: "⌆",
        DoubleContourIntegral: "∯",
        DoubleDot: "¨",
        DoubleDownArrow: "⇓",
        DoubleLeftArrow: "⇐",
        DoubleLeftRightArrow: "⇔",
        DoubleLeftTee: "⫤",
        DoubleLongLeftArrow: "⟸",
        DoubleLongLeftRightArrow: "⟺",
        DoubleLongRightArrow: "⟹",
        DoubleRightArrow: "⇒",
        DoubleRightTee: "⊨",
        DoubleUpArrow: "⇑",
        DoubleUpDownArrow: "⇕",
        DoubleVerticalBar: "∥",
        DownArrowBar: "⤓",
        downarrow: "↓",
        DownArrow: "↓",
        Downarrow: "⇓",
        DownArrowUpArrow: "⇵",
        DownBreve: "̑",
        downdownarrows: "⇊",
        downharpoonleft: "⇃",
        downharpoonright: "⇂",
        DownLeftRightVector: "⥐",
        DownLeftTeeVector: "⥞",
        DownLeftVectorBar: "⥖",
        DownLeftVector: "↽",
        DownRightTeeVector: "⥟",
        DownRightVectorBar: "⥗",
        DownRightVector: "⇁",
        DownTeeArrow: "↧",
        DownTee: "⊤",
        drbkarow: "⤐",
        drcorn: "⌟",
        drcrop: "⌌",
        Dscr: "𝒟",
        dscr: "𝒹",
        DScy: "Ѕ",
        dscy: "ѕ",
        dsol: "⧶",
        Dstrok: "Đ",
        dstrok: "đ",
        dtdot: "⋱",
        dtri: "▿",
        dtrif: "▾",
        duarr: "⇵",
        duhar: "⥯",
        dwangle: "⦦",
        DZcy: "Џ",
        dzcy: "џ",
        dzigrarr: "⟿",
        Eacute: "É",
        eacute: "é",
        easter: "⩮",
        Ecaron: "Ě",
        ecaron: "ě",
        Ecirc: "Ê",
        ecirc: "ê",
        ecir: "≖",
        ecolon: "≕",
        Ecy: "Э",
        ecy: "э",
        eDDot: "⩷",
        Edot: "Ė",
        edot: "ė",
        eDot: "≑",
        ee: "ⅇ",
        efDot: "≒",
        Efr: "𝔈",
        efr: "𝔢",
        eg: "⪚",
        Egrave: "È",
        egrave: "è",
        egs: "⪖",
        egsdot: "⪘",
        el: "⪙",
        Element: "∈",
        elinters: "⏧",
        ell: "ℓ",
        els: "⪕",
        elsdot: "⪗",
        Emacr: "Ē",
        emacr: "ē",
        empty: "∅",
        emptyset: "∅",
        EmptySmallSquare: "◻",
        emptyv: "∅",
        EmptyVerySmallSquare: "▫",
        emsp13: " ",
        emsp14: " ",
        emsp: " ",
        ENG: "Ŋ",
        eng: "ŋ",
        ensp: " ",
        Eogon: "Ę",
        eogon: "ę",
        Eopf: "𝔼",
        eopf: "𝕖",
        epar: "⋕",
        eparsl: "⧣",
        eplus: "⩱",
        epsi: "ε",
        Epsilon: "Ε",
        epsilon: "ε",
        epsiv: "ϵ",
        eqcirc: "≖",
        eqcolon: "≕",
        eqsim: "≂",
        eqslantgtr: "⪖",
        eqslantless: "⪕",
        Equal: "⩵",
        equals: "=",
        EqualTilde: "≂",
        equest: "≟",
        Equilibrium: "⇌",
        equiv: "≡",
        equivDD: "⩸",
        eqvparsl: "⧥",
        erarr: "⥱",
        erDot: "≓",
        escr: "ℯ",
        Escr: "ℰ",
        esdot: "≐",
        Esim: "⩳",
        esim: "≂",
        Eta: "Η",
        eta: "η",
        ETH: "Ð",
        eth: "ð",
        Euml: "Ë",
        euml: "ë",
        euro: "€",
        excl: "!",
        exist: "∃",
        Exists: "∃",
        expectation: "ℰ",
        exponentiale: "ⅇ",
        ExponentialE: "ⅇ",
        fallingdotseq: "≒",
        Fcy: "Ф",
        fcy: "ф",
        female: "♀",
        ffilig: "ﬃ",
        fflig: "ﬀ",
        ffllig: "ﬄ",
        Ffr: "𝔉",
        ffr: "𝔣",
        filig: "ﬁ",
        FilledSmallSquare: "◼",
        FilledVerySmallSquare: "▪",
        fjlig: "fj",
        flat: "♭",
        fllig: "ﬂ",
        fltns: "▱",
        fnof: "ƒ",
        Fopf: "𝔽",
        fopf: "𝕗",
        forall: "∀",
        ForAll: "∀",
        fork: "⋔",
        forkv: "⫙",
        Fouriertrf: "ℱ",
        fpartint: "⨍",
        frac12: "½",
        frac13: "⅓",
        frac14: "¼",
        frac15: "⅕",
        frac16: "⅙",
        frac18: "⅛",
        frac23: "⅔",
        frac25: "⅖",
        frac34: "¾",
        frac35: "⅗",
        frac38: "⅜",
        frac45: "⅘",
        frac56: "⅚",
        frac58: "⅝",
        frac78: "⅞",
        frasl: "⁄",
        frown: "⌢",
        fscr: "𝒻",
        Fscr: "ℱ",
        gacute: "ǵ",
        Gamma: "Γ",
        gamma: "γ",
        Gammad: "Ϝ",
        gammad: "ϝ",
        gap: "⪆",
        Gbreve: "Ğ",
        gbreve: "ğ",
        Gcedil: "Ģ",
        Gcirc: "Ĝ",
        gcirc: "ĝ",
        Gcy: "Г",
        gcy: "г",
        Gdot: "Ġ",
        gdot: "ġ",
        ge: "≥",
        gE: "≧",
        gEl: "⪌",
        gel: "⋛",
        geq: "≥",
        geqq: "≧",
        geqslant: "⩾",
        gescc: "⪩",
        ges: "⩾",
        gesdot: "⪀",
        gesdoto: "⪂",
        gesdotol: "⪄",
        gesl: "⋛︀",
        gesles: "⪔",
        Gfr: "𝔊",
        gfr: "𝔤",
        gg: "≫",
        Gg: "⋙",
        ggg: "⋙",
        gimel: "ℷ",
        GJcy: "Ѓ",
        gjcy: "ѓ",
        gla: "⪥",
        gl: "≷",
        glE: "⪒",
        glj: "⪤",
        gnap: "⪊",
        gnapprox: "⪊",
        gne: "⪈",
        gnE: "≩",
        gneq: "⪈",
        gneqq: "≩",
        gnsim: "⋧",
        Gopf: "𝔾",
        gopf: "𝕘",
        grave: "`",
        GreaterEqual: "≥",
        GreaterEqualLess: "⋛",
        GreaterFullEqual: "≧",
        GreaterGreater: "⪢",
        GreaterLess: "≷",
        GreaterSlantEqual: "⩾",
        GreaterTilde: "≳",
        Gscr: "𝒢",
        gscr: "ℊ",
        gsim: "≳",
        gsime: "⪎",
        gsiml: "⪐",
        gtcc: "⪧",
        gtcir: "⩺",
        gt: ">",
        GT: ">",
        Gt: "≫",
        gtdot: "⋗",
        gtlPar: "⦕",
        gtquest: "⩼",
        gtrapprox: "⪆",
        gtrarr: "⥸",
        gtrdot: "⋗",
        gtreqless: "⋛",
        gtreqqless: "⪌",
        gtrless: "≷",
        gtrsim: "≳",
        gvertneqq: "≩︀",
        gvnE: "≩︀",
        Hacek: "ˇ",
        hairsp: " ",
        half: "½",
        hamilt: "ℋ",
        HARDcy: "Ъ",
        hardcy: "ъ",
        harrcir: "⥈",
        harr: "↔",
        hArr: "⇔",
        harrw: "↭",
        Hat: "^",
        hbar: "ℏ",
        Hcirc: "Ĥ",
        hcirc: "ĥ",
        hearts: "♥",
        heartsuit: "♥",
        hellip: "…",
        hercon: "⊹",
        hfr: "𝔥",
        Hfr: "ℌ",
        HilbertSpace: "ℋ",
        hksearow: "⤥",
        hkswarow: "⤦",
        hoarr: "⇿",
        homtht: "∻",
        hookleftarrow: "↩",
        hookrightarrow: "↪",
        hopf: "𝕙",
        Hopf: "ℍ",
        horbar: "―",
        HorizontalLine: "─",
        hscr: "𝒽",
        Hscr: "ℋ",
        hslash: "ℏ",
        Hstrok: "Ħ",
        hstrok: "ħ",
        HumpDownHump: "≎",
        HumpEqual: "≏",
        hybull: "⁃",
        hyphen: "‐",
        Iacute: "Í",
        iacute: "í",
        ic: "⁣",
        Icirc: "Î",
        icirc: "î",
        Icy: "И",
        icy: "и",
        Idot: "İ",
        IEcy: "Е",
        iecy: "е",
        iexcl: "¡",
        iff: "⇔",
        ifr: "𝔦",
        Ifr: "ℑ",
        Igrave: "Ì",
        igrave: "ì",
        ii: "ⅈ",
        iiiint: "⨌",
        iiint: "∭",
        iinfin: "⧜",
        iiota: "℩",
        IJlig: "Ĳ",
        ijlig: "ĳ",
        Imacr: "Ī",
        imacr: "ī",
        image: "ℑ",
        ImaginaryI: "ⅈ",
        imagline: "ℐ",
        imagpart: "ℑ",
        imath: "ı",
        Im: "ℑ",
        imof: "⊷",
        imped: "Ƶ",
        Implies: "⇒",
        incare: "℅",
        in: "∈",
        infin: "∞",
        infintie: "⧝",
        inodot: "ı",
        intcal: "⊺",
        int: "∫",
        Int: "∬",
        integers: "ℤ",
        Integral: "∫",
        intercal: "⊺",
        Intersection: "⋂",
        intlarhk: "⨗",
        intprod: "⨼",
        InvisibleComma: "⁣",
        InvisibleTimes: "⁢",
        IOcy: "Ё",
        iocy: "ё",
        Iogon: "Į",
        iogon: "į",
        Iopf: "𝕀",
        iopf: "𝕚",
        Iota: "Ι",
        iota: "ι",
        iprod: "⨼",
        iquest: "¿",
        iscr: "𝒾",
        Iscr: "ℐ",
        isin: "∈",
        isindot: "⋵",
        isinE: "⋹",
        isins: "⋴",
        isinsv: "⋳",
        isinv: "∈",
        it: "⁢",
        Itilde: "Ĩ",
        itilde: "ĩ",
        Iukcy: "І",
        iukcy: "і",
        Iuml: "Ï",
        iuml: "ï",
        Jcirc: "Ĵ",
        jcirc: "ĵ",
        Jcy: "Й",
        jcy: "й",
        Jfr: "𝔍",
        jfr: "𝔧",
        jmath: "ȷ",
        Jopf: "𝕁",
        jopf: "𝕛",
        Jscr: "𝒥",
        jscr: "𝒿",
        Jsercy: "Ј",
        jsercy: "ј",
        Jukcy: "Є",
        jukcy: "є",
        Kappa: "Κ",
        kappa: "κ",
        kappav: "ϰ",
        Kcedil: "Ķ",
        kcedil: "ķ",
        Kcy: "К",
        kcy: "к",
        Kfr: "𝔎",
        kfr: "𝔨",
        kgreen: "ĸ",
        KHcy: "Х",
        khcy: "х",
        KJcy: "Ќ",
        kjcy: "ќ",
        Kopf: "𝕂",
        kopf: "𝕜",
        Kscr: "𝒦",
        kscr: "𝓀",
        lAarr: "⇚",
        Lacute: "Ĺ",
        lacute: "ĺ",
        laemptyv: "⦴",
        lagran: "ℒ",
        Lambda: "Λ",
        lambda: "λ",
        lang: "⟨",
        Lang: "⟪",
        langd: "⦑",
        langle: "⟨",
        lap: "⪅",
        Laplacetrf: "ℒ",
        laquo: "«",
        larrb: "⇤",
        larrbfs: "⤟",
        larr: "←",
        Larr: "↞",
        lArr: "⇐",
        larrfs: "⤝",
        larrhk: "↩",
        larrlp: "↫",
        larrpl: "⤹",
        larrsim: "⥳",
        larrtl: "↢",
        latail: "⤙",
        lAtail: "⤛",
        lat: "⪫",
        late: "⪭",
        lates: "⪭︀",
        lbarr: "⤌",
        lBarr: "⤎",
        lbbrk: "❲",
        lbrace: "{",
        lbrack: "[",
        lbrke: "⦋",
        lbrksld: "⦏",
        lbrkslu: "⦍",
        Lcaron: "Ľ",
        lcaron: "ľ",
        Lcedil: "Ļ",
        lcedil: "ļ",
        lceil: "⌈",
        lcub: "{",
        Lcy: "Л",
        lcy: "л",
        ldca: "⤶",
        ldquo: "“",
        ldquor: "„",
        ldrdhar: "⥧",
        ldrushar: "⥋",
        ldsh: "↲",
        le: "≤",
        lE: "≦",
        LeftAngleBracket: "⟨",
        LeftArrowBar: "⇤",
        leftarrow: "←",
        LeftArrow: "←",
        Leftarrow: "⇐",
        LeftArrowRightArrow: "⇆",
        leftarrowtail: "↢",
        LeftCeiling: "⌈",
        LeftDoubleBracket: "⟦",
        LeftDownTeeVector: "⥡",
        LeftDownVectorBar: "⥙",
        LeftDownVector: "⇃",
        LeftFloor: "⌊",
        leftharpoondown: "↽",
        leftharpoonup: "↼",
        leftleftarrows: "⇇",
        leftrightarrow: "↔",
        LeftRightArrow: "↔",
        Leftrightarrow: "⇔",
        leftrightarrows: "⇆",
        leftrightharpoons: "⇋",
        leftrightsquigarrow: "↭",
        LeftRightVector: "⥎",
        LeftTeeArrow: "↤",
        LeftTee: "⊣",
        LeftTeeVector: "⥚",
        leftthreetimes: "⋋",
        LeftTriangleBar: "⧏",
        LeftTriangle: "⊲",
        LeftTriangleEqual: "⊴",
        LeftUpDownVector: "⥑",
        LeftUpTeeVector: "⥠",
        LeftUpVectorBar: "⥘",
        LeftUpVector: "↿",
        LeftVectorBar: "⥒",
        LeftVector: "↼",
        lEg: "⪋",
        leg: "⋚",
        leq: "≤",
        leqq: "≦",
        leqslant: "⩽",
        lescc: "⪨",
        les: "⩽",
        lesdot: "⩿",
        lesdoto: "⪁",
        lesdotor: "⪃",
        lesg: "⋚︀",
        lesges: "⪓",
        lessapprox: "⪅",
        lessdot: "⋖",
        lesseqgtr: "⋚",
        lesseqqgtr: "⪋",
        LessEqualGreater: "⋚",
        LessFullEqual: "≦",
        LessGreater: "≶",
        lessgtr: "≶",
        LessLess: "⪡",
        lesssim: "≲",
        LessSlantEqual: "⩽",
        LessTilde: "≲",
        lfisht: "⥼",
        lfloor: "⌊",
        Lfr: "𝔏",
        lfr: "𝔩",
        lg: "≶",
        lgE: "⪑",
        lHar: "⥢",
        lhard: "↽",
        lharu: "↼",
        lharul: "⥪",
        lhblk: "▄",
        LJcy: "Љ",
        ljcy: "љ",
        llarr: "⇇",
        ll: "≪",
        Ll: "⋘",
        llcorner: "⌞",
        Lleftarrow: "⇚",
        llhard: "⥫",
        lltri: "◺",
        Lmidot: "Ŀ",
        lmidot: "ŀ",
        lmoustache: "⎰",
        lmoust: "⎰",
        lnap: "⪉",
        lnapprox: "⪉",
        lne: "⪇",
        lnE: "≨",
        lneq: "⪇",
        lneqq: "≨",
        lnsim: "⋦",
        loang: "⟬",
        loarr: "⇽",
        lobrk: "⟦",
        longleftarrow: "⟵",
        LongLeftArrow: "⟵",
        Longleftarrow: "⟸",
        longleftrightarrow: "⟷",
        LongLeftRightArrow: "⟷",
        Longleftrightarrow: "⟺",
        longmapsto: "⟼",
        longrightarrow: "⟶",
        LongRightArrow: "⟶",
        Longrightarrow: "⟹",
        looparrowleft: "↫",
        looparrowright: "↬",
        lopar: "⦅",
        Lopf: "𝕃",
        lopf: "𝕝",
        loplus: "⨭",
        lotimes: "⨴",
        lowast: "∗",
        lowbar: "_",
        LowerLeftArrow: "↙",
        LowerRightArrow: "↘",
        loz: "◊",
        lozenge: "◊",
        lozf: "⧫",
        lpar: "(",
        lparlt: "⦓",
        lrarr: "⇆",
        lrcorner: "⌟",
        lrhar: "⇋",
        lrhard: "⥭",
        lrm: "‎",
        lrtri: "⊿",
        lsaquo: "‹",
        lscr: "𝓁",
        Lscr: "ℒ",
        lsh: "↰",
        Lsh: "↰",
        lsim: "≲",
        lsime: "⪍",
        lsimg: "⪏",
        lsqb: "[",
        lsquo: "‘",
        lsquor: "‚",
        Lstrok: "Ł",
        lstrok: "ł",
        ltcc: "⪦",
        ltcir: "⩹",
        lt: "<",
        LT: "<",
        Lt: "≪",
        ltdot: "⋖",
        lthree: "⋋",
        ltimes: "⋉",
        ltlarr: "⥶",
        ltquest: "⩻",
        ltri: "◃",
        ltrie: "⊴",
        ltrif: "◂",
        ltrPar: "⦖",
        lurdshar: "⥊",
        luruhar: "⥦",
        lvertneqq: "≨︀",
        lvnE: "≨︀",
        macr: "¯",
        male: "♂",
        malt: "✠",
        maltese: "✠",
        Map: "⤅",
        map: "↦",
        mapsto: "↦",
        mapstodown: "↧",
        mapstoleft: "↤",
        mapstoup: "↥",
        marker: "▮",
        mcomma: "⨩",
        Mcy: "М",
        mcy: "м",
        mdash: "—",
        mDDot: "∺",
        measuredangle: "∡",
        MediumSpace: " ",
        Mellintrf: "ℳ",
        Mfr: "𝔐",
        mfr: "𝔪",
        mho: "℧",
        micro: "µ",
        midast: "*",
        midcir: "⫰",
        mid: "∣",
        middot: "·",
        minusb: "⊟",
        minus: "−",
        minusd: "∸",
        minusdu: "⨪",
        MinusPlus: "∓",
        mlcp: "⫛",
        mldr: "…",
        mnplus: "∓",
        models: "⊧",
        Mopf: "𝕄",
        mopf: "𝕞",
        mp: "∓",
        mscr: "𝓂",
        Mscr: "ℳ",
        mstpos: "∾",
        Mu: "Μ",
        mu: "μ",
        multimap: "⊸",
        mumap: "⊸",
        nabla: "∇",
        Nacute: "Ń",
        nacute: "ń",
        nang: "∠⃒",
        nap: "≉",
        napE: "⩰̸",
        napid: "≋̸",
        napos: "ŉ",
        napprox: "≉",
        natural: "♮",
        naturals: "ℕ",
        natur: "♮",
        nbsp: " ",
        nbump: "≎̸",
        nbumpe: "≏̸",
        ncap: "⩃",
        Ncaron: "Ň",
        ncaron: "ň",
        Ncedil: "Ņ",
        ncedil: "ņ",
        ncong: "≇",
        ncongdot: "⩭̸",
        ncup: "⩂",
        Ncy: "Н",
        ncy: "н",
        ndash: "–",
        nearhk: "⤤",
        nearr: "↗",
        neArr: "⇗",
        nearrow: "↗",
        ne: "≠",
        nedot: "≐̸",
        NegativeMediumSpace: "​",
        NegativeThickSpace: "​",
        NegativeThinSpace: "​",
        NegativeVeryThinSpace: "​",
        nequiv: "≢",
        nesear: "⤨",
        nesim: "≂̸",
        NestedGreaterGreater: "≫",
        NestedLessLess: "≪",
        NewLine: "\n",
        nexist: "∄",
        nexists: "∄",
        Nfr: "𝔑",
        nfr: "𝔫",
        ngE: "≧̸",
        nge: "≱",
        ngeq: "≱",
        ngeqq: "≧̸",
        ngeqslant: "⩾̸",
        nges: "⩾̸",
        nGg: "⋙̸",
        ngsim: "≵",
        nGt: "≫⃒",
        ngt: "≯",
        ngtr: "≯",
        nGtv: "≫̸",
        nharr: "↮",
        nhArr: "⇎",
        nhpar: "⫲",
        ni: "∋",
        nis: "⋼",
        nisd: "⋺",
        niv: "∋",
        NJcy: "Њ",
        njcy: "њ",
        nlarr: "↚",
        nlArr: "⇍",
        nldr: "‥",
        nlE: "≦̸",
        nle: "≰",
        nleftarrow: "↚",
        nLeftarrow: "⇍",
        nleftrightarrow: "↮",
        nLeftrightarrow: "⇎",
        nleq: "≰",
        nleqq: "≦̸",
        nleqslant: "⩽̸",
        nles: "⩽̸",
        nless: "≮",
        nLl: "⋘̸",
        nlsim: "≴",
        nLt: "≪⃒",
        nlt: "≮",
        nltri: "⋪",
        nltrie: "⋬",
        nLtv: "≪̸",
        nmid: "∤",
        NoBreak: "⁠",
        NonBreakingSpace: " ",
        nopf: "𝕟",
        Nopf: "ℕ",
        Not: "⫬",
        not: "¬",
        NotCongruent: "≢",
        NotCupCap: "≭",
        NotDoubleVerticalBar: "∦",
        NotElement: "∉",
        NotEqual: "≠",
        NotEqualTilde: "≂̸",
        NotExists: "∄",
        NotGreater: "≯",
        NotGreaterEqual: "≱",
        NotGreaterFullEqual: "≧̸",
        NotGreaterGreater: "≫̸",
        NotGreaterLess: "≹",
        NotGreaterSlantEqual: "⩾̸",
        NotGreaterTilde: "≵",
        NotHumpDownHump: "≎̸",
        NotHumpEqual: "≏̸",
        notin: "∉",
        notindot: "⋵̸",
        notinE: "⋹̸",
        notinva: "∉",
        notinvb: "⋷",
        notinvc: "⋶",
        NotLeftTriangleBar: "⧏̸",
        NotLeftTriangle: "⋪",
        NotLeftTriangleEqual: "⋬",
        NotLess: "≮",
        NotLessEqual: "≰",
        NotLessGreater: "≸",
        NotLessLess: "≪̸",
        NotLessSlantEqual: "⩽̸",
        NotLessTilde: "≴",
        NotNestedGreaterGreater: "⪢̸",
        NotNestedLessLess: "⪡̸",
        notni: "∌",
        notniva: "∌",
        notnivb: "⋾",
        notnivc: "⋽",
        NotPrecedes: "⊀",
        NotPrecedesEqual: "⪯̸",
        NotPrecedesSlantEqual: "⋠",
        NotReverseElement: "∌",
        NotRightTriangleBar: "⧐̸",
        NotRightTriangle: "⋫",
        NotRightTriangleEqual: "⋭",
        NotSquareSubset: "⊏̸",
        NotSquareSubsetEqual: "⋢",
        NotSquareSuperset: "⊐̸",
        NotSquareSupersetEqual: "⋣",
        NotSubset: "⊂⃒",
        NotSubsetEqual: "⊈",
        NotSucceeds: "⊁",
        NotSucceedsEqual: "⪰̸",
        NotSucceedsSlantEqual: "⋡",
        NotSucceedsTilde: "≿̸",
        NotSuperset: "⊃⃒",
        NotSupersetEqual: "⊉",
        NotTilde: "≁",
        NotTildeEqual: "≄",
        NotTildeFullEqual: "≇",
        NotTildeTilde: "≉",
        NotVerticalBar: "∤",
        nparallel: "∦",
        npar: "∦",
        nparsl: "⫽⃥",
        npart: "∂̸",
        npolint: "⨔",
        npr: "⊀",
        nprcue: "⋠",
        nprec: "⊀",
        npreceq: "⪯̸",
        npre: "⪯̸",
        nrarrc: "⤳̸",
        nrarr: "↛",
        nrArr: "⇏",
        nrarrw: "↝̸",
        nrightarrow: "↛",
        nRightarrow: "⇏",
        nrtri: "⋫",
        nrtrie: "⋭",
        nsc: "⊁",
        nsccue: "⋡",
        nsce: "⪰̸",
        Nscr: "𝒩",
        nscr: "𝓃",
        nshortmid: "∤",
        nshortparallel: "∦",
        nsim: "≁",
        nsime: "≄",
        nsimeq: "≄",
        nsmid: "∤",
        nspar: "∦",
        nsqsube: "⋢",
        nsqsupe: "⋣",
        nsub: "⊄",
        nsubE: "⫅̸",
        nsube: "⊈",
        nsubset: "⊂⃒",
        nsubseteq: "⊈",
        nsubseteqq: "⫅̸",
        nsucc: "⊁",
        nsucceq: "⪰̸",
        nsup: "⊅",
        nsupE: "⫆̸",
        nsupe: "⊉",
        nsupset: "⊃⃒",
        nsupseteq: "⊉",
        nsupseteqq: "⫆̸",
        ntgl: "≹",
        Ntilde: "Ñ",
        ntilde: "ñ",
        ntlg: "≸",
        ntriangleleft: "⋪",
        ntrianglelefteq: "⋬",
        ntriangleright: "⋫",
        ntrianglerighteq: "⋭",
        Nu: "Ν",
        nu: "ν",
        num: "#",
        numero: "№",
        numsp: " ",
        nvap: "≍⃒",
        nvdash: "⊬",
        nvDash: "⊭",
        nVdash: "⊮",
        nVDash: "⊯",
        nvge: "≥⃒",
        nvgt: ">⃒",
        nvHarr: "⤄",
        nvinfin: "⧞",
        nvlArr: "⤂",
        nvle: "≤⃒",
        nvlt: "<⃒",
        nvltrie: "⊴⃒",
        nvrArr: "⤃",
        nvrtrie: "⊵⃒",
        nvsim: "∼⃒",
        nwarhk: "⤣",
        nwarr: "↖",
        nwArr: "⇖",
        nwarrow: "↖",
        nwnear: "⤧",
        Oacute: "Ó",
        oacute: "ó",
        oast: "⊛",
        Ocirc: "Ô",
        ocirc: "ô",
        ocir: "⊚",
        Ocy: "О",
        ocy: "о",
        odash: "⊝",
        Odblac: "Ő",
        odblac: "ő",
        odiv: "⨸",
        odot: "⊙",
        odsold: "⦼",
        OElig: "Œ",
        oelig: "œ",
        ofcir: "⦿",
        Ofr: "𝔒",
        ofr: "𝔬",
        ogon: "˛",
        Ograve: "Ò",
        ograve: "ò",
        ogt: "⧁",
        ohbar: "⦵",
        ohm: "Ω",
        oint: "∮",
        olarr: "↺",
        olcir: "⦾",
        olcross: "⦻",
        oline: "‾",
        olt: "⧀",
        Omacr: "Ō",
        omacr: "ō",
        Omega: "Ω",
        omega: "ω",
        Omicron: "Ο",
        omicron: "ο",
        omid: "⦶",
        ominus: "⊖",
        Oopf: "𝕆",
        oopf: "𝕠",
        opar: "⦷",
        OpenCurlyDoubleQuote: "“",
        OpenCurlyQuote: "‘",
        operp: "⦹",
        oplus: "⊕",
        orarr: "↻",
        Or: "⩔",
        or: "∨",
        ord: "⩝",
        order: "ℴ",
        orderof: "ℴ",
        ordf: "ª",
        ordm: "º",
        origof: "⊶",
        oror: "⩖",
        orslope: "⩗",
        orv: "⩛",
        oS: "Ⓢ",
        Oscr: "𝒪",
        oscr: "ℴ",
        Oslash: "Ø",
        oslash: "ø",
        osol: "⊘",
        Otilde: "Õ",
        otilde: "õ",
        otimesas: "⨶",
        Otimes: "⨷",
        otimes: "⊗",
        Ouml: "Ö",
        ouml: "ö",
        ovbar: "⌽",
        OverBar: "‾",
        OverBrace: "⏞",
        OverBracket: "⎴",
        OverParenthesis: "⏜",
        para: "¶",
        parallel: "∥",
        par: "∥",
        parsim: "⫳",
        parsl: "⫽",
        part: "∂",
        PartialD: "∂",
        Pcy: "П",
        pcy: "п",
        percnt: "%",
        period: ".",
        permil: "‰",
        perp: "⊥",
        pertenk: "‱",
        Pfr: "𝔓",
        pfr: "𝔭",
        Phi: "Φ",
        phi: "φ",
        phiv: "ϕ",
        phmmat: "ℳ",
        phone: "☎",
        Pi: "Π",
        pi: "π",
        pitchfork: "⋔",
        piv: "ϖ",
        planck: "ℏ",
        planckh: "ℎ",
        plankv: "ℏ",
        plusacir: "⨣",
        plusb: "⊞",
        pluscir: "⨢",
        plus: "+",
        plusdo: "∔",
        plusdu: "⨥",
        pluse: "⩲",
        PlusMinus: "±",
        plusmn: "±",
        plussim: "⨦",
        plustwo: "⨧",
        pm: "±",
        Poincareplane: "ℌ",
        pointint: "⨕",
        popf: "𝕡",
        Popf: "ℙ",
        pound: "£",
        prap: "⪷",
        Pr: "⪻",
        pr: "≺",
        prcue: "≼",
        precapprox: "⪷",
        prec: "≺",
        preccurlyeq: "≼",
        Precedes: "≺",
        PrecedesEqual: "⪯",
        PrecedesSlantEqual: "≼",
        PrecedesTilde: "≾",
        preceq: "⪯",
        precnapprox: "⪹",
        precneqq: "⪵",
        precnsim: "⋨",
        pre: "⪯",
        prE: "⪳",
        precsim: "≾",
        prime: "′",
        Prime: "″",
        primes: "ℙ",
        prnap: "⪹",
        prnE: "⪵",
        prnsim: "⋨",
        prod: "∏",
        Product: "∏",
        profalar: "⌮",
        profline: "⌒",
        profsurf: "⌓",
        prop: "∝",
        Proportional: "∝",
        Proportion: "∷",
        propto: "∝",
        prsim: "≾",
        prurel: "⊰",
        Pscr: "𝒫",
        pscr: "𝓅",
        Psi: "Ψ",
        psi: "ψ",
        puncsp: " ",
        Qfr: "𝔔",
        qfr: "𝔮",
        qint: "⨌",
        qopf: "𝕢",
        Qopf: "ℚ",
        qprime: "⁗",
        Qscr: "𝒬",
        qscr: "𝓆",
        quaternions: "ℍ",
        quatint: "⨖",
        quest: "?",
        questeq: "≟",
        quot: '"',
        QUOT: '"',
        rAarr: "⇛",
        race: "∽̱",
        Racute: "Ŕ",
        racute: "ŕ",
        radic: "√",
        raemptyv: "⦳",
        rang: "⟩",
        Rang: "⟫",
        rangd: "⦒",
        range: "⦥",
        rangle: "⟩",
        raquo: "»",
        rarrap: "⥵",
        rarrb: "⇥",
        rarrbfs: "⤠",
        rarrc: "⤳",
        rarr: "→",
        Rarr: "↠",
        rArr: "⇒",
        rarrfs: "⤞",
        rarrhk: "↪",
        rarrlp: "↬",
        rarrpl: "⥅",
        rarrsim: "⥴",
        Rarrtl: "⤖",
        rarrtl: "↣",
        rarrw: "↝",
        ratail: "⤚",
        rAtail: "⤜",
        ratio: "∶",
        rationals: "ℚ",
        rbarr: "⤍",
        rBarr: "⤏",
        RBarr: "⤐",
        rbbrk: "❳",
        rbrace: "}",
        rbrack: "]",
        rbrke: "⦌",
        rbrksld: "⦎",
        rbrkslu: "⦐",
        Rcaron: "Ř",
        rcaron: "ř",
        Rcedil: "Ŗ",
        rcedil: "ŗ",
        rceil: "⌉",
        rcub: "}",
        Rcy: "Р",
        rcy: "р",
        rdca: "⤷",
        rdldhar: "⥩",
        rdquo: "”",
        rdquor: "”",
        rdsh: "↳",
        real: "ℜ",
        realine: "ℛ",
        realpart: "ℜ",
        reals: "ℝ",
        Re: "ℜ",
        rect: "▭",
        reg: "®",
        REG: "®",
        ReverseElement: "∋",
        ReverseEquilibrium: "⇋",
        ReverseUpEquilibrium: "⥯",
        rfisht: "⥽",
        rfloor: "⌋",
        rfr: "𝔯",
        Rfr: "ℜ",
        rHar: "⥤",
        rhard: "⇁",
        rharu: "⇀",
        rharul: "⥬",
        Rho: "Ρ",
        rho: "ρ",
        rhov: "ϱ",
        RightAngleBracket: "⟩",
        RightArrowBar: "⇥",
        rightarrow: "→",
        RightArrow: "→",
        Rightarrow: "⇒",
        RightArrowLeftArrow: "⇄",
        rightarrowtail: "↣",
        RightCeiling: "⌉",
        RightDoubleBracket: "⟧",
        RightDownTeeVector: "⥝",
        RightDownVectorBar: "⥕",
        RightDownVector: "⇂",
        RightFloor: "⌋",
        rightharpoondown: "⇁",
        rightharpoonup: "⇀",
        rightleftarrows: "⇄",
        rightleftharpoons: "⇌",
        rightrightarrows: "⇉",
        rightsquigarrow: "↝",
        RightTeeArrow: "↦",
        RightTee: "⊢",
        RightTeeVector: "⥛",
        rightthreetimes: "⋌",
        RightTriangleBar: "⧐",
        RightTriangle: "⊳",
        RightTriangleEqual: "⊵",
        RightUpDownVector: "⥏",
        RightUpTeeVector: "⥜",
        RightUpVectorBar: "⥔",
        RightUpVector: "↾",
        RightVectorBar: "⥓",
        RightVector: "⇀",
        ring: "˚",
        risingdotseq: "≓",
        rlarr: "⇄",
        rlhar: "⇌",
        rlm: "‏",
        rmoustache: "⎱",
        rmoust: "⎱",
        rnmid: "⫮",
        roang: "⟭",
        roarr: "⇾",
        robrk: "⟧",
        ropar: "⦆",
        ropf: "𝕣",
        Ropf: "ℝ",
        roplus: "⨮",
        rotimes: "⨵",
        RoundImplies: "⥰",
        rpar: ")",
        rpargt: "⦔",
        rppolint: "⨒",
        rrarr: "⇉",
        Rrightarrow: "⇛",
        rsaquo: "›",
        rscr: "𝓇",
        Rscr: "ℛ",
        rsh: "↱",
        Rsh: "↱",
        rsqb: "]",
        rsquo: "’",
        rsquor: "’",
        rthree: "⋌",
        rtimes: "⋊",
        rtri: "▹",
        rtrie: "⊵",
        rtrif: "▸",
        rtriltri: "⧎",
        RuleDelayed: "⧴",
        ruluhar: "⥨",
        rx: "℞",
        Sacute: "Ś",
        sacute: "ś",
        sbquo: "‚",
        scap: "⪸",
        Scaron: "Š",
        scaron: "š",
        Sc: "⪼",
        sc: "≻",
        sccue: "≽",
        sce: "⪰",
        scE: "⪴",
        Scedil: "Ş",
        scedil: "ş",
        Scirc: "Ŝ",
        scirc: "ŝ",
        scnap: "⪺",
        scnE: "⪶",
        scnsim: "⋩",
        scpolint: "⨓",
        scsim: "≿",
        Scy: "С",
        scy: "с",
        sdotb: "⊡",
        sdot: "⋅",
        sdote: "⩦",
        searhk: "⤥",
        searr: "↘",
        seArr: "⇘",
        searrow: "↘",
        sect: "§",
        semi: ";",
        seswar: "⤩",
        setminus: "∖",
        setmn: "∖",
        sext: "✶",
        Sfr: "𝔖",
        sfr: "𝔰",
        sfrown: "⌢",
        sharp: "♯",
        SHCHcy: "Щ",
        shchcy: "щ",
        SHcy: "Ш",
        shcy: "ш",
        ShortDownArrow: "↓",
        ShortLeftArrow: "←",
        shortmid: "∣",
        shortparallel: "∥",
        ShortRightArrow: "→",
        ShortUpArrow: "↑",
        shy: "­",
        Sigma: "Σ",
        sigma: "σ",
        sigmaf: "ς",
        sigmav: "ς",
        sim: "∼",
        simdot: "⩪",
        sime: "≃",
        simeq: "≃",
        simg: "⪞",
        simgE: "⪠",
        siml: "⪝",
        simlE: "⪟",
        simne: "≆",
        simplus: "⨤",
        simrarr: "⥲",
        slarr: "←",
        SmallCircle: "∘",
        smallsetminus: "∖",
        smashp: "⨳",
        smeparsl: "⧤",
        smid: "∣",
        smile: "⌣",
        smt: "⪪",
        smte: "⪬",
        smtes: "⪬︀",
        SOFTcy: "Ь",
        softcy: "ь",
        solbar: "⌿",
        solb: "⧄",
        sol: "/",
        Sopf: "𝕊",
        sopf: "𝕤",
        spades: "♠",
        spadesuit: "♠",
        spar: "∥",
        sqcap: "⊓",
        sqcaps: "⊓︀",
        sqcup: "⊔",
        sqcups: "⊔︀",
        Sqrt: "√",
        sqsub: "⊏",
        sqsube: "⊑",
        sqsubset: "⊏",
        sqsubseteq: "⊑",
        sqsup: "⊐",
        sqsupe: "⊒",
        sqsupset: "⊐",
        sqsupseteq: "⊒",
        square: "□",
        Square: "□",
        SquareIntersection: "⊓",
        SquareSubset: "⊏",
        SquareSubsetEqual: "⊑",
        SquareSuperset: "⊐",
        SquareSupersetEqual: "⊒",
        SquareUnion: "⊔",
        squarf: "▪",
        squ: "□",
        squf: "▪",
        srarr: "→",
        Sscr: "𝒮",
        sscr: "𝓈",
        ssetmn: "∖",
        ssmile: "⌣",
        sstarf: "⋆",
        Star: "⋆",
        star: "☆",
        starf: "★",
        straightepsilon: "ϵ",
        straightphi: "ϕ",
        strns: "¯",
        sub: "⊂",
        Sub: "⋐",
        subdot: "⪽",
        subE: "⫅",
        sube: "⊆",
        subedot: "⫃",
        submult: "⫁",
        subnE: "⫋",
        subne: "⊊",
        subplus: "⪿",
        subrarr: "⥹",
        subset: "⊂",
        Subset: "⋐",
        subseteq: "⊆",
        subseteqq: "⫅",
        SubsetEqual: "⊆",
        subsetneq: "⊊",
        subsetneqq: "⫋",
        subsim: "⫇",
        subsub: "⫕",
        subsup: "⫓",
        succapprox: "⪸",
        succ: "≻",
        succcurlyeq: "≽",
        Succeeds: "≻",
        SucceedsEqual: "⪰",
        SucceedsSlantEqual: "≽",
        SucceedsTilde: "≿",
        succeq: "⪰",
        succnapprox: "⪺",
        succneqq: "⪶",
        succnsim: "⋩",
        succsim: "≿",
        SuchThat: "∋",
        sum: "∑",
        Sum: "∑",
        sung: "♪",
        sup1: "¹",
        sup2: "²",
        sup3: "³",
        sup: "⊃",
        Sup: "⋑",
        supdot: "⪾",
        supdsub: "⫘",
        supE: "⫆",
        supe: "⊇",
        supedot: "⫄",
        Superset: "⊃",
        SupersetEqual: "⊇",
        suphsol: "⟉",
        suphsub: "⫗",
        suplarr: "⥻",
        supmult: "⫂",
        supnE: "⫌",
        supne: "⊋",
        supplus: "⫀",
        supset: "⊃",
        Supset: "⋑",
        supseteq: "⊇",
        supseteqq: "⫆",
        supsetneq: "⊋",
        supsetneqq: "⫌",
        supsim: "⫈",
        supsub: "⫔",
        supsup: "⫖",
        swarhk: "⤦",
        swarr: "↙",
        swArr: "⇙",
        swarrow: "↙",
        swnwar: "⤪",
        szlig: "ß",
        Tab: "\t",
        target: "⌖",
        Tau: "Τ",
        tau: "τ",
        tbrk: "⎴",
        Tcaron: "Ť",
        tcaron: "ť",
        Tcedil: "Ţ",
        tcedil: "ţ",
        Tcy: "Т",
        tcy: "т",
        tdot: "⃛",
        telrec: "⌕",
        Tfr: "𝔗",
        tfr: "𝔱",
        there4: "∴",
        therefore: "∴",
        Therefore: "∴",
        Theta: "Θ",
        theta: "θ",
        thetasym: "ϑ",
        thetav: "ϑ",
        thickapprox: "≈",
        thicksim: "∼",
        ThickSpace: "  ",
        ThinSpace: " ",
        thinsp: " ",
        thkap: "≈",
        thksim: "∼",
        THORN: "Þ",
        thorn: "þ",
        tilde: "˜",
        Tilde: "∼",
        TildeEqual: "≃",
        TildeFullEqual: "≅",
        TildeTilde: "≈",
        timesbar: "⨱",
        timesb: "⊠",
        times: "×",
        timesd: "⨰",
        tint: "∭",
        toea: "⤨",
        topbot: "⌶",
        topcir: "⫱",
        top: "⊤",
        Topf: "𝕋",
        topf: "𝕥",
        topfork: "⫚",
        tosa: "⤩",
        tprime: "‴",
        trade: "™",
        TRADE: "™",
        triangle: "▵",
        triangledown: "▿",
        triangleleft: "◃",
        trianglelefteq: "⊴",
        triangleq: "≜",
        triangleright: "▹",
        trianglerighteq: "⊵",
        tridot: "◬",
        trie: "≜",
        triminus: "⨺",
        TripleDot: "⃛",
        triplus: "⨹",
        trisb: "⧍",
        tritime: "⨻",
        trpezium: "⏢",
        Tscr: "𝒯",
        tscr: "𝓉",
        TScy: "Ц",
        tscy: "ц",
        TSHcy: "Ћ",
        tshcy: "ћ",
        Tstrok: "Ŧ",
        tstrok: "ŧ",
        twixt: "≬",
        twoheadleftarrow: "↞",
        twoheadrightarrow: "↠",
        Uacute: "Ú",
        uacute: "ú",
        uarr: "↑",
        Uarr: "↟",
        uArr: "⇑",
        Uarrocir: "⥉",
        Ubrcy: "Ў",
        ubrcy: "ў",
        Ubreve: "Ŭ",
        ubreve: "ŭ",
        Ucirc: "Û",
        ucirc: "û",
        Ucy: "У",
        ucy: "у",
        udarr: "⇅",
        Udblac: "Ű",
        udblac: "ű",
        udhar: "⥮",
        ufisht: "⥾",
        Ufr: "𝔘",
        ufr: "𝔲",
        Ugrave: "Ù",
        ugrave: "ù",
        uHar: "⥣",
        uharl: "↿",
        uharr: "↾",
        uhblk: "▀",
        ulcorn: "⌜",
        ulcorner: "⌜",
        ulcrop: "⌏",
        ultri: "◸",
        Umacr: "Ū",
        umacr: "ū",
        uml: "¨",
        UnderBar: "_",
        UnderBrace: "⏟",
        UnderBracket: "⎵",
        UnderParenthesis: "⏝",
        Union: "⋃",
        UnionPlus: "⊎",
        Uogon: "Ų",
        uogon: "ų",
        Uopf: "𝕌",
        uopf: "𝕦",
        UpArrowBar: "⤒",
        uparrow: "↑",
        UpArrow: "↑",
        Uparrow: "⇑",
        UpArrowDownArrow: "⇅",
        updownarrow: "↕",
        UpDownArrow: "↕",
        Updownarrow: "⇕",
        UpEquilibrium: "⥮",
        upharpoonleft: "↿",
        upharpoonright: "↾",
        uplus: "⊎",
        UpperLeftArrow: "↖",
        UpperRightArrow: "↗",
        upsi: "υ",
        Upsi: "ϒ",
        upsih: "ϒ",
        Upsilon: "Υ",
        upsilon: "υ",
        UpTeeArrow: "↥",
        UpTee: "⊥",
        upuparrows: "⇈",
        urcorn: "⌝",
        urcorner: "⌝",
        urcrop: "⌎",
        Uring: "Ů",
        uring: "ů",
        urtri: "◹",
        Uscr: "𝒰",
        uscr: "𝓊",
        utdot: "⋰",
        Utilde: "Ũ",
        utilde: "ũ",
        utri: "▵",
        utrif: "▴",
        uuarr: "⇈",
        Uuml: "Ü",
        uuml: "ü",
        uwangle: "⦧",
        vangrt: "⦜",
        varepsilon: "ϵ",
        varkappa: "ϰ",
        varnothing: "∅",
        varphi: "ϕ",
        varpi: "ϖ",
        varpropto: "∝",
        varr: "↕",
        vArr: "⇕",
        varrho: "ϱ",
        varsigma: "ς",
        varsubsetneq: "⊊︀",
        varsubsetneqq: "⫋︀",
        varsupsetneq: "⊋︀",
        varsupsetneqq: "⫌︀",
        vartheta: "ϑ",
        vartriangleleft: "⊲",
        vartriangleright: "⊳",
        vBar: "⫨",
        Vbar: "⫫",
        vBarv: "⫩",
        Vcy: "В",
        vcy: "в",
        vdash: "⊢",
        vDash: "⊨",
        Vdash: "⊩",
        VDash: "⊫",
        Vdashl: "⫦",
        veebar: "⊻",
        vee: "∨",
        Vee: "⋁",
        veeeq: "≚",
        vellip: "⋮",
        verbar: "|",
        Verbar: "‖",
        vert: "|",
        Vert: "‖",
        VerticalBar: "∣",
        VerticalLine: "|",
        VerticalSeparator: "❘",
        VerticalTilde: "≀",
        VeryThinSpace: " ",
        Vfr: "𝔙",
        vfr: "𝔳",
        vltri: "⊲",
        vnsub: "⊂⃒",
        vnsup: "⊃⃒",
        Vopf: "𝕍",
        vopf: "𝕧",
        vprop: "∝",
        vrtri: "⊳",
        Vscr: "𝒱",
        vscr: "𝓋",
        vsubnE: "⫋︀",
        vsubne: "⊊︀",
        vsupnE: "⫌︀",
        vsupne: "⊋︀",
        Vvdash: "⊪",
        vzigzag: "⦚",
        Wcirc: "Ŵ",
        wcirc: "ŵ",
        wedbar: "⩟",
        wedge: "∧",
        Wedge: "⋀",
        wedgeq: "≙",
        weierp: "℘",
        Wfr: "𝔚",
        wfr: "𝔴",
        Wopf: "𝕎",
        wopf: "𝕨",
        wp: "℘",
        wr: "≀",
        wreath: "≀",
        Wscr: "𝒲",
        wscr: "𝓌",
        xcap: "⋂",
        xcirc: "◯",
        xcup: "⋃",
        xdtri: "▽",
        Xfr: "𝔛",
        xfr: "𝔵",
        xharr: "⟷",
        xhArr: "⟺",
        Xi: "Ξ",
        xi: "ξ",
        xlarr: "⟵",
        xlArr: "⟸",
        xmap: "⟼",
        xnis: "⋻",
        xodot: "⨀",
        Xopf: "𝕏",
        xopf: "𝕩",
        xoplus: "⨁",
        xotime: "⨂",
        xrarr: "⟶",
        xrArr: "⟹",
        Xscr: "𝒳",
        xscr: "𝓍",
        xsqcup: "⨆",
        xuplus: "⨄",
        xutri: "△",
        xvee: "⋁",
        xwedge: "⋀",
        Yacute: "Ý",
        yacute: "ý",
        YAcy: "Я",
        yacy: "я",
        Ycirc: "Ŷ",
        ycirc: "ŷ",
        Ycy: "Ы",
        ycy: "ы",
        yen: "¥",
        Yfr: "𝔜",
        yfr: "𝔶",
        YIcy: "Ї",
        yicy: "ї",
        Yopf: "𝕐",
        yopf: "𝕪",
        Yscr: "𝒴",
        yscr: "𝓎",
        YUcy: "Ю",
        yucy: "ю",
        yuml: "ÿ",
        Yuml: "Ÿ",
        Zacute: "Ź",
        zacute: "ź",
        Zcaron: "Ž",
        zcaron: "ž",
        Zcy: "З",
        zcy: "з",
        Zdot: "Ż",
        zdot: "ż",
        zeetrf: "ℨ",
        ZeroWidthSpace: "​",
        Zeta: "Ζ",
        zeta: "ζ",
        zfr: "𝔷",
        Zfr: "ℨ",
        ZHcy: "Ж",
        zhcy: "ж",
        zigrarr: "⇝",
        zopf: "𝕫",
        Zopf: "ℤ",
        Zscr: "𝒵",
        zscr: "𝓏",
        zwj: "‍",
        zwnj: "‌"
    };
}, function(t, e) {
    t.exports = {
        Aacute: "Á",
        aacute: "á",
        Acirc: "Â",
        acirc: "â",
        acute: "´",
        AElig: "Æ",
        aelig: "æ",
        Agrave: "À",
        agrave: "à",
        amp: "&",
        AMP: "&",
        Aring: "Å",
        aring: "å",
        Atilde: "Ã",
        atilde: "ã",
        Auml: "Ä",
        auml: "ä",
        brvbar: "¦",
        Ccedil: "Ç",
        ccedil: "ç",
        cedil: "¸",
        cent: "¢",
        copy: "©",
        COPY: "©",
        curren: "¤",
        deg: "°",
        divide: "÷",
        Eacute: "É",
        eacute: "é",
        Ecirc: "Ê",
        ecirc: "ê",
        Egrave: "È",
        egrave: "è",
        ETH: "Ð",
        eth: "ð",
        Euml: "Ë",
        euml: "ë",
        frac12: "½",
        frac14: "¼",
        frac34: "¾",
        gt: ">",
        GT: ">",
        Iacute: "Í",
        iacute: "í",
        Icirc: "Î",
        icirc: "î",
        iexcl: "¡",
        Igrave: "Ì",
        igrave: "ì",
        iquest: "¿",
        Iuml: "Ï",
        iuml: "ï",
        laquo: "«",
        lt: "<",
        LT: "<",
        macr: "¯",
        micro: "µ",
        middot: "·",
        nbsp: " ",
        not: "¬",
        Ntilde: "Ñ",
        ntilde: "ñ",
        Oacute: "Ó",
        oacute: "ó",
        Ocirc: "Ô",
        ocirc: "ô",
        Ograve: "Ò",
        ograve: "ò",
        ordf: "ª",
        ordm: "º",
        Oslash: "Ø",
        oslash: "ø",
        Otilde: "Õ",
        otilde: "õ",
        Ouml: "Ö",
        ouml: "ö",
        para: "¶",
        plusmn: "±",
        pound: "£",
        quot: '"',
        QUOT: '"',
        raquo: "»",
        reg: "®",
        REG: "®",
        sect: "§",
        shy: "­",
        sup1: "¹",
        sup2: "²",
        sup3: "³",
        szlig: "ß",
        THORN: "Þ",
        thorn: "þ",
        times: "×",
        Uacute: "Ú",
        uacute: "ú",
        Ucirc: "Û",
        ucirc: "û",
        Ugrave: "Ù",
        ugrave: "ù",
        uml: "¨",
        Uuml: "Ü",
        uuml: "ü",
        Yacute: "Ý",
        yacute: "ý",
        yen: "¥",
        yuml: "ÿ"
    };
}, function(t, e) {
    t.exports = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        quot: '"'
    };
}, function(t, e) {
    "function" == typeof Object.create ? t.exports = function(t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        });
    } : t.exports = function(t, e) {
        t.super_ = e;
        var r = function() {};
        r.prototype = e.prototype, t.prototype = new r(), t.prototype.constructor = t;
    };
}, function(t, e) {
    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    function s() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }
    function i(t) {
        return "function" == typeof t;
    }
    function o(t) {
        return "object" === r(t) && null !== t;
    }
    function n(t) {
        return void 0 === t;
    }
    t.exports = s, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._maxListeners = void 0, 
    s.defaultMaxListeners = 10, s.prototype.setMaxListeners = function(t) {
        if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
        return this._maxListeners = t, this;
    }, s.prototype.emit = function(t) {
        var e, r, s, a, c, u;
        if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
            if ((e = arguments[1]) instanceof Error) throw e;
            var l = new Error('Uncaught, unspecified "error" event. (' + e + ")");
            throw l.context = e, l;
        }
        if (n(r = this._events[t])) return !1;
        if (i(r)) switch (arguments.length) {
          case 1:
            r.call(this);
            break;

          case 2:
            r.call(this, arguments[1]);
            break;

          case 3:
            r.call(this, arguments[1], arguments[2]);
            break;

          default:
            a = Array.prototype.slice.call(arguments, 1), r.apply(this, a);
        } else if (o(r)) for (a = Array.prototype.slice.call(arguments, 1), s = (u = r.slice()).length, 
        c = 0; c < s; c++) u[c].apply(this, a);
        return !0;
    }, s.prototype.addListener = function(t, e) {
        var r;
        if (!i(e)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, i(e.listener) ? e.listener : e), 
        this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [ this._events[t], e ] : this._events[t] = e, 
        o(this._events[t]) && !this._events[t].warned && (r = n(this._maxListeners) ? s.defaultMaxListeners : this._maxListeners) && r > 0 && this._events[t].length > r && (this._events[t].warned = !0, 
        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), 
        "function" == typeof console.trace && console.trace()), this;
    }, s.prototype.on = s.prototype.addListener, s.prototype.once = function(t, e) {
        if (!i(e)) throw TypeError("listener must be a function");
        var r = !1;
        function s() {
            this.removeListener(t, s), r || (r = !0, e.apply(this, arguments));
        }
        return s.listener = e, this.on(t, s), this;
    }, s.prototype.removeListener = function(t, e) {
        var r, s, n, a;
        if (!i(e)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[t]) return this;
        if (n = (r = this._events[t]).length, s = -1, r === e || i(r.listener) && r.listener === e) delete this._events[t], 
        this._events.removeListener && this.emit("removeListener", t, e); else if (o(r)) {
            for (a = n; a-- > 0; ) if (r[a] === e || r[a].listener && r[a].listener === e) {
                s = a;
                break;
            }
            if (s < 0) return this;
            1 === r.length ? (r.length = 0, delete this._events[t]) : r.splice(s, 1), this._events.removeListener && this.emit("removeListener", t, e);
        }
        return this;
    }, s.prototype.removeAllListeners = function(t) {
        var e, r;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], 
        this;
        if (0 === arguments.length) {
            for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
            return this.removeAllListeners("removeListener"), this._events = {}, this;
        }
        if (i(r = this._events[t])) this.removeListener(t, r); else if (r) for (;r.length; ) this.removeListener(t, r[r.length - 1]);
        return delete this._events[t], this;
    }, s.prototype.listeners = function(t) {
        return this._events && this._events[t] ? i(this._events[t]) ? [ this._events[t] ] : this._events[t].slice() : [];
    }, s.prototype.listenerCount = function(t) {
        if (this._events) {
            var e = this._events[t];
            if (i(e)) return 1;
            if (e) return e.length;
        }
        return 0;
    }, s.listenerCount = function(t, e) {
        return t.listenerCount(e);
    };
}, function(t, e, r) {
    "use strict";
    function s(t) {
        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    var i = r(73);
    t.exports = function(t) {
        return null != t && "object" === s(t) && !1 === i(t);
    };
}, function(t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t);
    };
}, function(t, e, r) {
    "use strict";
    var s = Object.getOwnPropertySymbols, i = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
    t.exports = function() {
        try {
            if (!Object.assign) return !1;
            var t = new String("abc");
            if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
            for (var e = {}, r = 0; r < 10; r++) e["_" + String.fromCharCode(r)] = r;
            if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                return e[t];
            }).join("")) return !1;
            var s = {};
            return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                s[t] = t;
            }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("");
        } catch (t) {
            return !1;
        }
    }() ? Object.assign : function(t, e) {
        for (var r, n, a = function(t) {
            if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t);
        }(t), c = 1; c < arguments.length; c++) {
            for (var u in r = Object(arguments[c])) i.call(r, u) && (a[u] = r[u]);
            if (s) {
                n = s(r);
                for (var l = 0; l < n.length; l++) o.call(r, n[l]) && (a[n[l]] = r[n[l]]);
            }
        }
        return a;
    };
} ]);