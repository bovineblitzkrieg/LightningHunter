// ==UserScript==
// @name         quickaffil
// @namespace    bov
// @version      1.1
// @description  Populates clipboard with Amazon item ASIN in affiliate format via hotkey (line 15)
// @author       bovine
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// ==/UserScript==

(function() {
    'use strict';

    var hotkey = '1'; // Hotkey value, e.g., '1'

    // pulls code from URL
    function extractCode(url) {
        const pattern = /\/dp\/([A-Za-z0-9]{10})/; // pulls 10 digit code
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1]; // found code
        }
        return null; // no code present
    }

    // copies to clipboard in affil format
    function copyCodeToClipboard(code) {
        if (code) {
            navigator.clipboard.writeText(`?a ${code}`).then(function() {
                console.log('Code copied to clipboard:', `?a ${code}`);
            }).catch(function(error) {
                console.error('Unable to copy code to clipboard:', error);
            });
        } else {
            console.log('Moo, no code found');
        }
    }

    // Hotkey section
    function handleHotkey(event) {
        if (event.key === hotkey) {
            // Get the current URL
            const url = window.location.href;

            // Extract the code from the URL
            const code = extractCode(url);

            // Copy the code to clipboard
            copyCodeToClipboard(code);
        }
    }

    // Add event listener for the hotkey
    document.addEventListener('keydown', handleHotkey);
})();
