chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  alert('devToolsConnection');
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function(message, sender, sendResponse) {
    // Inject a content script into the identified tab
    alert(message);
    chrome.tabs.executeScript(message.tabId, { code: message.code });
  };

  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect(function() {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});
