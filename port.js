document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
  });
  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuButton.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

startField(document.querySelector(".field"));

/*
 * The hero's ASCII field: raw request noise on the left resolves into
 * ordered rows on the right, where the profile it produces sits.
 * One canvas, an 8 by 16 cell, 30 fps, paused off screen, and one
 * composed still under reduced motion.
 */
function startField(canvas) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const styles = getComputedStyle(document.documentElement);
  const tints = ["--color-glyph-1", "--color-glyph-2", "--color-glyph-3", "--color-glyph-4", "--color-accent-deep"]
    .map((name) => styles.getPropertyValue(name).trim());
  const ramp = " .:-=+*#%@";
  const cellW = 8;
  const cellH = 16;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let cols = 0;
  let rows = 0;
  let running = false;
  let visible = true;
  let last = 0;
  let pointer = null;
  const start = performance.now();

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.font = `12px ${styles.getPropertyValue("--font-outlier").trim() || "monospace"}`;
    ctx.textBaseline = "top";
    cols = Math.ceil(width / cellW);
    rows = Math.ceil(height / cellH);
  }

  function noise(x, y, t) {
    return (
      Math.sin(x * 0.21 + t * 1.3) * 0.5 +
      Math.sin(y * 0.37 - t * 0.9) * 0.3 +
      Math.sin((x + y) * 0.13 + t * 0.6) * 0.2
    );
  }

  function draw(time) {
    const t = (time - start) / 1000;
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const progress = x / cols;
        // Left: raw, turbulent traffic. Right: settled into ordered rows.
        const order = Math.min(1, Math.max(0, (progress - 0.25) / 0.5));
        const raw = (noise(x, y, t) + 1) / 2;
        const settled = y % 3 === 0 ? 0.55 : 0.08;
        let value = raw * (1 - order) + settled * order;
        if (pointer) {
          const dx = (x * cellW - pointer.x) / 90;
          const dy = (y * cellH - pointer.y) / 90;
          value += Math.max(0, 0.45 - (dx * dx + dy * dy) * 0.45);
        }
        if (progress > 0.82) value *= 0.35; // keep the densest cells away from the panel
        const index = Math.min(ramp.length - 1, Math.floor(value * ramp.length));
        if (index < 1) continue;
        ctx.fillStyle = tints[Math.min(tints.length - 1, Math.floor(value * tints.length))];
        ctx.fillText(ramp[index], x * cellW, y * cellH + 2);
      }
    }
  }

  function loop(time) {
    if (!running) return;
    if (time - last > 33) {
      draw(time);
      last = time;
    }
    requestAnimationFrame(loop);
  }

  function update() {
    const shouldRun = visible && !reduceMotion.matches && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      requestAnimationFrame(loop);
    } else if (!shouldRun) {
      running = false;
      draw(start + 2400);
    }
  }

  resize();
  draw(start + 2400);
  update();

  window.addEventListener("resize", () => { resize(); draw(performance.now()); }, { passive: true });
  document.addEventListener("visibilitychange", update);
  reduceMotion.addEventListener?.("change", update);
  canvas.parentElement.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
  }, { passive: true });
  canvas.parentElement.addEventListener("pointerleave", () => { pointer = null; }, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }).observe(canvas);
  }
}
