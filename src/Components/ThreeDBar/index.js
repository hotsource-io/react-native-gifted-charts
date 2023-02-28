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
var react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
var styles_1 = require("./styles");
var TriangleCorner = function (props) {
    return (<react_native_1.View style={[
            aStyles.triangleCorner,
            props.style,
            {
                borderRightWidth: props.width / 2,
                borderTopWidth: props.width / 2,
                borderTopColor: props.color,
            },
        ]}/>);
};
var aStyles = react_native_1.StyleSheet.create({
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        transform: [{ rotate: '90deg' }],
    },
});
var ThreeDBar = function (props) {
    var width = props.width, sideWidth = props.sideWidth, height = props.height, value = props.value, barBackgroundPattern = props.barBackgroundPattern, patternId = props.patternId, barStyle = props.barStyle, item = props.item;
    var showGradient = props.showGradient || false;
    var gradientColor = props.gradientColor || 'white';
    var frontColor = props.frontColor || '#fe2233';
    var sideColor = props.sideColor || '#cc2233';
    var topColor = props.topColor || '#ff4433';
    var topLabelComponent = props.topLabelComponent || null;
    var topLabelContainerStyle = props.topLabelContainerStyle || {};
    var opacity = props.opacity || 1;
    return (<react_native_1.View style={styles_1.styles.container}>
      {props.height ? (<react_native_1.View style={[
                styles_1.styles.row,
                props.side === 'right' && { transform: [{ rotateY: '180deg' }] },
            ]}>
          {/*******************          Top View             *****************/}

          <react_native_1.View style={{ position: 'absolute', top: sideWidth / -2 }}>
            <TriangleCorner color={topColor} width={sideWidth} style={{ transform: [{ rotate: '90deg' }], opacity: opacity }}/>
          </react_native_1.View>
          <react_native_1.View style={{ position: 'absolute', top: sideWidth / -2 }}>
            <react_native_1.View style={{
                width: width,
                height: width * 0.4,
                // left: width / -8,
                backgroundColor: topColor,
                opacity: opacity,
            }}/>
          </react_native_1.View>
          <react_native_1.View style={{ position: 'absolute', top: sideWidth / -2, left: width }}>
            <TriangleCorner color={topColor} width={sideWidth} style={{ transform: [{ rotate: '-90deg' }], opacity: opacity }}/>
          </react_native_1.View>

          {/*******************************************************************/}

          <react_native_1.View style={{ marginTop: sideWidth / -2 }}>
            <TriangleCorner color={sideColor} width={sideWidth} style={{ transform: [{ rotate: '-90deg' }], opacity: opacity }}/>
            <react_native_1.View style={{
                width: sideWidth / 2,
                height: height - sideWidth / 2,
                backgroundColor: sideColor,
                opacity: opacity,
            }}/>
            <TriangleCorner color={sideColor} width={sideWidth} style={{ transform: [{ rotate: '90deg' }], opacity: opacity }}/>
          </react_native_1.View>

          <react_native_1.View style={[
                {
                    width: width,
                    height: height,
                    backgroundColor: frontColor,
                    borderLeftWidth: react_native_1.StyleSheet.hairlineWidth,
                    borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
                    borderColor: 'white',
                    opacity: opacity,
                },
                item.barStyle || barStyle,
            ]}>
            {showGradient && (<react_native_linear_gradient_1.default style={{ position: 'absolute', width: '100%', height: '100%' }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[gradientColor, frontColor]}/>)}
            {barBackgroundPattern && (<react_native_svg_1.default>
                <react_native_svg_1.Defs>{barBackgroundPattern()}</react_native_svg_1.Defs>
                <react_native_svg_1.Rect stroke="transparent" x="1" y="1" width={width || 30} height={height} fill={"url(#".concat(patternId, ")")}/>
              </react_native_svg_1.default>)}
          </react_native_1.View>
        </react_native_1.View>) : null}

      {/*******************          Top Label            *****************/}

      {topLabelComponent && (<react_native_1.View style={[
                {
                    position: 'absolute',
                    top: value < 0 ? width * -1 : width * -2,
                    height: (width * 3) / 2,
                    width: width,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                value < 0 && { transform: [{ rotate: '180deg' }] },
                props.horizontal &&
                    !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                props.side === 'right'
                    ? { right: (-1 * width) / 4 }
                    : { left: (-1 * width) / 4 },
                topLabelContainerStyle,
            ]}>
          {topLabelComponent()}
        </react_native_1.View>)}

      {/*******************************************************************/}
    </react_native_1.View>);
};
exports.default = ThreeDBar;
