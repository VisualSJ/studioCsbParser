
const CSParseBinary = require('../CSParseBinary_generated').flatbuffers;

exports.parse = function ( flat ) {
    var json = {};
    json.path = flat.path();
    json.plistFile = flat.plistFile();
    json.resourceType = flat.resourceType();
    return json;
};

exports.compile = function ( root, json ) {
    var path = root.createString(json.path);
    var plistFile = root.createString(json.plistFile);
    var resourceType = root.createString(json.resourceType);
    CSParseBinary.ResourceData.startResourceData(root);
    CSParseBinary.ResourceData.addPath(root, path);
    CSParseBinary.ResourceData.addPlistFile(root, plistFile);
    CSParseBinary.ResourceData.addResourceType(root, resourceType);
    return CSParseBinary.ResourceData.endResourceData(root);
};