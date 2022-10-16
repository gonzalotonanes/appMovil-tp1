$(document).ready(function () {
    cargarAlbumes();
    cargarCanciones();
});

function cargarAlbumes(){
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
function cargarCanciones(){
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