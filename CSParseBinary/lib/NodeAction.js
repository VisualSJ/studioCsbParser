'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');

exports.parse = function ( flat ) {
    var result = {};
    result.duration = flat.duration();
    result.speed = flat.speed();
    // todo
    result.timeLines = Utils.parseArray(flat, 'timeLines', (timeLine) => { return timeLine; });
    result.currentAnimationName = flat.currentAnimationName();
    return result;
};

exports.compile = function ( root, json ) {
    var current = root.createString(json.currentAnimationName);
    var timeLines = 0;
    if (json.timeLines && json.timeLines.length !== 0) {
        timeLines = CSParseBinary.NodeAction.createTimeLinesVector(root, json.timeLines.map((timeLine) => {
            // todo
            return '';//handleTimeline(root, timeLine);
        }));
    }
    CSParseBinary.NodeAction.startNodeAction(root);
    CSParseBinary.NodeAction.addDuration(root, json.duration);
    CSParseBinary.NodeAction.addDuration(root, json.speed);
    CSParseBinary.NodeAction.addTimeLines(root, timeLines);
    CSParseBinary.NodeAction.addCurrentAnimationName(root, current);
    return  CSParseBinary.NodeAction.endNodeAction(root);
};