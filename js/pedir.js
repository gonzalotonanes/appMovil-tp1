//var url = "https://api.spotify.com/v1/search?q=dua lipa&type=album,track,artist&offset=0&limit=10"
var url = "https://api.spotify.com/v1/search"
var urlLanzamiento = "https://api.spotify.com/v1/browse/new-releases?limit=10";
var token = localStorage.getItem("token");
const username = "ff36890297234638a942900dd76cf68f";
const password = "f08e1f503aaa43b99a98b010ce9a62f3"
var BtnNext;
var BtnPrevious;

const botonesAlbunes = document.getElementById('btn-albumes');
const botonesArtista = document.getElementById('btn-artista');
const botonesCanciones = document.getElementById('btn-canciones');
const botonesLanzamientos = document.getElementById('btn-lanzamientos');


$(document).ready(function () {
    
    getNuevosLanzamientos(urlLanzamiento);
    $("#buscar").click(function (e) { 
        $("#albumes").empty();
        $("#canciones").empty();
        $("#artistas").empty();
        var input_busqueda = document.getElementById("busqueda");
        var info_busqueda = input_busqueda.value;
        
        obtenerTodo(info_busqueda);
    });
});

function getNuevosLanzamientos(url) {
    
    $.ajax({
        type: "GET",
        url: url,
        headers: { "Authorization": "Bearer " + token },
        success: function (response) {
            cargarLanzamientos(response);
        },
        statusCode: {
            401: function () {
                console.log("RENOVANDO TOKEN")
                renovarToken();
                getNuevosLanzamientos(url);
            }
        }
    });
}

function cargarLanzamientos(res) {
    $("#lanzamientos").empty();
    let albums = res.albums.items;
    albums.forEach(element => {
        $("#lanzamientos").append(`
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
    BtnPrevious = res.albums.previous ? `<button class="btn" data-url=${res.albums.previous} data-tipo="album" >⏮</button>` : '';
    BtnNext = res.albums.next ? `<button class="btn" data-url=${res.albums.next} data-tipo="album" >⏩</button>` : '';
    botonesLanzamientos.innerHTML = BtnPrevious + " " + BtnNext;
}

function obtenerTodo(consulta) {
    let ulrCompleta = url + `?q=${consulta}&type=album,track,artist&offset=0&limit=10`;
    $.ajax({
        type: "GET",
        url: ulrCompleta,
        headers: { "Authorization": "Bearer " + token },
        success: function (response) {
            cargarAlbunes(response);
            cargarArtistas(response);
            cargarCanciones(response);
        },
        statusCode: {
            401: function () {
                console.log("RENOVANDO TOKEN")
                renovarToken();
                obtenerTodo(consulta);
            }
        }
    });
}

function renovarToken() {
    $.ajax(
        {
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data: {
                "grant_type": "client_credentials",
                "client_secret": password,
                "client_id": username,
            },
            success: function (result) {
                token = result.access_token;
                localStorage.setItem("token", token)
            },
        }
    );
}


/*ALBUNES*/
function cargarAlbunes(res) {
    $("#albumes").empty();
    let albums = res.albums.items;

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
    BtnPrevious = res.albums.previous ? `<button class="btn" data-url=${res.albums.previous} data-tipo="album" >⏮</button>` : '';
    BtnNext = res.albums.next ? `<button class="btn" data-url=${res.albums.next} data-tipo="album" >⏩</button>` : '';
    botonesAlbunes.innerHTML = BtnPrevious + " " + BtnNext;
}
/*ARTISTAS*/

function cargarArtistas(res) {
    $("#artistas").empty();
    let artistas = res.artists.items;

    artistas.forEach(element => {
        if (element.images.length == 0) {
            console.log("entrando al if");
            let img = new Object();
            img.url = "https://www.cronista.com/files/image/478/478038/6320982be8754_360_480!.jpg?s=52ffc0203a6b79606007487507f8d922&d=1663081659"
            element.images.push(img);
            console.log(element.images[0].url)
        }
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

    BtnPrevious = res.artists.previous ? `<button class="btn" data-url=${res.artists.previous} data-tipo="artista" >⏮</button>` : '';
    BtnNext = res.artists.next ? `<button class="btn" data-url=${res.artists.next} data-tipo="artista" >⏩</button>` : '';
    botonesArtista.innerHTML = BtnPrevious + " " + BtnNext;
}

function cargarCanciones(res) {
    $("#canciones").empty();
    let canciones = res.tracks.items;

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
                </div>
            </div>
        `);
    });

    BtnPrevious = res.tracks.previous ? `<button class="btn" data-url=${res.tracks.previous} data-tipo="cancion" >⏮</button>` : '';
    BtnNext = res.tracks.next ? `<button class="btn" data-url=${res.tracks.next} data-tipo="cancion" >⏩</button>` : '';
    botonesCanciones.innerHTML = BtnPrevious + " " + BtnNext;
}

botonesAlbunes.addEventListener('click', (e) => {
    let tipo = e.target.dataset.tipo;
    buscar(e.target.dataset.url, tipo)
});

botonesArtista.addEventListener('click', (e) => {
    let tipo = e.target.dataset.tipo;
    buscar(e.target.dataset.url, tipo)
});

botonesCanciones.addEventListener('click', (e) => {
    let tipo = e.target.dataset.tipo;
    buscar(e.target.dataset.url, tipo)
});

botonesLanzamientos.addEventListener('click', (e) => {
    getNuevosLanzamientos(e.target.dataset.url)
});

//CAMBIAR
function buscar(url, tipo) {

    let resp;
    $.ajax({
        type: "GET",
        url: url,
        headers: { "Authorization": "Bearer " + token },
        success: function (response) {
            resp = response;
            if (tipo == "album") {
                cargarAlbunes(resp);
            }
            if (tipo == "artista") {
                cargarArtistas(resp);
            }
            if (tipo == "cancion") {
                cargarCanciones(resp);
            }
        },
        statusCode: {
            401: function () {
                renovarToken();
                buscar(url,tipo);
            }
        }
    });
}