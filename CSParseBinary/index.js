'use strict';

const Fs = require('fs');
const Flatbuffers = require('./flatbuffers').flatbuffers;
const Parser = require('./CSParseBinary_generated').flatbuffers;

const Root = require('./lib/Root');

exports.parse = function ( buffer ) {
    var flatBuffer = new Flatbuffers.ByteBuffer(buffer);
    var flat = Parser.CSParseBinary.getRootAsCSParseBinary(flatBuffer);
    return Root.parse(flat);
};

exports.compile = function ( json ) {
    var root = new Flatbuffers.Builder();
    var rootOffset = Root.compile(root, json);
    Parser.CSParseBinary.finishCSParseBinaryBuffer(root, rootOffset);
    return new Buffer(root.asUint8Array())
};