document.addEventListener('DOMContentLoaded', async () => {

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

  const renderServices = async () => {
    const response = await fetch('../developer/utils/json/services.json');
    const services = await response.json();

    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = services.map(service => `
      <div class="col-10 offset-1 col-md-4 offset-md-0 col-sm-6 offset-sm-0">
        <div class="card text-dark bg-primary mb-3">
          <div class="card-body text-light tarjetaEstilo">
            <div class="text-center">
              <h4><i class="${service.icon}"></i></h4>
              <h5 class="card-title">${service.title}</h5>
            </div>
            <p class="card-text textoJustificado">${service.body}</p>
          </div>
        </div>
      </div>
    `).join('');
  };

  const renderCertificates = async () => {
    const response = await fetch('../developer/utils/json/certificates.json');
    const certificates = await response.json();

    const certificatesList = document.getElementById('certificatesList');
    certificatesList.innerHTML = certificates.map(certificate => `
      <div class="col-10 offset-1 col-md-4 offset-md-0 col-sm-6 offset-sm-0 bg-danger p-0 targetaPortafolio">
        <figure>
          <img src="${certificate.src}" class="img-fluid" alt="laptop">
          <div class="text-white capaPortafolio">
            <h5 class="text-uppercase">${certificate.title}</h5>
            <hr>
            <!-- <a href="https://xn--marcelo-dueas-skb.com/" target="new"><i class="bi bi-globe"></i></a>
            <a href="https://github.com/duemarfra/portafolioBootrap.git" target="new"><i class="bi bi-github"></i></a> -->
          </div>
        </figure>
      </div>

    `).join('');
  };

  const renderContactos = async () => {
    const response = await fetch('../developer/utils/json/contactos.json');
    const contactos = await response.json();

    const contactosLists = document.querySelectorAll('.contactosList');

    contactosLists.forEach(contactosList => {
      contactosList.innerHTML = contactos.map(contacto => `
          <li>
            <a href="${contacto.href}" target="new" class="${contacto.class}"><i class="${contacto.iclass}"></i></a>
          </li>
        `).join('');
    });
  };

  renderContactos();
  renderTechnologies();
  renderServices();
  renderCertificates();
});
