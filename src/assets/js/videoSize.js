window.addEventListener("load", () => {
    const videoPlayer = document.getElementById("jsVideoPlayer");
    const video = document.getElementById("jsVideo");

    const setVideoHeight = () => {
        if (video.clientHeight > 500) {
            videoPlayer.classList.add("verticalVideo");
        }
    }

    if (video) {
        setVideoHeight();
        //video.addEventListener("loadeddata", setVideoHeight);
    }
});