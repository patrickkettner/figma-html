chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let isResponseAsync = false;

  if ('inject' in request) {
    isResponseAsync = true;
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      const activeTab = sender.tab || tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.executeScript(
          activeTab.id,
          {
            file: "js/inject.js"
          },
          args => {
            sendResponse({ done: true, args });
          },
        );
      }
    });
  }

  return isResponseAsync;
});
