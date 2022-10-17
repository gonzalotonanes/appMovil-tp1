$(document).ready(function () {
    cargarAlbumes();
    cargarCanciones();
    cargarBotonCompra();
});

function cargarBotonCompra(){
    $('.ir-arriba').slideDown(300);
    $(".ir-arriba").click(function (e) { 
        cargarModal();
    });
}

function cargarModal(){
    var mpopup = document.getElementById('mpopupBox');
    var close = document.getElementsByClassName("close")[0];
    mpopup.style.display = "block";
    localStorage.removeItem("Producto_canciones");
    localStorage.removeItem("Producto");
    close.onclick = function() {
        mpopup.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == mpopup) {
            mpopup.style.display = "none";

        }
    };
}

function cargarAlbumes(){
    if(localStorage.getItem("Producto") != null){
        var productos = localStorage.getItem("Producto");
        var cortar_productos = productos.split("+");
        var guardarProductos = [];
        for(var i = 0; i< cortar_productos.length; i++){
            guardarProductos.push(JSON.parse(cortar_productos[i]))
        }
        guardarProductos.forEach(element => {
            $(".productos-compras").append(
                `
                    <div class="card">
                        <div class="card__header">
                            <img src="${element.url}" alt="card__image" class="card__image" width="600">
                        </div>
                        <div class="card__body">
                            <span class="tag tag-blue">${element.tipo}</span>
                            <h4>${element.nombre}</h4>
                            <p>Lanzamiento: ${element.lanzamiento}</p>
                            <p>Cantidad de canciones: ${element.cantidad}</p>
                            <p>Grupo musical: ${element.artistas}</p>
                        </div>
                    </div>
                `);
        });
    }
}
function cargarCanciones(){
    if(localStorage.getItem("Produto_canciones") != null){
        var productos = localStorage.getItem("Producto_canciones");
        var cortar_productos = productos.split("+");
        var guardarProductos = [];
        for(var i = 0; i< cortar_productos.length; i++){
            guardarProductos.push(JSON.parse(cortar_productos[i]))
        }
        guardarProductos.forEach(element => {
            $(".productos-compras").append(
                `
                    <div class="card">
                        <div class="card__header">
                            <img src="${element.url}" alt="card__image" class="card__image" width="600">
                        </div>
                        <div class="card__body">
                            <span class="tag tag-blue">${element.tipo}</span>
                            <h4>${element.nombre}</h4>
                            <p>Lanzamiento: ${element.lanzamiento}</p>
                            <p>Cantidad de canciones: ${element.cantidad}</p>
                            <p>Grupo musical: ${element.artistas}</p>
                        </div>
                    </div>
                `);
        });
    }
}