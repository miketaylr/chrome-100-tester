class Chrome100Tester {
  constructor() {
    this.initListeners();
  }

  initListeners() {
    this.addWebRequestListener();
  }

  addWebRequestListener() {
    let extraInfoSpec = ["blocking", "requestHeaders", "extraHeaders"];

    chrome.webRequest.onBeforeSendHeaders.addListener(
      this.webRequestHandler,
      { urls: ["<all_urls>"] },
      extraInfoSpec
    );
  }

  webRequestHandler(details) {
    let headers = details.requestHeaders;
    let ua = headers.find( el => el.name.toLowerCase() == "user-agent");
    ua.value = ua.value.replace(/Chrome\/\d+\.\d+\.\d+\.\d+/gi, "Chrome 100.0.0.0");
    return { requestHeaders: headers };
  }
}

new Chrome100Tester();
