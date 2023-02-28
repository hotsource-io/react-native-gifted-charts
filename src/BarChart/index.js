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
exports.BarChart = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var styles_1 = require("./styles");
var RenderBars_1 = __importDefault(require("./RenderBars"));
var RenderStackBars_1 = __importDefault(require("./RenderStackBars"));
var lineSvg_1 = __importDefault(require("../Components/lineSvg"));
var utils_1 = require("../utils");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var BarChart = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var scrollRef = (0, react_1.useRef)();
    var _r = __read((0, react_1.useState)(''), 2), points = _r[0], setPoints = _r[1];
    var _s = __read((0, react_1.useState)(''), 2), arrowPoints = _s[0], setArrowPoints = _s[1];
    var _t = __read((0, react_1.useState)(-1), 2), selectedIndex = _t[0], setSelectedIndex = _t[1];
    var showLine = props.showLine || false;
    var initialSpacing = props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
    var data = (0, react_1.useMemo)(function () {
        if (!props.data) {
            return [];
        }
        if (props.yAxisOffset) {
            return props.data.map(function (item) {
                item.value = item.value - props.yAxisOffset;
                return item;
            });
        }
        return props.data;
    }, [props.yAxisOffset, props.data]);
    var lineData = props.lineData || data;
    var lineBehindBars = props.lineBehindBars || false;
    var defaultLineConfig = {
        initialSpacing: initialSpacing,
        curved: false,
        isAnimated: false,
        thickness: 1,
        color: 'black',
        hideDataPoints: false,
        dataPointsShape: 'circular',
        dataPointsWidth: 2,
        dataPointsHeight: 2,
        dataPointsColor: 'black',
        dataPointsRadius: 3,
        textColor: 'gray',
        textFontSize: 10,
        textShiftX: 0,
        textShiftY: 0,
        shiftY: 0,
        delay: 0,
        startIndex: 0,
        endIndex: lineData.length - 1,
        showArrow: false,
        arrowConfig: {
            length: 10,
            width: 10,
            strokeWidth: 1,
            strokeColor: 'black',
            fillColor: 'none',
            showArrowBase: true,
        },
    };
    var lineConfig = props.lineConfig
        ? {
            initialSpacing: props.lineConfig.initialSpacing === 0
                ? 0
                : props.lineConfig.initialSpacing ||
                    defaultLineConfig.initialSpacing,
            curved: props.lineConfig.curved || defaultLineConfig.curved,
            isAnimated: props.lineConfig.isAnimated || defaultLineConfig.isAnimated,
            thickness: props.lineConfig.thickness || defaultLineConfig.thickness,
            color: props.lineConfig.color || defaultLineConfig.color,
            hideDataPoints: props.lineConfig.hideDataPoints || defaultLineConfig.hideDataPoints,
            dataPointsShape: props.lineConfig.dataPointsShape || defaultLineConfig.dataPointsShape,
            dataPointsHeight: props.lineConfig.dataPointsHeight ||
                defaultLineConfig.dataPointsHeight,
            dataPointsWidth: props.lineConfig.dataPointsWidth || defaultLineConfig.dataPointsWidth,
            dataPointsColor: props.lineConfig.dataPointsColor || defaultLineConfig.dataPointsColor,
            dataPointsRadius: props.lineConfig.dataPointsRadius ||
                defaultLineConfig.dataPointsRadius,
            textColor: props.lineConfig.textColor || defaultLineConfig.textColor,
            textFontSize: props.lineConfig.textFontSize || defaultLineConfig.textFontSize,
            textShiftX: props.lineConfig.textShiftX || defaultLineConfig.textShiftX,
            textShiftY: props.lineConfig.textShiftY || defaultLineConfig.textShiftY,
            shiftY: props.lineConfig.shiftY || defaultLineConfig.shiftY,
            delay: props.lineConfig.delay || defaultLineConfig.delay,
            startIndex: props.lineConfig.startIndex || defaultLineConfig.startIndex,
            endIndex: props.lineConfig.endIndex === 0
                ? 0
                : props.lineConfig.endIndex || defaultLineConfig.endIndex,
            showArrow: (_a = props.lineConfig.showArrow) !== null && _a !== void 0 ? _a : defaultLineConfig.showArrow,
            arrowConfig: {
                length: (_c = (_b = props.lineConfig.arrowConfig) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : defaultLineConfig.arrowConfig.length,
                width: (_e = (_d = props.lineConfig.arrowConfig) === null || _d === void 0 ? void 0 : _d.width) !== null && _e !== void 0 ? _e : defaultLineConfig.arrowConfig.width,
                strokeWidth: (_g = (_f = props.lineConfig.arrowConfig) === null || _f === void 0 ? void 0 : _f.strokeWidth) !== null && _g !== void 0 ? _g : defaultLineConfig.arrowConfig.strokeWidth,
                strokeColor: (_j = (_h = props.lineConfig.arrowConfig) === null || _h === void 0 ? void 0 : _h.strokeColor) !== null && _j !== void 0 ? _j : defaultLineConfig.arrowConfig.strokeColor,
                fillColor: (_l = (_k = props.lineConfig.arrowConfig) === null || _k === void 0 ? void 0 : _k.fillColor) !== null && _l !== void 0 ? _l : defaultLineConfig.arrowConfig.fillColor,
                showArrowBase: (_o = (_m = props.lineConfig.arrowConfig) === null || _m === void 0 ? void 0 : _m.showArrowBase) !== null && _o !== void 0 ? _o : defaultLineConfig.arrowConfig.showArrowBase,
            },
        }
        : defaultLineConfig;
    var containerHeight = props.height || 200;
    var noOfSections = props.noOfSections || 10;
    var horizSections = [{ value: '0' }];
    var horizSectionsBelow = [];
    var stepHeight = props.stepHeight || containerHeight / noOfSections;
    var spacing = props.spacing === 0 ? 0 : props.spacing || 20;
    var labelWidth = props.labelWidth || 0;
    var scrollToEnd = props.scrollToEnd || false;
    var scrollAnimation = props.scrollAnimation === false ? false : true;
    var labelsExtraHeight = props.labelsExtraHeight || 0;
    var totalWidth = spacing;
    var maxItem = 0, minItem = 0;
    if (props.stackData) {
        props.stackData.forEach(function (stackItem) {
            // console.log('stackItem', stackItem);
            var stackSum = stackItem.stacks.reduce(function (acc, stack) { return acc + stack.value; }, 0);
            // console.log('stackSum--->', stackSum);
            if (stackSum > maxItem) {
                maxItem = stackSum;
            }
            if (stackSum < minItem) {
                minItem = stackSum;
            }
            totalWidth +=
                (stackItem.stacks[0].barWidth || props.barWidth || 30) + spacing;
            // console.log('totalWidth for stack===', totalWidth);
        });
    }
    else {
        data.forEach(function (item) {
            if (item.value > maxItem) {
                maxItem = item.value;
            }
            if (item.value < minItem) {
                minItem = item.value;
            }
            totalWidth +=
                (item.barWidth || props.barWidth || 30) +
                    (item.spacing === 0 ? 0 : item.spacing || spacing);
            // console.log('totalWidth for bar===', totalWidth);
        });
    }
    if (props.showFractionalValues || props.roundToDigits) {
        maxItem *= 10 * (props.roundToDigits || 1);
        maxItem = maxItem + (10 - (maxItem % 10));
        maxItem /= 10 * (props.roundToDigits || 1);
        maxItem = parseFloat(maxItem.toFixed(props.roundToDigits || 1));
        if (minItem !== 0) {
            minItem *= 10 * (props.roundToDigits || 1);
            minItem = minItem - (10 + (minItem % 10));
            minItem /= 10 * (props.roundToDigits || 1);
            minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
        }
    }
    else {
        maxItem = maxItem + (10 - (maxItem % 10));
        if (minItem !== 0) {
            minItem = minItem - (10 + (minItem % 10));
        }
    }
    var maxValue = props.maxValue || maxItem;
    var minValue = props.minValue || minItem;
    var stepValue = props.stepValue || maxValue / noOfSections;
    var noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis || -minValue / stepValue;
    var disableScroll = props.disableScroll || false;
    var showScrollIndicator = props.showScrollIndicator || false;
    // const oldData = props.oldData || [];
    var side = props.side || '';
    var rotateLabel = props.rotateLabel || false;
    var isAnimated = props.isAnimated || false;
    var animationDuration = props.animationDuration || 800;
    // const animationEasing = props.animationEasing || Easing.ease;
    var opacity = props.opacity || 1;
    var isThreeD = props.isThreeD || false;
    var showVerticalLines = props.showVerticalLines || false;
    var rulesThickness = props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
    var rulesLength = props.rulesLength;
    var rulesColor = props.rulesColor || 'lightgray';
    var verticalLinesThickness = props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
    var verticalLinesHeight = props.verticalLinesHeight;
    var verticalLinesColor = props.verticalLinesColor || 'lightgray';
    var verticalLinesZIndex = props.verticalLinesZIndex || -1;
    var verticalLinesAr = [];
    props.noOfVerticalLines
        ? (verticalLinesAr = __spreadArray([], __read(Array(props.noOfVerticalLines).keys()), false))
        : (verticalLinesAr = __spreadArray([], __read(Array(props.stackData ? props.stackData.length : data.length).keys()), false));
    var verticalLinesSpacing = props.verticalLinesSpacing || 0;
    var showYAxisIndices = props.showYAxisIndices || false;
    var showXAxisIndices = props.showXAxisIndices || false;
    var yAxisIndicesHeight = props.yAxisIndicesHeight || 2;
    var xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
    var yAxisIndicesWidth = props.yAxisIndicesWidth || 4;
    var xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
    var xAxisIndicesColor = props.xAxisIndicesColor || 'black';
    var yAxisIndicesColor = props.yAxisIndicesColor || 'black';
    var yAxisLabelPrefix = props.yAxisLabelPrefix || '';
    var yAxisLabelSuffix = props.yAxisLabelSuffix || '';
    var yAxisSide = props.yAxisSide || 'left';
    var xAxisThickness = props.xAxisThickness === 0
        ? props.xAxisThickness
        : props.xAxisThickness || 1;
    var xAxisLength = props.xAxisLength;
    var xAxisColor = props.xAxisColor || 'black';
    var hideRules = props.hideRules || false;
    var yAxisThickness = props.yAxisThickness === 0
        ? props.yAxisThickness
        : props.yAxisThickness || 1;
    var yAxisColor = props.yAxisColor || 'black';
    var yAxisTextStyle = props.yAxisTextStyle;
    var yAxisTextNumberOfLines = props.yAxisTextNumberOfLines || 1;
    var xAxisTextNumberOfLines = props.xAxisTextNumberOfLines || 1;
    var yAxisLabelContainerStyle = props.yAxisLabelContainerStyle;
    var horizontalRulesStyle = props.horizontalRulesStyle;
    var showFractionalValues = props.showFractionalValues || false;
    var yAxisLabelWidth = props.yAxisLabelWidth || 35;
    var hideYAxisText = props.hideYAxisText || false;
    var backgroundColor = props.backgroundColor || 'transparent';
    var horizontal = props.horizontal || false;
    var yAxisAtTop = props.yAxisAtTop || false;
    var intactTopLabel = props.intactTopLabel || false;
    var hideOrigin = props.hideOrigin || false;
    var rulesType = props.rulesType || 'line';
    var xAxisType = props.xAxisType || 'solid';
    var dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
    var dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;
    var heightValue = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var opacValue = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var widthValue = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var autoShiftLabels = props.autoShiftLabels || false;
    var labelsAppear = (0, react_1.useCallback)(function () {
        opacValue.setValue(0);
        react_native_1.Animated.timing(opacValue, {
            toValue: 1,
            duration: 500,
            easing: react_native_1.Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [opacValue]);
    // const moveBar = useCallback(() => {
    //   heightValue.setValue(0);
    //   Animated.timing(heightValue, {
    //     toValue: 1,
    //     duration: animationDuration,
    //     easing: animationEasing,
    //     useNativeDriver: false,
    //   }).start();
    // }, [animationDuration, animationEasing, heightValue]);
    var decreaseWidth = (0, react_1.useCallback)(function () {
        widthValue.setValue(0);
        react_native_1.Animated.timing(widthValue, {
            toValue: 1,
            duration: animationDuration,
            easing: react_native_1.Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [animationDuration, widthValue]);
    // console.log('olddata', oldData);
    var getArrowPoints = function (arrowTipX, arrowTipY, x1, y1, arrowLength, arrowWidth, showArrowBase) {
        var dataLineSlope = (arrowTipY - y1) / (arrowTipX - x1);
        var d = arrowLength;
        var d2 = arrowWidth / 2;
        var interSectionX = arrowTipX - Math.sqrt((d * d) / (dataLineSlope * dataLineSlope + 1));
        var interSectionY = arrowTipY - dataLineSlope * (arrowTipX - interSectionX);
        var arrowBasex1, arrowBaseY1, arrowBaseX2, arrowBaseY2;
        if (dataLineSlope === 0) {
            arrowBasex1 = interSectionX;
            arrowBaseY1 = interSectionY - d2;
            arrowBaseX2 = interSectionX;
            arrowBaseY2 = interSectionY + d2;
        }
        else {
            var arrowBaseSlope = -1 / dataLineSlope;
            arrowBasex1 =
                interSectionX -
                    Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
            arrowBaseY1 =
                interSectionY - arrowBaseSlope * (interSectionX - arrowBasex1);
            arrowBaseX2 =
                interSectionX +
                    Math.sqrt((d2 * d2) / (arrowBaseSlope * arrowBaseSlope + 1));
            arrowBaseY2 =
                interSectionY + arrowBaseSlope * (interSectionX - arrowBasex1);
        }
        var arrowPoints = " M".concat(interSectionX, " ").concat(interSectionY);
        arrowPoints += " ".concat(showArrowBase ? 'L' : 'M').concat(arrowBasex1, " ").concat(arrowBaseY1);
        arrowPoints += " L".concat(arrowTipX, " ").concat(arrowTipY);
        arrowPoints += " M".concat(interSectionX, " ").concat(interSectionY);
        arrowPoints += " ".concat(showArrowBase ? 'L' : 'M').concat(arrowBaseX2, " ").concat(arrowBaseY2);
        arrowPoints += " L".concat(arrowTipX, " ").concat(arrowTipY);
        return arrowPoints;
    };
    (0, react_1.useEffect)(function () {
        if (showLine) {
            var pp = '';
            if (!lineConfig.curved) {
                for (var i = 0; i < lineData.length; i++) {
                    if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                        continue;
                    var currentBarWidth = (data && data[i] && data[i].barWidth) || props.barWidth || 30;
                    pp +=
                        'L' +
                            (yAxisLabelWidth +
                                lineConfig.initialSpacing +
                                6 -
                                (initialSpacing - currentBarWidth / 2) -
                                lineConfig.dataPointsWidth / 2 +
                                (currentBarWidth + spacing) * i) +
                            ' ' +
                            (containerHeight -
                                lineConfig.shiftY -
                                (lineData[i].value * containerHeight) / maxValue) +
                            ' ';
                }
                setPoints(pp.replace('L', 'M'));
                if (lineData.length > 1 && lineConfig.showArrow) {
                    var ppArray = pp.trim().split(' ');
                    var arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    var arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    var y1 = parseInt(ppArray[ppArray.length - 3]);
                    var x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    var arrowPoints_1 = getArrowPoints(arrowTipX, arrowTipY, x1, y1, lineConfig.arrowConfig.length, lineConfig.arrowConfig.width, lineConfig.arrowConfig.showArrowBase);
                    setArrowPoints(arrowPoints_1);
                }
            }
            else {
                var p1Array = [];
                for (var i = 0; i < lineData.length; i++) {
                    if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                        continue;
                    var currentBarWidth = (data && data[i] && data[i].barWidth) || props.barWidth || 30;
                    p1Array.push([
                        yAxisLabelWidth +
                            lineConfig.initialSpacing +
                            6 -
                            (initialSpacing - currentBarWidth / 2) -
                            lineConfig.dataPointsWidth / 2 +
                            (currentBarWidth + spacing) * i,
                        containerHeight -
                            lineConfig.shiftY -
                            (lineData[i].value * containerHeight) / maxValue,
                    ]);
                    var xx = (0, utils_1.svgPath)(p1Array, utils_1.bezierCommand);
                    setPoints(xx);
                }
            }
            if (lineConfig.isAnimated) {
                setTimeout(function () { return decreaseWidth(); }, lineConfig.delay || 0);
            }
        }
        // moveBar();
        setTimeout(function () { return labelsAppear(); }, animationDuration);
    }, [
        animationDuration,
        containerHeight,
        data,
        lineData,
        decreaseWidth,
        initialSpacing,
        labelsAppear,
        lineConfig.initialSpacing,
        lineConfig.curved,
        lineConfig.dataPointsWidth,
        lineConfig.shiftY,
        lineConfig.isAnimated,
        lineConfig.delay,
        lineConfig.startIndex,
        lineConfig.endIndex,
        maxValue,
        props.barWidth,
        showLine,
        spacing,
        yAxisLabelWidth,
        lineConfig.showArrow,
        lineConfig.arrowConfig.length,
        lineConfig.arrowConfig.width,
        lineConfig.arrowConfig.showArrowBase,
    ]);
    var defaultReferenceConfig = {
        thickness: rulesThickness,
        width: horizontal
            ? props.width || totalWidth
            : (props.width || totalWidth) + 11,
        color: 'black',
        type: rulesType,
        dashWidth: dashWidth,
        dashGap: dashGap,
        labelText: '',
        labelTextStyle: null,
    };
    var showReferenceLine1 = props.showReferenceLine1 || false;
    var referenceLine1Position = props.referenceLine1Position === 0
        ? 0
        : props.referenceLine1Position || containerHeight / 2;
    var referenceLine1Config = props.referenceLine1Config
        ? {
            thickness: props.referenceLine1Config.thickness || rulesThickness,
            width: horizontal
                ? props.referenceLine1Config.width || props.width || totalWidth
                : (props.referenceLine1Config.width || props.width || totalWidth) +
                    11,
            color: props.referenceLine1Config.color || 'black',
            type: props.referenceLine1Config.type || rulesType,
            dashWidth: props.referenceLine1Config.dashWidth || dashWidth,
            dashGap: props.referenceLine1Config.dashGap || dashGap,
            labelText: props.referenceLine1Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: props.referenceLine1Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
        }
        : defaultReferenceConfig;
    var showReferenceLine2 = props.showReferenceLine2 || false;
    var referenceLine2Position = props.referenceLine2Position === 0
        ? 0
        : props.referenceLine2Position || (3 * containerHeight) / 2;
    var referenceLine2Config = props.referenceLine2Config
        ? {
            thickness: props.referenceLine2Config.thickness || rulesThickness,
            width: horizontal
                ? props.referenceLine2Config.width || props.width || totalWidth
                : (props.referenceLine2Config.width || props.width || totalWidth) +
                    11,
            color: props.referenceLine2Config.color || 'black',
            type: props.referenceLine2Config.type || rulesType,
            dashWidth: props.referenceLine2Config.dashWidth || dashWidth,
            dashGap: props.referenceLine2Config.dashGap || dashGap,
            labelText: props.referenceLine2Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: props.referenceLine2Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
        }
        : defaultReferenceConfig;
    var showReferenceLine3 = props.showReferenceLine3 || false;
    var referenceLine3Position = props.referenceLine3Position === 0
        ? 0
        : props.referenceLine3Position || containerHeight / 3;
    var referenceLine3Config = props.referenceLine3Config
        ? {
            thickness: props.referenceLine3Config.thickness || rulesThickness,
            width: horizontal
                ? props.referenceLine3Config.width || props.width || totalWidth
                : (props.referenceLine3Config.width || props.width || totalWidth) +
                    11,
            color: props.referenceLine3Config.color || 'black',
            type: props.referenceLine3Config.type || rulesType,
            dashWidth: props.referenceLine3Config.dashWidth || dashWidth,
            dashGap: props.referenceLine3Config.dashGap || dashGap,
            labelText: props.referenceLine3Config.labelText ||
                defaultReferenceConfig.labelText,
            labelTextStyle: props.referenceLine3Config.labelTextStyle ||
                defaultReferenceConfig.labelTextStyle,
        }
        : defaultReferenceConfig;
    horizSections.pop();
    for (var i = 0; i <= noOfSections; i++) {
        var value = maxValue - stepValue * i;
        if (props.showFractionalValues || props.roundToDigits) {
            value = parseFloat(value.toFixed(props.roundToDigits || 1));
        }
        horizSections.push({
            value: props.yAxisLabelTexts
                ? (_p = props.yAxisLabelTexts[noOfSections - i]) !== null && _p !== void 0 ? _p : value.toString()
                : value.toString(),
        });
    }
    if (noOfSectionsBelowXAxis) {
        for (var i = 1; i <= noOfSectionsBelowXAxis; i++) {
            var value = stepValue * -i;
            if (props.showFractionalValues || props.roundToDigits) {
                value = parseFloat(value.toFixed(props.roundToDigits || 1));
            }
            horizSectionsBelow.push({
                value: props.yAxisLabelTexts
                    ? (_q = props.yAxisLabelTexts[noOfSectionsBelowXAxis - i]) !== null && _q !== void 0 ? _q : value.toString()
                    : value.toString(),
            });
        }
    }
    var animatedHeight = heightValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    var appearingOpacity = opacValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    var animatedWidth = widthValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalWidth],
    });
    var getLabel = function (val, index) {
        var label = '';
        if (showFractionalValues ||
            (props.yAxisLabelTexts && props.yAxisLabelTexts[index] !== undefined)) {
            if (val) {
                label = props.yAxisOffset
                    ? (Number(val) + props.yAxisOffset).toString()
                    : val;
            }
            else {
                label = props.yAxisOffset ? props.yAxisOffset.toString() : '0';
            }
        }
        else {
            if (val) {
                label = val.toString().split('.')[0];
                if (props.yAxisOffset) {
                    label = (Number(label) + props.yAxisOffset).toString();
                }
            }
            else {
                label = props.yAxisOffset ? props.yAxisOffset.toString() : '0';
            }
        }
        return yAxisLabelPrefix + label + yAxisLabelSuffix;
    };
    var renderHorizSections = function () {
        return (<>
        {horizSections.map(function (sectionItems, index) {
                return (<react_native_1.View key={index} style={[
                        styles_1.styles.horizBar,
                        {
                            width: horizontal
                                ? props.width || Math.min(300, totalWidth)
                                : props.width || totalWidth + 11,
                        },
                        yAxisSide === 'right' && { transform: [{ rotateY: '180deg' }] },
                        horizontalRulesStyle,
                    ]}>
              <react_native_1.View style={[
                        styles_1.styles.leftLabel,
                        {
                            borderRightWidth: yAxisThickness,
                            borderColor: yAxisColor,
                        },
                        horizontal &&
                            !yAxisAtTop && {
                            transform: [
                                {
                                    translateX: (props.width || Math.min(300, totalWidth)) +
                                        yAxisThickness,
                                },
                            ],
                        },
                        {
                            height: index === noOfSections ? stepHeight / 2 : stepHeight,
                            width: yAxisLabelWidth,
                        },
                        yAxisLabelContainerStyle,
                    ]}/>
              <react_native_1.View style={[
                        index === noOfSections
                            ? styles_1.styles.lastLeftPart
                            : styles_1.styles.leftPart,
                        { backgroundColor: backgroundColor },
                    ]}>
                {index === noOfSections ? (<lineSvg_1.default config={{
                            thickness: xAxisThickness,
                            color: xAxisColor,
                            width: xAxisLength ||
                                (horizontal
                                    ? props.width || Math.min(300, totalWidth)
                                    : (props.width || totalWidth) + 11),
                            dashWidth: dashWidth,
                            dashGap: dashGap,
                            type: xAxisType,
                        }}/>) : hideRules ? null : (<lineSvg_1.default config={{
                            thickness: rulesThickness,
                            color: rulesColor,
                            width: rulesLength ||
                                (horizontal
                                    ? props.width || Math.min(300, totalWidth)
                                    : (props.width || totalWidth) + 11),
                            dashWidth: dashWidth,
                            dashGap: dashGap,
                            type: rulesType,
                        }}/>)}
              </react_native_1.View>
            </react_native_1.View>);
            })}

        {
            /***********************************************************************************************/
            /**************************      Render the y axis labels separately      **********************/
            /***********************************************************************************************/
            props.hideAxesAndRules !== true &&
                !hideYAxisText &&
                horizSections.map(function (sectionItems, index) {
                    var label = getLabel(sectionItems.value, index);
                    if (hideOrigin && index === horizSections.length - 1) {
                        label = '';
                    }
                    return (<react_native_1.View key={index} style={[
                            styles_1.styles.horizBar,
                            styles_1.styles.leftLabel,
                            {
                                position: 'absolute',
                                zIndex: 1,
                                top: stepHeight * index,
                                width: yAxisLabelWidth,
                                height: index === noOfSections ? stepHeight / 2 : stepHeight,
                            },
                            yAxisSide === 'right' && {
                                transform: [
                                    {
                                        translateX: (props.width ? props.width : totalWidth) - 30,
                                    },
                                    { rotateY: '180deg' },
                                ],
                            },
                            horizontal &&
                                !yAxisAtTop && {
                                transform: [
                                    {
                                        translateX: (props.width || Math.min(300, totalWidth)) +
                                            yAxisThickness +
                                            yAxisLabelWidth,
                                    },
                                ],
                            },
                            yAxisLabelContainerStyle,
                        ]}>
                  <react_native_1.Text numberOfLines={yAxisTextNumberOfLines} ellipsizeMode={'clip'} style={[
                            yAxisTextStyle,
                            yAxisSide === 'right' && {
                                transform: [{ rotateY: '180deg' }],
                            },
                            index === noOfSections && {
                                marginBottom: stepHeight / -2,
                            },
                        ]}>
                    {label}
                  </react_native_1.Text>
                </react_native_1.View>);
                })
            /***********************************************************************************************/
            /***********************************************************************************************/
            }
        {horizSectionsBelow.map(function (sectionItems, index) {
                return (<react_native_1.View key={index} style={[
                        styles_1.styles.horizBar,
                        {
                            width: horizontal
                                ? props.width || totalWidth
                                : props.width || totalWidth + 11,
                        },
                        yAxisSide === 'right' && { transform: [{ rotateY: '180deg' }] },
                        index === 0 && { marginTop: stepHeight / 2 },
                    ]}>
              <react_native_1.View style={[
                        styles_1.styles.leftLabel,
                        {
                            borderRightWidth: yAxisThickness,
                            borderColor: yAxisColor,
                        },
                        horizontal &&
                            !yAxisAtTop && {
                            transform: [{ translateX: totalWidth + yAxisThickness }],
                        },
                        {
                            height: index === 0 ? stepHeight * 1.5 : stepHeight,
                            width: yAxisLabelWidth,
                        },
                        index === 0 && { marginTop: -stepHeight / 2 },
                    ]}/>
              <react_native_1.View style={[styles_1.styles.leftPart, { backgroundColor: backgroundColor }]}>
                {hideRules ? null : (<lineSvg_1.default config={{
                            thickness: rulesThickness,
                            color: rulesColor,
                            width: rulesLength ||
                                (horizontal
                                    ? props.width || totalWidth
                                    : (props.width || totalWidth) + 11),
                            dashWidth: dashWidth,
                            dashGap: dashGap,
                            type: rulesType,
                        }}/>)}
              </react_native_1.View>
            </react_native_1.View>);
            })}
        {
            /***********************************************************************************************/
            /*************************      Render the y axis labels below origin      *********************/
            /***********************************************************************************************/
            props.hideAxesAndRules !== true &&
                !hideYAxisText &&
                horizSectionsBelow.map(function (sectionItems, index) {
                    var label = getLabel(horizSectionsBelow[horizSectionsBelow.length - 1 - index].value, index);
                    return (<react_native_1.View key={index} style={[
                            styles_1.styles.horizBar,
                            styles_1.styles.leftLabel,
                            {
                                position: 'absolute',
                                zIndex: 1,
                                bottom: stepHeight * (index - 1),
                                width: yAxisLabelWidth,
                                height: index === noOfSections ? stepHeight / 2 : stepHeight,
                            },
                            yAxisSide === 'right' && {
                                transform: [
                                    {
                                        translateX: (props.width ? props.width : totalWidth) - 30,
                                    },
                                    { rotateY: '180deg' },
                                ],
                            },
                            yAxisLabelContainerStyle,
                        ]}>
                  <react_native_1.Text numberOfLines={yAxisTextNumberOfLines} ellipsizeMode={'clip'} style={[
                            yAxisTextStyle,
                            yAxisSide === 'right' && {
                                transform: [{ rotateY: '180deg' }],
                            },
                            index === noOfSections && {
                                marginBottom: stepHeight / -2,
                            },
                        ]}>
                    {label}
                  </react_native_1.Text>
                </react_native_1.View>);
                })
            /***********************************************************************************************/
            /***********************************************************************************************/
            }

        {
            /***********************************************************************************************/
            /*************************      Render the reference lines separately      *********************/
            /***********************************************************************************************/
            props.hideAxesAndRules !== true &&
                !hideYAxisText &&
                horizSections.map(function (sectionItems, index) {
                    var label = getLabel(sectionItems.value, index);
                    if (hideOrigin && index === horizSections.length - 1) {
                        label = '';
                    }
                    return (<react_native_1.View key={index} style={[
                            styles_1.styles.horizBar,
                            styles_1.styles.leftLabel,
                            {
                                position: 'absolute',
                                zIndex: 1,
                                top: stepHeight * index,
                                width: yAxisLabelWidth,
                                height: index === noOfSections ? stepHeight / 2 : stepHeight,
                            },
                            yAxisSide === 'right' && {
                                transform: [
                                    {
                                        translateX: (props.width ? props.width : totalWidth) - 30,
                                    },
                                    { rotateY: '180deg' },
                                ],
                            },
                        ]}>
                  {index === noOfSections && showReferenceLine1 ? (<react_native_1.View style={{
                                position: 'absolute',
                                bottom: (referenceLine1Position * containerHeight) / maxValue,
                                left: yAxisSide === 'right'
                                    ? yAxisLabelWidth + yAxisThickness
                                    : yAxisLabelWidth + yAxisThickness - 5,
                            }}>
                      <lineSvg_1.default config={referenceLine1Config}/>
                      {referenceLine1Config.labelText ? (<react_native_1.Text style={[
                                    { position: 'absolute' },
                                    yAxisSide === 'right' && {
                                        transform: [{ rotateY: '180deg' }],
                                    },
                                    referenceLine1Config.labelTextStyle,
                                ]}>
                          {referenceLine1Config.labelText}
                        </react_native_1.Text>) : null}
                    </react_native_1.View>) : null}
                  {index === noOfSections && showReferenceLine2 ? (<react_native_1.View style={{
                                position: 'absolute',
                                bottom: (referenceLine2Position * containerHeight) / maxValue,
                                left: yAxisSide === 'right'
                                    ? yAxisLabelWidth + yAxisThickness
                                    : yAxisLabelWidth + yAxisThickness - 5,
                            }}>
                      <lineSvg_1.default config={referenceLine2Config}/>
                      {referenceLine2Config.labelText ? (<react_native_1.Text style={[
                                    { position: 'absolute' },
                                    yAxisSide === 'right' && {
                                        transform: [{ rotateY: '180deg' }],
                                    },
                                    referenceLine2Config.labelTextStyle,
                                ]}>
                          {referenceLine2Config.labelText}
                        </react_native_1.Text>) : null}
                    </react_native_1.View>) : null}
                  {index === noOfSections && showReferenceLine3 ? (<react_native_1.View style={{
                                position: 'absolute',
                                bottom: (referenceLine3Position * containerHeight) / maxValue,
                                left: yAxisSide === 'right'
                                    ? yAxisLabelWidth + yAxisThickness
                                    : yAxisLabelWidth + yAxisThickness - 5,
                            }}>
                      <lineSvg_1.default config={referenceLine3Config}/>
                      {referenceLine3Config.labelText ? (<react_native_1.Text style={[
                                    { position: 'absolute' },
                                    yAxisSide === 'right' && {
                                        transform: [{ rotateY: '180deg' }],
                                    },
                                    referenceLine3Config.labelTextStyle,
                                ]}>
                          {referenceLine3Config.labelText}
                        </react_native_1.Text>) : null}
                    </react_native_1.View>) : null}
                </react_native_1.View>);
                })
            /***********************************************************************************************/
            /***********************************************************************************************/
            }
      </>);
    };
    var renderSpecificVerticalLines = function (dataForRender) {
        return dataForRender.map(function (item, index) {
            if (item.showVerticalLine) {
                var currentBarWidth = item.barWidth || props.barWidth || 30;
                return (<react_native_svg_1.Rect x={yAxisLabelWidth +
                        6 -
                        (item.verticalLineThickness || 1) / 2 -
                        1 -
                        (initialSpacing - currentBarWidth / 2) +
                        (currentBarWidth + spacing) * index} y={containerHeight -
                        lineConfig.shiftY -
                        (item.value * containerHeight) / maxValue +
                        9} width={item.verticalLineThickness || 1} height={(item.value * containerHeight) / maxValue + lineConfig.shiftY} fill={item.verticalLineColor || 'lightgray'}/>);
            }
            return null;
        });
    };
    var renderDataPoints = function () {
        return lineData.map(function (item, index) {
            if (index < lineConfig.startIndex || index > lineConfig.endIndex) {
                return null;
            }
            // console.log('comes in');
            var currentBarWidth = item.barWidth || props.barWidth || 30;
            if (lineConfig.dataPointsShape === 'rectangular') {
                return (<react_1.Fragment key={index}>
            <react_native_svg_1.Rect x={yAxisLabelWidth +
                        lineConfig.initialSpacing +
                        6 -
                        (initialSpacing - currentBarWidth / 2) -
                        lineConfig.dataPointsWidth +
                        (currentBarWidth + spacing) * index} y={containerHeight -
                        lineConfig.shiftY -
                        lineConfig.dataPointsHeight / 2 -
                        (item.value * containerHeight) / maxValue} width={lineConfig.dataPointsWidth} height={lineConfig.dataPointsHeight} fill={lineConfig.dataPointsColor}/>
            {item.dataPointText && (<react_native_svg_1.Text fill={item.textColor || lineConfig.textColor} fontSize={item.textFontSize || lineConfig.textFontSize} x={yAxisLabelWidth +
                            lineConfig.initialSpacing +
                            6 -
                            (initialSpacing - currentBarWidth / 2) -
                            lineConfig.dataPointsWidth +
                            (currentBarWidth + spacing) * index +
                            (item.textShiftX || lineConfig.textShiftX || 0)} y={containerHeight -
                            lineConfig.shiftY -
                            lineConfig.dataPointsHeight / 2 -
                            (item.value * containerHeight) / maxValue +
                            (item.textShiftY || lineConfig.textShiftY || 0)}>
                {item.dataPointText}
              </react_native_svg_1.Text>)}
          </react_1.Fragment>);
            }
            return (<react_1.Fragment key={index}>
          <react_native_svg_1.Circle cx={yAxisLabelWidth +
                    lineConfig.initialSpacing +
                    6 -
                    (initialSpacing - currentBarWidth / 2) -
                    lineConfig.dataPointsWidth / 2 +
                    (currentBarWidth + spacing) * index} cy={containerHeight -
                    lineConfig.shiftY -
                    (item.value * containerHeight) / maxValue} r={lineConfig.dataPointsRadius} fill={lineConfig.dataPointsColor}/>
          {item.dataPointText && (<react_native_svg_1.Text fill={item.textColor || lineConfig.textColor} fontSize={item.textFontSize || lineConfig.textFontSize} x={yAxisLabelWidth +
                        lineConfig.initialSpacing +
                        6 -
                        (initialSpacing - currentBarWidth / 2) -
                        lineConfig.dataPointsWidth +
                        (currentBarWidth + spacing) * index +
                        (item.textShiftX || lineConfig.textShiftX || 0)} y={containerHeight -
                        lineConfig.shiftY -
                        lineConfig.dataPointsHeight / 2 -
                        (item.value * containerHeight) / maxValue +
                        (item.textShiftY || lineConfig.textShiftY || 0)}>
              {item.dataPointText}
            </react_native_svg_1.Text>)}
        </react_1.Fragment>);
        });
    };
    var renderSpecificDataPoints = function (dataForRender) {
        return dataForRender.map(function (item, index) {
            var currentBarWidth = item.barWidth || props.barWidth || 30;
            if (item.showDataPoint) {
                if (item.dataPointShape === 'rectangular') {
                    return (<react_1.Fragment key={index}>
              <react_native_svg_1.Rect x={initialSpacing -
                            (item.dataPointWidth || 2) / 2 -
                            1 +
                            (currentBarWidth + spacing) * index} y={containerHeight -
                            lineConfig.shiftY -
                            (item.dataPointHeight || 2) / 2 +
                            10 -
                            (item.value * containerHeight) / maxValue} width={item.dataPointWidth || 2} height={item.dataPointHeight || 2} fill={item.dataPointColor || 'black'}/>
              {item.dataPointText && (<react_native_svg_1.Text fill={item.textColor || 'black'} fontSize={item.textFontSize || 10} x={initialSpacing -
                                (item.dataPointWidth || 2) +
                                spacing * index +
                                (item.textShiftX || lineConfig.textShiftX || 0)} y={containerHeight -
                                lineConfig.shiftY -
                                (item.dataPointHeight || 2) / 2 +
                                10 -
                                (item.value * containerHeight) / maxValue +
                                (item.textShiftY || lineConfig.textShiftY || 0)}>
                  {item.dataPointText}
                </react_native_svg_1.Text>)}
            </react_1.Fragment>);
                }
                else {
                    return (<react_1.Fragment key={index}>
              <react_native_svg_1.Circle cx={initialSpacing -
                            (item.dataPointWidth || 2) / 2 +
                            spacing * index} cy={containerHeight -
                            lineConfig.shiftY +
                            10 -
                            (item.value * containerHeight) / maxValue} r={item.dataPointRadius || 3} fill={item.dataPointColor || 'black'}/>
              {item.dataPointText && (<react_native_svg_1.Text fill={item.textColor || 'black'} fontSize={item.textFontSize || 10} x={initialSpacing -
                                (item.dataPointWidth || 2) +
                                spacing * index +
                                (item.textShiftX || lineConfig.textShiftX || 0)} y={containerHeight -
                                lineConfig.shiftY -
                                (item.dataPointHeight || 2) / 2 +
                                10 -
                                (item.value * containerHeight) / maxValue +
                                (item.textShiftY || lineConfig.textShiftY || 0)}>
                  {item.dataPointText}
                </react_native_svg_1.Text>)}
            </react_1.Fragment>);
                }
            }
            return null;
        });
    };
    var renderAnimatedLine = function () {
        // console.log('animatedWidth is-------->', animatedWidth);
        return (<react_native_1.Animated.View style={{
                position: 'absolute',
                height: containerHeight + 10,
                bottom: 60,
                width: animatedWidth,
                zIndex: lineBehindBars ? -1 : 100000,
                // backgroundColor: 'wheat',
            }}>
        <react_native_svg_1.default>
          <react_native_svg_1.Path d={points} fill="none" stroke={lineConfig.color} strokeWidth={lineConfig.thickness}/>

          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
                ? renderDataPoints()
                : renderSpecificDataPoints(data)}
          {lineConfig.showArrow && (<react_native_svg_1.Path d={arrowPoints} fill={lineConfig.arrowConfig.fillColor} stroke={lineConfig.arrowConfig.strokeColor} strokeWidth={lineConfig.arrowConfig.strokeWidth}/>)}
        </react_native_svg_1.default>
      </react_native_1.Animated.View>);
    };
    var renderLine = function () {
        return (<react_native_1.View style={{
                position: 'absolute',
                height: containerHeight + 10,
                bottom: 60,
                width: totalWidth,
                zIndex: lineBehindBars ? -1 : 100000,
                // backgroundColor: 'rgba(200,150,150,0.1)'
            }}>
        <react_native_svg_1.default>
          <react_native_svg_1.Path d={points} fill="none" stroke={lineConfig.color} strokeWidth={lineConfig.thickness}/>
          {renderSpecificVerticalLines(data)}

          {!lineConfig.hideDataPoints
                ? renderDataPoints()
                : renderSpecificDataPoints(data)}
          {lineConfig.showArrow && (<react_native_svg_1.Path d={arrowPoints} fill={lineConfig.arrowConfig.fillColor} stroke={lineConfig.arrowConfig.strokeColor} strokeWidth={lineConfig.arrowConfig.strokeWidth}/>)}
        </react_native_svg_1.default>
      </react_native_1.View>);
    };
    return (<react_native_1.View style={[
            styles_1.styles.container,
            {
                height: containerHeight +
                    horizSectionsBelow.length * stepHeight +
                    labelsExtraHeight,
            },
            yAxisSide === 'right' && { marginLeft: yAxisLabelWidth + yAxisThickness },
            props.width && !horizontal && { width: props.width },
            horizontal && { transform: [{ rotate: '90deg' }, { translateY: 15 }] },
        ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      <react_native_1.ScrollView ref={scrollRef} onTouchStart={function (evt) {
            if (props.renderTooltip) {
                setSelectedIndex(-1);
            }
        }} onContentSizeChange={function () {
            if (scrollRef.current && scrollToEnd) {
                scrollRef.current.scrollToEnd({ animated: scrollAnimation });
            }
        }} style={[
            {
                marginLeft: yAxisSide === 'right' ? -yAxisLabelWidth + 10 : yAxisLabelWidth,
                position: 'absolute',
                bottom: stepHeight * -0.5 - 60 + xAxisThickness,
            },
            props.width && { width: props.width - 11 },
            horizontal && { width: props.width || Math.min(300, totalWidth) },
        ]} scrollEnabled={!disableScroll} contentContainerStyle={[
            {
                // backgroundColor: 'yellow',
                height: containerHeight +
                    130 +
                    horizSectionsBelow.length * stepHeight +
                    labelsExtraHeight,
                paddingLeft: initialSpacing,
                paddingBottom: horizSectionsBelow.length * stepHeight + labelsExtraHeight,
                alignItems: 'flex-end',
            },
            !props.width && { width: totalWidth },
        ]} showsHorizontalScrollIndicator={showScrollIndicator} indicatorStyle={props.indicatorColor} horizontal 
    // data={props.stackData || data}
    keyExtractor={function (item, index) { return index.toString(); }}>
        <react_1.Fragment>
          {showVerticalLines &&
            verticalLinesAr.map(function (item, index) {
                var totalSpacing = initialSpacing;
                if (verticalLinesSpacing) {
                    totalSpacing = verticalLinesSpacing * (index + 1);
                }
                else {
                    if (props.stackData) {
                        totalSpacing +=
                            (props.stackData[0].barWidth || props.barWidth || 30) / 2;
                    }
                    else {
                        totalSpacing +=
                            (props.data[0].barWidth || props.barWidth || 30) / 2;
                    }
                    for (var i = 0; i < index; i++) {
                        var actualSpacing = spacing;
                        if (props.stackData) {
                            if (i >= props.stackData.length - 1) {
                                actualSpacing += (props.barWidth || 30) / 2;
                            }
                            else {
                                if (props.stackData[i].spacing ||
                                    props.stackData[i].spacing === 0) {
                                    actualSpacing = props.stackData[i].spacing;
                                }
                                if (props.stackData[i + 1].barWidth) {
                                    actualSpacing += props.stackData[i + 1].barWidth;
                                }
                                else {
                                    actualSpacing += props.barWidth || 30;
                                }
                            }
                        }
                        else {
                            if (i >= props.data.length - 1) {
                                actualSpacing += (props.barWidth || 30) / 2;
                            }
                            else {
                                if (props.data[i].spacing ||
                                    props.data[i].spacing === 0) {
                                    console.log('here for index ' + index + ' and i ' + i);
                                    actualSpacing = props.data[i].spacing;
                                }
                                if (props.data[i + 1].barWidth) {
                                    actualSpacing += props.data[i + 1].barWidth;
                                }
                                else {
                                    actualSpacing += props.barWidth || 30;
                                }
                            }
                        }
                        console.log('i = ' + i + ' actualSpacing ' + actualSpacing);
                        totalSpacing += actualSpacing;
                    }
                }
                return (<react_native_1.View key={index} style={{
                        position: 'absolute',
                        zIndex: verticalLinesZIndex || -1,
                        marginBottom: xAxisThickness,
                        height: verticalLinesHeight ||
                            containerHeight + 15 - xAxisThickness,
                        width: verticalLinesThickness,
                        backgroundColor: verticalLinesColor,
                        bottom: 60 + labelsExtraHeight,
                        left: totalSpacing,
                    }}/>);
            })}
          {showLine
            ? lineConfig.isAnimated
                ? renderAnimatedLine()
                : renderLine()
            : null}
          {props.stackData
            ? props.stackData.map(function (item, index) {
                return (<RenderStackBars_1.default key={index} stackData={props.stackData} item={item} index={index} data={data} containerHeight={containerHeight} maxValue={maxValue} spacing={item.spacing === 0 ? 0 : item.spacing || spacing} propSpacing={spacing} xAxisThickness={xAxisThickness} barWidth={props.barWidth} opacity={opacity} disablePress={item.disablePress || props.disablePress} rotateLabel={rotateLabel} showXAxisIndices={showXAxisIndices} xAxisIndicesHeight={xAxisIndicesHeight} xAxisIndicesWidth={xAxisIndicesWidth} xAxisIndicesColor={xAxisIndicesColor} horizontal={horizontal} intactTopLabel={intactTopLabel} barBorderRadius={props.barBorderRadius} color={props.color} showGradient={props.showGradient} gradientColor={props.gradientColor} barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} label={item.label ||
                        (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                            ? props.xAxisLabelTexts[index]
                            : '')} labelTextStyle={item.labelTextStyle || props.xAxisLabelTextStyle} onPress={props.onPress} xAxisTextNumberOfLines={xAxisTextNumberOfLines} renderTooltip={props.renderTooltip} leftShiftForTooltip={props.leftShiftForTooltip || 0} leftShiftForLastIndexTooltip={props.leftShiftForLastIndexTooltip || 0} initialSpacing={initialSpacing} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} activeOpacity={props.activeOpacity || 0.2}/>);
            })
            : data.map(function (item, index) { return (<RenderBars_1.default key={index} item={item} index={index} containerHeight={containerHeight} maxValue={maxValue} spacing={item.spacing === 0 ? 0 : item.spacing || spacing} propSpacing={spacing} side={side} data={data} minHeight={props.minHeight || 0} barWidth={props.barWidth} sideWidth={props.sideWidth} labelWidth={labelWidth} opacity={opacity} isThreeD={isThreeD} isAnimated={isAnimated} animationDuration={animationDuration} rotateLabel={rotateLabel} animatedHeight={animatedHeight} appearingOpacity={appearingOpacity} roundedTop={props.roundedTop} roundedBottom={props.roundedBottom} disablePress={props.disablePress} frontColor={props.frontColor} sideColor={props.sideColor} topColor={props.topColor} showGradient={props.showGradient} gradientColor={props.gradientColor} activeOpacity={props.activeOpacity} cappedBars={props.cappedBars} capThickness={props.capThickness} capColor={props.capColor} capRadius={props.capRadius} showXAxisIndices={showXAxisIndices} xAxisIndicesHeight={xAxisIndicesHeight} xAxisIndicesWidth={xAxisIndicesWidth} xAxisIndicesColor={xAxisIndicesColor} horizontal={horizontal} intactTopLabel={intactTopLabel} barBorderRadius={props.barBorderRadius} autoShiftLabels={autoShiftLabels} barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} barMarginBottom={props.barMarginBottom} label={item.label ||
                    (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : '')} labelTextStyle={item.labelTextStyle || props.xAxisLabelTextStyle} onPress={props.onPress} xAxisTextNumberOfLines={xAxisTextNumberOfLines} renderTooltip={props.renderTooltip} leftShiftForTooltip={props.leftShiftForTooltip || 0} leftShiftForLastIndexTooltip={props.leftShiftForLastIndexTooltip || 0} initialSpacing={initialSpacing} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} barStyle={props.barStyle}/>); })}
        </react_1.Fragment>
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
exports.BarChart = BarChart;
