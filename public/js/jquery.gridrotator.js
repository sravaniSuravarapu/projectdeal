! function(t, e, o) {
    "use strict";

    function s() {
        var t = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document) return "hidden";
        for (var e = 0; e < t.length; e++)
            if (t[e] + "Hidden" in document) return t[e] + "Hidden";
        return null
    }

    function i() {
        var t = s();
        return t ? document[t] : !1
    }

    function a(t) {
        return 0 === Object.keys(t).length
    }
    var n, r, h = t.event;
    n = h.special.debouncedresize = {
        setup: function() {
            t(this).on("resize", n.handler)
        },
        teardown: function() {
            t(this).off("resize", n.handler)
        },
        handler: function(t, e) {
            var o = this,
                s = arguments,
                i = function() {
                    t.type = "debouncedresize", h.dispatch.apply(o, s)
                };
            r && clearTimeout(r), e ? i() : r = setTimeout(i, n.threshold)
        },
        threshold: 100
    }, Array.prototype.shuffle = function() {
        for (var t, e, o = this.length; o--;) t = Math.floor(Math.random() * o), e = this[o], this[o] = this[t], this[t] = e;
        return this
    };
    var d = t(e),
        c = e.Modernizr;
    t.GridRotator = function(e, o) {
        if (this.$el = t(o), c.backgroundsize) {
            this.$el.addClass("ri-grid-loading"), this._init(e)
        }
    }, t.GridRotator.defaults = {
        rows: 4,
        columns: 10,
        w1024: {
            rows: 3,
            columns: 8
        },
        w768: {
            rows: 3,
            columns: 7
        },
        w480: {
            rows: 3,
            columns: 5
        },
        w320: {
            rows: 2,
            columns: 4
        },
        w240: {
            rows: 2,
            columns: 3
        },
        step: "random",
        maxStep: 3,
        preventClick: !0,
        animType: "random",
        animSpeed: 800,
        animEasingOut: "linear",
        animEasingIn: "linear",
        interval: 3e3,
        slideshow: !0,
        onhover: !1,
        nochange: []
    }, t.GridRotator.prototype = {
        _init: function(e) {
            this.options = t.extend(!0, {}, t.GridRotator.defaults, e), this._config()
        },
        _config: function() {
            var e = this,
                o = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    msTransition: "MSTransitionEnd",
                    transition: "transitionend"
                };
            this.supportTransitions = c.csstransitions, this.supportTransforms3D = c.csstransforms3d, this.transEndEventName = o[c.prefixed("transition")] + ".gridrotator", this.animTypes = this.supportTransforms3D ? ["fadeInOut", "slideLeft", "slideRight", "slideTop", "slideBottom", "rotateLeft", "rotateRight", "rotateTop", "rotateBottom", "scale", "rotate3d", "rotateLeftScale", "rotateRightScale", "rotateTopScale", "rotateBottomScale"] : ["fadeInOut", "slideLeft", "slideRight", "slideTop", "slideBottom"], this.animType = this.options.animType, "random" === this.animType || this.supportTransforms3D || -1 !== t.inArray(this.animType, this.animTypes) || "showHide" === this.animType || (this.animType = "fadeInOut"), this.animTypesTotal = this.animTypes.length, this.$list = this.$el.children("ul");
            var s = 0,
                i = this.$list.find("img"),
                a = i.length;
            i.each(function() {
                var o = t(this),
                    n = o.attr("src");
                t("<img/>").load(function() {
                    ++s, o.parent().css("background-image", "url(" + n + ")"), s === a && (i.remove(), e.$el.removeClass("ri-grid-loading"), e.$items = e.$list.children("li"), e.$itemsCache = e.$items.clone(), e.itemsTotal = e.$items.length, e.outItems = [], e._layout(function() {
                        e._initEvents()
                    }), e._start())
                }).attr("src", n)
            })
        },
        _layout: function(e) {
            var o = this;
            this._setGridDim(), this.$list.empty(), this.$items = this.$itemsCache.clone().appendTo(this.$list);
            var s = this.$items.filter(":gt(" + (this.showTotal - 1) + ")"),
                i = s.children("a");
            this.outItems.length = 0, i.each(function(e) {
                o.outItems.push(t(this))
            }), s.remove();
            for (var a = document.defaultView ? parseInt(document.defaultView.getComputedStyle(this.$el.get(0), null).width) : this.$el.width(), n = Math.floor(a / this.columns), r = a - this.columns * Math.floor(n), h = 0; h < this.rows; ++h)
                for (var d = 0; d < this.columns; ++d) {
                    var c = this.columns * h + d,
                        l = this.$items.eq(c);
                    l.css({
                        width: d < Math.floor(r) ? n + 1 : n,
                        height: n
                    }), -1 !== t.inArray(c, this.options.nochange) && l.addClass("ri-nochange").data("nochange", !0)
                }
            this.options.preventClick && this.$items.children().css("cursor", "default").on("click.gridrotator", !1), e && e.call()
        },
        _setGridDim: function() {
            var t = this.$el.width();
            switch (!0) {
                case 240 > t:
                    this.rows = this.options.w240.rows, this.columns = this.options.w240.columns;
                    break;
                case 320 > t:
                    this.rows = this.options.w320.rows, this.columns = this.options.w320.columns;
                    break;
                case 480 > t:
                    this.rows = this.options.w480.rows, this.columns = this.options.w480.columns;
                    break;
                case 768 > t:
                    this.rows = this.options.w768.rows, this.columns = this.options.w768.columns;
                    break;
                case 1024 > t:
                    this.rows = this.options.w1024.rows, this.columns = this.options.w1024.columns;
                    break;
                default:
                    this.rows = this.options.rows, this.columns = this.options.columns
            }
            this.showTotal = this.rows * this.columns
        },
        _initEvents: function() {
            var e = this;
            d.on("debouncedresize.gridrotator", function() {
                e._layout()
            });
            var o = s();
            if (o) {
                var i = o.replace(/[H|h]idden/, "") + "visibilitychange";
                document.addEventListener(i, function() {
                    e._visChange()
                })
            }!c.touch && this.options.onhover && e.$items.on("mouseenter.gridrotator", function() {
                var o = t(this);
                o.data("active") || o.data("hovered") || o.data("nochange") || (o.data("hovered", !0), e._replace(o))
            }).on("mouseleave.gridrotator", function() {
                t(this).data("hovered", !1)
            })
        },
        _visChange: function() {
            i() ? clearTimeout(this.playtimeout) : this._start()
        },
        _start: function() {
            this.showTotal < this.itemsTotal && this.options.slideshow && this._showNext()
        },
        _getAnimType: function() {
            return "random" === this.animType ? this.animTypes[Math.floor(Math.random() * this.animTypesTotal)] : this.animType
        },
        _getAnimProperties: function(t) {
            var e, s = {},
                i = {},
                a = {},
                n = {},
                r = this._getAnimType(),
                h = 0;
            switch (r) {
                case "showHide":
                    e = 0, n.opacity = 0;
                    break;
                case "fadeInOut":
                    n.opacity = 0;
                    break;
                case "slideLeft":
                    s.left = t.width(), a.left = 0, n.left = -t.width();
                    break;
                case "slideRight":
                    s.left = -t.width(), a.left = 0, n.left = t.width();
                    break;
                case "slideTop":
                    s.top = t.height(), a.top = 0, n.top = -t.height();
                    break;
                case "slideBottom":
                    s.top = -t.height(), a.top = 0, n.top = t.height();
                    break;
                case "rotateLeft":
                    e = this.options.animSpeed / 2, s.transform = "rotateY(90deg)", a.transform = "rotateY(0deg)", h = e, n.transform = "rotateY(-90deg)";
                    break;
                case "rotateRight":
                    e = this.options.animSpeed / 2, s.transform = "rotateY(-90deg)", a.transform = "rotateY(0deg)", h = e, n.transform = "rotateY(90deg)";
                    break;
                case "rotateTop":
                    e = this.options.animSpeed / 2, s.transform = "rotateX(90deg)", a.transform = "rotateX(0deg)", h = e, n.transform = "rotateX(-90deg)";
                    break;
                case "rotateBottom":
                    e = this.options.animSpeed / 2, s.transform = "rotateX(-90deg)", a.transform = "rotateX(0deg)", h = e, n.transform = "rotateX(90deg)";
                    break;
                case "scale":
                    e = this.options.animSpeed / 2, s.transform = "scale(0)", i.transform = "scale(1)", a.transform = "scale(1)", h = e, n.transform = "scale(0)";
                    break;
                case "rotateLeftScale":
                    i.transform = "scale(1)", e = this.options.animSpeed / 2, s.transform = "scale(0.3) rotateY(90deg)", a.transform = "scale(1) rotateY(0deg)", h = e, n.transform = "scale(0.3) rotateY(-90deg)";
                    break;
                case "rotateRightScale":
                    i.transform = "scale(1)", e = this.options.animSpeed / 2, s.transform = "scale(0.3) rotateY(-90deg)", a.transform = "scale(1) rotateY(0deg)", h = e, n.transform = "scale(0.3) rotateY(90deg)";
                    break;
                case "rotateTopScale":
                    i.transform = "scale(1)", e = this.options.animSpeed / 2, s.transform = "scale(0.3) rotateX(90deg)", a.transform = "scale(1) rotateX(0deg)", h = e, n.transform = "scale(0.3) rotateX(-90deg)";
                    break;
                case "rotateBottomScale":
                    i.transform = "scale(1)", e = this.options.animSpeed / 2, s.transform = "scale(0.3) rotateX(-90deg)", a.transform = "scale(1) rotateX(0deg)", h = e, n.transform = "scale(0.3) rotateX(90deg)";
                    break;
                case "rotate3d":
                    e = this.options.animSpeed / 2, s.transform = "rotate3d( 1, 1, 0, 90deg )", a.transform = "rotate3d( 1, 1, 0, 0deg )", h = e, n.transform = "rotate3d( 1, 1, 0, -90deg )"
            }
            return {
                startInProp: s,
                startOutProp: i,
                endInProp: a,
                endOutProp: n,
                delay: h,
                animSpeed: e != o ? e : this.options.animSpeed
            }
        },
        _showNext: function(t) {
            var e = this;
            clearTimeout(this.playtimeout), this.playtimeout = setTimeout(function() {
                var t = e.options.step,
                    o = e.options.maxStep,
                    s = 1;
                o > e.showTotal && (o = e.showTotal);
                for (var i = "random" === t ? Math.floor(Math.random() * o + s) : Math.min(Math.abs(t), o), a = e._getRandom(i, e.showTotal), n = 0; i > n; ++n) {
                    var r = e.$items.eq(a[n]);
                    if (r.data("active") || r.data("nochange")) return e._showNext(1), !1;
                    e._replace(r)
                }
                e._showNext()
            }, t || Math.max(Math.abs(this.options.interval), 300))
        },
        _replace: function(e) {
            e.data("active", !0);
            var o = this,
                s = e.children("a:last"),
                i = {
                    width: s.width(),
                    height: s.height()
                };
            e.data("active", !0);
            var n = this.outItems.shift();
            this.outItems.push(s.clone().css("transition", "none")), n.css(i).prependTo(e);
            var r = this._getAnimProperties(s);
            n.css(r.startInProp), s.css(r.startOutProp), this._setTransition(n, "all", r.animSpeed, r.delay, this.options.animEasingIn), this._setTransition(s, "all", r.animSpeed, 0, this.options.animEasingOut), this._applyTransition(n, r.endInProp, r.animSpeed, function() {
                var e = t(this),
                    s = r.animSpeed === o.options.animSpeed && a(r.endInProp) ? r.animSpeed : 0;
                setTimeout(function() {
                    o.supportTransitions && e.off(o.transEndEventName), e.next().remove(), e.parent().data("active", !1)
                }, s)
            }, 0 === r.animSpeed || a(r.endInProp)), this._applyTransition(s, r.endOutProp, r.animSpeed)
        },
        _getRandom: function(t, e) {
            for (var o = [], s = 0; e > s; ++s) o.push(s);
            return o.shuffle().slice(0, t)
        },
        _setTransition: function(t, e, o, s, i) {
            setTimeout(function() {
                t.css("transition", e + " " + o + "ms " + s + "ms " + i)
            }, 25)
        },
        _applyTransition: function(e, o, s, i, a) {
            var n = this;
            setTimeout(function() {
                t.fn.applyStyle = n.supportTransitions ? t.fn.css : t.fn.animate, i && n.supportTransitions && (e.on(n.transEndEventName, i), a && i.call(e)), i = i || function() {
                    return !1
                }, e.stop().applyStyle(o, t.extend(!0, [], {
                    duration: s + "ms",
                    complete: i
                }))
            }, 25)
        }
    };
    var l = function(t) {
        e.console && e.console.error(t)
    };
    t.fn.gridrotator = function(e) {
        var o = t.data(this, "gridrotator");
        if ("string" == typeof e) {
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                return o ? t.isFunction(o[e]) && "_" !== e.charAt(0) ? void o[e].apply(o, s) : void l("no such method '" + e + "' for gridrotator instance") : void l("cannot call methods on gridrotator prior to initialization; attempted to call method '" + e + "'")
            })
        } else this.each(function() {
            o ? o._init() : o = t.data(this, "gridrotator", new t.GridRotator(e, this))
        });
        return o
    }
}(jQuery, window);