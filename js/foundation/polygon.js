define(['util/boundingBox'], function(BoundingBox) {
    "use strict";

    // Private class methods/fields

    /**
     * @exports util/polygon
     */
    var module = {
        /**
         * Generate a BoundingBox for a polygon.
         *
         * @param {Array.<Point>} points - An array of points describing the polygon.
         * @return {BoundingBox} - A BoundingBox that contains all of the points.
         */
        generateBbox: function(points) {
            var minX = points[0].x,
                maxX = points[0].x,
                minY = points[0].y,
                maxY = points[0].y;
            var numPoints = points.length;
            for (var i = 0; i < numPoints; i++) {
                var point = points[i];
                if (minX > point.x) {
                    minX = point.x;
                }
                if (maxX < point.x) {
                    maxX = point.x;
                }
                if (minY > point.y) {
                    minY = point.y;
                }
                if (maxY < point.y) {
                    maxY = point.y;
                }
            }
            return new BoundingBox.BoundingBox(minX, minY, maxX, maxY);
        },

        /**
         * Polygon
         *
         * @constructor
         * @param {Array.<Point>} points    -   An array of points that describe the polygon.
         * @param {CanvasDrawer} drawer     -   A CanvasDrawer to draw the polygon onto the canvas.
         * @param {Object} drawingSettings  -   A dictionary of drawing options.
         */
        Polygon: function(points, drawer, drawingSettings) {
            // Private instance methods/fields

            var EXTRA_BOUNDS = drawingSettings.lineWidth;            

            // Public instance methods/fields
            
            this.points = points;
            this.bbox = module.generateBbox(this.points);
            
            /** The offset of the polygon in x. */
            this.offsetX = 0;
            /** The offset of the polygon in y. */
            this.offsetY = 0; 
            

            /**
             * getCanvasDrawer
             *
             * @return {CanvasDrawer} - The current canvas drawer.
             */
            this.getCanvasDrawer = function() {
                return drawer;
            };

            // TODO: should there be a setter for the drawer?
            
            /**
             * Set the drawing settings for the rectangle. TODO: valid settings are...
             *
             * @param {Object} settings - An object with drawing settings.
             * @return {void}
             */
            this.setDrawingSettings = function(settings) {
                drawingSettings = settings;
            }

            /**
             * Draw the rectangle onto the canvas using the CanvasDrawer.
             *
             * @return {void}
             */
            this.draw = function() {
                drawer.beginPath();
                drawer.setContextSettings(drawingSettings);
                drawer.save();
                drawer.translate(this.offsetX, this.offsetY);
                var numPoints = points.length;
                drawer.drawLine(points[0], points[1], true);
                for (var i = 1; i < numPoints; i++) {
                    var point = points[i];
                    drawer.drawLine(points[i], points[(i + 1) % numPoints]);
                }
                drawer.closePath();
                drawer.fill();
                drawer.stroke();
                drawer.restore();
            };

            /**
             * Clear the shape.
             * 
             * @return {void}
             */
            this.clear = function() {
                drawer.save();
                drawer.translate(this.offsetX, this.offsetY)
                drawer.clearRect(this.bbox.x - EXTRA_BOUNDS,
                                    this.bbox.y - EXTRA_BOUNDS,
                                    this.bbox.width + EXTRA_BOUNDS,
                                    this.bbox.height + EXTRA_BOUNDS);
                drawer.restore();
            };
        }
    };

    return module; 
});