const loadAdsbMap = () => {
    const iframe = document
        .getElementById('adsbmap')
        .getElementsByTagName('iframe')[0]
    iframe.src = iframe.src
}