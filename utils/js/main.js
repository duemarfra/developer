const topFunction = () => {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo(0, 0);
  }
};

document.addEventListener('DOMContentLoaded', async () => {

  const renderTechnologies = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching renderTechnologies:', error);
    }
  };

  const renderServices = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching renderServices:', error);
    }
  };

  const renderCertificates = async () => {
    try {
      const response = await fetch('../developer/utils/json/certificates.json');
      const certificates = await response.json();

      const certificatesList = document.getElementById('certificatesList');
      certificatesList.innerHTML = certificates.map(certificate =>
        certificate.src && certificate.title ? `
        <div class="col-10 offset-1 col-md-4 offset-md-0 col-sm-6 offset-sm-0 p-0 targetaPortafolio">
          <figure>
            <div class="spinner-border text-primary" role="status">
            </div>
            <img src="${certificate.src}" class="img-fluid imgCertificates d-none" alt="laptop">
            <div class="text-white capaPortafolio">
              <h5 class="text-uppercase">${certificate.title}</h5>
              <hr>
              <!-- <a href="https://xn--marcelo-dueas-skb.com/" target="new"><i class="bi bi-globe"></i></a>
              <a href="https://github.com/duemarfra/portafolioBootrap.git" target="new"><i class="bi bi-github"></i></a> -->
            </div>
          </figure>
        </div>
        ` : `
        <div></div>
        `).join('');

      const images = certificatesList.querySelectorAll('img');

      images.forEach(img => {
        img.addEventListener('load', () => {
          img.classList.remove('d-none');
          img.previousElementSibling.style.display = 'none';
        });
        img.addEventListener('error', () => {
          img.previousElementSibling.innerHTML = '<span class="text-danger">Error loading image</span>';
        });
      });

    } catch (error) {
      console.error('Error fetching renderCertificates:', error);
    }
  };

  const renderContactos = async () => {
    try {
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
    } catch (error) {
      console.error('Error fetching renderContactos:', error);
    }
  };

  const renderSectionTitles = async () => {
    try {
      const response = await fetch('../developer/utils/json/sectionTitles.json');
      const titles = await response.json();

      const titlesLists = document.querySelectorAll('.titlesList');

      titlesLists.forEach(titlesList => {
        const matchingTitle = titles.find(title => titlesList.classList.contains(title.id));
        if (matchingTitle) {
          titlesList.innerHTML = `
            <div id="${matchingTitle.id}" class="mt-5 container-fluid">
              <div class="separadorDeSeccion row pt-5">
              </div>
            </div>
            <div class="container-fluid tituloDeSeccion pt-3 pb-3">
              <h2>${matchingTitle.text}</h2>
            </div>
          `;
        }
      });
    } catch (error) {
      console.error('Error fetching renderSectionTitles:', error);
    }
  };

  const handleLoading = async () => {
    try {
      const myBodyContainer = document.getElementById('myBody');
      const spinnerContainer = document.getElementById('spinnerContainer');
      const htmlToInsert = `
    <div class="spinner-grow text-secondary" style="width: 6rem; height: 6rem" role="status"></div>
    <div class="spinner-grow text-info" style="width: 6rem; height: 6rem" role="status"></div>
    <div class="spinner-grow text-primary" style="width: 6rem; height: 6rem" role="status"></div>
    `;

      spinnerContainer.innerHTML = htmlToInsert;
      myBodyContainer.classList.add('d-none');
      await renderSectionTitles();
      await renderContactos();
      await renderTechnologies();
      await renderServices();
      await renderCertificates();
      myBodyContainer.classList.remove('d-none');
      spinnerContainer.innerHTML = '';
      spinnerContainer.classList.add('d-none');
    } catch (error) {
      console.error('Error fetching handleLoading:', error);
    }

  };

  await handleLoading();

});
