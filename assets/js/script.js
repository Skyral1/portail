function fetchAndDisplayNews() {
	fetch({
		url: "https://api.mediastack.com/v1/news",
		data: {
			access_key: "8f634bd15f5bdf5f86ee4c8fbdc18277",
			languages: "fr,-en",
			countries: "be,fr",
			limit: 30,
			offset: 30,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					"Erreur lors de la récupération des actualités : " + response.status
				);
			}
			return response.json();
		})
		.then((data) => {
			if (data.data && data.data.length > 0) {
				// Afficher les 5 dernières actualités
				const newsList = document.getElementById("newsList");
				newsList.innerHTML = ""; // Effacer le contenu précédent de la liste

				for (let i = 0; i < 5 && i < data.data.length; i++) {
					const newsItem = document.createElement("li");
					newsItem.textContent = data.data[i].title;
					newsList.appendChild(newsItem);
				}
			} else {
				console.error("Données d'actualités invalides ou introuvables.");
			}

			// Planifier la prochaine actualisation après un délai de 12 heures
			setTimeout(fetchAndDisplayNews, 12 * 60 * 60 * 1000); // 12 heures
		})
		.catch((error) => {
			console.error(error.message);

			// En cas d'erreur, réessayer après un délai de 12 heures
			setTimeout(fetchAndDisplayNews, 12 * 60 * 60 * 1000); // 12 heures
		});
}

// Appel initial pour afficher les actualités au chargement de la page
fetchAndDisplayNews();
