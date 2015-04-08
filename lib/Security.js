module.exports = Security;
function Security() {
    this._x_max_forward = 3;        // forward
    this._x_max_backward = 1.5;     // backward
    this._y_max_left = 1.5;         // left
    this._y_max_right = 3;          // right
    this._z_max_up = 2;             // up
    this._z_max_down = 0.5;         // down
}

Security.prototype.getSecurityBoxErrors = function (goal) {

    var errors = [];

    if (goal.x) {
        if (this._x_max_forward >= goal.x) {
            errors.push({
                goal: goal.x,
                maximum: this._x_max_forward,
                direction: 'forward'
            });
        }

        if (-this._x_max_backward <= goal.x) {
            errors.push({
                goal: goal.x,
                maximum: -this._x_max_backward,
                direction: 'backward'
            });
        }
    }

    if (goal.y) {
        if (-this._y_max_left <= goal.y) {
            errors.push({
                goal: goal.y,
                maximum: -this._y_max_left,
                direction: 'left'
            });
        }

        if (this._y_max_right >= goal.y) {
            errors.push({
                goal: goal.y,
                maximum: this._y_max_right,
                direction: 'right'
            });
        }
    }

    if (goal.z) {
        if (this._z_max_up >= goal.z) {
            errors.push({
                goal: goal.z,
                maximum: this._z_max_up,
                direction: 'up'
            });
        }

        if (this._z_max_down <= goal.z) {
            errors.push({
                goal: goal.z,
                maximum: this._z_max_down,
                direction: 'down'
            });
        }
    }

    return errors;
};

/**
 * Resets the coordinate system
 *
 * @param state of the drone {x, y, z, yaw}
 */
Security.prototype.reset = function (state) {
    this._x_max_forward = this._x_max_forward - state.x;
    this._x_max_backward = -this._x_max_backward - state.x;

    this._y_max_left = -this._y_max_left - state.y;
    this._y_max_right = this._y_max_right - state.y;
};