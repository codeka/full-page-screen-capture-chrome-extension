

var BASE_URL = "http://www.codeka.com.au/";


function uploadImage(blob, filename) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    var data = JSON.parse(this.responseText);
    var url = data.upload_url;
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
      data = JSON.parse(this.responseText);
      chrome.tabs.update(null, { url: BASE_URL + "snip/create?blob_key=" + data.blob_key });
    });
    xhr.open("POST", url);

    var form = new FormData();
    form.append("file", blob, filename);
    xhr.send(form);
  });
  xhr.open("GET", BASE_URL + "blob/upload-url");
  xhr.send();
}
