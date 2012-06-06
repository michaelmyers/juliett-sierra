/**
 * User: Michael
 * Date: 5/20/12
 * Time: 11:32 PM
 */

/*global PlayerEntity: false, left: true, up:true, down:true, right:true,
             curYPos: false, curXPos: false */


var robot = {
    active : false
};

robot.directions = ['left', 'right', 'up', 'down'];



robot.move = function (direction, millisecs) {
    'use strict';
    if (robot.directions.indexOf(direction) === -1) {
        alert('Bad direction');
    }
    robot.active = true;

    switch (direction) {
    case 'left':
        left = true;
        break;
    case 'right':
        right = true;
        break;
    case 'up':
        up = true;
        break;
    case 'down':
        down = true;
        break;
    }
    setTimeout(function () {
        robot.stop();
    }, millisecs);
};

robot.stop = function () {
    'use strict';
    left = false;
    right = false;
    up = false;
    down = false;
    robot.active = false;
};

robot.getCurrentXPos = function () {
    "use strict";
    return curXPos;

};

robot.getCurrentYPos = function () {
    "use strict";
    return curYPos;
};

robot.moveUnit = function (direction, units) {
    "use strict";
    var x, y;
    x = robot.getCurrentXPos();
    y = robot.getCurrentYPos();


}

/*var robot = {
    direction: null,
    distance: 1,

    directions: {north: 1, west: 2, south: 3, east: 4},

    init: function () {
        "use strict";
        this.direction = this.directions.north;
        this.direction = this.directions.west;
        this.direction = this.directions.south;
        this.direction = this.directions.east;
    },

    move: function (dist, dir) {
        "use strict";
        this.distance = dist;
        this.direction = dir;
    },

    getX: function () {
        "use strict";
        return PlayerEntity.pos.x;
    },

    getY: function () {
        "use strict";
        return PlayerEntity.getY();
    }
};  */


