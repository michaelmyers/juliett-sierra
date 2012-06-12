/**
 * User: Michael
 * Date: 5/20/12
 * Time: 11:32 PM
 */

/*global PlayerEntity: false, left: true, up:true, down:true, right:true,
 curYPos: false, curXPos: false, now: false */


var RobotPosition = function (conX, conY) {
    "use strict";
    if (conX !== null) {
        this.x = conX;
    } else {
        this.x = null;
    }
    if (conY !== null) {
        this.y = conY;
    } else {
        this.y = null;
    }

};

RobotPosition.prototype.computeDifferenceX = function (pos) {
    'use strict';
    return Math.abs(this.x - pos.x);

};

RobotPosition.prototype.computeDifferencY = function (pos) {
    'use strict';
    return Math.abs(this.y - pos.y);
};


var robot = {
    active:false,
    currentPosition:new RobotPosition(), //not sure if this will be useful yet
    destinationPosition:new RobotPosition(),
    serverCommsReady:false,
    debugServer:false,


    init:function () {
        'use strict';

        setInterval(function () {
            robot.movementManager();
        }, 200);
        /*setInterval(function () {
            robot.positionUpdate();
        }, 500); */

    },

    debug:function (statement) {
        'use strict';

        if (this.debugServer === true) {
            now.logStuff(statement);
        } else {
            console.log(statement);
        }

    },

    positionUpdate:function () {
        'use strict';
        this.debug('Cur X: ' + this.currentPosition.x);
        this.debug('Cur Y: ' + this.currentPosition.y);

    },

    movementManager:function () {
        "use strict";
        var curPos, difX, difY;

        curPos = robot.getCurrentPos();

        //get the different initially without abs val to determine direction
        difX = this.destinationPosition.x - curPos.x;
        difY = this.destinationPosition.y - curPos.y;

        this.debug("DifX : " + difX);
        this.debug("DifY : " + difY);

        if (difX > 0) { //if difference between points is positive
            robot.setDirection('right');
        } else if (difX < 0) {
            robot.setDirection('left');
        } else {
            robot.stopHorizontal();
        }

        if (difY > 0) {
            robot.setDirection('down');
        } else if (difY < 0) {
            robot.setDirection('up');
        } else {
            robot.stopVertical();
        }

        //reusing variables to home in on the position

        //difX = robot.currentPosition.computeDifferenceX(newPos);
        //difX = robot.currentPosition.computeDifferenceX(newPos);

        //you cannot do this kind of loop in JS, it takes control of the single thread and kills the script
        /*while (difX !== 0 && difY !== 0) {
         if (difX === 0 || difX < 0) {
         robot.stopHorizontal();

         }
         if (difY === 0 || difY < 0) {
         robot.stopVertical();
         }

         difX = robot.currentPosition.computeDifferenceX(newPos);
         difX = robot.currentPosition.computeDifferenceX(newPos);
         //console.log('difX: ' + difX + ' difY: ' + difY);
         }  */

    }
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
        robot.debug('Bad direction');
        return false;
    }

    setTimeout(function () {
        robot.stopAll();
    }, millisecs);
};

robot.stopAll = function () {
    'use strict';
    left = false;
    right = false;
    up = false;
    down = false;
    robot.active = false;
};

robot.stopDirection = function (direction) {
    "use strict";
    if (!robot.setDirection(direction)) {
        robot.debug('Bad directions');
        return false;
    }
    switch (direction) {
        case 'left':
            left = false;
            break;
        case 'right':
            right = false;
            break;
        case 'up':
            up = false;
            break;
        case 'down':
            down = false;
            break;
    }
    return true;
};

robot.stopHorizontal = function () {
    'use strict';
    return robot.stopDirection('left') && robot.stopDirection('right');
};

robot.stopVertical = function () {
    'use strict';
    return robot.stopDirection('up') && robot.stopDirection('down');
};

robot.getCurrentPos = function () {
    "use strict";

    var curPos = new RobotPosition();
    curPos.x = robot.currentPosition.x;
    curPos.y = robot.currentPosition.y;
    return curPos;
};

robot.setDestination = function (robotPos) {
    "use strict";
    robot.debug('old pos: x: ' + robot.destinationPosition.x + ' y: ' + robot.destinationPosition.y);
    robot.debug('new pos: x: ' + robotPos.x + ' y: ' + robotPos.y);
    robot.destinationPosition = robotPos;
    //console.log('destPos: x: ' + robot.destinationPosition.x + ' y: ' + robot.destinationPosition.y);

    return false;
};

robot.getDestination = function () {
    "use strict";
    var destPos = new RobotPosition();
    destPos = robot.destinationPosition;
    return destPos;
};

robot.distanceTo = function (newPos) {
    "use strict";
    var curPos;
    curPos = robot.getCurrentPos();
    robot.debug('curX: ' + curPos.x + ' curY: ' + curPos.y);

    return Math.sqrt(Math.pow((curPos.x - newPos.x), 2) + Math.pow((curPos.y - newPos.y), 2));
};

robot.moveUnit = function (direction, units) {
    "use strict";
    var x, y, curPos;
    curPos = new RobotPosition();


};




