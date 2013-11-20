chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  var devToolsListener = function(message, sender, sendResponse) {
    chrome.tabs.executeScript(message.tabId, { code: message.code });
  };

  devToolsConnection.onMessage.addListener(devToolsListener);

});
