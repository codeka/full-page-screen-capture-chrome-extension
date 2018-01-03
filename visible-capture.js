
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  var filename = getFilename(tab.url);
  CaptureAPI.visibleCaptureToBlob(tab, function(blob) {
    uploadImage(
      blob,
      filename,
      function(percent) {
        document.querySelector(".meter > span").style.width = percent + "%";
      },
      function(url) {
          chrome.tabs.create({url: url, index: tab.index + 1});
      });
  }, function(error) {
    // TODO: error?
  });
});
