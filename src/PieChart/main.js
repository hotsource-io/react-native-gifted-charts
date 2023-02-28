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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChartMain = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var colors_1 = require("./colors");
var PieChartMain = function (props) {
    var isThreeD = props.isThreeD;
    var propData = props.data;
    var data = [];
    if (propData) {
        for (var i = 0; i < propData.length; i++) {
            if (propData[i].value !== 0) {
                data.push(propData[i]);
            }
        }
    }
    var radius = props.radius || 120;
    var canvasWidth = radius * 2;
    var canvasHeight = isThreeD ? radius * 2.3 : radius * 2;
    var shadowWidth = props.shadowWidth || radius / 5;
    var backgroundColor = props.backgroundColor || 'transparent';
    var shadowColor = props.shadowColor || 'lightgray';
    var semiCircle = props.semiCircle || false;
    var pi = Math.PI;
    var initialAngle = props.initialAngle || (semiCircle ? pi / -2 : 0);
    var shadow = props.shadow || false;
    var donut = props.donut || false;
    var strokeWidth = props.strokeWidth || 0;
    var strokeColor = props.strokeColor || (strokeWidth ? 'gray' : 'transparent');
    var innerRadius = props.innerRadius || radius / 2.5;
    var innerCircleColor = props.innerCircleColor || props.backgroundColor || 'white';
    var innerCircleBorderWidth = props.innerCircleBorderWidth ||
        (props.innerCircleBorderColor ? strokeWidth || 2 : 0);
    var innerCircleBorderColor = props.innerCircleBorderColor || 'lightgray';
    var shiftInnerCenterX = props.shiftInnerCenterX || 0;
    var shiftInnerCenterY = props.shiftInnerCenterY || 0;
    var showText = props.showText || false;
    var textColor = props.textColor || '';
    var textSize = props.textSize ? Math.min(props.textSize, radius / 5) : 16;
    var tiltAngle = props.tiltAngle || '55deg';
    if (tiltAngle &&
        !isNaN(Number(tiltAngle)) &&
        !(tiltAngle + '').endsWith('deg')) {
        tiltAngle += 'deg';
    }
    // const tilt = props.tilt ? Math.min(props.tilt, 1) : props.isThreeD ? 0.5 : 1;
    var labelsPosition = props.labelsPosition
        ? props.labelsPosition
        : donut || props.centerLabelComponent
            ? 'outward'
            : 'mid';
    var showTextBackground = props.showTextBackground || false;
    var textBackgroundColor = props.textBackgroundColor || 'white';
    var showValuesAsLabels = props.showValuesAsLabels || false;
    var showGradient = props.showGradient || false;
    var gradientCenterColor = props.gradientCenterColor || 'white';
    var toggleFocusOnPress = props.toggleFocusOnPress === false ? false : true;
    var isDataShifted = false;
    var minShiftX = 0, maxShiftX = 0, minShiftY = 0, maxShiftY = 0;
    data.forEach(function (item) {
        total += item.value;
        if (item.shiftX || item.shiftY) {
            isDataShifted = true;
            if (minShiftX > item.shiftX) {
                minShiftX = item.shiftX;
            }
            if (minShiftY > item.shiftY) {
                minShiftY = item.shiftY;
            }
            if (maxShiftX < item.shiftX) {
                maxShiftX = item.shiftX;
            }
            if (maxShiftY < item.shiftY) {
                maxShiftY = item.shiftY;
            }
        }
    });
    var horizAdjustment = maxShiftX - minShiftX;
    var vertAdjustment = maxShiftY - minShiftY;
    if (semiCircle) {
        pi = Math.PI / 2;
    }
    var cx = radius, cy = radius;
    var total = data && data.length
        ? data.map(function (item) { return item.value; }).reduce(function (v, a) { return v + a; })
        : 0;
    var acc = 0;
    var pData = data.map(function (item) {
        acc += item.value / total;
        return acc;
    });
    acc = 0;
    var mData = data.map(function (item) {
        var pAcc = acc;
        acc += item.value / total;
        return pAcc + (acc - pAcc) / 2;
    });
    pData = __spreadArray([0], __read(pData), false);
    return (<react_native_1.View style={[
            {
                backgroundColor: backgroundColor,
                height: semiCircle ? canvasHeight / 2 : canvasHeight,
                width: canvasWidth,
                overflow: 'hidden',
            },
            isThreeD && { transform: [{ rotateX: tiltAngle }] },
        ]}>
      <react_native_svg_1.default viewBox={"".concat(strokeWidth / -2 + minShiftX, " ").concat(strokeWidth / -2 + minShiftY, " ").concat((radius + strokeWidth) * 2 +
            horizAdjustment +
            (horizAdjustment ? strokeWidth : 0), " ").concat((radius + strokeWidth) * 2 +
            +vertAdjustment +
            (vertAdjustment ? strokeWidth : 0))} height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
        <react_native_svg_1.Defs>
          {data.map(function (item, index) {
            return (<react_native_svg_1.RadialGradient key={index + ''} id={'grad' + index} cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
                <react_native_svg_1.Stop offset="0%" stopColor={item.gradientCenterColor || gradientCenterColor} stopOpacity="1"/>
                <react_native_svg_1.Stop offset="100%" stopColor={item.color || colors_1.colors[index % 9]} stopOpacity="1"/>
              </react_native_svg_1.RadialGradient>);
        })}
        </react_native_svg_1.Defs>
        {data.length === 1 ? (<>
            <react_native_svg_1.Circle cx={cx} cy={cy} r={radius} fill={showGradient ? "url(#grad".concat(0, ")") : data[0].color || colors_1.colors[0 % 9]} onPress={function () {
                data[0].onPress
                    ? data[0].onPress()
                    : props.onPress
                        ? props.onPress(data[0], 0)
                        : null;
            }}/>
          </>) : (data.map(function (item, index) {
            // console.log('index', index);
            var nextItem;
            if (index === pData.length - 1)
                nextItem = pData[0];
            else
                nextItem = pData[index + 1];
            var sx = cx * (1 + Math.sin(2 * pi * pData[index] + initialAngle)) +
                (item.shiftX || 0);
            var sy = cy * (1 - Math.cos(2 * pi * pData[index] + initialAngle)) +
                (item.shiftY || 0);
            var ax = cx * (1 + Math.sin(2 * pi * nextItem + initialAngle)) +
                (item.shiftX || 0);
            var ay = cy * (1 - Math.cos(2 * pi * nextItem + initialAngle)) +
                (item.shiftY || 0);
            return (<react_native_svg_1.Path key={index + 'a'} d={"M ".concat(cx + (item.shiftX || 0), " ").concat(cy + (item.shiftY || 0), " L ").concat(sx, " ").concat(sy, " A ").concat(radius, " ").concat(radius, " 0 ").concat(semiCircle ? 0 : data[index].value > total / 2 ? 1 : 0, " 1 ").concat(ax, " ").concat(ay, " L ").concat(cx + (item.shiftX || 0), " ").concat(cy + (item.shiftY || 0))} stroke={item.strokeColor || strokeColor} strokeWidth={props.focusOnPress && props.selectedIndex === index
                    ? 0
                    : item.strokeWidth === 0
                        ? 0
                        : item.strokeWidth || strokeWidth} fill={props.selectedIndex === index || item.peripheral
                    ? 'transparent'
                    : showGradient
                        ? "url(#grad".concat(index, ")")
                        : item.color || colors_1.colors[index % 9]} onPress={function () {
                    if (item.onPress) {
                        item.onPress();
                    }
                    else if (props.onPress) {
                        props.onPress(item, index);
                    }
                    if (props.focusOnPress) {
                        if (props.selectedIndex === index) {
                            if (toggleFocusOnPress) {
                                props.setSelectedIndex(-1);
                            }
                        }
                        else {
                            props.setSelectedIndex(index);
                        }
                    }
                }}/>);
        }))}

        {showText &&
            data.map(function (item, index) {
                var mx = cx * (1 + Math.sin(2 * pi * mData[index] + initialAngle));
                var my = cy * (1 - Math.cos(2 * pi * mData[index] + initialAngle));
                var midx = (mx + cx) / 2;
                var midy = (my + cy) / 2;
                var x = midx, y = midy;
                var labelPosition = item.labelPosition || labelsPosition;
                if (labelPosition === 'onBorder') {
                    x = mx;
                    y = my;
                }
                else if (labelPosition === 'outward') {
                    x = (midx + mx) / 2;
                    y = (midy + my) / 2;
                }
                else if (labelPosition === 'inward') {
                    x = (midx + cx) / 2;
                    y = (midy + cy) / 2;
                }
                x += item.shiftX || 0;
                y += item.shiftY || 0;
                if (data.length === 1) {
                    if (donut) {
                        y =
                            (radius -
                                innerRadius +
                                (item.textBackgroundRadius ||
                                    props.textBackgroundRadius ||
                                    item.textSize ||
                                    textSize)) /
                                2;
                    }
                    else {
                        y = cy;
                    }
                }
                // console.log('sx', sx);
                // console.log('sy', sy);
                // console.log('ax', ax);
                // console.log('ay', ay);
                return (<react_1.default.Fragment key={index + 'b'}>
                {/* <Line x1={mx} x2={cx} y1={my} y2={cy} stroke="black" /> */}
                {showTextBackground && (<react_native_svg_1.Circle cx={x} cy={y - (item.textSize || textSize) / 4} r={item.textBackgroundRadius ||
                            props.textBackgroundRadius ||
                            item.textSize ||
                            textSize} fill={item.textBackgroundColor || textBackgroundColor} onPress={function () {
                            item.onLabelPress
                                ? item.onLabelPress()
                                : props.onLabelPress
                                    ? props.onLabelPress(item, index)
                                    : item.onPress
                                        ? item.onPress()
                                        : props.onPress
                                            ? props.onPress(item, index)
                                            : null;
                            if (props.focusOnPress) {
                                if (props.selectedIndex === index) {
                                    if (toggleFocusOnPress) {
                                        props.setSelectedIndex(-1);
                                    }
                                }
                                else {
                                    props.setSelectedIndex(index);
                                }
                            }
                        }}/>)}
                <react_native_svg_1.Text fill={item.textColor || textColor || colors_1.colors[(index + 2) % 9]} fontSize={item.textSize || textSize} fontFamily={item.font || props.font} fontWeight={item.fontWeight || props.fontWeight} fontStyle={item.fontStyle || props.fontStyle || 'normal'} x={x +
                        (item.shiftTextX || 0) -
                        (item.textSize || textSize) / 1.8} y={y + (item.shiftTextY || 0)} onPress={function () {
                        item.onLabelPress
                            ? item.onLabelPress()
                            : props.onLabelPress
                                ? props.onLabelPress(item, index)
                                : item.onPress
                                    ? item.onPress()
                                    : props.onPress
                                        ? props.onPress(item, index)
                                        : null;
                        if (props.focusOnPress) {
                            if (props.selectedIndex === index) {
                                if (toggleFocusOnPress) {
                                    props.setSelectedIndex(-1);
                                }
                            }
                            else {
                                props.setSelectedIndex(index);
                            }
                        }
                    }}>
                  {item.text || (showValuesAsLabels ? item.value + '' : '')}
                </react_native_svg_1.Text>
              </react_1.default.Fragment>);
            })}
      </react_native_svg_1.default>
      {(props.centerLabelComponent || (donut && !isDataShifted)) && (<react_native_1.View style={[
                {
                    height: innerRadius * 2,
                    width: innerRadius * 2,
                    borderRadius: innerRadius,
                    position: 'absolute',
                    zIndex: 100,
                    alignSelf: 'center',
                    backgroundColor: innerCircleColor,
                    left: canvasWidth / 2 - innerRadius + shiftInnerCenterX,
                    top: canvasHeight / 2 -
                        innerRadius +
                        shiftInnerCenterY -
                        (isThreeD ? radius / 5 : 0),
                    borderWidth: innerCircleBorderWidth,
                    borderColor: innerCircleBorderColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                isThreeD && {
                    borderTopWidth: innerCircleBorderWidth * 5,
                    borderLeftWidth: shiftInnerCenterX
                        ? innerCircleBorderWidth * 2
                        : innerCircleBorderWidth,
                },
                semiCircle &&
                    isThreeD && {
                    borderTopWidth: isThreeD
                        ? innerCircleBorderWidth * 5
                        : innerCircleBorderWidth,
                    borderLeftWidth: 0.5,
                    borderLeftColor: innerCircleColor,
                    borderBottomWidth: 0,
                    borderRightWidth: 0.5,
                    borderRightColor: innerCircleColor,
                },
            ]}>
          <react_native_1.View style={{ marginTop: semiCircle ? -0.5 * innerRadius : 0 }}>
            {props.centerLabelComponent ? props.centerLabelComponent() : null}
          </react_native_1.View>
        </react_native_1.View>)}
      {isThreeD && shadow && !semiCircle ? (<react_native_1.View style={{
                width: radius * 2,
                height: radius * 2,
                backgroundColor: shadowColor,
                borderRadius: radius,
                position: 'absolute',
                top: shadowWidth,
                zIndex: -1,
            }}/>) : null}
    </react_native_1.View>);
};
exports.PieChartMain = PieChartMain;
