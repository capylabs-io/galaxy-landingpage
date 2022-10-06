const tranactionItems = document.getElementsByClassName('display-transation')
const block3Id = document.getElementsByClassName('block-3')
var timer

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
        if (!item.classList.contains('process-active')){
            if (item.getBoundingClientRect().top < triggerBottom) {
                item.classList.add('process-active')
                loadingBlock3(0)
            }
        }
    })
    
}
function onClickLoadBlock3(index) {
    clearTimeout(timer)
    loadingBlock3(index)
}

async function loadingBlock3(index) {
    const processBar = Array.from(document.getElementsByClassName('slide'))
    let activeElement = Array.from(document.getElementsByClassName('slide active'))
    if (index >= processBar.length) {
        index = 0
    }
    // active class remove
    activeElement.forEach(item => {
        item.classList.remove('active')
    })
    // add active class 
    processBar[index].classList.add('active')
    timer = setTimeout(function() { loadingBlock3(index+1, false)}, 5000);
}

window.onload = (event) => {
    callDisplayTransaction()
};