//Desarrollo
// let host = 'http://127.0.0.1:5000'

//Producción
let host = 'https://jotapy79.pythonanywhere.com'

//Guarda un producto en la base de datos.
//Recibe un objeto JSON con los datos necesarios

function limpiarFormulario(){
    document.getElementById('descripcion').value = ''
    document.getElementById('precio').value = 0
    document.getElementById('img_alt').value = ''
    document.getElementById('archivo').value = ''
    document.getElementById('idProducto').value = ''
}

function guardarProductoJSON(item){
    let opciones = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    }
    fetch(host + '/productoJS', opciones)
        .then(response=>{return response.json()})
        .then(data=>{console.log(data)})
        .catch(error=>{alert('Error al cargar items', error)})
}

//Carga de catálogo a partir de un JSON.
function loadFromJSON(){
    //obtener datos del JSON
    fetch('./js/catalogo.json')
        .then(response=>{
            if (response.ok){
                return response.json()
            }
        })
        .then(data=>{
            for (item of data){
                guardarProductoJSON(item)
            }
            location.reload(true)
        })
        .catch(error => alert('ERRROR AL CARGAR JSON!!!', error))
}

function guardar_producto(){
    let formulario = document.getElementById('formulario')
    let data = new FormData()

    data.append('descripcion', document.getElementById('descripcion').value)
    data.append('precio', document.getElementById('precio').value)
    data.append('img_alt', document.getElementById('img_alt').value)
    data.append('archivo', document.getElementById('archivo').files[0])

    fetch(host + '/producto', {method: 'POST', body: data})
        .then(response => {
        // .then( function(response) {
            if (response.ok){
                return response.json()
            }                
        })
        .then(resultado=>{
        // .then( function (resultado){
            alert('El producto se ha dado de alta con el ID: ' + resultado['resultado'])
        })
        .catch(error=>{
        // .catch(function( error ) {
            alert('Error al dar de alta el producto:' + error)
        })
        .finally(function (){
            location.reload(true)
            limpiarFormulario()
        })
}

function eliminarProducto(event){

    btnEliminar = event.target
    let producto = btnEliminar.parentElement
    fetch(host + '/producto/'+producto.dataset.idProducto, {method:'DELETE'})
    .then(response=>{
        if (response.ok){
            return response.json()
        }
    })
    .then(respuesta=>{
        alert("Producto eliminado.")
        location.reload(true)
    })

}

function getProducto(event){
    let producto = event.target.parentElement
    fetch(host + '/producto/' + producto.dataset.idProducto, {method: 'GET'})
        .then(response =>{
            if (response.ok){
                return response.json()
            }
        })
        .then(prod =>{
            document.getElementById('descripcion').value = prod.descripcion
            document.getElementById('precio').value = prod.precio
            document.getElementById('img_alt').value = prod.img_alt
            document.getElementById('archivo').value = ''
            document.getElementById('idProducto').value = prod.id
            document.getElementById('btnActualizar').hidden = false
            document.getElementById('btnNuevo').hidden = true

        })

}

function actualizar_producto(event){

    let formulario = document.getElementById('formulario')
    let data = new FormData()

    data.append('descripcion', document.getElementById('descripcion').value)
    data.append('precio', document.getElementById('precio').value)
    data.append('img_alt', document.getElementById('img_alt').value)
    data.append('archivo', document.getElementById('archivo').files[0])

    let idProducto = document.getElementById('idProducto').value

    fetch(host + '/producto/'+idProducto, {method: 'PUT', body: data})
        .then(response => {
            if (response.ok){
                return response.json()
            }                
        })
        .then(resultado=>{
            alert('El producto se ha modificado correctamente')
        })
        .catch(error=>{
            alert('Error al modificar el producto.' + error)
        })
        .finally(function (){
            location.reload(true)
            document.getElementById('descripcion').value = ''
            document.getElementById('precio').value = 0
            document.getElementById('img_alt').value = ''
            document.getElementById('archivo').value = ''
            document.getElementById('idProducto').value = ''
        })
}

function cancelar(event){
    let btnActualizar = document.getElementById('btnActualizar')
    let btnNuevo = document.getElementById('btnNuevo')    
    if (!btnActualizar.hidden){
        btnActualizar.hidden = true
        btnNuevo.hidden = false
    } 
    limpiarFormulario()   
}


//Asociar evento al botón de carga masiva
let btnCargaMasiva = document.getElementById('carga_masiva')
btnCargaMasiva.addEventListener('click', loadFromJSON)

//Asociar botón del alta
let btnNuevo = document.getElementById('btnNuevo')
btnNuevo.addEventListener('click', guardar_producto)

//Asociar botón para actualizar
let btnActualizar = document.getElementById('btnActualizar')
btnActualizar.addEventListener('click', actualizar_producto)

let btnCancelar = document.getElementById('btnCancelar')
btnCancelar.addEventListener('click', cancelar)
