function startSkipper() {
  console.count("Instagram skipper loaded");
  let currentIndex = 0;

  function handleVideoAtIndex() {
    document.querySelectorAll('video')
    const videos = document.querySelectorAll('video');

    const index = Array.from(videos).findIndex(video => !video.paused);

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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    startSkipper();
  });
} else if (document.readyState === "complete") {
  startSkipper();
} else {
  setTimeout(() => startSkipper(), 1000);
}
