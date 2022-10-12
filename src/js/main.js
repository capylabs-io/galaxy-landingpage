const tranactionBlock1 = document.getElementsByClassName("display-transation-1");
const tranactionItems = document.getElementsByClassName("display-transation");
const block3Item = document.getElementsByClassName("block-3");
const trgger1Class = document.getElementsByClassName("trigger-1");
const trgger2Class = document.getElementsByClassName("trigger-2");
const trgger3Class = document.getElementsByClassName("trigger-3");
const showingTrigger = document.getElementsByClassName("trigger show");
const fullPageObject = document.getElementsByClassName("fullpage");
const textBlock2 = document.getElementsByClassName('text-trigger');
const triggerBottom = (window.innerHeight / 5) * 4;
var timer;
var countTrigger = 0;
var isUserScrolling = false;

//menu
function toggleMenu() {
  var dropdownMenu = document.getElementById("dropdown-menu");
  if (dropdownMenu.classList.contains("show-menu")) dropdownMenu.classList.remove("show-menu");
  else dropdownMenu.classList.add("show-menu");
}

function goToFooter() {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
}

window.onclick = function (event) {
  if (event.target.id != "menu-button") {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show-menu")) {
        openDropdown.classList.remove("show-menu");
      }
    }
  }
};

window.onload = (event) => {
  const fullPageObjectArr = Array.from(fullPageObject);
  callDisplayTransaction(tranactionBlock1);
  handleInBlock1(fullPageObjectArr);
  handleInBlock2(fullPageObjectArr);
  fullPageObjectArr[3].addEventListener("scroll", function (event) {
    callDisplayTransaction(tranactionItems);
  });
  // handleInBlock3(fullPageObjectArr);
  if (window.innerWidth < 1179) {
    loadingBlock3(0);
  }
  
};

window.addEventListener("scroll", function (event) {
  if (window.innerWidth > 1179) {
  let triggerForBlock2 = Array.from(fullPageObject)[1].scrollHeight + 0.75*window.innerHeight;
    if (window.screenY <= triggerForBlock2 && window.screenY >= Array.from(fullPageObject)[1].scrollHeight*0.75) {
      debounce(handleScroll, 500);
      countTrigger = 2;
      fullPage[1].scrollIntoView({ behavior: "smooth" });
    }
  }
  callDisplayTransaction(tranactionItems);
});
function debounce(method, delay) {
  clearTimeout(method._tId);
  method._tId= setTimeout(function(){
      method();
  }, delay);
}
function callDisplayTransaction(tranactionItems) {
  Array.from(tranactionItems).forEach((item) => {
    let itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
}
function onClickLoadBlock3(index) {
  clearTimeout(timer);
  loadingBlock3(index);
}

async function loadingBlock3(index) {
  let processBar;
  let activeElement;
  if (window.innerWidth >= 1180) {
    processBar = Array.from(document.getElementsByClassName("slide"));
    activeElement = Array.from(document.getElementsByClassName("slide active"));
  } else {
    processBar = Array.from(document.getElementsByClassName("block-2-m-slide"));
    activeElement = Array.from(document.getElementsByClassName("block-2-m-slide active"));
  }
  if (index >= 3) {
    index = 0;
  }
  // active class remove
  activeElement.forEach((item) => {
    item.classList.remove('active');
  });
  // add active class
  processBar[index].classList.add('active');
  if (window.innerWidth < 1179) {
    processBar[index+3].classList.add('active');
  }
  
  timer = setTimeout(function () {
    loadingBlock3(index + 1, false);
  }, 5000);
}

// fullpage
function handleInBlock1(fullPage) {
  fullPage[0].addEventListener("wheel", function (event) {
    preventScroll(event);
    if (event.deltaY > 0) {
      countTrigger = 0;
      fullPage[1].scrollIntoView({ behavior: "smooth" });
      Array.from(textBlock2).forEach(item => {
        item.classList.add('move-from-bottom');
      })
      Array.from(tranactionBlock1).forEach((item) => {
        item.classList.remove("show");
      });
      Array.from(trgger1Class).forEach((trigger) => {
        trigger.classList.add("show");
      });
    }
  });
}

function handleInBlock2(fullPage) {
  fullPage[1].addEventListener("wheel", function (e) {
    if (countTrigger <= 2) preventScroll(e);
    if (e.deltaY > 0 && !isUserScrolling) {
      isUserScrolling = true;
      countTrigger++;
      setTimeout(function () {
        isUserScrolling = false;
      }, 800);
    } else if (e.deltaY < 0 && !isUserScrolling) {
      isUserScrolling = true;
      countTrigger--;
      setTimeout(function () {
        isUserScrolling = false;
      }, 800);
      // if (countTrigger <= -2) preventScroll(e);
    }
    if (countTrigger <= -1) {
      countTrigger = -2;
      fullPage[0].scrollIntoView({ behavior: "smooth" });
      callDisplayTransaction(tranactionBlock1);
      Array.from(textBlock2).forEach(item => {
        item.classList.remove('move-from-bottom');
      })
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
      });
    } else if (countTrigger == 0) {
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
      });
      Array.from(trgger1Class).forEach((trigger) => {
        trigger.classList.add("show");
      });
      fullPage[1].scrollIntoView({ behavior: "smooth" });
    } else if (countTrigger == 1) {
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
      });
      Array.from(trgger2Class).forEach((trigger) => {
        trigger.classList.add("show");
      });
      fullPage[1].scrollIntoView({ behavior: "smooth" });
    } else if (countTrigger == 2) {
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
      });
      Array.from(trgger3Class).forEach((trigger) => {
        trigger.classList.add("show");
      });
      fullPage[1].scrollIntoView();
    } else if (countTrigger > 2) {
      countTrigger = 3;
      var triggerBottom = (window.innerHeight / 5) * 4;
      Array.from(block3Item).forEach((item) => {
        if (!item.classList.contains("process-active")) {
          if (item.getBoundingClientRect().top < triggerBottom) {
            item.classList.add("process-active");
            loadingBlock3(0);
          }
        }
      });
    }
  });
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
