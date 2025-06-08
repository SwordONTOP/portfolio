document.addEventListener('DOMContentLoaded', () => {
  // Gérer l'affichage des détails des projets
  const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
  projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectCard = e.currentTarget.closest('.project-card');
      const details = projectCard.querySelector('.project-details');
      
      // Fermer tous les autres détails
      document.querySelectorAll('.project-details').forEach(detail => {
        if (detail !== details) {
          detail.style.display = 'none';
        }
      });
      
      // Alterner l'affichage des détails du projet actuel
      if (details.style.display === 'none') {
        details.style.display = 'block';
        btn.textContent = 'Masquer les détails';
      } else {
        details.style.display = 'none';
        btn.textContent = 'Voir les détails';
      }
    });
  });
});
