const getMetar = (airportIcao) => {
    return fetch('/weather/api/data/metar?ids=' + airportIcao)
        .then(res => res.text())
}

const getTaf = (airportIcao) => {
    return fetch('/weather/api/data/taf?ids=' + airportIcao)
        .then(res => res.text())
}

getMetar('LFLY').then(metar => {
    const lflyMetarElement = document.querySelector('#lfly.metar');
    lflyMetarElement.innerHTML = metar;
})