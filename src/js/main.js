const tranactionItems = document.getElementsByClassName('display-transation')
const block3Id = document.getElementsByClassName('block-3')

window.addEventListener('scroll', callDisplayTransaction)

function callDisplayTransaction() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    Array.from(tranactionItems).forEach(item => {
        const itemTop = item.getBoundingClientRect().top
        if (itemTop < triggerBottom) {
            item.classList.add('show')
        } else {
            item.classList.remove('show')
        }
    })

    Array.from(block3Id).forEach(item => {
        if (item.getBoundingClientRect().top < triggerBottom) {
            loadingBloack3()
        }
    })
}
async function loadingBloack3() {
    const processBar = Array.from(document.getElementsByClassName('slide'))
    while (processBar) {
        processBar[2].classList.remove('active')
        processBar[0].classList.add('active')
        await delay(5000)
        processBar[0].classList.remove('active')
        processBar[1].classList.add('active')
        await delay(5000)
        processBar[1].classList.remove('active')
        processBar[2].classList.add('active')
        await delay(5000)
    }
}
async function callDelay(ms) {
    await delay(ms)
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = (event) => {
    callDisplayTransaction()
};