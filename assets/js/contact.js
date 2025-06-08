document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const submitBtn = form.querySelector('[data-form-btn]');
  const inputs = form.querySelectorAll('[data-form-input]');
  const successMessage = 'Votre message a bien été envoyé !';

  // Vérifier si tous les champs sont remplis
  function checkFormValidity() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    submitBtn.disabled = !allFilled;
  }

  // Ajouter des écouteurs d'événements sur les champs du formulaire
  inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
  });

  // Gérer la soumission du formulaire
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Créer un élément pour afficher le message de succès
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = successMessage;
    
    // Ajouter le message sous le bouton d'envoi
    submitBtn.insertAdjacentElement('afterend', successDiv);
    
    // Réinitialiser le formulaire
    form.reset();
    submitBtn.disabled = true;
    
    // Supprimer le message après 3 secondes
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  });
});
