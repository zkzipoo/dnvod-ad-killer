function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let encoder = new TextEncoder();
  let url = new URL(details.url);
  let one_px_gif_data = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  let re = new RegExp("6\\..+\\.js$", "ig");

  filter.ondata = event => {
    if (url.pathname.search(re) != -1) {
        console.log("ifun-ad-killer: detected target js (chunk)");
    } else if (url.hostname.endsWith("ppv.ifun.tv") && url.pathname.startsWith("/upload/video")) {
        console.log("ifun-ad-killer: detected target image (chunk)");
    } else {
      filter.write(event.data);
    }
  };

  filter.onstop = event => {
    if (url.pathname.search(re) != -1) {
      var de_url = browser.runtime.getURL("6.41ebec4eac5ab276ee28.de.js");
      var xhr = new XMLHttpRequest();
      xhr.open('GET', de_url, false);
      xhr.send(null);
      if (xhr.status === 200) {
        console.log("ifun-ad-killer: detected target js (final chunk)");
        filter.write(encoder.encode(xhr.responseText));
        filter.disconnect();
      } else {
        console.log("ifun-ad-killer: Error in getting hacked js");
      }
    } else if (url.hostname.endsWith("ppv.ifun.tv") && url.pathname.startsWith("/upload/video")) {
        console.log("ifun-ad-killer: detected target image (final chunk)");
        base64ed = window.atob(one_px_gif_data);
        var array = new Uint8Array(new ArrayBuffer(base64ed.length));
          for(i = 0; i < base64ed.length; i++) {
            array[i] = base64ed.charCodeAt(i);
        }
        filter.write(array);
    }

    // filter.close();
    filter.disconnect();
  };
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["*://*.ifun.tv/*"], types: ["script", "image"]},
  ["blocking"]
);

// function openPage() {
//   browser.tabs.create({
//     url: "https://www.ifun.tv"
//   });
// }

// browser.browserAction.onClicked.addListener(openPage);
