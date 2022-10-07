const tranactionItems = document.getElementsByClassName('display-transation')
const block2Item = document.getElementsByClassName('block-2')
const block3Item = document.getElementsByClassName('block-3')
const trgger1Class = document.getElementsByClassName('trigger-1')
const trgger2Class = document.getElementsByClassName('trigger-2')
const trgger3Class = document.getElementsByClassName('trigger-3')
const showingTrigger = document.getElementsByClassName('trigger show')
var timer
var countTrigger = 0


window.addEventListener('scroll', callDisplayTransaction)

function callDisplayTransaction() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    Array.from(tranactionItems).forEach(item => {
        let itemTop = item.getBoundingClientRect().top
        if (itemTop < triggerBottom) {
            item.classList.add('show')
        } else {
            item.classList.remove('show')
        }
    })

    // Block 2 transition
    Array.from(block2Item).forEach(item => {
        let bl2Top = item.getBoundingClientRect().top
        let bl2Bottom = item.getBoundingClientRect().bottom
        // item.addEventListener('wheel', preventScroll, {passive: false});
        console.log(bl2Bottom)
        if ( bl2Top < triggerBottom) {
            if (bl2Top+window.innerHeight > 100) {
                Array.from(block2Item).forEach(item => {
                    item.scrollIntoView()
                })
                // block 1 hidden
                let block1Class =  Array.from(document.getElementsByClassName('bl1-img'))
                block1Class.forEach(item => {
                    item.classList.remove('show')
                })
                // block 2 show
                countTrigger++
                console.log(countTrigger)
                Array.from(showingTrigger).forEach(trigger => {
                    trigger.classList.remove('show')
                })
                if (countTrigger < 20) {
                    Array.from(trgger1Class).forEach(trigger => {
                        trigger.classList.add('show')
                    })
                } else if (countTrigger < 40) {
                    Array.from(trgger2Class).forEach(trigger => {
                        trigger.classList.add('show')
                    })
                } else if (countTrigger < 60) {
                    Array.from(trgger3Class).forEach(trigger => {
                        trigger.classList.add('show')
                    })
                } else {
                    Array.from(block3Item).forEach(item => {
                        item.scrollIntoView()
                    })
                }
            }
        }
    })

    // Block 3 transition
    Array.from(block3Item).forEach(item => {
        if (!item.classList.contains('process-active')){
            if (item.getBoundingClientRect().top < triggerBottom) {
                item.classList.add('process-active')
                inBlock2 = false
                loadingBlock3(0)
            }
        }
        if (item.getBoundingClientRect().top > triggerBottom) {
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

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();

    return false;
}