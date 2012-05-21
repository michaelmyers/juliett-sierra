/**
 * User: Michael
 * Date: 5/20/12
 * Time: 11:32 PM
 */

var robot = {
    direction: null,
    distance: 1,

    directions: {north:1, west: 2, south: 3, east: 4},

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
    }
};


