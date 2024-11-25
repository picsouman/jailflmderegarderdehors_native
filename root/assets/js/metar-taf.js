const loadMetarTaf = () => {
    const getMetar = (airportIcao) => {
        return fetch('/weather/api/data/metar?ids=' + airportIcao)
            .then(res => res.text())
    }

    const getTaf = (airportIcao) => {
        return fetch('/weather/api/data/taf?ids=' + airportIcao)
            .then(res => res.text())
    }

    getMetar('LFLY').then(metar => {
        const contentElement = document.getElementById('lfly-metar');
        contentElement.innerHTML = metar;
    })

    getTaf('LFLY').then(metar => {
        const contentElement = document.getElementById('lfly-taf');
        contentElement.innerHTML = metar;
    })

    getMetar('LFLN').then(metar => {
        const contentElement = document.getElementById('lfln-metar');
        contentElement.innerHTML = metar;
    })

    getMetar('LFLH').then(metar => {
        const contentElement = document.getElementById('lflh-metar');
        contentElement.innerHTML = metar;
    })
}