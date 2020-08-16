let videoRef = document.querySelector("video"),
    canvasRef = document.querySelector('canvas'),
    captureBtn = document.querySelector('#captureBtn'),
    filterBtn = document.querySelector('#filterBtn'),
    setFilter = 0;

async function getVideoStream() {
    //  Make sure your video element doesn't overflow its container. We've
    //  added width and max-width to set a preferred size 
    //  and a maximum size for the video.
    //  The browser will calculate the height automatically
    let options = {
        video: {
            width: 480,
            height: 250
        },
        audio: false
    }
    try {
        let stream = await navigator.mediaDevices.getUserMedia(options);
        videoRef.srcObject = stream;
        videoRef.onloadedmetadata = e => videoRef.play();
    } catch (err) {
        alert(err);
    }
}

captureBtn.addEventListener('click', e => {
    try {
        canvasRef.width = videoRef.clientWidth;
        canvasRef.height = videoRef.clientHeight;
        let context = canvasRef.getContext('2d');
        context.drawImage(videoRef, 0, 0);
    } catch (err) {
        alert("Sorry, your borowser does not support web-app features.");
        console.error(err);
    } finally {
        e.target.blur();
    }
});

filterBtn.addEventListener('click', e => {

    let filters = ['grayscale', 'blur', 'hue', 'sepia', 'invert', ''];

    if (setFilter >= filters.length) setFilter = 0;

    canvasRef.className = filters[setFilter];
    videoRef.className = filters[setFilter];

    setFilter++;
});
window.addEventListener('DOMContentLoaded', (event) => {
    getVideoStream();
});

