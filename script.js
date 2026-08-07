let corredores = [];

fetch("inscritos.json")
    .then(response => response.json())
    .then(data => {
        corredores = data;
        console.log("Corredores cargados:", corredores.length);
    });

function buscar() {

    const dorsal = document.getElementById("dorsal").value.trim();

    const resultado = document.getElementById("resultado");
    const nombre = document.getElementById("nombre");
    const club = document.getElementById("club");
    const localidad = document.getElementById("localidad");
    const tarjeta = document.querySelector(".tarjeta");

    tarjeta.classList.remove("encontrado");
    tarjeta.classList.remove("no-encontrado");

    if (dorsal === "") {
        resultado.classList.add("oculto");
        return;
    }

    const corredor = corredores.find(c => String(c.dorsal) === dorsal);

    resultado.classList.remove("oculto");

    if (corredor) {

        tarjeta.classList.add("encontrado");

        nombre.textContent = "👤 " + corredor.nombre + " " + corredor.apellidos;
        club.textContent = "🏃 " + (corredor.club || "Sin club");
        localidad.textContent = "📍 " + (corredor.localidad || "");

    } else {

        tarjeta.classList.add("no-encontrado");

        nombre.textContent = "❌ Dorsal no encontrado";
        club.textContent = "";
        localidad.textContent = "";

    }

}