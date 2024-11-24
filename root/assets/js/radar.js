const loadRadar = () => {
    const radarTab = document.getElementById('radar')
    const imageElement = document.createElement('img')
    imageElement.src = 'https://www.meteo60.fr/radars/animation-radar-centre-est.gif?cache=' + new Date().getTime()
    imageElement.attributes['alt'] = "Radar météo"

    radarTab.innerHTML = ''
    radarTab.appendChild(imageElement)
 }