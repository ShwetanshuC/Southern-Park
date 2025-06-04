
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


const trialBtn = document.getElementById("bookTrialBtn");
const dropdown = document.getElementById("trialDropdown");

if (trialBtn && dropdown) {
  trialBtn.addEventListener("click", () => {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      setTimeout(() => {
        dropdown.classList.add("d-none");
      }, 300);
    } else {
      dropdown.classList.remove("d-none");
      setTimeout(() => {
        dropdown.classList.add("show");
      }, 10);
    }
  });
}

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function(){
  let items = document.querySelectorAll('.item');
  document.querySelector('.box').appendChild(items[0]);
});
prev.addEventListener('click', function(){
  let items = document.querySelectorAll('.item');
  document.querySelector('.box').prepend(items[items.length - 1]);
});

const mainSelect = document.getElementById("floatingSelect");
const secondDropdown = document.getElementById("secondDropdown");
const subSelect = document.getElementById("floatingSubSelect");
const submitContainer = document.getElementById("submitContainer");
const submitBtn = document.getElementById("submitBtn");

const subOptions = {
  "1": ["","Any (no preference)", "Dr. Michael Lehtinen", "Sharon Stricklin"],
  "2": ["","Any (no preference)", "Clark Fan", "Little Guy"],
  "3": ["","Any (no preference)", "Ashmita", "Ayse"]
};

const redirectMap = {
  "1": {
    "q2": "https://calendar.app.google/v97sZ3md95nN26Kv6",
    "q3": "https://calendar.app.google/U33yx39UWrgDgsK6A",
    "q4": "https://calendar.app.google/r56zZ2W88YJCszSHA"
  },
  "2": {
    "q2": "https://example.com/piano-type",
    "q3": "https://example.com/piano-reading",
    "q4": "https://example.com/piano-theory"
  },
  "3": {
    "q2": "https://example.com/guitar-type",
    "q3": "https://example.com/guitar-chords",
    "q4": "https://example.com/guitar-genre"
  }
};

if (mainSelect && secondDropdown && subSelect && submitContainer && submitBtn) {
  mainSelect.addEventListener("change", () => {
    const selected = mainSelect.value;
    const questions = subOptions[selected] || [];

    subSelect.innerHTML = "";
    questions.forEach((q, index) => {
      const opt = document.createElement("option");
      opt.value = `q${index + 1}`;
      opt.textContent = q;
      subSelect.appendChild(opt);
    });

    if (secondDropdown.classList.contains("d-none")) {
      secondDropdown.classList.remove("d-none");
      setTimeout(() => secondDropdown.classList.add("show"), 10);
    }
  });

  subSelect.addEventListener("change", () => {
    if (submitContainer.classList.contains("d-none")) {
      submitContainer.classList.remove("d-none");
    }
  });

  submitBtn.addEventListener("click", () => {
    const mainVal = mainSelect.value;
    const subVal = subSelect.value;

    const target = redirectMap[mainVal]?.[subVal];
    if (target) {
      window.open(target, "_blank");
    }
  });
}

submitBtn.addEventListener("click", () => {
  const mainVal = mainSelect.value;
  const subVal = subSelect.value;

  const target = redirectMap[mainVal]?.[subVal];
  if (target) {
    // Open the appropriate link
    window.open(target, "_blank");

    // Close the offcanvas menu
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) offcanvasInstance.hide();

    // Show success alert
    const alert = document.getElementById("submissionAlert");
    if (alert) {
      alert.classList.remove("d-none");
      setTimeout(() => {
        alert.classList.add("d-none");
      }, 4000); // hide after 4 seconds
    }
  }
});
