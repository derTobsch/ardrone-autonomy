module.exports = Security;
function Security() {
    this._x_max_forward     = 3;    // forward
    this._x_max_backward    = -1.5;   // backward
    this._y_max_left        = -1.5;   // left
    this._y_max_right       = 3;    // right
    this._z_max_up          = 2;    // up
    this._z_max_down        = 0.5;    // down
}

/**
 * Checks if the given coordinates are in allowed ranges
 *
 * @param coordinates  {x, y, z, yaw}
 * @return boolean     true if in allowed range, else false
 */
Security.prototype.check = function (coordinates) {

    var isSecure = true;

    if (coordinates.x) {
        isSecure &= this._x_max_forward >= coordinates.x && this._x_max_backward <= coordinates.x;
    }
    if (coordinates.y) {
        isSecure &= this._y_max_left <= coordinates.y && this._y_max_right >= coordinates.y;
    }
    if (coordinates.z) {
        isSecure &= this._z_max_up >= coordinates.z && this._z_max_down <= coordinates.z;
    }

    return isSecure;
};

/**
 * Resets the coordinate system
 *
 * @param state of the drone {x, y, z, yaw}
 */
Security.prototype.reset = function (state) {
    this._x_max_forward = this._x_max_forward - state.x;
    this._x_max_backward = this._x_max_backward - state.x;

    this._y_max_left = this._y_max_left - state.y;
    this._y_max_right = this._y_max_right - state.y;
};

/**
 * Returns the actual security box
 *
 * @returns {{x_max_forward: number, x_max_backward: (number|*), y_max_left: (number|*), y_max_right: number, z_max_up: number, z_max_down: number}}
 */
Security.prototype.getSecurityBox = function () {
    return {
        x_max_forward: this._x_max_forward,
        x_max_backward: this._x_max_backward,
        y_max_left: this._y_max_left,
        y_max_right: this._y_max_right,
        z_max_up: this._z_max_up,
        z_max_down: this._z_max_down
    };
};