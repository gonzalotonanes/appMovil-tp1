var url = "https://api.spotify.com/v1/search"

$(document).ready(function () {
    $("#buscar").click(function (e) { 
        $("#albumes").empty();
        $("#canciones").empty();
        $("#artistas").empty();
        var input_busqueda = document.getElementById("busqueda");
        var info_busqueda = input_busqueda.value;
        pedirMusica(info_busqueda);
    });
});

function pedirMusica(busqueda){
    var armarURL = url+`?q=${busqueda}&type=album,track,artist&limit=3`;
    $.ajax({
        type: "GET",
        url: armarURL,
        headers: {"Authorization":"Bearer BQAUXeuGp6L4rYqf2oVnAUX5K7na7gR7W1mFSUFGj_6byvBt52o1LUmgAqVZCgq-2MKcvPiN7RQqadYq0IlIrI0A6SKK3ETLQW0XGRlNuXuVjYkTEEc"},
        success: function (response) {
            cargarCanciones(response)
        }
    });
}
function cargarCanciones(canciones){
    console.log(canciones)
    /* album */
    if(canciones.albums.items.length =! 0){
        var albums = canciones.albums.items;
        console.log(albums)
        albums.forEach(element => {
            $("#albumes").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.images[0].url}" alt="card__image" class="card__image" width="600">
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Lanzamiento: ${element.release_date}</p>
                        <p>Cantidad de canciones: ${element.total_tracks}</p>
                        <p>Grupo musical: ${element.artists[0].name}</p>
                    </div>
        
                </div>
            `);
        });
    }
    else{
        sinElementos("albumes")
    }
    /* artista */
    if(canciones.albums.items.length =! 0){
        var artistas = canciones.artists.items;
        console.log(artistas)
        artistas.forEach(element => {
            $("#artistas").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.images[0].url}" alt="card__image" class="card__image" width="600">
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Generos: ${element.genres[0]}</p>
                    </div>
        
                </div>
            `);
        });
    }
    else{
        sinElementos("artistas")
    }
    /* cancion */
    if(canciones.albums.items.length =! 0){
        var canciones = canciones.tracks.items;
        console.log(canciones)
        canciones.forEach(element => {
            $("#canciones").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.album.images[0].url}" alt="card__image" class="card__image" width="600">
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Cantante: ${element.artists[0].name}</p>
                        <p>Disco numero: ${element.disc_number}</p>
                    </div>
        
                </div>
            `);
        });
    }
    else{
        sinElementos("canciones")
    }
}

function sinElementos(busqueda){
    $(`#${busqueda}`).append(`
        <h1> No se encontraron ${busqueda} :c </h1>
    `);
}