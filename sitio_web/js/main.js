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
        buscarPeliculaSection.style.display = 'none';
        modificarPeliculaSection.style.display = 'block';
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
    const agregarPeliculaForm = document.getElementById('agregar-pelicula-form');
    agregarPeliculaForm.addEventListener('submit', function(event){
        event.preventDefault();

        // Obtén los valores del formulario
        const nombre_agregar = document.getElementById('nombre-pelicula-agregar').value;
        const año_agregar = document.getElementById('año-pelicula-agregar').value;
        const cast_agregar = document.getElementById('Cast-agregar').value;
        const genres_agregar = document.getElementById('genres-agregar').value;
        const href_agregar = document.getElementById('href-agregar').value;
        const extract_agregar = document.getElementById('extract-agregar').value;
        const thumbnail_agregar = document.getElementById('thumbnail-agregar').value;
        const thumbnail_width_agregar = document.getElementById('thumbnail_width-agregar').value;
        const thumbnail_height_agregar = document.getElementById('thumbnail_height-agregar').value;


        const diccionario_agregar = {
            nombre: nombre_agregar,
            año: año_agregar,
            cast: cast_agregar,
            genres: genres_agregar,
            href: href_agregar,
            extract: extract_agregar,
            thumbnail: thumbnail_agregar,
            thumbnail_width: thumbnail_width_agregar,
            thumbnail_height: thumbnail_height_agregar
        };

        let url = 'http://127.0.0.1:8000/my-first-api?';
        let firstParam = true;
        // Verificar los valores que no son null y arma la consulta url a la api
        for (const variable in diccionario_agregar) {
            const valor = diccionario_agregar[variable];
            if (valor) {
                if (!firstParam) {
                    url += '&';
                }
                url += `${variable}=${encodeURIComponent(valor)}`;
                firstParam = false;
            }
        }
            
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diccionario_agregar)
        })
        .then(response => response.json())
        .then(data => {
            // Obtener una referencia al elemento del contenido del cartel
            const infoContent = document.getElementById('info-content');

            // Limpiar cualquier contenido previo del cartel
            infoContent.innerHTML = '';

            // Mostrar los datos obtenidos
            console.log(data);
            infoContent.textContent = JSON.stringify(data, null, 2);
            // Mostrar el cartel
            const infoBox = document.getElementById('info-box');
            infoBox.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));

        // Agregar un event listener al botón de cerrar para ocultar el cartel
        document.getElementById('close-button').addEventListener('click', function() {
                const infoBox = document.getElementById('info-box');
                infoBox.style.display = 'none';
        });

    });
    //INTERFAZ MODIFICAR
    const modificarPeliculaForm = document.getElementById('modificar-pelicula-form');
    modificarPeliculaForm.addEventListener('submit', function(event){
        event.preventDefault();

        // Obtén los valores del formulario
        const nombre_pelicula_modificar = document.getElementById('nombre-pelicula-a-modificar').value;
        const año_pelicula_modificar = document.getElementById('año-pelicula-a-modificar').value;
        const nombre_modificar = document.getElementById('nombre-pelicula-modificar').value;
        const año_modificar = document.getElementById('año-pelicula-modificar').value;
        const cast_modificar = document.getElementById('Cast-modificar').value;
        const genres_modificar = document.getElementById('genres-modificar').value;
        const href_modificar = document.getElementById('href-modificar').value;
        const extract_modificar = document.getElementById('extract-modificar').value;
        const thumbnail_modificar = document.getElementById('thumbnail-modificar').value;
        const thumbnail_width_modificar = document.getElementById('thumbnail_width-modificar').value;
        const thumbnail_height_modificar = document.getElementById('thumbnail_height-modificar').value;


        const diccionario_modificar = {
            nombre: nombre_pelicula_modificar,
            año: año_pelicula_modificar,
            title: nombre_modificar,
            year: año_modificar,
            cast: cast_modificar,
            genres: genres_modificar,
            href: href_modificar,
            extract: extract_modificar,
            thumbnail: thumbnail_modificar,
            thumbnail_width: thumbnail_width_modificar,
            thumbnail_height: thumbnail_height_modificar
        };
        let url = 'http://127.0.0.1:8000/my-first-api?';
        url += `http://127.0.0.1:8000/my-first-api?nombre=${nombre_pelicula_modificar}&año=${año_pelicula_modificar}&`
        let firstParam = true;
        // Verificar los valores que no son null y arma la consulta url a la api
        for (const variable in diccionario_modificar) {
            const valor = diccionario_modificar[variable];
            if (valor) {
                if (!firstParam) {
                    url += '&';
                }
                url += `${variable}=${encodeURIComponent(valor)}`;
                firstParam = false;
            }
        }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diccionario_modificar)
        })
        .then(response => response.json())
        .then(data => {
            // Obtener una referencia al elemento del contenido del cartel
            const infoContent = document.getElementById('info-content');

            // Limpiar cualquier contenido previo del cartel
            infoContent.innerHTML = '';

            // Mostrar los datos obtenidos
            console.log(data);
            infoContent.textContent = JSON.stringify(data, null, 2);
            // Mostrar el cartel
            const infoBox = document.getElementById('info-box');
            infoBox.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));

        // Agregar un event listener al botón de cerrar para ocultar el cartel
        document.getElementById('close-button').addEventListener('click', function() {
                const infoBox = document.getElementById('info-box');
                infoBox.style.display = 'none';
        });
    });

    //INTERFAZ ELIMINAR
    const eliminarPeliculaForm = document.getElementById('eliminar-pelicula-form');
    eliminarPeliculaForm.addEventListener('submit', function(event){
        event.preventDefault();

        // Obtén los valores del formulario
        const nombre_pelicula_eliminar = document.getElementById('nombre-pelicula-eliminar').value;
        const año_pelicula_eliminar = document.getElementById('año-pelicula-eliminar').value;
        const diccionario_eliminar = {
            nombre: nombre_pelicula_eliminar,
            año: año_pelicula_eliminar,
        };
        // Construir la URL con los parámetros nombre y año
        let url = `http://127.0.0.1:8000/my-first-api?nombre=${encodeURIComponent(nombre_pelicula_eliminar)}&año=${encodeURIComponent(año_pelicula_eliminar)}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diccionario_eliminar)
        })
        .then(response => response.json())
        .then(data => {
            // Obtener una referencia al elemento del contenido del cartel
            const infoContent = document.getElementById('info-content');

            // Limpiar cualquier contenido previo del cartel
            infoContent.innerHTML = '';

            // Mostrar los datos obtenidos
            console.log(data);
            infoContent.textContent = JSON.stringify(data, null, 2);
            // Mostrar el cartel
            const infoBox = document.getElementById('info-box');
            infoBox.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));

        // Agregar un event listener al botón de cerrar para ocultar el cartel
        document.getElementById('close-button').addEventListener('click', function() {
                const infoBox = document.getElementById('info-box');
                infoBox.style.display = 'none';
        });


    });

});