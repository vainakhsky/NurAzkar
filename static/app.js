(function () {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const menuDropdown = document.getElementById("menuDropdown");
  const installBtn = document.getElementById("installBtn");
  const installCard = document.getElementById("installCard");

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
    themeToggle.addEventListener("click", () => {
      const next = body.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener("click", () => {
      menuDropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-wrap")) {
        menuDropdown.classList.remove("open");
      }
    });
  }

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installCard) installCard.hidden = false;
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (installCard) installCard.hidden = true;
    });
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/static/service-worker.js").catch(() => {});
    });
  }

  function parseRepeat(value) {
    const match = String(value || "1").match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }

  function initCounters() {
    const cards = document.querySelectorAll(".azkar-card");

    cards.forEach((card, index) => {
      const target = parseRepeat(card.dataset.repeat);
      const countValue = card.querySelector(".count-value");
      const targetValue = card.querySelector(".target-value");
      const ringFill = card.querySelector(".ring-fill");
      const plusBtn = card.querySelector(".plus-btn");
      const minusBtn = card.querySelector(".minus-btn");
      const resetBtn = card.querySelector(".reset-btn");

      if (!countValue  !targetValue  !ringFill) return;

      const storageKey = "nurazkar-counter-" + location.pathname + "-" + index;
      let current = parseInt(localStorage.getItem(storageKey) || "0", 10);

      const radius = 52;
      const circumference = 2 * Math.PI * radius;

      function render() {
        targetValue.textContent = target;
        countValue.textContent = current;

        const progress = Math.min(current / target, 1);
        const offset = circumference - progress * circumference;

        ringFill.style.strokeDasharray = circumference.toFixed(2);
        ringFill.style.strokeDashoffset = offset.toFixed(2);
      }

      function save() {
        localStorage.setItem(storageKey, String(current));
        render();
      }

      plusBtn?.addEventListener("click", () => {
        current += 1;
        save();
      });

      minusBtn?.addEventListener("click", () => {
        current = Math.max(0, current - 1);
        save();
      });

      resetBtn?.addEventListener("click", () => {
        current = 0;
        save();
      });

      render();
    });
  }

  initCounters();
})();
