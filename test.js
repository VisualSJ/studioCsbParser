

const Parser = require('./parser');
const Writer = require('./writer');

//var obj = Parser('./res/MainScene.csb');
var obj = Parser('./test.csb');

console.log(obj.nodeTree.options.data);

//Writer(obj, 'test.csb');