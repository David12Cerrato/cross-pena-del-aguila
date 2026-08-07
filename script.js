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
/* =========================
   CRONÓMETRO DE CARRERA
   ========================= */

let tiempoInicio = null;
let tiempoAcumulado = 0;
let intervalo = null;


function mostrarTiempo() {

    let tiempoActual = tiempoAcumulado;

    if (tiempoInicio !== null) {
        tiempoActual += Date.now() - tiempoInicio;
    }

    const totalSegundos = Math.floor(tiempoActual / 1000);

    const horas = Math.floor(totalSegundos / 3600);

    const minutos = Math.floor(
        (totalSegundos % 3600) / 60
    );

    const segundos = totalSegundos % 60;


    const texto =
        String(horas).padStart(2, "0") + ":" +
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");


    document.getElementById("tiempo").textContent = texto;
}


/* INICIAR */

document.getElementById("iniciar").addEventListener(
    "click",
    function () {

        if (tiempoInicio !== null) {
            return;
        }

        tiempoInicio = Date.now();

        intervalo = setInterval(
            mostrarTiempo,
            250
        );

        mostrarTiempo();
    }
);


/* PAUSAR */

document.getElementById("pausar").addEventListener(
    "click",
    function () {

        if (tiempoInicio === null) {
            return;
        }

        tiempoAcumulado +=
            Date.now() - tiempoInicio;

        tiempoInicio = null;

        clearInterval(intervalo);

        intervalo = null;

        mostrarTiempo();
    }
);


/* REINICIAR */

document.getElementById("reiniciar").addEventListener(
    "click",
    function () {

        const confirmar = confirm(
            "¿Quieres reiniciar el cronómetro?"
        );

        if (!confirmar) {
            return;
        }

        tiempoInicio = null;

        tiempoAcumulado = 0;

        clearInterval(intervalo);

        intervalo = null;

        mostrarTiempo();
    }
);


/* Mostrar tiempo inicial */

mostrarTiempo();