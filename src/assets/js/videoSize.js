


window.addEventListener("load", () => {
    const videoPlayer = document.getElementById("jsVideoPlayer");
    const video = document.getElementById("jsVideo");

    const setVideoHeight = () => {
        console.log(video.clientHeight);
        if (video.clientHeight > 500) {
            videoPlayer.classList.add("verticalVideo");
        }
    }

    console.log("ssssbbb" + videoPlayer.clientHeight);
    if (video) {
        setVideoHeight();
        //video.addEventListener("loadeddata", setVideoHeight);
        //document.addEventListener("DOMContentLoaded", setVideoHeight);
    }
});