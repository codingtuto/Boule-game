// Enregister le service worker pour mettre le site en version offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker enregistrée'); });
}

// Code pour gérer l'invite d'installation sur le bureau

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Empêcher Chrome 67 et versions antérieures d'afficher automatiquement l'invite
  e.preventDefault();
  // Stockez l'événement afin qu'il puisse être déclenché plus tard.
  deferredPrompt = e;Mettre à jour l'interface utilisateur pour informer l'utilisateur qu'il peut ajouter à l'écran d'accueil
  // 
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // masquer notre interface utilisateur qui affiche notre bouton A2HS
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    //  Attendre que l'utilisateur réponde à l'invite
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
