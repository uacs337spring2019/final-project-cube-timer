"use strict";

(function everything() {

    /* Timer properties and variables */
    // timer update rate in ms
    const TIMER_UPDATE_INTERVAL = 10;
    // the interval that updates the timer
    let timer;
    // keeps track of whether timer is running; true is ON, false is OFF
    let timerRunning;
    // keeps track of when the timer started
    let timerStart;

    /* History */
    let solves = [];

    window.onload = function setup() {

        /* set timer state to off */
        timerRunning = false;

        /* Handles spacebar press. */
        document.body.onkeyup = function(event) {
            // handles key presses, checks multiple properties for browser compatibility
            if(event.keyCode === 32 || event.key === 'Spacebar'){
                toggleTimer();
            }
        };
    }

    /**
     * Turns the timer on or off. Does not use JS intervals or timeout for
     * timekeeping; those are not guaranteed to be accurate. Instead uses
     * JS Date().
     */
    function toggleTimer() {
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
               
                let time = new Time(delta);
                
                document.getElementById("timertext").innerHTML = time.toString();
            }, TIMER_UPDATE_INTERVAL);
        }
    }

    /**
     * A class representing a completed solve. Contains a time and an associated
     * scramble with the time.
     */
    class SolveRecord {

        /**
         * Constructs a new instance of a SolveRecord.
         * 
         * @param {Time} time the length of this solve in milliseconds
         * @param {string} scramble 
         */
        constructor(time, scramble) {
            this.time = time;
            this.scramble = scramble;
        }

        /**
         * Get the Time object associated with this SolveRecord.
         * 
         * @returns {Time} the Time object associated with this SolveRecord
         */
        get time() {
            return this.time;
        }

        /**
         * Get the scramble associated with this SolveRecord.
         * 
         * @returns {string} the scramble associated with this SolveRecord
         */
        get scramble() {
            return this.scramble;
        }
    }

    /**
     * Time represents a length of time with millisecond accuracy. It is used to
     * store the time taken for a solve, and is used to represent the current
     * time elapsed on the timer. 
     */
    class Time {

        /**
         * Constructs a new instance of a Time object.
         * 
         * @param {number} ms the length of this time interval in milliseconds.
         */
        constructor(ms) {
            this.ms = ms;
        }

        /**
         * Formats this Time into an easily readable string. Times less than one
         * minute are formatted as seconds.milliseconds (e.g. 12.345). Times one
         * minute or greater are formatted as minutes:seconds.milliseconds, with
         * single digit minute and second lengths padded with a zero (e.g. 
         * 01:02.345). Regardless of length of time, milliseconds is padded with
         * 0, 1, or 2 zeros up to a length of 3 (e.g. 32.001).
         * 
         * @returns {string} a string representing this time interval. 
         */
        toString() {
            // get values of numbers for parts of timer 
            let minutes = Math.floor(this.ms / 60000);
            let seconds = Math.floor(this.ms / 1000) % 60; // % 60 is for second rollover when > 1 minute
            let ms = Math.floor(this.ms - (minutes * 60000) - (seconds * 1000));
            
            /* build string of timer. */
            let timerString;
            // pad values with zeroes
            ms = ms.toString().padStart(3, '0');
            // When <1 min, exclude minutes 
            if (minutes < 1) {
                timerString = seconds + "." + ms;
            }
            else {
                minutes = minutes.toString().padStart(2, '0');
                seconds = seconds.toString().padStart(2, '0');
                timerString = minutes + ":" + seconds + "." + ms;
            }
            return timerString;
        }
    }
})();