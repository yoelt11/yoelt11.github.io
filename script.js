// script.js
document.addEventListener("DOMContentLoaded", function () {
  const articlesButton = document.querySelector(".toggle-articles");
  const blogsButton = document.querySelector(".toggle-blogs");
  const projectsButton = document.querySelector(".toggle-projects");
  const articlesContainer = document.querySelector(".article-container");
  const blogsContainer = document.querySelector(".blog-container");
  const projectsContainer = document.querySelector(".project-container");

  // Populate with articles and projects
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      populateSection(articlesContainer, data.articles, "article");
      populateSection(blogsContainer, data.blogs, "blog");
      populateSection(projectsContainer, data.projects, "project");
    })
    .catch((error) => console.error("Error fetching data:", error));

  function populateSection(container, items, className) {
    items.forEach((item, index) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add(className);
      sectionDiv.setAttribute("data-state", index < 2 ? "show" : "hide"); // Set initial data-state

      // Check if className is 'blog' to render a link
      if (className === "blog" && item.info.includes("https://")) {
        const [link, date] = item.info.split(" · ");
        sectionDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p class="${className}-info">
            <a href="${link.trim()}" target="_blank">${link.trim()}</a> · ${date.trim()}
          </p>
        `;
      } else {
        sectionDiv.innerHTML = `
          <h3>${item.title}</h3>
          <p class="${className}-info">${item.info}</p>
        `;
      }

      container.appendChild(sectionDiv);
    });
  }

  // Generalized button function
  function toggleSection(button, container, className) {
    // Toggle visibility of hidden items on button click
    const hiddenItems = container.querySelectorAll(
      `.${className}[data-state="hide"]`,
    );
    const showItems = container.querySelectorAll(
      `.${className}[data-state="show"]`,
    );
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (!isExpanded) {
      hiddenItems.forEach((item) => {
        item.setAttribute("data-state", "show");
      });
    } else {
      const default_show = 2;
      let i = 0;
      showItems.forEach((item) => {
        if (i >= default_show) {
          item.setAttribute("data-state", "hide");
        }
        i++;
      });
    }

    // Toggle the button text and aria-expanded attribute
    button.textContent = !isExpanded ? "-" : "+";
    button.setAttribute("aria-expanded", !isExpanded);
  }

  articlesButton.addEventListener("click", function () {
    toggleSection(articlesButton, articlesContainer, "article");
  });

  projectsButton.addEventListener("click", function () {
    toggleSection(projectsButton, projectsContainer, "project");
  });

  blogsButton.addEventListener("click", function () {
    toggleSection(blogsButton, blogsContainer, "blog");
  });
});
