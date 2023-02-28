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
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var ThreeDBar_1 = __importDefault(require("../Components/ThreeDBar"));
var AnimatedBar_1 = __importDefault(require("../Components/AnimatedBar"));
var react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
var Animated2DWithGradient_1 = __importDefault(require("./Animated2DWithGradient"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
var RenderBars = function (props) {
    var _a;
    var item = props.item, index = props.index, containerHeight = props.containerHeight, maxValue = props.maxValue, minHeight = props.minHeight, spacing = props.spacing, propSpacing = props.propSpacing, side = props.side, data = props.data, barStyle = props.barStyle, 
    // oldValue,
    isThreeD = props.isThreeD, isAnimated = props.isAnimated, rotateLabel = props.rotateLabel, appearingOpacity = props.appearingOpacity, opacity = props.opacity, animationDuration = props.animationDuration, autoShiftLabels = props.autoShiftLabels, label = props.label, labelTextStyle = props.labelTextStyle, xAxisTextNumberOfLines = props.xAxisTextNumberOfLines, renderTooltip = props.renderTooltip, leftShiftForTooltip = props.leftShiftForTooltip, leftShiftForLastIndexTooltip = props.leftShiftForLastIndexTooltip, initialSpacing = props.initialSpacing, selectedIndex = props.selectedIndex, setSelectedIndex = props.setSelectedIndex;
    var barMarginBottom = item.barMarginBottom === 0
        ? 0
        : item.barMarginBottom || props.barMarginBottom || 0;
    var renderLabel = function (label, labelTextStyle, value) {
        return (<react_native_1.View style={[
                {
                    width: (item.labelWidth ||
                        props.labelWidth ||
                        item.barWidth ||
                        props.barWidth ||
                        30) +
                        spacing / 2,
                    left: -6,
                    position: 'absolute',
                    bottom: (rotateLabel ? -40 : -25) - barMarginBottom,
                },
                rotateLabel
                    ? props.horizontal
                        ? { transform: [{ rotate: '330deg' }] }
                        : {
                            transform: [
                                { rotate: value < 0 ? '240deg' : '60deg' },
                                { translateX: value < 0 ? 56 : 0 },
                                { translateY: value < 0 ? 32 : 0 },
                            ],
                        }
                    : props.horizontal
                        ? { transform: [{ rotate: '-90deg' }] }
                        : value < 0
                            ? {
                                transform: [
                                    { rotate: '180deg' },
                                    { translateY: autoShiftLabels ? 0 : 32 },
                                ],
                            }
                            : {},
            ]}>
        {item.labelComponent ? (item.labelComponent()) : (<react_native_1.Text style={labelTextStyle || { textAlign: 'center' }} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </react_native_1.Text>)}
      </react_native_1.View>);
    };
    var renderAnimatedLabel = function (label, labelTextStyle, value) {
        return (<react_native_1.Animated.View style={[
                {
                    width: (item.labelWidth ||
                        props.labelWidth ||
                        item.barWidth ||
                        props.barWidth ||
                        30) +
                        spacing / 2,
                    position: 'absolute',
                    left: -4,
                    bottom: (rotateLabel ? -40 : -25) - barMarginBottom,
                    opacity: appearingOpacity,
                },
                value < 0 && { transform: [{ rotate: '180deg' }] },
                rotateLabel
                    ? props.horizontal
                        ? { transform: [{ rotate: '330deg' }] }
                        : { transform: [{ rotate: '60deg' }] }
                    : props.horizontal
                        ? { transform: [{ rotate: '-90deg' }] }
                        : {},
            ]}>
        {item.labelComponent ? (item.labelComponent()) : (<react_native_1.Text style={labelTextStyle || { textAlign: 'center' }} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </react_native_1.Text>)}
      </react_native_1.Animated.View>);
    };
    var static2DWithGradient = function (item) {
        // console.log('comes to static2DWithGradient', item);
        return (<>
        <react_native_linear_gradient_1.default style={[
                {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: props.barBorderRadius || item.barBorderRadius || 0,
                },
                props.roundedBottom && {
                    borderBottomLeftRadius: (item.barWidth || props.barWidth || 30) / 2,
                    borderBottomRightRadius: (item.barWidth || props.barWidth || 30) / 2,
                },
                props.cappedBars && {
                    borderTopLeftRadius: item.capRadius === 0
                        ? 0
                        : item.capRadius || props.capRadius || 0,
                    borderTopRightRadius: item.capRadius === 0
                        ? 0
                        : item.capRadius || props.capRadius || 0,
                },
                props.roundedTop && {
                    borderTopLeftRadius: (item.barWidth || props.barWidth || 30) / 2,
                    borderTopRightRadius: (item.barWidth || props.barWidth || 30) / 2,
                },
            ]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[
                item.gradientColor || props.gradientColor || 'white',
                item.frontColor || props.frontColor || 'black',
            ]}>
          {props.cappedBars && (<react_native_1.View style={{
                    position: 'absolute',
                    width: '100%',
                    height: item.capThickness === 0
                        ? 0
                        : item.capThickness || props.capThickness || 6,
                    backgroundColor: item.capColor || props.capColor || 'gray',
                    borderTopLeftRadius: item.capRadius === 0
                        ? 0
                        : item.capRadius || props.capRadius || 0,
                    borderTopRightRadius: item.capRadius === 0
                        ? 0
                        : item.capRadius || props.capRadius || 0,
                }}/>)}
        </react_native_linear_gradient_1.default>
        {(item.barBackgroundPattern || props.barBackgroundPattern) && (<react_native_svg_1.default>
            <react_native_svg_1.Defs>
              {item.barBackgroundPattern
                    ? item.barBackgroundPattern()
                    : props.barBackgroundPattern()}
            </react_native_svg_1.Defs>
            <react_native_svg_1.Rect stroke="transparent" x="1" y="1" width="100%" height="100%" fill={"url(#".concat(item.patternId || props.patternId, ")")}/>
          </react_native_svg_1.default>)}
        {item.topLabelComponent && (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        top: (item.barWidth || props.barWidth || 30) * -1,
                        height: item.barWidth || props.barWidth || 30,
                        width: item.barWidth || props.barWidth || 30,
                        justifyContent: (props.horizontal && !props.intactTopLabel) || item.value < 0
                            ? 'center'
                            : 'flex-end',
                        alignItems: 'center',
                    },
                    item.value < 0 && { transform: [{ rotate: '180deg' }] },
                    props.horizontal &&
                        !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                    item.topLabelContainerStyle,
                ]}>
            {item.topLabelComponent()}
          </react_native_1.View>)}
      </>);
    };
    var barHeight = Math.max(minHeight, (item.value >= 0 && (!isThreeD || isAnimated) && item.topLabelComponent
        ? (item.topLabelComponentHeight || 30) +
            (Math.abs(item.value) * (containerHeight || 200)) / (maxValue || 200)
        : (Math.abs(item.value) * (containerHeight || 200)) / (maxValue || 200)) -
        barMarginBottom);
    var leftSpacing = initialSpacing;
    for (var i = 0; i < index; i++) {
        leftSpacing +=
            (data[i].spacing === 0 ? 0 : data[i].spacing || propSpacing) +
                (data[i].barWidth || props.barWidth || 30);
    }
    return (<>
      <react_native_1.TouchableOpacity disabled={item.disablePress || props.disablePress} activeOpacity={props.activeOpacity || 0.2} onPress={function () {
            if (renderTooltip) {
                setSelectedIndex(index);
            }
            item.onPress
                ? item.onPress()
                : props.onPress
                    ? props.onPress(item, index)
                    : null;
        }} style={[
            {
                // overflow: 'visible',
                marginBottom: 60 + barMarginBottom,
                width: item.barWidth || props.barWidth || 30,
                height: barHeight,
                marginRight: spacing,
            },
            item.value < 0 && {
                transform: [
                    {
                        translateY: (Math.abs(item.value) * (containerHeight || 200)) /
                            (maxValue || 200),
                    },
                    { rotateZ: '180deg' },
                ],
            },
            // !isThreeD && !item.showGradient && !props.showGradient &&
            // { backgroundColor: item.frontColor || props.frontColor || 'black' },
            side !== 'right' && { zIndex: data.length - index },
        ]}>
        {/* {props.showVerticalLines && (
          <View
            style={{
              zIndex: props.verticalLinesZIndex,
              position: 'absolute',
              height: (containerHeight || 200) + 15,
              width: props.verticalLinesThickness,
              bottom: 0,
              left: (item.barWidth || props.barWidth || 30) / 2,
              backgroundColor: props.verticalLinesColor,
            }}
          />
        )} */}
        {props.showXAxisIndices && (<react_native_1.View style={{
                zIndex: 2,
                position: 'absolute',
                height: props.xAxisIndicesHeight,
                width: props.xAxisIndicesWidth,
                bottom: 0,
                left: (item.barWidth || props.barWidth || 30) / 2,
                backgroundColor: props.xAxisIndicesColor,
            }}/>)}
        {isThreeD ? (isAnimated ? (<AnimatedBar_1.default barBackgroundPattern={item.barBackgroundPattern || props.barBackgroundPattern} patternId={item.patternId || props.patternId} topLabelContainerStyle={item.topLabelContainerStyle} width={item.barWidth || props.barWidth || 30} barStyle={barStyle} item={item} sideWidth={item.sideWidth ||
                props.sideWidth ||
                (item.barWidth || props.barWidth || 30) / 2} side={side || 'left'} frontColor={item.frontColor || props.frontColor || ''} sideColor={item.sideColor || props.sideColor || ''} topColor={item.topColor || props.topColor || ''} showGradient={item.showGradient || props.showGradient || false} gradientColor={item.gradientColor || props.gradientColor} topLabelComponent={item.topLabelComponent} opacity={opacity || 1} animationDuration={animationDuration || 800} height={Math.max(minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200) -
                barMarginBottom)} intactTopLabel={props.intactTopLabel} horizontal={props.horizontal}/>) : (<ThreeDBar_1.default barBackgroundPattern={item.barBackgroundPattern || props.barBackgroundPattern} patternId={item.patternId || props.patternId} style={{}} color={''} topLabelContainerStyle={item.topLabelContainerStyle} width={item.barWidth || props.barWidth || 30} sideWidth={item.sideWidth ||
                props.sideWidth ||
                (item.barWidth || props.barWidth || 30) / 2} barStyle={barStyle} item={item} side={side || 'left'} frontColor={item.frontColor || props.frontColor || ''} sideColor={item.sideColor || props.sideColor || ''} topColor={item.topColor || props.topColor || ''} showGradient={item.showGradient || props.showGradient || false} gradientColor={item.gradientColor || props.gradientColor} topLabelComponent={item.topLabelComponent || Function} opacity={opacity || 1} horizontal={props.horizontal} intactTopLabel={props.intactTopLabel} height={Math.max(minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200) -
                barMarginBottom)} value={item.value}/>)) : item.showGradient || props.showGradient ? (isAnimated ? (<Animated2DWithGradient_1.default barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} barWidth={props.barWidth} barStyle={barStyle} item={item} opacity={opacity} animationDuration={animationDuration || 800} roundedBottom={props.roundedBottom || false} roundedTop={props.roundedTop || false} gradientColor={props.gradientColor} frontColor={props.frontColor || 'black'} containerHeight={containerHeight} maxValue={maxValue} height={Math.max(minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200))} minHeight={minHeight} barMarginBottom={barMarginBottom} cappedBars={props.cappedBars} capThickness={props.capThickness} capColor={props.capColor} capRadius={props.capRadius} horizontal={props.horizontal} intactTopLabel={props.intactTopLabel} barBorderRadius={props.barBorderRadius || 0}/>) : (static2DWithGradient(item))) : isAnimated ? (<Animated2DWithGradient_1.default barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} barWidth={props.barWidth} barStyle={barStyle} item={item} opacity={opacity} animationDuration={animationDuration || 800} roundedBottom={props.roundedBottom || false} roundedTop={props.roundedTop || false} gradientColor={props.gradientColor} noGradient frontColor={props.frontColor || 'black'} containerHeight={containerHeight} maxValue={maxValue} height={Math.max(minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200))} minHeight={minHeight} barMarginBottom={barMarginBottom} cappedBars={props.cappedBars} capThickness={props.capThickness} capColor={props.capColor} capRadius={props.capRadius} horizontal={props.horizontal} intactTopLabel={props.intactTopLabel} barBorderRadius={props.barBorderRadius || 0}/>) : (<Animated2DWithGradient_1.default barBackgroundPattern={props.barBackgroundPattern} patternId={props.patternId} barWidth={props.barWidth} barStyle={barStyle} item={item} opacity={opacity} animationDuration={animationDuration || 800} roundedBottom={props.roundedBottom || false} roundedTop={props.roundedTop || false} gradientColor={props.gradientColor} noGradient noAnimation frontColor={props.frontColor || 'black'} containerHeight={containerHeight} maxValue={maxValue} height={Math.max(minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200))} minHeight={minHeight} barMarginBottom={barMarginBottom} cappedBars={props.cappedBars} capThickness={props.capThickness} capColor={props.capColor} capRadius={props.capRadius} horizontal={props.horizontal} intactTopLabel={props.intactTopLabel} barBorderRadius={props.barBorderRadius || 0}/>)}
        {isAnimated
            ? renderAnimatedLabel(label, labelTextStyle, item.value)
            : renderLabel(label, labelTextStyle, item.value)}
      </react_native_1.TouchableOpacity>
      {renderTooltip && selectedIndex === index && (<react_native_1.View style={{
                position: 'absolute',
                bottom: barHeight + 60,
                left: index === data.length - 1
                    ? leftSpacing - leftShiftForLastIndexTooltip
                    : leftSpacing -
                        ((_a = item.leftShiftForTooltip) !== null && _a !== void 0 ? _a : leftShiftForTooltip),
                zIndex: 1000,
            }}>
          {renderTooltip(item, index)}
        </react_native_1.View>)}
    </>);
};
exports.default = RenderBars;
