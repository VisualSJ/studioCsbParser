const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const NodeTree = require('./NodeTree');
const NodeAction = require('./NodeAction');

exports.parse = function ( flat ) {
    var json = {};
    json.version = flat.version();
    json.textures = Utils.parseArray(flat, 'textures');
    json.texturePngs = Utils.parseArray(flat, 'texturePngs');
    json.nodeTree = NodeTree.parse(flat.nodeTree());
    json.action = NodeAction.parse(flat.action());
    json.animationList = null;
    return json;
};

exports.compile = function ( root, json ) {
    var version = root.createString(json.version || '');
    var textures = 0;
    if (json.textures && json.textures.length !== 0) {
        textures = CSParseBinary.CSParseBinary.createTexturesVector(root, json.textures.map((str) => {
            return root.createString(str);
        }));
    }
    var texturePngs = 0;
    if (json.texturePngs && json.texturePngs.length !== 0) {
        texturePngs = CSParseBinary.CSParseBinary.createTexturePngsVector(root, json.texturePngs.map((str) => {
            return root.createString(str);
        }));
    }
    var nodeTree = NodeTree.compile(root, json.nodeTree);
    var nodeAction = NodeAction.compile(root, json.action);
    var animationList = 0;
    if (json.animationList && json.animationList.length !== 0) {
        animationList = CSParseBinary.CSParseBinary.createTexturePngsVector(root, json.animationList.map((str) => {
            return root.createString(str);
        }));
    }
    CSParseBinary.CSParseBinary.startCSParseBinary(root);
    CSParseBinary.CSParseBinary.addVersion(root, version);
    CSParseBinary.CSParseBinary.addTextures(root, textures);
    CSParseBinary.CSParseBinary.addTexturePngs(root, texturePngs);
    CSParseBinary.CSParseBinary.addNodeTree(root, nodeTree);
    CSParseBinary.CSParseBinary.addAction(root, nodeAction);
    CSParseBinary.CSParseBinary.addAnimationList(root, animationList);
    return CSParseBinary.CSParseBinary.endCSParseBinary(root);
};