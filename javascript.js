const btnBuscar = document.getElementById("btnBuscar");
const inputPelicula = document.getElementById("inputPelicula");
const divResultado = document.getElementById("resultado");

const apiKey = "trilogy"; 

btnBuscar.addEventListener("click", function() {
    let nombrePelicula = inputPelicula.value.trim();

    if (nombrePelicula === "") {
        divResultado.innerHTML = "<p class='error'>Por favor escribe el nombre de una pelicula.</p>";
        return;
    }

    divResultado.innerHTML = "<p style='text-align: center;'>Buscando...</p>";

    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(nombrePelicula)}&apikey=${apiKey}`;

    fetch(url)
        .then(function(respuesta) {
            if (!respuesta.ok) {
                throw new Error("Error de conexion con el servidor.");
            }
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.Response === "False") {
                divResultado.innerHTML = "<p class='error'>Pelicula no encontrada.</p>";
            } else {
                let posterImg = datos.Poster;

                divResultado.innerHTML = `
                    <div class="tarjeta-pelicula" style="max-width: 400px; margin: 0 auto;">
                        <div>
                            <img src="${posterImg}" alt="Poster de ${datos.Title}">
                            <h3>${datos.Title}</h3>
                            <p><strong>Ano:</strong> ${datos.Year}</p>
                            <p><strong>Sinopsis:</strong> ${datos.Plot}</p>
                        </div>
                    </div>
                `;
            }
        })
        .catch(function(error) {
            divResultado.innerHTML = "<p class='error'>Ocurrio un error de conexion. Intentalo mas tarde.</p>";
        });
});