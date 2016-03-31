'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const Options = require('./Options');

exports.parse = function ( flat ) {
    var json = {};
    json.classname = flat.classname();
    json.children = Utils.parseArray(flat, 'children', ( childFlat ) => {
        return exports.parse(childFlat);
    });
    json.options = Options.parse(flat.options(), json.classname);
    json.customClassName = flat.customClassName();
    return json;
};

exports.compile = function ( root, json ) {
    var classname = root.createString(json.classname);
    var customClassName = root.createString(json.customClassName);
    var children = 0;
    if (json.children && json.children.length !== 0) {
        children = CSParseBinary.CSParseBinary.createTexturePngsVector(root, json.children.map((child) => {
            return exports.compile(root, child);
        }));
    }
    var options = Options.compile(root, json.options, json.classname);

    CSParseBinary.NodeTree.startNodeTree(root);
    CSParseBinary.NodeTree.addClassname(root, classname);
    CSParseBinary.NodeTree.addCustomClassName(root, customClassName);
    CSParseBinary.NodeTree.addChildren(root, children);
    CSParseBinary.NodeTree.addOptions(root, options);
    return  CSParseBinary.NodeTree.endNodeTree(root);
};