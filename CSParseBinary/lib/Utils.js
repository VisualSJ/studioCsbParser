exports.parseArray = function ( buffer, name, callback ) {
    var arr = [];
    var lengthName = name+'Length';
    if (!buffer[name] || !buffer[lengthName]) return arr;

    if (!callback) {
        callback = function ( flat ) { return flat; };
    }

    for (var i=buffer[lengthName]() - 1; i>=0; i--) {
        arr[i] = callback(buffer[name](i));
    }
    return arr;
};

exports.parseRotationSkew = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.rotationSkewX = flat.rotationSkewX();
    json.rotationSkewY = flat.rotationSkewY();
    return json;
};

exports.parsePosition = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.x = flat.x();
    json.y = flat.y();
    return json;
};

exports.parseScale = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.scaleX = flat.scaleX();
    json.scaleY = flat.scaleY();
    return json;
};

exports.parseAnchorPoint = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.scaleX = flat.scaleX();
    json.scaleY = flat.scaleY();
    return json;
};

exports.parseColor = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.a = flat.a();
    json.r = flat.r();
    json.g = flat.g();
    json.b = flat.b();
    return json;
};

exports.parseFlatSize = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.width = flat.width();
    json.height = flat.height();
    return json;
};

exports.parseBlendFunc = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.src = flat.src();
    json.dst = flat.dst();
    return json;
};

exports.parseCapInsets = function ( flat ) {
    var json = {};
    if (!flat) return json;
    json.x = flat.x();
    json.y = flat.y();
    json.width = flat.width();
    json.height = flat.height();
    return json;
};