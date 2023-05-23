// ==UserScript==
// @name         lightninghunter
// @namespace    bovine
// @version      1.0
// @description  Checks of lightning deals for time left, if less than 5 min left opens links in separate background tabs.
//               If no coupon present, closes tab.  Assign hotkey on line 22.
// @author       bovine
// @match        https://www.amazon.com/deals*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

//\\//\\//\\// REQUIRES THAT YOU ALLOW POPUPS (run script once then click the icon in the navigation bar)

/////////////// NOTE: it will also keep most tabs that are at 10+ minutes
/////////////////////  - useful for testing at other times but reduce maxtabs variable

///// if script freezes up, recommended to block https://www.amazon.com from showing images (chrome://settings/content/images)

(function() {
  document.addEventListener('keydown', function(event) {
    if (event.key === '`') {
      setTimeout(function() {
        var maxtabs = 30;
        var items = document.getElementsByClassName('DealGridItem-module__dealItemDisplayGrid_e7RQVFWSOrwXBX4i24Tqg');
        var counter = 0;
        var index = 0;

        function processNextElement() {
          if (index < items.length) {
            var timerElement = items[index].querySelector('.DealMessaging-module__dealMessaging_1EIwT6BUaB6vCKvPVEbAEV');
            if (timerElement) {
              var timerText = timerElement.innerText;
              if (timerText.includes('0:') || timerText.includes('1:') || timerText.includes('2:') || timerText.includes('3:') || timerText.includes('4:')) {
                var linkElement = items[index].querySelector('.DealLink-module__dealLink_3v4tPYOP4qJj9bdiy0xAT');
                if (linkElement) {
                  var newTab = window.open(linkElement.href, '_blank');
                  newTab.addEventListener('load', function() {
                    var script = newTab.document.createElement('script');
                    script.textContent = '(' + executeScript.toString() + ')()';
                    newTab.document.head.appendChild(script);

                    // Coupon checker
                    setTimeout(function() {
                      var targetElement = newTab.document.querySelector('label[for^="checkboxpctch"]');
                      if (!targetElement) {
                        newTab.close(); // Close couponless tabs
                      }
                    }, 2000);
                  });
                  counter++;
                }
              }
            }
          }

          if (counter === maxtabs) {
            return; // Maximum number of tabs to open
          }

          index++; // Iterate to the next item on the lightning page
          setTimeout(function() {
            processNextElement(); // Process next element with a delay
          }, 750);
        }

        processNextElement(); // Start processing elements
      }, 2000);
    }
  });
})();

function executeScript() {
  (function() {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        var targetElement = document.querySelector('label[for^="checkboxpctch"]');

        if (!targetElement) {
          window.close(); // Close tabs without coupons
        }
      }, 2000);
    });
  })();
  console.log('Script executed on the opened tab.');
}

// Inject script into the head of new tabs
var script = document.createElement('script');
script.textContent = '(' + executeScript.toString() + ')()';
document.head.appendChild(script);
