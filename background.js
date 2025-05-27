chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url || changeInfo.status !== 'complete') return;

  if (tab.url.includes("youtube.com/shorts")) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content-youtube.js"]
    });
  } else if (tab.url.includes("instagram.com/reels")) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content-instagram.js"]
    });
  }
});
