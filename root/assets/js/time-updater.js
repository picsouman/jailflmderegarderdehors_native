const timeElement = document.getElementById('time')

setInterval(() => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`
    timeElement.innerHTML = formattedDate
}, 1000)