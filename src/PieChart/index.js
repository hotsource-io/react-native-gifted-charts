"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PieChart = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var colors_1 = require("./colors");
var main_1 = require("./main");
var PieChart = function (props) {
    var radius = props.radius || 120;
    var extraRadiusForFocused = props.extraRadiusForFocused || radius / 10;
    var pi = props.semiCircle ? Math.PI / 2 : Math.PI;
    var _a = __read((0, react_1.useState)(props.data.findIndex(function (item) { return item.focused === true; })), 2), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var startAngle = props.initialAngle || (props.semiCircle ? -pi : 0);
    var total = 0;
    props.data.forEach(function (item) {
        total += item.value;
    });
    if (selectedIndex !== 0) {
        var start = 0;
        for (var i = 0; i < selectedIndex; i++) {
            start += props.data[i].value;
        }
        startAngle += (2 * pi * start) / total;
    }
    return (<react_native_1.View style={{
            height: (radius + extraRadiusForFocused) * 2,
            width: (radius + extraRadiusForFocused) * 2,
        }}>
      {!(props.data.length <= 1 ||
            !(props.focusOnPress || props.sectionAutoFocus) ||
            selectedIndex === -1) && (<react_native_1.View style={{
                position: 'absolute',
                top: -extraRadiusForFocused,
                left: -extraRadiusForFocused,
            }}>
          <main_1.PieChartMain {...props} data={[
                {
                    value: props.data[selectedIndex].value,
                    color: props.data[selectedIndex].color || colors_1.colors[selectedIndex % 9],
                    strokeColor: props.data[selectedIndex].strokeColor || null,
                    strokeWidth: props.data[selectedIndex].strokeWidth || null,
                    gradientCenterColor: props.data[selectedIndex].gradientCenterColor || null,
                },
                {
                    value: total - props.data[selectedIndex].value,
                    peripheral: true,
                    strokeWidth: 0,
                },
            ]} radius={radius + extraRadiusForFocused} initialAngle={startAngle} showText={false} innerRadius={props.innerRadius || radius / 2.5}/>
        </react_native_1.View>)}
      <react_native_1.View style={{ position: 'absolute' }}>
        <main_1.PieChartMain {...props} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.PieChart = PieChart;
