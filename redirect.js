// webRequest documentation: https://developer.chrome.com/extensions/webRequest

/**
 * When visiting twib.me/amazon, add the X-REFERRER header to identify twib-amazon.
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    details.requestHeaders.push({name: 'X-REFERRER', value: 'twib-amazon (Chrome)'});

    return {requestHeaders: details.requestHeaders};
  },
  {
    urls: ["*://twib.me/amazon"] 
  },
  ["blocking", "requestHeaders"]
);

/**
 * The filter has taken care of matching amazon.com/. If the callback is executed, 
 * we can safely redirect to twib.me/amazon.
 */
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return { redirectUrl: 'http://twib.me/amazon' };
  },
  { 
    urls: ["*://www.amazon.com/"]
  },
  ["blocking"]
);


