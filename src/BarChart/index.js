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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChart = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const styles_1 = require("./styles");
const RenderBars_1 = __importDefault(require("./RenderBars"));
const RenderStackBars_1 = __importDefault(require("./RenderStackBars"));
const lineSvg_1 = __importDefault(require("../Components/lineSvg"));
const utils_1 = require("../utils");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const BarChart = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const scrollRef = (0, react_1.useRef)();
    const [points, setPoints] = (0, react_1.useState)('');
    const [arrowPoints, setArrowPoints] = (0, react_1.useState)('');
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(-1);
    const showLine = props.showLine || false;
    const initialSpacing = props.initialSpacing === 0 ? 0 : props.initialSpacing || 40;
    const data = (0, react_1.useMemo)(() => {
        if (!props.data) {
            return [];
        }
        if (props.yAxisOffset) {
            return props.data.map(item => {
                item.value = item.value - props.yAxisOffset;
                return item;
            });
        }
        return props.data;
    }, [props.yAxisOffset, props.data]);
    const lineData = props.lineData || data;
    const lineBehindBars = props.lineBehindBars || false;
    const defaultLineConfig = {
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
    const lineConfig = props.lineConfig
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
    const containerHeight = props.height || 200;
    const noOfSections = props.noOfSections || 10;
    const horizSections = [{ value: '0' }];
    const horizSectionsBelow = [];
    const stepHeight = props.stepHeight || containerHeight / noOfSections;
    const spacing = props.spacing === 0 ? 0 : props.spacing || 20;
    const labelWidth = props.labelWidth || 0;
    const scrollToEnd = props.scrollToEnd || false;
    const scrollAnimation = props.scrollAnimation === false ? false : true;
    const labelsExtraHeight = props.labelsExtraHeight || 0;
    let totalWidth = spacing;
    let maxItem = 0, minItem = 0;
    if (props.stackData) {
        props.stackData.forEach(stackItem => {
            // console.log('stackItem', stackItem);
            let stackSum = stackItem.stacks.reduce((acc, stack) => acc + stack.value, 0);
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
        data.forEach((item) => {
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
    const maxValue = props.maxValue || maxItem;
    const minValue = props.minValue || minItem;
    const stepValue = props.stepValue || maxValue / noOfSections;
    const noOfSectionsBelowXAxis = props.noOfSectionsBelowXAxis || -minValue / stepValue;
    const disableScroll = props.disableScroll || false;
    const showScrollIndicator = props.showScrollIndicator || false;
    // const oldData = props.oldData || [];
    const side = props.side || '';
    const rotateLabel = props.rotateLabel || false;
    const isAnimated = props.isAnimated || false;
    const animationDuration = props.animationDuration || 800;
    // const animationEasing = props.animationEasing || Easing.ease;
    const opacity = props.opacity || 1;
    const isThreeD = props.isThreeD || false;
    const showVerticalLines = props.showVerticalLines || false;
    const rulesThickness = props.rulesThickness === 0 ? 0 : props.rulesThickness || 1;
    const rulesLength = props.rulesLength;
    const rulesColor = props.rulesColor || 'lightgray';
    const verticalLinesThickness = props.verticalLinesThickness === 0 ? 0 : props.verticalLinesThickness || 1;
    const verticalLinesHeight = props.verticalLinesHeight;
    const verticalLinesColor = props.verticalLinesColor || 'lightgray';
    const verticalLinesZIndex = props.verticalLinesZIndex || -1;
    let verticalLinesAr = [];
    props.noOfVerticalLines
        ? (verticalLinesAr = [...Array(props.noOfVerticalLines).keys()])
        : (verticalLinesAr = [
            ...Array(props.stackData ? props.stackData.length : data.length).keys(),
        ]);
    const verticalLinesSpacing = props.verticalLinesSpacing || 0;
    const showYAxisIndices = props.showYAxisIndices || false;
    const showXAxisIndices = props.showXAxisIndices || false;
    const yAxisIndicesHeight = props.yAxisIndicesHeight || 2;
    const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
    const yAxisIndicesWidth = props.yAxisIndicesWidth || 4;
    const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
    const xAxisIndicesColor = props.xAxisIndicesColor || 'black';
    const yAxisIndicesColor = props.yAxisIndicesColor || 'black';
    const yAxisLabelPrefix = props.yAxisLabelPrefix || '';
    const yAxisLabelSuffix = props.yAxisLabelSuffix || '';
    const yAxisSide = props.yAxisSide || 'left';
    const xAxisThickness = props.xAxisThickness === 0
        ? props.xAxisThickness
        : props.xAxisThickness || 1;
    const xAxisLength = props.xAxisLength;
    const xAxisColor = props.xAxisColor || 'black';
    const hideRules = props.hideRules || false;
    const yAxisThickness = props.yAxisThickness === 0
        ? props.yAxisThickness
        : props.yAxisThickness || 1;
    const yAxisColor = props.yAxisColor || 'black';
    const yAxisTextStyle = props.yAxisTextStyle;
    const yAxisTextNumberOfLines = props.yAxisTextNumberOfLines || 1;
    const xAxisTextNumberOfLines = props.xAxisTextNumberOfLines || 1;
    const yAxisLabelContainerStyle = props.yAxisLabelContainerStyle;
    const horizontalRulesStyle = props.horizontalRulesStyle;
    const showFractionalValues = props.showFractionalValues || false;
    const yAxisLabelWidth = props.yAxisLabelWidth || 35;
    const hideYAxisText = props.hideYAxisText || false;
    const backgroundColor = props.backgroundColor || 'transparent';
    const horizontal = props.horizontal || false;
    const yAxisAtTop = props.yAxisAtTop || false;
    const intactTopLabel = props.intactTopLabel || false;
    const hideOrigin = props.hideOrigin || false;
    const rulesType = props.rulesType || 'line';
    const xAxisType = props.xAxisType || 'solid';
    const dashWidth = props.dashWidth === 0 ? 0 : props.dashWidth || 4;
    const dashGap = props.dashGap === 0 ? 0 : props.dashGap || 8;
    const heightValue = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const opacValue = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const widthValue = (0, react_1.useMemo)(() => new react_native_1.Animated.Value(0), []);
    const autoShiftLabels = props.autoShiftLabels || false;
    const labelsAppear = (0, react_1.useCallback)(() => {
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
    const decreaseWidth = (0, react_1.useCallback)(() => {
        widthValue.setValue(0);
        react_native_1.Animated.timing(widthValue, {
            toValue: 1,
            duration: animationDuration,
            easing: react_native_1.Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [animationDuration, widthValue]);
    // console.log('olddata', oldData);
    const getArrowPoints = (arrowTipX, arrowTipY, x1, y1, arrowLength, arrowWidth, showArrowBase) => {
        let dataLineSlope = (arrowTipY - y1) / (arrowTipX - x1);
        let d = arrowLength;
        let d2 = arrowWidth / 2;
        let interSectionX = arrowTipX - Math.sqrt((d * d) / (dataLineSlope * dataLineSlope + 1));
        let interSectionY = arrowTipY - dataLineSlope * (arrowTipX - interSectionX);
        let arrowBasex1, arrowBaseY1, arrowBaseX2, arrowBaseY2;
        if (dataLineSlope === 0) {
            arrowBasex1 = interSectionX;
            arrowBaseY1 = interSectionY - d2;
            arrowBaseX2 = interSectionX;
            arrowBaseY2 = interSectionY + d2;
        }
        else {
            let arrowBaseSlope = -1 / dataLineSlope;
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
        let arrowPoints = ` M${interSectionX} ${interSectionY}`;
        arrowPoints += ` ${showArrowBase ? 'L' : 'M'}${arrowBasex1} ${arrowBaseY1}`;
        arrowPoints += ` L${arrowTipX} ${arrowTipY}`;
        arrowPoints += ` M${interSectionX} ${interSectionY}`;
        arrowPoints += ` ${showArrowBase ? 'L' : 'M'}${arrowBaseX2} ${arrowBaseY2}`;
        arrowPoints += ` L${arrowTipX} ${arrowTipY}`;
        return arrowPoints;
    };
    (0, react_1.useEffect)(() => {
        if (showLine) {
            let pp = '';
            if (!lineConfig.curved) {
                for (let i = 0; i < lineData.length; i++) {
                    if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                        continue;
                    const currentBarWidth = (data && data[i] && data[i].barWidth) || props.barWidth || 30;
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
                    let ppArray = pp.trim().split(' ');
                    let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
                    let arrowTipX = parseInt(ppArray[ppArray.length - 2].replace('L', ''));
                    let y1 = parseInt(ppArray[ppArray.length - 3]);
                    let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));
                    let arrowPoints = getArrowPoints(arrowTipX, arrowTipY, x1, y1, lineConfig.arrowConfig.length, lineConfig.arrowConfig.width, lineConfig.arrowConfig.showArrowBase);
                    setArrowPoints(arrowPoints);
                }
            }
            else {
                let p1Array = [];
                for (let i = 0; i < lineData.length; i++) {
                    if (i < lineConfig.startIndex || i > lineConfig.endIndex)
                        continue;
                    const currentBarWidth = (data && data[i] && data[i].barWidth) || props.barWidth || 30;
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
                    let xx = (0, utils_1.svgPath)(p1Array, utils_1.bezierCommand);
                    setPoints(xx);
                }
            }
            if (lineConfig.isAnimated) {
                setTimeout(() => decreaseWidth(), lineConfig.delay || 0);
            }
        }
        // moveBar();
        setTimeout(() => labelsAppear(), animationDuration);
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
    const defaultReferenceConfig = {
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
    const showReferenceLine1 = props.showReferenceLine1 || false;
    const referenceLine1Position = props.referenceLine1Position === 0
        ? 0
        : props.referenceLine1Position || containerHeight / 2;
    const referenceLine1Config = props.referenceLine1Config
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
    const showReferenceLine2 = props.showReferenceLine2 || false;
    const referenceLine2Position = props.referenceLine2Position === 0
        ? 0
        : props.referenceLine2Position || (3 * containerHeight) / 2;
    const referenceLine2Config = props.referenceLine2Config
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
    const showReferenceLine3 = props.showReferenceLine3 || false;
    const referenceLine3Position = props.referenceLine3Position === 0
        ? 0
        : props.referenceLine3Position || containerHeight / 3;
    const referenceLine3Config = props.referenceLine3Config
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
    for (let i = 0; i <= noOfSections; i++) {
        let value = maxValue - stepValue * i;
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
        for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
            let value = stepValue * -i;
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
    const animatedHeight = heightValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    const appearingOpacity = opacValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const animatedWidth = widthValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, totalWidth],
    });
    const getLabel = (val, index) => {
        let label = '';
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
    const renderHorizSections = () => {
        return (<>
        {horizSections.map((sectionItems, index) => {
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
                horizSections.map((sectionItems, index) => {
                    let label = getLabel(sectionItems.value, index);
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
        {horizSectionsBelow.map((sectionItems, index) => {
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
                horizSectionsBelow.map((sectionItems, index) => {
                    let label = getLabel(horizSectionsBelow[horizSectionsBelow.length - 1 - index].value, index);
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
                horizSections.map((sectionItems, index) => {
                    let label = getLabel(sectionItems.value, index);
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
    const renderSpecificVerticalLines = (dataForRender) => {
        return dataForRender.map((item, index) => {
            if (item.showVerticalLine) {
                const currentBarWidth = item.barWidth || props.barWidth || 30;
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
    const renderDataPoints = () => {
        return lineData.map((item, index) => {
            if (index < lineConfig.startIndex || index > lineConfig.endIndex) {
                return null;
            }
            // console.log('comes in');
            const currentBarWidth = item.barWidth || props.barWidth || 30;
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
    const renderSpecificDataPoints = dataForRender => {
        return dataForRender.map((item, index) => {
            const currentBarWidth = item.barWidth || props.barWidth || 30;
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
    const renderAnimatedLine = () => {
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
    const renderLine = () => {
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
      <react_native_1.ScrollView ref={scrollRef} onTouchStart={evt => {
            if (props.renderTooltip) {
                setSelectedIndex(-1);
            }
        }} onContentSizeChange={() => {
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
    keyExtractor={(item, index) => index.toString()}>
        <react_1.Fragment>
          {showVerticalLines &&
            verticalLinesAr.map((item, index) => {
                let totalSpacing = initialSpacing;
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
                    for (let i = 0; i < index; i++) {
                        let actualSpacing = spacing;
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
            ? props.stackData.map((item, index) => {
                return (<RenderStackBars_1.default key={index} stackData={props.stackData} item={item} index={index} data={data} containerHeight={containerHeight} maxValue={maxValue} spacing={item.spacing === 0 ? 0 : item.spacing || spacing} propSpacing={spacing} xAxisThickness={xAxisThickness} barWidth={props.barWidth} opacity={opacity} disablePress={item.disablePress || props.disablePress} rotateLabel={rotateLabel} showXAxisIndices={showXAxisIndices} xAxisIndicesHeight={xAxisIndicesHeight} xAxisIndicesWidth={xAxisIndicesWidth} xAxisIndicesColor={xAxisIndicesColor} horizontal={horizontal} intactTopLabel={intactTopLabel} barBorderRadius={props.barBorderRadius} color={props.color} showGradient={props.showGradient} gradientColor={props.gradientColor} barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} label={item.label ||
                        (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                            ? props.xAxisLabelTexts[index]
                            : '')} labelTextStyle={item.labelTextStyle || props.xAxisLabelTextStyle} onPress={props.onPress} xAxisTextNumberOfLines={xAxisTextNumberOfLines} renderTooltip={props.renderTooltip} leftShiftForTooltip={props.leftShiftForTooltip || 0} leftShiftForLastIndexTooltip={props.leftShiftForLastIndexTooltip || 0} initialSpacing={initialSpacing} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} activeOpacity={props.activeOpacity || 0.2}/>);
            })
            : data.map((item, index) => (<RenderBars_1.default key={index} item={item} index={index} containerHeight={containerHeight} maxValue={maxValue} spacing={item.spacing === 0 ? 0 : item.spacing || spacing} propSpacing={spacing} side={side} data={data} minHeight={props.minHeight || 0} barWidth={props.barWidth} sideWidth={props.sideWidth} labelWidth={labelWidth} opacity={opacity} isThreeD={isThreeD} isAnimated={isAnimated} animationDuration={animationDuration} rotateLabel={rotateLabel} animatedHeight={animatedHeight} appearingOpacity={appearingOpacity} roundedTop={props.roundedTop} roundedBottom={props.roundedBottom} disablePress={props.disablePress} frontColor={props.frontColor} sideColor={props.sideColor} topColor={props.topColor} showGradient={props.showGradient} gradientColor={props.gradientColor} activeOpacity={props.activeOpacity} cappedBars={props.cappedBars} capThickness={props.capThickness} capColor={props.capColor} capRadius={props.capRadius} showXAxisIndices={showXAxisIndices} xAxisIndicesHeight={xAxisIndicesHeight} xAxisIndicesWidth={xAxisIndicesWidth} xAxisIndicesColor={xAxisIndicesColor} horizontal={horizontal} intactTopLabel={intactTopLabel} barBorderRadius={props.barBorderRadius} autoShiftLabels={autoShiftLabels} barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} barMarginBottom={props.barMarginBottom} label={item.label ||
                    (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
                        ? props.xAxisLabelTexts[index]
                        : '')} labelTextStyle={item.labelTextStyle || props.xAxisLabelTextStyle} onPress={props.onPress} xAxisTextNumberOfLines={xAxisTextNumberOfLines} renderTooltip={props.renderTooltip} leftShiftForTooltip={props.leftShiftForTooltip || 0} leftShiftForLastIndexTooltip={props.leftShiftForLastIndexTooltip || 0} initialSpacing={initialSpacing} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} barStyle={props.barStyle}/>))}
        </react_1.Fragment>
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
exports.BarChart = BarChart;
