const loadWindy = () => {
    const iframe = document
        .getElementById('windy')
        .getElementsByTagName('iframe')[0]
    iframe.src = iframe.src
}