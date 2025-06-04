window.addEventListener('DOMContentLoaded', () => {
  let banner = document.querySelector('.banner');
  if (!banner) return;

  if (window.innerWidth <= 768) {
    banner.style.setProperty('--circle-size', '20px');

    let posX = 100;
    let posY = 100;
    let velX = 2;
    let velY = 2;

    function animateCircle() {
      const rect = banner.getBoundingClientRect();

      posX += velX;
      posY += velY;

      if (posX <= 0 || posX >= rect.width) velX *= -1;
      if (posY <= 0 || posY >= rect.height) velY *= -1;

      banner.style.setProperty('--x', posX + 'px');
      banner.style.setProperty('--y', posY + 'px');

      requestAnimationFrame(animateCircle);
    }

    animateCircle();
  } else {
    banner.style.setProperty('--circle-size', '80px');
    banner.addEventListener('mousemove', function(e) {
      let x = e.pageX - banner.offsetLeft;
      let y = e.pageY - banner.offsetTop;
      banner.style.setProperty('--x', x + 'px');
      banner.style.setProperty('--y', y + 'px');
    });
  }

  //slide

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const slider = document.querySelector(".box");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const sliderItems = document.querySelectorAll(".box .item");

  sliderItems.forEach(item => {
    // Touch support
    item.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    item.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      handleSwipe(endX - startX);
    });

    // Mouse support
    item.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    item.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    item.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      handleSwipe(currentX - startX);
    });

    item.addEventListener("mouseleave", () => {
      if (!isDragging) return;
      isDragging = false;
      handleSwipe(currentX - startX);
    });
  });

  function addSwipeAnimation(direction) {
    slider.classList.add("swipe-transition");
    slider.style.transform = `translateX(${direction === 'left' ? '-50px' : '50px'})`;

    setTimeout(() => {
      slider.style.transform = `translateX(0)`;
      slider.classList.remove("swipe-transition");
    }, 150);
  }

  function handleSwipe(deltaX) {
    const swipeThreshold = 50;
    if (deltaX > swipeThreshold) {
      addSwipeAnimation("right");
      prevBtn.click();
    } else if (deltaX < -swipeThreshold) {
      addSwipeAnimation("left");
      nextBtn.click();
    }
  }
});
