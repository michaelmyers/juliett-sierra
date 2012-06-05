/**
 * User: Michael
 * Date: 5/20/12
 * Time: 11:32 PM
 */

/*global PlayerEntity: false, left: false, up:false, down:false, right:false */


var robot = {};

robot.directions = ['left', 'right', 'up', 'down'];

robot.move = function (direction, millisecs) {
    'use strict';
    if (robot.directions.indexOf(direction) === -1) {
        alert('Bad direction');

    }
    robot.stop();

    switch (direction) {

    case 'left':
        setTimeout('left = true;', millisecs);
        break;
    case 'right':
        setTimeout('right = true;',millisecs);
    }

    setTimeout()



};

robot.stop = function () {
    'use strict';
    left = false;
    right = false;
    up = false;
    down = false;
};








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


