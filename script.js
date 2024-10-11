

// Clave pública de la API de Marvel
const API_PUBLIC_KEY = '624c4b369f69d218b6a74273486fba7b';

document.getElementById('btnBuscar').addEventListener('click', function() {
    const personaje = document.getElementById('buscador').value;

    if (personaje) {
        buscarPersonaje(personaje);
    } else {
        alert('Por favor, introduce el nombre de un personaje.');
    }
});

function buscarPersonaje(nombre) {
    const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${API_PUBLIC_KEY}&hash=6ead053f43c21c6f1837367e5b49442f&name=${nombre}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => mostrarResultado(data))
    .catch(error => console.error('Error:', error));
}

function mostrarResultado(data) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; 

    if (data.data.results.length > 0) {
        const personaje = data.data.results[0];

        const nombre = personaje.name;
        const descripcion = personaje.description || 'Descripción no disponible.';
        const imagen = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;
        const primerComic = personaje.comics.items.length > 0 ? personaje.comics.items[0].name : 'No disponible';

        // Mostrar el contenido
        resultadoDiv.innerHTML = `
            <h2>${nombre}</h2>
            <img src="${imagen}" alt="${nombre}">
            <p><strong>Descripción:</strong> <br>${descripcion}</p>
            <p><strong>Primer cómic:</strong> <br>${primerComic}</p>
        `;
    } else {
        resultadoDiv.innerHTML = '<p>Personaje no encontrado.</p>';
    }
}

document.getElementById('buscador').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('btnBuscar').click(); 
    }
});
