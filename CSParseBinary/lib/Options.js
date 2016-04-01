'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;

const Parser = {
    'Node': require('./WidgetOptions'),
    'Sprite': require('./SpriteOptions'),
    'SingleNode': require('./SingleNodeOptions'),
    'ParticleSystem': require('./ParticleSystemOptions'),

    'GameMapOptions': require('./GameMapOptions'),
    'ButtonOptions': require('./ButtonOptions'),
    'CheckBoxOptions': require('./CheckBoxOptions'),
};

exports.parse = function ( flat, type ) {
    var json = {};
    var parser = Parser[type];
    if (!parser) {
        parser = Parser['Node'];
    }
    json.data = parser.parse(flat.data(new parser.ctor));
    return json;
};

exports.compile = function ( root, json, type ) {
    var parser = Parser[type];
    if (!parser) {
        parser = Parser['Node'];
    }
    var data = parser.compile(root, json.data);
    CSParseBinary.Options.startOptions(root);
    CSParseBinary.Options.addData(root, data);
    return CSParseBinary.Options.endOptions(root);
};