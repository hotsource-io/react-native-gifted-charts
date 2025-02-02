/// <reference types="node" />
import { Component } from 'react';
import { ColorValue } from 'react-native';
import { Style } from 'util';
type Props = {
    style?: any;
    width?: number;
    height?: number;
    color?: ColorValue;
    topLabelComponent?: Component;
    topLabelContainerStyle?: Style;
    opacity?: number;
    label: String;
    labelTextStyle?: any;
    disablePress?: boolean;
    item: itemType;
    index: number;
    containerHeight?: number;
    maxValue: number;
    spacing?: number;
    propSpacing?: number;
    data?: any;
    barWidth?: number;
    onPress?: Function;
    rotateLabel?: Boolean;
    showXAxisIndices: Boolean;
    xAxisIndicesHeight: number;
    xAxisIndicesWidth: number;
    xAxisIndicesColor: ColorValue;
    horizontal: Boolean;
    intactTopLabel: Boolean;
    barBorderRadius?: number;
    xAxisThickness: number;
    barBackgroundPattern?: Function;
    patternId?: String;
    xAxisTextNumberOfLines: number;
    renderTooltip: Function;
    leftShiftForTooltip?: number;
    leftShiftForLastIndexTooltip: number;
    initialSpacing: number;
    selectedIndex: number;
    setSelectedIndex: Function;
    activeOpacity: number;
    showGradient?: Boolean;
    gradientColor?: any;
    stackData: Array<itemType>;
};
type itemType = {
    value?: number;
    onPress?: any;
    label?: String;
    barWidth?: number;
    spacing?: number;
    labelTextStyle?: any;
    topLabelComponent?: Function;
    topLabelContainerStyle?: any;
    disablePress?: any;
    color?: ColorValue;
    showGradient?: Boolean;
    gradientColor?: any;
    capThickness?: number;
    capColor?: ColorValue;
    capRadius?: number;
    labelComponent?: Function;
    borderRadius?: number;
    stacks?: Array<any>;
    barBackgroundPattern?: Function;
    barBorderRadius?: Number;
    patternId?: String;
    leftShiftForTooltip?: number;
};
declare const RenderStackBars: (props: Props) => JSX.Element;
export default RenderStackBars;
