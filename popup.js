/**
 * Created by mikolajumanski1 on 13/09/16.
 */

// Both functions use tabs.query of tabs API to get all the currently open tabs (empty object info gets all the open tabs)
// Then we update their pinned status using tabs API once again

function pinAllTabs() {
    chrome.tabs.query({ windowId:chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
        for (var tab of tabs) {
            chrome.tabs.update(tab.id, { pinned: true });
        }
    });
}

function unpinAllTabs() {
    chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
        for (var tab of tabs) {
            chrome.tabs.update(tab.id, { pinned: false });
        }
    });
}

// Used in popup menu in buttons clickable by the user
window.onload = function() {

    document.getElementById('pinButton').addEventListener('click', function () {
        pinAllTabs();
    });

    document.getElementById('unpinButton').addEventListener('click', function () {
        unpinAllTabs();
    });
};

//Used to access the Developers website from the popup
document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

