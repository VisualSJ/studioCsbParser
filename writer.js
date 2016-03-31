'use strict';

const Fs = require('fs');
const Flatbuffers = require('./flatbuffers').flatbuffers;
const Parser = require('./CSParseBinary_generated').flatbuffers;

var handleRoot = function (root, json) {
    var version = root.createString(json.version);
    var textures = 0;
    if (json.textures && json.textures.length !== 0) {
        textures = Parser.CSParseBinary.createTexturesVector(root, json.textures.map((str) => {
            return root.createString(str);
        }));
    }
    var texturePngs = 0;
    if (json.texturePngs && json.texturePngs.length !== 0) {
        texturePngs = Parser.CSParseBinary.createTexturePngsVector(root, json.texturePngs.map((str) => {
            return root.createString(str);
        }));
    }
    var nodeTree = handleNode(root, json.nodeTree);
    var nodeAction = handleAction(root, json.action);
    var animationList = 0;
    if (json.animationList && json.animationList.length !== 0) {
        animationList = Parser.CSParseBinary.createTexturePngsVector(root, json.animationList.map((str) => {
            return root.createString(str);
        }));
    }

    Parser.CSParseBinary.startCSParseBinary(root);
    Parser.CSParseBinary.addVersion(root, version);
    Parser.CSParseBinary.addTextures(root, textures);
    Parser.CSParseBinary.addTexturePngs(root, texturePngs);
    Parser.CSParseBinary.addNodeTree(root, nodeTree);
    Parser.CSParseBinary.addAction(root, nodeAction);
    Parser.CSParseBinary.addAnimationList(root, animationList);
    return Parser.CSParseBinary.endCSParseBinary(root);
};

var handleNode = function (root, json) {
    var classname = root.createString(json.classname);
    var customClassName = root.createString(json.customClassName);
    var children = 0;
    if (json.children && json.children.length !== 0) {
        children = Parser.CSParseBinary.createTexturePngsVector(root, json.children.map((child) => {
            return handleNode(root, child);
        }));
    }
    var options = handleOptions(root, json.options, json.classname);

    Parser.NodeTree.startNodeTree(root);
    Parser.NodeTree.addClassname(root, classname);
    Parser.NodeTree.addCustomClassName(root, customClassName);
    Parser.NodeTree.addChildren(root, children);
    Parser.NodeTree.addOptions(root, options);
    return  Parser.NodeTree.endNodeTree(root);
};

var handleOptions = function (root, json, type) {
    var handle = op[type];
    if (!handle) handle = op['Node'];
    var data = handle(root, json.data);

    Parser.Options.startOptions(root);
    Parser.Options.addData(root, data);
    return Parser.Options.endOptions(root);
};

var handleSpriteOptions = function (root, json) {
    var nodeOptions = handleWidgetOptions(root, json.nodeOptions);
    var fileNameData = handleResourceData(root, json.fileNameData);
    Parser.SpriteOptions.startSpriteOptions(root);
    Parser.SpriteOptions.addNodeOptions(root, nodeOptions);
    Parser.SpriteOptions.addFileNameData(root, fileNameData);
    Parser.SpriteOptions.addBlendFunc(root, Parser.BlendFunc.createBlendFunc(root, json.blendFunc.src, json.blendFunc.dst));
    return Parser.SpriteOptions.endSpriteOptions(root);
};

var handleWidgetOptions = function (root, json) {
    var name = root.createString(json.name);
    var actionTag = json.actionTag - 0;
    var zOrder= json.zOrder - 0;
    var visible = !!json.visible;
    var alpha = json.alpha;
    var tag = json.tag;
    var flipX = !!json.flipX;
    var flipY = !!json.flipY;
    var ignoreSize = !!json.ignoreSize;
    var touchEnabled = !!json.touchEnabled;
    var frameEvent = root.createString(json.frameEvent);
    var customProperty = root.createString(json.customProperty);
    // todo callBackType and callBackName
    var layoutComponent = handleLayoutComponent(root, json.layoutComponent);

    Parser.WidgetOptions.startWidgetOptions(root);
    Parser.WidgetOptions.addName(root, name);
    Parser.WidgetOptions.addActionTag(root, actionTag);
    Parser.WidgetOptions.addRotationSkew(root, Parser.RotationSkew.createRotationSkew(root, json.rotationSkew.rotationSkewX, json.rotationSkew.rotationSkewY));
    Parser.WidgetOptions.addZOrder(root, zOrder);
    Parser.WidgetOptions.addVisible(root, visible);
    Parser.WidgetOptions.addAlpha(root, alpha);
    Parser.WidgetOptions.addTag(root, tag);
    Parser.WidgetOptions.addPosition(root, Parser.Position.createPosition(root, json.position.x, json.position.y));
    Parser.WidgetOptions.addScale(root, Parser.Scale.createScale(root, json.scale.scaleX, json.scale.scaleY));
    Parser.WidgetOptions.addAnchorPoint(root, Parser.AnchorPoint.createAnchorPoint(root, json.anchorPoint.scaleX, json.anchorPoint.scaleY));
    Parser.WidgetOptions.addColor(root, Parser.Color.createColor(root, json.color.a, json.color.r, json.color.g, json.color.b));
    Parser.WidgetOptions.addSize(root, Parser.FlatSize.createFlatSize(root, json.size.width, json.size.height));
    Parser.WidgetOptions.addFlipX(root, flipX);
    Parser.WidgetOptions.addFlipY(root, flipY);
    Parser.WidgetOptions.addIgnoreSize(root, ignoreSize);
    Parser.WidgetOptions.addTouchEnabled(root, touchEnabled);
    Parser.WidgetOptions.addFrameEvent(root, frameEvent);
    Parser.WidgetOptions.addCustomProperty(root, customProperty);
    Parser.WidgetOptions.addLayoutComponent(root, layoutComponent);
    return Parser.WidgetOptions.endWidgetOptions(root);
};

var op = {
    'Node': handleWidgetOptions,
    'Sprite': handleSpriteOptions
};

var handleLayoutComponent = function (root, json) {
    var horizontalEdge = root.createString(json.horizontalEdge);
    var verticalEdge = root.createString(json.verticalEdge);
    Parser.LayoutComponentTable.startLayoutComponentTable(root);
    Parser.LayoutComponentTable.addPositionXPercentEnabled(root, !!json.positionXPercentEnabled);
    Parser.LayoutComponentTable.addPositionYPercentEnabled(root, !!json.positionYPercentEnabled);
    Parser.LayoutComponentTable.addPositionXPercent(root, json.positionXPercent - 0);
    Parser.LayoutComponentTable.addPositionYPercent(root, json.positionYPercent - 0);
    Parser.LayoutComponentTable.addSizeXPercentEnable(root, !!json.sizeXPercentEnable);
    Parser.LayoutComponentTable.addSizeYPercentEnable(root, !!json.sizeYPercentEnable);
    Parser.LayoutComponentTable.addSizeXPercent(root, json.sizeXPercent - 0);
    Parser.LayoutComponentTable.addSizeYPercent(root, json.sizeYPercent - 0);
    Parser.LayoutComponentTable.addStretchHorizontalEnabled(root, !!json.stretchHorizontalEnabled);
    Parser.LayoutComponentTable.addStretchVerticalEnabled(root, !!json.stretchVerticalEnabled);
    Parser.LayoutComponentTable.addHorizontalEdge(root, horizontalEdge);
    Parser.LayoutComponentTable.addVerticalEdge(root, verticalEdge);
    Parser.LayoutComponentTable.addLeftMargin(root, json.leftMargin - 0);
    Parser.LayoutComponentTable.addRightMargin(root, json.rightMargin - 0);
    Parser.LayoutComponentTable.addTopMargin(root, json.topMargin - 0);
    Parser.LayoutComponentTable.addBottomMargin(root, json.bottomMargin - 0);
    return Parser.LayoutComponentTable.endLayoutComponentTable(root);
};

var handleResourceData = function (root, json) {
    var path = root.createString(json.path);
    var plistFile = root.createString(json.plistFile);
    var resourceType = root.createString(json.resourceType);
    Parser.ResourceData.startResourceData(root);
    Parser.ResourceData.addPath(root, path);
    Parser.ResourceData.addPlistFile(root, plistFile);
    Parser.ResourceData.addResourceType(root, resourceType);
    return Parser.ResourceData.endResourceData(root);
};

var handleAction = function (root, obj) {
    var current = root.createString(obj.currentAnimationName);
    var timeLines = 0;
    if (obj.timeLines && obj.timeLines.length !== 0) {
        timeLines = Parser.NodeAction.createTimeLinesVector(root, obj.timeLines.map((timeLine) => {
            return handleTimeline(root, timeLine);
        }));
    }
    Parser.NodeAction.startNodeAction(root);
    Parser.NodeAction.addDuration(root, obj.duration);
    Parser.NodeAction.addDuration(root, obj.speed);
    Parser.NodeAction.addCurrentAnimationName(root, current);
    return  Parser.NodeAction.endNodeAction(root);
};

module.exports = function (json, path) {
    var root = new Flatbuffers.Builder();
    var rootOffset = handleRoot(root, json);
    Parser.CSParseBinary.finishCSParseBinaryBuffer(root, rootOffset);
    Fs.writeFileSync(path, new Buffer(root.asUint8Array()));
};

