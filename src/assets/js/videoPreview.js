const videoThumbnails = document.querySelectorAll(".videoBlock__thumbnail");

let timer;

const resetVideo = (targetVideo) => {
    targetVideo.currentTime = 0;
    targetVideo.pause();
}

const previewVideo = (targetVideo) => {
    targetVideo.muted = true;
    targetVideo.play();
    targetVideo.addEventListener("ended", () => {
        resetVideo(targetVideo);
    });
}

const videoMouseoutHandler = (event) => {
    const targetVideo = event.target;
    clearTimeout(timer);
    resetVideo(targetVideo);
}

const videoMouseenterHandler = (event) => {
    timer = setTimeout(() => {
        const targetVideo = event.target;
        previewVideo(targetVideo);
    }, 200);
}

if (videoThumbnails.length > 0) {
    videoThumbnails.forEach(item => {
        item.addEventListener("mouseenter", videoMouseenterHandler);
        item.addEventListener("mouseout", videoMouseoutHandler);
    });
}