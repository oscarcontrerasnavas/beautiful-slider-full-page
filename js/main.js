// Glide
let startAt = 0;

new Glide(".glide", {
  type: "carousel",
  startAt,
  animationTimingFunction: "ease-in-out",
  perView: 3,
  gap: 30,
}).mount();

// Sync control buttons
let background = document.getElementById("background");
let indices = document.querySelectorAll(".index");
let descriptions = document.querySelectorAll(".description");
let bgImages = ["Tayrona.jpg", "Guatape.jpg", "Cocora.jpg", "Cartagena.jpg"];
let currentIndex = startAt;
let maxLength = indices.length - 1;

// Animations
let animations = [
  new hoverEffect({
    parent: background,
    intensity: 0.1,
    image1: `../assets/${bgImages[0]}`,
    image2: `../assets/${bgImages[1]}`,
    displacementImage: "../assets/displacement/14.jpg",
  }),
  new hoverEffect({
    parent: background,
    intensity: 0.1,
    image1: `../assets/${bgImages[1]}`,
    image2: `../assets/${bgImages[2]}`,
    displacementImage: "../assets/displacement/14.jpg",
  }),
  new hoverEffect({
    parent: background,
    intensity: 0.1,
    image1: `../assets/${bgImages[2]}`,
    image2: `../assets/${bgImages[3]}`,
    displacementImage: "../assets/displacement/14.jpg",
  }),
  new hoverEffect({
    parent: background,
    intensity: 0.1,
    image1: `../assets/${bgImages[3]}`,
    image2: `../assets/${bgImages[0]}`,
    displacementImage: "../assets/displacement/14.jpg",
  }),
];

const animate = () => {
  indices.forEach((index) => index.classList.remove("active"));
  indices[currentIndex].classList.add("active");
  descriptions.forEach((index) => index.classList.remove("active"));
  descriptions[currentIndex].classList.add("active");
};

// Previous
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = currentIndex - 1 < 0 ? maxLength : currentIndex - 1;
  animations[currentIndex].next(); // Not the previous
  setTimeout(() => {
    let canvas = background.querySelectorAll("canvas");
    background.insertBefore(canvas[maxLength], background.firstChild);
    animations[currentIndex].previous();
  }, 500);
  animate();
});

// Next
document.getElementById("next").addEventListener("click", () => {
  let prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % 4;
  animations[prevIndex].next();

  /**
   * Since the canvas are stack one over the other, we need to move the first element to
   * the bottom in order to be able to see the animation for the next slide.
   */
  setTimeout(() => {
    let canvas = background.querySelectorAll("canvas");
    background.appendChild(canvas[0]);
    animations[prevIndex].previous();
  }, 1200);
  animate();
});
