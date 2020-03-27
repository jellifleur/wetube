const videoPlayer = document.getElementById("jsVideoPlayer");

const setVideoHeight = () => {
    console.log("loade..");
    if (videoPlayer.offsetHeight > 500) {
        videoPlayer.classList.add("verticalVideo");
    }
}

if (videoPlayer) {
    const video = videoPlayer.querySelector("video");
    video.addEventListener("loadeddata", setVideoHeight);
}

