'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const WidgetOptions = require('./WidgetOptions');
const ResourceData = require('./ResourceData');

exports.ctor = CSParseBinary.ButtonOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.widgetOptions = WidgetOptions.parse(flat.widgetOptions());

    json.normalData = ResourceData.parse(flat.normalData());
    json.pressedData = ResourceData.parse(flat.pressedData());
    json.disabledData = ResourceData.parse(flat.disabledData());
    json.fontResource = ResourceData.parse(flat.fontResource());
    json.text = flat.text();

    json.fontName = flat.fontName();
    json.fontSize = flat.fontSize();
    json.textColor = Utils.parseColor(flat.textColor());
    json.capInsets = Utils.parseCapInsets(flat.capInsets());
    json.scale9Size = Utils.parseFlatSize(flat.scale9Size());
    json.scale9Enabled = flat.scale9Enabled();
    json.displaystate = flat.displaystate();

    json.outlineEnabled = flat.outlineEnabled();
    json.outlineColor = Utils.parseColor(flat.outlineColor());
    json.outlineSize = flat.outlineSize();
    json.shadowEnabled = flat.shadowEnabled();
    json.shadowColor = Utils.parseColor(flat.shadowColor());
    json.shadowOffsetX = flat.shadowOffsetX();
    json.shadowOffsetY = flat.shadowOffsetY();
    json.shadowBlurRadius = flat.shadowBlurRadius();
    json.isLocalized = flat.isLocalized();

    return json;
};

exports.compile = function ( root, json ) {
    var widgetOptions = WidgetOptions.compile(root, json.widgetOptions);

    var normalData = ResourceData.compile(root, json.normalData);
    var pressedData = ResourceData.compile(root, json.pressedData);
    var disabledData = ResourceData.compile(root, json.disabledData);
    var fontResource = ResourceData.compile(root, json.fontResource);
    var text = root.createString(json.text);

    var fontName = json.fontName;
    var fontSize = json.fontSize - 0;
    // textColor
    // capInsets
    // scale9Size
    var scale9Enabled = json.scale9Enabled;
    var displaystate = json.displaystate;

    var outlineEnabled = json.outlineEnabled;
    // outlineColor
    var outlineSize = json.outlineSize;
    var shadowEnabled = json.shadowEnabled;
    // shadowColor
    var shadowOffsetX = json.shadowOffsetX;
    var shadowOffsetY = json.shadowOffsetY;
    var shadowBlurRadius = json.shadowBlurRadius;
    var isLocalized = json.isLocalized;

    CSParseBinary.ButtonOptions.startButtonOptions(root);
    CSParseBinary.ButtonOptions.addWidgetOptions(root, widgetOptions);

    CSParseBinary.ButtonOptions.addNormalData(root, normalData);
    CSParseBinary.ButtonOptions.addPressedData(root, pressedData);
    CSParseBinary.ButtonOptions.addDisabledData(root, disabledData);
    CSParseBinary.ButtonOptions.addFontResource(root, fontResource);
    CSParseBinary.ButtonOptions.addText(root, text);

    CSParseBinary.ButtonOptions.addFontName(root, fontName);
    CSParseBinary.ButtonOptions.addFontSize(root, fontSize);
    CSParseBinary.ButtonOptions.addCapInsets(root, CSParseBinary.Color.createColor(root, json.color.a, json.color.r, json.color.g, json.color.b));
    CSParseBinary.ButtonOptions.addCapInsets(root, CSParseBinary.CapInsets.createCapInsets(root, json.capInsets.x, json.capInsets.y, json.capInsets.width, json.capInsets.height));
    CSParseBinary.ButtonOptions.addScale9Size(root, CSParseBinary.FlatSize.createFlatSize(root, json.scale9Size.width, json.scale9Size.height));
    CSParseBinary.ButtonOptions.addScale9Enabled(root, scale9Enabled);
    CSParseBinary.ButtonOptions.addDisplaystate(root, displaystate);

    CSParseBinary.ButtonOptions.addOutlineEnabled(root, outlineEnabled);
    CSParseBinary.ButtonOptions.addOutlineColor(root, CSParseBinary.Color.createColor(root, json.outlineColor.a, json.outlineColor.r, json.outlineColor.g, json.outlineColor.b));
    CSParseBinary.ButtonOptions.addOutlineSize(root, outlineSize);
    CSParseBinary.ButtonOptions.addShadowEnabled(root, shadowEnabled);
    CSParseBinary.ButtonOptions.addShadowColor(root, CSParseBinary.Color.createColor(root, json.shadowColor.a, json.shadowColor.r, json.shadowColor.g, json.shadowColor.b));
    CSParseBinary.ButtonOptions.addShadowOffsetX(root, shadowOffsetX);
    CSParseBinary.ButtonOptions.addShadowOffsetY(root, shadowOffsetY);
    CSParseBinary.ButtonOptions.addShadowBlurRadius(root, shadowBlurRadius);
    CSParseBinary.ButtonOptions.addIsLocalized(root, isLocalized);
    return CSParseBinary.ButtonOptions.endButtonOptions(root);
};