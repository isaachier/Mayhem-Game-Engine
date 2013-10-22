define([], function() {
    "use strict";

    /**
     * A module for creating bounding boxes.
     * @namespace BoundingBox
     */
    var module = {   
        /**
         * Create a bounding box.
         * @name BoundingBox.createBoundingBox
         * @public
         * @param {(float|Point)} arg0 - The x coordinate of left side, or upper-left point.
         * @param {(float|Point)} arg1 - The y coordinate of top side, or bottom-right point.
         * @param {float} arg2 - The width of the box.
         * @param {float} arg3 - The height of the box.
         */
        createBoundingBox: function(arg0, arg1, arg2, arg3) {
            var bbox;
            
            // Private instance methods/fields
            var x, y, w, h;
            switch (arguments.length) {
            case 2:
                var point1 = arg0;
                var point2 = arg1;
                x = point1.x;
                y = point1.y;
                w = point2.x - point1.x;
                h = point2.y - point1.y;
                break;
            case 4:
                x = arg0;
                y = arg1;
                w = arg2;
                h = arg3;
                break;
            }

            var center = {
                x: x + w / 2,
                y: y + h / 2
            };

            bbox = {
                // Public fields
              
                /** 
                 * Minimum x coordinate.
                 * @name BoundingBox#x
                 */
                x: x,
                /** 
                 * Minimum y coordinate.
                 * @name BoundingBox#y
                 */
                y: y,
                /**
                 * Width of the bounding box.
                 * @name BoundingBox#width
                 */
                width: w,
                /**
                 * Height of the bounding box.
                 * @name BoundingBox#height
                 */
                height: h,
                /**
                 * Center of the bounding box.
                 * @name BoundingBox#center
                 */
                center: center,


                // Public methods
                
                /**
                 * Check if the bounding box contains a point.
                 * @public
                 * @param {Point} point -- The point to check for.
                 * @return {boolean}
                 */
                containsPoint: function(point) {
                    return (point.x >= x && point.x < x + w &&
                            point.y >= y && point.y < y + h);
                },

                /**
                 * Get the intersection of this bounding box
                 * and another bounding box.
                 * @public
                 * @param {BoundingBox} otherBbox -- Another bounding box instance.
                 * @return {BoundingBox}
                 */
                intersection: function(otherBbox) {
                    x1 = Math.max(bbox.x, otherBbox.x);
                    y1 = Math.max(bbox.y, otherBbox.y);
                    x2 = Math.min(bbox.x + bbox.width,
                            otherBbox.x + otherBbox.width);
                    y2 = Math.min(bbox.y + bbox.height,
                            otherBbox.y + otherBbox.height);
                    return module.createBoundingBox(x1, y1, x2 - x1, y2 - y1);
                }
            };

            // This line makes bounding boxes immutable.
            Object.freeze(bbox);

            return bbox;
        }
    };

    return module; 
});

