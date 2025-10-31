// Fade-in animation khi cuộn
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("section, table, blockquote, img, div.fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});

// 🚀 Load dự án GitHub
fetch("https://api.github.com/users/RinhTran/repos?sort=updated&per_page=3")
  .then(res => res.json())
  .then(repos => {
    const html = repos.map(r => `
      <div style="margin-bottom: 1.5rem;">
        <h3><a href="${r.html_url}" target="_blank">${r.name}</a></h3>
        <p>${r.description || 'Không có mô tả.'}</p>
      </div>
    `).join("");
    document.getElementById("projects").innerHTML = html;
  });

// 📝 Load bài viết gần đây từ RSS (nếu blog có feed.xml)
fetch("https://RinhTran.github.io/feed.xml")
  .then(res => res.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = "";
    items.forEach((el, i) => {
      if (i < 3) {
        html += `
          <div style="margin-bottom: 1.2rem;">
            <h3><a href="${el.querySelector("link").textContent}" target="_blank">
              ${el.querySelector("title").textContent}</a></h3>
            <p>${el.querySelector("description")?.textContent?.slice(0, 100) || ''}...</p>
          </div>`;
      }
    });
    document.getElementById("blog-posts").innerHTML = html;
  })
  .catch(() => {
    document.getElementById("blog-posts").innerHTML = "<p>Không thể tải bài viết.</p>";
  });
