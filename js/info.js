

const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");
const imagen = urlSearchParams.get("imagen");
console.log("El id es:", id);
console.log("imagen url:", imagen);

let token = localStorage.getItem('token');
const username = "ff36890297234638a942900dd76cf68f";
const password = "f08e1f503aaa43b99a98b010ce9a62f3"

$(document).ready(function () {

if (id == null) {
    window.location.href = "index.html"
}

$("#album-img").append(`
<img src="${imagen}" class="img-info"alt="">
`);


let url = `https://api.spotify.com/v1/albums/${id}/tracks`;


getInfoAlbum(url);

function getInfoAlbum(url) {

    $.ajax({
        type: "GET",
        url: url,
        headers: { "Authorization": "Bearer " + token },
        success: function (response) {
            cargarInfoAlbum(response);
        },
        statusCode: {
            401: function () {
                console.log("RENOVANDO TOKEN")
                renovarToken();
                getInfoAlbum(url);
            }
        }
    });

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


    function cargarInfoAlbum(res) {    
        let albums = res.items;
        let i=1;
        albums.forEach(element => {
            $("#listado").append(`
            <a href="${element.external_urls.spotify}" ><li>${i}. ${element.name}</li></a>
        `);
        i++;
        });
    }
}

});