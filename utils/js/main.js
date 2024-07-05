// utils/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const renderTechnologies = async () => {
    const response = await fetch('../developer/utils/json/technologies.json');
    const technologies = await response.json();

    const technologiesList = document.getElementById('technologiesList');
    technologiesList.innerHTML = technologies.map(technologie => `
      <li>
        <a target="new" href="${technologie.url}" data-bs-toggle="tooltip" data-bs-html="true" title="<u>${technologie.tooltip}</u>">
          <img src="${technologie.imgSrc}" alt="${technologie.alt}">
          <br>${technologie.name}
        </a>
      </li>
    `).join('');

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  };

  renderTechnologies();
});
