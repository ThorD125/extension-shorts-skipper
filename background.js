let last_url = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    last_url = "";
  }
  if (!tab.url || changeInfo.status !== 'complete') return;

  if (last_url == tab.url) return;

  last_url = tab.url;

  if (tab.url.includes("youtube.com/shorts")) {
    console.log("inserted script yt")
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content-youtube.js"]
    });
  } else if (tab.url.includes("instagram.com/reels")) {
    console.log("inserted script insta")
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content-instagram.js"]
    });
  }
});
