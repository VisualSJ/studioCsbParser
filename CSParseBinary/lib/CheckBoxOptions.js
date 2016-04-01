'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;
const Utils = require('./Utils');
const WidgetOptions = require('./WidgetOptions');
const ResourceData = require('./ResourceData');

exports.ctor = CSParseBinary.CheckBoxOptions;

exports.parse = function ( flat ) {
    var json = {};
    json.widgetOptions = WidgetOptions.parse(flat.widgetOptions());
    json.backGroundBoxData = ResourceData.parse(flat.backGroundBoxData());
    json.frontCrossData = ResourceData.parse(flat.frontCrossData());
    json.backGroundBoxDisabledData = ResourceData.parse(flat.backGroundBoxDisabledData());
    json.frontCrossDisabledData = ResourceData.parse(flat.frontCrossDisabledData());
    json.selectedState = flat.selectedState();
    json.displaystate = flat.displaystate();
    return json;
};

exports.compile = function ( root, json ) {
    var widgetOptions = WidgetOptions.compile(root, json.widgetOptions);
    var backGroundBoxData = ResourceData.compile(root, json.backGroundBoxData);
    var frontCrossData = ResourceData.compile(root, json.frontCrossData);
    var backGroundBoxDisabledData = ResourceData.compile(root, json.backGroundBoxDisabledData);
    var frontCrossDisabledData = ResourceData.compile(root, json.frontCrossDisabledData);
    CSParseBinary.CheckBoxOptions.startCheckBoxOptions(root);
    CSParseBinary.CheckBoxOptions.addWidgetOptions(root, widgetOptions);
    CSParseBinary.CheckBoxOptions.addBackGroundBoxData(root, backGroundBoxData);
    CSParseBinary.CheckBoxOptions.addFrontCrossData(root, frontCrossData);
    CSParseBinary.CheckBoxOptions.addBackGroundBoxDisabledData(root, backGroundBoxDisabledData);
    CSParseBinary.CheckBoxOptions.addFrontCrossDisabledData(root, frontCrossDisabledData);
    CSParseBinary.CheckBoxOptions.addSelectedState(json.selectedState);
    CSParseBinary.CheckBoxOptions.addDisplaystate(json.displaystate);
    return CSParseBinary.CheckBoxOptions.endCheckBoxOptions(root);
};