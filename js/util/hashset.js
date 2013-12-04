// @formatter:off
define(['underscore', 'util/hash'], function(_, Hash) {
    "use strict";
    // @formatter:on

    //////////////////////////////////
    // Private class methods/fields //
    //////////////////////////////////

    var INIT_CAPACITY = 53,
        LOAD_FACTOR = 0.5;

    /**
     * @exports util/hashset
     */
    var module = {
        /////////////////////////////////
        // Public class methods/fields //
        /////////////////////////////////

        /**
         * Hashset
         * @constructor
         */
        Hashset: function() {
            /////////////////////////////////////
            // Private instance methods/fields //
            /////////////////////////////////////

            var _this = this,
                bucket = new Array(INIT_CAPACITY),
                size = 0,
                capacity = INIT_CAPACITY;
            
            function resolveCollision(object, index) {
                var location = bucket[index];
                if (_.isArray(location)) {
                    if (_.contains(location, object)) {
                        return false;
                    }
                    else {
                        location.push(object);
                        return true;
                    }
                }
                else {
                    bucket[index] = [location, object];
                    return true;
                }
            }
                
            function rehash() {
                // Create new bucket that is double the size
                var oldBucket = bucket;
                capacity *= 2;
                bucket = new Array(capacity);
                
                // Transfer all elements to new array
                var bucketLen = oldBucket.length;
                for (var i = 0; i < bucketLan; i++) {
                    var object = oldBucket[i];
                    if (_.isArray(object)) {
                        var subArray = object,
                            subArrayLen = subArray.length;
                        for (var j = 0; j < subArrayLen; j++) {
                            var element = subArray[j];
                            insert(element);   
                        }
                    }
                    else {
                        insert(object);
                    }
                }
            }
                
            function insert(object, hashTarget) {
                var originalTarget = hashTarget || null;
                hashTarget = hashTarget || object;
                
                var index = Hash.hashcode(hashTarget) % capacity,
                    location = bucket[index];
                var locKey;
                if (location) {
                    locKey = location.key;
                }
                
                if (location === undefined) {
                    bucket[index] = object;
                    return true;
                }
                else if (location === object ||
                    originalTarget === locKey) {
                    return false;
                }
                else {
                    return resolveCollision(object, index);
                };
            }


            ////////////////////////////////////
            // Public instance methods/fields //
            ////////////////////////////////////
            
            Object.defineProperties(this, {
                /**
                 * The size of the Hashset
                 * @type {integer}
                 * @memberOf module:util/hashset.Hashset
                 * @instance
                 */
                length: {
                    get: function() {
                        return size;
                    }
                } 
            });

            /**
             * Add an object
             * @param   {Object} object         -   Object to add
             * @param   {Object} [hashTarget]   -   Object to hash
             * @return  {boolean}           Whether or not the insertion was successful
             */
            this.add = function(object, hashTarget) {
                var originalTarget = hashTarget || null;
                hashTarget = hashTarget || object;
                
                if (!_.isObject(object) || _.isArray(object) || _.isFunction(object)) {
                    return false;
                }
                
                var inserted = insert(object, hashTarget);
                if (inserted) {
                    size++;     
                    if (size / capacity > LOAD_FACTOR) {
                        rehash();
                    }
                    return true;
                }
                return false;
            };
            
            /**
             * Clear the Hashset instance of all elements
             * @return  {void}
             */
            this.clear = function() {
                bucket = new Array(INIT_CAPACITY);
                size = 0;
                capacity = INIT_CAPACITY;
            };
            
            /**
             * Check if an object is an element of this set
             * @param   {Object} object     -   An object _this may be an element
             * @return  {boolean}           Whether or not the object is an element
             */
            this.contains = function(object, hashTarget) {
                var originalTarget = hashTarget || null;
                hashTarget = hashTarget || object;
                
                if (!_.isObject(object) || _.isArray(object) || _.isFunction(object)) {
                    return false;
                }
                
                var index = Hash.hashcode(hashTarget) % capacity,
                    location = bucket[index];
                var locKey;
                if (location) {
                    locKey = location.key;
                }
                
                if (location === object || originalTarget === locKey) {
                    return true;
                }
                else if (_.isArray(location)) {
                    for (var i = 0; i < location.length; i++) {
                        var elem = location[i];
                        var elemKey;
                        if (elem) {
                            elemKey = elem.key; 
                        }
                        if (elem === object || originalTarget === elemKey) {
                            return true;
                        }
                    }
                }
                return false;
            };
            
            /**
             * Remove an object 
             * @param {Object} object       - An object
             * @return {boolean}            True if removed object from set, false if object could not be removed from set
             */
            this.remove = function(object, hashTarget) {
                var originalTarget = hashTarget || null;
                hashTarget = hashTarget || object;
                
                if (!_.isObject(object) || _.isArray(object) || _.isFunction(object)) {
                    return false;
                }
                
                var contained = _this.contains(object, originalTarget);
                if (contained) {
                    var index = Hash.hashcode(hashTarget) % capacity,
                        location = bucket[index];
                    var locKey;
                    if (location) {
                        locKey = location.key;
                    }
                    
                    if (location === object || locKey === originalTarget) {
                        bucket[index] = undefined;
                        size--;
                        return true;
                    }
                    else {
                        for (var i = 0; i < location.length; i++) {
                            if (location[i] === object) {
                                location[i] = null;
                                size--;
                                return true;
                            }
                        }
                    }
                }
                return false;
            };
        }
    };

    return module;
});