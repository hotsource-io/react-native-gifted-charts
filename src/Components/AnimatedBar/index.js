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
const styles_1 = require("./styles");
if (react_native_1.Platform.OS === 'android') {
    react_native_1.UIManager.setLayoutAnimationEnabledExperimental &&
        react_native_1.UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TriangleCorner = (props) => {
    return (<react_native_1.View style={[
            triangleStyles.triangleCorner,
            props.style,
            {
                borderRightWidth: props.width / 2,
                borderTopWidth: props.width / 2,
                borderTopColor: props.color,
            },
        ]}/>);
};
const triangleStyles = react_native_1.StyleSheet.create({
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        transform: [{ rotate: '90deg' }],
    },
});
const AnimatedBar = (props) => {
    const [initialRender, setInitialRender] = (0, react_1.useState)(true);
    const [height, setHeight] = (0, react_1.useState)(react_native_1.Platform.OS === 'ios' ? 0 : 20);
    const animationDuration = props.animationDuration || 800;
    (0, react_1.useEffect)(() => {
        if (initialRender) {
            // labelsAppear();
            // increaseOpacity();
            setTimeout(() => {
                layoutAppear();
            }, 20);
        }
        else {
            elevate();
        }
    }, [props.height]);
    const elevate = () => {
        react_native_1.LayoutAnimation.configureNext({
            duration: animationDuration,
            update: { type: 'linear', property: 'scaleY' },
        });
        setHeight(props.height);
    };
    const layoutAppear = () => {
        react_native_1.LayoutAnimation.configureNext({
            duration: react_native_1.Platform.OS == 'ios' ? animationDuration : 20,
            create: { type: 'linear', property: 'scaleY' },
            // update: { type: 'linear' }
        });
        setInitialRender(false);
        setTimeout(() => elevate(), react_native_1.Platform.OS == 'ios' ? 10 : 100);
    };
    const { item, width, sideWidth, barStyle } = props;
    const { barBackgroundPattern, patternId } = props;
    const showGradient = props.showGradient || false;
    const gradientColor = props.gradientColor || 'white';
    const frontColor = props.frontColor || '#fe2233';
    const sideColor = props.sideColor || '#cc2233';
    const topColor = props.topColor || '#ff4433';
    const topLabelComponent = props.topLabelComponent || null;
    const topLabelContainerStyle = props.topLabelContainerStyle || {};
    const opacity = props.opacity || 1;
    return (<react_native_1.View style={styles_1.styles.container}>
      {!initialRender && (<react_native_1.View style={[
                styles_1.styles.row,
                { opacity: opacity, position: 'absolute', bottom: 0 },
                props.side === 'right' && { transform: [{ rotateY: '180deg' }] },
            ]}>
          {/*******************          Top View             *****************/}
          {props.height ? (<>
              <react_native_1.View style={{ position: 'absolute', top: sideWidth / -2 }}>
                <TriangleCorner color={topColor} width={sideWidth} style={{ transform: [{ rotate: '90deg' }], opacity: opacity }}/>
              </react_native_1.View>
              <react_native_1.View style={{ position: 'absolute', top: sideWidth / -2 }}>
                <react_native_1.View style={{
                    width: width,
                    height: width * 0.4,
                    // left: width / 2,
                    backgroundColor: topColor,
                    opacity: opacity,
                }}/>
              </react_native_1.View>
              <react_native_1.View style={{
                    position: 'absolute',
                    top: sideWidth / -2,
                    left: width,
                }}>
                <TriangleCorner color={topColor} width={sideWidth} style={{ transform: [{ rotate: '-90deg' }], opacity: opacity }}/>
              </react_native_1.View>
            </>) : null}

          {/*******************************************************************/}

          {props.height ? (<react_native_1.View style={{ marginTop: sideWidth / -2 }}>
              <TriangleCorner color={sideColor} width={sideWidth} style={{ transform: [{ rotate: '-90deg' }], opacity: opacity }}/>
              <react_native_1.View style={{
                    width: sideWidth / 2,
                    height: height - sideWidth / 2,
                    backgroundColor: sideColor,
                    opacity: opacity,
                }}/>
              <TriangleCorner color={sideColor} width={sideWidth} style={{ transform: [{ rotate: '90deg' }], opacity: opacity }}/>
            </react_native_1.View>) : null}

          <react_native_1.View style={[{
                    width: width,
                    height: height,
                    backgroundColor: frontColor,
                    borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
                    borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
                    borderColor: 'white',
                    opacity: opacity,
                },
                item.barStyle || barStyle
            ]}>
            {showGradient && (<react_native_linear_gradient_1.default style={{ position: 'absolute', width: '100%', height: '100%' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[gradientColor, frontColor]}/>)}
            {barBackgroundPattern && (<react_native_svg_1.default>
                <react_native_svg_1.Defs>{barBackgroundPattern()}</react_native_svg_1.Defs>
                <react_native_svg_1.Rect stroke="transparent" x="1" y="1" width={width || 30} height={height} fill={`url(#${patternId})`}/>
              </react_native_svg_1.default>)}
          </react_native_1.View>

          {/*******************          Top Label            *****************/}

          {topLabelComponent && (<react_native_1.View style={[
                    {
                        position: 'absolute',
                        top: width * -2,
                        height: (width * 3) / 2,
                        width: (width * 3) / 2,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        opacity: opacity,
                    },
                    props.horizontal &&
                        !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                    props.side === 'right' && { transform: [{ rotateY: '180deg' }] },
                    topLabelContainerStyle,
                ]}>
              {topLabelComponent()}
            </react_native_1.View>)}

          {/*******************************************************************/}
        </react_native_1.View>)}
    </react_native_1.View>);
};
exports.default = AnimatedBar;
