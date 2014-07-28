module.exports = Security;
function Security() {
    this._securityFailure = false;

    this._x_max_upper    = 1;
    this._x_max_lower    = -1;
    this._y_max_upper    = 1;
    this._y_max_lower    = -1;
    this._z_max_upper    = 1;
    this._z_max_lower    = 0;
}

/**
 * Checks if the given coordinates are in allowed ranges
 *
 * @param coordinates  {x, y, z, yaw}
 * @return boolean     if in allowed range, else false
 */
Security.prototype.check = function (coordinates) {

    if(this._securityFailure){
        return false;
    }

    if (this._x_max_upper >= coordinates.x && this._x_max_lower <= coordinates.x &&
        this._y_max_upper >= coordinates.y && this._y_max_lower <= coordinates.y &&
        this._z_max_upper >= coordinates.z && this._z_max_lower <= coordinates.z) {

        return true;
    }

    this._securityFailure = true;

    return false;
};

/**
 * Resets the coordinate system
 *
 * @param state of the drone {x, y, z, yaw}
 */
Security.prototype.reset = function (state) {
    this._x_max_upper = this._x_max_upper - state.x;
    this._x_max_lower = this._x_max_lower - state.x;

    this._y_max_upper = this._y_max_upper - state.y;
    this._y_max_lower = this._y_max_lower - state.y;

    this._z_max_upper = this._z_max_upper - state.z;
};