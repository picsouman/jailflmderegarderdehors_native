const timeElement = document.querySelector('#time');

setInterval(() => {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    timeElement.textContent = formattedDate;
}, 1000)