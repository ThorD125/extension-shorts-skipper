
document.addEventListener("DOMContentLoaded", (event) => {
  console.log("instagram skipper loaded")
let currentIndex = 0;

function handleVideoAtIndex(index) {
  const videos = document.querySelectorAll('video'); // Re-grab all videos fresh
  const video = videos[index];
  if (!video) {
    console.log('No video at index:', index);
    return;
  }

  const onEnded = () => {
    video.removeEventListener('ended', onEnded);
    const nextIndex = index + 1;
    const newVideos = document.querySelectorAll('video'); // Re-grab again
    const nextVideo = newVideos[nextIndex];
    if (nextVideo) {
      nextVideo.scrollIntoView({ behavior: 'smooth' });
      currentIndex = nextIndex;
      setTimeout(() => handleVideoAtIndex(nextIndex), 1000); // Delay to let scroll settle
    } else {
      console.log('No more videos.');
    }
  };

  video.addEventListener('ended', onEnded);
  console.log(`Watching video at index ${index}`);
}

// Start watching the first video
handleVideoAtIndex(currentIndex);


});


