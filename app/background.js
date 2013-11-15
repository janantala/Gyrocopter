// chrome.runtime.onConnect.addListener(function(devToolsConnection) {
//   alert('devToolsConnection');
//   // assign the listener function to a variable so we can remove it later
//   var devToolsListener = function(message, sender, sendResponse) {
//     // Inject a content script into the identified tab
//     alert(message);
//     chrome.tabs.executeScript(message.tabId, { code: message.code });
//   };

//   // add the listener
//   devToolsConnection.onMessage.addListener(devToolsListener);

//   devToolsConnection.onDisconnect(function() {
//     devToolsConnection.onMessage.removeListener(devToolsListener);
//   });
// });

alert('bg');
//Handle request from devtools   
chrome.runtime.onConnect.addListener(function (port) {
  alert('onConnect');
    port.onMessage.addListener(function (message) {
      alert('onMessage');
        //Request a tab for sending needed information
        chrome.tabs.query({
            "status": "complete",
            "currentWindow": true,
            "url": "http://www.google.co.in/"
        }, function (tabs) {

            for (tab in tabs) {
                //Sending Message to content scripts
                chrome.tabs.sendMessage(tabs[tab].id, message);
            }
        });

    });
    //Posting back to Devtools
    chrome.runtime.onMessage.addListener(function (message, sender) {
        port.postMessage(message);
    });
});