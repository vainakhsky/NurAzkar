(function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const menuDropdown = document.getElementById("menuDropdown");

  const THEME_KEY = "nurazkar-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = body.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menuDropdown.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".menu-wrap")) {
        menuDropdown.classList.remove("open");
      }
    });
  }

  function parseRepeat(value) {
    const match = String(value || "1").match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }

  function initCounters() {
    const cards = document.querySelectorAll(".azkar-card");

    cards.forEach(function (card, index) {
      const target = parseRepeat(card.dataset.repeat);
      const countValue = card.querySelector(".count-value");
      const targetValue = card.querySelector(".target-value");
      const ringFill = card.querySelector(".ring-fill");
      const plusBtn = card.querySelector(".plus-btn");
      const minusBtn = card.querySelector(".minus-btn");
      const resetBtn = card.querySelector(".reset-btn");

      if (!countValue  !targetValue  !ringFill) {
        return;
      }

      const radius = 52;
      const circumference = 2 * Math.PI * radius;
      const storageKey = "nurazkar-counter-" + location.pathname + "-" + index;

      let current = parseInt(localStorage.getItem(storageKey) || "0", 10);
      if (isNaN(current)) current = 0;

      function render() {
        countValue.textContent = current;
        targetValue.textContent = target;

        const progress = Math.min(current / target, 1);
        const offset = circumference - progress * circumference;

        ringFill.style.strokeDasharray = String(circumference);
        ringFill.style.strokeDashoffset = String(offset);
      }

      function save() {
        localStorage.setItem(storageKey, String(current));
        render();
      }

      if (plusBtn) {
        plusBtn.addEventListener("click", function () {
          current += 1;
          save();
        });
      }

      if (minusBtn) {
        minusBtn.addEventListener("click", function () {
          current = Math.max(0, current - 1);
          save();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          current = 0;
          save();
        });
      }

      render();
    });
  }

  initCounters();
})();
