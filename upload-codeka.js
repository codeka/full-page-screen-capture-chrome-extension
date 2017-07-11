

var BASE_URL = "http://www.codeka.com.au/";

var loaderHtml = "<div style=\"position: absolute; top: 33%; text-align: center; line-height: 40px;\">" +
    "Uploading..." +
  "</div>";

function uploadImage(blob, filename, progress, complete) {
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", function(event) {
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total;
      progress(percentComplete * 0.25 * 100);
    }
  });
  xhr.addEventListener("load", function() {
    var data = JSON.parse(this.responseText);
    var url = data.upload_url;
    xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function(event) {
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total;
        progress(0.25 + (percentComplete * 0.75 * 100));
      }
    });
    xhr.addEventListener("load", function() {
      data = JSON.parse(this.responseText);
      complete(BASE_URL + "snip/create?blob_key=" + data.blob_key);
    });
    xhr.open("POST", url);

    var form = new FormData();
    form.append("file", blob, filename);
    xhr.send(form);
  });
  xhr.open("GET", BASE_URL + "blob/upload-url");
  xhr.send();
}
