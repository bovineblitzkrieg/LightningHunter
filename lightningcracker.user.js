// ==UserScript==
// @name         Placeholder
// @namespace    bov
// @version      1.0
// @description  doesn't work
// @author       bov
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// ==/UserScript==

(function() {
    'use strict';

    var hotkey = '0'; // Hotkey value, e.g., '0'
    var running = false; // Flag to track if the script is running

    // Function to add items to cart
    function addToCart() {
        if (document.querySelectorAll("[id^='dealsx_incart']")[0].classList.contains('aok-hidden')) {
            document.querySelectorAll("[id^='dealsx_atc_btn']")[0].click();
            setTimeout(addToCart, 1500); // delay between attempts in ms (1000 = 1 second)
        }
    }

    // Hotkey toggle
    function handleHotkey(event) {
        if (event.key === hotkey) {
            if (running) {
                // Stop the script if it is already running
                running = false;
                console.log('Script stopped');
            } else {
                // Start the script if it is not running
                running = true;
                console.log('Script started');
                addToCart();
            }
        }
    }

    // Hotkey listener
    document.addEventListener('keydown', handleHotkey);
})();
