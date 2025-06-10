function handleShortsVideo() {
  console.count("handleshortsvideo");

  const video = document.querySelector('video[tabindex="-1"]');
  if (!video) return;

  let difference = 0.5;
  let first = 0;
  let last = 0;
  let hasEnded = false;

  video.addEventListener('timeupdate', () => {
    first = last;
    last = video.currentTime;
    difference = last - first;

    if (difference < 0 || difference > 1) difference = 0;

    if (!hasEnded && video.currentTime >= (video.duration - 1.5 * difference) && video.duration > 0) {
      hasEnded = true;
      const nextBtn = document.querySelector('#navigation-button-down ytd-button-renderer');
      if (nextBtn) {
        nextBtn.click();
      }
    }
  });

  video.addEventListener('play', () => {
    hasEnded = false;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
      handleShortsVideo();
  });
} else {
    handleShortsVideo();
}
