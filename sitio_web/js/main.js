// main.js
document.addEventListener('DOMContentLoaded', function() {
    const buscarPeliculaLink = document.querySelector('a[href="#Buscar_pelicula"]');
    const agregarPeliculaLink = document.querySelector('a[href="#Agregar_pelicula"]');
    const modificarPeliculaLink = document.querySelector('a[href="#Modificar_pelicula"]');
    const eliminarPeliculaLink = document.querySelector('a[href="#Eliminar_pelicula"]');
    const inicioLink = document.querySelector('a[href = "#"]')

    const agregarPeliculaSection = document.getElementById('agregar-pelicula-section');
    const buscarPeliculaSection = document.getElementById('buscar-pelicula-section');
    const modificarPeliculaSection = document.getElementById('modificar-pelicula-section');
    const eliminarPeliculaSection = document.getElementById('eliminar-pelicula-section');
    
    inicioLink.addEventListener('click', function(event) {
        event.preventDefault();
        buscarPeliculaSection.style.display = 'none';
        modificarPeliculaSection.style.display = 'none';
        agregarPeliculaSection.style.display = 'none';
        eliminarPeliculaSection.style.display = 'none';
    });
    
    buscarPeliculaLink.addEventListener('click', function(event) {
        event.preventDefault();
        buscarPeliculaSection.style.display = 'block';
        modificarPeliculaSection.style.display = 'none';
        agregarPeliculaSection.style.display = 'none';
        eliminarPeliculaSection.style.display = 'none';
    });

    agregarPeliculaLink.addEventListener('click', function(event) {
        event.preventDefault();
        buscarPeliculaSection.style.display = 'none';
        modificarPeliculaSection.style.display = 'none';
        agregarPeliculaSection.style.display = 'block';
        eliminarPeliculaSection.style.display = 'none';
    });

    modificarPeliculaLink.addEventListener('click', function(event) {
        event.preventDefault();
        buscarPeliculaSection.style.display = 'block';
        modificarPeliculaSection.style.display = 'none';
        agregarPeliculaSection.style.display = 'none';
        eliminarPeliculaSection.style.display = 'none';
    });
    eliminarPeliculaLink.addEventListener('click', function(event) {
        event.preventDefault();
        buscarPeliculaSection.style.display = 'none';
        modificarPeliculaSection.style.display = 'none';
        agregarPeliculaSection.style.display = 'none';
        eliminarPeliculaSection.style.display = 'block';
    });
    
    // INTERFAZ BUSCAR

    const buscarPeliculaForm = document.getElementById('buscar-pelicula-form');

    buscarPeliculaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtén los valores del formulario
        const nombre_buscar = document.getElementById("nombre-pelicula").value;
        const año = document.getElementById("año-pelicula").value;

        let url = ``;

        // Verificar si tanto el nombre como el año tienen un valor distinto de null
        if (nombre_buscar !== '' && año !== '') {
            url += `http://127.0.0.1:8000/my-first-api?nombre=${nombre_buscar}&año=${año}`;
        } else if (nombre_buscar === '' && año !== '') {
            // Verificar si el nombre es '' pero el año no lo es
            url += `http://127.0.0.1:8000/my-first-api?año=${año}`;
        } else if (nombre_buscar !== '' && año === '') {
            // Verificar si el nombre no es '' pero el año lo es
            url += `http://127.0.0.1:8000/my-first-api?nombre=${nombre_buscar}`;
        }
        console.log(url)
        // Realiza la solicitud GET utilizando fetch
        fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtener una referencia al elemento del contenido del cartel
            const infoContent = document.getElementById('info-content');

            // Limpiar cualquier contenido previo del cartel
            infoContent.innerHTML = '';

            // Iterar sobre cada película en los datos devueltos por la API
            console.log(data)
            if (Array.isArray(data)) {
                data.forEach(pelicula => {
                    // Crear un nuevo elemento de párrafo para cada película
                    const peliculaInfo = document.createElement('p');

                    // Iterar sobre cada par clave-valor de la película
                    for (const [key, value] of Object.entries(pelicula)) {
                        // Crear un nodo de texto con la clave y el valor de la película
                        const keyValueText = document.createTextNode(`${key}: ${value}`);

                        // Agregar el nodo de texto al elemento de párrafo
                        peliculaInfo.appendChild(keyValueText);

                        // Agregar un elemento de salto de línea después de cada par clave-valor
                        peliculaInfo.appendChild(document.createElement('br'));
                    }

                    // Agregar un elemento de salto de línea adicional entre cada película
                    peliculaInfo.appendChild(document.createElement('br'));

                    // Agregar el elemento de párrafo al contenido del cartel
                    infoContent.appendChild(peliculaInfo);
                });
            }
            else {
                infoContent.textContent = data
            };

                    // Mostrar el cartel
                    const infoBox = document.getElementById('info-box');
                    infoBox.style.display = 'block';
        })
            
        .catch(error => {
            // Manejar cualquier error que pueda ocurrir
            console.error('Hubo un error:', error);
        });

            // Agregar un event listener al botón de cerrar para ocultar el cartel
        document.getElementById('close-button').addEventListener('click', function() {
                const infoBox = document.getElementById('info-box');
                infoBox.style.display = 'none';
        });
    });

    //INTERFAZ AGREGAR


    //INTERFAZ MODIFICAR


    //INTERFAZ ELIMINAR
});