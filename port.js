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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) loadMotion();

async function loadMotion() {
  try {
    const { animate, createTimeline, stagger } = await import(
      "https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm"
    );
    const heroWords = splitHeroHeading();
    document.body.classList.add("anime-ready");
    animateHero(createTimeline, stagger, heroWords);
    observeProjects(createTimeline, stagger);
    observeSections(animate);
    addHoverMotion(animate);
  } catch (error) {
    document.body.classList.remove("anime-ready");
    console.warn("Motion unavailable. The portfolio remains fully usable.", error);
  }
}

function splitHeroHeading() {
  const heading = document.querySelector("#hero-title");
  if (!heading) return [];
  const label = heading.textContent.trim();
  heading.setAttribute("aria-label", label);
  heading.textContent = "";

  label.split(/\s+/).forEach((word, index, words) => {
    const clip = document.createElement("span");
    const wordElement = document.createElement("span");
    clip.className = "word-clip";
    clip.setAttribute("aria-hidden", "true");
    wordElement.className = "hero-word";
    wordElement.textContent = word;
    clip.appendChild(wordElement);
    heading.appendChild(clip);
    if (index < words.length - 1) heading.append(" ");
  });
  return heading.querySelectorAll(".hero-word");
}

function animateHero(createTimeline, stagger, heroWords) {
  createTimeline({ defaults: { ease: "out(3)" } })
    .add(heroWords, { opacity: [0, 1], y: ["110%", "0%"], duration: 680, delay: stagger(48) })
    .add(".hero-intro", { opacity: [0, 1], y: [16, 0], duration: 480 }, "-=360")
    .add(".hero-actions > *", { opacity: [0, 1], y: [12, 0], duration: 380, delay: stagger(70) }, "-=330")
    .add(".hero-system", { opacity: [0, 1], x: [24, 0], duration: 560 }, "-=420")
    .add(".system-list > div", { opacity: [0, 1], x: [12, 0], duration: 320, delay: stagger(55) }, "-=300")
    .add(".hero-index > span", { opacity: [0, 1], y: [8, 0], duration: 300, delay: stagger(45) }, "-=180");
}

function observeProjects(createTimeline, stagger) {
  const projects = document.querySelectorAll(".project");
  const run = (project) => animateProject(project, createTimeline, stagger);
  if (!("IntersectionObserver" in window)) return projects.forEach(run);

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      activeObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12%", threshold: 0.12 });
  projects.forEach((project) => observer.observe(project));
}

function animateProject(project, createTimeline, stagger) {
  const content = project.querySelectorAll(
    ".project-number, .project-main h3, .project-lead, .project-detail, .decision-grid > div, .stack > li, .project-actions > a"
  );
  const timeline = createTimeline({ defaults: { ease: "out(3)" } })
    .add(content, { opacity: [0, 1], y: [18, 0], duration: 430, delay: stagger(34) })
    .add(project.querySelector(".project-visual"), { opacity: [0, 1], x: [24, 0], duration: 520 }, "-=420");

  if (project.querySelector(".mint-visual")) {
    timeline
      .add(project.querySelectorAll(".flow-node"), { opacity: [0, 1], scaleX: [0.76, 1], duration: 380, delay: stagger(130) }, "-=260")
      .add(project.querySelector(".flow-line"), { opacity: [0, 1], scaleY: [0, 1], duration: 280 }, "-=270")
      .add(project.querySelectorAll(".flow-branches > div"), { opacity: [0, 1], y: [14, 0], duration: 320, delay: stagger(90) }, "-=120");
  }
  if (project.querySelector(".wattwise-visual")) {
    timeline
      .add(project.querySelector(".meter-readout strong"), { opacity: [0, 1], scale: [0.88, 1], duration: 420 }, "-=270")
      .add(project.querySelectorAll(".signal-bars i"), { scaleY: [0.08, 1], duration: 380, delay: stagger(38) }, "-=260")
      .add(project.querySelectorAll(".pipeline li"), { opacity: [0, 1], y: [12, 0], duration: 320, delay: stagger(100) }, "-=160");
  }
  if (project.querySelector(".civic-visual")) {
    timeline
      .add(project.querySelector(".scan-line"), { opacity: [0, 1], y: [0, 125], duration: 900, ease: "inOut(2)" }, "-=320")
      .add(project.querySelectorAll(".report-output > div"), { opacity: [0, 1], y: [10, 0], duration: 300, delay: stagger(100) }, "-=180");
  }
}

function observeSections(animate) {
  const elements = document.querySelectorAll(
    ".section-heading, .role, .tool-grid > div, .about-copy, .credentials, .contact-inner > *"
  );
  const run = (element) => animate(element, { opacity: [0, 1], y: [16, 0], duration: 480, ease: "out(3)" });
  if (!("IntersectionObserver" in window)) return elements.forEach(run);

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.closest(".project")) return;
      run(entry.target);
      activeObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10%", threshold: 0.1 });
  elements.forEach((element) => observer.observe(element));
}

function addHoverMotion(animate) {
  document.querySelectorAll(".button, .project-actions a, .nav-external").forEach((element) => {
    element.addEventListener("pointerenter", () => animate(element, { x: 4, duration: 180, ease: "out(3)" }));
    element.addEventListener("pointerleave", () => animate(element, { x: 0, duration: 220, ease: "out(3)" }));
  });
}
