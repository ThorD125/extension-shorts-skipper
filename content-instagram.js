function startObserving() {
  let observer;

  if (observer) observer.disconnect();

  observer = new MutationObserver(() => {
    let lastUrl = location.href;

    if (location.href !== lastUrl) {

      console.log("changed")

      lastUrl = location.href;
      onUrlChange();
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

// Core logic encapsulated
function onUrlChange() {
  if (location.href.includes("/reels/")) {
    console.log("URL changed to Instagram reel:", location.href);
    startSkipper();
  }
  if (document.querySelector("video").muted) {
    const unmuteButton = document.querySelector("[role='presentation'] [role='button'] [role='button']");
    if (unmuteButton) unmuteButton.click();
  }

}

// Wrap your original logic in a function so it can be re-run on navigation
function startSkipper() {
  // document.addEventListener("DOMContentLoaded", () => {
    console.log("Instagram skipper loaded");
    let currentIndex = 0;

    function handleVideoAtIndex(index) {
      const videos = document.querySelectorAll('video'); // Re-grab all videos fresh
      const video = videos[index];
      
      if (!video) return;

      if (video.muted) {
        const unmuteButton = document.querySelector("[role='presentation'] [role='button'] [role='button']");
        if (unmuteButton) unmuteButton.click();
      }

      const onEnded = () => {
        video.removeEventListener('ended', onEnded);
        const nextVideo = document.querySelectorAll('video')[index + 1];
        if (nextVideo) {
          nextVideo.scrollIntoView({ behavior: 'smooth' });
          currentIndex = index + 1;
          setTimeout(() => handleVideoAtIndex(index + 1), 1000);
        }
      };

      video.addEventListener('ended', onEnded);
    }

    handleVideoAtIndex(currentIndex);
  // });
}

// Run immediately if already on reels
if (location.href.includes("/reels/")) {
  onUrlChange();
}
// Initial run
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (location.href.includes("/reels/")) handleShortsVideo();
    startObserving();
  });
} else {
  if (location.href.includes("/reels/")) {
    onUrlChange();
  }
  startObserving();
}
