

function _onError(reason) {
    show('uh-oh'); // TODO - extra uh-oh info?
}

function visibleCapture() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        var filename = getFilename(tab.url);
        CaptureAPI.visibleCaptureToFile(tab, filename, function(filename) {
            displayCapture([filename], tab);
        }, _onError);
    });
}


function areaCapture() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        var filename = getFilename(tab.url);
        CaptureAPI.visibleCaptureToFile(tab, filename, function(filename) {
            chrome.tabs.create({
                url: chrome.extension.getURL("area-select.html?filename=" + filename),
                active: true,
                windowId: null,
                openerTabId: tab.id,
                index: (tab.incognito ? 0 : tab.index) + 1
            });
        }, _onError);
    });
}

$("visible-capture").addEventListener("click", visibleCapture);
$("area-capture").addEventListener("click", areaCapture);