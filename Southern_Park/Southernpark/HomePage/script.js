
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
});