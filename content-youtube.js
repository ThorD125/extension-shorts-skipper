

let difference = 0.5;

let first = 0;
let last = 0;

const observer = new MutationObserver(() => {
  const video = document.querySelector('video');
  if (!video) return;

  let hasEnded = false;

  video.addEventListener('timeupdate', () => {

    first = last;
    last = video.currentTime;

    // console.log("first", first);
    // console.log("last", last);
    difference = last - first
    // console.log("dif", last - first)

    if (difference < 0 || 1 < difference){
      difference = 0;
    }


    if (!hasEnded && video.currentTime >= (video.duration - (1.5*difference)) && video.duration > 0) {
      hasEnded = true;
      const nextBtn = document.querySelector('#navigation-button-down ytd-button-renderer');
      if (nextBtn) {
        nextBtn.click();
        console.log('Auto-clicked next shorts video');
      }
    }
  });

  video.addEventListener('play', () => {
    hasEnded = false;
  });

  observer.disconnect(); // Only observe once
});




// Start observing DOM changes to catch the video load
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and now starting 'yt short skipper'");
  observer.observe(document.body, { childList: true, subtree: true });
});

