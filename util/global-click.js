/* eslint-disable */
// 全局点击特效
// 源码地址：https://candinya.com/js/candy.js
export default function () {
    function n(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n,
        t
    }
    function i(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function r(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1,
            i.configurable = !0,
            "value"in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i)
        }
    }
    function o(t, e, n) {
        return e && r(t.prototype, e),
        n && r(t, n),
        t
    }
    var s = function() {
        function t(e) {
            var r = e.origin
              , o = e.speed
              , s = e.color
              , a = e.angle
              , l = e.context;
            i(this, t),
            this.origin = r,
            this.position = function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = null != arguments[e] ? arguments[e] : {}
                      , r = Object.keys(i);
                    "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                        return Object.getOwnPropertyDescriptor(i, t).enumerable
                    }))),
                    r.forEach(function(e) {
                        n(t, e, i[e])
                    })
                }
                return t
            }({}, this.origin),
            this.color = s,
            this.speed = o,
            this.angle = a,
            this.context = l,
            this.renderCount = 0
        }
        return o(t, [{
            key: "draw",
            value: function() {
                this.context.fillStyle = this.color,
                this.context.beginPath(),
                this.context.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI),
                this.context.fill()
            }
        }, {
            key: "move",
            value: function() {
                this.position.x = Math.sin(this.angle) * this.speed + this.position.x,
                this.position.y = Math.cos(this.angle) * this.speed + this.position.y + .3 * this.renderCount,
                this.renderCount++
            }
        }]),
        t
    }()
      , a = function() {
        function t(e) {
            var n = e.origin
              , r = e.context
              , o = e.circleCount
              , s = void 0 === o ? 10 : o
              , a = e.area;
            i(this, t),
            this.origin = n,
            this.context = r,
            this.circleCount = s,
            this.area = a,
            this.stop = !1,
            this.circles = []
        }
        return o(t, [{
            key: "randomArray",
            value: function(t) {
                var e = t.length;
                return t[Math.floor(e * Math.random())]
            }
        }, {
            key: "randomColor",
            value: function() {
                var t = ["5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
                return "#" + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t) + this.randomArray(t)
            }
        }, {
            key: "randomRange",
            value: function(t, e) {
                return (e - t) * Math.random() + t
            }
        }, {
            key: "init",
            value: function() {
                for (var t = 0; t < this.circleCount; t++) {
                    var e = new s({
                        context: this.context,
                        origin: this.origin,
                        color: this.randomColor(),
                        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
                        speed: this.randomRange(1, 6)
                    });
                    this.circles.push(e)
                }
            }
        }, {
            key: "move",
            value: function() {
                var t = this;
                this.circles.forEach(function(e, n) {
                    if (e.position.x > t.area.width || e.position.y > t.area.height)
                        return t.circles.splice(n, 1);
                    e.move()
                }),
                0 == this.circles.length && (this.stop = !0)
            }
        }, {
            key: "draw",
            value: function() {
                this.circles.forEach(function(t) {
                    return t.draw()
                })
            }
        }]),
        t
    }();
    (new (function() {
        function t() {
            i(this, t),
            this.computerCanvas = document.createElement("canvas"),
            this.renderCanvas = document.createElement("canvas"),
            this.computerContext = this.computerCanvas.getContext("2d"),
            this.renderContext = this.renderCanvas.getContext("2d"),
            this.globalWidth = window.innerWidth,
            this.globalHeight = window.innerHeight,
            this.booms = [],
            this.running = !1
        }
        return o(t, [{
            key: "handleMouseDown",
            value: function(t) {
                var e = new a({
                    origin: {
                        x: t.clientX,
                        y: t.clientY
                    },
                    context: this.computerContext,
                    area: {
                        width: this.globalWidth,
                        height: this.globalHeight
                    }
                });
                e.init(),
                this.booms.push(e),
                this.running || this.run()
            }
        }, {
            key: "handlePageHide",
            value: function() {
                this.booms = [],
                this.running = !1
            }
        }, {
            key: "init",
            value: function() {
                var t = this.renderCanvas.style;
                t.position = "fixed",
                t.top = t.left = 0,
                t.zIndex = "999999999999999999999999999999999999999999",
                t.pointerEvents = "none",
                t.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth,
                t.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight,
                document.body.append(this.renderCanvas),
                window.addEventListener("mousedown", this.handleMouseDown.bind(this)),
                window.addEventListener("pagehide", this.handlePageHide.bind(this))
            }
        }, {
            key: "run",
            value: function() {
                var t = this;
                if (this.running = !0,
                0 == this.booms.length)
                    return this.running = !1;
                requestAnimationFrame(this.run.bind(this)),
                this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight),
                this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight),
                this.booms.forEach(function(e, n) {
                    if (e.stop)
                        return t.booms.splice(n, 1);
                    e.move(),
                    e.draw()
                }),
                this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
            }
        }]),
        t
    }())).init();
}
