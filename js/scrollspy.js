document.addEventListener("scroll", () => {
  const headings = document.querySelectorAll("article h2, article h3");
  const sidebarLinks = document.querySelectorAll(".hextra-sidebar-container a[href^='#']");
  let current = "";

  headings.forEach((heading) => {
    const top = heading.offsetTop - 120;
    if (scrollY >= top) current = heading.getAttribute("id");
  });

  sidebarLinks.forEach((link) => {
    link.classList.remove("hextra-sidebar-active-item");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("hextra-sidebar-active-item");
    }
  });
});
