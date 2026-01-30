// Premium portfolio behaviors: theme, mobile menu, reveal on scroll, utilities

(function () {
    const root = document.documentElement;
  
    // -------- Theme
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const savedTheme = localStorage.getItem("theme");
  
    function setTheme(theme) {
      if (theme === "light") {
        root.setAttribute("data-theme", "light");
        themeIcon.textContent = "☀";
      } else {
        root.removeAttribute("data-theme");
        themeIcon.textContent = "☾";
      }
      localStorage.setItem("theme", theme);
    }
  
    // Default: dark (no attribute). If user saved light, apply.
    if (savedTheme === "light") setTheme("light");
    else setTheme("dark");
  
    themeToggle?.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      setTheme(isLight ? "dark" : "light");
    });
  
    // -------- Mobile Menu
    const menuBtn = document.getElementById("menuBtn");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile__link");
  
    function openMenu() {
      mobileMenu.classList.add("open");
      mobileMenu.setAttribute("aria-hidden", "false");
    }
    function closeMenu() {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  
    menuBtn?.addEventListener("click", openMenu);
    closeMenuBtn?.addEventListener("click", closeMenu);
    mobileMenu?.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
    mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));
  
    // -------- Reveal on scroll
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("show");
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  
    // -------- Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // -------- Copy email
    const copyBtn = document.getElementById("copyEmailBtn");
    const copyMsg = document.getElementById("copyMsg");
    const email = "your.email@example.com"; // <-- change this
  
    copyBtn?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        if (copyMsg) copyMsg.textContent = "Email copied to clipboard.";
        setTimeout(() => { if (copyMsg) copyMsg.textContent = ""; }, 2000);
      } catch {
        if (copyMsg) copyMsg.textContent = "Copy failed. Please select and copy manually.";
      }
    });
  })();
  