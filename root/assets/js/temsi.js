let { pdfjsLib } = globalThis;

const getTextContent = (element, tagName) => {
    const tag = element.getElementsByTagName(tagName)[0];
    if(tag)
        return tag.textContent || ''
    else
        return '';
}

const parseStringToDateTime = (dateStr) => {
    const [day, month, year, time] = dateStr.split(" ");
    const [hour, minute] = time.split(":");

    return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
    );
}

const parseXML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const charts = [];

    const chartsElement = xmlDoc.getElementsByTagName('carte');

    for (let i = 0; i < chartsElement.length; i++) {
        const carteElement = chartsElement[i];
        const chart = {
            type: getTextContent(carteElement, 'type'),
            flightLevel: getTextContent(carteElement, 'niveau'),
            chartZone: getTextContent(carteElement, 'zone_carte'),
            dateRun: parseStringToDateTime(getTextContent(carteElement, 'date_run')),
            dateEnd: parseStringToDateTime(getTextContent(carteElement, 'date_echeance')),
            imageLink: '/aviation-meteo' + getTextContent(carteElement, 'lien').replace(/^.*CDATA\[|\]\]>$/g, '') // Extraction du lien dans la section CDATA
        };
        charts.push(chart);
    }

    return charts;
}

const getAvailableTemsi = () => {
    return fetch('/aviation-meteo/FR/aviation/serveur_donnees.jsp?ID=UACAVCPXNE&TYPE_DONNEES=CARTES&BASE_COMPLETE=non&VUE_CARTE=AERO_TEMSI&ZONE=AERO_FRANCE')
        .then(response => {
            console.log(response)
            return response.text().then(value => parseXML(value));
        })
}

const loadTemsi = () => {
    const pdfCanvas = document.querySelector('#temsi canvas')

    try {
        let currentDate = new Date()
        currentDate = new Date(currentDate.getTime() + currentDate.getTimezoneOffset())

        getAvailableTemsi().then(charts => {
            const currentDateTime = currentDate.getTime()
            const sortedChartsByClosestToCurrentDate = charts.sort((first, second) => (first.dateRun.getTime() - currentDateTime) - (second.dateRun.getTime() - currentDateTime))
            return loadAndRenderPDF(pdfCanvas, sortedChartsByClosestToCurrentDate[0].imageLink, 40, 50, 50, 40)
        })
    }
    catch(error) {
    }
}

const loadAndRenderPDF = async (
    targetedCanvas,
    pdfUrl,
    topPixelReduction,
    rightPixelReduction,
    bottomPixelReduction,
    leftPixelReduction
) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/js/utils/pdf.worker.mjs';

    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    const context = targetedCanvas.getContext('2d');

    targetedCanvas.width = viewport.width;
    targetedCanvas.height = viewport.height;

    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    const renderTask = page.render(renderContext);
    await renderTask.promise;

    context.drawImage(
        targetedCanvas,
        leftPixelReduction,
        topPixelReduction,
        viewport.width - (leftPixelReduction + rightPixelReduction),
        viewport.height - (topPixelReduction + bottomPixelReduction),
        0, 0,
        targetedCanvas.width, targetedCanvas.height
    );
}