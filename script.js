// script.js
document.addEventListener('DOMContentLoaded', function () {
    const articlesButton = document.querySelector('.toggle-articles');
    const projectsButton = document.querySelector('.toggle-projects');
    const articlesSection = document.querySelector('.articles');
    const projectsSection = document.querySelector('.projects');
    const articlesContainer = document.querySelector('.article-container');
    const projectsContainer = document.querySelector('.project-container');

    // Populate with articles and projects
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateSection(articlesContainer, data.articles, 'article');
            populateSection(projectsContainer, data.projects, 'project');
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateSection(container, items, className) {
        items.forEach((item, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add(className);
            sectionDiv.setAttribute('data-state', index < 2 ? 'show' : 'hide'); // Set initial data-state
            sectionDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p class="${className}-info">${item.info}</p>
            `;
            container.appendChild(sectionDiv);
        });
    }

    // button function
    function toggleSection(button, container) {
        // Toggle visibility of hidden items on button click
        const hiddenItems = container.querySelectorAll(`.${container.classList.contains('article-container') ? 'article' : 'project'}[data-state="hide"]`);
        const showItems = container.querySelectorAll(`.${container.classList.contains('article-container') ? 'article' : 'project'}[data-state="show"]`);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        if (!isExpanded) {
            hiddenItems.forEach(item => {
                item.setAttribute('data-state', 'show');
            });
        } else {
            const default_show = 2;
            var i = 0;
            showItems.forEach(item => {
                if (i >= default_show) {
                    item.setAttribute('data-state', 'hide');
                }
                i++;
            });
        }
        alert(isExpanded);

        // Toggle the button text and aria-expanded attribute
        button.textContent = !isExpanded ? '-' : '+';
        button.setAttribute('aria-expanded', !isExpanded);
    }

    articlesButton.addEventListener('click', function () {
        toggleSection(articlesButton, articlesContainer);
    });

    projectsButton.addEventListener('click', function () {
        toggleSection(projectsButton, projectsContainer);
    });
});

