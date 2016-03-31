'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const LayoutComponentTable = require('./LayoutComponentTable');

exports.ctor = CSParseBinary.WidgetOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.name = flat.name();
    json.actionTag = flat.actionTag();
    json.rotationSkew = Utils.parseRotationSkew(flat.rotationSkew());
    json.zOrder = flat.zOrder();
    json.visible = flat.visible();
    json.alpha = flat.alpha();
    json.tag = flat.tag();
    json.position = Utils.parsePosition(flat.position());
    json.scale = Utils.parseScale(flat.scale());
    json.anchorPoint = Utils.parseAnchorPoint(flat.anchorPoint());
    json.color = Utils.parseColor(flat.color());
    json.size = Utils.parseFlatSize(flat.size());
    json.flipX = flat.flipX();
    json.flipY = flat.flipY();
    json.ignoreSize = flat.ignoreSize();
    json.touchEnabled = flat.touchEnabled();
    json.frameEvent = flat.frameEvent();
    json.customProperty = flat.customProperty();
    json.callBackType = flat.callBackType();
    json.callBackName = flat.callBackName();
    json.layoutComponent = LayoutComponentTable.parse(flat.layoutComponent());
    return json;
};

exports.compile = function ( root, json ) {

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
    var layoutComponent = LayoutComponentTable.compile(root, json.layoutComponent);

    CSParseBinary.WidgetOptions.startWidgetOptions(root);
    CSParseBinary.WidgetOptions.addName(root, name);
    CSParseBinary.WidgetOptions.addActionTag(root, actionTag);
    CSParseBinary.WidgetOptions.addRotationSkew(root, CSParseBinary.RotationSkew.createRotationSkew(root, json.rotationSkew.rotationSkewX, json.rotationSkew.rotationSkewY));
    CSParseBinary.WidgetOptions.addZOrder(root, zOrder);
    CSParseBinary.WidgetOptions.addVisible(root, visible);
    CSParseBinary.WidgetOptions.addAlpha(root, alpha);
    CSParseBinary.WidgetOptions.addTag(root, tag);
    CSParseBinary.WidgetOptions.addPosition(root, CSParseBinary.Position.createPosition(root, json.position.x, json.position.y));
    CSParseBinary.WidgetOptions.addScale(root, CSParseBinary.Scale.createScale(root, json.scale.scaleX, json.scale.scaleY));
    CSParseBinary.WidgetOptions.addAnchorPoint(root, CSParseBinary.AnchorPoint.createAnchorPoint(root, json.anchorPoint.scaleX, json.anchorPoint.scaleY));
    CSParseBinary.WidgetOptions.addColor(root, CSParseBinary.Color.createColor(root, json.color.a, json.color.r, json.color.g, json.color.b));
    CSParseBinary.WidgetOptions.addSize(root, CSParseBinary.FlatSize.createFlatSize(root, json.size.width, json.size.height));
    CSParseBinary.WidgetOptions.addFlipX(root, flipX);
    CSParseBinary.WidgetOptions.addFlipY(root, flipY);
    CSParseBinary.WidgetOptions.addIgnoreSize(root, ignoreSize);
    CSParseBinary.WidgetOptions.addTouchEnabled(root, touchEnabled);
    CSParseBinary.WidgetOptions.addFrameEvent(root, frameEvent);
    CSParseBinary.WidgetOptions.addCustomProperty(root, customProperty);
    CSParseBinary.WidgetOptions.addLayoutComponent(root, layoutComponent);
    return CSParseBinary.WidgetOptions.endWidgetOptions(root);
};