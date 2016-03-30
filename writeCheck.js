'use strict';

const Fs = require('fs');
const Flatbuffers = require('./flatbuffers').flatbuffers;
const Parser = require('./CSParseBinary_generated').flatbuffers;

var obj = {
    version: '2.1.0.0',
    textures: [],
    texturePngs: [],
    nodeTree: {
        classname: 'Node',
        children: [
            {
                classname: 'Node',
                children: [],
                options: {
                    data: {
                        name: 'Scene',
                        actionTag: 0,
                        rotationSkew: {
                            rotationSkewX: 0,
                            rotationSkewY: 0
                        },
                        zOrder: 0,
                        visible: true,
                        alpha: 255,
                        tag: 0,
                        position: {
                            x: 0,
                            y: 0
                        },
                        scale: {
                            scaleX: 1,
                            scaleY: 1
                        },
                        anchorPoint: {
                            scaleX: 0,
                            scaleY: 0
                        },
                        color: {
                            a: 255,
                            r: 255,
                            g: 255,
                            b: 255
                        },
                        size: {
                            width: 960,
                            height: 640
                        },
                        flipX: false,
                        flipY: false,
                        ignoreSize: false,
                        touchEnabled: false,
                        frameEvent: '',
                        customProperty: '',
                        callBackType: null,
                        callBackName: null,
                        layoutComponent: {
                            positionXPercentEnabled: false,
                            positionYPercentEnabled: false,
                            positionXPercent: 0,
                            positionYPercent: 0,
                            sizeXPercentEnable: false,
                            sizeYPercentEnable: false,
                            sizeXPercent: 0,
                            sizeYPercent: 0,
                            stretchHorizontalEnabled: false,
                            stretchVerticalEnabled: false,
                            horizontalEdge: '',
                            verticalEdge: '',
                            leftMargin: 0,
                            rightMargin: 0,
                            topMargin: 0,
                            bottomMargin: 0
                        }
                    }
                },
                customClassName: ''
            }
        ],
        options: {
            data: {
                name: 'Scene',
                actionTag: 0,
                rotationSkew: {
                    rotationSkewX: 0,
                    rotationSkewY: 0
                },
                zOrder: 0,
                visible: true,
                alpha: 255,
                tag: 0,
                position: {
                    x: 0,
                    y: 0
                },
                scale: {
                    scaleX: 1,
                    scaleY: 1
                },
                anchorPoint: {
                    scaleX: 0,
                    scaleY: 0
                },
                color: {
                    a: 255,
                    r: 255,
                    g: 255,
                    b: 255
                },
                size: {
                    width: 960,
                    height: 640
                },
                flipX: false,
                flipY: false,
                ignoreSize: false,
                touchEnabled: false,
                frameEvent: '',
                customProperty: '',
                callBackType: null,
                callBackName: null,
                layoutComponent: {
                    positionXPercentEnabled: false,
                    positionYPercentEnabled: false,
                    positionXPercent: 0,
                    positionYPercent: 0,
                    sizeXPercentEnable: false,
                    sizeYPercentEnable: false,
                    sizeXPercent: 0,
                    sizeYPercent: 0,
                    stretchHorizontalEnabled: false,
                    stretchVerticalEnabled: false,
                    horizontalEdge: '',
                    verticalEdge: '',
                    leftMargin: 0,
                    rightMargin: 0,
                    topMargin: 0,
                    bottomMargin: 0
                }
            }
        },
        customClassName: ''
    },
    action: {
        duration: 0,
        speed: 1,
        timelines: [],
        currentAnimationName: ''
    },
    animationList: []
};

var compile = (() => {

    var handleRoot = function (root, obj) {
        var version = root.createString(obj.version);
        var textures = 0;
        if (obj.textures && obj.textures.length !== 0) {
            textures = Parser.CSParseBinary.createTexturesVector(root, obj.textures.map((str) => {
                return root.createString(str);
            }));
        }
        var texturePngs = 0;
        if (obj.texturePngs && obj.texturePngs.length !== 0) {
            texturePngs = Parser.CSParseBinary.createTexturePngsVector(root, obj.texturePngs.map((str) => {
                return root.createString(str);
            }));
        }
        var nodeTree = handleNode(root, obj.nodeTree);
        var nodeAction = handleAction(root, obj.action);
        // todo animationList

        Parser.CSParseBinary.startCSParseBinary(root);
        Parser.CSParseBinary.addVersion(root, version);
        Parser.CSParseBinary.addTextures(root, textures);
        Parser.CSParseBinary.addTexturePngs(root, texturePngs);
        Parser.CSParseBinary.addNodeTree(root, nodeTree);
        Parser.CSParseBinary.addAction(root, nodeAction);
        return Parser.CSParseBinary.endCSParseBinary(root);
    };

    var handleNode = function (root, obj) {
        var classname = root.createString(obj.classname);
        var customClassName = root.createString(obj.customClassName);
        var children = 0;
        if (obj.children && obj.children.length !== 0) {
            children = Parser.CSParseBinary.createTexturePngsVector(root, obj.children.map((child) => {
                return handleNode(root, child);
            }));
        }
        var options = handleOptions(root, obj.options);

        Parser.NodeTree.startNodeTree(root);
        Parser.NodeTree.addClassname(root, classname);
        Parser.NodeTree.addCustomClassName(root, customClassName);
        Parser.NodeTree.addChildren(root, children);
        Parser.NodeTree.addOptions(root, options);
        return  Parser.NodeTree.endNodeTree(root);
    };

    var handleOptions = function (root, obj) {
        var data = handleData(root, obj.data);
        Parser.Options.startOptions(root);
            Parser.Options.addData(root, data);
        return Parser.Options.endOptions(root);
    };

    var handleData = function (root, obj) {
        var name = root.createString(obj.name);
        var actionTag = obj.actionTag - 0;
        var zOrder= obj.zOrder - 0;
        var visible = !!obj.visible;
        var alpha = obj.alpha;
        var tag = obj.tag;
        var flipX = !!obj.flipX;
        var flipY = !!obj.flipY;
        var ignoreSize = !!obj.ignoreSize;
        var touchEnabled = !!obj.touchEnabled;
        var frameEvent = root.createString(obj.frameEvent);
        var customProperty = root.createString(obj.customProperty);
        // todo callBackType and callBackName
        var layoutComponent = handleLayoutComponent(root, obj.layoutComponent);

        Parser.WidgetOptions.startWidgetOptions(root);
        Parser.WidgetOptions.addName(root, name);
        Parser.WidgetOptions.addActionTag(root, actionTag);
        Parser.WidgetOptions.addRotationSkew(root, Parser.RotationSkew.createRotationSkew(root, obj.rotationSkew.rotationSkewX, obj.rotationSkew.rotationSkewY));
        Parser.WidgetOptions.addZOrder(root, zOrder);
        Parser.WidgetOptions.addVisible(root, visible);
        Parser.WidgetOptions.addAlpha(root, alpha);
        Parser.WidgetOptions.addTag(root, tag);
        Parser.WidgetOptions.addPosition(root, Parser.Position.createPosition(root, obj.position.x, obj.position.y));
        Parser.WidgetOptions.addScale(root, Parser.Scale.createScale(root, obj.scale.scaleX, obj.scale.scaleY));
        Parser.WidgetOptions.addAnchorPoint(root, Parser.AnchorPoint.createAnchorPoint(root, obj.anchorPoint.scaleX, obj.anchorPoint.scaleY));
        Parser.WidgetOptions.addColor(root, Parser.Color.createColor(root, obj.color.a, obj.color.r, obj.color.g, obj.color.b));
        Parser.WidgetOptions.addSize(root, Parser.FlatSize.createFlatSize(root, obj.size.width, obj.size.height));
        Parser.WidgetOptions.addFlipX(root, flipX);
        Parser.WidgetOptions.addFlipY(root, flipY);
        Parser.WidgetOptions.addIgnoreSize(root, ignoreSize);
        Parser.WidgetOptions.addTouchEnabled(root, touchEnabled);
        Parser.WidgetOptions.addFrameEvent(root, frameEvent);
        Parser.WidgetOptions.addCustomProperty(root, customProperty);
        Parser.WidgetOptions.addLayoutComponent(root, layoutComponent);
        return Parser.WidgetOptions.endWidgetOptions(root);
    };

    var handleLayoutComponent = function (root, obj) {
        var horizontalEdge = root.createString(obj.horizontalEdge);
        var verticalEdge = root.createString(obj.verticalEdge);
        Parser.LayoutComponentTable.startLayoutComponentTable(root);
        Parser.LayoutComponentTable.addPositionXPercentEnabled(root, !!obj.positionXPercentEnabled);
        Parser.LayoutComponentTable.addPositionYPercentEnabled(root, !!obj.positionYPercentEnabled);
        Parser.LayoutComponentTable.addPositionXPercent(root, obj.positionXPercent - 0);
        Parser.LayoutComponentTable.addPositionYPercent(root, obj.positionYPercent - 0);
        Parser.LayoutComponentTable.addSizeXPercentEnable(root, !!obj.sizeXPercentEnable);
        Parser.LayoutComponentTable.addSizeYPercentEnable(root, !!obj.sizeYPercentEnable);
        Parser.LayoutComponentTable.addSizeXPercent(root, obj.sizeXPercent - 0);
        Parser.LayoutComponentTable.addSizeYPercent(root, obj.sizeYPercent - 0);
        Parser.LayoutComponentTable.addStretchHorizontalEnabled(root, !!obj.stretchHorizontalEnabled);
        Parser.LayoutComponentTable.addStretchVerticalEnabled(root, !!obj.stretchVerticalEnabled);
        Parser.LayoutComponentTable.addHorizontalEdge(root, horizontalEdge);
        Parser.LayoutComponentTable.addVerticalEdge(root, verticalEdge);
        Parser.LayoutComponentTable.addLeftMargin(root, obj.leftMargin - 0);
        Parser.LayoutComponentTable.addRightMargin(root, obj.rightMargin - 0);
        Parser.LayoutComponentTable.addTopMargin(root, obj.topMargin - 0);
        Parser.LayoutComponentTable.addBottomMargin(root, obj.bottomMargin - 0);
        return Parser.LayoutComponentTable.endLayoutComponentTable(root);
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

    var handleTimeline = function (root, obj) {
        // todo
        return 0;
    };

    return function (obj) {
        var root = new Flatbuffers.Builder();
        var rootOffset = handleRoot(root, obj);
        Parser.CSParseBinary.finishCSParseBinaryBuffer(root, rootOffset);
        return root;
    };

})();

var data = compile(obj);
Fs.writeFileSync('./res/test.csb', new Buffer(data.asUint8Array()));