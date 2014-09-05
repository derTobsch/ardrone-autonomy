var autonomy = exports;
var ardrone = require('ar-drone');

exports.EKF = require('./lib/EKF');
exports.Camera = require('./lib/Camera');
exports.Controller = require('./lib/Controller');
exports.Mission = require('./lib/Mission');
exports.Security = require('./lib/Security');

exports.control = function (client, options) {
    return new autonomy.Controller(client, options);
};

exports.createMission = function (options) {
    var client = ardrone.createClient(options);
    var security = new autonomy.Security();
    var control = new autonomy.Controller(client, security, options);

    return new autonomy.Mission(client, control, security, options);
};