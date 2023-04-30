const characters = document.querySelectorAll(".character");
const stackCol = document.querySelector(".col-stack");

function offset(el) {
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

characters.forEach((character) => {
  character.addEventListener("touchstart", dragStart);
  character.addEventListener("touchmove", drag);
  character.addEventListener("touchend", dragEnd);
});

function dragStart(e) {
  e.preventDefault();

  active = true;

  initialX = e.touches[0].clientX - xOffset;
  initialY = e.touches[0].clientY - yOffset;
}

function drag(e) {
  e.preventDefault();
  if (active) {
    currentX = e.touches[0].clientX - initialX;
    currentY = e.touches[0].clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, e.target);
  }
}

function dragEnd(e) {
  active = false;

  const stackOffset = offset(stackCol);
  const characterOffset = offset(e.target);

  if (
    stackOffset.top < characterOffset.top &&
    characterOffset.top < stackOffset.top + stackCol.clientHeight
  ) {
    e.target.parentNode.removeChild(e.target);
    stackCol.appendChild(e.target);
    setTranslate(0, 0, e.target);
    e.target.style.position = "absolute";
    e.target.style.top = characterOffset.top - stackOffset.top + "px";
    e.target.style.left = characterOffset.left - stackOffset.left + "px";
    e.target.setAttribute(
      "src",
      "img/character_" + e.target.dataset.name + "_2.png"
    );

    triggerAnimation();
  } else {
    setTranslate(0, 0, e.target);
    xOffset = 0;
    yOffset = 0;
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function triggerAnimation() {
  document.querySelector(".main-content-wrapper").style.marginLeft = "-100%";
  document.querySelector(".main-content-wrapper2").classList.add("fade-out");
  setTimeout(function () {
    document
      .querySelector(".main-content-wrapper2")
      .classList.remove("fade-out");
  }, 1000);
  document.querySelector(".main-content-wrapper2").classList.add("fade-in");
  document.querySelector(".main-content-wrapper2").style.marginLeft = "-100%";
  setTimeout(function () {
    document
      .querySelector(".main-content-wrapper2")
      .classList.remove("fade-in");
  }, 3000);
  setTimeout(function () {
    document.querySelector(".main-content-wrapper2").style.marginLeft = "-200%";
  }, 8000);

  document.querySelector(".character-section").classList.add("fade-out");

  setTimeout(function () {
    document.querySelector(".character-section").style.marginLeft = "-100%";
  }, 1000);
  setTimeout(function () {
    document.querySelector(".character-section").classList.remove("fade-out");
  }, 3000);

  setTimeout(function () {
    document.querySelector(".character-section").style.marginLeft = "-200%";
  }, 6000);
}
