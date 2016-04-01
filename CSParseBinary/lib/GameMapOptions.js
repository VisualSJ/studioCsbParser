'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const WidgetOptions = require('./WidgetOptions');
const ResourceData = require('./ResourceData');

exports.ctor = CSParseBinary.GameMapOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.nodeOptions = WidgetOptions.parse(flat.nodeOptions());
    json.fileNameData = ResourceData.parse(flat.fileNameData());
    return json;
};

exports.compile = function ( root, json ) {
    var nodeOptions = WidgetOptions.compile(root, json.nodeOptions);
    var fileNameData = ResourceData.compile(root, json.fileNameData);
    CSParseBinary.GameMapOptions.startGameMapOptions(root);
    CSParseBinary.GameMapOptions.addNodeOptions(root, nodeOptions);
    CSParseBinary.GameMapOptions.addFileNameData(root, fileNameData);
    return CSParseBinary.GameMapOptions.endGameMapOptions(root);
};