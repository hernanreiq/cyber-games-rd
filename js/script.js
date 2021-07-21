/* VARIABLES DEL DOM */
var contenedor_productos = document.getElementById('contenedor-productos');
var productos;

/* OBTENIENDO TODOS LOS PRODUCTOS GUARDADOS EN EL JSON */
function ObtenerProductosJSON(contenedor){
    axios({
        method: 'GET',
        url: 'json/productos.json'
    }).then(res => {
        productos = res.data;
        imprimirTarjetas(res.data, contenedor, res.data.length);
    }).catch(err => {
        console.log('Hay un error con los productos!', err);
    });
}

// CREANDO LAS FILAS PARA AGREGAR LOS PRODUCTOS Y COMPLEMENTOS EN VENTA
function creandoFilas(contenedor, n_articulos){
    var cantidad_filas = Math.ceil(n_articulos / 3);
    for(var i = 1; i <= cantidad_filas; i++){
        contenedor.innerHTML += `<div class="row" id="productos-fila-${i}"></div>`;
    }
}

//IMPRESION DE LAS TARJETAS
function imprimirTarjetas(articulo, contenedor, n_articulos){
    creandoFilas(contenedor, n_articulos);
    var cantidad_filas = Math.ceil(n_articulos / 3);
    var id = 0;
    for(var i = 1; i <= cantidad_filas; i++){
        for(var j = 1; j <= 3; j++){
            if(articulo[id] != undefined){
                document.getElementById('productos-fila-' + i).innerHTML += `
                <div class="col-md-4 my-3">
                    <div class="card">
                    <img src="${articulo[id].carpeta}1.jpg" alt="${articulo[id].nombre}" class="card-img-top">
                    <div class="card-body text-justify">
                        <h5 class="card-title">${articulo[id].nombre}</h5>
                        <span class="badge badge-success w-100 mb-2"><h5 class="m-0">RD$ ${articulo[id].precio.toLocaleString('en-US')}</h5></span>
                        <p class="card-text">${articulo[id].descripcion}</p>
                        <button onclick="verFotos(${id})" class="btn btn-info w-100 my-2" data-toggle="modal" data-target="#Modal">Ver fotos</button>
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
ObtenerProductosJSON(contenedor_productos);

//VARIABLES DEL DOM
var titulo_modal = document.getElementById('ModalLabel');
var contenedor_imagenes_carousel = document.getElementById('carousel-inner');

function verFotos(id){
    titulo_modal.innerText = productos[id].nombre;
    contenedor_imagenes_carousel.innerHTML = '';
    //DESACTIVANDO LOS CONTROLES DE CAROUSEL CUANDO SOLO HAY UNA IMAGEN
    if(productos[id].cantidad_fotos == 1){
        document.getElementById('contenedor-controles-carousel').style.display = "none";
    } else {
        document.getElementById('contenedor-controles-carousel').style.display = "block";
    }
    for(var i = 1; i <= productos[id].cantidad_fotos; i++){
        if(i == 1){
            var active = 'active';
        } else {
            var active = '';
        }
        contenedor_imagenes_carousel.innerHTML += `
            <div class="carousel-item ${active}">
                <img src="${productos[id].carpeta + i}.jpg" class="d-block w-100" alt="${productos[id].nombre}">
            </div>
        `;
    }
}