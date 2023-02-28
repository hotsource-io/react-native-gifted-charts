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
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const RenderStackBars = (props) => {
    var _a;
    const { barBackgroundPattern, patternId, item, index, containerHeight, maxValue, spacing, propSpacing, rotateLabel, xAxisThickness, label, labelTextStyle, xAxisTextNumberOfLines, renderTooltip, leftShiftForTooltip, leftShiftForLastIndexTooltip, initialSpacing, selectedIndex, setSelectedIndex, activeOpacity, stackData, } = props;
    let leftSpacing = initialSpacing;
    for (let i = 0; i < index; i++) {
        leftSpacing +=
            (stackData[i].spacing === 0 ? 0 : stackData[i].spacing || propSpacing) +
                (stackData[i].stacks[0].barWidth || props.barWidth || 30);
    }
    const disablePress = props.disablePress || false;
    const renderLabel = (label, labelTextStyle) => {
        return (<react_native_1.View style={[
                {
                    width: (item.stacks[0].barWidth || props.barWidth || 30) + spacing / 2,
                    position: 'absolute',
                    bottom: rotateLabel ? -40 : -25,
                },
                rotateLabel
                    ? props.horizontal
                        ? { transform: [{ rotate: '330deg' }] }
                        : { transform: [{ rotate: '60deg' }] }
                    : props.horizontal
                        ? { transform: [{ rotate: '-90deg' }] }
                        : {},
            ]}>
        {item.labelComponent ? (item.labelComponent()) : (<react_native_1.Text style={[labelTextStyle]} numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </react_native_1.Text>)}
      </react_native_1.View>);
    };
    const getPosition = (index) => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position +=
                (Math.abs(props.item.stacks[i].value) * (containerHeight || 200)) /
                    (maxValue || 200);
        }
        return position;
    };
    const totalHeight = props.item.stacks.reduce((acc, stack) => acc +
        (Math.abs(stack.value) * (containerHeight || 200)) / (maxValue || 200), 0);
    const static2DSimple = (item, index) => {
        const cotainsNegative = item.stacks.some(item => item.value < 0);
        return (<>
        <react_native_1.TouchableOpacity disabled={disablePress} activeOpacity={activeOpacity} onPress={() => {
                setSelectedIndex(index);
                if (item.onPress) {
                    item.onPress();
                }
                else if (props.onPress) {
                    props.onPress(item, index);
                }
            }} style={[
                {
                    position: 'absolute',
                    width: item.stacks[0].barWidth || props.barWidth || 30,
                    height: '100%',
                },
                cotainsNegative && {
                    transform: [
                        { translateY: totalHeight + xAxisThickness / 2 },
                        { rotate: '180deg' },
                    ],
                },
            ]}>
          {item.stacks.map((stackItem, index) => {
                return (<react_native_1.TouchableOpacity key={index} onPress={stackItem.onPress} activeOpacity={activeOpacity} disabled={disablePress || !stackItem.onPress} style={[
                        {
                            position: 'absolute',
                            bottom: getPosition(index) + (stackItem.marginBottom || 0),
                            width: '100%',
                            height: (Math.abs(stackItem.value) * (containerHeight || 200)) /
                                (maxValue || 200) -
                                (stackItem.marginBottom || 0),
                            backgroundColor: stackItem.color || item.color || props.color || 'black',
                            borderRadius: stackItem.borderRadius || props.barBorderRadius || 0,
                        },
                        !props.barBorderRadius &&
                            !stackItem.borderRadius && {
                            borderTopLeftRadius: stackItem.borderTopLeftRadius || 0,
                            borderTopRightRadius: stackItem.borderTopRightRadius || 0,
                            borderBottomLeftRadius: stackItem.borderBottomLeftRadius || 0,
                            borderBottomRightRadius: stackItem.borderBottomRightRadius || 0,
                        },
                    ]}>
                {stackItem.showGradient ||
                        item.showGradient ||
                        props.showGradient ? (<react_native_linear_gradient_1.default style={[
                            {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: stackItem.barBorderRadius ||
                                    item.barBorderRadius ||
                                    props.barBorderRadius ||
                                    0,
                            },
                        ]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[
                            stackItem.gradientColor ||
                                item.gradientColor ||
                                props.gradientColor ||
                                'white',
                            stackItem.color || item.color || props.color || 'black',
                        ]}/>) : null}
                {stackItem.innerBarComponent && stackItem.innerBarComponent()}
              </react_native_1.TouchableOpacity>);
            })}
          {(item.barBackgroundPattern || barBackgroundPattern) && (<react_native_svg_1.default>
              <react_native_svg_1.Defs>
                {item.barBackgroundPattern
                    ? item.barBackgroundPattern()
                    : barBackgroundPattern()}
              </react_native_svg_1.Defs>
              <react_native_svg_1.Rect stroke="transparent" x="1" y="1" width="100%" height="100%" fill={`url(#${item.patternId || patternId})`}/>
            </react_native_svg_1.default>)}
        </react_native_1.TouchableOpacity>
        {item.topLabelComponent && (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        top: cotainsNegative
                            ? 0
                            : (item.barWidth || props.barWidth || 30) * -1,
                        height: item.barWidth || props.barWidth || 30,
                        width: item.barWidth || props.barWidth || 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    cotainsNegative && { transform: [{ translateY: totalHeight * 2 }] },
                    props.horizontal &&
                        !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                    item.topLabelContainerStyle,
                ]}>
            {item.topLabelComponent()}
          </react_native_1.View>)}
      </>);
    };
    return (<>
      <react_native_1.View style={[
            {
                // overflow: 'visible',
                marginBottom: 60,
                width: item.stacks[0].barWidth || props.barWidth || 30,
                height: totalHeight,
                marginRight: spacing,
            },
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
        {static2DSimple(item, index)}
        {renderLabel(label || '', labelTextStyle)}
      </react_native_1.View>
      {renderTooltip && selectedIndex === index && (<react_native_1.View style={{
                position: 'absolute',
                bottom: totalHeight + 60,
                left: index === stackData.length - 1
                    ? leftSpacing - leftShiftForLastIndexTooltip
                    : leftSpacing -
                        ((_a = item.leftShiftForTooltip) !== null && _a !== void 0 ? _a : leftShiftForTooltip),
                zIndex: 1000,
            }}>
          {renderTooltip(item, index)}
        </react_native_1.View>)}
    </>);
};
exports.default = RenderStackBars;
