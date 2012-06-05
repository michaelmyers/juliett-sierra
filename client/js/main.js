/**
 * Animatronic
 * @license Copyright (C) 2012, Atomizer Software
 * http://atomizersoft.net
 *
 * @author Atomizer Software
 */

/*global me: false, $: false */

var PlayScreen, PlayerEntity;

var entityDirection;


var up, down, left, right;

// game resources
var g_resources = [
	// map tiles
    {name: "isometric_grass_and_water", type: "image",
        src: "../img/tiles/isometric_grass_and_water.png"},
	// map
    {name: "map", type: "tmx",
        src: "../maps/map_1.tmx"},
	// the main player spritesheet
	{name: "mech", type: "image",
        src: "../img/sprites/mechwarrior.png"}
];


var jsApp = {
	onload: function () {
        "use strict";

		if (!me.video.init('jsapp', $(window).width(), $(window).height())) {
			alert("Sorry but your browser does not support HTML5 canvas." +
                " Please use Chrome or Firefox");
			return;
		}

		me.loader.onload = this.loaded.bind(this);
		// set all resources to be loaded
		me.loader.preload(g_resources);

        //me.animationspeed = me.sys.fps / 10;

        // load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},

	loaded: function () {
        "use strict";
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,		"left");
		me.input.bindKey(me.input.KEY.RIGHT,	"right");
        me.input.bindKey(me.input.KEY.UP,       "up");
        me.input.bindKey(me.input.KEY.DOWN,     "down");

        //me.debug.renderHitBox = true;
		// start the game 
        me.state.change(me.state.PLAY);
	},

    windowResize: function () {
        "use strict";
        console.log("Inside windowResize");
        me.levelDirector.loadLevel("map");
    }

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

	onResetEvent: function () {
        "use strict";
		// load a level
		me.levelDirector.loadLevel("map");

	},
    //action for when game is finished
	onDestroyEvent: function () {
        "use strict";
    }

});

var PlayerEntity = me.ObjectEntity.extend({
    /**
     * @constructor
     */
    init: function (x, y, settings) {
        "use strict";
        // call the parent constructor
        this.parent(x, y, settings);

        // set the walking speed
        this.setVelocity(1.2, 1.2);

        this.setFriction(0.2, 0.2);

        // disable gravity
        this.gravity = 0;

        this.direction = 'down';

        //set up sprite sheet
        this.addAnimation("stand-down", [0]);
        this.addAnimation("stand-downleft", [1]);
        this.addAnimation("stand-left", [2]);
        this.addAnimation("stand-upleft", [3]);
        this.addAnimation("stand-up", [4]);
        this.addAnimation("stand-upright", [5]);
        this.addAnimation("stand-right", [6]);
        this.addAnimation("stand-downright", [7]);
        this.addAnimation("down", [0, 8, 16, 24, 32, 48, 56, 64, 72, 80]);
        this.addAnimation("downleft", [1, 9, 17, 25, 33, 41, 49, 57, 65, 73,
            81, 89, 97, 105, 113, 121, 129]);
        this.addAnimation("left", [2, 10, 18, 26, 34, 42, 50, 58, 66, 74]);
        this.addAnimation("upleft", [3, 11, 19, 27, 35, 43, 51, 59, 67, 75,
            83, 91, 99, 107, 115, 123]);
        this.addAnimation("up", [4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84]);
        this.addAnimation("upright", [5, 13, 21, 29, 37, 45, 53, 61, 69, 77,
            85, 93, 101, 109, 117, 125]);
        this.addAnimation("right", [6, 14, 22, 30, 38, 46, 54, 62, 70, 78]);
        this.addAnimation("downright", [7, 15, 23, 31, 39, 47, 55, 63, 71, 79,
            87, 95, 103, 111, 119, 127, 135]);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },

    update: function () {
        "use strict";
        var hadSpeed, updated;
        hadSpeed = this.vel.y !== 0 || this.vel.x !== 0;

        this.handleInput();

        // check & update player movement
        updated = this.updateMovement();

        if (this.vel.y === 0 && this.vel.x === 0) {
            this.setCurrentAnimation('stand-' + this.direction);
            if (hadSpeed) {
                updated = true;
            }
        }

        // update animation
        if (updated) {
            // update object animation
            this.parent(this);
        }
        return updated;
    },

    getX: function () {
        "use strict";
        return this.pos.x;
    },

    getY: function () {
        "use strict";
        return this.pos.y;
    },

    handleInput: function () {
        "use strict";
        //console.log('handle input');
        var prevDir = this.direction;
        var newDir = ""
        //this is ugly code, TODO: rework this ugly code


        if (up === true) {
            this.vel.y = -this.accel.y * me.timer.tick;
            newDir = 'up';
        } else if (down === true) {
            this.vel.y = this.accel.y * me.timer.tick;
            newDir = 'down';
        }
        if (left === true) {
            this.vel.x = -this.accel.x * me.timer.tick;
            newDir = newDir + 'left';
        } else if (right === true) {
            this.vel.x = this.accel.x * me.timer.tick;
            newDir = newDir + 'right';
        }
        console.log('this.direction: ' + this.direction + ' newDir: ' + newDir);

        if (newDir !== "") {
            this.direction = newDir;
            this.setCurrentAnimation(this.direction);
        }
        /*
        if (this.direction === "" && prevDir === "") {
            this.setCurrentAnimation('stand-down');
        } else if (this.direction === "" && prevDir !== "") {
            this.setCurrentAnimation(prevDir);
        } else {
            this.direction = newDir;
            this.setCurrentAnimation(this.direction);
        }  */

        /*
        //left = 0, up = 1, right = 2, down = 3
        if (me.input.isKeyPressed('left') || entityDirection === 0) {
            this.vel.x -= this.accel.x * me.timer.tick;
            if (me.input.isKeyPressed('down') || entityDirection === 3) {
                this.direction = 'down-left';
                this.vel.y = this.accel.y * me.timer.tick;
            } else if (me.input.isKeyPressed('up') || entityDirection === 1) {
                this.direction = 'up-left';
                this.vel.y = -this.accel.y * me.timer.tick;
            } else {
                this.direction = 'left';
            }
            this.setCurrentAnimation(this.direction);
        } else if (me.input.isKeyPressed('right') || entityDirection === 2) {
            this.vel.x += this.accel.x * me.timer.tick;
            if (me.input.isKeyPressed('down') || entityDirection === 3) {
                this.direction = 'down-right';
                this.vel.y = this.accel.y * me.timer.tick;
            } else if (me.input.isKeyPressed('up') || entityDirection === 1) {
                this.direction = 'up-right';
                this.vel.y = -this.accel.y * me.timer.tick;
            } else {
                this.direction = 'right';
            }
            this.setCurrentAnimation(this.direction);
        } else if (me.input.isKeyPressed('up') &&
                (!me.input.isKeyPressed('left') ||
                    !me.input.isKeyPressed('right'))) {
            this.vel.y = -this.accel.y * me.timer.tick;
            this.direction = 'up';
            this.setCurrentAnimation(this.direction);
        } else if (me.input.isKeyPressed('down') &&
                (!me.input.isKeyPressed('left') ||
                    !me.input.isKeyPressed('right'))) {
            this.vel.y = this.accel.y * me.timer.tick;
            this.direction = 'down';
            this.setCurrentAnimation(this.direction);
        }    */
        //console.log("X: " + this.pos.x + " Y: " + this.pos.y);
        //console.log("X: " + this.getX() + " Y: " + this.getY());
    }
});

