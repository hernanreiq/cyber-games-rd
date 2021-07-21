/* VARIABLES DEL DOM */
var contenedor_productos = document.getElementById('contenedor-productos');
var contenedor_complementos = document.getElementById('contenedor-complementos');

/* OBTENIENDO TODOS LOS PRODUCTOS GUARDADOS EN EL JSON */
function ObtenerProductosJSON(url_json, contenedor){
    axios({
        method: 'GET',
        url: url_json
    }).then(res => {
        imprimirTarjetas(res.data, contenedor, res.data.length, res.data[0].tipo)
    }).catch(err => {
        console.log('Hay un error con los productos!', err);
    });
}

// CREANDO LAS FILAS PARA AGREGAR LOS PRODUCTOS Y COMPLEMENTOS EN VENTA
function creandoFilas(contenedor, n_articulos, tipo_articulo){
    var cantidad_filas = Math.ceil(n_articulos / 3);
    for(var i = 1; i <= cantidad_filas; i++){
        contenedor.innerHTML += `<div class="row" id="${tipo_articulo}-fila-${i}"></div>`;
    }
}

//IMPRESION DE LAS TARJETAS
function imprimirTarjetas(articulo, contenedor, n_articulos, tipo_articulo){
    creandoFilas(contenedor, n_articulos, tipo_articulo);
    var cantidad_filas = Math.ceil(n_articulos / 3);
    var id = 0;
    for(var i = 1; i <= cantidad_filas; i++){
        for(var j = 1; j <= 3; j++){
            if(articulo[id] != undefined){
                document.getElementById(tipo_articulo + '-fila-' + i).innerHTML += `
                <div class="col-md-4 my-3">
                    <div class="card">
                    <img src="${articulo[id].carpeta}1.jpg" alt="${articulo[id].nombre}" class="card-img-top">
                    <div class="card-body text-justify">
                        <h5 class="card-title">${articulo[id].nombre}</h5>
                        <span class="badge badge-success w-100 mb-2"><h5 class="m-0">RD$ ${articulo[id].precio.toLocaleString('en-US')}</h5></span>
                        <p class="card-text">${articulo[id].descripcion}</p>
                        <button class="btn btn-info w-100 my-2">Ver fotos</button>
                        <button class="btn btn-success w-100 my-2">Comprar <i class="fab fa-whatsapp"></i></button>
                    </div>
                    </div>
                </div>
                `;
                id++;
            }
        }
    }
}

//SE DEBE SEÑALAR LA RUTA DEL ARCHIVO JSON Y EL CONTENEDOR DONDE SE VAN A INTEGRAR LOS ARTICULOS
ObtenerProductosJSON('json/productos.json', contenedor_productos);
ObtenerProductosJSON('json/complementos.json', contenedor_complementos);