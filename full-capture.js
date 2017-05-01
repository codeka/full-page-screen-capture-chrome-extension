// Copyright (c) 2012,2013 Peter Coles - http://mrcoles.com/ - All rights reserved.
// Use of this source code is governed by the MIT License found in LICENSE


//
// Capture Handlers
//

function _onError(reason) {
    show('uh-oh'); // TODO - extra uh-oh info?
}


function _onProgress(complete) {
    if (complete === 0) {
        // Page capture has just been initiated.
        show('loading');
    }
    else {
        $('bar').style.width = parseInt(complete * 100, 10) + '%';
    }
}


function _onSplit() {
    show('split-image');
}

//
// start doing stuff immediately! - including error cases
//

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    var filename = getFilename(tab.url);
    CaptureAPI.fullCaptureToFiles(tab, filename, function(filenames) {
        displayCapture(filenames, tab);
    }, _onError, _onProgress, _onSplit);
});
