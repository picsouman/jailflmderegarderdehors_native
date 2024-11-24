const loadScheduler = () => {
    const iframe = document
        .getElementById('scheduler')
        .getElementsByTagName('iframe')[0]
    iframe.src = iframe.src
}