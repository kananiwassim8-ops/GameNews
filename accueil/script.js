  // Script pour pour les dernieres sorties de jeux vidéo

  const today = new Date().toISOString().split('T')[0];
    const url = `https://api.rawg.io/api/games?key=04623393fb76473087df3cf489b8999d&dates=2026-11-01,2026-11-23&page_size=3`;

    let currentIndex = 0;

    async function initCarousel() {
      const statusEl = document.getElementById('status');
      const carouselEl = document.getElementById('carousel');
      const trackEl = document.getElementById('track');
      const dotsEl = document.getElementById('dots');

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

        const data = await response.json();
        const games = data.results;

        statusEl.style.display = 'none';
        carouselEl.style.display = 'block';

        games.forEach((game, index) => {
          // 1. Création de la slide
          const slide = document.createElement('div');
          slide.className = 'slide';

          const image = game.background_image || 'https://placeholder.com';
          const platforms = game.platforms 
            ? game.platforms.map(p => p.platform.name).join(', ') 
            : 'Non précisée';

          slide.innerHTML = `
            <img src="${image}" alt="${game.name}">
            <div class="slide-info">
              <h2 class="game-title">${game.name}</h2>
              <p class="game-meta"><strong>Sortie :</strong> ${game.released || 'Inconnue'} | <strong>Note :</strong> ${game.rating ? game.rating + ' / 5' : 'Aucune'}</p>
              <p class="game-meta"><strong>Plateformes :</strong> ${platforms}</p>
            </div>
          `;
          trackEl.appendChild(slide);

          // 2. Création du point de navigation correspondant
          const dot = document.createElement('button');
          dot.className = index === 0 ? 'dot active' : 'dot';
          dot.setAttribute('aria-label', `Afficher le jeu ${index + 1}`);
          dot.addEventListener('click', () => goToSlide(index));
          dotsEl.appendChild(dot);
        });

      } catch (error) {
        statusEl.textContent = `Erreur : ${error.message}. Vérifiez votre clé API.`;
        statusEl.style.color = '#ff6b6b';
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      const trackEl = document.getElementById('track');
      const dots = document.querySelectorAll('.dot');

      // Décalage horizontal fluide en pourcentage
      trackEl.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Mise à jour de l'état actif des points
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    initCarousel();


    // Script pour les prochaines sorties de jeux vidéo
  
  //const API_KEY = 'VOTRE_CLE_API'; // Remplacez par votre clé RAWG
    const PAGE_SIZE = 5; // Nombre de jeux par page
    let pageActuelle = 1;

    const conteneur = document.getElementById('conteneur-jeux');


    async function chargerJeux(page) {
      conteneur.innerHTML = '<p>Chargement...</p>';
      
      const url = `https://api.rawg.io/api/games?key=04623393fb76473087df3cf489b8999d&dates=2026-11-23,2026-12-31&page=${page}&page_size=${PAGE_SIZE}`;

      try {
        const reponse = await fetch(url);
        const donnees = await reponse.json();

        // 1. Vider le conteneur et afficher les nouveaux jeux
        conteneur.innerHTML = '';
        donnees.results.forEach(jeu => {
          const carte = document.createElement('div');
          carte.className = 'carte';
          carte.innerHTML = `
            <img src="${jeu.background_image || ''}" alt="${jeu.name}">
            <div class="carte-contenu">
              <h3>${jeu.name}</h3>
            </div>
          `;
          conteneur.appendChild(carte);
        });
        } catch (erreur) {
        conteneur.innerHTML = '<p>Erreur lors du chargement des données.</p>';
        console.error(erreur);
      }
    }
// Chargement initial de la page 1
    chargerJeux(pageActuelle);