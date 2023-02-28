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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
function Rule(props) {
    var _a = props.config, thickness = _a.thickness, width = _a.width, color = _a.color, type = _a.type, dashWidth = _a.dashWidth, dashGap = _a.dashGap;
    if (type === 'solid') {
        return (<react_native_svg_1.default height={thickness} width={width} {...props}>
        <react_native_svg_1.G fill="lightgray" stroke={color} strokeWidth={thickness}>
          <react_native_svg_1.Path d={"M0 ".concat(thickness / 2, "h").concat(width)}/>
        </react_native_svg_1.G>
      </react_native_svg_1.default>);
    }
    return (<react_native_svg_1.default height={thickness} width={width} {...props}>
      <react_native_svg_1.G fill="lightgray" stroke={color} strokeWidth={thickness}>
        <react_native_svg_1.Path strokeDasharray={"".concat(dashWidth, ",").concat(dashGap)} d={"M0 ".concat(thickness / 2, "h").concat(width)}/>
      </react_native_svg_1.G>
    </react_native_svg_1.default>);
}
exports.default = Rule;
