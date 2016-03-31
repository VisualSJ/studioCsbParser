'use strict';

const Fs = require('fs');
const Flatbuffers = require('./flatbuffers').flatbuffers;
const Parser = require('./CSParseBinary_generated').flatbuffers;

module.exports = function (path) {
    var file = Fs.readFileSync(path);
    var data = new Uint8Array(file);

    // 二进制数据
    var buffer = new Flatbuffers.ByteBuffer(data);
    var root = Parser.CSParseBinary.getRootAsCSParseBinary(buffer);

    return handleRoot(root);
};

var handleRoot = function (obj) {
    var result = {};
    result.version = obj.version();
    result.textures = [];
    for (let i=obj.texturesLength() - 1; i>=0; i--) {
        result.textures[i] = obj.textures(i);
    }
    result.texturePngs = [];
    for (let i=obj.texturePngsLength() - 1; i>=0; i--) {
        result.texturePngs[i] = obj.texturePngs(i);
    }
    result.nodeTree = handleNodeTree(obj.nodeTree());
    result.action = handleNodeAction(obj.action());
    result.animationList = [];
    for (let i=obj.animationListLength() - 1; i>=0; i--) {
        result.animationList[i] = obj.animationList(i);
    }
    return result;
};

var handleNodeTree = function (obj) {
    var result = {};
    result.classname = obj.classname();
    result.children = [];
    for (let i=obj.childrenLength() - 1; i>=0; i--) {
        result.children[i] = handleNodeTree(obj.children(i));
    }
    result.options = handleOptions(obj.options(), result.classname);
    result.customClassName = obj.customClassName();
    return result;
};

var handleOptions = function (obj, type) {
    var result = {};

    var define = op[type];
    if (!define) define = op['Node'];

    result.data = define.handle(obj.data(new define.ctor));
    return result;
};

var handleWidgetOptions = function (obj) {
    var result = {};
    result.name = obj.name();
    result.actionTag = obj.actionTag();
    result.rotationSkew = {
        rotationSkewX: obj.rotationSkew().rotationSkewX(),
        rotationSkewY: obj.rotationSkew().rotationSkewY()
    };
    result.zOrder = obj.zOrder();
    result.visible = obj.visible();
    result.alpha = obj.alpha();
    result.tag = obj.tag();
    result.position = handlePosition(obj.position());
    result.scale =handleScale(obj.scale());
    result.anchorPoint = handleAnchorPoint(obj.anchorPoint());
    result.color = handleColor(obj.color());
    result.size = handleFlatSize(obj.size());
    result.flipX = obj.flipX();
    result.flipY = obj.flipY();
    result.ignoreSize = obj.ignoreSize();
    result.touchEnabled = obj.touchEnabled();
    result.frameEvent = obj.frameEvent();
    result.customProperty = obj.customProperty();
    result.callBackType = obj.callBackType();
    result.callBackName = obj.callBackName();
    result.layoutComponent = handleLayoutComponentTable(obj.layoutComponent());
    return result;
};

var handleLayoutComponentTable = function (obj) {
    var result = {};
    result.positionXPercentEnabled = obj.positionXPercentEnabled();
    result.positionYPercentEnabled = obj.positionYPercentEnabled();
    result.positionXPercent = obj.positionXPercent();
    result.positionYPercent = obj.positionYPercent();
    result.sizeXPercentEnable = obj.sizeXPercentEnable();
    result.sizeYPercentEnable = obj.sizeYPercentEnable();
    result.sizeXPercent = obj.sizeXPercent();
    result.sizeYPercent = obj.sizeYPercent();
    result.stretchHorizontalEnabled = obj.stretchHorizontalEnabled();
    result.stretchVerticalEnabled = obj.stretchVerticalEnabled();
    result.horizontalEdge = obj.horizontalEdge();
    result.verticalEdge = obj.verticalEdge();
    result.leftMargin = obj.leftMargin();
    result.rightMargin = obj.rightMargin();
    result.topMargin = obj.topMargin();
    result.bottomMargin = obj.bottomMargin();
    return result;
};

var handleSingleNodeOptions = function (obj) {
    var result = {};
    result.nodeOptions = handleWidgetOptions(obj.nodeOptions());
    return result;
};

var handleSpriteOptions = function (obj) {
    var result = {};
    result.nodeOptions = handleWidgetOptions(obj.nodeOptions());
    result.fileNameData = handleResourceData(obj.fileNameData());
    result.blendFunc = handleBlendFunc(obj.blendFunc());
    return result;
};

var handleParticleSystemOptions = function (obj) {
    var result = {};
    result.nodeOptions = handleWidgetOptions(obj.nodeOptions());
    result.fileNameData = handleResourceData(obj.fileNameData());
    result.blendFunc = handleBlendFunc(obj.blendFunc());
    return result;
};

var handleGameMapOptions = function (obj) {
    var result = {};
    result.nodeOptions = handleWidgetOptions(obj.nodeOptions());
    result.fileNameData = handleResourceData(obj.fileNameData());
    return result;
};

var handleButtonOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());
    result.normalData = handleResourceData(obj.normalData());
    result.pressedData = handleResourceData(obj.pressedData());
    result.disabledData = handleResourceData(obj.disabledData());
    result.fontResource = handleResourceData(obj.fontResource());
    result.text = obj.text();

    result.fontName = obj.fontName();
    result.fontSize = obj.fontSize();
    result.textColor = handleColor(obj.textColor());
    result.capInsets = handleCapInsets(obj.capInsets());
    result.scale9Size = handleFlatSize(obj.scale9Size());
    result.scale9Enabled = obj.scale9Enabled();
    result.displaystate = obj.displaystate();

    result.outlineEnabled = obj.outlineEnabled();
    result.outlineColor = handleColor(obj.outlineColor());
    result.outlineSize = obj.outlineSize();
    result.shadowEnabled = obj.shadowEnabled();
    result.shadowColor = handleColor(obj.shadowColor());
    result.shadowOffsetX = obj.shadowOffsetX();
    result.shadowOffsetY = obj.shadowOffsetY();
    result.shadowBlurRadius = obj.shadowBlurRadius();
    result.isLocalized = obj.isLocalized();
    return result;
};

var handleCheckBoxOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());

    result.backGroundBoxData = handleResourceData(obj.backGroundBoxData());
    result.backGroundBoxSelectedData = handleResourceData(obj.backGroundBoxSelectedData());
    result.frontCrossData = handleResourceData(obj.frontCrossData());
    result.backGroundBoxDisabledData = handleResourceData(obj.backGroundBoxDisabledData());
    result.frontCrossDisabledData = handleResourceData(obj.frontCrossDisabledData());

    result.selectedState = obj.selectedState();
    result.displaystate = obj.displaystate();
    return result;
};

var handleImageViewOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());
    result.fileNameData = handleResourceData(obj.fileNameData());
    result.capInsets = handleCapInsets(obj.capInsets());
    result.scale9Size = handleFlatSize(obj.scale9Size());
    result.scale9Enabled = obj.scale9Enabled();
    return result;
};

var handleTextAtlasOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());
    result.charMapFileData = handleResourceData(obj.charMapFileData());
    result.stringValue = obj.stringValue();
    result.startCharMap = obj.startCharMap();
    result.itemWidth = obj.itemWidth();
    result.itemHeight = obj.itemHeight();
    return result;
};

var handleTextBMFontOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());
    result.fileNameData = handleResourceData(obj.fileNameData());
    result.text = obj.text();
    result.isLocalized = obj.isLocalized();
    return result;
};

var handleTextOptions = function (obj) {
    var result = {};
    result.widgetOptions = handleWidgetOptions(obj.widgetOptions());
    result.fontResource = handleResourceData(obj.fontResource());
    result.fontName = obj.fontName();
    result.fontSize = obj.fontSize();
    result.text = obj.text();
    result.areaWidth = obj.areaWidth();
    result.areaHeight = obj.areaHeight();
    result.hAlignment = obj.hAlignment();
    result.vAlignment = obj.vAlignment();
    result.touchScaleEnable = obj.touchScaleEnable();
    result.isCustomSize = obj.isCustomSize();
    result.outlineEnabled = obj.outlineEnabled();
    result.outlineColor = obj.outlineColor();
    result.outlineSize = obj.outlineSize();
    result.shadowEnabled = obj.shadowEnabled();
    result.shadowColor = obj.shadowColor();
    result.shadowOffsetX = obj.shadowOffsetX();
    result.shadowOffsetY = obj.shadowOffsetY();
    result.shadowBlurRadius = obj.shadowBlurRadius();
    result.isLocalized = obj.isLocalized();
    return result;
};

var handleTextFieldOptions = function () {

};

var handleLoadingBarOptions = function () {

};

var handleSliderOptions = function () {

};

var handlePanelOptions = function () {

};

var handleScrollViewOptions = function () {

};

var handlePageViewOptions = function () {

};

var handleListViewOptions = function () {

};

var handleProjectNodeOptions = function () {

};

var handleComponentOptions = function () {

};

var handleComAudioOptions = function () {

};

var handlePosition = function (obj) {
    var result = {};
    if (!obj) return result;
    result.x = obj.x();
    result.y = obj.y();
    return result;
};

var handleScale = function (obj) {
    var result = {};
    result.scaleX = obj.scaleX();
    result.scaleY = obj.scaleY();
    return result;
};

var handleAnchorPoint = function (obj) {
    var result = {};
    result.scaleX = obj.scaleX();
    result.scaleY = obj.scaleY();
    return result;
};

var handleColor = function (obj) {
    var result = {};
    result.a = obj.a();
    result.r = obj.r();
    result.g = obj.g();
    result.b = obj.b();
    return result;
};

var handleFlatSize = function (obj) {
    var result = {};
    result.width = obj.width();
    result.height = obj.height();
    return result;
};

var handleResourceData = function (obj) {
    var result = {};
    result.path = obj.path();
    result.plistFile = obj.plistFile();
    result.resourceType = obj.resourceType();
    return result;
};

var handleBlendFunc = function (obj) {
    var result = {};
    result.src = obj.src();
    result.dst = obj.dst();
    return result;
};

var handleCapInsets = function (obj) {
    var result = {};
    result.x = obj.x();
    result.y = obj.y();
    result.width = obj.width();
    result.height = obj.height();
    return result;
};

var op = {
    'Node': { handle: handleWidgetOptions, ctor: Parser.WidgetOptions },
    'Sprite': { handle: handleSpriteOptions, ctor: Parser.SpriteOptions },
    'Particle': { handle: handleParticleSystemOptions, ctor: Parser.ParticleSystemOptions },
    'TMXTiledMap': { handle: handleGameMapOptions, ctor: Parser.GameMapOptions },
    'Panel': { handle: handlePanelOptions, ctor: Parser.PanelOptions },
    'Button': { handle: handleButtonOptions, ctor: Parser.ButtonOptions },
    'CheckBox': { handle: handleCheckBoxOptions, ctor: Parser.CheckBoxOptions },
    'ImageView': { handle: handleImageViewOptions, ctor: Parser.ImageViewOptions },
    'TextAtlas': { handle: handleTextAtlasOptions, ctor: Parser.TextAtlasOptions },
    'LabelAtlas': { handle: handleSpriteOptions, ctor: Parser.SpriteOptions }
};

var handleNodeAction = function (obj) {
    var result = {};
    result.duration = obj.duration();
    result.speed = obj.speed();

    result.timeLines = [];
    for (let i=obj.timeLinesLength() - 1; i>=0; i--) {
        // todo timelines
        //result.timeLines[i] = obj.timeLines(i);
    }

    result.currentAnimationName = obj.currentAnimationName();
    return result;
};