#!/bin/bash

scripts=$(dirname $0)

if [ $# -ne 2 ]; then
    echo "usage: $scripts/module.sh [FOLDER] [CLASSNAME]"
    exit 1
fi

folder=$1
folderpath=$scripts/../js/$folder

if [ ! -d $folderpath ]; then
    mkdir $folderpath
fi

class=$2
filename=`echo $(tr A-Z a-z <<< ${class:0:1})${class:1}`

cat > $folderpath/$filename.js << MODULE
/**
    Description of class

    @class $class
 */
define([], function() {
    "use strict";

    //////////////////////////////////
    // Private class methods/fields //
    //////////////////////////////////

    /**
<<<<<<< HEAD:scripts/module.sh
        @module $folder/$filename
=======
     * @module modulePath // TODO: replace modulePath
>>>>>>> a99ffd0755ee2aff10b35d5e9ad0a7ca83328ea5:js/template.js
     */
    var module = {
        /////////////////////////////////
        // Public class methods/fields //
        /////////////////////////////////

        /**
             @class $class
             @constructor
         */
<<<<<<< HEAD:scripts/module.sh
        $class: function() {
            var _this = this;

=======
        ClassName: function() {
>>>>>>> a99ffd0755ee2aff10b35d5e9ad0a7ca83328ea5:js/template.js
            /////////////////////////////////////
            // Private instance methods/fields //
            /////////////////////////////////////


            ////////////////////////////////////
            // Public instance methods/fields //
            ////////////////////////////////////

<<<<<<< HEAD:scripts/module.sh
=======
            // TODO
>>>>>>> a99ffd0755ee2aff10b35d5e9ad0a7ca83328ea5:js/template.js
        }
    };

    return module;
});
MODULE
