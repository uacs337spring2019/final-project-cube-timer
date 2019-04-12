"use strict";

(function everything() {

    // keeps track of whether timer is running; true is ON, false is OFF
    let timerRunning;

    document.onload = function setup() {

        /* set timer state to off */
        timerRunning = false;

        /* Handles spacebar press */
        document.body.onkeyup = function(event){
            // handles key presses, checks multiple properties for browser compatibility
            if(event.keyCode === 32 || event.key === 'Spacebar'){

            }
        }
    }

    /* Handles spacebar press */
    document.body.onkeyup = function(event){
        // handles key presses, checks multiple properties for browser compatibility
        if(event.keyCode === 32 || event.key === 'Spacebar'){

        }
    }
})();