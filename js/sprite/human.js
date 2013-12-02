// @formatter:off
define([
        'underscore',
        'sprite/sprite',
        'foundation/circle',
        'foundation/rectangle',
        'foundation/animation'
    ], function(_, Sprite, Circle, Rectangle, Animation) {
    "use strict";
    // @formatter:on

    //////////////////////////////////
    // Private class methods/fields //
    //////////////////////////////////

    var HEAD_RADIUS = 35,
        ARM_RADIUS = Math.round(HEAD_RADIUS * 0.5),
        FOOT_BREADTH = Math.round(ARM_RADIUS * 0.8),
        FOOT_LENGTH = Math.round(FOOT_BREADTH * 2.5);

    /**
     * @exports sprite/human
     */
    var module = {
        /////////////////////////////////
        // Public class methods/fields //
        /////////////////////////////////

        /**
         * Human
         * @constructor
         */
        Human : function(x, y, drawer, drawingSettings) {
            /////////////////////////////////////
            // Private instance methods/fields //
            /////////////////////////////////////

            var _this = this;
        
            drawingSettings = drawingSettings || {
                strokeStyle: 'black',
                angle: 0
            };
            drawingSettings.footColor = drawingSettings.footColor || '#773333';
            drawingSettings.armColor = drawingSettings.armColor || 'purple';
            drawingSettings.headColor = drawingSettings.headColor || '#ddaaaa';

            var head = new Circle.Circle(x, y, HEAD_RADIUS,
                drawer, {
                    strokeStyle: drawingSettings.strokeStyle,
                    fillStyle: drawingSettings.headColor,
                    angle: drawingSettings.angle
                }
            );                            

            // Feet
            var leftFoot = new Rectangle.Rectangle(
                x + HEAD_RADIUS,
                y + FOOT_BREADTH,
                FOOT_LENGTH, FOOT_BREADTH, drawer, {
                    strokeStyle: drawingSettings.strokeStyle,
                    fillStyle: drawingSettings.footColor,
                    angle: drawingSettings.angle
                }
            ), 
            
            rightFoot = new Rectangle.Rectangle(
                x + HEAD_RADIUS, y + HEAD_RADIUS + FOOT_BREADTH / 2,
                FOOT_LENGTH, FOOT_BREADTH,
                drawer, {
                    strokeStyle: drawingSettings.strokeStyle,
                    fillStyle: drawingSettings.footColor,
                    angle: drawingSettings.angle
                }
            );

            // Arms
            var leftArm = new Circle.Circle(x + HEAD_RADIUS - ARM_RADIUS,
                y - ARM_RADIUS, ARM_RADIUS, drawer, {
                    strokeStyle: drawingSettings.strokeStyle,
                    fillStyle: drawingSettings.armColor,
                    angle: drawingSettings.angle
                }
            ),
                
            rightArm = new Circle.Circle(x + HEAD_RADIUS - ARM_RADIUS,
                y + HEAD_RADIUS + ARM_RADIUS, ARM_RADIUS,
                drawer, {
                    strokeStyle: drawingSettings.strokeStyle,
                    fillStyle: drawingSettings.armColor,
                    angle: drawingSettings.angle
                }
            );
           

            var initialShapes = [
                leftFoot, rightFoot,
                leftArm, rightArm,
                head
            ];

            ////////////////////////////////////
            // Public instance methods/fields //
            ////////////////////////////////////

            // Extend Sprite constructor
            Sprite.Sprite.call(this, initialShapes, drawer, drawingSettings);
            this.updateBoundingBox();
            
            this.walk = function(toX, toY) {
                // TODO
            };
            
            this.step = function(direction, callback) {
                this.halfStep(direction, function() {
                    _this.halfStep(direction, callback);
                });
            };
            
            var isRightFoot = 1;
            this.halfStep = function(direction, callback) {
                // TODO: direction
                var X_INIT = head.x;
                var STEP_DURATION = 500;
                var STEP_DISTANCE = 50;
                var prevTime = 0;
                var stepAnimation = new Animation.Animation(this,
                    function(timeElapsed) {
                        var frameTime = timeElapsed - prevTime;
                        var step = STEP_DISTANCE * frameTime / STEP_DURATION;
                        prevTime = timeElapsed;
                        
                        _this.forEachShape(function(shape) {
                            shape.x += step;
                        });
                        
                        var angle = Math.PI * 2 * timeElapsed / STEP_DURATION;
                        
                        var dx = Math.sin(angle);
                        dx = Math.round(dx);
                        leftFoot.x -= dx * isRightFoot;
                        rightFoot.x += dx * isRightFoot;
                        
                        if (head.x - X_INIT > STEP_DISTANCE) {
                            // Change next foot
                            isRightFoot = -isRightFoot;
                            return false;
                        }
                        else {
                            return true;
                        }
                }, function() {
                    var adjustedX = head.x + HEAD_RADIUS;
                    _this.clear();
                    leftFoot.x = adjustedX;
                    rightFoot.x = adjustedX;
                    _this.draw();
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
                stepAnimation.start();
            };
            
            this.turn = function(angle) {
                this.forEachShape(function(shape) {
                    shape.drawingSettings.angle += angle;
                });
            };
        }
    };

    return module;
});