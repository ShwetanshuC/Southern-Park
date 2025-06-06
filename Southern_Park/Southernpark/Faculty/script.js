document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  let currentIndex = 0;

  const showPage = (index) => {
    pages.forEach((page, i) => {
      page.style.display = i === index ? "block" : "none";
    });

    window.scrollTo(0, 0);

    const arrowUp = document.getElementById("arrow-up");
    const arrowDown = document.getElementById("arrow-down");

    if (arrowUp) arrowUp.style.display = index > 0 ? "flex" : "none";
    if (arrowDown) arrowDown.style.display = index < pages.length - 1 ? "flex" : "none";
  };

  const arrowDown = document.getElementById("arrow-down");
  const arrowUp = document.getElementById("arrow-up");

  // Ensure the arrows are explicitly shown on DOM load in case hidden by default in CSS
  if (arrowUp) arrowUp.style.display = "flex";
  if (arrowDown) arrowDown.style.display = "flex";

  if (arrowDown) {
    arrowDown.addEventListener("click", () => {
      if (currentIndex < pages.length - 1) {
        currentIndex++;
        showPage(currentIndex);
      }
    });
  }

  if (arrowUp) {
    arrowUp.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showPage(currentIndex);
      }
    });
  }

  let scrolling = false;
  const scrollThreshold = 100;

  window.addEventListener("wheel", (e) => {
    if (scrolling) return;

    if (e.deltaY > scrollThreshold && currentIndex < pages.length - 1) {
      scrolling = true;
      currentIndex++;
      showPage(currentIndex);
      setTimeout(() => scrolling = false, 500);
    } else if (e.deltaY < -scrollThreshold && currentIndex > 0) {
      scrolling = true;
      currentIndex--;
      showPage(currentIndex);
      setTimeout(() => scrolling = false, 500);
    }
  });

  showPage(currentIndex);
});