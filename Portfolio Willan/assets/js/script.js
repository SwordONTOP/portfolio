'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Gestion de la navigation
const navbarLinks = document.querySelectorAll('.navbar-link');

// Fonction pour gérer la navigation
const handleNavigation = function(event) {
  event.preventDefault();
  const targetPage = event.currentTarget.dataset.navLink;
  
  // Masquer toutes les pages
  document.querySelectorAll('article').forEach(page => {
    page.style.display = 'none';
  });
  
  // Afficher la page cible
  document.querySelector(`[data-page="${targetPage}"]`).style.display = 'block';
  
  // Mettre à jour l'état actif des boutons
  navbarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.navLink === targetPage) {
      link.classList.add('active');
    }
  });
};

// Ajouter l'événement click à chaque bouton de navigation
navbarLinks.forEach(link => {
  link.addEventListener('click', handleNavigation);
});

// Initialiser la page active
const initialPage = document.querySelector('.about');
initialPage.style.display = 'block';

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// Charger la section des langages
// Fonction pour gérer la traduction des pages
const translatePage = (lang) => {
  // Traduire le titre de la page
  document.title = lang === 'fr' ? 'vCard - Portfolio Personnel' : 'vCard - Personal Portfolio';
  
  // Traduire les éléments du menu
  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    if (link.dataset.lang === 'fr') {
      link.textContent = link.textContent === 'About' ? 'À propos' :
                        link.textContent === 'Resume' ? 'CV' :
                        link.textContent === 'Portfolio' ? 'Portfolio' :
                        link.textContent === 'Blog' ? 'Blog' :
                        link.textContent === 'Contact' ? 'Contact' : link.textContent;
    }
  });

  // Traduire les autres éléments selon le langage
  if (lang === 'fr') {
    // Traduire les sections
    document.querySelector('.about .article-title').textContent = 'À propos de moi';
    document.querySelector('.service-title').textContent = 'Mes services';
    document.querySelector('.testimonials-title').textContent = 'Témoignages';
    
    // Traduire les titres des services
    document.querySelectorAll('.service-item-title').forEach(title => {
      title.textContent = title.textContent === 'Web design' ? 'Design web' :
                         title.textContent === 'Web development' ? 'Développement web' :
                         title.textContent === 'Mobile apps' ? 'Applications mobiles' :
                         title.textContent === 'Photography' ? 'Photographie' : title.textContent;
    });
  }
};

// Fonction pour charger les langages
const loadLanguages = async () => {
  try {
    const response = await fetch('/assets/languages.html');
    const html = await response.text();
    document.getElementById('languages-container').innerHTML = html;
  } catch (error) {
    console.error('Erreur lors du chargement des langages:', error);
  }
};

// Charger les langages au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  // Appliquer la traduction en fonction du langage sélectionné
  const lang = document.documentElement.lang;
  translatePage(lang);
  loadLanguages();
});

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Convertir le nom de la page en minuscules et supprimer les espaces
    const pageName = this.innerHTML.toLowerCase().replace(/\s+/g, '');
    
    for (let i = 0; i < pages.length; i++) {
      // Comparer avec le nom de la page sans espaces
      if (pageName === pages[i].dataset.page.replace(/\s+/g, '')) {
        pages[i].classList.add("active");
        this.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        this.classList.remove("active");
      }
    }

  });
}