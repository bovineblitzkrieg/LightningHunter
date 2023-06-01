// ==UserScript==
// @name         Camelsnatch
// @namespace    bov
// @version      1.0
// @description  in new background tab, opens camelcamelcamel chart or keepa site for item via hotkeys (assignable lines 14 & 16).
// @author       bovine
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// ==/UserScript==

(function() {
    'use strict';

    var hotkey = '2'; // Assign hotkey for camelcamelcamel image page
    var chartURL = 'https://charts.camelcamelcamel.com/us/B0778XLPB7/amazon-new-used.png?force=1&zero=0&w=600&h=350&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en';
//    var chartURL = 'https://camelcamelcamel.com/product/B0778XLPB7'; // if you prefer to go to the camelcamelcamel page move the // at the beginning of this line up to line 15
    var hotkey2 = '3'; // Assign hotkey for keepa item page
    var chartURL2 = 'https://keepa.com/#!product/1-B09F3F5KXH';

    // Extract ASIN
    function extractASIN(url) {
        var asinRegex = /\/([A-Z0-9]{10})(\/|$|\?)/;
        var match = url.match(asinRegex);
        if (match && match.length >= 2) {
            return match[1];
        }
        return null;
    }

    // Open in new tab
    function openImage(url) {
        window.open(url, '_blank');
    }

    // Main function
    function extractASINAndOpenImage() {
        var currentURL = window.location.href;
        var asin = extractASIN(currentURL);
        if (asin) {
            var imageUrl = chartURL.replace('B0778XLPB7', asin);
            openImage(imageUrl);
        }
    }

        // Main function
    function extractASINAndOpenImage2() {
        var currentURL = window.location.href;
        var asin = extractASIN(currentURL);
        if (asin) {
            var imageUrl = chartURL2.replace('B09F3F5KXH', asin);
            openImage(imageUrl);
        }
    }

    // Listens for hotkey
    document.addEventListener('keydown', function(event) {
        // Check if the pressed key matches the hotkey
        if (event.key === hotkey) {
            extractASINAndOpenImage();
        }
    });
    // Listens for hotkey
    document.addEventListener('keydown', function(event) {
        // Check if the pressed key matches the hotkey
        if (event.key === hotkey2) {
            extractASINAndOpenImage2();
        }
    });

})();
