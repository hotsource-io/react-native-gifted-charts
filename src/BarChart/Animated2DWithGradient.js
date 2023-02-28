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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
if (react_native_1.Platform.OS === 'android') {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental &&
        react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Animated2DWithGradient = (props) => {
    const { barBackgroundPattern, patternId, barWidth, barStyle, item, opacity, animationDuration, noGradient, noAnimation, containerHeight, maxValue, barMarginBottom, } = props;
    const [height, setHeight] = (0, react_1.useState)(noAnimation ? props.height : 2);
    const [initialRender, setInitialRender] = (0, react_1.useState)(noAnimation ? false : true);
    (0, react_1.useEffect)(() => {
        if (!noAnimation) {
            if (initialRender) {
                setTimeout(() => layoutAppear(), 20);
            }
            else {
                elevate();
            }
        }
    }, [props.height]);
    const elevate = () => {
        react_native_1.LayoutAnimation.configureNext({
            duration: animationDuration,
            update: { type: 'linear', property: 'scaleXY' },
        });
        setHeight(props.height);
    };
    const layoutAppear = () => {
        react_native_1.LayoutAnimation.configureNext({
            duration: react_native_1.Platform.OS == 'ios' ? animationDuration : 20,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear', property: 'scaleXY' },
        });
        setInitialRender(false);
        setTimeout(() => elevate(), react_native_1.Platform.OS == 'ios' ? 10 : 100);
    };
    return (<>
      {!initialRender && (<react_native_1.View style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: (noAnimation
                    ? Math.max(props.minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                        (maxValue || 200))
                    : height) - (barMarginBottom || 0),
            }}>
          <react_native_1.View style={[
                {
                    width: '100%',
                    height: (noAnimation
                        ? Math.max(props.minHeight, (Math.abs(item.value) * (containerHeight || 200)) /
                            (maxValue || 200))
                        : height) - (barMarginBottom || 0),
                },
                item.barStyle || barStyle,
            ]}>
            {noGradient ? (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: item.frontColor || props.frontColor || 'black',
                        borderRadius: props.barBorderRadius || item.barBorderRadius || 0,
                    },
                    props.roundedBottom && {
                        borderBottomLeftRadius: (item.barWidth || barWidth || 30) / 2,
                        borderBottomRightRadius: (item.barWidth || barWidth || 30) / 2,
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
                        borderTopLeftRadius: (item.barWidth || barWidth || 30) / 2,
                        borderTopRightRadius: (item.barWidth || barWidth || 30) / 2,
                    },
                ]}>
                {props.cappedBars && (<react_native_1.View style={{
                        position: 'absolute',
                        width: '100%',
                        height: item.capThickness === 0
                            ? 0
                            : item.capThickness || props.capThickness || 6,
                        backgroundColor: item.capColor || props.capColor || 'black',
                        borderTopLeftRadius: item.capRadius === 0
                            ? 0
                            : item.capRadius || props.capRadius || 0,
                        borderTopRightRadius: item.capRadius === 0
                            ? 0
                            : item.capRadius || props.capRadius || 0,
                    }}/>)}
              </react_native_1.View>) : (<react_native_linear_gradient_1.default style={[
                    {
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: props.barBorderRadius || item.barBorderRadius || 0,
                    },
                    props.roundedBottom && {
                        borderBottomLeftRadius: (item.barWidth || barWidth || 30) / 2,
                        borderBottomRightRadius: (item.barWidth || barWidth || 30) / 2,
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
                        borderTopLeftRadius: (item.barWidth || barWidth || 30) / 2,
                        borderTopRightRadius: (item.barWidth || barWidth || 30) / 2,
                    },
                ]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[
                    item.gradientColor || props.gradientColor || 'white',
                    item.frontColor || props.frontColor || 'black',
                ]}>
                {props.cappedBars && (<react_native_1.View style={{
                        position: 'absolute',
                        width: '100%',
                        height: item.capThickness === 0
                            ? 0
                            : item.capThickness || props.capThickness || 6,
                        backgroundColor: item.capColor || props.capColor || 'black',
                        borderTopLeftRadius: item.capRadius === 0
                            ? 0
                            : item.capRadius || props.capRadius || 0,
                        borderTopRightRadius: item.capRadius === 0
                            ? 0
                            : item.capRadius || props.capRadius || 0,
                    }}/>)}
              </react_native_linear_gradient_1.default>)}
            {(item.barBackgroundPattern || barBackgroundPattern) && (<react_native_svg_1.default>
                <react_native_svg_1.Defs>
                  {item.barBackgroundPattern
                    ? item.barBackgroundPattern()
                    : barBackgroundPattern()}
                </react_native_svg_1.Defs>
                <react_native_svg_1.Rect stroke="transparent" x="1" y="1" width={item.barWidth || props.barWidth || 30} height={noAnimation
                    ? (Math.abs(item.value) * (containerHeight || 200)) /
                        (maxValue || 200)
                    : height} fill={`url(#${item.patternId || patternId})`}/>
              </react_native_svg_1.default>)}
          </react_native_1.View>
          {item.topLabelComponent && (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        top: (item.barWidth || barWidth || 30) * -1,
                        height: item.barWidth || barWidth || 30,
                        width: item.barWidth || barWidth || 30,
                        justifyContent: (props.horizontal && !props.intactTopLabel) ||
                            item.value < 0
                            ? 'center'
                            : 'flex-end',
                        alignItems: 'center',
                        opacity: opacity,
                    },
                    item.value < 0 && { transform: [{ rotate: '180deg' }] },
                    props.horizontal &&
                        !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                    item.topLabelContainerStyle,
                ]}>
              {item.topLabelComponent()}
            </react_native_1.View>)}
        </react_native_1.View>)}
    </>);
};
exports.default = Animated2DWithGradient;
