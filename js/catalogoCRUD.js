let host = 'http://localhost:5000'
//Guarda un producto en la base de datos.
//Recibe un objeto JSON con los datos necesarios
function guardarProducto(item){
    let opciones = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    }
    fetch(host + '/producto', opciones)
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
                guardarProducto(item)
            }
        })
        .catch(error => alert('ERRROR AL CARGAR JSON!!!', error))
}

//Asociar evento al botón de carga masiva
let btnCargaMasiva = document.getElementById('carga_masiva')
btnCargaMasiva.addEventListener('click', loadFromJSON)