'use strict';

const Fs = require('fs');
const flatbuffers = require('./flatbuffers').flatbuffers;
const Parser = require('./CSParseBinary_generated').flatbuffers;

////////////////
// 把所有数据都翻译成 object
///////////////

var parseCsb = (() => {

    var exs = ['__init', 'childrenLength', 'texturesLength', 'texturePngsLength', 'timeLinesLength', 'animationListLength'];

    var parseObject = function (bb) {
        var type = typeof bb;
        if (type !== 'object' || !bb) return bb;
        var result = {};

        var proto = bb.constructor.prototype;
        var handles = Object.keys(proto);
        handles.forEach((func) => {
            if (exs.indexOf(func) !== -1) return;
            if (bb[func+'Length']) {
                let arr = result[func] = [];
                let length = bb[func + 'Length']();
                for (let i=0; i<length; i++) {
                    arr.push(parseObject(bb[func](i)));
                }
            } else {
                result[func] = parseObject(bb[func]());
            }
        });

        return result;
    };

    return function (path) {

        var file = Fs.readFileSync(path);
        var data = new Uint8Array(file);

        // 二进制数据
        var bb = new flatbuffers.ByteBuffer(data);
        // 将数据转成指定格式
        var root = Parser.CSParseBinary.getRootAsCSParseBinary(bb);

        var options = root.nodeTree().children(0).options().data(new Parser.SpriteOptions);
        return options.fileNameData().path();

        return parseObject(root);
    }
})();

var obj = parseCsb('./res/MainScene.csb');
//var obj = parseCsb('./res/test.csb');

console.log(obj);