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
    navOlElement.innerHTML += '<li><a href="">' + tab.getAttribute('data-title') + '</a></li>'
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

    Array.prototype.forEach.call(tabs, (tabIter) => {
        if(tabIter !== tab)
        {
            tabIter.classList.add('hidden')
            const loaderDelegate = tabIter.getAttribute('data-loader')
            if(loaderDelegate) {
                setTimeout(() => {
                    eval(loaderDelegate + '()')
                }, 2000)
            }
        }
    })

    const delay = tab.getAttribute('data-delay') || 10000

    tabIdx = (tabIdx + 1) % tabs.length

    setTimeout(() => {
        showTab(tabs[tabIdx])
    }, delay)
}

showTab(tabs[tabIdx])