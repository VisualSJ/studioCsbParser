'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const WidgetOptions = require('./WidgetOptions');

exports.ctor = CSParseBinary.SingleNodeOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.nodeOptions = WidgetOptions.parse(flat.nodeOptions());
    return json;
};

exports.compile = function ( root, json ) {
    var nodeOptions = WidgetOptions.compile(root, json.nodeOptions);
    CSParseBinary.SpriteOptions.startSpriteOptions(root);
    CSParseBinary.SpriteOptions.addNodeOptions(root, nodeOptions);
    return CSParseBinary.SpriteOptions.endSpriteOptions(root);
};