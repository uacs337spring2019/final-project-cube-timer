"use strict";

(function everything() {

    // timer update rate in ms
    const TIMER_UPDATE_INTERVAL = 10;

    // the interval that updates the timer
    let timer;

    // keeps track of whether timer is running; true is ON, false is OFF
    let timerRunning;

    // keeps track of when the timer started
    let timerStart;

    window.onload = function setup() {

        /* set timer state to off */
        timerRunning = false;

        /* Handles spacebar press. Does not use JS intervals or timeout for
         * timekeeping; those are not guaranteed to be accurate. Instead uses
         * JS Date().
         */
        document.body.onkeyup = function(event) {
            // handles key presses, checks multiple properties for browser compatibility
            if(event.keyCode === 32 || event.key === 'Spacebar'){
                if (timerRunning) {
                    // turn timer off
                    timerRunning = false;
                    clearInterval(timer);

                }
                else {
                    // turn timer on
                    timerRunning = true;

                    // get current time
                    timerStart = Date.now();

                    // set up interval to change timer text
                    timer = setInterval(function() {
                        // delta is ms since timer started
                        let delta = Date.now() - timerStart;
                        
                        // get values of numbers for parts of timer 
                        let minutes = Math.floor(delta / 60000);
                        let seconds = Math.floor(delta / 1000) % 60; // % 60 is for second rollover when > 1 minute
                        let ms = Math.floor(delta - (minutes * 60000) - (seconds * 1000));

                        // pad values with zeroes
                        minutes = minutes.toString().padStart(2, '0');
                        seconds = seconds.toString().padStart(2, '0');
                        ms = ms.toString().padStart(3, '0');

                        // build string of timer
                        let timerString = minutes + ":" + seconds + "." + ms;
                        document.getElementById("timertext").innerHTML = timerString;
                    }, TIMER_UPDATE_INTERVAL);
                }
            }
        };
    }
})();