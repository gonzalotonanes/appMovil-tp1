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
    cargarSeleccion();
});

function pedirMusica(busqueda){
    var armarURL = url+`?q=${busqueda}&type=album,track,artist&limit=3`;
    $.ajax({
        type: "GET",
        url: armarURL,
        headers: {"Authorization":"Bearer BQB0k6b7Wiv-vAwvRRIXz5_xzmAlrAMeNbk-9mXoPNdE-qe0dyT6h8BCW7bBLonO4OPsnrt1Cw_iZCBRi0eneYlzVx6mrXhzQPAAVZxDHUn_kq3It9o"},
        success: function (response) {
            
            cargarCanciones(response)
        },
        statusCode :{
            401 : function(){
                console.log("RENOVANDO TOKEN")
            }
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
                        <button id="${element.id}-comprar" class="boton-comprar">COMPRAR</button>
                        <button id="${element.id}-carro" class="boton-carrito">AÑADIR CARRITO</button>
                    </div>
        
                </div>
            `);
            $(`#${element.id}-comprar`).click(function (e) { 
                alert(element.id);
            });
            $(`#${element.id}-carro`).click(function (e) { 
                var obj = 
                {
                    nombre:element.name,
                    "lanzamiento":element.release_date,
                    "cantidad": element.total_tracks,
                    "precio": "$500",
                    "artistas": element.artists[0].name,
                    "tipo": element.type,
                    "url": element.images[0].url,
                    "id_album": element.id
                };
                var cJson = JSON.stringify(obj);
                if(localStorage.getItem("Producto") != null){
                    var local = localStorage.getItem("Producto") + "+" + cJson;
                    localStorage.setItem("Producto",local);
                }
                else{
                    localStorage.setItem("Producto", cJson);
                }
                console.log(local);
            });
        });
    }
    else{
        sinElementos("albumes")
    }
    /* artista */
    if(canciones.albums.items.length =! 0){
        var artistas = canciones.artists.items;
        console.log(artistas);
        var genero = "";
        artistas.forEach(element => {
            if(element.genres.length == 0){
                genero = "Desconocido"; 
            }
            else{
                for( var a = 0; a < element.genres.length; a++){
                    genero = genero + "," + element.genres[a];
                }
            }
            $("#artistas").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.images[0].url}" alt="card__image" class="card__image" width="600">
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Generos: ${genero}</p>
                        <button id="${element.id}-verMas" class="boton-verMas">VER MAS</button>
                    </div>
        
                </div>
            `);
            genero = "";
            $(`#${element.id}-verMas`).click(function (e) { 
                alert(element.id);
            });
        });
    }
    else{
        sinElementos("artistas")
    }
    /* cancion */
    if(canciones.albums.items.length =! 0){
        var canciones = canciones.tracks.items;

        canciones.forEach(element => {
            $("#canciones").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.album.images[0].url}" alt="card__image" class="card__image" >
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Cantante: ${element.artists[0].name}</p>
                        <p>Disco numero: ${element.disc_number}</p>
                        <button id="${element.id}-comprar" class="boton-comprar">COMPRAR</button>
                        <button id="${element.id}-carro" class="boton-carrito">AÑADIR CARRITO</button>
                    </div>
        
                </div>
            `);
            $(`#${element.id}-comprar`).click(function (e) { 
                alert(element.id);
            });
            $(`#${element.id}-carro`).click(function (e) { 
                var obj = 
                {
                    "nombre":element.name,
                    "lanzamiento":element.album.release_date,
                    "cantidad": element.album.total_tracks,
                    "precio": "$500",
                    "artistas": element.artists[0].name,
                    "tipo": element.type,
                    "url": element.album.images[0].url,
                    "id_cancion": element.id
                };
                var cJson = JSON.stringify(obj);
                if(localStorage.getItem("Producto_canciones") != null){
                    var local = localStorage.getItem("Producto_canciones") + "+" + cJson;
                    localStorage.setItem("Producto_canciones",local);
                }
                else{
                    localStorage.setItem("Producto_canciones", cJson);
                }
                console.log(local);
            });
            
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
