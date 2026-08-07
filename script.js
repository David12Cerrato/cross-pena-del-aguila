let corredores = [];

fetch("inscritos.json")
    .then(response => response.json())
    .then(data => {
        corredores = data;
        console.log("Corredores cargados:", corredores.length);
    })
    .catch(error => {
        console.error("Error cargando los corredores:", error);
    });


function buscar() {

    const dorsal = document.getElementById("dorsal").value.trim();

    const resultado = document.getElementById("resultado");
    const nombre = document.getElementById("nombre");
    const club = document.getElementById("club");
    const localidad = document.getElementById("localidad");
    const dorsalMostrado = document.getElementById("dorsalMostrado");
    const estadoTexto = document.getElementById("estadoTexto");
    const tarjeta = document.querySelector(".tarjeta");


    // Si no hay dorsal
    if (dorsal === "") {

        resultado.classList.add("oculto");

        tarjeta.classList.remove("encontrado");
        tarjeta.classList.remove("no-encontrado");

        return;
    }


    // Mostrar el resultado
    resultado.classList.remove("oculto");


    // Mostrar el número buscado
    dorsalMostrado.textContent = dorsal;


    // Buscar corredor
    const corredor = corredores.find(
        c => String(c.dorsal) === dorsal
    );


    // Limpiar estados anteriores
    tarjeta.classList.remove("encontrado");
    tarjeta.classList.remove("no-encontrado");


    // CORREDOR ENCONTRADO
    if (corredor) {

        tarjeta.classList.add("encontrado");

        estadoTexto.textContent = "DORSAL ENCONTRADO";

        nombre.textContent =
            "👤 " +
            (corredor.nombre || "") +
            " " +
            (corredor.apellidos || "");

        club.textContent =
            "🏃 " +
            (corredor.club || "Sin club");

        localidad.textContent =
            "📍 " +
            (corredor.localidad || "");

    }


    // CORREDOR NO ENCONTRADO
    else {

        tarjeta.classList.add("no-encontrado");

        estadoTexto.textContent = "DORSAL NO ENCONTRADO";

        nombre.textContent =
            "❌ No existe este dorsal";

        club.textContent = "";

        localidad.textContent = "";

    }

}


/*
    NUEVA BÚSQUEDA
*/

function nuevaBusqueda() {

    const dorsal = document.getElementById("dorsal");

    const resultado = document.getElementById("resultado");

    dorsal.value = "";

    resultado.classList.add("oculto");

    dorsal.focus();

}