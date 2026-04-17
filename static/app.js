(function () {
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    const savedTheme = localStorage.getItem("nurazkar-theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("nurazkar-theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
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
