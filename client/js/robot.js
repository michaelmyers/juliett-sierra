/**
 * User: Michael
 * Date: 5/20/12
 * Time: 11:32 PM
 */

/*global PlayerEntity: false, left: true, up:true, down:true, right:true,
             curYPos: false, curXPos: false */


var RobotPosition = function () {
    "use strict";

    this.x = null;
    this.y = null;
};


var robot = {
    active : false
};

robot.directions = ['left', 'right', 'up', 'down', 'downleft', 'downright', 'upleft', 'upright'];

robot.setDirection = function (direction) {
    "use strict";
    if (robot.directions.indexOf(direction) === -1) {
        alert('Bad direction');
        return false;
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
    case 'downleft':
        down = true;
        left = true;
        break;
    case 'downright':
        down = true;
        right = true;
        break;
    case 'upleft':
        up = true;
        left = true;
        break;
    case 'upright':
        up = true;
        right = true;
        break;
    }
    return true;

};

robot.move = function (direction, millisecs) {
    'use strict';

    if (!robot.setDirection(direction)) {
        console.log('Bad direction');
        return false;
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

robot.getCurrentPos = function () {
    "use strict";
    var curPos = new RobotPosition();
    curPos.x = curXPos;
    curPos.y = curYPos;

    return curPos;
};

robot.distanceTo = function (newPos) {
    "use strict";
    var curPos;
    curPos = robot.getCurrentPos();
    console.log('curX: ' + curPos.x + ' curY: ' + curPos.y);

    return Math.sqrt(Math.pow((curPos.x - newPos.x), 2) + Math.pow((curPos.y - newPos.y), 2));
};

robot.moveTo = function (newPos) {
    "use strict";
    var curPos;
    curPos = robot.getCurrentPos();

    if (newPos.y < curPos.y) {

    }



};

robot.moveUnit = function (direction, units) {
    "use strict";
    var x, y, curPos;
    curPos = new RobotPosition();


};




