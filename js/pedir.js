var url = "https://api.spotify.com/v1/search"
var urlLanzamiento = "https://api.spotify.com/v1/browse/new-releases?limit=10";
var token = localStorage.getItem("token");
const username = "ff36890297234638a942900dd76cf68f";
const password = "f08e1f503aaa43b99a98b010ce9a62f3"
var BtnNext;
var BtnPrevious;

$(document).ready(function () {
    getNuevosLanzamientos(urlLanzamiento);
    
    $("#buscar").click(function (e) { 
        $("#album").empty();
        $("#cancion").empty();
        $("#artists").empty();
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
                renovarToken();
                getNuevosLanzamientos(url);
            }
        }
    });
}

function cargarLanzamientos(res) {
    $("#lanzamientos").empty();
    let albums = res.albums.items;
    var botonesLanzamientos = document.getElementById('btn-lanzamientos');
    albums.forEach(element => {
        $("#lanzamientos").append(`
                <div class="card"><a href="./info.html?id=${element.id}&imagen=${element.images[0].url}" >
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
                </a>
            </div>
            `);
    });
    BtnPrevious = res.albums.previous ? `<button class="btn" data-url=${res.albums.previous} data-tipo="album" >⏮</button>` : '';
    BtnNext = res.albums.next ? `<button class="btn" data-url=${res.albums.next} data-tipo="album" >⏩</button>` : '';
    botonesLanzamientos.innerHTML = BtnPrevious + " " + BtnNext;
    $("#btn-lanzamientos").click(function (e) { 
        getNuevosLanzamientos(e.target.dataset.url)
    });
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
    $(".principal h1").css("hidden","true");
    let albums = res.albums.items;
    $("#album").empty();

    $("#artists").append(`
        <h1>Albumes</h1>
    `);

    const botonesAlbunes = document.getElementById('btn-albumes');
    BtnPrevious = res.albums.previous ? `<button class="btn" data-url=${res.albums.previous} data-tipo="album" >⏮</button>` : '';
    BtnNext = res.albums.next ? `<button class="btn" data-url=${res.albums.next} data-tipo="album" >⏩</button>` : '';
    botonesAlbunes.innerHTML = BtnPrevious + " " + BtnNext;
    $(".albumes_ver").css("visibility", "visible");
    albums.forEach(element => {
        $("#album").append(`
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
                        <button id="${element.id}-comprar" type="button" class="boton-comprar">COMPRAR</button>
                        <button id="${element.id}-carro" class="boton-carrito">AÑADIR CARRITO</button>
                    </div>
        
                </div>
            `);

            $(`#${element.id}-comprar`).click(function (e) {
                var obj = 
                {
                    "nombre":element.name,
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

                window.location.replace("./carrito.html");

            });
            $(`#${element.id}-carro`).click(function (e) { 
                var obj = {
                    "nombre":element.name,
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
            });
    });
    $("#btn-albumes").click(function (e) { 
        let tipo = e.target.dataset.tipo;
        buscar(e.target.dataset.url, tipo)
    });

}
/*ARTISTAS*/
function cargarArtistas(res) {
    $("#artist").empty();
    let artistas = res.artists.items;
    var genero = "";

    $("#artists").append(`
            <h1>Artistas</h1>
    `);

    const botonesArtista = document.getElementById('btn-artista');
    $(".artistas_ver").css("visibility", "visible");
    artistas.forEach(element => {
        if (element.images.length == 0) {
            let img = new Object();
            img.url = "https://www.cronista.com/files/image/478/478038/6320982be8754_360_480!.jpg?s=52ffc0203a6b79606007487507f8d922&d=1663081659"
            element.images.push(img);
            console.log(element.images[0].url)
        }
        if(element.genres.length == 0){
            genero = "Desconocido"; 
        }
        else{
            for( var a = 0; a < element.genres.length; a++){
                genero = genero + "," + element.genres[a];
            }
        }
        $("#artist").append(`
                <div class="card">
                    <div class="card__header">
                        <img src="${element.images[0].url}" alt="card__image" class="card__image" width="600">
                    </div>
                    <div class="card__body">
                        <span class="tag tag-blue">${element.type}</span>
                        <h4>${element.name}</h4>
                        <p>Generos: ${genero}</p>
                    </div>
        
                </div>
            `);
            genero = "";
    });

    BtnPrevious = res.artists.previous ? `<button class="btn" data-url=${res.artists.previous} data-tipo="artista" >⏮</button>` : '';
    BtnNext = res.artists.next ? `<button class="btn" data-url=${res.artists.next} data-tipo="artista" >⏩</button>` : '';
    botonesArtista.innerHTML = BtnPrevious + " " + BtnNext;
    $("#btn-artista").click(function (e) { 
        let tipo = e.target.dataset.tipo;
        buscar(e.target.dataset.url, tipo)
    });
}

function pedirMusica(busqueda){
    var armarURL = url+`?q=${busqueda}&type=album,track,artist&limit=3`;
    $.ajax({
        type: "GET",
        url: armarURL,
        headers: {"Authorization":"Bearer BQC0jotnkmcgPRjnCjcIR34117eEuQZhW9TbgcbTJYqKYqcTt6i7t_iZQsI4OI-9yWropiCaXeGFBDThgS5y5_t-Tx7vnINcqRnoGdAwTr6DWKoow98"},
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

function cargarCanciones(res) {
    $("#cancion").empty();
    let canciones = res.tracks.items;
    const botonesCanciones = document.getElementById('btn-canciones');
    $(".cancion_ver").css("visibility", "visible");
    canciones.forEach(element => {
        $("#cancion").append(`
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
                var mpopup = document.getElementById('mpopupBox');
                var mpLink = document.getElementById("mpopupLink");
                var close = document.getElementsByClassName("close")[0];
                mpopup.style.display = "block";
                close.onclick = function() {
                    mpopup.style.display = "none";
                };
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
            });
    });

    BtnPrevious = res.tracks.previous ? `<button class="btn" data-url=${res.tracks.previous} data-tipo="cancion" >⏮</button>` : '';
    BtnNext = res.tracks.next ? `<button class="btn" data-url=${res.tracks.next} data-tipo="cancion" >⏩</button>` : '';
    botonesCanciones.innerHTML = BtnPrevious + " " + BtnNext;

    $("#btn-canciones").click(function (e) { 
        let tipo = e.target.dataset.tipo;
        buscar(e.target.dataset.url, tipo)
    });
}



function sinElementos(busqueda){
    $(`#${busqueda}`).append(`
        <h1> No se encontraron ${busqueda} :c </h1>
    `);
}





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