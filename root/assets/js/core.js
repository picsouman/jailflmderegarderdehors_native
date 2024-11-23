const tabs = document.getElementsByClassName("tab")
let tabIdx = 0

const showTab = (tab) => {
    tab.classList.remove('hidden')

    const viewPortElement = document.getElementById("viewport")
    let defaultBgClassName = null
    switch(tab.id) {
        case 'metar-taf' || 'scheduler':
            defaultBgClassName = 'bg-final'
            break
        case 'radar':
            defaultBgClassName = 'bg-clouds'
            break
        case 'windy':
            defaultBgClassName = 'bg-wind'
            break
    }
    viewPortElement.removeAttribute('class')
    if (defaultBgClassName !== null)
    {
        viewPortElement.classList.add(defaultBgClassName)
    }

    Array.prototype.forEach.call(tabs, (tabIter) => {
        if(tabIter !== tab)
        {
            tabIter.classList.add('hidden')
        }
    })

    let delay = 10000
    switch (tab.id) {
        case 'metar-taf':
            delay = 15000
            break
        case 'radar' || 'scheduler':
            delay = 10000
            break;
    }

    tabIdx = (tabIdx + 1)
    if(tabIdx === tabs.length)
        window.location.reload()

    setTimeout(() => {
        showTab(tabs[tabIdx])
    }, delay)
}

showTab(tabs[tabIdx])