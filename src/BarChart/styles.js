"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 40,
        marginRight: 40,
    },
    horizBar: {
        flexDirection: 'row',
    },
    leftLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastLeftLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftPart: {
        justifyContent: 'center',
        width: '100%',
    },
    lastLeftPart: {
        justifyContent: 'flex-end',
        width: '100%',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.5,
    },
    lastLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
    },
    bottomLabel: {
        width: '100%',
    },
});
