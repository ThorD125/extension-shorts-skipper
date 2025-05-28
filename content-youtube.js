// Handle a single Shorts video logic
function handleShortsVideo() {
  const video = document.querySelector('video[tabindex="-1"]');
  if (!video) return;

  // console.log("Shorts video detected", video);

  let difference = 0.5;
  let first = 0;
  let last = 0;
  let hasEnded = false;

  video.addEventListener('timeupdate', () => {
    // console.log("timeupdate");
    first = last;
    last = video.currentTime;
    difference = last - first;

    if (difference < 0 || difference > 1) difference = 0;

    if (!hasEnded && video.currentTime >= (video.duration - 1.5 * difference) && video.duration > 0) {
      hasEnded = true;
      const nextBtn = document.querySelector('#navigation-button-down ytd-button-renderer');
      if (nextBtn) {
        nextBtn.click();
        // console.log('Auto-clicked next Shorts video');
      }
    }
  });

  video.addEventListener('play', () => {
    hasEnded = false;
  });
}

// Observe the DOM for changes in URL or content
function startObserving() {
  let lastUrl = location.href;
  let observer;

  if (observer) observer.disconnect();

  observer = new MutationObserver(() => {
    // if (location.href !== lastUrl) {
      lastUrl = location.href;
      if (location.href.includes("/short")) {
        // console.log("URL changed to:", lastUrl);
        setTimeout(handleShortsVideo, 300); // Slight delay to let DOM settle
      }
    // }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Initial run
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (location.href.includes("/shorts/")) handleShortsVideo();
    startObserving();
  });
} else {
  if (location.href.includes("/shorts/")) handleShortsVideo();
  startObserving();
}
