const tranactionBlock1 = document.getElementsByClassName("display-transation-1");
const tranactionItems = document.getElementsByClassName("display-transation");
const trgger1Class = document.getElementsByClassName("trigger-1");
const trgger2Class = document.getElementsByClassName("trigger-2");
const trgger3Class = document.getElementsByClassName("trigger-3");
const showingTrigger = document.getElementsByClassName("trigger show");
const fullPageObject = document.getElementsByClassName("fullpage");
const textBlock2 = document.getElementsByClassName("text-trigger");
const triggerBottom = (window.innerHeight / 5) * 4;
var timer;
var timer2;
var countTrigger = 0;
var isUserScrolling = false;
var oldPrice = 0;
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 4
});

//menu
function toggleMenu() {
  var dropdownMenu = document.getElementById("dropdown-menu");
  if (dropdownMenu.classList.contains("show-menu")) dropdownMenu.classList.remove("show-menu");
  else dropdownMenu.classList.add("show-menu");
}
//menu molbie
function toggleMenuMobile() {
  var dropdownMenu = document.getElementById("m-dropdown-menu");
  if (dropdownMenu.classList.contains("show-menu")) dropdownMenu.classList.remove("show-menu");
  else dropdownMenu.classList.add("show-menu");
}

function goToFooter() {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
}

function goToSocialWallet() {
  document.getElementById("social-wallet-web3").scrollIntoView({ behavior: "smooth" });
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
  document.getElementById('video-player').controls = false;
  getGalaxyTokenInfo();
  Array.from(tranactionBlock1).forEach((item) => {
      item.classList.add("show");
  });
  
  if (window.innerWidth >= 1196) {
    const fullPageObjectArr = Array.from(fullPageObject);
    handleInBlock1(fullPageObjectArr);
    handleInBlock2(fullPageObjectArr);
    handleInBlock3(fullPageObjectArr);
    // handleInBlock3(fullPageObjectArr);
  } else {
    loadingBlock3(0);
    loadingBlock7(0);
  }
};

const getGalaxyTokenInfo = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=galaxy-finance&vs_currencies=usd&include_24hr_change=true');
  // const myJson = await response.json(); //extract JSON from the http response
  // const response = await fetch('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
  //   method: 'POST',
  //   headers: {
  //     'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c'
  //   }
  // });
  const myJson = await response.json();
  let price = formatter.format(myJson["galaxy-finance"].usd);
  let change = parseFloat(myJson["galaxy-finance"].usd_24h_change).toFixed(2)
  document.getElementById("price-usd").innerHTML=price;
  document.getElementById("price-change").innerHTML=change+"%";
  if (change < 0) {
    document.getElementById("price-change-arrow").classList.remove("price-change-up");
    document.getElementById("price-change-arrow").classList.add("price-change-down");
  } else {
    document.getElementById("price-change-arrow").classList.add("price-change-up");
    document.getElementById("price-change-arrow").classList.remove("price-change-down");
  }
  timer = setTimeout(function () {
    getGalaxyTokenInfo();
  }, 50000);
}

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
function iphone14Transaction() {
  var block1Iphone = document.getElementById("block1-iphone");
  if (block1Iphone.classList.contains("display-iphone-14-pro")) {
    block1Iphone.classList.remove("display-iphone-14-pro");
  }
  void block1Iphone.offsetWidth;
  block1Iphone.classList.add("display-iphone-14-pro");
}
function onClickLoadBlock3(index) {
  clearTimeout(timer);
  loadingBlock3(index);
}

async function loadingBlock3(index) {
  let processBar;
  let activeElement;
  if (window.innerWidth >= 1196) {
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
    item.classList.remove("active");
  });
  // add active class
  processBar[index].classList.add("active");
  if (window.innerWidth < 1196) {
    processBar[index + 3].classList.add("active");
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
      Array.from(textBlock2).forEach((item) => {
        item.classList.add("move-from-bottom");
      });
      Array.from(tranactionBlock1).forEach((item) => {
        item.classList.remove("show");
      });
      Array.from(showingTrigger).forEach((trigger) => {
        trigger.classList.remove("show");
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
      iphone14Transaction();
      Array.from(textBlock2).forEach((item) => {
        item.classList.remove("move-from-bottom");
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
      clearTimeout(timer);
      loadingBlock3(0);
      fullPage[2].classList.add('processimg');
    }
  });
}
function handleInBlock3(fullPage) {
  fullPage[2].addEventListener("wheel", function (e) {
    if (!fullPage[2].classList.contains('processimg')) {
      loadingBlock3(0);
      fullPage[2].classList.add('processimg');
      countTrigger = 3;
      isUserScrolling = false;
    }
  })
}
function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

//Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl);
});
function openPrivacyModal() {
  document.getElementById('privacyModal').style.display='block';
  document.body.style.overflowY = "hidden";
}

function closePrivacyModal() {
  document.getElementById('privacyModal').style.display='none'
  document.body.style.overflowY = "auto";
}

function openTermsModal() {
  document.getElementById('termsModal').style.display='block';
  document.body.style.overflowY = "hidden";
}
function closeTermsModal() {
  document.getElementById('termsModal').style.display='none'
  document.body.style.overflowY = "auto";
}
function openCookiesModal() {
  document.getElementById('cookiesModal').style.display='block';
  document.body.style.overflowY = "hidden";
}

function closeCookiesModal() {
  document.getElementById('cookiesModal').style.display='none'
  document.body.style.overflowY = "auto";
}

function openCCPAModal() {
  document.getElementById('ccpaModal').style.display='block';
  document.body.style.overflowY = "hidden";
}
function closeCCPAModal() {
  document.getElementById('ccpaModal').style.display='none'
  document.body.style.overflowY = "auto";
}

function loadingBlock7(index) {
  let processBar = Array.from(document.getElementsByClassName("block-7-m-slide"));;
  let activeElement = Array.from(document.getElementsByClassName("block-7-m-slide active"));
  if (index >= 3) {
    index = 0;
  }
  // active class remove
  activeElement.forEach((item) => {
    item.classList.remove("active");
  });
  // add active class
  processBar[index].classList.add("active");
  processBar[index + 3].classList.add("active");

  timer2 = setTimeout(function () {
    loadingBlock7(index + 1);
  }, 5000);
}
function onClickLoadBlock7(index) {
  clearTimeout(timer2);
  loadingBlock7(index);
}