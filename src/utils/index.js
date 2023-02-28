"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bezierCommand = exports.svgPath = exports.getLighterColor = exports.getCumulativeWidth = void 0;
var getCumulativeWidth = function (data, index, spacing) {
    var cumWidth = 0;
    for (var i = 0; i < index; i++) {
        var barWidth = data[i].barWidth;
        barWidth = barWidth || 30;
        cumWidth += barWidth + (spacing ? spacing : spacing === 0 ? 0 : 20);
    }
    return cumWidth;
};
exports.getCumulativeWidth = getCumulativeWidth;
var getLighterColor = function (color) {
    var r, g, b, lighter = '#';
    if (color.startsWith('#')) {
        if (color.length < 7) {
            r = parseInt(color[1], 16);
            g = parseInt(color[2], 16);
            b = parseInt(color[3], 16);
            // console.log('r', r);
            // console.log('g', g);
            // console.log('b', b);
            if (r < 14) {
                r += 2;
                lighter += r.toString(16);
            }
            if (g < 14) {
                g += 2;
                lighter += g.toString(16);
            }
            if (b < 14) {
                b += 2;
                lighter += b.toString(16);
            }
            // console.log('lighter', lighter);
        }
        else {
            r = parseInt(color[1] + color[2], 16);
            g = parseInt(color[3] + color[4], 16);
            b = parseInt(color[5] + color[6], 16);
            // console.log('r', r);
            // console.log('g', g);
            // console.log('b', b);
            if (r < 224) {
                r += 32;
                lighter += r.toString(16);
            }
            if (g < 224) {
                g += 32;
                lighter += g.toString(16);
            }
            if (b < 224) {
                b += 32;
                lighter += b.toString(16);
            }
            // console.log('lighter', lighter);
        }
    }
    return lighter;
};
exports.getLighterColor = getLighterColor;
var svgPath = function (points, command) {
    // build the d attributes by looping over the points
    var d = points.reduce(function (acc, point, i, a) {
        return i === 0
            ? // if first point
                "M ".concat(point[0], ",").concat(point[1])
            : // else
                "".concat(acc, " ").concat(command(point, i, a));
    }, '');
    return d;
};
exports.svgPath = svgPath;
var line = function (pointA, pointB) {
    var lengthX = pointB[0] - pointA[0];
    var lengthY = pointB[1] - pointA[1];
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
    };
};
var controlPoint = function (current, previous, next, reverse) {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    var p = previous || current;
    var n = next || current;
    // The smoothing ratio
    var smoothing = 0.2;
    // Properties of the opposed-line
    var o = line(p, n);
    // If is end-control-point, add PI to the angle to go backward
    var angle = o.angle + (reverse ? Math.PI : 0);
    var length = o.length * smoothing;
    // The control point position is relative to the current point
    var x = current[0] + Math.cos(angle) * length;
    var y = current[1] + Math.sin(angle) * length;
    return [x, y];
};
var bezierCommand = function (point, i, a) {
    // start control point
    var _a = __read(controlPoint(a[i - 1], a[i - 2], point), 2), cpsX = _a[0], cpsY = _a[1];
    // end control point
    var _b = __read(controlPoint(point, a[i - 1], a[i + 1], true), 2), cpeX = _b[0], cpeY = _b[1];
    return "C ".concat(cpsX, ",").concat(cpsY, " ").concat(cpeX, ",").concat(cpeY, " ").concat(point[0], ",").concat(point[1]);
};
exports.bezierCommand = bezierCommand;
