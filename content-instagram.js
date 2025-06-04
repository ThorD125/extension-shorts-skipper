// function startObserving() {
//   let observer;

//   if (observer) observer.disconnect();

//   observer = new MutationObserver(() => {

//     let lastUrl = location.href;

//     if (location.href !== lastUrl) {

//       console.log("changed")

//       lastUrl = location.href;
//       onUrlChange();
//     }
//   });

//   observer.observe(document, { childList: true, subtree: true });
// }

// Core logic encapsulated
// function onUrlChange() {
//   if (location.href.includes("/reels/")) {
//     console.log("URL changed to Instagram reel:", location.href);
//     startSkipper();
//   }
//   if (document.querySelector("video").muted) {
//     const unmuteButton = document.querySelector("[role='presentation'] [role='button'] [role='button']");
//     if (unmuteButton) unmuteButton.click();
//   }

// }




function startSkipper() {
  
// document.addEventListener("DOMContentLoaded", () => {
    console.log("Instagram skipper loaded");
    let currentIndex = 0;

    function handleVideoAtIndex() {
      
      
    // function handleVideoAtIndex(index) {
        document.querySelectorAll('video')
        const videos = document.querySelectorAll('video'); 
      // Re-grab all videos fresh
        
        const index = Array.from(videos).findIndex(video => !video.paused);
        console.log("skip video on", index);
        
      
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
                    
        // setTimeout(() => handleVideoAtIndex(index + 1), 1000);
        }
      };

      video.addEventListener('ended', onEnded);
    }

    handleVideoAtIndex(currentIndex);
  
  // });
}

// Run immediately if already on reels
// if (location.href.includes("/reels/")) {
//   onUrlChange();
// }
// Initial run
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    startSkipper();
    
  // handleShortsVideo();
    
  // if (location.href.includes("/reels/")) 
    
  // startObserving();
    console.log("domcontent loaded")
  });
}
  else if (document.readyState === "complete") {
    startSkipper();
    
  // handleShortsVideo();
    
  // if (location.href.includes("/reels/")) 
    
  // startObserving();
    console.log("domcontent complete")
  
} else {
  
// if (location.href.includes("/reels/")) {
    console.log("domcontent else")
    
  // onUrlChange();
    console.log("document.readyState",document.readyState)
    setTimeout(() => startSkipper(), 1000);

  
  // }
  
// startObserving();
}
