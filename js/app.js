const placesContainer = document.getElementById("places");

const fallbackPlaces = [
  {
    name: "Mirador del Águila",
    category: "Mirador",
    description: "Un punto con vistas panorámicas del valle y los caminos que recorren la zona."
  },
  {
    name: "Ruta de los Pinares",
    category: "Ruta",
    description: "Una senda ideal para caminar, observar flora y disfrutar del entorno natural."
  },
  {
    name: "Plaza del Pueblo",
    category: "Centro",
    description: "El lugar de encuentro para mercados, festivales y actividades de la comunidad."
  }
];

async function loadPlaces() {
  try {
    const response = await fetch("./data/places.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo de datos");
    }

    const places = await response.json();
    renderPlaces(places);
  } catch (error) {
    console.warn("Usando datos de respaldo:", error);
    renderPlaces(fallbackPlaces);
  }
}

function renderPlaces(places) {
  if (!placesContainer) {
    return;
  }

  placesContainer.innerHTML = places
    .map(
      (place) => `
        <article class="place-card">
          <span class="badge">${place.category}</span>
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        </article>
      `
    )
    .join("");
}

loadPlaces();
