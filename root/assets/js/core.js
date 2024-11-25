const tabs = document.getElementsByClassName("tab")
let tabIdx = 0

const navOlElement = document.querySelectorAll("nav ol")[0]
Array.prototype.forEach.call(tabs, function (tab) {
    // premier chargement
    const loaderDelegate = tab.getAttribute('data-loader')
    if(loaderDelegate) {
        eval(loaderDelegate + '()')
    }

    // génération du menu
    navOlElement.innerHTML += '<li><a id="menu-' + tab.id + '" href="#">' + tab.getAttribute('data-title') + '</a></li>'
})

const showTab = (tab) => {
    tab.classList.remove('hidden')

    const viewPortElement = document.getElementById("viewport")
    const defaultBgClassName = tab.getAttribute('data-bg') || 'bg-final'
    viewPortElement.removeAttribute('class')
    if (defaultBgClassName !== null)
    {
        viewPortElement.classList.add(defaultBgClassName)
    }

    const menuLinks = document.querySelectorAll('nav ol li a')
    Array.prototype.forEach.call(menuLinks, function (menuLink) {
        if(menuLink.id === 'menu-' + tab.id)
        {
            menuLink.classList.add('active')
        }
        else
        {
            menuLink.classList.remove('active')
        }
    })

    Array.prototype.forEach.call(tabs, (tabIter) => {
        if(tabIter !== tab)
        {
            tabIter.classList.add('hidden')
        }
    })

    const delay = tab.getAttribute('data-delay') || 10000

    tabIdx = (tabIdx + 1) % tabs.length
    setTimeout(() => {
        showTab(tabs[tabIdx])

        // recharge les données pour le prochain cycle
        const loaderDelegate = tab.getAttribute('data-loader')
        if(loaderDelegate) {
            setTimeout(() => {
                eval(loaderDelegate + '()')
            }, 2000)
        }
    }, delay)
}

showTab(tabs[tabIdx])