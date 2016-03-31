'use strict';

const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;

exports.parse = function ( flat ) {
    var json = {};
    if (!flat) return;
    json.positionXPercentEnabled = flat.positionXPercentEnabled();
    json.positionYPercentEnabled = flat.positionYPercentEnabled();
    json.positionXPercent = flat.positionXPercent();
    json.positionYPercent = flat.positionYPercent();
    json.sizeXPercentEnable = flat.sizeXPercentEnable();
    json.sizeYPercentEnable = flat.sizeYPercentEnable();
    json.sizeXPercent = flat.sizeXPercent();
    json.sizeYPercent = flat.sizeYPercent();
    json.stretchHorizontalEnabled = flat.stretchHorizontalEnabled();
    json.stretchVerticalEnabled = flat.stretchVerticalEnabled();
    json.horizontalEdge = flat.horizontalEdge();
    json.verticalEdge = flat.verticalEdge();
    json.leftMargin = flat.leftMargin();
    json.rightMargin = flat.rightMargin();
    json.topMargin = flat.topMargin();
    json.bottomMargin = flat.bottomMargin();
    return json;
};

exports.compile = function ( root, json ) {
    var horizontalEdge = root.createString(json.horizontalEdge || '');
    var verticalEdge = root.createString(json.verticalEdge || '');
    CSParseBinary.LayoutComponentTable.startLayoutComponentTable(root);
    CSParseBinary.LayoutComponentTable.addPositionXPercentEnabled(root, !!json.positionXPercentEnabled);
    CSParseBinary.LayoutComponentTable.addPositionYPercentEnabled(root, !!json.positionYPercentEnabled);
    CSParseBinary.LayoutComponentTable.addPositionXPercent(root, json.positionXPercent - 0);
    CSParseBinary.LayoutComponentTable.addPositionYPercent(root, json.positionYPercent - 0);
    CSParseBinary.LayoutComponentTable.addSizeXPercentEnable(root, !!json.sizeXPercentEnable);
    CSParseBinary.LayoutComponentTable.addSizeYPercentEnable(root, !!json.sizeYPercentEnable);
    CSParseBinary.LayoutComponentTable.addSizeXPercent(root, json.sizeXPercent - 0);
    CSParseBinary.LayoutComponentTable.addSizeYPercent(root, json.sizeYPercent - 0);
    CSParseBinary.LayoutComponentTable.addStretchHorizontalEnabled(root, !!json.stretchHorizontalEnabled);
    CSParseBinary.LayoutComponentTable.addStretchVerticalEnabled(root, !!json.stretchVerticalEnabled);
    CSParseBinary.LayoutComponentTable.addHorizontalEdge(root, horizontalEdge);
    CSParseBinary.LayoutComponentTable.addVerticalEdge(root, verticalEdge);
    CSParseBinary.LayoutComponentTable.addLeftMargin(root, json.leftMargin - 0);
    CSParseBinary.LayoutComponentTable.addRightMargin(root, json.rightMargin - 0);
    CSParseBinary.LayoutComponentTable.addTopMargin(root, json.topMargin - 0);
    CSParseBinary.LayoutComponentTable.addBottomMargin(root, json.bottomMargin - 0);
    return CSParseBinary.LayoutComponentTable.endLayoutComponentTable(root);
};