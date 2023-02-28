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
exports.LineChartBicolor = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var styles_1 = require("./styles");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var lineSvg_1 = __importDefault(require("../Components/lineSvg"));
var initialData = null;
var LineChartBicolor = function (props) {
    var _a, _b;
    var scrollRef = (0, react_1.useRef)();
    var _c = __read((0, react_1.useState)(false), 2), toggle = _c[0], setToggle = _c[1];
    var _d = __read((0, react_1.useState)([]), 2), pointsArray = _d[0], setPointsArray = _d[1];
    var _e = __read((0, react_1.useState)([]), 2), fillPointsArray = _e[0], setFillPointsArray = _e[1];
    var _f = __read((0, react_1.useState)(-1), 2), selectedIndex = _f[0], setSelectedIndex = _f[1];
    var containerHeight = props.height || 200;
    var noOfSections = props.noOfSections || 10;
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
    var scrollToEnd = props.scrollToEnd || false;
    var scrollAnimation = props.scrollAnimation === false ? false : true;
    var opacValue = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var widthValue = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    var labelsExtraHeight = props.labelsExtraHeight || 0;
    var animationDuration = props.animationDuration || 800;
    var animateTogether = props.animateTogether || false;
    var yAxisLabelPrefix = props.yAxisLabelPrefix || '';
    var yAxisLabelSuffix = props.yAxisLabelSuffix || '';
    var yAxisSide = props.yAxisSide || 'left';
    var startIndex1 = props.startIndex || 0;
    var endIndex1;
    if (props.endIndex === undefined || props.endIndex === null) {
        endIndex1 = data.length - 1;
    }
    else {
        endIndex1 = props.endIndex;
    }
    if (!initialData) {
        initialData = __spreadArray([], __read(data), false);
    }
    var initialSpacing = props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
    var thickness = props.thickness || 2;
    var adjustToWidth = props.adjustToWidth || false;
    var spacing = props.spacing === 0
        ? 0
        : props.spacing ||
            (adjustToWidth
                ? ((props.width || 200) - initialSpacing) / data.length
                : 60);
    var xAxisLength = props.xAxisLength;
    var xAxisThickness = props.xAxisThickness === 0 ? 0 : props.xAxisThickness || 1;
    var dataPointsHeight1 = props.dataPointsHeight || 2;
    var dataPointsWidth1 = props.dataPointsWidth || 2;
    var dataPointsRadius1 = props.dataPointsRadius || 3;
    var dataPointsColor1 = props.dataPointsColor || 'black';
    var dataPointsShape1 = props.dataPointsShape || 'circular';
    var labelsAppear = (0, react_1.useCallback)(function () {
        opacValue.setValue(0);
        react_native_1.Animated.timing(opacValue, {
            toValue: 1,
            duration: 500,
            easing: react_native_1.Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [opacValue]);
    var appearingOpacity = opacValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    var decreaseWidth = (0, react_1.useCallback)(function () {
        widthValue.setValue(0);
        react_native_1.Animated.timing(widthValue, {
            toValue: 1,
            duration: animationDuration,
            easing: react_native_1.Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [animationDuration, widthValue]);
    var areaChart = props.areaChart || false;
    var textFontSize1 = props.textFontSize || 10;
    var textColor1 = props.textColor || 'gray';
    var xAxisColor = props.xAxisColor || 'black';
    var totalWidth = initialSpacing;
    var maxItem = 0, minItem = 0;
    data.forEach(function (item) {
        if (item.value > maxItem) {
            maxItem = item.value;
        }
        if (item.value < minItem) {
            minItem = item.value;
        }
        totalWidth += spacing;
    });
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
    (0, react_1.useEffect)(function () {
        decreaseWidth();
        labelsAppear();
    }, [animateTogether, animationDuration, decreaseWidth, labelsAppear]);
    (0, react_1.useEffect)(function () {
        var ppArray = [];
        var yAtxAxis = containerHeight + 10 - xAxisThickness / 2;
        var pp = 'M' +
            (initialSpacing - dataPointsWidth1 / 2) +
            ' ' +
            (yAtxAxis - (data[0].value * containerHeight) / maxValue), pv, nv;
        for (var i_1 = 0; i_1 < data.length - 1; i_1++) {
            pv = data[i_1].value;
            nv = data[i_1 + 1].value;
            if (pv < 0 && nv < 0) {
                pp +=
                    'L' +
                        (initialSpacing - dataPointsWidth1 / 2 + spacing * i_1) +
                        ' ' +
                        (yAtxAxis - (data[i_1].value * containerHeight) / maxValue) +
                        ' ';
            }
            else if (pv < 0 && nv > 0) {
                pp +=
                    'L' +
                        (initialSpacing - dataPointsWidth1 / 2 + spacing * i_1) +
                        ' ' +
                        (yAtxAxis - (data[i_1].value * containerHeight) / maxValue) +
                        ' ';
                var prevX = initialSpacing - dataPointsWidth1 / 2 + spacing * i_1;
                var prevY = yAtxAxis - (data[i_1].value * containerHeight) / maxValue;
                var nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * (i_1 + 1);
                var nextY = yAtxAxis - (data[i_1 + 1].value * containerHeight) / maxValue;
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                var pointsOb_1 = {
                    points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
                    color: 'red',
                };
                ppArray.push(pointsOb_1);
                setPointsArray(__spreadArray([], __read(ppArray), false));
                pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
                pointsOb_1 = {
                    points: pp,
                    color: 'green',
                };
                ppArray.push(pointsOb_1);
            }
            else if (pv > 0 && nv < 0) {
                pp +=
                    'L' +
                        (initialSpacing - dataPointsWidth1 / 2 + spacing * i_1) +
                        ' ' +
                        (yAtxAxis - (data[i_1].value * containerHeight) / maxValue) +
                        ' ';
                var prevX = initialSpacing - dataPointsWidth1 / 2 + spacing * i_1;
                var prevY = yAtxAxis - (data[i_1].value * containerHeight) / maxValue;
                var nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * (i_1 + 1);
                var nextY = yAtxAxis - (data[i_1 + 1].value * containerHeight) / maxValue;
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                var pointsOb_2 = {
                    points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
                    color: 'green',
                };
                ppArray.push(pointsOb_2);
                //   setPoints(pp);
                setPointsArray(__spreadArray([], __read(ppArray), false));
                pp = 'M' + x + ' ' + yAtxAxis + ' L' + nextX + ' ' + nextY + ' ';
                pointsOb_2 = {
                    points: pp,
                    color: 'red',
                };
                ppArray.push(pointsOb_2);
            }
            else {
                pp +=
                    'L' +
                        (initialSpacing - dataPointsWidth1 / 2 + spacing * i_1) +
                        ' ' +
                        (yAtxAxis - (data[i_1].value * containerHeight) / maxValue) +
                        ' ';
            }
        }
        var i = data.length - 1;
        pv = data[i - 1].value;
        nv = data[i].value;
        if ((pv > 0 && nv > 0) || (pv < 0 && nv < 0)) {
            pp +=
                'L' +
                    (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
                    ' ' +
                    (yAtxAxis - (data[i].value * containerHeight) / maxValue) +
                    ' ';
        }
        var pointsOb = {
            points: pp.startsWith('L') ? pp.replace('L', 'M') : pp,
            color: nv > 0 ? 'green' : 'red',
        };
        ppArray.push(pointsOb);
        //   setPoints(pp);
        setPointsArray(__spreadArray([], __read(ppArray), false));
        /***************************          For Area Charts          *************************/
        var startIndex = -1, endIndex = -1, startX, startY, endY, color = 'green', localArray = [], broken = false;
        pp = 'M' + (initialSpacing - dataPointsWidth1 / 2) + ' ' + yAtxAxis;
        for (i = 0; i < data.length - 1; i++) {
            pv = data[i].value;
            nv = data[i + 1].value;
            pp +=
                'L' +
                    (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
                    ' ' +
                    (yAtxAxis - (data[i].value * containerHeight) / maxValue) +
                    ' ';
            if ((pv > 0 && nv < 0) || (pv < 0 && nv > 0)) {
                var prevX = initialSpacing - dataPointsWidth1 / 2 + spacing * i;
                var prevY = yAtxAxis - (data[i].value * containerHeight) / maxValue;
                var nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * (i + 1);
                var nextY = yAtxAxis - (data[i + 1].value * containerHeight) / maxValue;
                var slope = (nextY - prevY) / (nextX - prevX);
                var x = (yAtxAxis - prevY) / slope + prevX;
                pp += 'L' + (x - thickness / 2) + ' ' + yAtxAxis + ' ';
                broken = true;
                break;
            }
        }
        if (!broken) {
            i = data.length - 1;
            pp +=
                'L' +
                    (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
                    ' ' +
                    (yAtxAxis - (data[i].value * containerHeight) / maxValue) +
                    ' L' +
                    (initialSpacing - dataPointsWidth1 / 2 + spacing * i) +
                    ' ' +
                    (yAtxAxis - xAxisThickness / 2);
        }
        localArray.push({ points: pp, color: data[0].value > 0 ? 'green' : 'red' });
        var xs = [];
        data.forEach(function (item, index) {
            var x = initialSpacing - dataPointsWidth1 / 2 + spacing * index;
            xs.push(x + '');
        });
        pointsArray.forEach(function (item, index) {
            var splitArray = item.points
                .split(' ')
                .filter(function (spItem) { return spItem && spItem !== ' '; });
            if (splitArray[1] === yAtxAxis + '' &&
                !xs.includes(splitArray[0].replace('M', '').replace('L', ''))) {
                startIndex = index;
                startX = splitArray[0].replace('M', '').replace('L', '');
                if (splitArray.length > 3) {
                    startY = splitArray[1].replace('M', '').replace('L', '');
                    endY = splitArray[3].replace('M', '').replace('L', '');
                    if (Number(startY) < Number(endY)) {
                        color = 'red';
                    }
                    else {
                        color = 'green';
                    }
                }
            }
            if (splitArray[splitArray.length - 1] === yAtxAxis + '' &&
                !xs.includes(splitArray[splitArray.length - 2].replace('M', '').replace('L', ''))) {
                endIndex = index;
            }
            if (startX) {
                var filPts = '';
                for (var j = startIndex; j <= endIndex; j++) {
                    if (pointsArray[j]) {
                        filPts += pointsArray[j].points.replaceAll('M', 'L');
                    }
                }
                filPts += 'L ' + startX + ' ' + yAtxAxis;
                localArray.push({ points: filPts.replace('L', 'M'), color: color });
            }
        });
        if (broken) {
            pp =
                'M' +
                    (initialSpacing - dataPointsWidth1 / 2 + spacing * (data.length - 1)) +
                    ' ' +
                    yAtxAxis;
            for (var i_2 = data.length - 1; i_2 > 0; i_2--) {
                pv = data[i_2].value;
                nv = data[i_2 - 1].value;
                pp +=
                    'L' +
                        (initialSpacing - dataPointsWidth1 / 2 + spacing * i_2) +
                        ' ' +
                        (yAtxAxis - (data[i_2].value * containerHeight) / maxValue) +
                        ' ';
                if ((pv > 0 && nv < 0) || (pv < 0 && nv > 0)) {
                    var prevX = initialSpacing - dataPointsWidth1 / 2 + spacing * i_2;
                    var prevY = yAtxAxis - (data[i_2].value * containerHeight) / maxValue;
                    var nextX = initialSpacing - dataPointsWidth1 / 2 + spacing * (i_2 - 1);
                    var nextY = yAtxAxis - (data[i_2 - 1].value * containerHeight) / maxValue;
                    var slope = (nextY - prevY) / (nextX - prevX);
                    var x = (yAtxAxis - prevY) / slope + prevX;
                    pp += 'L' + x + ' ' + yAtxAxis + ' ';
                    broken = true;
                    break;
                }
            }
            localArray.push({
                points: pp,
                color: data[data.length - 1].value > 0 ? 'green' : 'red',
            });
        }
        setFillPointsArray(__spreadArray([], __read(localArray), false));
        setToggle(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        areaChart,
        containerHeight,
        data,
        dataPointsWidth1,
        initialSpacing,
        spacing,
        xAxisThickness,
        toggle,
        maxValue,
    ]);
    var horizSections = [{ value: '0' }];
    var horizSectionsBelow = [];
    var stepHeight = props.stepHeight || containerHeight / noOfSections;
    var stepValue = props.stepValue || maxValue / noOfSections;
    var noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis || -minValue / stepValue;
    var thickness1 = props.thickness || 1;
    var zIndex = props.zIndex || 0;
    var strokeDashArray1 = props.strokeDashArray;
    var rotateLabel = props.rotateLabel || false;
    var isAnimated = props.isAnimated || false;
    var hideDataPoints1 = props.hideDataPoints || false;
    var color = props.color || 'green';
    var colorNegative = props.colorNegative || 'red';
    var startFillColor = props.startFillColor || 'lightgreen';
    var endFillColor = props.endFillColor || 'white';
    var startOpacity = props.startOpacity === 0 ? 0 : props.startOpacity || 1;
    var endOpacity = props.endOpacity === 0 ? 0 : props.endOpacity || 1;
    var startFillColorNegative = props.startFillColorNegative || 'pink';
    var endFillColorNegative = props.endFillColorNegative || 'white';
    var startOpacityNegative = props.startOpacityNegative === 0 ? 0 : props.startOpacityNegative || 1;
    var endOpacityNegative = props.endOpacityNegative === 0 ? 0 : props.endOpacityNegative || 1;
    var rulesThickness = props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
    var rulesLength = props.rulesLength;
    var rulesColor = props.rulesColor || 'lightgray';
    var verticalLinesThickness = props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
    var verticalLinesHeight = props.verticalLinesHeight;
    var verticalLinesColor = props.verticalLinesColor || 'lightgray';
    var verticalLinesZIndex = props.verticalLinesZIndex || -1;
    var gradientDirection = props.gradientDirection || 'vertical';
    // const animationEasing = props.animationEasing || Easing.ease
    // const opacity = props.opacity || 1;
    var hideRules = props.hideRules || false;
    var showVerticalLines = props.showVerticalLines || false;
    var verticalLinesUptoDataPoint = props.verticalLinesUptoDataPoint || false;
    var verticalLinesAr = [];
    props.noOfVerticalLines
        ? (verticalLinesAr = __spreadArray([], __read(Array(props.noOfVerticalLines).keys()), false))
        : (verticalLinesAr = __spreadArray([], __read(Array(data.length).keys()), false));
    var verticalLinesSpacing = props.verticalLinesSpacing || 0;
    var showYAxisIndices = props.showYAxisIndices || false;
    var showXAxisIndices = props.showXAxisIndices || false;
    var yAxisIndicesHeight = props.yAxisIndicesHeight || 4;
    var xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
    var yAxisIndicesWidth = props.yAxisIndicesWidth || 2;
    var xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
    var xAxisIndicesColor = props.xAxisIndicesColor || 'black';
    var yAxisIndicesColor = props.yAxisIndicesColor || 'black';
    var yAxisThickness = props.yAxisThickness === 0 ? 0 : props.yAxisThickness || 1;
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
    var disableScroll = props.disableScroll;
    var showScrollIndicator = props.showScrollIndicator || false;
    var hideOrigin = props.hideOrigin || false;
    var rulesType = props.rulesType || 'line';
    var xAxisType = props.xAxisType || 'solid';
    var dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
    var dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;
    var pressEnabled = props.pressEnabled || false;
    var showDataPointOnPress = props.showDataPointOnPress || false;
    var showStripOnPress = props.showStripOnPress || false;
    var showTextOnPress = props.showTextOnPress || false;
    var stripHeight = props.stripHeight;
    var stripWidth = props.stripWidth === 0 ? 0 : props.stripWidth || 2;
    var stripColor = props.stripColor || color;
    var stripOpacity = props.stripOpacity || (startOpacity + endOpacity) / 2;
    var unFocusOnPressOut = props.unFocusOnPressOut === false ? false : true;
    var delayBeforeUnFocus = props.delayBeforeUnFocus === 0 ? 0 : props.delayBeforeUnFocus || 300;
    var defaultReferenceConfig = {
        thickness: rulesThickness,
        width: (props.width || totalWidth) + 11,
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
            width: (props.referenceLine1Config.width || props.width || totalWidth) + 11,
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
            width: (props.referenceLine2Config.width || props.width || totalWidth) + 11,
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
            width: (props.referenceLine3Config.width || props.width || totalWidth) + 11,
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
                ? (_a = props.yAxisLabelTexts[noOfSections - i]) !== null && _a !== void 0 ? _a : value.toString()
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
                    ? (_b = props.yAxisLabelTexts[noOfSectionsBelowXAxis - i]) !== null && _b !== void 0 ? _b : value.toString()
                    : value.toString(),
            });
        }
    }
    var renderLabel = function (index, label, labelTextStyle, labelComponent) {
        return (<react_native_1.View style={[
                {
                    position: 'absolute',
                    bottom: 30,
                    zIndex: 10,
                    width: spacing + labelsExtraHeight,
                    left: index === 0 && initialSpacing < 10
                        ? initialSpacing + spacing * index - spacing / 2 + 8
                        : initialSpacing + spacing * index - spacing / 2,
                    justifyContent: 'center',
                },
                rotateLabel && { transform: [{ rotate: '60deg' }] },
            ]}>
        {labelComponent ? (labelComponent()) : (<react_native_1.Text style={labelTextStyle || { textAlign: 'center' }} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </react_native_1.Text>)}
      </react_native_1.View>);
    };
    var renderAnimatedLabel = function (index, label, labelTextStyle, labelComponent) {
        return (<react_native_1.Animated.View style={[
                {
                    height: rotateLabel ? 40 : 20,
                    // backgroundColor: 'yellow',
                    position: 'absolute',
                    bottom: rotateLabel ? 10 : 30,
                    zIndex: 10,
                    width: spacing,
                    left: index === 0 && initialSpacing < 10
                        ? initialSpacing + spacing * index - spacing / 2 + 8
                        : initialSpacing + spacing * index - spacing / 2,
                    opacity: appearingOpacity,
                },
                rotateLabel && { transform: [{ rotate: '60deg' }] },
            ]}>
        {labelComponent ? (labelComponent()) : (<react_native_1.Text style={labelTextStyle || { textAlign: 'center' }} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </react_native_1.Text>)}
      </react_native_1.Animated.View>);
    };
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
        {props.hideAxesAndRules !== true &&
                horizSections.map(function (sectionItems, index) {
                    return (<react_native_1.View key={index} style={[
                            styles_1.styles.horizBar,
                            {
                                width: (props.width ? props.width : totalWidth) + 15,
                            },
                            yAxisSide === 'right' && { transform: [{ rotateY: '180deg' }] },
                            horizontalRulesStyle,
                        ]}>
                <react_native_1.View style={[
                            styles_1.styles.leftLabel,
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
                            {
                                borderLeftWidth: yAxisThickness,
                                borderColor: yAxisColor,
                                backgroundColor: backgroundColor,
                            },
                        ]}>
                  {index === noOfSections ? (<lineSvg_1.default config={{
                                thickness: xAxisThickness,
                                color: xAxisColor,
                                width: xAxisLength || (props.width || totalWidth) + 11,
                                dashWidth: dashWidth,
                                dashGap: dashGap,
                                type: xAxisType,
                            }}/>) : hideRules ? null : (<lineSvg_1.default config={{
                                thickness: rulesThickness,
                                color: rulesColor,
                                width: rulesLength || (props.width || totalWidth) + 11,
                                dashWidth: dashWidth,
                                dashGap: dashGap,
                                type: rulesType,
                            }}/>)}
                  {showXAxisIndices && index !== noOfSections ? (<react_native_1.View style={{
                                height: xAxisIndicesHeight,
                                width: xAxisIndicesWidth,
                                left: xAxisIndicesWidth / -2,
                                backgroundColor: xAxisIndicesColor,
                            }}/>) : null}
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
                                        translateX: (props.width ? props.width : totalWidth) - 15,
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

        {horizSectionsBelow.map(function (sectionItems, index) {
                return (<react_native_1.View key={index} style={[
                        styles_1.styles.horizBar,
                        {
                            width: (props.width ? props.width : totalWidth) + 15,
                        },
                        index === 0 && { marginTop: stepHeight / 2 },
                        yAxisSide === 'right' && { transform: [{ rotateY: '180deg' }] },
                    ]}>
              <react_native_1.View style={[
                        styles_1.styles.leftLabel,
                        {
                            borderRightWidth: yAxisThickness,
                            borderColor: yAxisColor,
                            marginLeft: yAxisThickness,
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
                            width: rulesLength || (props.width || totalWidth) + 11,
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
                                        translateX: (props.width ? props.width : totalWidth) - 15,
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
                                        translateX: (props.width ? props.width : totalWidth) - 15,
                                    },
                                    { rotateY: '180deg' },
                                ],
                            },
                        ]}>
                  {index === noOfSections && showReferenceLine1 ? (<react_native_1.View style={{
                                position: 'absolute',
                                bottom: (referenceLine1Position * containerHeight) / maxValue,
                                left: yAxisSide === 'right'
                                    ? yAxisLabelWidth + yAxisThickness + 5
                                    : yAxisLabelWidth + yAxisThickness,
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
                                    ? yAxisLabelWidth + yAxisThickness + 5
                                    : yAxisLabelWidth + yAxisThickness,
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
                                    ? yAxisLabelWidth + yAxisThickness + 5
                                    : yAxisLabelWidth + yAxisThickness,
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
    var onStripPress = function (item, index) {
        setSelectedIndex(index);
        if (props.onPress) {
            props.onPress(item, index);
        }
    };
    var renderDataPoints = function (dataForRender, dataPtsShape, dataPtsWidth, dataPtsHeight, dataPtsColor, dataPtsRadius, textColor, textFontSize, startIndex, endIndex) {
        return dataForRender.map(function (item, index) {
            if (index < startIndex || index > endIndex)
                return null;
            if (item.hideDataPoint) {
                return null;
            }
            var dataPointsShape, dataPointsWidth, dataPointsHeight, dataPointsColor, dataPointsRadius, text, customDataPoint, dataPointLabelComponent;
            if (index === selectedIndex) {
                dataPointsShape =
                    item.focusedDataPointShape ||
                        props.focusedDataPointShape ||
                        item.dataPointShape ||
                        dataPtsShape;
                dataPointsWidth =
                    item.focusedDataPointWidth ||
                        props.focusedDataPointWidth ||
                        item.dataPointWidth ||
                        dataPtsWidth;
                dataPointsHeight =
                    item.focusedDataPointHeight ||
                        props.focusedDataPointHeight ||
                        item.dataPointHeight ||
                        dataPtsHeight;
                dataPointsColor =
                    item.focusedDataPointColor ||
                        props.focusedDataPointColor ||
                        item.dataPointColor ||
                        dataPtsColor;
                dataPointsRadius =
                    item.focusedDataPointRadius ||
                        props.focusedDataPointRadius ||
                        item.dataPointRadius ||
                        dataPtsRadius;
                if (showTextOnPress) {
                    text = item.dataPointText;
                }
                customDataPoint =
                    item.focusedCustomDataPoint ||
                        props.focusedCustomDataPoint ||
                        item.customDataPoint ||
                        props.customDataPoint;
                dataPointLabelComponent =
                    item.focusedDataPointLabelComponent || item.dataPointLabelComponent;
            }
            else {
                dataPointsShape = item.dataPointShape || dataPtsShape;
                dataPointsWidth = item.dataPointWidth || dataPtsWidth;
                dataPointsHeight = item.dataPointHeight || dataPtsHeight;
                dataPointsColor = item.dataPointColor || dataPtsColor;
                dataPointsRadius = item.dataPointRadius || dataPtsRadius;
                if (showTextOnPress) {
                    text = '';
                }
                customDataPoint = item.customDataPoint || props.customDataPoint;
                dataPointLabelComponent = item.dataPointLabelComponent;
            }
            var currentStripHeight = item.stripHeight === 0 ? 0 : item.stripHeight || stripHeight;
            var currentStripWidth = item.stripWidth === 0 ? 0 : item.stripWidth || stripWidth;
            var currentStripOpacity = item.stripOpacity === 0 ? 0 : item.stripOpacity || stripOpacity;
            var currentStripColor = item.stripColor || stripColor;
            return (<react_1.Fragment key={index}>
          {pressEnabled ? (<>
              {unFocusOnPressOut ? (<react_native_svg_1.Rect onPressIn={function () { return onStripPress(item, index); }} onPressOut={function () {
                            return setTimeout(function () { return setSelectedIndex(-1); }, delayBeforeUnFocus);
                        }} x={initialSpacing + (spacing * index - spacing / 2)} y={8} width={spacing} height={containerHeight - 0} fill={'none'}/>) : (<react_native_svg_1.Rect onPress={function () { return onStripPress(item, index); }} x={initialSpacing + (spacing * index - spacing / 2)} y={8} width={spacing} height={containerHeight - 0} fill={'none'}/>)}
            </>) : null}
          {item.showStrip ||
                    (pressEnabled && index === selectedIndex && showStripOnPress) ? (<react_native_svg_1.Rect x={initialSpacing + (spacing * index - dataPointsWidth / 2)} y={currentStripHeight
                        ? containerHeight - currentStripHeight + 8
                        : containerHeight -
                            dataPointsHeight / 2 +
                            20 -
                            (item.value * containerHeight) / maxValue} width={currentStripWidth} height={currentStripHeight ||
                        containerHeight - dataPointsHeight / 2 + 20} opacity={currentStripOpacity} fill={currentStripColor}/>) : null}
          {customDataPoint ? (<react_native_1.View style={[
                        styles_1.styles.customDataPointContainer,
                        {
                            height: dataPointsHeight,
                            width: dataPointsWidth,
                            top: containerHeight - (item.value * containerHeight) / maxValue,
                            left: initialSpacing - dataPointsWidth + spacing * index,
                        },
                    ]}>
              {customDataPoint()}
            </react_native_1.View>) : null}
          {dataPointsShape === 'rectangular' ? (<react_1.Fragment key={index}>
              {customDataPoint ? null : (<react_native_svg_1.Rect x={initialSpacing - dataPointsWidth + spacing * index} y={containerHeight -
                            dataPointsHeight / 2 +
                            10 -
                            (item.value * containerHeight) / maxValue} width={dataPointsWidth} height={dataPointsHeight} fill={showDataPointOnPress
                            ? index === selectedIndex
                                ? dataPointsColor
                                : 'none'
                            : dataPointsColor} onPress={function () {
                            item.onPress ? item.onPress(item, index) : null;
                        }}/>)}
            </react_1.Fragment>) : (<react_1.Fragment key={index}>
              {customDataPoint ? null : (<react_native_svg_1.Circle cx={initialSpacing - dataPointsWidth / 2 + spacing * index} cy={containerHeight +
                            10 -
                            (item.value * containerHeight) / maxValue} r={dataPointsRadius} fill={showDataPointOnPress
                            ? index === selectedIndex
                                ? dataPointsColor
                                : 'none'
                            : dataPointsColor} onPress={function () {
                            item.onPress ? item.onPress(item, index) : null;
                        }}/>)}
            </react_1.Fragment>)}
          {dataPointLabelComponent ? (!showTextOnPress || index === selectedIndex ? (<react_native_1.View style={[
                        styles_1.styles.customDataPointContainer,
                        {
                            top: containerHeight +
                                (item.dataPointLabelShiftY ||
                                    props.dataPointLabelShiftY ||
                                    0) -
                                (item.value * containerHeight) / maxValue,
                            left: initialSpacing +
                                (item.dataPointLabelShiftX ||
                                    props.dataPointLabelShiftX ||
                                    0) -
                                (item.dataPointLabelWidth
                                    ? item.dataPointLabelWidth + 20
                                    : props.dataPointLabelWidth
                                        ? props.dataPointLabelWidth + 20
                                        : 50) /
                                    2 +
                                spacing * index,
                        },
                    ]}>
                {dataPointLabelComponent()}
              </react_native_1.View>) : null) : text || item.dataPointText ? (!showTextOnPress || index === selectedIndex ? (<react_native_svg_1.Text fill={item.textColor || textColor} fontSize={item.textFontSize || textFontSize} x={initialSpacing -
                        dataPointsWidth +
                        spacing * index +
                        (item.textShiftX || props.textShiftX || 0)} y={containerHeight -
                        dataPointsHeight / 2 +
                        10 -
                        (item.value * containerHeight) / maxValue +
                        (item.textShiftY || props.textShiftY || 0)}>
                {!showTextOnPress ? item.dataPointText : text}
              </react_native_svg_1.Text>) : null) : null}
        </react_1.Fragment>);
        });
    };
    var renderSpecificVerticalLines = function (dataForRender) {
        return dataForRender.map(function (item, index) {
            if (item.showVerticalLine) {
                return (<react_native_svg_1.Rect x={initialSpacing -
                        (item.verticalLineThickness || 1) / 2 -
                        1 +
                        spacing * index} y={item.verticalLineUptoDataPoint
                        ? containerHeight -
                            (item.value * containerHeight) / maxValue +
                            10
                        : -xAxisThickness} width={item.verticalLineThickness || 1} height={item.verticalLineUptoDataPoint
                        ? (item.value * containerHeight) / maxValue - xAxisThickness
                        : containerHeight + 10 - xAxisThickness} fill={item.verticalLineColor || 'lightgray'}/>);
            }
            return null;
        });
    };
    var lineSvgComponent = function (pointsArray, currentLineThickness, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray) {
        return (<react_native_svg_1.default>
        {strokeDashArray &&
                strokeDashArray.length === 2 &&
                typeof strokeDashArray[0] === 'number' &&
                typeof strokeDashArray[1] === 'number'
                ? pointsArray.map(function (points) { return (<react_native_svg_1.Path d={points.points} fill="none" stroke={points.color === 'green' ? color : colorNegative} strokeWidth={currentLineThickness || thickness} strokeDasharray={strokeDashArray}/>); })
                : pointsArray.map(function (points) {
                    return (<react_native_svg_1.Path d={points.points} fill="none" stroke={points.color === 'green' ? color : colorNegative} strokeWidth={currentLineThickness || thickness}/>);
                })}

        {/***********************      For Area Chart        ************/}

        {areaChart && (<>
            <react_native_svg_1.LinearGradient id="Gradient" x1="0" y1="0" x2={gradientDirection === 'horizontal' ? '1' : '0'} y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <react_native_svg_1.Stop offset="0" stopColor={startFillColor} stopOpacity={startOpacity.toString()}/>
              <react_native_svg_1.Stop offset="1" stopColor={endFillColor} stopOpacity={endOpacity.toString()}/>
            </react_native_svg_1.LinearGradient>
            <react_native_svg_1.LinearGradient id="GradientNegative" x1="0" y1="0" x2={gradientDirection === 'horizontal' ? '1' : '0'} y2={gradientDirection === 'vertical' ? '1' : '0'}>
              <react_native_svg_1.Stop offset="1" stopColor={startFillColorNegative} stopOpacity={startOpacityNegative.toString()}/>
              <react_native_svg_1.Stop offset="0" stopColor={endFillColorNegative} stopOpacity={endOpacityNegative.toString()}/>
            </react_native_svg_1.LinearGradient>
          </>)}
        {areaChart
                ? fillPointsArray.map(function (item) {
                    return (<react_native_svg_1.Path d={item.points} fill={item.color === 'green'
                            ? 'url(#Gradient)'
                            : 'url(#GradientNegative)'} stroke={'transparent'} strokeWidth={currentLineThickness || thickness}/>);
                })
                : null}

        {/******************************************************************/}

        {renderSpecificVerticalLines(data)}

        {/***  !!! Here it's done thrice intentionally, trying to make it to only 1 breaks things !!!  ***/}
        {!hideDataPoints1
                ? renderDataPoints(data, dataPointsShape1, dataPointsWidth1, dataPointsHeight1, dataPointsColor1, dataPointsRadius1, textColor1, textFontSize1, startIndex1, endIndex1)
                : null}
      </react_native_svg_1.default>);
    };
    var renderLine = function (zIndex, pointsArray, currentLineThickness, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray) {
        return (<react_native_1.View style={{
                position: 'absolute',
                height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
                bottom: 60 + labelsExtraHeight,
                width: totalWidth,
                zIndex: zIndex,
            }}>
        {pointsArray.length
                ? lineSvgComponent(pointsArray, currentLineThickness, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray)
                : null}
      </react_native_1.View>);
    };
    var renderAnimatedLine = function (zIndex, points, animatedWidth, currentLineThickness, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray) {
        return (<react_native_1.Animated.View style={{
                position: 'absolute',
                height: containerHeight + 10 + horizSectionsBelow.length * stepHeight,
                bottom: 60,
                width: animatedWidth,
                zIndex: zIndex,
                // backgroundColor: 'wheat',
            }}>
        {lineSvgComponent(points, currentLineThickness, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray)}
      </react_native_1.Animated.View>);
    };
    return (<react_native_1.View style={[
            styles_1.styles.container,
            {
                height: containerHeight +
                    horizSectionsBelow.length * stepHeight +
                    labelsExtraHeight,
            },
            yAxisSide === 'right' && { marginLeft: yAxisLabelWidth + yAxisThickness },
        ]}>
      {props.hideAxesAndRules !== true && renderHorizSections()}
      {/* {sectionsOverlay()} */}
      <react_native_1.ScrollView horizontal contentContainerStyle={[
            {
                height: containerHeight +
                    130 +
                    horizSectionsBelow.length * stepHeight +
                    labelsExtraHeight,
                width: totalWidth - 20,
                paddingBottom: horizSectionsBelow.length * stepHeight + labelsExtraHeight,
                // backgroundColor: 'yellow'
            },
            !props.width && { width: totalWidth - 20 },
        ]} scrollEnabled={!disableScroll} ref={scrollRef} onContentSizeChange={function () {
            if (scrollRef.current && scrollToEnd) {
                scrollRef.current.scrollToEnd({ animated: scrollAnimation });
            }
        }} showsHorizontalScrollIndicator={showScrollIndicator} indicatorStyle={props.indicatorColor} style={[
            {
                marginLeft: yAxisSide === 'right'
                    ? -yAxisLabelWidth - yAxisThickness + 6
                    : yAxisLabelWidth + yAxisThickness,
                position: 'absolute',
                bottom: stepHeight * -0.5 - 60,
                paddingRight: 100,
            },
            props.width && { width: props.width + 10 },
        ]}>
        {showVerticalLines &&
            verticalLinesAr.map(function (item, index) {
                return (<react_native_1.View key={index} style={{
                        position: 'absolute',
                        zIndex: verticalLinesZIndex || -1,
                        marginBottom: xAxisThickness,
                        height: verticalLinesUptoDataPoint
                            ? index < data.length
                                ? (data[index].value * containerHeight) / maxValue -
                                    xAxisThickness
                                : verticalLinesHeight || 0
                            : verticalLinesHeight ||
                                containerHeight + 15 - xAxisThickness,
                        width: verticalLinesThickness,
                        backgroundColor: verticalLinesColor,
                        bottom: 60 + labelsExtraHeight,
                        left: verticalLinesSpacing
                            ? verticalLinesSpacing * (index + 1)
                            : index * spacing + (initialSpacing - dataPointsWidth1 / 2),
                    }}/>);
            })}

        {showYAxisIndices &&
            data.map(function (item, index) {
                return (<react_native_1.View key={index + '' + item.value} style={{
                        position: 'absolute',
                        height: yAxisIndicesHeight,
                        width: yAxisIndicesWidth,
                        backgroundColor: yAxisIndicesColor,
                        bottom: 60 - yAxisIndicesHeight / 2,
                        left: index * spacing +
                            (initialSpacing - yAxisIndicesWidth / 2) -
                            3,
                    }}/>);
            })}

        {isAnimated
            ? renderAnimatedLine(zIndex, pointsArray, animatedWidth, thickness1, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray1)
            : renderLine(zIndex, pointsArray, thickness1, color, startFillColor, endFillColor, startOpacity, endOpacity, strokeDashArray1)}
        {data.map(function (item, index) {
            return (<react_native_1.View key={index}>
              {isAnimated
                    ? renderAnimatedLabel(index, item.label ||
                        (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                            ? props.xAxisLabelTexts[index]
                            : ''), item.labelTextStyle || props.xAxisLabelTextStyle, item.labelComponent)
                    : renderLabel(index, item.label ||
                        (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                            ? props.xAxisLabelTexts[index]
                            : ''), item.labelTextStyle || props.xAxisLabelTextStyle, item.labelComponent)}
              {/* {renderLabel(index, item.label, item.labelTextStyle)} */}
            </react_native_1.View>);
        })}
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
exports.LineChartBicolor = LineChartBicolor;
