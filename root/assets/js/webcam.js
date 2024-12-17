const loadWebcam = () => {
    const img = document
        .getElementById('webcam')
        .getElementsByTagName('img')[0]
    img.src = img.src
}