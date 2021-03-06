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
    CSParseBinary.ParticleSystemOptions.startParticleSystemOptions(root);
    CSParseBinary.ParticleSystemOptions.addNodeOptions(root, nodeOptions);
    CSParseBinary.ParticleSystemOptions.addFileNameData(root, fileNameData);
    CSParseBinary.ParticleSystemOptions.addBlendFunc(root, CSParseBinary.BlendFunc.createBlendFunc(root, json.blendFunc.src, json.blendFunc.dst));
    return CSParseBinary.ParticleSystemOptions.endParticleSystemOptions(root);
};