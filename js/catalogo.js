//Carga del catálogo a través de un JSON (a reemplazar cuando se desarrolle el backend)

fetch('./js/catalogo.json')
    .then(response=>{
        if (response.ok){
            return response.json()
        }
    })
    .then(data=>{
        let grilla_productos = document.querySelector('.grilla_productos') //div contenedor de todos los productos
        for (let prod of data){
            //por cada ítem del JSON, se crea un producto que debe tener la siguiente estructura:
            // <div class="producto">
            //     <img src="./img/catalogo/animal.jpg" alt="Imagen modelo animal print">
            //     <h4>Animal print</h4>
            //     <p>$3500.00</p>
            // </div>
            let producto = document.createElement('div')
            producto.className = 'producto'

            let imagen = document.createElement('img')
            imagen.src = prod.img_url
            imagen.alt = prod.img_alt
            producto.appendChild(imagen)

            let titulo = document.createElement('h4')
            titulo.textContent = prod.nombre
            producto.appendChild(titulo)

            let precio = document.createElement('p')
            precio.textContent = prod.precio
            producto.appendChild(precio)

            
            grilla_productos.appendChild(producto)
        }
    })


//Este JS consume la API de cotizaciones del dólar y convierte el precio de cada artículo del catálogo.

//Obtención de la cotización
fetch('https://dolarapi.com/v1/dolares')
    .then(response=>{
        //En este primer bloque se obtiene la respuesta de la API y se devuelve para ser procesado en el segundo bloque .then
        if (response.ok){
            return response.json()
        }
    })
    .then(data=>{
        //La API devuelve un array de JSONs, uno por cada tipo de dólar.
        let cot = 0
        for (let cotizacion of data){
            console.log(cotizacion)
            if (cotizacion.casa == 'blue'){
                cot = cotizacion.venta
            }
        }

        //Obtengo los productos del catálogo para mostrar el importe en dólares
        let productos = document.querySelectorAll('.producto')
        for (prod of productos){
            let precio = parseFloat(prod.querySelector('p').textContent.replace('$','')) //El precio está con el signo $
            precio_dolares = (precio / cot).toPrecision(3)
            
            //Se crea el elemento para el precio en dólares
            p_precio_dolar = document.createElement('p')
            p_precio_dolar.textContent = 'U$S' + precio_dolares
            p_precio_dolar.style = 'color: #DD929C'

            prod.appendChild(p_precio_dolar)

            // console.log(precio_dolares.toPrecision(3))
        }
    })