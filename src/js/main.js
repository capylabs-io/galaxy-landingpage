const tranactionItems = document.getElementsByClassName('display-transation')
const block1Item = document.getElementsByClassName('block-1')
const block2Item = document.getElementsByClassName('block-2')
const block3Item = document.getElementsByClassName('block-3')
const trgger1Class = document.getElementsByClassName('trigger-1')
const trgger2Class = document.getElementsByClassName('trigger-2')
const trgger3Class = document.getElementsByClassName('trigger-3')
const showingTrigger = document.getElementsByClassName('trigger show')
const fullPageObject = document.getElementsByClassName('fullpage')
const triggerBottom = window.innerHeight / 5 * 4;
var timer
var countTrigger = 0

window.onload = (event) => {
    const fullPageObjectArr = Array.from(fullPageObject)
    callDisplayTransaction()
    handleInBlock1(fullPageObjectArr)
    handleInBlock2(fullPageObjectArr)
    handleInBlock3(fullPageObjectArr)
    handleInBlock4(fullPageObjectArr)
    handleInBlock5(fullPageObjectArr)
};
window.addEventListener('scroll', function(event) {
    callDisplayTransaction()
})
function callDisplayTransaction() {
    Array.from(tranactionItems).forEach(item => {
        let itemTop = item.getBoundingClientRect().top
        if (itemTop < triggerBottom) {
            item.classList.add('show')
        } else {
            item.classList.remove('show')
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

// fullpage

function handleInBlock1(fullPage) {
    fullPage[0].addEventListener('wheel', function(event) {
        preventScroll(event)
        if (event.deltaY > 0) {
            countTrigger = 0
            fullPage[1].scrollIntoView()
       }
    })
}

function handleInBlock2(fullPage) {
    fullPage[1].addEventListener('wheel', function(e) {
        preventScroll(e)
        // block 1 - image hidden
        let block1Img =  Array.from(document.getElementsByClassName('bl1-img'))
            block1Img.forEach(item => {
            item.classList.remove('show')
        })
        if (e.deltaY > 0) {
            countTrigger++
            console.log("++")
        } else if (e.deltaY < 0) {
            countTrigger--
            console.log("--")
        }
        console.log(countTrigger)
        if (countTrigger < 0) {
            countTrigger = undefined
            fullPage[0].scrollIntoView()
            callDisplayTransaction()
        } else if (countTrigger <= 7) {
            Array.from(showingTrigger).forEach(trigger => {
                trigger.classList.remove('show')
            })
            Array.from(trgger1Class).forEach(trigger => {
                trigger.classList.add('show')
            })
        } else if (countTrigger <= 14) {
            Array.from(showingTrigger).forEach(trigger => {
                trigger.classList.remove('show')
            })
            Array.from(trgger2Class).forEach(trigger => {
                trigger.classList.add('show')
            })
        } else if (countTrigger <= 21) {
            Array.from(showingTrigger).forEach(trigger => {
                trigger.classList.remove('show')
            })
            Array.from(trgger3Class).forEach(trigger => {
                trigger.classList.add('show')
            })
        } else if (countTrigger > 18) {
            countTrigger = undefined
            var triggerBottom = window.innerHeight / 5 * 4;
            fullPage[2].scrollIntoView()
            Array.from(block3Item).forEach(item => {
                if (!item.classList.contains('process-active')) {
                    if (item.getBoundingClientRect().top < triggerBottom) {
                        item.classList.add('process-active')
                        loadingBlock3(0)
                    }
                }
            })
        }
    })

}

function handleInBlock3(fullPage) {
    fullPage[2].addEventListener('wheel', function(event) {
        preventScroll(event)
        if (event.deltaY < 0) {
            countTrigger = 18
            fullPage[1].scrollIntoView()
       } else if (event.deltaY > 0) {
            fullPage[3].scrollIntoView()
       }
    })
}

function handleInBlock4(fullPage) {
    fullPage[3].addEventListener('wheel', function(event) {
        preventScroll(event)
        if (event.deltaY < 0) {
            fullPage[2].scrollIntoView()
       } else if (event.deltaY > 0) {
            fullPage[4].scrollIntoView()
            callDisplayTransaction()
       }
    })
}

function handleInBlock5(fullPage) {
    fullPage[4].addEventListener('wheel', function(event) {
        if (event.deltaY < 0){
            if (fullPage[4].getBoundingClientRect().top <= 20) {
                fullPage[3].scrollIntoView()
            }
       }
    })
}

function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
}