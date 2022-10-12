const tranactionBlock1 = document.getElementsByClassName("display-transation-1");
const tranactionItems = document.getElementsByClassName("display-transation");
const block3Item = document.getElementsByClassName("block-3");
const trgger1Class = document.getElementsByClassName("trigger-1");
const trgger2Class = document.getElementsByClassName("trigger-2");
const trgger3Class = document.getElementsByClassName("trigger-3");
const showingTrigger = document.getElementsByClassName("trigger show");
const fullPageObject = document.getElementsByClassName("fullpage");
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
  handleInBlock3(fullPageObjectArr);
};

window.addEventListener("scroll", function (event) {
  callDisplayTransaction(tranactionItems);
});
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
  const processBar = Array.from(document.getElementsByClassName("slide"));
  let activeElement = Array.from(document.getElementsByClassName("slide active"));
  if (index >= processBar.length) {
    index = 0;
  }
  // active class remove
  activeElement.forEach((item) => {
    item.classList.remove("active");
  });
  // add active class
  processBar[index].classList.add("active");
  timer = setTimeout(function () {
    loadingBlock3(index + 1, false);
  }, 5000);
}

// fullpage
function handleInBlock1(fullPage) {
  fullPage[0].addEventListener("wheel", function (event) {
    preventScroll(event);
    if (event.deltaY > 0) {
      countTrigger = -1;
      fullPage[1].scrollIntoView({ behavior: "smooth" });
    }
  });
}

function handleInBlock2(fullPage) {
  fullPage[1].addEventListener("wheel", function (e) {
    // block 1 - image hidden
    if (countTrigger <= 2) preventScroll(e);
    let block1Img = Array.from(document.getElementsByClassName("bl1-img"));
    block1Img.forEach((item) => {
      item.classList.remove("show");
    });
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

    if (countTrigger < -1) {
      countTrigger = -2;
      fullPage[0].scrollIntoView({ behavior: "smooth" });
      callDisplayTransaction(tranactionItems);
    } else if (countTrigger == -1) {
      fullPage[1].scrollIntoView({ behavior: "smooth" });
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
    } else if (countTrigger == 1) {
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
      });
      Array.from(trgger2Class).forEach((trigger) => {
        trigger.classList.add("show");
      });
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

function handleInBlock3(fullPage) {
  fullPage[2].addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      if (fullPage[2].getBoundingClientRect().top < 0) {
        fullPage[1].scrollIntoView({ behavior: "smooth" });
        countTrigger = 2;
        preventScroll(event);
      }
    }
  });
}

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
