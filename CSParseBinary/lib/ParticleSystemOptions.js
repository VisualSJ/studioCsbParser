'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const WidgetOptions = require('./WidgetOptions');
const ResourceData = require('./ResourceData');

exports.ctor = CSParseBinary.ParticleSystemOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.nodeOptions = WidgetOptions.parse(flat.nodeOptions());
    json.fileNameData = ResourceData.parse(flat.fileNameData());
    json.blendFunc = Utils.parseBlendFunc(flat.blendFunc());
    return json;
};

exports.compile = function ( root, json ) {
    var nodeOptions = WidgetOptions.compile(root, json.nodeOptions);
    var fileNameData = ResourceData.compile(root, json.fileNameData);
    CSParseBinary.SpriteOptions.startSpriteOptions(root);
    CSParseBinary.SpriteOptions.addNodeOptions(root, nodeOptions);
    CSParseBinary.SpriteOptions.addFileNameData(root, fileNameData);
    CSParseBinary.SpriteOptions.addBlendFunc(root, CSParseBinary.BlendFunc.createBlendFunc(root, json.blendFunc.src, json.blendFunc.dst));
    return CSParseBinary.SpriteOptions.endSpriteOptions(root);
};